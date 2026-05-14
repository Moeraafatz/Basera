"use client";

import { useState } from "react";
import { Wand2, Sparkles, Loader2, Copy, Check, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const INTENSITY_LEVELS = [
  { value: "subtle", label: "Subtle", desc: "Minor adjustments" },
  { value: "moderate", label: "Moderate", desc: "Noticeable changes" },
  { value: "aggressive", label: "Aggressive", desc: "Heavy humanizing" },
];

export default function AIHumanizerPage() {
  const [input, setInput] = useState("");
  const [intensity, setIntensity] = useState("moderate");
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

  const humanizeLocally = (text: string, intensity: string): string => {
    if (!text.trim()) return "";

    const fillerPhrases = [
      "In my experience,",
      "From what I've seen,",
      "Based on real-world observations,",
      "Honestly,",
      "To be straightforward,",
      "Here's the thing:",
      "The practical reality is,",
      "When you get down to it,",
    ];

    const aiIndicators: [RegExp, string][] = [
      [/As an AI,/gi, "In my experience,"],
      [/As a language model,/gi, "From what I know,"],
      [/I am an AI/gi, "I am someone who"],
      [/artificial intelligence/gi, "human expertise"],
      [/machine learning/gi, "proven methods"],
      [/algorithm/gi, "professional approach"],
      [/automated/gi, "carefully crafted"],
      [/synthetic/gi, "authentic"],
      [/computer-generated/gi, "professionally written"],
      [/However,/g, "But"],
      [/Furthermore,/g, "Also"],
      [/Additionally,/g, "On top of that"],
      [/In conclusion,/g, "The bottom line is,"],
      [/It's important to note/g, "The key point is"],
      [/To summarize,/g, "The main takeaway is"],
      [/In other words,/g, "Put simply,"],
      [/Specifically,/g, "More precisely,"],
      [/Essentially,/g, "At its core,"],
      [/Nevertheless,/g, "Still,"],
      [/Nonetheless,/g, "Even so,"],
      [/Consequently,/g, "So"],
      [/As a result,/g, "This means"],
      [/Hence,/g, "Therefore,"],
      [/Thus,/g, "So"],
      [/\bvery\b/gi, ""],
      [/\breally\b/gi, ""],
      [/\bbasically\b/gi, ""],
      [/\bactually\b/gi, ""],
      [/\bobviously\b/gi, ""],
      [/\bcertainly\b/gi, ""],
      [/\bdefinitely\b/gi, ""],
      [/\babsolutely\b/gi, ""],
    ];

    let result = text;

    aiIndicators.forEach(([pattern, replacement]) => {
      result = result.replace(pattern, replacement);
    });

    if (intensity === "subtle") {
      result = result.replace(/,\s*,/g, ",").replace(/\s+/g, " ").trim();
    }

    if (Math.random() > 0.3) {
      const phrase = fillerPhrases[Math.floor(Math.random() * fillerPhrases.length)];
      if (!result.startsWith(phrase) && !result.includes(phrase)) {
        const insertPos = result.search(/[.!?]/);
        if (insertPos > 20 && insertPos < result.length / 2) {
          result = result.slice(0, insertPos + 1) + " " + phrase + result.slice(insertPos + 1);
        } else {
          result = phrase + " " + result.charAt(0).toLowerCase() + result.slice(1);
        }
      }
    }

    const sentenceEndings = result.match(/[.!?]+\s*/g) || [];
    if (sentenceEndings.length < 2 && result.length > 50) {
      const lastPunct = result.match(/[.!?]$/);
      if (!lastPunct) {
        result = result.trim() + ".";
      }
    }

    return result
      .replace(/,\s*,/g, ",")
      .replace(/\s+/g, " ")
      .replace(/\.\s*\./g, ".")
      .replace(/\s+([.,!?])/g, "$1")
      .trim();
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, intensity }),
      });
      const data = await res.json();
      setOutput(data.result || humanizeLocally(input, intensity));
      toast.success("Text humanized!");
    } catch {
      setOutput(humanizeLocally(input, intensity));
      toast.success("Text humanized (local)!");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setIntensity("moderate");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            AI <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Humanizer</span>
          </h1>
          <p className="text-gray-600">Make AI-generated text sound natural and human-written.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="overflow-hidden bg-white/80 border-0 shadow-xl">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-semibold">Paste Your AI Text</h2>
                  <p className="text-white/70 text-sm">Enter text to make it sound human</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <textarea
                placeholder="Paste your AI-generated text here to make it sound more natural..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full min-h-[150px] rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 resize-none"
              />

              <div>
                <label className="text-xs font-medium text-gray-600 mb-2 block">Humanization Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {INTENSITY_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setIntensity(level.value)}
                      className={`p-3 rounded-xl text-sm font-medium transition-colors ${
                        intensity === level.value
                          ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <div>{level.label}</div>
                      <div className={`text-xs ${intensity === level.value ? "text-white/70" : "text-gray-400"}`}>
                        {level.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={!input.trim() || isGenerating}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? <><Loader2 className="h-4 w-4 animate-spin" />Processing...</> : <><Wand2 className="h-4 w-4" />Humanize</>}
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
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-white" />
                <h2 className="text-white font-semibold">Humanized Text</h2>
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
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-cyan-50 p-4 rounded-xl">{output}</pre>
              ) : (
                <div className="text-center py-10 text-gray-400">
                  <Shield className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p>Enter text and click Humanize</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}