"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Wand2, Sparkles, Image as ImageIcon, Video, FileText, BarChart3,
  CheckCircle, Zap, Loader2, ArrowLeft, Bot, Globe, Edit3, FileSearch,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslate, useLang } from "@/lib/i18n";
import { WaveDivider } from "@/components/ui/wave-divider";
import { DiamondDot } from "@/components/ui/diamond-dot";

type Level = "simple" | "advanced" | "expert";

const CATEGORIES = [
  { id: "content", labelAr: "محتوى", labelEn: "Content" },
  { id: "business", labelAr: "أعمال", labelEn: "Business" },
  { id: "coding", labelAr: "برمجة", labelEn: "Coding" },
  { id: "creative", labelAr: "إبداعي", labelEn: "Creative" },
] as const;

const TOOLS_BASE = [
  { href: "/text", icon: Sparkles, nameAr: "Prompt Enhancer", nameEn: "Prompt Enhancer", descAr: "Transform your ideas into professional prompts for any AI model", descEn: "Transform your ideas into professional prompts for any AI model", gradient: "from-slate-900 to-slate-700" },
  { href: "/cv", icon: FileText, nameAr: "CV Analyzer", nameEn: "CV Analyzer", descAr: "Analyze, optimize, and edit your resume for any job market", descEn: "Analyze, optimize, and edit your resume for any job market", gradient: "from-slate-800 to-slate-600" },
  { href: "/image", icon: ImageIcon, nameAr: "Image Prompts", nameEn: "Image Prompts", descAr: "Create powerful prompts for AI image generation", descEn: "Create powerful prompts for AI image generation", gradient: "from-slate-700 to-slate-500" },
  { href: "/video", icon: Video, nameAr: "Video Prompts", nameEn: "Video Prompts", descAr: "Professional prompts for AI video generation", descEn: "Professional prompts for AI video generation", gradient: "from-slate-800 to-slate-600" },
  { href: "/analytics", icon: BarChart3, nameAr: "Analytics", nameEn: "Analytics", descAr: "Track usage, compare models, and estimate costs", descEn: "Track usage, compare models, and estimate costs", gradient: "from-slate-600 to-slate-400" },
];

const FEATURES_BASE = [
  { icon: Bot, nameAr: "Multi-Model", nameEn: "Multi-Model", descAr: "Works with all major AI models - GPT, Claude, Gemini, and more", descEn: "Works with all major AI models - GPT, Claude, Gemini, and more" },
  { icon: Globe, nameAr: "Every Field", nameEn: "Every Field", descAr: "Prompts for content, business, coding, creative, marketing, and more", descEn: "Prompts for content, business, coding, creative, marketing, and more" },
  { icon: Edit3, nameAr: "Live Editing", nameEn: "Live Editing", descAr: "Edit and refine your prompts in real-time with AI assistance", descEn: "Edit and refine your prompts in real-time with AI assistance" },
  { icon: FileSearch, nameAr: "CV Optimization", nameEn: "CV Optimization", descAr: "Analyze and improve your resume for any job market worldwide", descEn: "Analyze and improve your resume for any job market worldwide" },
];

function generatePrompt(input: string, level: Level, category: string): string {
  if (!input.trim()) return "";
  const categoryMap: Record<string, string> = {
    content: "Content Creation",
    business: "Business & Marketing",
    coding: "Coding & Tech",
    creative: "Creative Writing",
  };
  const fullCategory = categoryMap[category] || "Content Creation";
  const prefixes: Record<Level, string> = {
    simple: "You are a helpful AI assistant. Your goal is to provide clear, concise, and practical responses.",
    advanced: "You are a highly skilled AI expert with deep domain knowledge.",
    expert: "You are a world-class specialist and thought leader.",
  };
  const detail: Record<Level, string> = {
    simple: `TASK: ${input}\n\nProvide a concise answer under 200 words.`,
    advanced: `TASK: ${input}\n\nProvide a comprehensive response with clear sections, examples, and actionable recommendations.`,
    expert: `ROLE: Senior specialist\nTASK: ${input}\n\nDeliver an exceptionally detailed response with multi-angle analysis, methodology, edge cases, and quality criteria.`,
  };
  return `${prefixes[level]}\n\nContext: ${fullCategory}\n\n${detail[level]}`;
}

