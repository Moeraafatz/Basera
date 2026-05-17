/**
 * Code Prompt Guidelines — 2026 Best Practices
 * Model-specific prompt structures for code generation.
 */

export interface CodeModel {
  id: string;
  name: string;
  provider: string;
  bestFor: string;
  languages: string[];
  contextWindow: string;
}

export const CODE_MODELS: CodeModel[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    provider: "Anthropic",
    bestFor: "Code review, refactoring, architecture",
    languages: ["Python", "TypeScript", "Rust", "Go", "Java", "C++"],
    contextWindow: "200K tokens",
  },
  {
    id: "gpt-5.5-codex",
    name: "GPT-5.5 Codex",
    provider: "OpenAI",
    bestFor: "Full-stack development, debugging",
    languages: ["Python", "TypeScript", "JavaScript", "C#", "Ruby", "PHP"],
    contextWindow: "128K tokens",
  },
  {
    id: "gemini-cli",
    name: "Gemini CLI",
    provider: "Google",
    bestFor: "Multi-language projects, documentation",
    languages: ["Python", "TypeScript", "Java", "Go", "Kotlin", "Swift"],
    contextWindow: "1M tokens",
  },
  {
    id: "codex-cli",
    name: "Codex CLI",
    provider: "OpenAI",
    bestFor: "Terminal automation, scripting",
    languages: ["Python", "Bash", "TypeScript", "Rust"],
    contextWindow: "128K tokens",
  },
];

export const CODE_CATEGORIES = [
  { id: "web", labelAr: "تطوير الويب", labelEn: "Web Development" },
  { id: "mobile", labelAr: "تطوير التطبيقات", labelEn: "Mobile Development" },
  { id: "data", labelAr: "علم البيانات", labelEn: "Data Science" },
  { id: "devops", labelAr: "البنية التحتية", labelEn: "DevOps" },
  { id: "ai", labelAr: "الذكاء الاصطناعي", labelEn: "AI/ML" },
  { id: "systems", labelAr: "برمجة الأنظمة", labelEn: "Systems Programming" },
];

export const CODE_TASKS = [
  { id: "new-feature", labelAr: "ميزة جديدة", labelEn: "New Feature" },
  { id: "bug-fix", labelAr: "إصلاح خطأ", labelEn: "Bug Fix" },
  { id: "refactor", labelAr: "إعادة هيكلة", labelEn: "Refactor" },
  { id: "test", labelAr: "كتابة اختبارات", labelEn: "Write Tests" },
  { id: "review", labelAr: "مراجعة الكود", labelEn: "Code Review" },
  { id: "document", labelAr: "توثيق", labelEn: "Documentation" },
  { id: "optimize", labelAr: "تحسين الأداء", labelEn: "Performance Optimization" },
];

export function getCodePromptSystem(model: string, category: string, task: string): string {
  const modelInstructions: Record<string, string> = {
    "claude-code": `You are Claude Code, an expert AI coding assistant. Provide production-quality code with clear explanations.
Focus on: clean architecture, best practices, error handling, and maintainability.
Include type annotations, documentation comments, and test examples where applicable.`,

    "gpt-5.5-codex": `You are GPT-5.5 Codex, an expert full-stack developer. Provide complete, working code solutions.
Focus on: practical implementation, modern frameworks, and real-world patterns.
Include setup instructions, dependencies, and usage examples.`,

    "gemini-cli": `You are Gemini CLI, an expert multi-language coding assistant. Provide code with comprehensive documentation.
Focus on: cross-language compatibility, clear documentation, and educational explanations.
Include code comments, usage examples, and alternative approaches.`,

    "codex-cli": `You are Codex CLI, an expert terminal and scripting assistant. Provide efficient, automation-ready code.
Focus on: command-line tools, scripts, and system automation.
Include error handling, logging, and usage instructions.`,
  };

  const categoryContext: Record<string, string> = {
    web: "Web development: React, Next.js, Node.js, TypeScript, Tailwind CSS, APIs, databases",
    mobile: "Mobile development: React Native, Flutter, Swift, Kotlin, cross-platform patterns",
    data: "Data science: Python, pandas, numpy, scikit-learn, visualization, ML pipelines",
    devops: "DevOps: Docker, Kubernetes, CI/CD, Terraform, AWS/GCP, monitoring",
    ai: "AI/ML: PyTorch, TensorFlow, LLMs, prompt engineering, model training",
    systems: "Systems programming: Rust, C++, memory safety, performance, concurrency",
  };

  const taskContext: Record<string, string> = {
    "new-feature": "Implement a new feature with clean, well-structured code",
    "bug-fix": "Diagnose and fix a bug with minimal, targeted changes",
    refactor: "Refactor existing code for better maintainability and performance",
    test: "Write comprehensive tests with good coverage and edge cases",
    review: "Review code for correctness, security, performance, and best practices",
    document: "Create clear, comprehensive documentation for the codebase",
    optimize: "Optimize code for performance, memory, or efficiency",
  };

  return `${modelInstructions[model] || modelInstructions["gpt-5.5-codex"]}

Category: ${categoryContext[category] || categoryContext.web}
Task: ${taskContext[task] || taskContext["new-feature"]}`;
}
