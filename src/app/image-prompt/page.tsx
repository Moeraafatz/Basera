"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Wand2, Copy, Check, Image as ImageIcon, Palette, Loader2, Sparkles, Camera, Sun, Aperture, Maximize } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type Model = "dall-e" | "midjourney" | "stable-diffusion" | "flux" | "sd-x1";
type Ratio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4" | "21:9";
type Quality = "standard" | "hd" | "4k";

const MODELS = [
  { value: "dall-e" as Model, label: "DALL-E 3", gradient: "from-pink-500 to-rose-500", icon: Camera },
  { value: "midjourney" as Model, label: "Midjourney v7", gradient: "from-violet-500 to-purple-500", icon: Aperture },
  { value: "stable-diffusion" as Model, label: "Stable Diffusion XL", gradient: "from-blue-500 to-cyan-500", icon: Sun },
  { value: "flux" as Model, label: "FLUX Pro", gradient: "from-emerald-500 to-teal-500", icon: Maximize },
  { value: "sd-x1" as Model, label: "SDXL 1.0", gradient: "from-amber-500 to-orange-500", icon: ImageIcon },
];

const RATIOS = [
  { value: "1:1" as Ratio, label: "Square", icon: "◻️", gradient: "from-gray-500 to-gray-600" },
  { value: "16:9" as Ratio, label: "Landscape", icon: "▭", gradient: "from-blue-500 to-blue-600" },
  { value: "9:16" as Ratio, label: "Portrait", icon: "▯", gradient: "from-violet-500 to-purple-600" },
  { value: "4:3" as Ratio, label: "Standard", icon: "▭", gradient: "from-emerald-500 to-emerald-600" },
  { value: "3:4" as Ratio, label: "Portrait", icon: "▯", gradient: "from-pink-500 to-pink-600" },
  { value: "21:9" as Ratio, label: "Cinematic", icon: "▭", gradient: "from-amber-500 to-orange-600" },
];

const STYLES = [
  { name: "Photorealistic", emoji: "📸", gradient: "from-gray-600 to-gray-700" },
  { name: "Digital Art", emoji: "🎨", gradient: "from-purple-600 to-pink-600" },
  { name: "Oil Painting", emoji: "🖼️", gradient: "from-amber-600 to-orange-600" },
  { name: "Watercolor", emoji: "💧", gradient: "from-blue-500 to-cyan-500" },
  { name: "Anime", emoji: "✨", gradient: "from-pink-500 to-rose-500" },
  { name: "Concept Art", emoji: "🎯", gradient: "from-violet-600 to-purple-600" },
  { name: "3D Render", emoji: "🎲", gradient: "from-emerald-500 to-teal-500" },
  { name: "Abstract", emoji: "🌈", gradient: "from-indigo-500 to-violet-500" },
  { name: "Minimalist", emoji: "⬜", gradient: "from-gray-400 to-gray-500" },
  { name: "Cyberpunk", emoji: "🌃", gradient: "from-cyan-600 to-blue-600" },
];

const TIPS = [
  { icon: Sun, text: "Be specific about lighting and mood", color: "text-amber-600", bg: "bg-amber-100" },
  { icon: Camera, text: "Mention camera types or art mediums", color: "text-violet-600", bg: "bg-violet-100" },
  { icon: Palette, text: "Include composition details", color: "text-pink-600", bg: "bg-pink-100" },
  { icon: Aperture, text: "Specify color palette preferences", color: "text-emerald-600", bg: "bg-emerald-100" },
];

function generateImagePrompt(input: string, model: Model, ratio: Ratio, quality: Quality, style: string): string {
  if (!input.trim()) return "";

  const modelInstructions: Record<Model, string> = {
    "dall-e": "DALL-E 3 optimized prompt with cinematic framing, hyperrealistic details, 8K resolution.",
    "midjourney": `Midjourney v7 style with dramatic composition, --ar ${ratio} --style raw --s 750 --q ${quality === "4k" ? "2" : "1"}.`,
    "stable-diffusion": "Stable Diffusion XL prompt with negative prompting, high contrast, professional lighting.",
    flux: "FLUX Pro optimized for photorealistic output with natural lighting and sharp details.",
    "sd-x1": "SDXL 1.0 prompt with enhanced detail markers, masterpiece quality, best quality.",
  };

  return [
    `Subject: ${input}`,
    `Style: ${style}`,
    `Aspect Ratio: ${ratio}`,
    `Quality: ${quality}`,
    "",
    modelInstructions[model],
    style && style !== "Photorealistic" ? `Artistic Style: Apply ${style} art style with characteristic visual language.` : "",
    quality === "4k" ? "Technical: Ultra-detailed, 8K UHD, professional color grading." : "",
  ].filter(Boolean).join("\n");
}

