/**
 * Text Prompt Guidelines — 2026 Best Practices
 *
 * Model-specific prompt structures for optimal output quality.
 */

export interface TextGuidelines {
  systemPrompt: string;
  userPrompt: (input: string, options: TextOptions) => string;
  maxTokens: number;
  temperature: number;
}

export interface TextOptions {
  level: "simple" | "advanced" | "expert";
  category: string;
  language: "ar" | "en";
  model?: string;
}

const CATEGORY_CONTEXT: Record<string, string> = {
  content: "Create engaging, well-structured content optimized for the target audience. Use clear headings, compelling narratives, and persuasive language. Ensure scannability and shareability.",
  business: "Develop strategic, data-informed approaches with clear value propositions. Focus on measurable outcomes, market positioning, competitive advantages, and conversion optimization.",
  coding: "Write clean, maintainable, well-documented code. Provide architecture decisions, error handling, edge cases, testing strategies, and deployment considerations.",
  creative: "Craft vivid, emotionally engaging content with strong narrative voice. Use descriptive language, compelling metaphors, and authentic tone. Balance creativity with purpose.",
  education: "Explain complex concepts using clear language, relatable analogies, and structured progression. Include memory hooks, practical applications, and knowledge checks.",
  research: "Conduct thorough, evidence-based analysis with logical structure. Present findings with supporting data, alternative perspectives, and actionable conclusions.",
};

const LEVEL_PREFIXES: Record<string, string> = {
  simple: "You are a helpful AI assistant. Provide clear, concise, and practical responses.",
  advanced: "You are a highly skilled AI expert with deep domain knowledge. Deliver well-structured, detailed, and actionable responses.",
  expert: "You are a world-class specialist and thought leader. Produce exceptional, production-grade outputs with deep expertise and rigorous analysis.",
};

const LEVEL_DETAILS: Record<string, string> = {
  simple: `TASK: {input}

Format:
1. Brief introduction (1-2 sentences)
2. Core answer (concise and practical)
3. Key takeaway (actionable next step)

Keep under 200 words. Prioritize clarity and immediacy.`,

  advanced: `TASK: {input}

Include:
- Clear explanation of approach
- Step-by-step breakdown with reasoning
- Practical examples or demonstrations
- Key considerations and potential pitfalls
- Summary of best practices

Structure with clear sections. Use bullet points where appropriate.`,

  expert: `ROLE: Senior specialist with proven expertise.

TASK: {input}

REQUIREMENTS:
- Comprehensive, detailed response
- Multi-angle analysis with evidence and rationale
- Step-by-step methodology with implementation guidance
- Address edge cases, failure modes, and mitigation
- Include real-world examples or case studies
- Define quality criteria and success metrics
- Recommend follow-up actions

OUTPUT FORMAT:
## Overview
[Executive summary]

## Detailed Analysis
[In-depth exploration]

## Implementation Guide
[Actionable steps]

## Best Practices
[Top 5-7 recommendations]

## Quality Checklist
[Success criteria]

## Further Considerations
[Related topics, pitfalls]`,
};

export function getTextGuidelines(options: TextOptions): TextGuidelines {
  const category = CATEGORY_CONTEXT[options.category] || CATEGORY_CONTEXT.content;
  const prefix = LEVEL_PREFIXES[options.level] || LEVEL_PREFIXES.advanced;
  const detail = LEVEL_DETAILS[options.level] || LEVEL_DETAILS.advanced;

  const languageContext = options.language === "ar"
    ? "Respond in Arabic. Use professional, clear Arabic suitable for business and technical contexts. Maintain proper Arabic grammar and style."
    : "Respond in English. Use professional, clear language suitable for business and technical contexts.";

  const systemPrompt = `${prefix}

Context: ${category}

${languageContext}

${detail}`;

  return {
    systemPrompt,
    userPrompt: (input: string) => input,
    maxTokens: options.level === "expert" ? 4096 : options.level === "advanced" ? 2048 : 1024,
    temperature: 0.7,
  };
}

export function getModelSpecificInstructions(model: string): string {
  const instructions: Record<string, string> = {
    "gpt-5.5": "Use structured reasoning. Break complex problems into steps. Provide code examples when relevant. Use markdown formatting for clarity.",
    "claude-opus-4-7": "Focus on nuance, creativity, and depth. Use natural language flow. Provide rich examples and analogies. Emphasize practical wisdom.",
    "gemini-3.1-pro": "Leverage multimodal reasoning when applicable. Provide structured, well-organized output. Use clear headings and sections.",
    "grok-4.20": "Be direct, witty, and insightful. Use conversational tone while maintaining professionalism. Provide real-world context and current information.",
  };

  return instructions[model] || "";
}
