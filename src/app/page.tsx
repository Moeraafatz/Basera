"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Wand2, Sparkles, Image as ImageIcon, Video, FileText, BarChart3,
  Zap, ArrowLeft, Bot, Globe, Infinity, Check, ChevronLeft, ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslate, useLang } from "@/lib/i18n";
import { DiamondDot } from "@/components/ui/diamond-dot";

type Level = "simple" | "advanced" | "expert";

const CATEGORIES = [
  { id: "content", labelAr: "محتوى", labelEn: "Content" },
  { id: "business", labelAr: "أعمال", labelEn: "Business" },
  { id: "coding", labelAr: "برمجة", labelEn: "Coding" },
  { id: "creative", labelAr: "إبداعي", labelEn: "Creative" },
] as const;

const TOOLS = [
  { href: "/text", icon: Sparkles, nameAr: "محسّن الأوامر", nameEn: "Prompt Enhancer", descAr: "حوّل أفكارك إلى أوامر احترافية للذكاء الاصطناعي", descEn: "Transform your ideas into professional AI prompts" },
  { href: "/cv", icon: FileText, nameAr: "تحسين السيرة الذاتية", nameEn: "CV Optimizer", descAr: "حلل وحسّن سيرتك الذاتية لأي سوق عمل", descEn: "Analyze and optimize your CV for any job market" },
  { href: "/image", icon: ImageIcon, nameAr: "أوامر الصور", nameEn: "Image Prompts", descAr: "أنشئ أوامر قوية لتوليد الصور بالذكاء الاصطناعي", descEn: "Create powerful prompts for AI image generation" },
  { href: "/video", icon: Video, nameAr: "أوامر الفيديو", nameEn: "Video Prompts", descAr: "أوامر احترافية لتوليد الفيديو بالذكاء الاصطناعي", descEn: "Professional prompts for AI video generation" },
  { href: "/analytics", icon: BarChart3, nameAr: "التحليلات", nameEn: "Analytics", descAr: "تتبع الاستخدام وقارن بين النماذج", descEn: "Track usage and compare models" },
];

const BENEFITS = [
  { icon: Infinity, titleAr: "مجاناً للأبد", titleEn: "Free Forever", descAr: "استخدم جميع الأدوات بدون أي تكاليف أو اشتراكات", descEn: "Use all tools with no costs or subscriptions" },
  { icon: Globe, titleAr: "بالعربية", titleEn: "In Arabic", descAr: "واجهة وأدوات بالكامل باللغة العربية", descEn: "Interface and tools fully in Arabic" },
  { icon: Bot, titleAr: "يدعم كل النماذج", titleEn: "All AI Models", descAr: "يعمل مع GPT, Claude, Gemini, Grok والمزيد", descEn: "Works with GPT, Claude, Gemini, Grok and more" },
  { icon: Zap, titleAr: "بدون تسجيل", titleEn: "No Signup", descAr: "ابدأ فوراً بدون الحاجة لإنشاء حساب", descEn: "Start instantly without creating an account" },
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
    simple: "You are a helpful AI assistant.",
    advanced: "You are a highly skilled AI expert with deep domain knowledge.",
    expert: "You are a world-class specialist and thought leader.",
  };
  const detail: Record<Level, string> = {
    simple: `TASK: ${input}\n\nProvide a concise answer under 200 words.`,
    advanced: `TASK: ${input}\n\nProvide a comprehensive response with clear sections and examples.`,
    expert: `ROLE: Senior specialist\nTASK: ${input}\n\nDeliver an exceptionally detailed response with multi-angle analysis.`,
  };
  return `${prefixes[level]}\n\nContext: ${fullCategory}\n\n${detail[level]}`;
}