export default function HomePage() {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("content");

  const heroRef = useRef<HTMLElement>(null);
  const toolsRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const toolsInView = useInView(toolsRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });

  const t = useTranslate();
  const lang = useLang();

  const TOOLS = TOOLS_BASE.map((tool) => ({
    ...tool,
    name: lang === "ar" ? tool.nameAr : tool.nameEn,
    desc: lang === "ar" ? tool.descAr : tool.descEn,
  }));

  const FEATURES = FEATURES_BASE.map((f) => ({
    ...f,
    name: lang === "ar" ? f.nameAr : f.nameEn,
    desc: lang === "ar" ? f.descAr : f.descEn,
  }));

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
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Hero */}
      <section ref={heroRef} className="relative pt-24 pb-20 overflow-hidden geo-pattern gradient-mesh">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className={`text-center ${lang === "ar" ? "lg:text-right" : "lg:text-left"}`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory-200/60 text-slate-600 text-sm mb-8">
                <Zap className="h-3.5 w-3.5 text-book-cloth" />
                <span>{lang === "ar" ? t("hero.models") : t("hero.models")}</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 leading-tight font-display-ar">
                {lang === "ar" ? "بصيرة" : "Baseera"}
              </h1>
              <p className="text-xl sm:text-2xl text-slate-600 mb-3 hero-tagline">
                {lang === "ar" ? "حوّل أفكارك إلى أوامر احترافية للذكاء الاصطناعي" : "Transform Ideas into Professional AI Prompts"}
              </p>
              <p className="text-base text-slate-500 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {lang === "ar"
                  ? "منصة شاملة لتحسين أوامر الذكاء الاصطناعي في كل مجال - النصوص، الصور، الفيديو، الكود، والسيرة الذاتية"
                  : "A universal platform for enhancing AI prompts across every field — text, images, video, code, and CVs"}
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link href="/text">
                  <button className="bg-slate-900 text-white h-12 px-8 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-sm">
                    <Wand2 className="h-4 w-4" />
                    {t("hero.cta")}
                    <ArrowLeft className={`h-4 w-4 ${lang === "ar" ? "" : "rotate-180"}`} />
                  </button>
                </Link>
              </div>

              <p className="mt-6 text-sm text-slate-400">
                {lang === "ar" ? t("hero.stats") : t("hero.stats")}
              </p>
            </motion.div>

            {/* Demo Board */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl border border-ivory-300 shadow-xl p-6 min-h-[400px] grain-overlay card-depth"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                  <Wand2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-slate-900 font-semibold text-sm block">
                    {lang === "ar" ? "جرّب الآن" : "Try it now"}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {lang === "ar" ? "توليد فوري" : "Instant generation"}
                  </span>
                </div>
              </div>

              <textarea
                placeholder={lang === "ar" ? "صِف مهمتك..." : "Describe your task..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full min-h-[80px] rounded-xl bg-[#FAFAF7] border border-ivory-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-book-cloth focus:ring-1 focus:ring-book-cloth/30 resize-none mb-4 transition-colors"
                dir={lang === "ar" ? "rtl" : "ltr"}
              />

              <div className="flex flex-wrap gap-2 mb-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === cat.id
                        ? "bg-slate-900 text-white"
                        : "bg-ivory-200 text-slate-500 hover:bg-ivory-300"
                    }`}
                  >
                    {lang === "ar" ? cat.labelAr : cat.labelEn}
                  </button>
                ))}
              </div>

              <button
                onClick={handleGenerate}
                disabled={!input.trim() || isGenerating}
                className="bg-slate-900 text-white h-10 px-5 rounded-xl text-sm font-medium flex items-center gap-2 disabled:opacity-50 hover:bg-slate-800 transition-colors shadow-sm"
              >
                {isGenerating ? (
                  <><span className="diamond-loading"><span /><span /><span /><span /></span>{t("common.generating")}</>
                ) : (
                  <><Wand2 className="h-4 w-4" />{t("common.generate")}</>
                )}
              </button>

              <div className="mt-4 rounded-xl bg-[#FAFAF7] border border-ivory-300 p-4 min-h-[100px]">
                {output ? (
                  <pre className="text-sm text-slate-800 whitespace-pre-wrap font-mono" dir="ltr">{output}</pre>
                ) : (
                  <p className="text-slate-400 text-sm">
                    {lang === "ar" ? "أدخل نصّاً واضغط توليد" : "Enter text and click Generate"}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <WaveDivider className="max-w-7xl mx-auto" />

      {/* Tools */}
      <section ref={toolsRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={toolsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-14"
          >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                {lang === "ar" ? "أدواتنا" : "Our Tools"}
              </h2>
              <p className="text-slate-500">
                {lang === "ar" ? "مجموعة متكاملة من أدوات تحسين الأوامر" : "A complete suite of AI prompt enhancement tools"}
              </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.href} href={tool.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={toolsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.08 }}
                    className="group bg-white rounded-2xl p-6 border border-ivory-300 hover:border-book-cloth/40 transition-all hover:shadow-lg hover:-translate-y-0.5 corner-brackets grain-overlay card-depth"
                  >
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient} text-white mb-4`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1.5 group-hover:text-book-cloth transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{tool.desc}</p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <WaveDivider className="max-w-7xl mx-auto" />

      {/* Features */}
      <section ref={featuresRef} className="py-20 bg-white border-y border-ivory-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-14"
          >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                {lang === "ar" ? "لماذا بصيرة؟" : "Why Baseera?"}
              </h2>
              <p className="text-slate-500">
                {lang === "ar" ? "أفضل منصة شاملة لتحسين أوامر الذكاء الاصطناعي" : "The most comprehensive AI prompt enhancement platform"}
              </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="text-center corner-brackets"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-book-cloth/10 mx-auto mb-4">
                    <Icon className="h-6 w-6 text-book-cloth" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{feature.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            {lang === "ar" ? "استعد لصياغة إبداعك" : "Ready to Craft Your Creativity?"}
          </h2>
          <p className="text-slate-500 mb-8">
            {lang === "ar"
              ? "ابدأ الآن في توليد أوامر احترافية بالذكاء الاصطناعي مجاناً"
              : "Start generating professional AI commands for free"}
          </p>
          <Link href="/text">
            <button className="bg-book-cloth text-white h-12 px-10 rounded-xl text-sm font-semibold flex items-center gap-2 mx-auto hover:bg-kraft transition-colors shadow-sm">
              <Wand2 className="h-4 w-4" />
              {t("hero.cta")}
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
