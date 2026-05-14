"use client";

import { useState } from "react";
import { Wand2, Sparkles, Loader2, Copy, Check, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const DIMENSIONS = [
  { value: "16:9", label: "Landscape (16:9)", desc: "YouTube, web" },
  { value: "9:16", label: "Vertical (9:16)", desc: "TikTok, Reels" },
  { value: "1:1", label: "Square (1:1)", desc: "Instagram" },
  { value: "4:3", label: "Standard (4:3)", desc: "Classic" },
];

const DURATIONS = [
  { value: "5", label: "5 seconds" },
  { value: "10", label: "10 seconds" },
  { value: "15", label: "15 seconds" },
];

function generateVideoPrompt(input: string, dimension: string, duration: string): string {
  if (!input.trim()) return "";

  const dimensionSpecs: Record<string, string> = {
    "16:9": "Wide cinematic landscape, dramatic environmental shots, sweeping establishing views, epic scale",
    "9:16": "Vertical portrait format, intimate close-ups, emotional depth, focused single-subject framing",
    "1:1": "Square format, balanced composition, versatile framing, social-media optimized",
    "4:3": "Classic television aspect, traditional cinematography, grounded framing, documentary style",
  };

  const durationSpecs: Record<string, string> = {
    "5": "Condensed, impactful, high-energy sequence",
    "10": "Balanced pacing, natural flow, cinematic rhythm",
    "15": "Extended narrative, rich visual storytelling, immersive journey",
  };

  return `PROFESSIONAL VIDEO PROMPT — VEO3 / SORA

## SCENE DESCRIPTION
${input}

## TECHNICAL SPECIFICATIONS
- Duration: ${duration} seconds
- Aspect Ratio: ${dimension}
- Framing: ${dimensionSpecs[dimension] || dimensionSpecs["16:9"]}
- Pacing: ${durationSpecs[duration] || durationSpecs["10"]}

## CAMERA & PRODUCTION
- Camera Movement: Dynamic and purposeful — use dolly, crane, or stabilized tracking for smooth cinematic motion
- Shot Type: Mix of establishing wide shots and intimate close-ups for visual variety
- Focus: Rack focus transitions between subject planes for depth
- Depth of Field: Shallow with cinematic bokeh where appropriate

## LIGHTING & ATMOSPHERE
- Primary Lighting: Natural golden hour with volumetric light rays
- Secondary: Rim lighting for subject separation
- Atmosphere: Evocative mood with atmospheric depth (fog, haze, or particles)
- Color Grade: Cinematic with rich contrast and balanced color temperature

## VISUAL QUALITY
- Quality: Ultra-cinematic, 4K+ resolution, film grain texture
- Composition: Rule of thirds, dynamic leading lines, balanced negative space
- Effects: Subtle lens flares, natural light scatter, professional post-processing
- Motion: Smooth 24fps or 30fps with natural easing

## AUDIO (OPTIONAL)
- Ambient soundscape matching the scene's mood
- Dynamic range from subtle to impactful

Generate this as a professional production brief for an AI video generation model.`;
}

export default function VEO3PromptPage() {
  const [input, setInput] = useState("");
  const [dimension, setDimension] = useState("16:9");
  const [duration, setDuration] = useState("10");
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
        body: JSON.stringify({ type: "video-prompt", input, dimension }),
      });
      const data = await res.json();
      setOutput(data.result || generateVideoPrompt(input, dimension, duration));
      toast.success("Prompt generated!");
    } catch {
      setOutput(generateVideoPrompt(input, dimension, duration));
      toast.error("API unavailable — using local generation");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setDimension("16:9");
    setDuration("10");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            VEO3 Video <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Prompt</span> Generator
          </h1>
          <p className="text-gray-600">Create professional video prompts for VEO3 and Sora.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden bg-white/80 border-0 shadow-xl">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Video className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-semibold">Describe Your Video</h2>
                    <p className="text-white/70 text-sm">What do you want to create?</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <textarea
                  placeholder="A drone flying over a mountain range at sunset..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full min-h-[100px] rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 resize-none"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-2 block">Dimension</label>
                    <Select value={dimension} onValueChange={setDimension}>
                      <SelectTrigger className="h-11 bg-gray-100 border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DIMENSIONS.map((d) => (
                          <SelectItem key={d.value} value={d.value} className="text-sm">
                            {d.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-2 block">Duration</label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger className="h-11 bg-gray-100 border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DURATIONS.map((d) => (
                          <SelectItem key={d.value} value={d.value} className="text-sm">
                            {d.label}
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
                    className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
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
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 flex items-center justify-between">
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
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-amber-50 p-4 rounded-xl">{output}</pre>
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    <Video className="h-10 w-10 mx-auto mb-2 opacity-30" />
                    <p>Enter a description and click Generate</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-5 bg-white/80 border-0 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Configuration</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-sm text-gray-600">Dimension</span>
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs">
                    {dimension}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-sm text-gray-600">Duration</span>
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs">
                    {duration}s
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-white/80 border-0 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Tips for Better Videos</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Describe specific movements</li>
                <li>• Mention camera angles</li>
                <li>• Include lighting details</li>
                <li>• Specify the mood/atmosphere</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}