"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileText, Loader2, Upload, Download, Sparkles,
  Plus, Trash2, Save, Eye,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslate, useLang } from "@/lib/i18n";
import { useCVStore } from "@/store/cv-store";
import { ScoreDashboard } from "@/components/cv/ScoreDashboard";
import { JobMarketFields } from "@/components/cv/JobMarketFields";
import { TemplateGallery } from "@/components/cv/TemplateGallery";
import { downloadCV } from "@/lib/cv-export";

async function extractTextFromPDF(file: File): Promise<string> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
    pages.push(text);
  }
  return pages.join("\n\n");
}

async function extractTextFromDOCX(file: File): Promise<string> {
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

export default function CVPage() {
  const t = useTranslate();
  const lang = useLang();

  const {
    data, updatePersonal, updateSummary,
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addSkill, updateSkill, removeSkill,
    addCertification, removeCertification,
    addLanguage, removeLanguage,
    selectedTemplate,
    atsScore, setAtsScore,
    analysisFeedback, setAnalysisFeedback,
    isAnalyzing, setIsAnalyzing,
    isExporting, setIsExporting,
    uploadedFile, setUploadedFile,
    isUploading, setIsUploading,
  } = useCVStore();

  const [activeTab, setActiveTab] = useState<"edit" | "templates" | "preview">("edit");
  const [activeSection, setActiveSection] = useState("personal");

  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });

  const extractTextFromFile = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "pdf":
        return extractTextFromPDF(file);
      case "txt":
        return file.text();
      case "docx":
        return extractTextFromDOCX(file);
      default:
        toast.error(
          lang === "ar"
            ? "صيغة الملف غير مدعومة. يرجى استخدام PDF أو DOCX أو TXT"
            : "Unsupported file format. Please use PDF, DOCX, or TXT"
        );
        return "";
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "txt", "docx"].includes(ext || "")) {
      toast.error(
        lang === "ar"
          ? "صيغة غير مدعومة. يرجى رفع ملف PDF أو DOCX أو TXT"
          : "Unsupported format. Please upload a PDF, DOCX, or TXT file"
      );
      e.target.value = "";
      return;
    }

    setIsUploading(true);
    setUploadedFile(file);

    try {
      const text = await extractTextFromFile(file);

      if (!text || text.trim().length < 20) {
        toast.error(
          lang === "ar"
            ? "لم يتم استخراج نص كافٍ من الملف. تأكد أن السيرة الذاتية تحتوي على نص واضح"
            : "Could not extract enough text from the file. Make sure your CV contains readable text"
        );
        setIsUploading(false);
        e.target.value = "";
        return;
      }

      const res = await fetch("/api/cv/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText: text, language: lang }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || `Server error: ${res.status}`);
      }

      const result = await res.json();

      let analysis: {
        score: number;
        strengths: string[];
        improvements: string[];
        missingFields: string[];
        keywords: string[];
        recommendations: string[];
      };

      if (typeof result.result === "object" && result.result !== null) {
        analysis = result.result as typeof analysis;
      } else {
        try {
          analysis = typeof result.result === "string"
            ? JSON.parse(result.result)
            : result.result;
        } catch {
          setAnalysisFeedback([result.result || (lang === "ar" ? "تم التحليل بنجاح" : "Analysis completed")]);
          setAtsScore(null);
          toast.success(lang === "ar" ? "تم التحليل!" : "Analyzed!");
          setIsUploading(false);
          e.target.value = "";
          return;
        }
      }

      setAtsScore(analysis.score);
      setAnalysisFeedback([
        ...analysis.strengths.map((s: string) => `✓ ${s}`),
        ...analysis.improvements.map((i: string) => `✗ ${i}`),
      ]);

      toast.success(lang === "ar" ? "تم تحليل السيرة الذاتية!" : "CV analyzed successfully!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("Upload error:", message);
      toast.error(
        lang === "ar"
          ? `فشل التحليل: ${message}`
          : `Analysis failed: ${message}`
      );
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleEnhance = async () => {
    setIsAnalyzing(true);

    try {
      const res = await fetch("/api/cv/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvData: data,
          language: lang,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || `API error: ${res.status}`);
      }

      const result = await res.json();

      let enhanced: { summary?: string; experience?: unknown[] };
      try {
        enhanced = typeof result.result === "object" && result.result !== null
          ? result.result
          : JSON.parse(result.result);
      } catch {
        console.error("Enhance parse error:", result.result);
        toast.error(lang === "ar" ? "فشل تحسين السيرة الذاتية" : "CV enhancement failed");
        setIsAnalyzing(false);
        return;
      }

      if (enhanced.summary) updateSummary(enhanced.summary);

      toast.success(lang === "ar" ? "تم تحسين السيرة الذاتية!" : "CV enhanced successfully!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("Enhance error:", message);
      toast.error(
        lang === "ar" ? `فشل التحسين: ${message}` : `Enhancement failed: ${message}`
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExport = async (format: "txt" | "html" | "json") => {
    setIsExporting(true);
    try {
      await downloadCV(data, { format, template: selectedTemplate, language: lang });
      toast.success(lang === "ar" ? "تم التصدير!" : "Exported!");
    } catch (err) {
      toast.error(lang === "ar" ? "فشل التصدير" : "Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  const SECTIONS = [
    { id: "personal", labelAr: "المعلومات الشخصية", labelEn: "Personal" },
    { id: "summary", labelAr: "الملخص", labelEn: "Summary" },
    { id: "experience", labelAr: "الخبرة", labelEn: "Experience" },
    { id: "education", labelAr: "التعليم", labelEn: "Education" },
    { id: "skills", labelAr: "المهارات", labelEn: "Skills" },
    { id: "certifications", labelAr: "الشهادات", labelEn: "Certifications" },
    { id: "languages", labelAr: "اللغات", labelEn: "Languages" },
  ];

  return (
    <div className="min-h-screen bg-ivory-100">
      {/* Hero */}
      <section ref={heroRef} className="relative pt-16 pb-12 gradient-mesh">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            className="text-center"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-white mb-6">
              <FileText className="h-7 w-7" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 font-display-ar">
              {lang === "ar" ? "بصيرة السيرة الذاتية" : "CV Insight"}
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {lang === "ar"
                ? "حسّن سيرتك الذاتية لأنظمة تتبع المتقدمين ودول الخليج"
                : "Optimize your resume for ATS and global job markets"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upload & Actions */}
          <div className="bg-white rounded-2xl border border-ivory-300 p-6 mb-8 corner-brackets grain-overlay card-depth">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-ivory-100 border border-ivory-300 cursor-pointer hover:bg-ivory-200 transition-colors">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm text-slate-700">
                    {lang === "ar" ? "رفع سيرة ذاتية" : "Upload CV"}
                  </span>
                  <input
                    type="file"
                    accept=".txt,.pdf,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={handleEnhance}
                  disabled={isAnalyzing}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-book-cloth text-white text-sm font-medium hover:bg-kraft transition-colors disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <span className="diamond-loading"><span /><span /><span /><span /></span>
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {lang === "ar" ? "تحسين بالذكاء الاصطناعي" : "AI Enhance"}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExport("txt")}
                  disabled={isExporting}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-ivory-100 text-sm text-slate-700 hover:bg-ivory-200 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  TXT
                </button>
                <button
                  onClick={() => handleExport("html")}
                  disabled={isExporting}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-ivory-100 text-sm text-slate-700 hover:bg-ivory-200 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  HTML
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { id: "edit", labelAr: "تحرير", labelEn: "Edit" },
              { id: "templates", labelAr: "القوالب", labelEn: "Templates" },
              { id: "preview", labelAr: "معاينة", labelEn: "Preview" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 hover:bg-ivory-200"
                }`}
              >
                {lang === "ar" ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Editor */}
            {activeTab === "edit" && (
              <div className="lg:col-span-2 space-y-6">
                {/* Section Tabs */}
                <div className="flex flex-wrap gap-2">
                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        activeSection === section.id
                          ? "bg-slate-900 text-white"
                          : "bg-white text-slate-600 hover:bg-ivory-200"
                      }`}
                    >
                      {lang === "ar" ? section.labelAr : section.labelEn}
                    </button>
                  ))}
                </div>

                {/* Personal Info */}
                {activeSection === "personal" && (
                  <div className="bg-white rounded-2xl border border-ivory-300 p-6 corner-brackets grain-overlay card-depth">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      {lang === "ar" ? "المعلومات الشخصية" : "Personal Information"}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">
                          {lang === "ar" ? "الاسم الكامل" : "Full Name"} *
                        </label>
                        <input
                          type="text"
                          value={data.personal.fullName}
                          onChange={(e) => updatePersonal({ fullName: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-ivory-100 border border-ivory-300 text-sm text-slate-900 focus:border-book-cloth focus:ring-1 focus:ring-book-cloth/30"
                          dir={lang === "ar" ? "rtl" : "ltr"}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">
                          {lang === "ar" ? "البريد الإلكتروني" : "Email"} *
                        </label>
                        <input
                          type="email"
                          value={data.personal.email}
                          onChange={(e) => updatePersonal({ email: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-ivory-100 border border-ivory-300 text-sm text-slate-900 focus:border-book-cloth focus:ring-1 focus:ring-book-cloth/30"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">
                          {lang === "ar" ? "الهاتف" : "Phone"} *
                        </label>
                        <input
                          type="tel"
                          value={data.personal.phone}
                          onChange={(e) => updatePersonal({ phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-ivory-100 border border-ivory-300 text-sm text-slate-900 focus:border-book-cloth focus:ring-1 focus:ring-book-cloth/30"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">
                          {lang === "ar" ? "الموقع" : "Location"} *
                        </label>
                        <input
                          type="text"
                          value={data.personal.location}
                          onChange={(e) => updatePersonal({ location: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-ivory-100 border border-ivory-300 text-sm text-slate-900 focus:border-book-cloth focus:ring-1 focus:ring-book-cloth/30"
                          dir={lang === "ar" ? "rtl" : "ltr"}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Summary */}
                {activeSection === "summary" && (
                  <div className="bg-white rounded-2xl border border-ivory-300 p-6 corner-brackets grain-overlay card-depth">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      {lang === "ar" ? "الملخص المهني" : "Professional Summary"}
                    </h3>
                    <textarea
                      value={data.summary}
                      onChange={(e) => updateSummary(e.target.value)}
                      placeholder={lang === "ar" ? "اكتب ملخصك المهني..." : "Write your professional summary..."}
                      className="w-full min-h-[150px] rounded-lg bg-ivory-100 border border-ivory-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-book-cloth focus:ring-1 focus:ring-book-cloth/30 resize-none"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                    />
                  </div>
                )}

                {/* Experience */}
                {activeSection === "experience" && (
                  <div className="bg-white rounded-2xl border border-ivory-300 p-6 corner-brackets grain-overlay card-depth">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {lang === "ar" ? "الخبرة العملية" : "Work Experience"}
                      </h3>
                      <button
                        onClick={() => addExperience({
                          company: "", role: "", startDate: "", endDate: "",
                          current: false, description: "", achievements: [],
                        })}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-book-cloth text-white text-xs font-medium hover:bg-kraft transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        {lang === "ar" ? "إضافة" : "Add"}
                      </button>
                    </div>
                    <div className="space-y-4">
                      {data.experience.map((exp) => (
                        <div key={exp.id} className="p-4 rounded-lg bg-ivory-100 border border-ivory-300">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 grid sm:grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                                placeholder={lang === "ar" ? "المسمى الوظيفي" : "Job Title"}
                                className="px-3 py-2 rounded-lg bg-white border border-ivory-300 text-sm text-slate-900 focus:border-book-cloth"
                                dir={lang === "ar" ? "rtl" : "ltr"}
                              />
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                placeholder={lang === "ar" ? "الشركة" : "Company"}
                                className="px-3 py-2 rounded-lg bg-white border border-ivory-300 text-sm text-slate-900 focus:border-book-cloth"
                                dir={lang === "ar" ? "rtl" : "ltr"}
                              />
                            </div>
                            <button
                              onClick={() => removeExperience(exp.id)}
                              className="text-slate-400 hover:text-red-500 ml-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                            placeholder={lang === "ar" ? "الوصف..." : "Description..."}
                            className="w-full min-h-[80px] rounded-lg bg-white border border-ivory-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-book-cloth resize-none"
                            dir={lang === "ar" ? "rtl" : "ltr"}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {activeSection === "skills" && (
                  <div className="bg-white rounded-2xl border border-ivory-300 p-6 corner-brackets grain-overlay card-depth">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {lang === "ar" ? "المهارات" : "Skills"}
                      </h3>
                      <button
                        onClick={() => addSkill({ name: "", level: "intermediate", category: "" })}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-book-cloth text-white text-xs font-medium hover:bg-kraft transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        {lang === "ar" ? "إضافة" : "Add"}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill) => (
                        <div key={skill.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-ivory-100 border border-ivory-300">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                            className="bg-transparent text-sm text-slate-900 w-24 focus:outline-none"
                            placeholder={lang === "ar" ? "مهارة" : "Skill"}
                            dir={lang === "ar" ? "rtl" : "ltr"}
                          />
                          <button
                            onClick={() => removeSkill(skill.id)}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Job Market Fields */}
                <JobMarketFields />
              </div>
            )}

            {/* Templates Tab */}
            {activeTab === "templates" && (
              <div className="lg:col-span-2">
                <TemplateGallery />
              </div>
            )}

            {/* Preview Tab */}
            {activeTab === "preview" && (
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-ivory-300 p-8">
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{data.personal.fullName || (lang === "ar" ? "الاسم" : "Name")}</h2>
                    <p className="text-sm text-slate-500 mb-4">
                      {data.personal.email} | {data.personal.phone} | {data.personal.location}
                    </p>
                    {data.summary && (
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-slate-900 mb-2 pb-1 border-b border-ivory-300">
                          {lang === "ar" ? "الملخص المهني" : "PROFESSIONAL SUMMARY"}
                        </h3>
                        <p className="text-sm text-slate-700">{data.summary}</p>
                      </div>
                    )}
                    {data.experience.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-slate-900 mb-2 pb-1 border-b border-ivory-300">
                          {lang === "ar" ? "الخبرة العملية" : "WORK EXPERIENCE"}
                        </h3>
                        {data.experience.map((exp) => (
                          <div key={exp.id} className="mb-3">
                            <p className="text-sm font-medium text-slate-900">{exp.role}</p>
                            <p className="text-xs text-slate-500">{exp.company}</p>
                            {exp.description && <p className="text-sm text-slate-700 mt-1">{exp.description}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Right Sidebar */}
            <div className="space-y-6">
              <ScoreDashboard
                score={atsScore}
                feedback={analysisFeedback}
                isAnalyzing={isAnalyzing}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
