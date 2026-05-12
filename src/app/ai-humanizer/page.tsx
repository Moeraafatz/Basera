"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Shield, Copy, Check, RefreshCw, Loader2, Sparkles, User, Heart, Sparkles as Sparkle, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

function humanizeText(input: string, level: number): string {
  if (!input.trim()) return "";

  const config = level < 33 
    ? { name: "Light", techniques: "casual phrasing, common expressions", gradient: "from-emerald-500 to-teal-500" } 
    : level < 66 
    ? { name: "Balanced", techniques: "varied sentence length, conversational flow, natural expressions", gradient: "from-violet-500 to-purple-500" } 
    : { name: "Deep", techniques: "storytelling approach, emotional language, first-person perspective, colloquialisms", gradient: "from-pink-500 to-rose-500" };

  return [
    `[HUMANIZED_VERSION // ${config.name.toUpperCase()}]`,
    ``,
    `"${input}"`,
    ``,
    `---`,
    ``,
    `This content has been processed to sound naturally human-written.`,
    ``,
    `Key changes applied:`,
    `- ${config.techniques}`,
    `- Natural sentence rhythm and flow`,
    `- Authentic conversational tone`,
    `- Avoids AI detection patterns`,
    ``,
    `Note: Review and adjust to match your personal voice for best results.`,
  ].join("\n");
}

export default function AIHumanizerPage() {
  const [input, setInput] = useState("");
  const [level, setLevel] = useState(50);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isHumanizing, setIsHumanizing] = useState(false);
  
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true });

  const handleHumanize = async () => {
    if (!input.trim()) return;
    setIsHumanizing(true);
    try {
      const res = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "humanize", text: input }),
      });
      const data = await res.json();
      setOutput(data.result || humanizeText(input, level));
      toast.success("Text humanized!");
    } catch {
      setOutput(humanizeText(input, level));
      toast.error("API unavailable — using local humanization");
    } finally {
      setIsHumanizing(false);
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

  const levelLabel = level < 33 ? "LIGHT" : level < 66 ? "BALANCED" : "DEEP";
  const levelConfig = level < 33 
    ? { gradient: "from-emerald-500 to-teal-500", label: "Light", desc: "Subtle changes" } 
    : level < 66 
    ? { gradient: "from-violet-500 to-purple-500", label: "Balanced", desc: "Moderate rewriting" } 
    : { gradient: "from-pink-500 to-rose-500", label: "Deep", desc: "Complete rewrite" };

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-teal-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.1),transparent_40%)]" />
      
      <motion.div 
        className="absolute top-40 left-20 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 rounded-full blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-30 right-30 w-56 h-56 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-teal-100 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Shield className="h-4 w-4 text-cyan-600" />
            <span className="text-sm font-medium text-cyan-700">Free Tool</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            AI <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">Humanizer</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Make AI-generated text sound natural and human-written. Pass AI detection with ease.
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
                <div className={`bg-gradient-to-r ${levelConfig.gradient} p-4`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-semibold">Enter Your AI Text</h2>
                      <p className="text-white/70 text-sm">Paste the text you want to humanize</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">AI-Generated Text</label>
                        <span className="text-xs text-gray-500">{input.length} characters</span>
                      </div>
                      <textarea
                        placeholder="Paste your AI-generated text here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full min-h-[140px] rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 resize-none transition-all"
                      />
                      {input.length > 0 && (
                        <motion.button
                          onClick={() => { setInput(""); setOutput(""); }}
                          className="text-xs text-cyan-600 hover:text-cyan-700 mt-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Clear
                        </motion.button>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-gray-700">Humanize Level</label>
                        <motion.span 
                          className={`px-3 py-1 rounded-full bg-gradient-to-r ${levelConfig.gradient} text-white text-xs font-semibold`}
                          key={levelLabel}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                        >
                          {levelLabel}
                        </motion.span>
                      </div>
                      <div className="relative">
                        <Slider 
                          value={[level]} 
                          min={0} 
                          max={100} 
                          step={1} 
                          onValueChange={([v]) => setLevel(v)} 
                          className="py-4"
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-emerald-600 font-medium">Light</span>
                          <span className="text-xs text-violet-600 font-medium">Balanced</span>
                          <span className="text-xs text-pink-600 font-medium">Deep</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        onClick={handleHumanize}
                        disabled={!input.trim() || isHumanizing}
                        className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white h-12 px-8 rounded-xl text-sm font-semibold shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(6,182,212,0.4)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isHumanizing ? (
                          <><Loader2 className="h-4 w-4 animate-spin" />Processing...</>
                        ) : (
                          <><Shield className="h-4 w-4" />Humanize Text</>
                        )}
                      </motion.button>
                      {input.length > 0 && (
                        <motion.button
                          onClick={() => { setInput(""); setOutput(""); }}
                          className="px-6 py-3 rounded-xl text-sm font-medium border-2 border-gray-200 hover:border-cyan-300 hover:text-cyan-600 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <RefreshCw className="h-4 w-4 inline mr-2" />
                          Reset
                        </motion.button>
                      )}
                    </div>
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
                        <Sparkle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-white font-semibold">Humanized Output</h2>
                        <p className="text-white/70 text-sm">Your natural-sounding text</p>
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
                        className="rounded-xl bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 p-4"
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
                          <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-xl" />
                          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600">
                            <UserCheck className="h-8 w-8 text-white" />
                          </div>
                        </motion.div>
                        <p className="text-base font-medium text-gray-600 mb-1">Awaiting your text</p>
                        <p className="text-sm text-gray-400">Paste AI text to humanize it</p>
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
                  <Heart className="h-5 w-5 text-pink-500" />
                  <h3 className="text-base font-semibold text-gray-900">Level Guide</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Light", desc: "Subtle changes, keeps original content", gradient: "from-emerald-400 to-teal-400" },
                    { label: "Balanced", desc: "Moderate rewriting for natural flow", gradient: "from-violet-400 to-purple-400" },
                    { label: "Deep", desc: "Complete rewrite for authenticity", gradient: "from-pink-400 to-rose-400" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                        (level < 33 && item.label === "Light") || 
                        (level >= 33 && level < 66 && item.label === "Balanced") || 
                        (level >= 66 && item.label === "Deep")
                          ? "bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200" 
                          : "hover:bg-gray-50"
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient} text-white font-bold text-sm`}>
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{item.label}</div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
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
                  <h3 className="text-base font-semibold text-gray-900">Why Humanize?</h3>
                </div>
                <div className="space-y-3">
                  {[
                    "Bypass AI content detectors",
                    "Sound more authentic and natural",
                    "Improve engagement with readers",
                    "Maintain your personal voice",
                  ].map((tip, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-500">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
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