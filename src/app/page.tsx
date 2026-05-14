"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Wand2, Sparkles, Image as ImageIcon, Video, Shield, FileText, CheckCircle, ArrowRight, Zap, Loader2, Bot, Star, Users, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const HERO_IMAGE = "/hero-image.webp";

type Level = "simple" | "advanced" | "expert";

const CATEGORIES = [
  { id: "content", label: "Content" },
  { id: "business", label: "Business" },
  { id: "coding", label: "Coding" },
  { id: "creative", label: "Creative" },
] as const;

const TOOLS = [
  { href: "/ai-prompt-generator", icon: Sparkles, name: "AI Prompt Generator", desc: "Transform ideas into professional AI prompts", badge: "Most Popular", gradient: "from-violet-500 to-purple-600" },
  { href: "/prompt-checker", icon: CheckCircle, name: "Prompt Checker", desc: "Verify your prompt quality", badge: "Free", gradient: "from-emerald-500 to-teal-600" },
  { href: "/image-prompt", icon: ImageIcon, name: "Image Prompts", desc: "Create stunning AI images", badge: "Popular", gradient: "from-pink-500 to-rose-600" },
  { href: "/veo3-prompt", icon: Video, name: "VEO3 Video Prompts", desc: "Professional video generation", badge: "New", gradient: "from-amber-500 to-orange-600" },
  { href: "/ai-humanizer", icon: Shield, name: "AI Humanizer", desc: "Make AI text sound human", badge: "Free", gradient: "from-cyan-500 to-blue-600" },
  { href: "/image-to-prompt", icon: FileText, name: "Image to Prompt", desc: "Convert images to prompts", badge: "Popular", gradient: "from-indigo-500 to-violet-600" },
];

function generatePrompt(input: string, level: Level, category: string): string {
  if (!input.trim()) return "";

  const categoryMap: Record<string, string> = {
    content: "Content Creation",
    business: "Business & Marketing",
    coding: "Coding & Tech",
    creative: "Creative Writing",
  };

  const fullCategory = categoryMap[category] || "Content Creation";

  const prefixes: Record<Level, string> = {
    simple: "You are a helpful AI assistant. Your goal is to provide clear, concise, and practical responses.",
    advanced: "You are a highly skilled AI expert with deep domain knowledge. Your role is to deliver well-structured, detailed, and actionable responses that demonstrate expertise.",
    expert: "You are a world-class specialist and thought leader. Your mission is to produce exceptional, production-grade outputs that reflect deep expertise, rigorous analysis, and proven best practices.",
  };

  const categoryContext: Record<string, string> = {
    content: "Create content that is engaging, well-structured, and optimized for the target audience. Use clear headings, compelling narratives, and persuasive language.",
    business: "Develop strategic, data-informed approaches with clear value propositions. Focus on measurable outcomes, market positioning, and conversion optimization.",
    coding: "Write clean, maintainable, and well-documented code. Provide implementation guidance including architecture, error handling, and testing strategies.",
    creative: "Craft vivid, emotionally engaging content with strong narrative voice. Use descriptive language, compelling metaphors, and authentic tone.",
  };

  const levelDetail: Record<Level, string> = {
    simple: `TASK: ${input}

Format your response as follows:
1. Brief introduction (1-2 sentences)
2. Core answer (concise and practical)
3. Key takeaway (actionable next step)

Keep responses under 200 words. Prioritize clarity and immediacy.`,
    advanced: `TASK: ${input}

Provide a comprehensive response that includes:
- Clear explanation of the approach
- Step-by-step breakdown with reasoning
- Practical examples or demonstrations
- Key considerations and potential pitfalls
- Summary of best practices

Structure output with clear sections. Use bullet points where appropriate.`,
    expert: `ROLE: Senior specialist with proven expertise in this domain.

TASK: ${input}

REQUIREMENTS:
- Deliver an exceptionally detailed and comprehensive response
- Include multi-angle analysis with supporting evidence
- Provide step-by-step methodology with implementation guidance
- Address edge cases, failure modes, and mitigation strategies
- Include real-world examples and case studies
- Define clear quality criteria and success metrics

OUTPUT FORMAT:
## Overview
[Concise executive summary of approach]

## Detailed Analysis
[In-depth exploration with rationale]

## Implementation Guide
[Actionable steps with priorities]

## Best Practices
[Top recommendations with explanations]

## Quality Checklist
[Criteria for evaluating success]

## Further Considerations
[Related topics, common pitfalls]

Ensure every section delivers actionable value. Leave no ambiguity.`,
  };

  return `${prefixes[level]}\n\n${categoryContext[category] || categoryContext.content}\n\n${levelDetail[level]}`;
}

const STATS = [
  { value: "100K+", label: "Prompts Generated" },
  { value: "10+", label: "AI Models Supported" },
  { value: "100%", label: "Free to Use" },
];

export default function HomePage() {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("content");

  const heroRef = useRef<HTMLElement>(null);
  const toolsRef = useRef<HTMLElement>(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const toolsInView = useInView(toolsRef, { once: true, margin: "-100px" });

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "ai-prompt", input, level: "advanced", category: selectedCategory, model: "chatgpt" }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setOutput(data.result || generatePrompt(input, "advanced", selectedCategory));
    } catch {
      setOutput(generatePrompt(input, "advanced", selectedCategory));
    } finally {
      setIsGenerating(false);
    }
    toast.success("Prompt generated!");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                The Most Advanced{" "}
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Free AI Prompt Generator
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-xl">
                Transform your ideas into professional prompts for ChatGPT, Claude, Gemini, and more.
              </p>
              <Link href="/ai-prompt-generator">
                <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium">
                  Start Creating
                </button>
              </Link>
            </motion.div>

            {/* Floating Board */}
            <div className="hidden lg:block bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 min-h-[380px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Wand2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-white font-semibold">Try it now</span>
              </div>
              
              <textarea
                placeholder="Describe your task..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full min-h-[80px] rounded-xl bg-white/20 backdrop-blur border border-white/30 px-4 py-3 text-sm text-white placeholder:text-gray-300 focus:border-violet-500 resize-none mb-4"
              />
              
              <div className="flex gap-2 mb-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === cat.id ? "bg-violet-600 text-white" : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={!input.trim() || isGenerating}
                className="bg-gradient-to-r from-violet-600 to-purple-600 text-white h-10 px-5 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? <><Loader2 className="h-4 w-4 animate-spin" />Generating...</> : <><Wand2 className="h-4 w-4" />Generate</>}
              </button>

              <div className="mt-4 rounded-xl bg-black/40 border border-white/20 p-4 min-h-[100px]">
                {output ? (
                  <pre className="text-sm text-white whitespace-pre-wrap font-mono">{output}</pre>
                ) : (
                  <p className="text-white/50 text-sm">Enter a prompt and click Generate</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section ref={toolsRef} className="py-20 bg-gradient-to-b from-white to-violet-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={toolsInView ? { opacity: 1, y: 0 } : {}}
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
          >
            All the <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">Tools You Need</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool, i) => (
              <Link key={tool.href} href={tool.href}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={toolsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="group h-full bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-violet-200 transition-all hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient} text-white`}>
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <Badge className={`bg-gradient-to-r ${tool.gradient} text-white border-0 text-xs`}>
                      {tool.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">{tool.name}</h3>
                  <p className="text-sm text-gray-600">{tool.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your AI Prompts?
          </h2>
          <p className="text-white/80 mb-8">Start generating professional AI prompts for free.</p>
          <Link href="/ai-prompt-generator">
            <button className="bg-white text-violet-600 px-10 py-3 rounded-xl font-bold">
              Start for Free
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}