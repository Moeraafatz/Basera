"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Wand2, Copy, Check, RotateCcw, Sparkles, Loader2, Lightbulb, Zap, Target, Cpu, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type Level = "simple" | "advanced" | "expert";

const CATEGORIES = [
  { name: "Content Creation", emoji: "📝", gradient: "from-violet-500 to-purple-500" },
  { name: "Business & Marketing", emoji: "💼", gradient: "from-emerald-500 to-teal-500" },
  { name: "Coding & Tech", emoji: "💻", gradient: "from-blue-500 to-cyan-500" },
  { name: "Creative Writing", emoji: "✍️", gradient: "from-pink-500 to-rose-500" },
  { name: "Education & Learning", emoji: "📚", gradient: "from-amber-500 to-orange-500" },
  { name: "Research & Analysis", emoji: "🔬", gradient: "from-indigo-500 to-violet-500" },
];

const MODELS = [
  { value: "chatgpt", label: "ChatGPT", color: "text-emerald-600", bg: "bg-emerald-100" },
  { value: "gpt-4o", label: "GPT-4o", color: "text-blue-600", bg: "bg-blue-100" },
  { value: "claude", label: "Claude", color: "text-orange-600", bg: "bg-orange-100" },
  { value: "gemini", label: "Gemini", color: "text-purple-600", bg: "bg-purple-100" },
];

const LEVELS: { value: Level; label: string; desc: string; gradient: string }[] = [
  { value: "simple", label: "Simple", desc: "Clear & concise", gradient: "from-emerald-400 to-teal-400" },
  { value: "advanced", label: "Advanced", desc: "Detailed & structured", gradient: "from-violet-400 to-purple-400" },
  { value: "expert", label: "Expert", desc: "Professional-grade", gradient: "from-pink-400 to-rose-400" },
];

const TIPS = [
  { icon: Target, text: "Be specific about output format", color: "text-violet-600", bg: "bg-violet-100" },
  { icon: Users, text: "Include target audience context", color: "text-pink-600", bg: "bg-pink-100" },
  { icon: Zap, text: "Mention constraints or requirements", color: "text-amber-600", bg: "bg-amber-100" },
  { icon: Cpu, text: "Ask for step-by-step reasoning", color: "text-emerald-600", bg: "bg-emerald-100" },
];

function generatePrompt(input: string, level: Level, category: string, model: string): string {
  if (!input.trim()) return "";

  const prefixes: Record<Level, string> = {
    simple: "You are a helpful AI assistant. Provide clear, concise responses.",
    advanced: "You are an expert AI assistant with deep domain knowledge. Provide detailed, well-structured responses with examples. Include reasoning steps.",
    expert: "You are a world-class expert. As a professional prompt engineer, deliver an exceptionally detailed response. Structure with clear sections, deep analysis, counterarguments, edge cases, best practices, and actionable recommendations.",
  };

  const categoryContext: Record<string, string> = {
    "Content Creation": "Focus on creating engaging, well-structured content optimized for your target audience.",
    "Business & Marketing": "Provide actionable strategies with measurable outcomes and professional tone.",
    "Coding & Tech": "Include code examples, best practices, and explain technical decisions.",
    "Creative Writing": "Bring creativity, vivid descriptions, and emotional depth to your writing.",
    "Education & Learning": "Explain concepts clearly, use analogies, and structure learning progressively.",
    "Research & Analysis": "Provide comprehensive analysis with data-driven insights and proper citations.",
  };

  const modelInstructions: Record<string, string> = {
    chatgpt: "Optimize for ChatGPT's conversational style and capabilities.",
    "gpt-4": "Leverage GPT-4's advanced reasoning and broad knowledge.",
    claude: "Format for Claude's thoughtful, detailed responses.",
    gemini: "Structure for Gemini's multimodal and fast responses.",
  };

  return `${prefixes[level]}\n\n${modelInstructions[model] || modelInstructions.chatgpt}\n\nTask: ${input}\n\nContext: ${categoryContext[category] || categoryContext["Content Creation"]}`;
}

