"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Wand2, Sparkles, Image, Video, Shield, FileText, CheckCircle, ArrowRight, Zap, Loader2, Bot, Brain, Layers, ChevronDown, Play, Star, Users, Code, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const HERO_IMAGE = "/hero-image.webp";

const TOOLS = [
  {
    href: "/ai-prompt-generator",
    icon: Sparkles,
    name: "AI Prompt Generator",
    desc: "Transform ideas into professional AI prompts for ChatGPT, Claude, and Gemini",
    badge: "Most Popular",
    gradient: "from-violet-500 to-purple-600",
    hoverGradient: "hover:from-violet-600 hover:to-purple-700",
  },
  {
    href: "/prompt-checker",
    icon: CheckCircle,
    name: "Prompt Checker",
    desc: "Verify your prompt quality and get improvement suggestions",
    badge: "Free",
    gradient: "from-emerald-500 to-teal-600",
    hoverGradient: "hover:from-emerald-600 hover:to-teal-700",
  },
  {
    href: "/image-prompt",
    icon: Image,
    name: "Image Prompts",
    desc: "Create stunning AI images with optimized prompts for DALL-E and Midjourney",
    badge: "Popular",
    gradient: "from-pink-500 to-rose-600",
    hoverGradient: "hover:from-pink-600 hover:to-rose-700",
  },
  {
    href: "/veo3-prompt",
    icon: Video,
    name: "VEO3 Video Prompts",
    desc: "Create stunning AI videos with professional video generation prompts",
    badge: "New",
    gradient: "from-amber-500 to-orange-600",
    hoverGradient: "hover:from-amber-600 hover:to-orange-700",
  },
  {
    href: "/ai-humanizer",
    icon: Shield,
    name: "AI Humanizer",
    desc: "Make AI-generated text sound natural and human-written",
    badge: "Free",
    gradient: "from-cyan-500 to-blue-600",
    hoverGradient: "hover:from-cyan-600 hover:to-blue-700",
  },
  {
    href: "/image-to-prompt",
    icon: FileText,
    name: "Image to Prompt",
    desc: "Convert images to detailed AI image prompts",
    badge: "Popular",
    gradient: "from-indigo-500 to-violet-600",
    hoverGradient: "hover:from-indigo-600 hover:to-violet-700",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Enter Your Idea",
    desc: "Simply input your task, goal, or a simple prompt. Our tool works with any type of input.",
    color: "bg-violet-500",
  },
  {
    number: "02",
    title: "AI-Powered Enhancement",
    desc: "Our AI analyzes your input and generates a comprehensive, optimized prompt tailored for various AI models.",
    color: "bg-purple-500",
  },
  {
    number: "03",
    title: "Copy & Use",
    desc: "Copy the generated prompt with one click and use it directly in your preferred AI model.",
    color: "bg-pink-500",
  },
];

const STATS = [
  { value: "100K+", label: "Prompts Generated", icon: Zap, color: "text-violet-600" },
  { value: "10+", label: "AI Models Supported", icon: Bot, color: "text-purple-600" },
  { value: "100%", label: "Free to Use", icon: Star, color: "text-pink-600" },
  { value: "24/7", label: "Always Available", icon: Users, color: "text-emerald-600" },
];

