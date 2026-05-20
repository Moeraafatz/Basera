"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wand2, Sparkles, FileText,
  Zap, ArrowLeft, Bot, Globe, Infinity, Check,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslate, useLang } from "@/lib/i18n";

const CATEGORIES = [
  { id: "content", labelAr: "محتوى", labelEn: "Content" },
  { id: "business", labelAr: "أعمال", labelEn: "Business" },
  { id: "coding", labelAr: "برمجة", labelEn: "Coding" },
  { id: "creative", labelAr: "إبداعي", labelEn: "Creative" },
] as const;

const TOOLS = [
  { href: "/text", icon: Sparkles, nameAr: "محسّن الأوامر", nameEn: "Prompt Enhancer", descAr: "حوّل أفكارك إلى أوامر احترافية للذكاء الاصطناعي", descEn: "Transform your ideas into professional AI prompts" },
  { href: "/cv", icon: FileText, nameAr: "تحسين السيرة الذاتية", nameEn: "CV Optimizer", descAr: "حلل وحسّن سيرتك الذاتية لأي سوق عمل", descEn: "Analyze and optimize your CV for any job market" },
];

const BENEFITS = [
  { icon: Infinity, titleAr: "مجاناً للأبد", titleEn: "Free Forever", descAr: "استخدم جميع الأدوات بدون أي تكاليف أو اشتراكات", descEn: "Use all tools with no costs or subscriptions" },
  { icon: Globe, titleAr: "بالعربية", titleEn: "In Arabic", descAr: "واجهة وأدوات بالكامل باللغة العربية", descEn: "Interface and tools fully in Arabic" },
  { icon: Bot, titleAr: "يدعم كل النماذج", titleEn: "All AI Models", descAr: "يعمل مع GPT, Claude, Gemini, Grok والمزيد", descEn: "Works with GPT, Claude, Gemini, Grok and more" },
  { icon: Zap, titleAr: "بدون تسجيل", titleEn: "No Signup", descAr: "ابدأ فوراً بدون الحاجة لإنشاء حساب", descEn: "Start instantly without creating an account" },
];

function generatePrompt(input: string, level: string, category: string): string {
  if (!input.trim()) return "";
  const categoryMap: Record<string, string> = {
    content: "Content Creation",
    business: "Business & Marketing",
    coding: "Coding & Tech",
    creative: "Creative Writing",
  };
  const fullCategory = categoryMap[category] || "Content Creation";
  const prefixes: Record<string, string> = {
    simple: "You are a helpful AI assistant.",
    advanced: "You are a highly skilled AI expert with deep domain knowledge.",
    expert: "You are a world-class specialist and thought leader.",
  };
  const detail: Record<string, string> = {
    simple: `TASK: ${input}\n\nProvide a concise answer under 200 words.`,
    advanced: `TASK: ${input}\n\nProvide a comprehensive response with clear sections and examples.`,
    expert: `ROLE: Senior specialist\nTASK: ${input}\n\nDeliver an exceptionally detailed response with multi-angle analysis.`,
  };
  return `${prefixes[level] || prefixes.simple}\n\nContext: ${fullCategory}\n\n${detail[level] || detail.simple}`;
}

