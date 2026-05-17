"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles, Loader2, Copy, Check, Edit3, Save, X, RotateCcw,
  ChevronDown, Zap, BookOpen, Code, PenTool,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslate, useLang } from "@/lib/i18n";
import { usePromptStore } from "@/store/prompt-store";

const CATEGORIES = [
  { id: "content", labelAr: "محتوى", labelEn: "Content", icon: BookOpen },
  { id: "business", labelAr: "أعمال", labelEn: "Business", icon: Zap },
  { id: "coding", labelAr: "برمجة", labelEn: "Coding", icon: Code },
  { id: "creative", labelAr: "إبداعي", labelEn: "Creative", icon: PenTool },
];

const MODELS = [
  { id: "claude-sonnet-4", name: "Claude Sonnet 4", provider: "Anthropic" },
  { id: "claude-opus-4", name: "Claude Opus 4", provider: "Anthropic" },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", provider: "Google" },
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "deepseek-chat", name: "DeepSeek Chat", provider: "DeepSeek" },
  { id: "llama-3.3-70b", name: "Llama 3.3 70B", provider: "Groq" },
];

const LEVELS = [
  { id: "simple", labelAr: "بسيط", labelEn: "Simple" },
  { id: "advanced", labelAr: "متقدم", labelEn: "Advanced" },
  { id: "expert", labelAr: "خبير", labelEn: "Expert" },
];

