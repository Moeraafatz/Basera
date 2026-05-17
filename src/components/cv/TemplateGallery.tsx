"use client";

import { useLang } from "@/lib/i18n";
import { CV_TEMPLATES, CVTemplate } from "@/data/cv-templates";
import { useCVStore } from "@/store/cv-store";
import { FileText, LayoutGrid, Briefcase } from "lucide-react";

export function TemplateGallery() {
  const lang = useLang();
  const { selectedTemplate, setSelectedTemplate } = useCVStore();

  const filteredTemplates = (type: "ats" | "visual" | "industry") =>
    CV_TEMPLATES.filter((t) => t.type === type);

  const TemplateCard = ({ template }: { template: CVTemplate }) => (
    <button
      onClick={() => setSelectedTemplate(template.id)}
      className={`p-4 rounded-xl border-2 transition-all text-left ${
        selectedTemplate === template.id
          ? "border-book-cloth bg-book-cloth/5"
          : "border-ivory-300 hover:border-ivory-400"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          template.type === "ats" ? "bg-green-100 text-green-600" :
          template.type === "visual" ? "bg-blue-100 text-blue-600" :
          "bg-purple-100 text-purple-600"
        }`}>
          {template.type === "ats" ? <FileText className="h-5 w-5" /> :
           template.type === "visual" ? <LayoutGrid className="h-5 w-5" /> :
           <Briefcase className="h-5 w-5" />}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-slate-900">
            {template.name}
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            {template.description}
          </p>
          {template.atsCompatible && (
            <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs">
              {lang === "ar" ? "متوافق مع ATS" : "ATS Compatible"}
            </span>
          )}
        </div>
      </div>
    </button>
  );

  return (
    <div className="space-y-6">
      {/* ATS Templates */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          {lang === "ar" ? "قوالب متوافقة مع ATS (8)" : "ATS-Compatible Templates (8)"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredTemplates("ats").map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>

      {/* Visual Templates */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          {lang === "ar" ? "قوالب بصرية (6)" : "Visual Templates (6)"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredTemplates("visual").map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>

      {/* Industry Templates */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          {lang === "ar" ? "قوالب متخصصة (4)" : "Industry-Specific Templates (4)"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredTemplates("industry").map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
}