export default function HomePage() {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("content");

  const t = useTranslate();
  const lang = useLang();

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "text", input, level: "advanced", category: selectedCategory, model: "chatgpt" }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setOutput(data.result || generatePrompt(input, "advanced", selectedCategory));
    } catch {
      setOutput(generatePrompt(input, "advanced", selectedCategory));
    } finally {
      setIsGenerating(false);
    }
    toast.success(lang === "ar" ? "تم التوليد!" : "Generated!");
  };

  return (
    <div className="min-h-screen bg-ivory-100">
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-ivory-100 via-ivory-200/50 to-manilla/20">
        <div className="absolute inset-0 geo-pattern opacity-50" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${lang === "ar" ? "lg:text-right" : "lg:text-left"}`}>
            {/* FREE Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg mb-8 shadow-lg shadow-green-500/25">
              <Infinity className="h-5 w-5" />
              <span>{lang === "ar" ? "مجاناً ١٠٠٪" : "100% FREE"}</span>
              <span className="opacity-70 text-sm font-normal mx-1">|</span>
              <span className="opacity-80 text-sm font-normal">{lang === "ar" ? "للأبد" : "Forever"}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight font-display-ar">
              {lang === "ar" ? (
                <>بصيرة<span className="text-book-cloth">.</span></>
              ) : (
                <>Baseera<span className="text-book-cloth">.</span></>
              )}
            </h1>

            <p className="text-2xl sm:text-3xl text-slate-700 mb-4 font-medium">
              {lang === "ar" ? "حوّل أفكارك إلى أوامر احترافية للذكاء الاصطناعي" : "Transform Ideas into Professional AI Prompts"}
            </p>

            <p className="text-lg text-slate-500 mb-10 max-w-xl leading-relaxed">
              {lang === "ar"
                ? "منصة عربية مجانية ١٠٠٪ لتوليد وتحسين أوامر الذكاء الاصطناعي في كل المجالات"
                : "A 100% free Arabic platform for generating and enhancing AI prompts in every field"}
            </p>

            <Link href="/text">
              <button className="bg-slate-900 text-white h-14 px-10 rounded-2xl text-base font-semibold flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 mx-auto lg:mx-0">
                <Wand2 className="h-5 w-5" />
                {lang === "ar" ? "ابدأ الآن مجاناً" : "Start Free Now"}
                <ArrowLeft className={`h-4 w-4 ${lang === "ar" ? "" : "rotate-180"}`} />
              </button>
            </Link>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
              <div className="text-center lg:text-right">
                <p className="text-3xl font-bold text-slate-900">٢</p>
                <p className="text-sm text-slate-500">{lang === "ar" ? "أدوات متاحة" : "Tools Available"}</p>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-3xl font-bold text-slate-900">∞</p>
                <p className="text-sm text-slate-500">{lang === "ar" ? "استخدام مجاني" : "Unlimited Usage"}</p>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-3xl font-bold text-slate-900">٠</p>
                <p className="text-sm text-slate-500">{lang === "ar" ? "تسجيل مطلوب" : "No Signup Required"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              {lang === "ar" ? "جرّب الآن" : "Try It Now"}
            </h2>
            <p className="text-slate-500">
              {lang === "ar" ? "أدخل فكرتك وشاهد النتيجة فوراً" : "Enter your idea and see results instantly"}
            </p>
          </div>

          <div className="bg-ivory-100 rounded-3xl border border-ivory-300 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                <Wand2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-slate-900 font-semibold block">بصيرة</span>
                <span className="text-slate-400 text-xs">{lang === "ar" ? "محسّن الأوامر بالذكاء الاصطناعي" : "AI Prompt Enhancer"}</span>
              </div>
            </div>

            <textarea
              placeholder={lang === "ar" ? "صِف مهمتك..." : "Describe your task..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full min-h-[100px] rounded-xl bg-white border border-ivory-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-book-cloth resize-none mb-4"
              dir={lang === "ar" ? "rtl" : "ltr"}
            />

            <div className="flex flex-wrap gap-2 mb-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-500 border border-ivory-300 hover:border-slate-400"
                  }`}
                >
                  {lang === "ar" ? cat.labelAr : cat.labelEn}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={!input.trim() || isGenerating}
              className="bg-book-cloth text-white h-12 px-8 rounded-xl text-base font-semibold flex items-center gap-2 disabled:opacity-50 hover:bg-kraft transition-all w-full justify-center"
            >
              {isGenerating ? (
                <span className="diamond-loading"><span /><span /><span /><span /></span>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  {lang === "ar" ? "توليد الأمر" : "Generate Prompt"}
                </>
              )}
            </button>

            {output && (
              <div className="mt-4 rounded-xl bg-white border border-ivory-300 p-4">
                <p className="text-xs text-slate-400 mb-2">{lang === "ar" ? "النتيجة:" : "Result:"}</p>
                <pre className="text-sm text-slate-800 whitespace-pre-wrap font-mono" dir="ltr">{output}</pre>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TOOLS SECTION */}
      <section className="py-20 bg-gradient-to-b from-ivory-100 to-ivory-200/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              {lang === "ar" ? "أدوات بصيرة" : "Baseera Tools"}
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              {lang === "ar" ? "كل ما تحتاجه للعمل مع الذكاء الاصطناعي - في مكان واحد" : "Everything you need to work with AI - in one place"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.href} href={tool.href}>
                  <div className="group bg-white rounded-2xl p-6 border border-ivory-300 hover:border-book-cloth/50 transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-book-cloth to-kraft text-white mb-4 w-12 h-12">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-book-cloth transition-colors">
                      {lang === "ar" ? tool.nameAr : tool.nameEn}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {lang === "ar" ? tool.descAr : tool.descEn}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-900" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {lang === "ar" ? "لماذا بصيرة؟" : "Why Baseera?"}
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              {lang === "ar" ? "منصة صُممت لخدمتك - مجاناً ودون أي تعقيدات" : "A platform designed to serve you - free and without complications"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div className="group bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-book-cloth/50 transition-all hover:bg-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-book-cloth to-kraft flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {lang === "ar" ? benefit.titleAr : benefit.titleEn}
                      </h3>
                      <p className="text-slate-400">
                        {lang === "ar" ? benefit.descAr : benefit.descEn}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-book-cloth to-kraft text-white">
        <div className="absolute inset-0 geo-pattern opacity-20" />
        
        <div className="relative text-center max-w-3xl mx-auto px-4">
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            {lang === "ar" ? "ابدأ الآن - مجاناً" : "Start Now - It's Free"}
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            {lang === "ar"
              ? "لا حاجة للتسجيل أو الدفع. فقط أدخل فكرتك وابدأ."
              : "No registration or payment needed. Just enter your idea and start."}
          </p>

          <Link href="/text">
            <button className="bg-white text-slate-900 h-16 px-12 rounded-2xl text-lg font-bold flex items-center gap-3 mx-auto hover:scale-105 transition-all shadow-2xl">
              <Wand2 className="h-5 w-5" />
              {lang === "ar" ? "ابدأ مجاناً الآن" : "Start Free Now"}
            </button>
          </Link>

          <div className="flex items-center justify-center gap-6 mt-12 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>{lang === "ar" ? "بدون تكاليف" : "No Costs"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>{lang === "ar" ? "بدون تسجيل" : "No Signup"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>{lang === "ar" ? "بدون حدود" : "No Limits"}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}