export default function TextPage() {
  const t = useTranslate();
  const lang = useLang();

  const {
    inputText, setInputText,
    level, setLevel,
    category, setCategory,
    selectedModel, setSelectedModel,
    outputText, setOutputText,
    isGenerating, setIsGenerating,
    versions, addVersion,
    liveEdit,
  } = usePromptStore();

  const [copied, setCopied] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [useStreaming, setUseStreaming] = useState(true);

  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);
    setOutputText("");

    try {
      if (useStreaming) {
        const res = await fetch("/api/text/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify({
            input: inputText,
            level,
            category,
            language: lang,
            model: selectedModel,
            stream: true,
          }),
        });

        if (!res.ok) throw new Error("API error");

        const reader = res.body?.getReader();
        if (!reader) throw new Error("Streaming not supported");

        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const delta = parsed.delta || "";
                if (delta) {
                  fullText += delta;
                  setOutputText(fullText);
                }
              } catch {
                fullText += data;
                setOutputText(fullText);
              }
            }
          }
        }

        addVersion({
          content: fullText,
          model: selectedModel,
          level,
        });

        toast.success(lang === "ar" ? "تم التوليد بنجاح!" : "Generated successfully!");
      } else {
        const res = await fetch("/api/text/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: inputText,
            level,
            category,
            language: lang,
            model: selectedModel,
          }),
        });

        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setOutputText(data.result);
        addVersion({
          content: data.result,
          model: data.model,
          level,
        });

        toast.success(lang === "ar" ? "تم التوليد بنجاح!" : "Generated successfully!");
      }
    } catch (err) {
      toast.error(lang === "ar" ? "حدث خطأ أثناء التوليد" : "Generation failed");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    toast.success(lang === "ar" ? "تم النسخ!" : "Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const handleSectionEdit = (section: string, content: string) => {
    setEditingSection(section);
    setEditContent(content);
  };

  const handleSectionSave = async () => {
    if (!editingSection || !editContent) return;

    try {
      const res = await fetch("/api/text/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: editingSection,
          content: editContent,
          language: lang,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const updated = outputText.replace(
        new RegExp(`## ${editingSection}[\\s\\S]*?(?=##|$)`),
        `## ${editingSection}\n${data.result}\n\n`
      );
      setOutputText(updated);

      toast.success(lang === "ar" ? "تم تحسين القسم!" : "Section optimized!");
    } catch (err) {
      toast.error(lang === "ar" ? "فشل التحسين" : "Optimization failed");
    } finally {
      setEditingSection(null);
      setEditContent("");
    }
  };

  const parseSections = (text: string) => {
    const sections = text.split(/(?=## )/g);
    return sections.map((section) => {
      const match = section.match(/## (.+?)\n([\s\S]*)/);
      if (match) {
        return { title: match[1], content: match[2].trim() };
      }
      return { title: "Output", content: section.trim() };
    });
  };

  const sections = outputText ? parseSections(outputText) : [];

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
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white mb-6">
              <Sparkles className="h-7 w-7" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 font-display-ar">
              {lang === "ar" ? "بصيرة النصوص" : "Text Insight"}
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {lang === "ar"
                ? "حوّل أفكارك إلى أوامر احترافية لأشهر نماذج الذكاء الاصطناعي"
                : "Transform your ideas into professional prompts for top AI models"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="bg-white rounded-2xl border border-ivory-300 p-6 corner-brackets grain-overlay card-depth">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  {lang === "ar" ? "الإدخال" : "Input"}
                </h2>
                <button
                  onClick={handleClear}
                  className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {lang === "ar" ? "مسح" : "Clear"}
                </button>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={lang === "ar" ? "صِف مهمتك أو فكرتك هنا..." : "Describe your task or idea..."}
                className="w-full min-h-[200px] rounded-xl bg-ivory-100 border border-ivory-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-book-cloth focus:ring-1 focus:ring-book-cloth/30 resize-none mb-4 transition-colors"
                dir={lang === "ar" ? "rtl" : "ltr"}
              />

              {/* Controls */}
              <div className="space-y-4 mb-6">
                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    {lang === "ar" ? "الفئة" : "Category"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setCategory(cat.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                            category === cat.id
                              ? "bg-slate-900 text-white"
                              : "bg-ivory-200 text-slate-600 hover:bg-ivory-300"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {lang === "ar" ? cat.labelAr : cat.labelEn}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Level */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    {lang === "ar" ? "المستوى" : "Level"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {LEVELS.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setLevel(l.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          level === l.id
                            ? "bg-slate-900 text-white"
                            : "bg-ivory-200 text-slate-600 hover:bg-ivory-300"
                        }`}
                      >
                        {lang === "ar" ? l.labelAr : l.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    {lang === "ar" ? "النموذج" : "Model"}
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowModelDropdown(!showModelDropdown)}
                      className="w-full px-3 py-2 rounded-lg bg-ivory-200 text-sm text-slate-700 flex items-center justify-between hover:bg-ivory-300 transition-colors"
                    >
                      <span>{MODELS.find((m) => m.id === selectedModel)?.name || selectedModel}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {showModelDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-ivory-300 rounded-lg shadow-lg">
                        {MODELS.map((model) => (
                          <button
                            key={model.id}
                            onClick={() => {
                              setSelectedModel(model.id);
                              setShowModelDropdown(false);
                            }}
                            className="w-full px-3 py-2 text-sm text-left hover:bg-ivory-100 flex items-center justify-between"
                          >
                            <span>{model.name}</span>
                            <span className="text-xs text-slate-400">{model.provider}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!inputText.trim() || isGenerating}
                className="w-full bg-slate-900 text-white h-12 rounded-xl text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-slate-800 transition-colors"
              >
                {isGenerating ? (
                  <>
                    <span className="diamond-loading"><span /><span /><span /><span /></span>
                    {lang === "ar" ? "جارٍ التوليد..." : "Generating..."}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    {lang === "ar" ? "توليد" : "Generate"}
                  </>
                )}
              </button>
            </div>

            {/* Output Panel */}
            <div className="bg-white rounded-2xl border border-ivory-300 p-6 corner-brackets grain-overlay card-depth">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  {lang === "ar" ? "الإخراج" : "Output"}
                </h2>
                {outputText && (
                  <button
                    onClick={handleCopy}
                    className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-600" />
                        {lang === "ar" ? "تم النسخ" : "Copied"}
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        {lang === "ar" ? "نسخ" : "Copy"}
                      </>
                    )}
                  </button>
                )}
              </div>

              {outputText ? (
                <div className="space-y-4">
                  {sections.map((section, idx) => (
                    <div key={idx} className="rounded-xl bg-ivory-100 border border-ivory-300 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-slate-900">{section.title}</h3>
                        <button
                          onClick={() => handleSectionEdit(section.title, section.content)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {editingSection === section.title ? (
                        <div className="space-y-2">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full min-h-[100px] rounded-lg bg-white border border-book-cloth px-3 py-2 text-sm text-slate-900 resize-none"
                            dir={lang === "ar" ? "rtl" : "ltr"}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleSectionSave}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-book-cloth text-white text-xs font-medium hover:bg-kraft transition-colors"
                            >
                              <Save className="h-3.5 w-3.5" />
                              {lang === "ar" ? "حفظ" : "Save"}
                            </button>
                            <button
                              onClick={() => {
                                setEditingSection(null);
                                setEditContent("");
                              }}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-ivory-200 text-slate-600 text-xs font-medium hover:bg-ivory-300 transition-colors"
                            >
                              <X className="h-3.5 w-3.5" />
                              {lang === "ar" ? "إلغاء" : "Cancel"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <pre className="text-sm text-slate-800 whitespace-pre-wrap font-sans" dir={lang === "ar" ? "rtl" : "ltr"}>
                          {section.content}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="min-h-[300px] flex items-center justify-center rounded-xl bg-ivory-100 border border-ivory-300">
                  <p className="text-slate-400 text-sm">
                    {lang === "ar" ? "أدخل نصاً واضغط توليد" : "Enter text and click Generate"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
