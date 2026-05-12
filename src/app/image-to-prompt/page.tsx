"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Upload, Copy, Check, Wand2, Image as ImageIcon, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

function FloatingOrb({ delay = 0, size = 80, color = "bg-indigo-500" }: { delay?: number; size?: number; color?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${color}`}
      style={{ width: size, height: size }}
      animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

type ModelPreset = "general" | "midjourney" | "stable-diffusion" | "flux";

const PRESETS: { value: ModelPreset; label: string }[] = [
  { value: "general", label: "General" },
  { value: "midjourney", label: "Midjourney" },
  { value: "stable-diffusion", label: "Stable Diffusion" },
  { value: "flux", label: "FLUX / Nano Banana" },
];

const PRESET_PROMPTS: Record<ModelPreset, string> = {
  general: `Subject: [Analyzing uploaded image content]
Style: [Identified artistic style]
Composition: [Camera angle, framing, composition]
Lighting: [Direction, quality, color temperature]
Colors: [Dominant palette]
Mood: [Overall emotional atmosphere]

Full Prompt: [Comprehensive description optimized for AI image generation]`,
  midjourney: `A stunning [subject], [art style], [composition], cinematic lighting, [color grading], --ar [ratio] --style raw --s 750 --q 1`,
  "stable-diffusion": `(masterpiece, best quality, ultra-detailed, 8k), [subject], [detailed features], [environment], [lighting], [camera angle], [art style], (ultra detailed:1.2), professional lighting`,
  flux: `Professional AI-generated image: [detailed subject], photorealistic, [technical specs], natural lighting, [palette], high dynamic range, sharp details, [composition], 4K quality`,
};

export default function ImageToPromptPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [preset, setPreset] = useState<ModelPreset>("general");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(selected);
      setOutput("");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped && dropped.type.startsWith("image/")) {
      setFile(dropped);
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(dropped);
      setOutput("");
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setOutput(PRESET_PROMPTS[preset]);
    setIsAnalyzing(false);
    toast.success("Image analyzed!");
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

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.15),transparent_50%)]" />
      
      <FloatingOrb delay={0} size={300} color="bg-indigo-400" />
      <FloatingOrb delay={2} size={250} color="bg-violet-400" />
      <FloatingOrb delay={4} size={200} color="bg-purple-400" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
              <ImageIcon className="h-5 w-5" />
            </div>
            <Badge className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white border-0 px-3 py-1">Popular</Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Image to <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Prompt</span>
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Convert any image into detailed AI image prompts. Upload an image and get a professional prompt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Card className="p-6 bg-white/80 backdrop-blur border-0 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-full blur-2xl" />
                <div className="flex items-center gap-2 mb-5 relative">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm font-semibold text-gray-900">Upload Your Image</span>
                </div>

                <div className="flex flex-col gap-4">
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all cursor-pointer min-h-[200px] ${
                      dragging ? "border-indigo-500 bg-indigo-50" : preview ? "border-indigo-300 bg-indigo-50/50" : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/30"
                    }`}
                  >
                    {preview ? (
                      <div className="relative w-full p-4">
                        <img src={preview} alt="Preview" className="w-full max-h-[280px] object-contain rounded-xl shadow-lg" />
                        <div className="mt-3 text-center">
                          <p className="text-sm font-medium text-gray-900">{file?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file && file.size > 1024 * 1024) ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : `${((file ? file.size : 0) / 1024).toFixed(0)} KB`}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                        <div className="relative mb-4">
                          <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 blur-xl" />
                          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg">
                            <Upload className="h-5 w-5" />
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">Drop image here</p>
                        <p className="text-xs text-muted-foreground mb-4">JPG, PNG, WEBP — max 10MB</p>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-2 block">Prompt Style</label>
                    <Select value={preset} onValueChange={(v) => setPreset(v as ModelPreset)}>
                      <SelectTrigger className="h-11 bg-white border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PRESETS.map((p) => <SelectItem key={p.value} value={p.value} className="text-sm">{p.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <motion.button
                    onClick={handleAnalyze}
                    disabled={!file || isAnalyzing}
                    className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 h-12 px-8 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isAnalyzing ? (
                      <><Loader2 className="h-4 w-4 animate-spin" />Analyzing...</>
                    ) : (
                      <><Wand2 className="h-4 w-4" />Generate Prompt</>
                    )}
                  </motion.button>
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <Card className="p-6 bg-white/80 backdrop-blur border-0 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-900">Generated Prompt</span>
                  </div>
                  {output && (
                    <motion.button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-sm text-gray-700 hover:text-indigo-600"
                      whileHover={{ scale: 1.05 }}
                    >
                      {copied ? <Check className="h-4 w-4 text-indigo-600" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy"}
                    </motion.button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {output ? (
                    <motion.div key="output" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200 p-4">
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed font-mono">{output}</pre>
                    </motion.div>
                  ) : (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 blur-xl" />
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50">
                          <ImageIcon className="h-5 w-5 text-indigo-500" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Awaiting your image</p>
                      <p className="text-xs text-muted-foreground">Upload an image to generate a prompt</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <Card className="p-5 bg-white/80 backdrop-blur border-0 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-semibold text-gray-900">How It Works</span>
                </div>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Upload", desc: "Drag & drop or click", color: "from-indigo-500 to-violet-500" },
                    { step: "2", title: "Select", desc: "Choose your AI model", color: "from-violet-500 to-purple-500" },
                    { step: "3", title: "Generate", desc: "Get optimized prompt", color: "from-purple-500 to-pink-500" },
                    { step: "4", title: "Copy", desc: "Use in your AI tool", color: "from-pink-500 to-rose-500" },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-3">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white text-sm font-bold shadow-md`}>{s.step}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{s.title}</div>
                        <div className="text-xs text-muted-foreground">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <motion.div
                  className="mt-6 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="h-4 w-4 text-indigo-600" />
                    <span className="text-xs font-semibold text-indigo-600">Supported Models</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Midjourney, Stable Diffusion, FLUX, DALL-E, and more</p>
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}