"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle, Copy, Check, Wand2, Lightbulb, Loader2, AlertTriangle, Sparkles, TrendingUp, Target, Award, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

function checkPrompt(input: string): { score: number; issues: string[]; suggestions: string[]; rating: string } {
  if (!input.trim()) return { score: 0, issues: [], suggestions: [], rating: "" };

  const issues: string[] = [];
  const suggestions: string[] = [];

  if (input.length < 50) issues.push("Prompt is too short — add more context");
  if (input.length > 5000) issues.push("Prompt is very long — simplify");
  if (!input.includes(".")) issues.push("Add periods to separate thoughts");
  if (input === input.toLowerCase()) issues.push("Uppercase for key terms improves emphasis");
  if (!/[!?.,;:]/.test(input)) issues.push("Add punctuation for readability");

  if (!issues.includes("Prompt is too short")) suggestions.push("Add details about desired output format");
  if (!issues.includes("Add periods")) suggestions.push("Include examples of expected response structure");
  if (!issues.includes("Uppercase")) suggestions.push("Specify target audience or use case");
  if (!issues.includes("Add punctuation")) suggestions.push("Define constraints and boundaries");

  const score = Math.min(100, 40 + Math.min(30, input.length / 20) + (issues.length === 0 ? 30 : 0));
  const rating = score >= 90 ? "EXCELLENT" : score >= 70 ? "GOOD" : score >= 50 ? "FAIR" : "NEEDS_WORK";

  return { score, issues, suggestions, rating };
}