const TESTIMONIALS = [
  { name: "Sarah Chen", role: "Content Creator", text: "This tool has completely transformed my workflow!", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { name: "Mike Johnson", role: "Developer", text: "The best free prompt generator I've found.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { name: "Emily Davis", role: "Marketer", text: "Saved me hours of work on content creation.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
];

function FloatingOrb({ delay = 0, size = 100, color = "bg-violet-500" }: { delay?: number; size?: number; color?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-30 ${color}`}
      style={{ width: size, height: size }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView && count < numericValue) {
      const timer = setTimeout(() => setCount(count + 1), 20);
      return () => clearTimeout(timer);
    }
  }, [inView, count, numericValue]);

  return <span>{count}{suffix}</span>;
}

export default function HomePage() {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const heroRef = useRef(null);
  const toolsRef = useRef(null);
  const statsRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const toolsInView = useInView(toolsRef, { once: true });
  const statsInView = useInView(statsRef, { once: true });

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "ai-prompt", input, level: "advanced", category: "general", model: "claude" }),
      });
      const data = await res.json();
      setOutput(data.result || "");
      toast.success("Prompt generated!");
    } catch {
      const parts = input.split(/[\s,]+/).filter(Boolean);
      const topic = parts.slice(0, 6).join(" ");
      setOutput(`You are an expert AI assistant with deep knowledge.\n\nCreate comprehensive content about: ${topic}\n\nAdditional Context:\n${input}\n\nProvide a detailed, well-structured response with examples. Include reasoning steps and actionable recommendations.`);
    }

    setIsGenerating(false);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - Full Width Photo Background */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center"
        style={{ y: heroY }}
      >
        {/* Full-width background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundPosition: 'center',
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        
        {/* Floating particles on top */}
        <FloatingOrb delay={0} size={300} color="bg-violet-600" />
        <FloatingOrb delay={2} size={200} color="bg-purple-600" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="w-2 h-2 bg-violet-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-white">
                  100% Free — No Registration Required
                </span>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                The Most Advanced{" "}
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Free AI Prompt Generator
                </span>
              </motion.h1>

              <motion.p 
                className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Transform your ideas into professional prompts for ChatGPT, Claude, Gemini, and more. Enhance output quality and boost your productivity.
              </motion.p>

              <motion.div 
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { icon: Bot, label: "10+ AI Models", bg: "bg-white/10" },
                  { icon: Brain, label: "100+ Prompts", bg: "bg-white/10" },
                  { icon: Layers, label: "6 Tools", bg: "bg-white/10" },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${item.bg} backdrop-blur-sm border border-white/10`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <item.icon className="h-5 w-5 text-violet-400" />
                    <span className="text-sm font-medium text-white">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link href="/ai-prompt-generator">
                  <motion.button 
                    className="bg-gradient-to-r from-violet-600 to-purple-600 text-white h-12 px-8 rounded-xl text-base font-medium shadow-lg shadow-violet-500/30 flex items-center gap-2 backdrop-blur-sm"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(124,58,237,0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles className="h-5 w-5" />
                    Start Creating
                  </motion.button>
                </Link>
                
              </motion.div>
            </motion.div>

            <motion.div 
              className="hidden lg:block relative"
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Try it card on the right side */}
              <motion.div 
                className="relative"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <Wand2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white font-semibold">Try it now</span>
                  </div>
                  <textarea
                    placeholder="Describe your task... (e.g. Write a blog post about AI benefits)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full min-h-[80px] rounded-xl bg-white/20 backdrop-blur border border-white/30 px-4 py-3 text-sm text-white placeholder:text-gray-300 focus:border-violet-500 resize-none mb-4"
                  />
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {["📝 Content", "💼 Business", "💻 Coding", "✍️ Creative"].map((cat) => (
                      <span key={cat} className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">{input.length}/500</span>
                    <motion.button
                      onClick={handleGenerate}
                      disabled={!input.trim() || isGenerating}
                      className="bg-gradient-to-r from-violet-600 to-purple-600 text-white h-10 px-5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isGenerating ? (
                        <><Loader2 className="h-4 w-4 animate-spin" />Generating...</>
                      ) : (
                        <><Wand2 className="h-4 w-4" />Generate</>
                      )}
                    </motion.button>
                  </div>
                  <AnimatePresence>
                    {output && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-4 rounded-xl bg-white/20 backdrop-blur border border-white/30"
                      >
                        <pre className="text-sm text-white whitespace-pre-wrap leading-relaxed font-mono">{output}</pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-white/60" />
        </motion.div>
      </motion.section>

      {/* Quick Try Section - Mobile only */}
      <section className="lg:hidden py-12 px-4 bg-gradient-to-b from-black to-gray-900">
        <Card className="max-w-md mx-auto p-6 bg-white/10 backdrop-blur-xl border border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Wand2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-white font-semibold">Quick Try</span>
          </div>
          <textarea
            placeholder="Enter your idea..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full min-h-[100px] rounded-xl bg-white/10 backdrop-blur border border-white/20 px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:border-violet-500 resize-none mb-4"
          />
          <motion.button
            onClick={handleGenerate}
            disabled={!input.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white h-11 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            whileTap={{ scale: 0.95 }}
          >
            {isGenerating ? (
              <><Loader2 className="h-4 w-4 animate-spin" />Generating...</>
            ) : (
              <><Wand2 className="h-4 w-4" />Generate Prompt</>
            )}
          </motion.button>
          <AnimatePresence>
            {output && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 p-4 rounded-xl bg-white/10 backdrop-blur border border-white/20"
              >
                <pre className="text-sm text-white whitespace-pre-wrap leading-relaxed font-mono">{output}</pre>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </section>

      {/* Tools Grid */}
      <motion.section 
        ref={toolsRef}
        className="py-20 sm:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-violet-50/30 to-white" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={toolsInView ? { opacity: 1, y: 0 } : {}}
          >
            <motion.span 
              className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 text-sm font-medium text-violet-700 mb-4"
              initial={{ scale: 0 }}
              animate={toolsInView ? { scale: 1 } : {}}
            >
              ✨ All the Tools You Need
            </motion.span>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
              Supercharge Your <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">AI Workflow</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A complete suite of AI prompt tools — from text generation to image prompts, all in one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={toolsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={tool.href}>
                    <motion.div
                      className="group relative h-full bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-transparent cursor-pointer overflow-hidden"
                      whileHover={{ y: -5 }}
                    >
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} ${tool.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <motion.div 
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg`}
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon className="h-6 w-6" />
                          </motion.div>
                          <Badge className={`bg-gradient-to-r ${tool.gradient} text-white border-0`}>
                            {tool.badge}
                          </Badge>
                        </div>
                        
                        <motion.h3 
                          className="text-xl font-bold text-gray-900 mb-2 group-hover:text-white transition-colors"
                        >
                          {tool.name}
                        </motion.h3>
                        
                        <p className="text-sm text-gray-600 group-hover:text-white/80 leading-relaxed mb-4">
                          {tool.desc}
                        </p>
                        
                        <motion.div 
                          className="flex items-center gap-1 text-sm font-semibold text-violet-600 group-hover:text-white transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          Use Tool <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-sm font-medium text-purple-700 mb-4">
              🚀 Simple Process
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
              Create Perfect AI Prompts <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">in Seconds</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <motion.div 
                  className={`flex h-20 w-20 items-center justify-center rounded-3xl ${step.color} text-white text-2xl font-bold mb-6 shadow-xl mx-auto`}
                  whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                >
                  {step.number}
                </motion.div>
                
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%]">
                    <motion.div 
                      className="w-full h-1 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.2 }}
                    />
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        ref={statsRef}
        className="py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600" />
        
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, transparent 50%)",
              "linear-gradient(135deg, rgba(147,51,234,0.1) 0%, transparent 50%)",
              "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div 
                  className={`text-4xl sm:text-5xl font-bold text-white mb-2`}
                >
                  <AnimatedCounter value={stat.value} inView={statsInView} />
                </motion.div>
                <div className="flex items-center justify-center gap-2 text-white/80">
                  <stat.icon className={`h-5 w-5 ${stat.color.replace('text-', 'text-white/')}`} />
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-violet-50/30" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 text-sm font-medium text-pink-700 mb-4">
              💬 Testimonials
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900">
              Loved by <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Thousands</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="relative h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="absolute inset-0"
                >
                  <Card className="h-full p-8 text-center bg-white/80 backdrop-blur border-0 shadow-xl">
                    <img 
                      src={TESTIMONIALS[currentTestimonial].avatar}
                      alt={TESTIMONIALS[currentTestimonial].name}
                      className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                    />
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                      "{TESTIMONIALS[currentTestimonial].text}"
                    </p>
                    <p className="font-bold text-gray-900">{TESTIMONIALS[currentTestimonial].name}</p>
                    <p className="text-sm text-gray-500">{TESTIMONIALS[currentTestimonial].role}</p>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentTestimonial 
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 w-8" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section 
        className="py-20 sm:py-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600" />
        
        <motion.div 
          className="absolute inset-0"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.2),transparent_50%)]" />
        </motion.div>
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl sm:text-5xl font-bold text-white mb-6"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your AI Prompts?
          </motion.h2>
          
          <motion.p 
            className="text-lg text-white/80 mb-8 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Start generating professional AI prompts for free. No registration, no hidden costs.
          </motion.p>
          
          <Link href="/ai-prompt-generator">
            <motion.button 
              className="bg-white text-violet-600 h-14 px-10 rounded-xl text-base font-bold shadow-xl flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05, boxShadow: "0 30px 60px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-5 w-5" />
              Start Creating for Free
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}