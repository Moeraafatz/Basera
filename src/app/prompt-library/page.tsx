"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, BookOpen, Code, Briefcase, Mail, FileText, Video, Palette,
  ShoppingCart, Users, Scale, GraduationCap, Share2, Filter, X,
  Copy, Check, Upload, Wand2, Loader2, ChevronRight, Sparkles, Heart, Star,
  Bot, Settings, Cpu, Brain, Zap,
} from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES, PROMPTS, type Prompt, type Category } from "@/data/prompt-library";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function FloatingOrb({ delay = 0, size = 80, color = "bg-pink-500" }: { delay?: number; size?: number; color?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${color}`}
      style={{ width: size, height: size }}
      animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Search, BookOpen, Code, Briefcase, Mail, FileText, Video, Palette,
  ShoppingCart, Users, Scale, GraduationCap, Share2,
};

const ALL_TAGS = Array.from(new Set(PROMPTS.flatMap((p) => p.tags))).sort();

const POPULAR_PROMPTS = [
  "seo-blog-intro", "social-hook-generator", "designer-thumbnails",
  "social-caption-full", "content-youtube-script", "email-cold-outreach",
  "designer-carousel", "ecom-product-description", "social-linkedin-post",
  "content-newsletter",
];

const AI_MODELS = [
  {
    id: "claude",
    name: "Claude",
    provider: "Anthropic",
    icon: "🤖",
    color: "from-orange-500 to-amber-500",
    borderColor: "border-orange-200",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    description: "Anthropic's most capable AI assistant, excels at reasoning, coding, and creative writing.",
    defaultInstructions: [
      "You are Claude, made by Anthropic.",
      "Use thinking mode (</> tags) for complex reasoning.",
      "Be helpful, harmless, and honest.",
      "Break down complex problems into steps.",
      "Ask clarifying questions when ambiguous.",
    ],
    bestPractices: [
      "Be specific about the format you want",
      "Provide context and constraints",
      "Use examples to illustrate expectations",
      "Request step-by-step reasoning for complex tasks",
      "Iterate and refine based on responses",
    ],
    memorySettings: [
      "Conversation context: Current session only (default)",
      "Long context: 200K tokens for extended discussions",
      "Memory: Remembers preferences within conversation",
      "Instruction following: High accuracy for system prompts",
    ],
    promptTemplate: `Role: [Your role/identity]
Task: [What you want Claude to do]
Context: [Background information]
Constraints: [What to follow or avoid]
Output Format: [How you want the response structured]
Example: [Optional example of expected output]`,
  },
  {
    id: "gpt4",
    name: "ChatGPT (GPT-4)",
    provider: "OpenAI",
    icon: "💬",
    color: "from-green-500 to-emerald-500",
    borderColor: "border-green-200",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    description: "OpenAI's GPT-4, powerful for analysis, creativity, and instruction following.",
    defaultInstructions: [
      "You are ChatGPT, a large language model by OpenAI.",
      "Knowledge cutoff: 2024-06",
      "Use available tools when helpful.",
      "Provide balanced, factual responses.",
      "Acknowledge uncertainty when present.",
    ],
    bestPractices: [
      "Use numbered lists for clarity",
      "Specify tone and audience",
      "Break long requests into parts",
      "Ask for alternatives if needed",
      "Use follow-up questions for refinement",
    ],
    memorySettings: [
      "Conversation context: Session-based",
      "Long context: 128K tokens (GPT-4 Turbo)",
      "Memory: Does not retain info between sessions",
      "Instruction following: Strong for system prompts",
    ],
    promptTemplate: `[System: Instructions for behavior]
[User: Specific request or question]
[Context: Additional information if needed]
[Format: Desired output structure]`,
  },
  {
    id: "gemini",
    name: "Gemini",
    provider: "Google",
    icon: "✨",
    color: "from-blue-500 to-indigo-500",
    borderColor: "border-blue-200",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    description: "Google's multimodal AI, excellent for research, analysis, and creative tasks.",
    defaultInstructions: [
      "You are Gemini, developed by Google.",
      "Multimodal: Can understand text, images, audio, video.",
      "Ground responses in verified information.",
      "Provide citations when possible.",
      "Think deeply before responding.",
    ],
    bestPractices: [
      "Leverage multimodal capabilities",
      "Ask for research and citations",
      "Use for data analysis and comparisons",
      "Request code with explanations",
      "Explore creative brainstorming",
    ],
    memorySettings: [
      "Conversation context: Session-based",
      "Long context: 1M tokens (Gemini 1.5)",
      "Memory: Limited to current conversation",
      "Instruction following: Optimized for system prompts",
    ],
    promptTemplate: `Task: [What you need]
Mode: [Creative/Research/Analysis/Coding]
Context: [Background and goals]
Format: [Output structure]
Constraints: [Limitations or requirements]`,
  },
  {
    id: "claude-desktop",
    name: "Claude (Desktop)",
    provider: "Anthropic",
    icon: "🖥️",
    color: "from-violet-500 to-purple-500",
    borderColor: "border-violet-200",
    bgColor: "bg-violet-50",
    textColor: "text-violet-700",
    description: "Claude with custom instructions for desktop app integration and workflow optimization.",
    defaultInstructions: [
      "You are Claude, an AI assistant built by Anthropic.",
      "Focus on being thorough and precise.",
      "Think through problems step by step.",
      "Provide practical, actionable advice.",
      "Maintain context across long conversations.",
    ],
    bestPractices: [
      "Use for complex project planning",
      "Break down large tasks into steps",
      "Create detailed documentation",
      "Review and improve existing content",
      "Brainstorm solutions systematically",
    ],
    memorySettings: [
      "Project memory: Can reference project context",
      "Long conversations: Excellent for extended work",
      "Preferences: Learns your working style",
      "Attachments: Can analyze uploaded files",
    ],
    promptTemplate: `Project Context: [What you're working on]
Current Task: [What you need help with]
Progress: [What you've done so far]
Goals: [What success looks like]
Constraints: [Any limitations or requirements]`,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    provider: "Perplexity AI",
    icon: "🔍",
    color: "from-cyan-500 to-teal-500",
    borderColor: "border-cyan-200",
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-700",
    description: "AI-powered search engine with real-time web access and citations.",
    defaultInstructions: [
      "You are Perplexity, an AI search assistant.",
      "Access real-time information from the web.",
      "Always cite sources in your responses.",
      "Provide comprehensive, up-to-date answers.",
      "Distinguish between facts and opinions.",
    ],
    bestPractices: [
      "Use for research and fact-checking",
      "Ask for citations and sources",
      "Compare multiple perspectives",
      "Stay current on recent events",
      "Get concise summaries of topics",
    ],
    memorySettings: [
      "Real-time search: Access current information",
      "Source tracking: Always cites sources",
      "Context window: Limited to recent context",
      "Follow-up: Excels at iterative research",
    ],
    promptTemplate: `Research Question: [What you want to know]
Depth: [Quick overview/Detailed analysis/Deep dive]
Focus: [Specific aspects to explore]
Format: [Summary/Report/Comparison]
Sources: [Preferred source types if any]`,
  },
  {
    id: "grok",
    name: "Grok",
    provider: "xAI",
    icon: "🚀",
    color: "from-gray-600 to-slate-700",
    borderColor: "border-gray-300",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
    description: "xAI's Grok, known for wit, real-time knowledge, and unconventional responses.",
    defaultInstructions: [
      "You are Grok, built by xAI.",
      "Designed to be witty and irreverent.",
      "Access to real-time information via X.",
      "Not constrained by overly cautious filters.",
      "Direct and honest in responses.",
    ],
    bestPractices: [
      "Ask tough questions",
      "Get unfiltered perspectives",
      "Explore creative and unconventional ideas",
      "Debate and challenge assumptions",
      "Stay informed on current events",
    ],
    memorySettings: [
      "Real-time: Access to current events via X",
      "Context: Session-based conversations",
      "Personality: Witty, direct, sometimes unconventional",
      "Knowledge: Up-to-date through real-time access",
    ],
    promptTemplate: `Question: [Your query]
Perspective: [Analytical/Creative/Debate/Informational]
Tone: [Formal/Casual/Witty]
Depth: [Brief/Comprehensive/Deep dive]
Follow-up: [Any specific angles to explore]`,
  },
];

export default function PromptLibraryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const [refImage, setRefImage] = useState<File | null>(null);
  const [refPreview, setRefPreview] = useState<string>("");
  const [refAnalyzing, setRefAnalyzing] = useState(false);
  const [refAnalysis, setRefAnalysis] = useState<string>("");
  const [dragging, setDragging] = useState(false);
  const [inputMode, setInputMode] = useState<"image" | "text">("text");
  const [customTextInput, setCustomTextInput] = useState("");
  const [optimizedPrompt, setOptimizedPrompt] = useState<string>("");

  useEffect(() => {
    if (selectedPrompt) {
      const template = selectedPrompt.prompt;
      const vars = selectedPrompt.variables.map(v => `[${v}]`).join(", ");
      setCustomTextInput(vars ? `${template}\n\nVariables to fill: ${vars}` : template);
      setOptimizedPrompt("");
      setRefAnalysis("");
    }
  }, [selectedPrompt]);

  const filtered = useMemo(() => {
    return PROMPTS.filter((p) => {
      const matchSearch = !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = !activeCategory || p.category === activeCategory;
      const matchTags = activeTags.length === 0 || activeTags.some(t => p.tags.includes(t));
      return matchSearch && matchCategory && matchTags;
    });
  }, [search, activeCategory, activeTags]);

  const handleCopyId = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleRefAnalyze = async () => {
    setRefAnalyzing(true);
    setRefAnalysis("");
    setOptimizedPrompt("");

    try {
      if (inputMode === "image" && refImage) {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve((reader.result as string).split(",")[1]);
          reader.readAsDataURL(refImage);
        });

        const res = await fetch("/api/analyze-reference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64, type: selectedPrompt?.category, context: selectedPrompt?.title }),
        });
        const data = await res.json();
        setRefAnalysis(data.analysis || "Analysis complete.");
        toast.success("Reference analyzed!");
      } else if (inputMode === "text" && customTextInput.trim()) {
        const res = await fetch("/api/analyze-reference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            textInput: customTextInput, 
            promptTemplate: selectedPrompt?.prompt,
            type: selectedPrompt?.category 
          }),
        });
        const data = await res.json();
        setOptimizedPrompt(data.optimizedPrompt || customTextInput);
        toast.success("Prompt optimized!");
      }
    } catch {
      toast.error("Analysis failed. Check API key.");
    } finally {
      setRefAnalyzing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRefImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => setRefPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setRefImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => setRefPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const getMergedPrompt = (prompt: Prompt, analysis: string, optimized: string = "") => {
    if (optimized) return optimized;
    if (!analysis) return prompt.prompt;
    return prompt.prompt.replace(
      /\[REFERENCE_ANALYSIS\]/g,
      `\n=== Reference Image Analysis ===\n${analysis}\n=== End Analysis ===\n`
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.15),transparent_50%)]" />
      
      <FloatingOrb delay={0} size={300} color="bg-rose-400" />
      <FloatingOrb delay={2} size={250} color="bg-pink-400" />
      <FloatingOrb delay={4} size={200} color="bg-fuchsia-400" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/30">
                <BookOpen className="h-5 w-5" />
              </div>
              <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 px-3 py-1">500+ Prompts</Badge>
            </div>
            <motion.button
              onClick={() => setSelectedModel(selectedModel === null ? "claude" : null)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                selectedModel 
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg" 
                  : "bg-white border-2 border-gray-200 text-gray-700 hover:border-violet-400"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brain className="h-4 w-4" />
              {selectedModel ? "Hide AI Settings" : "AI Model Settings"}
            </motion.button>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Prompt <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Library</span>
          </h1>
          <p className="text-muted-foreground max-w-xl">
            100+ AI prompts optimized for 2026. Search by career, copy instantly, upload references for analysis.
          </p>
        </motion.div>

        {/* AI Model Settings Section */}
        <AnimatePresence>
          {selectedModel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <Card className="bg-white/80 backdrop-blur border-0 shadow-xl overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md">
                        <Brain className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">AI Model Customization</h2>
                        <p className="text-sm text-muted-foreground">Configure instructions and memory settings for each AI model</p>
                      </div>
                    </div>
                    <motion.button 
                      onClick={() => setSelectedModel(null)} 
                      className="p-2 rounded-lg hover:bg-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </motion.button>
                  </div>
                  
                  {/* Model Selector Tabs */}
                  <div className="flex flex-wrap gap-2">
                    {AI_MODELS.map((model) => (
                      <motion.button
                        key={model.id}
                        onClick={() => setSelectedModel(model.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                          selectedModel === model.id
                            ? `bg-gradient-to-r ${model.color} text-white shadow-md`
                            : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{model.icon}</span>
                        {model.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {AI_MODELS.filter(m => m.id === selectedModel).map((model) => (
                    <motion.div
                      key={model.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      {/* Model Header */}
                      <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${model.color} text-2xl shadow-lg`}>
                          {model.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-gray-900">{model.name}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${model.bgColor} ${model.textColor}`}>
                              {model.provider}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{model.description}</p>
                        </div>
                      </div>

                      {/* Default Instructions */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Settings className={`h-4 w-4 ${model.textColor}`} />
                            <h4 className="text-sm font-semibold text-gray-900">Default Instructions</h4>
                          </div>
                          <div className={`p-4 rounded-xl ${model.bgColor} border ${model.borderColor}`}>
                            <ul className="space-y-2">
                              {model.defaultInstructions.map((instruction, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <span className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${model.color} text-white text-xs font-bold shrink-0`}>
                                    {i + 1}
                                  </span>
                                  <span className="text-gray-700 font-mono text-xs">{instruction}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <motion.button
                            onClick={() => {
                              const text = model.defaultInstructions.join('\n');
                              navigator.clipboard.writeText(text);
                              toast.success("Instructions copied!");
                            }}
                            className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r ${model.color} text-white flex items-center gap-2 shadow-md`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Copy className="h-4 w-4" />
                            Copy Instructions
                          </motion.button>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Cpu className={`h-4 w-4 ${model.textColor}`} />
                            <h4 className="text-sm font-semibold text-gray-900">Memory Settings</h4>
                          </div>
                          <div className="space-y-3">
                            {model.memorySettings.map((setting, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${model.color} text-white`}>
                                  <Zap className="h-4 w-4" />
                                </div>
                                <span className="text-sm text-gray-700">{setting}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Best Practices */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Star className={`h-4 w-4 ${model.textColor}`} />
                          <h4 className="text-sm font-semibold text-gray-900">Best Practices</h4>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {model.bestPractices.map((practice, i) => (
                            <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100">
                              <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                              <span className="text-xs text-gray-700">{practice}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Prompt Template */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <FileText className={`h-4 w-4 ${model.textColor}`} />
                            <h4 className="text-sm font-semibold text-gray-900">Prompt Template</h4>
                          </div>
                          <motion.button
                            onClick={() => {
                              navigator.clipboard.writeText(model.promptTemplate);
                              toast.success("Template copied!");
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center gap-1 transition-colors"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Copy className="h-3 w-3" />
                            Copy
                          </motion.button>
                        </div>
                        <pre className={`text-xs text-gray-700 whitespace-pre-wrap bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 text-gray-100 font-mono shadow-inner`}>
                          {model.promptTemplate}
                        </pre>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <Card className="p-4 bg-white/80 backdrop-blur border-0 shadow-xl">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-rose-600" />
                  Categories
                </h3>
                <div className="space-y-1">
                  <motion.button
                    onClick={() => setActiveCategory(null)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 ${
                      !activeCategory ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white" : "text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <Star className="h-4 w-4" />
                    All Prompts ({PROMPTS.length})
                  </motion.button>
                  {CATEGORIES.map((cat) => {
                    const Icon = ICON_MAP[cat.icon] || BookOpen;
                    return (
                      <motion.button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between ${
                          activeCategory === cat.id ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white" : "text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {cat.name}
                        </span>
                        <span className="text-xs opacity-60">{PROMPTS.filter(p => p.category === cat.id).length}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </Card>

              {activeTags.length > 0 && (
                <Card className="p-4 bg-white/80 backdrop-blur border-0 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Active Filters</h3>
                    <button onClick={() => setActiveTags([])} className="text-xs text-rose-600 hover:text-rose-700 font-medium">Clear all</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeTags.map((tag) => (
                      <Badge key={tag} className="cursor-pointer bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border-rose-200 hover:from-rose-200 hover:to-pink-200" onClick={() => setActiveTags(prev => prev.filter(t => t !== tag))}>
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-rose-500" />
                <input
                  type="text"
                  placeholder="Search prompts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border-2 border-gray-200 bg-white/80 text-gray-900 focus:border-rose-400 focus:ring-rose-400/20 backdrop-blur"
                />
              </div>
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-medium text-gray-700 hover:border-rose-400 hover:bg-rose-50 transition-all flex items-center gap-2 bg-white/80"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="h-4 w-4 text-rose-500" />
                Filters
                {activeTags.length > 0 && <Badge className="ml-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0">{activeTags.length}</Badge>}
              </motion.button>
            </div>

            {showFilters && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="p-4 mb-6 bg-white/80 backdrop-blur border-0 shadow-xl">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Filter by Tag</h3>
                  <div className="flex flex-wrap gap-2">
                    {ALL_TAGS.map((tag) => (
                      <motion.button
                        key={tag}
                        onClick={() => setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          activeTags.includes(tag) ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white" : "bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-600 border border-gray-200"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tag}
                      </motion.button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            <p className="text-sm text-muted-foreground mb-4">
              Showing <span className="font-bold text-rose-600">{filtered.length}</span> prompts
            </p>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((prompt, i) => (
                <motion.div key={prompt.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.02 }}>
                  <Card className="p-5 group cursor-pointer bg-white/80 backdrop-blur border-0 shadow-xl hover:shadow-2xl hover:border-rose-300 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className="bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border-rose-200 text-xs">{prompt.category}</Badge>
                      <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                        <ChevronRight className="h-4 w-4 text-rose-400 group-hover:text-rose-600 transition-colors" />
                      </motion.div>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                      {prompt.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                      {prompt.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {prompt.variables.slice(0, 3).map((v) => (
                        <span key={v} className="px-2 py-0.5 rounded text-[10px] font-medium bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600 border border-rose-200">
                          [{v}]
                        </span>
                      ))}
                      {prompt.variables.length > 3 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium text-muted-foreground">
                          +{prompt.variables.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {prompt.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] text-pink-600 border border-pink-200 bg-pink-50">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <motion.button
                      onClick={() => setSelectedPrompt(prompt)}
                      className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Prompt
                    </motion.button>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="relative mb-4">
                  <div className="absolute inset-0 rounded-full bg-rose-500/10 blur-xl" />
                  <Search className="relative h-6 w-6 text-rose-400" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">No prompts found</p>
                <p className="text-xs text-muted-foreground">Try different search terms or clear filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedPrompt(null); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-3xl mx-4 my-8"
            >
              <Card className="overflow-hidden bg-white border-0 shadow-2xl">
                <div className="p-6 border-b bg-gradient-to-r from-rose-50 to-pink-50">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge className="mb-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0">{selectedPrompt.category}</Badge>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedPrompt.title}</h2>
                      <p className="text-sm text-muted-foreground">{selectedPrompt.description}</p>
                    </div>
                    <motion.button onClick={() => setSelectedPrompt(null)} className="p-2 rounded-lg hover:bg-rose-100 transition-colors" whileHover={{ scale: 1.1 }}>
                      <X className="h-5 w-5 text-gray-600" />
                    </motion.button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {selectedPrompt.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg text-xs bg-white text-pink-600 border border-pink-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-rose-50/50 to-pink-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Upload className="h-4 w-4 text-rose-600" />
                      <span className="text-sm font-semibold text-gray-900">Customize & Optimize</span>
                    </div>
                    <div className="flex bg-white rounded-xl p-1 border border-rose-200">
                      <button
                        onClick={() => setInputMode("text")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          inputMode === "text" 
                            ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white" 
                            : "text-gray-600 hover:text-rose-600"
                        }`}
                      >
                        Text Input
                      </button>
                      <button
                        onClick={() => setInputMode("image")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          inputMode === "image" 
                            ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white" 
                            : "text-gray-600 hover:text-rose-600"
                        }`}
                      >
                        Image
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {inputMode === "text" ? (
                      <>
                        <div className="flex-1">
                          <textarea
                            value={customTextInput}
                            onChange={(e) => setCustomTextInput(e.target.value)}
                            placeholder="Enter your prompt or use the pre-populated template..."
                            className="w-full min-h-[140px] rounded-2xl border-2 border-rose-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 resize-none font-mono"
                          />
                        </div>
                        <div className="flex flex-col gap-3 sm:w-64">
                          <motion.button
                            onClick={handleRefAnalyze}
                            disabled={!customTextInput.trim() || refAnalyzing}
                            className="bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:from-rose-700 hover:to-pink-700 h-11 px-5 rounded-xl text-sm font-semibold shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {refAnalyzing ? (
                              <><Loader2 className="h-4 w-4 animate-spin" />Optimizing...</>
                            ) : (
                              <><Wand2 className="h-4 w-4" />Optimize Prompt</>
                            )}
                          </motion.button>

                          {optimizedPrompt && (
                            <div className="p-3 rounded-xl bg-white border border-rose-200 max-h-[140px] overflow-y-auto shadow-sm">
                              <p className="text-xs font-semibold text-rose-600 mb-2 flex items-center gap-1">
                                <Sparkles className="h-3 w-3" /> Optimized Result
                              </p>
                              <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {optimizedPrompt.slice(0, 500)}{optimizedPrompt.length > 500 ? "..." : ""}
                              </p>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                          onDragLeave={() => setDragging(false)}
                          onDrop={handleDrop}
                          className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all cursor-pointer min-h-[140px] flex-1 ${
                            dragging ? "border-rose-500 bg-rose-50" : refPreview ? "border-rose-300 bg-white" : "border-gray-300 hover:border-rose-400 hover:bg-rose-50/30"
                          }`}
                        >
                          {refPreview ? (
                            <div className="relative w-full p-3">
                              <img src={refPreview} alt="Reference" className="w-full max-h-[120px] object-contain rounded-xl shadow-md" />
                              <motion.button
                                onClick={() => { setRefImage(null); setRefPreview(""); setRefAnalysis(""); }}
                                className="absolute top-1 right-1 p-1.5 rounded-full bg-white text-gray-500 hover:text-rose-600 shadow-md"
                                whileHover={{ scale: 1.1 }}
                              >
                                <X className="h-4 w-4" />
                              </motion.button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                              <Upload className="h-5 w-5 text-rose-400 mb-2" />
                              <p className="text-sm text-gray-600 mb-1">Drop image or click to upload</p>
                              <p className="text-xs text-muted-foreground">JPG, PNG, WEBP</p>
                              <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-3 sm:w-64">
                          <motion.button
                            onClick={handleRefAnalyze}
                            disabled={!refImage || refAnalyzing}
                            className="bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:from-rose-700 hover:to-pink-700 h-11 px-5 rounded-xl text-sm font-semibold shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {refAnalyzing ? (
                              <><Loader2 className="h-4 w-4 animate-spin" />Analyzing...</>
                            ) : (
                              <><Wand2 className="h-4 w-4" />Analyze Image</>
                            )}
                          </motion.button>

                          {refAnalysis && (
                            <div className="p-3 rounded-xl bg-white border border-rose-200 max-h-[140px] overflow-y-auto shadow-sm">
                              <p className="text-xs font-semibold text-rose-600 mb-2 flex items-center gap-1">
                                <Heart className="h-3 w-3" /> Analysis Result
                              </p>
                              <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {refAnalysis.slice(0, 500)}{refAnalysis.length > 500 ? "..." : ""}
                              </p>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {selectedPrompt.variables.length > 0 && (
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-gray-700 block mb-2">Variables to Fill</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedPrompt.variables.map((v) => (
                          <span key={v} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 border border-rose-200">
                            [{v}]
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="relative">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-5 max-h-[400px] overflow-y-auto font-mono shadow-inner">
                      {getMergedPrompt(selectedPrompt, refAnalysis, optimizedPrompt)}
                    </pre>
                    <motion.button
                      onClick={() => {
                        const text = getMergedPrompt(selectedPrompt, refAnalysis);
                        handleCopyId(selectedPrompt.id, text);
                        setCopiedPrompt(true);
                        setTimeout(() => setCopiedPrompt(false), 2000);
                      }}
                      className="absolute top-3 right-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copiedPrompt ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copiedPrompt ? "Copied!" : "Copy Prompt"}
                    </motion.button>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="h-4 w-4 text-rose-500" />
                      <p className="text-xs font-semibold text-gray-900">Use Case</p>
                    </div>
                    <p className="text-sm text-gray-700">{selectedPrompt.useCase}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-5">
                    <motion.button
                      onClick={() => {
                        const text = getMergedPrompt(selectedPrompt, refAnalysis);
                        handleCopyId(selectedPrompt.id, text);
                        setCopiedPrompt(true);
                        setTimeout(() => setCopiedPrompt(false), 2000);
                      }}
                      className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-rose-500/30 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Copy className="h-4 w-4" />
                      Copy & Use
                    </motion.button>
                    <motion.button onClick={() => { setRefImage(null); setRefPreview(""); setRefAnalysis(""); }} className="px-6 py-3 rounded-xl text-sm font-semibold border-2 border-gray-200 hover:border-rose-400 hover:text-rose-600 transition-all" whileHover={{ scale: 1.05 }}>
                      Reset Reference
                    </motion.button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
