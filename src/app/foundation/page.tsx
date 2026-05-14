"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Cpu, Layers, Route, Database, Rocket, Scale,
  ChevronDown, ChevronRight, Copy, Check, BookOpen,
  Sparkles, FileCode
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TABS = [
  { id: "tech-stack", label: "Tech Stack", icon: Code2 },
  { id: "ai-integration", label: "AI Integration", icon: Cpu },
  { id: "components", label: "Components", icon: Layers },
  { id: "api-routes", label: "API Routes", icon: Route },
  { id: "state", label: "State Management", icon: Database },
  { id: "deployment", label: "Deployment", icon: Rocket },
  { id: "constitution", label: "Constitution Check", icon: Scale },
];

const DEPENDENCIES = [
  { name: "next", version: "16.2.6", purpose: "Framework", justif: "App Router with server components, file-based routing, and Turbopack for fast rebuilds" },
  { name: "react", version: "19.2.4", purpose: "UI Library", justif: "Concurrent features, new use() hook, improved compiler" },
  { name: "typescript", version: "5", purpose: "Language", justif: "Strict mode enabled — catches errors at compile time, improves DX" },
  { name: "tailwindcss", version: "4", purpose: "Styling", justif: "CSS v4 via @tailwindcss/postcss — no tailwind.config.js, native CSS variables" },
  { name: "framer-motion", version: "12.38.0", purpose: "Animation", justif: "Page transitions and micro-interactions — enhances UX without blocking interaction" },
  { name: "zustand", version: "5.0.13", purpose: "State", justif: "Single store — simpler than Redux, no Context for global state" },
  { name: "openai", version: "6.37.0", purpose: "AI (OpenRouter)", justif: "SDK for OpenRouter API with OpenAI-compatible interface" },
  { name: "@google/generative-ai", version: "0.24.1", purpose: "AI (Gemini)", justif: "Direct Gemini API access for vision and text generation" },
  { name: "@radix-ui/*", version: "various", purpose: "UI Primitives", justif: "Accessible, unstyled components — accordion, select, switch, toast, slider, label" },
  { name: "class-variance-authority", version: "0.7.1", purpose: "Styling", justif: "Variants pattern for Card, Button — enables component reuse with style variants" },
  { name: "clsx", version: "2.1.1", purpose: "Styling", justif: "Conditional class names without template literal mess" },
  { name: "tailwind-merge", version: "3.6.0", purpose: "Styling", justif: "Merges Tailwind classes without conflicts" },
  { name: "lucide-react", version: "1.14.0", purpose: "Icons", justif: "Consistent icon set — tree-shakeable, works with Tailwind" },
  { name: "sonner", version: "2.0.7", purpose: "Toasts", justif: "Lightweight toast notifications — better UX feedback for generation actions" },
];

const PRINCIPLES = [
  { id: "I", name: "User Experience First", decisions: ["No placeholder output — every AI tool has real structured prompts", "Landing page demo panel shows real value immediately without API", "Copy-to-clipboard on every output area"] },
  { id: "II", name: "Graceful Degradation", decisions: ["Every AI tool has local generation fallback in case API fails", "API calls wrapped in try/catch with automatic fallback activation", "No empty output boxes — fallback always produces professional-grade output"] },
  { id: "III", name: "Progressive Enhancement", decisions: ["Mobile-first — all tools functional on mobile before desktop polish", "Animations via Framer Motion never block core interaction", "Core content reachable regardless of JS execution context"] },
  { id: "IV", name: "Production-Grade AI", decisions: ["AI prompts include role, context, formatting, quality criteria per model", "Temperature and token limits tuned per model family", "Fallback prompts use same structured format as API prompts"] },
  { id: "V", name: "Simplicity & Zero YAGNI", decisions: ["Single Zustand store — no Redux, no Context for global state", "CVA pattern for reusable components — no duplicate styles", "No new dependencies unless specifically needed"] },
];

interface TreeNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: TreeNode[];
}

