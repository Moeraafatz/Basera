"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Wand2, Copy, Check, Video, Loader2, Sparkles, Play, Clapperboard, Film, Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Dimension = "16:9" | "9:16" | "1:1" | "4:3" | "3:4" | "21:9";

const DIMENSIONS = [
  { value: "16:9" as Dimension, label: "Landscape", desc: "YouTube, Web", gradient: "from-blue-500 to-indigo-500", icon: Film },
  { value: "9:16" as Dimension, label: "Portrait", desc: "TikTok, Reels", gradient: "from-violet-500 to-purple-500", icon: Clapperboard },
  { value: "1:1" as Dimension, label: "Square", desc: "Instagram Feed", gradient: "from-pink-500 to-rose-500", icon: Camera },
  { value: "4:3" as Dimension, label: "Standard", desc: "TV 4:3", gradient: "from-emerald-500 to-teal-500", icon: Play },
  { value: "3:4" as Dimension, label: "Portrait", desc: "Stories", gradient: "from-amber-500 to-orange-500", icon: Clapperboard },
  { value: "21:9" as Dimension, label: "Cinematic", desc: "Film", gradient: "from-cyan-500 to-blue-500", icon: Film },
];

const TIPS = [
  { icon: Camera, text: "Include specific camera movements", color: "text-violet-600", bg: "bg-violet-100" },
  { icon: Film, text: "Describe lighting direction", color: "text-pink-600", bg: "bg-pink-100" },
  { icon: Play, text: "Mention mood and atmosphere", color: "text-emerald-600", bg: "bg-emerald-100" },
  { icon: Clapperboard, text: "Specify duration and pacing", color: "text-amber-600", bg: "bg-amber-100" },
];

function generateVideoPrompt(input: string, dimension: Dimension): string {
  if (!input.trim()) return "";

  const dimConfig: Record<Dimension, { ratio: string; platform: string; framing: string }> = {
    "16:9": { ratio: "16:9 (1920x1080)", platform: "YouTube, Web Videos", framing: "wide establishing shot" },
    "9:16": { ratio: "9:16 (1080x1920)", platform: "TikTok, Reels, Shorts", framing: "vertical medium shot" },
    "1:1": { ratio: "1:1 (1080x1080)", platform: "Instagram Feed", framing: "central close-up" },
    "4:3": { ratio: "4:3 (1440x1080)", platform: "Traditional TV", framing: "standard medium shot" },
    "3:4": { ratio: "3:4 (1350x1800)", platform: "Instagram Stories", framing: "portrait close-up" },
    "21:9": { ratio: "21:9 (2560x1080)", platform: "Cinematic Film", framing: "ultra-wide cinematic" },
  };

  const { ratio, platform, framing } = dimConfig[dimension];

  return [
    `[VIDEO_GENERATION // VEO3_PROMPT]`,
    ``,
    `Subject & Action: ${input}`,
    ``,
    `Technical Specifications:`,
    `- Format: ${ratio}`,
    `- Platform: ${platform}`,
    `- Primary Framing: ${framing}`,
    `- Duration: 8-10 seconds`,
    ``,
    `Visual Direction:`,
    `- Dynamic camera movement`,
    `- Natural, cinematic lighting`,
    `- Consistent subject presence`,
    `- Smooth motion with intentional pacing`,
    ``,
    `Cinematic Quality:`,
    `- Ultra-high definition, 4K`,
    `- Professional film grain`,
    `- Smooth 60fps motion`,
    `- Depth of field separation`,
  ].join("\n");
}

export default function VEO3PromptPage() {
  const [input, setInput] = useState("");
  const [dimension, setDimension] = useState<Dimension>("16:9");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true });

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "video-prompt", input, dimension }),
      });
      const data = await res.json();
      setOutput(data.result || generateVideoPrompt(input, dimension));
      toast.success("Video prompt generated!");
    } catch {
      setOutput(generateVideoPrompt(input, dimension));
      toast.error("API unavailable — using local generation");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast.success("Copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const selectedDim = DIMENSIONS.find(d => d.value === dimension);

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(251,191,36,0.1),transparent_40%)]" />
      
      <motion.div 
        className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-30 right-30 w-56 h-56 bg-gradient-to-br from-orange-400/20 to-rose-400/20 rounded-full blur-3xl"
        animate={{ y: [0, 35, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity }}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">New Tool</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            VEO3 <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">Video</span> Prompt Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create stunning AI videos with professional prompts for VEO3, Sora, and more.
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
                <div className={`bg-gradient-to-r ${selectedDim?.gradient || 'from-amber-500 to-orange-500'} p-4`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Video className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-semibold">Describe Your Video</h2>
                      <p className="text-white/70 text-sm">What story do you want to tell?</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Video Concept</label>
                        <span className="text-xs text-gray-500">{input.length}/500</span>
                      </div>
                      <textarea
                        placeholder="An astronaut exploring the moon, walking across the lunar surface with Earth visible..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full min-h-[120px] rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 resize-none transition-all"
                      />
                      {input.length > 0 && (
                        <motion.button
                          onClick={() => setInput("")}
                          className="text-xs text-amber-600 hover:text-amber-700 mt-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Clear
                        </motion.button>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-3 block">Dimension & Platform</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {DIMENSIONS.map((d) => (
                          <motion.button
                            key={d.value}
                            onClick={() => setDimension(d.value)}
                            className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 transition-all ${
                              dimension === d.value 
                                ? `border-transparent bg-gradient-to-br ${d.gradient} text-white shadow-lg` 
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <d.icon className="h-6 w-6" />
                            <span className="text-sm font-bold">{d.value}</span>
                            <span className="text-xs opacity-70">{d.label}</span>
                            <span className="text-[10px] opacity-50">{d.desc}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      onClick={handleGenerate}
                      disabled={!input.trim() || isGenerating}
                      className="bg-gradient-to-r from-amber-600 to-orange-600 text-white h-12 px-8 rounded-xl text-sm font-semibold shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(251,146,60,0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isGenerating ? (
                        <><Loader2 className="h-4 w-4 animate-spin" />Generating...</>
                      ) : (
                        <><Wand2 className="h-4 w-4" />Generate Video Prompt</>
                      )}
                    </motion.button>
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
                        <p className="text-white/70 text-sm">Your video generation prompt</p>
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
                        className="rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4"
                      >
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-mono">{output}</pre>
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
                          <div className="absolute inset-0 rounded-2xl bg-amber-500/20 blur-xl" />
                          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600">
                            <Video className="h-8 w-8 text-white" />
                          </div>
                        </motion.div>
                        <p className="text-base font-medium text-gray-600 mb-1">Awaiting your concept</p>
                        <p className="text-sm text-gray-400">Describe your video to generate a prompt</p>
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
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <Play className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">How It Works</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { step: "1", title: "Describe", desc: "Write your video idea", color: "from-blue-500 to-indigo-500" },
                    { step: "2", title: "Generate", desc: "Click to create prompt", color: "from-violet-500 to-purple-500" },
                    { step: "3", title: "Create", desc: "Use in VEO3", color: "from-pink-500 to-rose-500" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.step}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white font-bold`}>
                        {s.step}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{s.title}</div>
                        <div className="text-xs text-gray-500">{s.desc}</div>
                      </div>
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
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <h3 className="text-base font-semibold text-gray-900">Video Tips</h3>
                </div>
                <div className="space-y-3">
                  {TIPS.map((tip, i) => (
                    <motion.div
                      key={i}
                      className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                        selectedTip === i ? "bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedTip(selectedTip === i ? null : i)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
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