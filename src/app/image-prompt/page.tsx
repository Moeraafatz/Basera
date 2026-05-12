"use client";

import { useState } from "react";
import { Wand2, Sparkles, Loader2, Copy, Check, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type Model = "dall-e" | "midjourney" | "stable-diffusion" | "flux";
type Ratio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
type Quality = "standard" | "hd" | "ultra";

const MODELS: { value: Model; label: string; desc: string }[] = [
  { value: "dall-e", label: "DALL-E 3", desc: "OpenAI's image generator" },
  { value: "midjourney", label: "Midjourney", desc: "Artistic & photorealistic" },
  { value: "stable-diffusion", label: "Stable Diffusion", desc: "Open source & fast" },
  { value: "flux", label: "FLUX Pro", desc: "Latest & most capable" },
];

const RATIOS: { value: Ratio; label: string }[] = [
  { value: "1:1", label: "Square (1:1)" },
  { value: "16:9", label: "Landscape (16:9)" },
  { value: "9:16", label: "Portrait (9:16)" },
  { value: "4:3", label: "Standard (4:3)" },
  { value: "3:4", label: "Tall (3:4)" },
];

const QUALITIES: { value: Quality; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "hd", label: "HD" },
  { value: "ultra", label: "Ultra" },
];

const STYLES = ["Photorealistic", "Digital Art", "Illustration", "3D Render", "Oil Painting", "Anime", "Minimalist", "Surreal"];

function generateImagePrompt(input: string, model: Model, style: string): string {
  if (!input.trim()) return "";

  const basePrompt = input;
  const modelSpecifics: Record<Model, string> = {
    "dall-e": "High quality, detailed, well-lit, professional photography style",
    "midjourney": "Cinematic lighting, dramatic composition, artistic masterpiece",
    "stable-diffusion": "Masterpiece, best quality, intricate details, sharp focus",
    flux: "Professional, high detail, perfect composition, stunning visuals",
  };

  return `${basePrompt}, ${style} style, ${modelSpecifics[model]}, high resolution, beautiful colors, professional composition`;
}

export default function ImagePromptPage() {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<Model>("dall-e");
  const [style, setStyle] = useState("Photorealistic");
  const [ratio, setRatio] = useState<Ratio>("1:1");
  const [quality, setQuality] = useState<Quality>("hd");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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
      setOutput(data.result || generateImagePrompt(input, model, style));
      toast.success("Prompt generated!");
    } catch {
      setOutput(generateImagePrompt(input, model, style));
      toast.error("API unavailable — using local generation");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setModel("dall-e");
    setStyle("Photorealistic");
    setRatio("1:1");
    setQuality("hd");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Image <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Prompt</span> Generator
          </h1>
          <p className="text-gray-600">Create stunning AI image prompts for DALL-E, Midjourney, and more.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden bg-white/80 border-0 shadow-xl">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4">
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

              <div className="p-6 space-y-4">
                <textarea
                  placeholder="A majestic lion in a savanna at sunset..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full min-h-[100px] rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-pink-500 resize-none"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-2 block">AI Model</label>
                    <Select value={model} onValueChange={(v) => setModel(v as Model)}>
                      <SelectTrigger className="h-11 bg-gray-100 border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MODELS.map((m) => (
                          <SelectItem key={m.value} value={m.value} className="text-sm">
                            {m.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-2 block">Aspect Ratio</label>
                    <Select value={ratio} onValueChange={(v) => setRatio(v as Ratio)}>
                      <SelectTrigger className="h-11 bg-gray-100 border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {RATIOS.map((r) => (
                          <SelectItem key={r.value} value={r.value} className="text-sm">
                            {r.label}
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
                        {QUALITIES.map((q) => (
                          <SelectItem key={q.value} value={q.value} className="text-sm">
                            {q.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-2 block">Style</label>
                  <div className="flex flex-wrap gap-2">
                    {STYLES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStyle(s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          style === s ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleGenerate}
                    disabled={!input.trim() || isGenerating}
                    className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
                  >
                    {isGenerating ? <><Loader2 className="h-4 w-4 animate-spin" />Generating...</> : <><Wand2 className="h-4 w-4" />Generate</>}
                  </button>
                  {input && (
                    <button onClick={handleReset} className="px-4 py-3 rounded-xl text-sm font-medium border-2 border-gray-200 text-gray-600">
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden bg-white/80 border-0 shadow-xl">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-white" />
                  <h2 className="text-white font-semibold">Generated Prompt</h2>
                </div>
                {output && (
                  <button onClick={handleCopy} className="px-4 py-2 rounded-lg bg-white/20 text-white text-sm font-medium flex items-center gap-2">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                )}
              </div>

              <div className="p-6">
                {output ? (
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-pink-50 p-4 rounded-xl">{output}</pre>
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    <ImageIcon className="h-10 w-10 mx-auto mb-2 opacity-30" />
                    <p>Enter a description and click Generate</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-5 bg-white/80 border-0 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-sm text-gray-600">Model</span>
                  <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs">
                    {MODELS.find(m => m.value === model)?.label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-sm text-gray-600">Ratio</span>
                  <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs">
                    {ratio}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-sm text-gray-600">Quality</span>
                  <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs">
                    {quality.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}