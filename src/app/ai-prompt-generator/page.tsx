"use client";

import { useState, useEffect, useCallback } from "react";
import { Wand2, Copy, Check, RotateCcw, Sparkles, Loader2, Lightbulb, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type Level = "simple" | "advanced" | "expert";

const CATEGORIES = [
  { name: "Content Creation", emoji: "📝" },
  { name: "Business & Marketing", emoji: "💼" },
  { name: "Coding & Tech", emoji: "💻" },
  { name: "Creative Writing", emoji: "✍️" },
  { name: "Education & Learning", emoji: "📚" },
  { name: "Research & Analysis", emoji: "🔬" },
];

const LEVELS: { value: Level; label: string; gradient: string }[] = [
  { value: "simple", label: "Simple", gradient: "from-emerald-400 to-teal-400" },
  { value: "advanced", label: "Advanced", gradient: "from-violet-400 to-purple-400" },
  { value: "expert", label: "Expert", gradient: "from-pink-400 to-rose-400" },
];

function generatePrompt(input: string, level: Level, category: string): string {
  if (!input.trim()) return "";

  const prefixes: Record<Level, string> = {
    simple: "You are a helpful AI assistant. Provide clear, concise responses.",
    advanced: "You are an expert AI assistant with deep domain knowledge. Provide detailed, well-structured responses with examples.",
    expert: "You are a world-class expert. Deliver an exceptionally detailed response with deep analysis, best practices, and actionable recommendations.",
  };

  const categoryContext: Record<string, string> = {
    "Content Creation": "Focus on creating engaging, well-structured content.",
    "Business & Marketing": "Provide actionable strategies with measurable outcomes.",
    "Coding & Tech": "Include code examples and best practices.",
    "Creative Writing": "Bring creativity and vivid descriptions.",
    "Education & Learning": "Explain concepts clearly with analogies.",
    "Research & Analysis": "Provide comprehensive analysis with insights.",
  };

  return `${prefixes[level]}\n\nTask: ${input}\n\nContext: ${categoryContext[category] || categoryContext["Content Creation"]}`;
}

export default function AIPromptGeneratorPage() {
  const [input, setInput] = useState("");
  const [level, setLevel] = useState<Level>("advanced");
  const [category, setCategory] = useState("Content Creation");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewOutput, setPreviewOutput] = useState("");

  const updatePreview = useCallback(() => {
    if (!input.trim()) {
      setPreviewOutput("");
    } else {
      const timer = setTimeout(() => {
        setPreviewOutput(generatePrompt(input, level, category));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [input, level, category]);

  useEffect(() => {
    updatePreview();
  }, [updatePreview]);

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
        body: JSON.stringify({ type: "ai-prompt", input, level, category, model: "chatgpt" }),
      });
      const data = await res.json();
      setOutput(data.result || generatePrompt(input, level, category));
      toast.success("Prompt generated!");
    } catch {
      setOutput(generatePrompt(input, level, category));
      toast.error("API unavailable — using local generation");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            AI <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">Prompt</span> Generator
          </h1>
          <p className="text-gray-600">Transform your ideas into professional prompts.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Input Card */}
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

              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Your Prompt</label>
                  <textarea
                    placeholder="Describe your task... (e.g. Write a blog post about AI benefits)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full min-h-[120px] rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-2 block">Complexity</label>
                    <div className="grid grid-cols-3 gap-2">
                      {LEVELS.map((l) => (
                        <button
                          key={l.value}
                          onClick={() => setLevel(l.value)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            level === l.value
                              ? `bg-gradient-to-r ${l.gradient} text-white`
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {l.label}
                        </button>
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
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleGenerate}
                    disabled={!input.trim() || isGenerating}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
                  >
                    {isGenerating ? <><Loader2 className="h-4 w-4 animate-spin" />Generating...</> : <><Wand2 className="h-4 w-4" />Generate</>}
                  </button>
                  {input && (
                    <button onClick={handleReset} className="px-4 py-3 rounded-xl text-sm font-medium border-2 border-gray-200 hover:border-violet-300 text-gray-600">
                      <RotateCcw className="h-4 w-4 inline mr-2" />Reset
                    </button>
                  )}
                </div>
              </div>
            </Card>

            {/* Output Card */}
            <Card className="overflow-hidden bg-white/80 backdrop-blur border-0 shadow-xl">
              <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-semibold">Generated Prompt</h2>
                      <p className="text-white/70 text-sm">Your optimized prompt</p>
                    </div>
                  </div>
                  {output && (
                    <button onClick={handleCopy} className="px-4 py-2 rounded-lg bg-white/20 text-white text-sm font-medium flex items-center gap-2">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                {output ? (
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-violet-50 p-4 rounded-xl">{output}</pre>
                ) : previewOutput ? (
                  <pre className="text-sm text-gray-400 whitespace-pre-wrap font-mono bg-gray-50 p-4 rounded-xl border-2 border-dashed">{previewOutput}</pre>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Sparkles className="h-10 w-10 mx-auto mb-2 opacity-30" />
                    <p>Start typing for preview</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-5 bg-white/80 backdrop-blur border-0 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-5 w-5 text-violet-600" />
                <h3 className="font-semibold text-gray-900">Configuration</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-sm text-gray-600">Level</span>
                  <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white text-xs px-3 py-1">
                    {level.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-sm text-gray-600">Category</span>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-3 py-1">
                    {category.split(" ")[0]}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-white/80 backdrop-blur border-0 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold text-gray-900">Pro Tips</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• Be specific about output format</p>
                <p>• Include target audience context</p>
                <p>• Mention constraints or requirements</p>
                <p>• Ask for step-by-step reasoning</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}