export default function ImagePromptPage() {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<Model>("dall-e");
  const [ratio, setRatio] = useState<Ratio>("1:1");
  const [quality, setQuality] = useState<Quality>("hd");
  const [style, setStyle] = useState("Photorealistic");
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
        body: JSON.stringify({ type: "image-prompt", input, model, style, ratio, quality }),
      });
      const data = await res.json();
      setOutput(data.result || generateImagePrompt(input, model, ratio, quality, style));
      toast.success("Image prompt generated!");
    } catch {
      setOutput(generateImagePrompt(input, model, ratio, quality, style));
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

  const selectedModel = MODELS.find((m) => m.value === model);

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-violet-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(236,72,153,0.1),transparent_40%)]" />
      
      <motion.div 
        className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-40 left-10 w-56 h-56 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], scale: [1, 1.05, 1] }}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-pink-600" />
            <span className="text-sm font-medium text-pink-700">Popular Tool</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Image <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-violet-600 bg-clip-text text-transparent">Prompt</span> Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create stunning AI images with optimized prompts for DALL-E, Midjourney, Stable Diffusion, and more.
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
                <div className={`bg-gradient-to-r ${selectedModel?.gradient || 'from-pink-500 to-rose-500'} p-4`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-semibold">Describe Your Image</h2>
                      <p className="text-white/70 text-sm">What do you want to create?</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Image Description</label>
                        <span className="text-xs text-gray-500">{input.length}/500</span>
                      </div>
                      <textarea
                        placeholder="A majestic lion in the African savanna at golden hour..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full min-h-[120px] rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 resize-none transition-all"
                      />
                      {input.length > 0 && (
                        <motion.button
                          onClick={() => setInput("")}
                          className="text-xs text-pink-600 hover:text-pink-700 mt-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Clear
                        </motion.button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-2 block">Model</label>
                        <Select value={model} onValueChange={(v) => setModel(v as Model)}>
                          <SelectTrigger className="h-11 bg-gray-100 border-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {MODELS.map((m) => (
                              <SelectItem key={m.value} value={m.value} className="text-sm">
                                <span className="flex items-center gap-2">
                                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${m.gradient}`} />
                                  {m.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-2 block">Quality</label>
                        <Select value={quality} onValueChange={(v) => setQuality(v as Quality)}>
                          <SelectTrigger className="h-11 bg-gray-100 border-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard" className="text-sm">Standard</SelectItem>
                            <SelectItem value="hd" className="text-sm">HD Quality</SelectItem>
                            <SelectItem value="4k" className="text-sm">4K Ultra HD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-2 block">Style</label>
                        <Select value={style} onValueChange={setStyle}>
                          <SelectTrigger className="h-11 bg-gray-100 border-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STYLES.map((s) => (
                              <SelectItem key={s.name} value={s.name} className="text-sm">
                                {s.emoji} {s.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-3 block">Aspect Ratio</label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {RATIOS.map((r) => (
                          <motion.button
                            key={r.value}
                            onClick={() => setRatio(r.value)}
                            className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 transition-all ${
                              ratio === r.value 
                                ? `border-transparent bg-gradient-to-br ${r.gradient} text-white shadow-lg` 
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="text-lg">{r.icon}</span>
                            <span className="text-[10px] font-bold">{r.value}</span>
                            <span className="text-[8px] opacity-70">{r.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      onClick={handleGenerate}
                      disabled={!input.trim() || isGenerating}
                      className="bg-gradient-to-r from-pink-600 to-rose-600 text-white h-12 px-8 rounded-xl text-sm font-semibold shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(236,72,153,0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isGenerating ? (
                        <><Loader2 className="h-4 w-4 animate-spin" />Generating...</>
                      ) : (
                        <><Wand2 className="h-4 w-4" />Generate Image Prompt</>
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
                        <Palette className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-white font-semibold">Generated Prompt</h2>
                        <p className="text-white/70 text-sm">Your optimized image prompt</p>
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
                        className="rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 p-4"
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
                          <div className="absolute inset-0 rounded-2xl bg-pink-500/20 blur-xl" />
                          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600">
                            <ImageIcon className="h-8 w-8 text-white" />
                          </div>
                        </motion.div>
                        <p className="text-base font-medium text-gray-600 mb-1">Awaiting your description</p>
                        <p className="text-sm text-gray-400">Describe your image to generate a prompt</p>
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
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">Supported Models</h3>
                </div>
                <div className="space-y-2">
                  {MODELS.map((m, i) => (
                    <motion.div
                      key={m.value}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        model === m.value ? "bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setModel(m.value)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${m.gradient}`}>
                        <m.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{m.label}</span>
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
                  <h3 className="text-base font-semibold text-gray-900">Pro Tips</h3>
                </div>
                <div className="space-y-3">
                  {TIPS.map((tip, i) => (
                    <motion.div
                      key={i}
                      className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                        selectedTip === i ? "bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200" : "hover:bg-gray-50"
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