const DIR_TREE: TreeNode[] = [
  { name: "src", path: "src", type: "directory", children: [
    { name: "app", path: "src/app", type: "directory", children: [
      { name: "page.tsx", path: "src/app/page.tsx", type: "file" },
      { name: "layout.tsx", path: "src/app/layout.tsx", type: "file" },
      { name: "globals.css", path: "src/app/globals.css", type: "file" },
      { name: "ai-prompt-generator", path: "src/app/ai-prompt-generator", type: "directory" },
      { name: "image-prompt", path: "src/app/image-prompt", type: "directory" },
      { name: "image-to-prompt", path: "src/app/image-to-prompt", type: "directory" },
      { name: "ai-humanizer", path: "src/app/ai-humanizer", type: "directory" },
      { name: "prompt-checker", path: "src/app/prompt-checker", type: "directory" },
      { name: "prompt-library", path: "src/app/prompt-library", type: "directory" },
      { name: "veo3-prompt", path: "src/app/veo3-prompt", type: "directory" },
      { name: "ai-text-detector", path: "src/app/ai-text-detector", type: "directory" },
      { name: "api", path: "src/app/api", type: "directory" },
    ]},
    { name: "components", path: "src/components", type: "directory", children: [
      { name: "ui", path: "src/components/ui", type: "directory" },
      { name: "navbar.tsx", path: "src/components/navbar.tsx", type: "file" },
      { name: "footer.tsx", path: "src/components/footer.tsx", type: "file" },
    ]},
    { name: "lib", path: "src/lib", type: "directory", children: [
      { name: "ai-service.ts", path: "src/lib/ai-service.ts", type: "file" },
      { name: "utils.ts", path: "src/lib/utils.ts", type: "file" },
    ]},
    { name: "store", path: "src/store", type: "directory", children: [
      { name: "prompt-store.ts", path: "src/store/prompt-store.ts", type: "file" },
    ]},
    { name: "data", path: "src/data", type: "directory" },
    { name: "hooks", path: "src/hooks", type: "directory" },
  ]},
];

const API_ROUTES = [
  { method: "POST", path: "/api/generate", handler: "src/app/api/generate/route.ts", desc: "Main prompt generation endpoint. Dispatches to AI service based on type field.", input: `{ type: "ai-prompt" | "image-prompt" | "video-prompt", ...params }`, output: `{ result: string }` },
  { method: "POST", path: "/api/humanize", handler: "src/app/api/humanize/route.ts", desc: "AI humanizer — rewrites AI text to sound natural. Uses generateAIPrompt with expert level.", input: `{ type: "humanize", text: string }`, output: `{ result: string }` },
  { method: "POST", path: "/api/analyze-reference", handler: "src/app/api/analyze-reference/route.ts", desc: "Image analysis for Image-to-Prompt and reference analysis. Uses Gemini vision or text optimization.", input: `{ imageBase64?: string, textInput?: string, type?: string }`, output: `{ analysis?: string, optimizedPrompt?: string }` },
];

const STORE_SLICES = [
  { name: "inputText", type: "string", desc: "Current user input text", initial: '""' },
  { name: "level", type: "PromptLevel", desc: "Complexity level (simple | advanced | expert)", initial: '"advanced"' },
  { name: "category", type: "string", desc: "Selected category", initial: '"Content Creation"' },
  { name: "selectedModel", type: "string", desc: "Selected AI model", initial: '"chatgpt"' },
];

