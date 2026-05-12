import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });
}

let genAI: GoogleGenerativeAI | null = null;
if (process.env.GOOGLE_API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  } catch {
    genAI = null;
  }
}

async function callWithFallback(
  messages: { role: string; content: string }[],
  maxTokens: number,
  temperature: number
): Promise<string> {
  if (!openai && !genAI) {
    throw new Error("No AI credentials configured");
  }

  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: "anthropic/claude-sonnet-4",
        messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
        max_tokens: maxTokens,
        temperature,
      });
      return completion.choices[0]?.message?.content?.trim() || "";
    } catch (openaiErr) {
      if (!genAI) throw openaiErr;
      const lastUserMsg = messages.filter((m) => m.role === "user").pop();
      const prompt = lastUserMsg?.content || "";
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        return result.response.text().trim();
      } catch (geminiErr) {
        console.error("Google API also failed:", geminiErr);
        throw openaiErr;
      }
    }
  } else if (genAI) {
    const lastUserMsg = messages.filter((m) => m.role === "user").pop();
    const prompt = lastUserMsg?.content || "";
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  }

  return "";
}

export async function generateAIPrompt(params: {
  input: string;
  level: "simple" | "advanced" | "expert";
  category: string;
  model: string;
}): Promise<string> {
  const { input, level, category } = params;

  if (!input.trim()) return "";

  const levelInstructions = {
    simple: "You are a helpful AI assistant. Rewrite the following prompt to be clear, concise, and effective. Output ONLY the improved prompt with no preamble.",
    advanced: "You are an expert prompt engineer. Enhance this prompt by adding context, structure, clear instructions, and formatting guidance. Make it detailed but not overly complex. Output ONLY the improved prompt.",
    expert: "You are a world-class prompt engineer. Create an exceptional, production-grade prompt. Include role definition, clear objectives, constraints, output format specifications, examples, quality criteria, and step-by-step reasoning requirements. Output ONLY the improved prompt.",
  };

  const modelNames: Record<string, string> = {
    chatgpt: "ChatGPT (GPT-4o)",
    "gpt-4o": "GPT-4o",
    claude: "Claude",
    gemini: "Gemini",
  };

  const systemPrompt = `${levelInstructions[level]}\n\nTarget AI model: ${modelNames[params.model] || params.model}\nCategory: ${category}`;

  return callWithFallback(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: input },
    ],
    1024,
    0.7
  );
}

export async function generateImagePrompt(params: {
  input: string;
  model: string;
  style: string;
  ratio: string;
  quality: string;
}): Promise<string> {
  const { input, model, style, quality } = params;

  if (!input.trim()) return "";

  const modelInstructions: Record<string, string> = {
    "dall-e": `You are an expert image prompt engineer. Generate a detailed, professional DALL-E 3 prompt for: "${input}"\n\nStyle: ${style}\nQuality: ${quality}\n\nInclude: subject description, lighting, composition, camera angle, color palette, art style, mood, and technical quality markers.\n\nFormat the prompt as a flowing natural language description suitable for DALL-E 3.`,
    midjourney: `You are a Midjourney prompt expert. Create a cinematic Midjourney prompt for: "${input}"\n\nStyle: ${style}\n\nInclude artistic direction, lighting atmosphere, composition guidelines, style references, and end with appropriate Midjourney parameters (--ar, --s, --q, --style).`,
    "stable-diffusion": `You are a Stable Diffusion XL prompt engineer. Create a detailed SDXL prompt for: "${input}"\n\nStyle: ${style}\n\nInclude: (masterpiece, best quality), subject details, environment, lighting, camera angle, art style, technical quality boosters, and negative prompt suggestions.`,
    flux: `You are a FLUX Pro prompt engineer. Create a detailed prompt optimized for FLUX Pro/Seedream: "${input}"\n\nStyle: ${style}\n\nFocus on: subject, environment, lighting, mood, style references, and technical quality markers. Be precise and descriptive.`,
  };

  const instruction = modelInstructions[model] || modelInstructions["dall-e"];

  return callWithFallback(
    [
      { role: "system", content: instruction },
      { role: "user", content: "Generate this image prompt." },
    ],
    1024,
    0.7
  );
}

export async function generateVideoPrompt(params: {
  input: string;
  dimension: string;
}): Promise<string> {
  const { input, dimension } = params;

  if (!input.trim()) return "";

  return callWithFallback(
    [
      {
        role: "system",
        content: `You are an expert video prompt engineer for VEO3 and Sora. Create a professional video generation prompt.\n\nVideo Dimension: ${dimension}\n\nFormat: [Subject & Action] → [Visual Direction] → [Technical Specifications] → [Cinematic Quality]\n\nBe specific about: subject movement, camera motion, lighting, atmosphere, duration (8-10s), quality markers.`,
      },
      { role: "user", content: input },
    ],
    1024,
    0.7
  );
}

export async function analyzeReference(
  imageBase64: string,
  type?: string,
  context?: string
): Promise<string> {
  if (!genAI) {
    const instruction = `You are an expert visual designer and brand analyst. Analyze the reference image provided and extract detailed design characteristics.

TASK: Analyze this reference image for use in ${type || "general"} design context${context ? ` about ${context}` : ""}.

ANALYSIS DIMENSIONS:
1. COLOR PALETTE: Identify 5-8 dominant colors with HEX codes.
2. TYPOGRAPHY: Font families, weights, sizes, hierarchy.
3. VISUAL STYLE: Realistic, flat, minimal, maximalist, brutalist, organic, geometric, retro, modern, etc.
4. LAYOUT & COMPOSITION: Grid-based vs. freeform, whitespace, alignment.
5. DESIGN ELEMENTS: Illustrations, icons, photography style, patterns, gradients.
6. MOOD & EMOTION: What feeling does this design convey?
7. BRAND PERSONALITY: Professional, playful, luxurious, eco-friendly, tech-forward, edgy, etc.
8. TECHNICAL DETAILS: Aspect ratios, medium, design patterns.

Be specific. This analysis will be used as reference for generating new design prompts.`;

    return callWithFallback([{ role: "user", content: instruction }], 1200, 0.3);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: "image/jpeg",
      },
    };
    const instruction = `You are an expert visual designer. Analyze this reference image. Return analysis in this exact format:\n- Colors: [list with HEX]\n- Typography: [fonts, sizes]\n- Style: [descriptors]\n- Composition: [layout notes]\n- Elements: [visual elements]\n- Mood: [emotional tone]\n- Brand: [personality]\n- Technical: [practical details]\n\nContext: ${type || "general"} design${context ? ` about ${context}` : ""}`;
    const result = await model.generateContent([instruction, imagePart]);
    return result.response.text().trim();
  } catch (err) {
    console.error("Gemini vision error:", err);
    throw err;
  }
}