export default function PromptCheckerPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ score: number; issues: string[]; suggestions: string[]; rating: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true });

  const handleCheck = async () => {
    if (!input.trim()) return;
    setIsChecking(true);
    await new Promise((r) => setTimeout(r, 800));
    const checkResult = checkPrompt(input);
    setResult(checkResult);
    setIsChecking(false);
    toast.success(`Score: ${checkResult.score}/100`);
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

  const scoreColor = result 
    ? result.score >= 70 
      ? { gradient: "from-emerald-500 to-teal-500", text: "text-emerald-600", bg: "bg-emerald-100" } 
      : result.score >= 50 
      ? { gradient: "from-amber-500 to-orange-500", text: "text-amber-600", bg: "bg-amber-100" }
      : { gradient: "from-red-500 to-rose-500", text: "text-red-600", bg: "bg-red-100" }
    : { gradient: "from-gray-500 to-gray-600", text: "text-gray-600", bg: "bg-gray-100" };

  const ratingColors: Record<string, { gradient: string; text: string }> = {
    "EXCELLENT": { gradient: "from-emerald-500 to-teal-500", text: "text-emerald-600" },
    "GOOD": { gradient: "from-blue-500 to-cyan-500", text: "text-blue-600" },
    "FAIR": { gradient: "from-amber-500 to-orange-500", text: "text-amber-600" },
    "NEEDS_WORK": { gradient: "from-red-500 to-rose-500", text: "text-red-600" },
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(251,191,36,0.1),transparent_40%)]" />
      
      <motion.div 
        className="absolute top-30 right-20 w-64 h-64 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-40 left-10 w-56 h-56 bg-gradient-to-br from-orange-400/20 to-rose-400/20 rounded-full blur-3xl"
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
            <CheckCircle className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">Free Tool</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Prompt <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">Checker</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Verify your prompt quality and get actionable improvement suggestions.
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
                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Wand2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-semibold">Enter Your Prompt</h2>
                      <p className="text-white/70 text-sm">Paste the prompt you want to check</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Your Prompt</label>
                        <span className="text-xs text-gray-500">{input.length} characters</span>
                      </div>
                      <textarea
                        placeholder="Paste your AI prompt here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full min-h-[140px] rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 resize-none transition-all"
                      />
                      {input.length > 0 && (
                        <div className="flex justify-between mt-2">
                          <motion.button
                            onClick={() => { setInput(""); setResult(null); }}
                            className="text-xs text-amber-600 hover:text-amber-700"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            Clear
                          </motion.button>
                          <motion.button
                            onClick={handleCopy}
                            className="text-xs text-gray-500 hover:text-gray-700"
                            whileHover={{ x: 2 }}
                          >
                            {copied ? "Copied!" : "Copy"}
                          </motion.button>
                        </div>
                      )}
                    </div>

                    <motion.button
                      onClick={handleCheck}
                      disabled={!input.trim() || isChecking}
                      className="bg-gradient-to-r from-amber-600 to-orange-600 text-white h-12 px-8 rounded-xl text-sm font-semibold shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(251,146,60,0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isChecking ? (
                        <><Loader2 className="h-4 w-4 animate-spin" />Checking...</>
                      ) : (
                        <><Wand2 className="h-4 w-4" />Check Quality</>
                      )}
                    </motion.button>
                  </div>
                </div>
              </Card>
            </motion.div>

            <AnimatePresence>
              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="overflow-hidden bg-white/80 backdrop-blur border-0 shadow-xl">
                    <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-4">
                      <div className="flex items-center gap-6 mb-0">
                        <motion.div 
                          className={`text-5xl font-bold text-white`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          {result.score}
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/80 text-sm">Quality Score</span>
                            <span className={`px-3 py-1 rounded-full bg-white/20 text-white text-sm font-semibold`}>{result.rating}</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                            <motion.div 
                              className="h-full bg-white rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${result.score}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      {result.issues.length > 0 && (
                        <motion.div 
                          className="mb-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            Issues Found
                          </h3>
                          <div className="space-y-2">
                            {result.issues.map((issue, i) => (
                              <motion.div 
                                key={i}
                                className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                              >
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100">
                                  <span className="text-xs font-bold text-red-600">!</span>
                                </div>
                                <p className="text-sm text-gray-700">{issue}</p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {result.suggestions.length > 0 && (
                        <motion.div 
                          className="mb-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-amber-500" />
                            Suggestions
                          </h3>
                          <div className="space-y-2">
                            {result.suggestions.map((suggestion, i) => (
                              <motion.div 
                                key={i}
                                className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                              >
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100">
                                  <span className="text-xs font-bold text-amber-600">{i + 1}</span>
                                </div>
                                <p className="text-sm text-gray-700">{suggestion}</p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {result.issues.length === 0 && result.suggestions.length === 0 && (
                        <motion.div 
                          className="flex flex-col items-center py-8 text-center"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <motion.div
                            className="relative mb-4"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl" />
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600">
                              <CheckCircle className="h-8 w-8 text-white" />
                            </div>
                          </motion.div>
                          <p className="text-lg font-bold text-emerald-600">Great Prompt!</p>
                          <p className="text-sm text-gray-500">No issues found. Your prompt is ready to use.</p>
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Card className="p-5 bg-white/80 backdrop-blur border-0 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-5 w-5 text-amber-500" />
                  <h3 className="text-base font-semibold text-gray-900">Scoring Guide</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { range: "90-100", label: "Excellent", desc: "Highly optimized", gradient: "from-emerald-500 to-teal-500" },
                    { range: "70-89", label: "Good", desc: "Minor tweaks needed", gradient: "from-blue-500 to-cyan-500" },
                    { range: "50-69", label: "Fair", desc: "Room for improvement", gradient: "from-amber-500 to-orange-500" },
                    { range: "0-49", label: "Needs Work", desc: "Consider rewriting", gradient: "from-red-500 to-rose-500" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.range}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className={`h-3 w-3 rounded-full bg-gradient-to-br ${item.gradient}`} />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{item.label}</div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </div>
                      <span className="text-xs font-semibold text-gray-400">{item.range}</span>
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
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  <h3 className="text-base font-semibold text-gray-900">Pro Tips</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Target, text: "Be specific about output format" },
                    { icon: Zap, text: "Include target audience context" },
                    { icon: Lightbulb, text: "Add examples to guide AI" },
                    { icon: Award, text: "Define constraints clearly" },
                  ].map((tip, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                        <tip.icon className="h-4 w-4 text-emerald-600" />
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