export default function AIPromptGeneratorPage() {
  const [input, setInput] = useState("");
  const [level, setLevel] = useState<Level>("advanced");
  const [category, setCategory] = useState("Content Creation");
  const [model, setModel] = useState("chatgpt");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewOutput, setPreviewOutput] = useState("");
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true });

  useEffect(() => {
    if (!input.trim()) {
      setPreviewOutput("");
    } else {
      const timer = setTimeout(() => {
        setPreviewOutput(generatePrompt(input, level, category, model));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [input, level, category, model]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy.");
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setPreviewOutput("");
    setLevel("advanced");
    setCategory("Content Creation");
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "ai-prompt", input, level, category, model }),
      });
      const data = await res.json();
      setOutput(data.result || generatePrompt(input, level, category, model));
      toast.success("Prompt generated!");
    } catch {
      setOutput(generatePrompt(input, level, category, model));
      toast.error("API unavailable — using local generation");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-purple-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(124,58,237,0.1),transparent_40%)]" />
      
      <motion.div 
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          ref={contentRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-violet-600" />
            <span className="text-sm font-medium text-violet-700">Most Popular Tool</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            AI <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Prompt</span> Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into professional prompts for ChatGPT, Claude, Gemini, and more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="overflow-hidden bg-white/80 backdrop-blur border-0 shadow-xl">
                <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-semibold">Enter Your Task</h2>
                      <p className="text-white/70 text-sm">Describe what you want to achieve</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Your Prompt</label>
                        <span className="text-xs text-gray-500">{input.length}/500</span>
                      </div>
                      <textarea
                        placeholder="Describe your task... (e.g. Write a blog post about AI benefits)"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full min-h-[140px] rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 resize-none transition-all"
                      />
                      {input.length > 0 && (
                        <motion.button
                          onClick={() => setInput("")}
                          className="text-xs text-violet-600 hover:text-violet-700 mt-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Clear text
                        </motion.button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-2 block">Complexity</label>
                        <div className="grid grid-cols-3 gap-2">
                          {LEVELS.map((l) => (
                            <motion.button
                              key={l.value}
                              onClick={() => setLevel(l.value)}
                              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                level === l.value
                                  ? `bg-gradient-to-r ${l.gradient} text-white shadow-lg`
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {l.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-2 block">Category</label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger className="h-11 bg-gray-100 border-0 text-gray-900">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((c) => (
                              <SelectItem key={c.name} value={c.name} className="text-sm">
                                {c.emoji} {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-2 block">Target Model</label>
                        <Select value={model} onValueChange={setModel}>
                          <SelectTrigger className="h-11 bg-gray-100 border-0 text-gray-900">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {MODELS.map((m) => (
                              <SelectItem key={m.value} value={m.value} className="text-sm">
                                <span className="flex items-center gap-2">
                                  <span className={`w-2 h-2 rounded-full ${m.bg.replace('100', '500')}`} />
                                  {m.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        onClick={handleGenerate}
                        disabled={!input.trim() || isGenerating}
                        className="bg-gradient-to-r from-violet-600 to-purple-600 text-white h-12 px-8 rounded-xl text-sm font-semibold shadow-lg shadow-violet-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(124,58,237,0.4)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isGenerating ? (
                          <><Loader2 className="h-4 w-4 animate-spin" />Generating...</>
                        ) : (
                          <><Wand2 className="h-4 w-4" />Generate Prompt</>
                        )}
                      </motion.button>
                      {input.length > 0 && (
                        <motion.button
                          onClick={handleReset}
                          className="px-6 py-3 rounded-xl text-sm font-medium border-2 border-gray-200 hover:border-violet-300 hover:text-violet-600 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <RotateCcw className="h-4 w-4 inline mr-2" />
                          Reset
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="overflow-hidden bg-white/80 backdrop-blur border-0 shadow-xl">
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-white font-semibold">Generated Prompt</h2>
                        <p className="text-white/70 text-sm">Your optimized AI prompt</p>
                      </div>
                    </div>
                    {output && (
                      <motion.button
                        onClick={handleCopy}
                        className="px-4 py-2 rounded-lg bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied!" : "Copy"}
                      </motion.button>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {output ? (
                      <motion.div
                        key="output"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 p-4"
                      >
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-mono">{output}</pre>
                      </motion.div>
                    ) : previewOutput ? (
                      <motion.div
                        key="preview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 p-4"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                          <span className="text-xs font-medium text-amber-600">Live Preview</span>
                        </div>
                        <pre className="text-sm text-gray-400 whitespace-pre-wrap leading-relaxed font-mono">{previewOutput}</pre>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                      >
                        <motion.div
                          className="relative mb-4"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <div className="absolute inset-0 rounded-2xl bg-violet-500/20 blur-xl" />
                          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600">
                            <Sparkles className="h-8 w-8 text-white" />
                          </div>
                        </motion.div>
                        <p className="text-base font-medium text-gray-600 mb-1">Start typing for preview</p>
                        <p className="text-sm text-gray-400">Your optimized prompt will appear here</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Card className="p-5 bg-white/80 backdrop-blur border-0 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">Configuration</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Level", value: level.toUpperCase(), badge: "bg-gradient-to-r from-violet-500 to-purple-500 text-white" },
                    { label: "Category", value: category.split(" ")[0], badge: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white" },
                    { label: "Model", value: model.toUpperCase(), badge: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <Badge className={`${item.badge} text-xs px-3 py-1`}>
                        {item.value}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <Card className="p-5 bg-white/80 backdrop-blur border-0 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  <h3 className="text-base font-semibold text-gray-900">Pro Tips</h3>
                </div>
                <div className="space-y-3">
                  {TIPS.map((tip, i) => (
                    <motion.div
                      key={i}
                      className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                        selectedTip === i ? "bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedTip(selectedTip === i ? null : i)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tip.bg}`}>
                        <tip.icon className={`h-4 w-4 ${tip.color}`} />
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{tip.text}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}