function SlideSection({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section
      id={id}
      className={`min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}

export default function HomePage() {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("content");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slides.findIndex((s) => s.id === entry.target.id);
            if (index !== -1) setCurrentSlide(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    ["hero", "tools", "benefits", "cta"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const heroRef = useRef(null);
  const demoRef = useRef(null);
  const toolsRef = useRef(null);
  const benefitsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-10%" });
  const demoInView = useInView(demoRef, { once: true, margin: "-10%" });
  const toolsInView = useInView(toolsRef, { once: true, margin: "-10%" });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-10%" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-10%" });

  const t = useTranslate();
  const lang = useLang();

  const slides = [
    { id: "hero", inView: heroInView },
    { id: "tools", inView: toolsInView },
    { id: "benefits", inView: benefitsInView },
    { id: "cta", inView: ctaInView },
  ];

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

  const scrollToSection = (index: number) => {
    const sectionIds = ["hero", "tools", "benefits", "cta"];
    document.getElementById(sectionIds[index])?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-ivory-100 relative">
      {/* Progress Dots */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === i ? "bg-book-cloth scale-125" : "bg-ivory-300 hover:bg-ivory-400"
            }`}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>

      {/* SLIDE 1: Hero - Bold Typography */}
      <SlideSection id="hero" className="bg-gradient-to-br from-ivory-100 via-ivory-200/50 to-manilla/20">
        <div className="absolute inset-0 geo-pattern opacity-50" />
        
        <div className="relative max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`text-center ${lang === "ar" ? "lg:text-right" : "lg:text-left"}`}
          >
            {/* FREE Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg mb-8 shadow-lg shadow-green-500/25"
            >
              <Infinity className="h-5 w-5" />
              <span>{lang === "ar" ? "مجاناً ١٠٠٪" : "100% FREE"}</span>
              <span className="opacity-70 text-sm font-normal mx-1">|</span>
              <span className="opacity-80 text-sm font-normal">{lang === "ar" ? "للأبد" : "Forever"}</span>
            </motion.div>

            {/* Main Title - Editorial Style */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight font-display-ar">
              {lang === "ar" ? (
                <>
                  بصيرة<span className="text-book-cloth">.</span>
                </>
              ) : (
                <>
                  Baseera<span className="text-book-cloth">.</span>
                </>
              )}
            </h1>

            {/* Tagline - Large & Bold */}
            <p className="text-2xl sm:text-3xl text-slate-700 mb-4 font-medium">
              {lang === "ar" 
                ? "حوّل أفكارك إلى أوامر احترافية للذكاء الاصطناعي" 
                : "Transform Ideas into Professional AI Prompts"}
            </p>

            {/* Description */}
            <p className="text-lg text-slate-500 mb-10 max-w-xl leading-relaxed">
              {lang === "ar"
                ? "منصة عربية مجانية ١٠٠٪ لتوليد وتحسين أوامر الذكاء الاصطناعي في كل المجالات"
                : "A 100% free Arabic platform for generating and enhancing AI prompts in every field"}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/text">
                <button className="bg-slate-900 text-white h-14 px-10 rounded-2xl text-base font-semibold flex items-center gap-3 hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-slate-900/20">
                  <Wand2 className="h-5 w-5" />
                  {lang === "ar" ? "ابدأ الآن مجاناً" : "Start Free Now"}
                  <ArrowLeft className={`h-4 w-4 ${lang === "ar" ? "" : "rotate-180"}`} />
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
              <div className="text-center lg:text-right">
                <p className="text-3xl font-bold text-slate-900">٥+</p>
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
          </motion.div>

          {/* Decorative Element */}
          <motion.div
            initial={{ opacity: 0, rotate: -45 }}
            animate={heroInView ? { opacity: 1, rotate: -45 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -left-20 top-1/4 w-40 h-40 border-[3px] border-book-cloth/20 rounded-full hidden lg:block"
          />
          <motion.div
            initial={{ opacity: 0, rotate: 45 }}
            animate={heroInView ? { opacity: 1, rotate: 45 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -left-10 bottom-1/4 w-24 h-24 border-[2px] border-kraft/30 rounded-full hidden lg:block"
          />
        </div>
      </SlideSection>

      {/* SLIDE 2: Interactive Demo */}
      <SlideSection className="bg-white">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={demoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              {lang === "ar" ? "جرّب الآن" : "Try It Now"}
            </h2>
            <p className="text-slate-500">
              {lang === "ar" ? "أدخل فكرتك وشاهد النتيجة فوراً" : "Enter your idea and see results instantly"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={demoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-ivory-100 rounded-3xl border border-ivory-300 p-6 sm:p-8 shadow-2xl"
          >
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
              placeholder={lang === "ar" ? "صِف مهمتك... مثال: أكتب رسالة تعريفية لصفحتي الشخصية" : "Describe your task... Example: Write an bio for my LinkedIn profile"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full min-h-[100px] rounded-xl bg-white border border-ivory-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-book-cloth focus:ring-2 focus:ring-book-cloth/20 resize-none mb-4"
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
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl bg-white border border-ivory-300 p-4"
              >
                <p className="text-xs text-slate-400 mb-2">{lang === "ar" ? "النتيجة:" : "Result:"}</p>
                <pre className="text-sm text-slate-800 whitespace-pre-wrap font-mono" dir="ltr">{output}</pre>
              </motion.div>
            )}
          </motion.div>
        </div>
      </SlideSection>

      {/* SLIDE 3: Tools Grid - Asymmetric */}
      <SlideSection id="tools" className="bg-gradient-to-b from-ivory-100 to-ivory-200/30">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={toolsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              {lang === "ar" ? "أدوات بصيرة" : "Baseera Tools"}
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              {lang === "ar" 
                ? "كل ما تحتاجه للعمل مع الذكاء الاصطناعي - في مكان واحد" 
                : "Everything you need to work with AI - in one place"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TOOLS.map((tool, i) => {
              const Icon = tool.icon;
              const isLarge = i === 0;
              
              return (
                <Link key={tool.href} href={tool.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={toolsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className={`group bg-white rounded-2xl p-6 border border-ivory-300 hover:border-book-cloth/50 transition-all hover:shadow-xl hover:-translate-y-1 ${
                      isLarge ? "lg:col-span-2 lg:row-span-2" : ""
                    }`}
                  >
                    <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-book-cloth to-kraft text-white mb-4 ${
                      isLarge ? "w-16 h-16" : "w-12 h-12"
                    }`}>
                      <Icon className={isLarge ? "h-8 w-8" : "h-5 w-5"} />
                    </div>
                    <h3 className={`font-semibold text-slate-900 mb-2 group-hover:text-book-cloth transition-colors ${
                      isLarge ? "text-xl" : "text-base"
                    }`}>
                      {lang === "ar" ? tool.nameAr : tool.nameEn}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {lang === "ar" ? tool.descAr : tool.descEn}
                    </p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </SlideSection>

      {/* SLIDE 4: Benefits - Large Cards */}
      <SlideSection className="bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-900" />
        
        <div className="relative max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {lang === "ar" ? "لماذا بصيرة؟" : "Why Baseera?"}
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              {lang === "ar"
                ? "منصة صُممت لخدمتك - مجاناً ودون أي تعقيدات"
                : "A platform designed to serve you - free and without complications"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon;
              
              return (
                <motion.div
                  key={benefit.titleEn}
                  initial={{ opacity: 0, y: 20 }}
                  animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-book-cloth/50 transition-all hover:bg-slate-800"
                >
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </SlideSection>

      {/* SLIDE 5: Final CTA */}
      <SlideSection className="bg-gradient-to-br from-book-cloth to-kraft text-white">
        <div className="absolute inset-0 geo-pattern opacity-20" />
        
        <div className="relative text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              {lang === "ar" ? "ابدأ الآن - مجاناً" : "Start Now - It's Free"}
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              {lang === "ar"
                ? "لا حاجة للتسجيل أو الدفع. فقط أدخل فكرتك وابدأ في تحسين أوامرك للذكاء الاصطناعي فوراً."
                : "No registration or payment needed. Just enter your idea and start improving your AI prompts instantly."}
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
          </motion.div>
        </div>
      </SlideSection>
    </div>
  );
}