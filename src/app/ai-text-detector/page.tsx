"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, FileSearch, Copy, Check, Loader2, Sparkles, Brain, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

function FloatingOrb({ delay = 0, size = 80, color = "bg-emerald-500" }: { delay?: number; size?: number; color?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${color}`}
      style={{ width: size, height: size }}
      animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function detectAI(input: string): { score: number; verdict: string; explanation: string } {
  if (!input.trim()) return { score: 0, verdict: "", explanation: "" };

  const aiPhrases = ["delve into", "unleash", "empower", "leverage", "cutting-edge", "game-changing", "in today's fast-paced", "it's worth noting that", "comprehensive guide", "dive deep into", "in conclusion", "first and foremost", "furthermore", "supercharge", "optimize", "revolutionize"];
  const humanPhrases = ["ngl", "tbh", "imo", "honestly", "basically", "kind of", "stuff like that", "you know?", "like I said", "the thing is"];

  const aiCount = aiPhrases.filter((p) => input.toLowerCase().includes(p.toLowerCase())).length;
  const humanCount = humanPhrases.filter((p) => input.toLowerCase().includes(p.toLowerCase())).length;
  const avgSentenceLength = input.split(/[.!?]+/).filter(Boolean).length > 0 ? input.split(" ").length / input.split(/[.!?]+/).filter(Boolean).length : 0;
  const capsRatio = (input.match(/[A-Z]/g)?.length || 0) / input.length;

  const fillerScore = humanCount * 8 + Math.max(0, 30 - avgSentenceLength * 2) + Math.max(0, 20 - capsRatio * 100);
  const aiScore = aiCount * 15 + Math.max(0, avgSentenceLength * 2 - 10) + capsRatio * 50;
  const rawScore = Math.min(99, Math.max(1, 50 + aiScore - fillerScore));
  const score = Math.round(rawScore);

  const verdict = score >= 70 ? "LIKELY_AI_GENERATED" : score >= 40 ? "MIXED_CONTENT" : "LIKELY_HUMAN";
  const explanation = score >= 70 ? "This text contains patterns commonly found in AI-generated content, such as formal structure and typical AI writing style." : score >= 40 ? "This text shows mixed characteristics. It may be AI-assisted or edited AI content." : "This text exhibits natural human writing patterns with conversational elements.";

  return { score, verdict, explanation };
}

export default function AITextDetectorPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ score: number; verdict: string; explanation: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDetect = async () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    await new Promise((r) => setTimeout(r, 1200));
    const detectionResult = detectAI(input);
    setResult(detectionResult);
    setIsAnalyzing(false);
    toast.success(`Analysis: ${detectionResult.score}% ${detectionResult.verdict.replace(/_/g, " ")}`);
  };

  const handleCopy = async () => {
    if (!input) return;
    try {
      await navigator.clipboard.writeText(input);
      setCopied(true);
      toast.success("Copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const verdictColor = result ? (result.score >= 70 ? "text-destructive" : result.score >= 40 ? "text-amber-500" : "text-primary") : "";

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.15),transparent_50%)]" />
      
      <FloatingOrb delay={0} size={300} color="bg-emerald-400" />
      <FloatingOrb delay={2} size={250} color="bg-teal-400" />
      <FloatingOrb delay={4} size={200} color="bg-cyan-400" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
              <Shield className="h-5 w-5" />
            </div>
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-sm font-semibold text-emerald-700 border border-emerald-200">AI Detection</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            AI Text <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Detector</span>
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Detect AI-generated text with advanced analysis. Check if content was written by AI or human.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Card className="p-6 bg-white/80 backdrop-blur border-0 shadow-xl">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-gray-900">Enter Text to Analyze</span>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <Textarea
                      placeholder="Paste the text content you want to analyze..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="min-h-[160px] text-sm bg-white border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{input.length} characters</span>
                      {input.length > 0 && (
                        <div className="flex gap-3">
                          <button onClick={() => { setInput(""); setResult(null); }} className="text-xs text-emerald-600 hover:text-emerald-700 transition-colors font-medium">
                            Clear
                          </button>
                          <button onClick={handleCopy} className="text-xs text-muted-foreground hover:text-gray-900 transition-colors">
                            {copied ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <motion.button
                    onClick={handleDetect}
                    disabled={!input.trim() || isAnalyzing}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 h-12 px-8 rounded-xl text-sm font-semibold shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isAnalyzing ? (
                      <><Loader2 className="h-4 w-4 animate-spin" />Analyzing...</>
                    ) : (
                      <><FileSearch className="h-4 w-4" />Detect AI Content</>
                    )}
                  </motion.button>
                </div>
              </Card>
            </motion.div>

            <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Card className="p-6 bg-white/80 backdrop-blur border-0 shadow-xl">
                    <div className="flex items-center gap-6 mb-6">
                      <motion.div 
                        className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {result.score}%
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">AI Likelihood</span>
                          <span className={`text-sm font-bold ${verdictColor}`}>{result.verdict.replace(/_/g, " ")}</span>
                        </div>
                        <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${result.score}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-emerald-600" />
                        <p className="text-sm font-semibold text-emerald-800">Analysis Result</p>
                      </div>
                      <p className="text-sm text-emerald-700 leading-relaxed">{result.explanation}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Detection Factors</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {[
                          { label: "Sentence Structure", icon: FileSearch },
                          { label: "Phrase Patterns", icon: AlertCircle },
                          { label: "Vocabulary", icon: Brain },
                          { label: "Writing Style", icon: Sparkles },
                        ].map((item) => (
                          <div key={item.label} className="p-2.5 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 flex items-center gap-2">
                            <item.icon className="h-4 w-4 text-emerald-600" />
                            <span className="text-xs font-medium text-gray-700">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <Card className="p-5 bg-white/80 backdrop-blur border-0 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-semibold text-gray-900">Score Guide</span>
                </div>
                <div className="space-y-2">
                  {[
                    { range: "70-100%", label: "Likely AI", desc: "Strong AI patterns", color: "from-red-500 to-rose-500" },
                    { range: "40-69%", label: "Mixed", desc: "Could be AI-assisted", color: "from-amber-500 to-orange-500" },
                    { range: "1-39%", label: "Likely Human", desc: "Natural writing", color: "from-emerald-500 to-teal-500" },
                  ].map((item) => (
                    <div key={item.range} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all">
                      <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${item.color}`} />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                      <span className="text-xs font-semibold text-gray-500">{item.range}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
              <Card className="p-5 bg-white/80 backdrop-blur border-0 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-semibold text-gray-900">AI Signals</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["delve into", "unleash", "cutting-edge", "comprehensive", "in conclusion", "furthermore", "supercharge"].map((phrase) => (
                    <span key={phrase} className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-xs text-emerald-700 font-medium">{phrase}</span>
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