function TreeNodeComponent({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [open, setOpen] = useState(depth === 0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(node.path);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <div
        className="flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer text-sm"
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
        onClick={() => node.type === "directory" && setOpen(!open)}
      >
        {node.type === "directory" ? (
          open ? <ChevronDown className="h-3 w-3 text-gray-400" /> : <ChevronRight className="h-3 w-3 text-gray-400" />
        ) : (
          <FileCode className="h-3 w-3 text-gray-400" />
        )}
        <span className={node.type === "directory" ? "font-medium text-gray-700" : "text-gray-600 font-mono"}>
          {node.name}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); handleCopy(); }}
          className="ml-auto opacity-0 group-hover:opacity-100 hover:opacity-100 p-1 rounded hover:bg-gray-200"
        >
          {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3 text-gray-400" />}
        </button>
      </div>
      <AnimatePresence>
        {open && node.children && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}>
            {node.children.map((child) => (
              <TreeNodeComponent key={child.path} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CodeBlock({ code }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5 text-gray-300" />}
      </button>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-xs font-mono overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full text-left py-2 border-b border-gray-200"
      >
        {open ? <ChevronDown className="h-4 w-4 text-gray-500" /> : <ChevronRight className="h-4 w-4 text-gray-500" />}
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pt-3">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FoundationPage() {
  const [activeTab, setActiveTab] = useState("tech-stack");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-violet-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Foundation & <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Architecture</span>
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete technical reference for the AI Prompt Enhancer. Real code, real decisions, auto-synced with the codebase.
          </p>
          <Badge className="mt-3 bg-violet-100 text-violet-700 border-violet-200">Auto-synced with codebase</Badge>
        </div>

        <Card className="bg-white border-0 shadow-xl overflow-hidden">
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex min-w-max">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-violet-600 text-violet-600 bg-violet-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

                {activeTab === "tech-stack" && (
                  <div>
                    <Section title="Production Dependencies">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left border-b border-gray-200">
                              <th className="py-2 pr-4 font-semibold text-gray-700">Package</th>
                              <th className="py-2 pr-4 font-semibold text-gray-700">Version</th>
                              <th className="py-2 pr-4 font-semibold text-gray-700">Purpose</th>
                              <th className="py-2 font-semibold text-gray-700">Why This</th>
                            </tr>
                          </thead>
                          <tbody>
                            {DEPENDENCIES.map((dep) => (
                              <tr key={dep.name} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-2.5 pr-4 font-mono text-violet-600">{dep.name}</td>
                                <td className="py-2.5 pr-4 font-mono text-gray-500">{dep.version}</td>
                                <td className="py-2.5 pr-4"><Badge className="bg-gray-100 text-gray-600 border-0">{dep.purpose}</Badge></td>
                                <td className="py-2.5 text-gray-600 text-xs">{dep.justif}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Section>

                    <Section title="Styling Architecture">
                      <p className="text-sm text-gray-600 mb-3">
                        Tailwind CSS v4 with <code className="bg-gray-100 px-1 rounded font-mono text-xs">@tailwindcss/postcss</code>. No <code className="bg-gray-100 px-1 rounded font-mono text-xs">tailwind.config.js</code> — uses CSS variables and native Tailwind v4 features.
                      </p>
                      <CodeBlock code={`// postcss.config.mjs
const config = {
  plugins: { "@tailwindcss/postcss": {} },
};
export default config;`} />
                    </Section>

                    <Section title="ESLint Configuration">
                      <p className="text-sm text-gray-600 mb-3">ESLint v9 with flat config. Uses <code className="bg-gray-100 px-1 rounded font-mono text-xs">eslint-config-next/core-web-vitals</code> + <code className="bg-gray-100 px-1 rounded font-mono text-xs">eslint-config-next/typescript</code>. No separate typecheck script — ESLint covers TypeScript.</p>
                      <CodeBlock code={`// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**"]),
]);`} />
                    </Section>
                  </div>
                )}

                {activeTab === "ai-integration" && (
                  <div>
                    <Section title="Service Architecture">
                      <p className="text-sm text-gray-600 mb-3">
                        All AI calls route through <code className="bg-gray-100 px-1 rounded font-mono text-xs">src/lib/ai-service.ts</code>. Two providers: <strong>OpenRouter</strong> (via openai SDK) and <strong>Gemini</strong> (via @google/generative-ai). The <code className="bg-gray-100 px-1 rounded font-mono text-xs">callWithFallback</code> function tries OpenRouter first, falls back to Gemini on error.
                      </p>
                      <CodeBlock code={`// src/lib/ai-service.ts — initialization
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: "https://openrouter.ai/api/v1" });
}

let genAI: GoogleGenerativeAI | null = null;
if (process.env.GOOGLE_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
}`} />
                    </Section>

                    <Section title="Fallback Logic">
                      <CodeBlock code={`async function callWithFallback(messages, maxTokens, temperature) {
  if (!openai && !genAI) throw new Error("No AI credentials configured");

  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: "anthropic/claude-sonnet-4",
        messages,
        max_tokens: maxTokens,
        temperature,
      });
      return completion.choices[0]?.message?.content?.trim() || "";
    } catch (openaiErr) {
      if (!genAI) throw openaiErr;
      // Fallback to Gemini
      const prompt = messages.filter(m => m.role === "user").pop()?.content || "";
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    }
  }
  // Direct Gemini path
  const prompt = messages.filter(m => m.role === "user").pop()?.content || "";
  return genAI.getGenerativeModel({ model: "gemini-2.0-flash" }).generateContent(prompt).then(r => r.response.text().trim());
}`} />
                    </Section>

                    <Section title="Exported Functions">
                      <div className="space-y-2 text-sm">
                        {[
                          { fn: "generateAIPrompt", params: "{ input, level, category, model }", desc: "Text prompt enhancement with role + category context" },
                          { fn: "generateImagePrompt", params: "{ input, model, style, ratio, quality }", desc: "Image prompt for DALL-E / Midjourney / SD / FLUX" },
                          { fn: "generateVideoPrompt", params: "{ input, dimension }", desc: "Video prompt for VEO3 / Sora" },
                          { fn: "analyzeReference", params: "{ imageBase64, type?, context? }", desc: "Gemini vision — image to design analysis" },
                          { fn: "optimizeTextPrompt", params: "{ textInput, promptTemplate?, category? }", desc: "Text optimization via Gemini" },
                        ].map((f) => (
                          <div key={f.fn} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                            <CodeBlock code={`${f.fn}(${f.params})`} />
                            <span className="text-gray-600 pt-0.5">{f.desc}</span>
                          </div>
                        ))}
                      </div>
                    </Section>

                    <Section title="Prompt Quality Standards">
                      <p className="text-sm text-gray-600 mb-3">Every prompt follows this structure:</p>
                      <div className="grid gap-2 text-xs font-mono">
                        {["Role definition (who the AI is)", "Category context (domain-specific guidance)", "Level-specific template (simple/advanced/expert)", "Structured output format (headers, sections, quality criteria)"].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 rounded bg-violet-50 text-violet-700">
                            <span className="font-bold">{i + 1}.</span> {item}
                          </div>
                        ))}
                      </div>
                    </Section>
                  </div>
                )}

                {activeTab === "components" && (
                  <div>
                    <Section title="Directory Tree">
                      <div className="bg-gray-50 rounded-xl p-4 font-mono text-xs overflow-x-auto">
                        {DIR_TREE.map(node => <TreeNodeComponent key={node.path} node={node} />)}
                      </div>
                    </Section>

                    <Section title="Component Hierarchy">
                      <div className="space-y-3 text-sm">
                        <div className="p-3 rounded-lg bg-violet-50 border border-violet-100">
                          <span className="font-semibold text-violet-700">Layout</span>
                          <span className="text-gray-500 ml-2">src/app/layout.tsx — root layout with navbar</span>
                        </div>
                        <div className="flex items-center gap-2"><div className="w-4 border-l-2 border-gray-300 h-6" /><div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                          <span className="font-semibold text-blue-700">Pages</span>
                          <span className="text-gray-500 ml-2">ai-prompt-generator, image-prompt, image-to-prompt, etc.</span>
                        </div></div>
                        <div className="flex items-center gap-2"><div className="w-4 border-l-2 border-gray-300 h-6" /><div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                          <span className="font-semibold text-emerald-700">UI Primitives</span>
                          <span className="text-gray-500 ml-2">src/components/ui/*.tsx — Card, Badge, Select, Button, etc.</span>
                        </div></div>
                      </div>
                    </Section>

                    <Section title="CVA Pattern (class-variance-authority)">
                      <p className="text-sm text-gray-600 mb-3">Components use CVA for variant management. Example from Card:</p>
                      <CodeBlock code={`// src/components/ui/card.tsx
const cardVariants = cva("rounded-xl border bg-card text-card-foreground shadow-sm", {
  variants: {
    variant: {
      default: "border-border",
      elevated: "border-border shadow-md",
      outline: "border-2 border-dashed border-muted-foreground/30 bg-transparent",
      accent: "border-primary/20 bg-primary/5",
    },
  },
  defaultVariants: { variant: "default" },
});

const Card = React.forwardRef<HTMLDivElement, VariantProps<typeof cardVariants>>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant }), className)} {...props} />
  )
);`} />
                    </Section>

                    <Section title="Styling Utilities">
                      <CodeBlock code={`// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`} />
                    </Section>
                  </div>
                )}

                {activeTab === "api-routes" && (
                  <div>
                    {API_ROUTES.map((route) => (
                      <Section key={route.path} title={`${route.method} ${route.path}`}>
                        <div className="space-y-3 text-sm">
                          <p className="text-gray-600">{route.desc}</p>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-gray-50">
                              <span className="text-xs font-semibold text-gray-500 uppercase">Input</span>
                              <CodeBlock code={route.input} />
                            </div>
                            <div className="p-3 rounded-lg bg-gray-50">
                              <span className="text-xs font-semibold text-gray-500 uppercase">Output</span>
                              <CodeBlock code={route.output} />
                            </div>
                          </div>
                          <p className="text-xs text-gray-400">Handler: <code className="font-mono">{route.handler}</code></p>
                        </div>
                      </Section>
                    ))}

                    <Section title="Main Route Handler">
                      <CodeBlock code={`// src/app/api/generate/route.ts
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...params } = body;

    switch (type) {
      case "ai-prompt": {
        const result = await generateAIPrompt(params);
        return NextResponse.json({ result });
      }
      case "image-prompt": {
        const result = await generateImagePrompt(params);
        return NextResponse.json({ result });
      }
      case "video-prompt": {
        const result = await generateVideoPrompt(params);
        return NextResponse.json({ result });
      }
      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to generate prompt" }, { status: 500 });
  }
}`} />
                    </Section>
                  </div>
                )}

                {activeTab === "state" && (
                  <div>
                    <Section title="Store Architecture">
                      <p className="text-sm text-gray-600 mb-3">
                        Single Zustand store at <code className="bg-gray-100 px-1 rounded font-mono text-xs">src/store/prompt-store.ts</code>. No Redux, no Context for global state. Principle V (Simplicity).
                      </p>
                      <CodeBlock code={`// src/store/prompt-store.ts
import { create } from "zustand";

export type PromptLevel = "simple" | "advanced" | "expert";

export interface PromptStore {
  inputText: string;
  setInputText: (text: string) => void;
  level: PromptLevel;
  setLevel: (level: PromptLevel) => void;
  category: string;
  setCategory: (cat: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export const usePromptStore = create<PromptStore>()((set) => ({
  inputText: "",
  setInputText: (text) => set({ inputText: text }),
  level: "advanced",
  setLevel: (level) => set({ level }),
  category: "Content Creation",
  setCategory: (cat) => set({ category: cat }),
  selectedModel: "chatgpt",
  setSelectedModel: (model) => set({ selectedModel: model }),
}));`} />
                    </Section>

                    <Section title="Store Slices">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left border-b border-gray-200">
                              <th className="py-2 pr-4 font-semibold text-gray-700">Field</th>
                              <th className="py-2 pr-4 font-semibold text-gray-700">Type</th>
                              <th className="py-2 pr-4 font-semibold text-gray-700">Description</th>
                              <th className="py-2 font-semibold text-gray-700">Default</th>
                            </tr>
                          </thead>
                          <tbody>
                            {STORE_SLICES.map((s) => (
                              <tr key={s.name} className="border-b border-gray-100">
                                <td className="py-2.5 pr-4 font-mono text-violet-600">{s.name}</td>
                                <td className="py-2.5 pr-4 font-mono text-gray-500">{s.type}</td>
                                <td className="py-2.5 pr-4 text-gray-600">{s.desc}</td>
                                <td className="py-2.5 font-mono text-gray-400">{s.initial}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Section>

                    <Section title="Usage Pattern">
                      <CodeBlock code={`// In any component
import { usePromptStore } from "@/store/prompt-store";

// Read + write
const level = usePromptStore((s) => s.level);
const setLevel = usePromptStore((s) => s.setLevel);

// Subscribe to specific slice — re-renders only when that slice changes
const category = usePromptStore((s) => s.category);`} />
                    </Section>
                  </div>
                )}

                {activeTab === "deployment" && (
                  <div>
                    <Section title="Development Commands">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {[
                          { cmd: "npm run dev", desc: "Start dev server (Turbopack, port 3000)" },
                          { cmd: "npm run build", desc: "Production build" },
                          { cmd: "npm run lint", desc: "ESLint check (covers TypeScript)" },
                          { cmd: "npm run start", desc: "Run production build" },
                        ].map((c) => (
                          <div key={c.cmd} className="p-3 rounded-lg bg-gray-50 flex items-center gap-3">
                            <code className="font-mono text-violet-600 bg-violet-50 px-2 py-1 rounded">{c.cmd}</code>
                            <span className="text-gray-500 text-xs">{c.desc}</span>
                          </div>
                        ))}
                      </div>
                    </Section>

                    <Section title="Environment Variables">
                      <p className="text-sm text-gray-600 mb-3">Stored in <code className="bg-gray-100 px-1 rounded font-mono text-xs">.env.local</code> (gitignored — never commit real keys).</p>
                      <CodeBlock code={`OPENAI_API_KEY=sk-or-v1-...   # OpenRouter key (openai SDK)
GOOGLE_API_KEY=AIzaSy...  # Gemini key (@google/generative-ai)`} />
                    </Section>

                    <Section title="Vercel Deployment">
                      <div className="space-y-2 text-sm">
                        {[
                          { step: "Connect", desc: "Link GitHub repo to Vercel dashboard" },
                          { step: "Configure", desc: "Add OPENAI_API_KEY and GOOGLE_API_KEY in Vercel environment variables" },
                          { step: "Deploy", desc: "Auto-deploys on every push to main branch" },
                          { step: "Domain", desc: "https://prompteng-ai.vercel.app" },
                        ].map((s) => (
                          <div key={s.step} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50">
                            <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                            <div>
                              <span className="font-semibold text-emerald-700">{s.step}</span>
                              <span className="text-gray-600 ml-2">{s.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Section>

                    <Section title="CI Sync Strategy">
                      <p className="text-sm text-gray-600 mb-3">Hybrid approach: automated CI checks catch factual drift, manual updates keep narrative current.</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="p-3 rounded-lg bg-blue-50">
                          <span className="font-semibold text-blue-700 block mb-1">Automated</span>
                          CI script reads package.json + src/ directory, compares against hardcoded values in this page. Build fails if mismatches found.
                        </div>
                        <div className="p-3 rounded-lg bg-amber-50">
                          <span className="font-semibold text-amber-700 block mb-1">Manual</span>
                          Contributors update narrative sections alongside PRs that change architecture. Quarterly review scheduled.
                        </div>
                      </div>
                    </Section>
                  </div>
                )}

                {activeTab === "constitution" && (
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      Every architectural decision maps to a core principle from the <a href="/agents" className="text-violet-600 underline">project constitution</a>. This page serves as the live reference for Principle Alignment.
                    </p>
                    <div className="space-y-3">
                      {PRINCIPLES.map((p) => (
                        <div key={p.id} className="p-4 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold bg-violet-100 text-violet-700 px-2 py-1 rounded">Principle {p.id}</span>
                            <span className="font-semibold text-gray-900">{p.name}</span>
                          </div>
                          <div className="space-y-1.5 ml-10">
                            {p.decisions.map((d, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                <Sparkles className="h-3.5 w-3.5 text-violet-400 mt-0.5 shrink-0" />
                                <span>{d}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </div>
  );
}