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

  const prefixes: Record<string, string> = {
    simple: "You are a helpful AI assistant. Your goal is to provide clear, concise, and practical responses that solve the user's problem efficiently.",
    advanced: "You are a highly skilled AI expert with deep domain knowledge. Your role is to deliver well-structured, detailed, and actionable responses that demonstrate genuine expertise.",
    expert: "You are a world-class specialist and thought leader. Your mission is to produce exceptional, production-grade outputs that reflect deep expertise, rigorous analysis, and proven best practices.",
  };

  const categoryContext: Record<string, string> = {
    "Content Creation": "Create content that is engaging, well-structured, and optimized for the target audience. Use clear headings, compelling narratives, and persuasive language. Ensure the content is scannable, shareable, and drives the desired action.",
    "Business & Marketing": "Develop strategic, data-informed approaches with clear value propositions. Focus on measurable outcomes, market positioning, competitive advantages, and conversion optimization. Include actionable tactics with timelines.",
    "Coding & Tech": "Write clean, maintainable, and well-documented code. Provide detailed implementation guidance including architecture decisions, error handling, edge cases, testing strategies, and deployment considerations. Include code examples where helpful.",
    "Creative Writing": "Craft vivid, emotionally engaging content with strong narrative voice. Use descriptive language, compelling metaphors, and authentic tone. Balance creativity with purpose — every element should serve the story or message.",
    "Education & Learning": "Explain complex concepts using clear language, relatable analogies, and structured progression from fundamentals to advanced topics. Include memory hooks, practical applications, and knowledge checks to reinforce learning.",
    "Research & Analysis": "Conduct thorough, evidence-based analysis with logical structure. Present findings with supporting data, alternative perspectives, and actionable conclusions. Include methodology transparency and acknowledge limitations.",
  };

  const levelDetail: Record<string, string> = {
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
- Summary of best practices and recommendations

Structure output with clear sections. Use bullet points and numbering where appropriate. Aim for depth without unnecessary elaboration.`,
    expert: `ROLE: Senior specialist with proven expertise in this domain.

TASK: ${input}

REQUIREMENTS:
- Deliver an exceptionally detailed and comprehensive response
- Include multi-angle analysis with supporting evidence and rationale
- Provide step-by-step methodology with implementation guidance
- Address edge cases, failure modes, and mitigation strategies
- Include real-world examples, case studies, or reference implementations
- Define clear quality criteria and success metrics
- Recommend follow-up actions and deeper exploration paths

OUTPUT FORMAT:
## Overview
[Concise executive summary of approach]

## Detailed Analysis
[In-depth exploration with rationale]

## Implementation Guide
[Actionable steps with priorities]

## Best Practices
[Top 5-7 recommendations with explanations]

## Quality Checklist
[Criteria for evaluating success]

## Further Considerations
[Related topics, advanced concepts, common pitfalls]

Ensure every section delivers actionable value. Leave no ambiguity.`,
  };

  const systemPrompt = `${prefixes[level] || prefixes.advanced}\n\n${categoryContext[category] || categoryContext["Content Creation"]}\n\n${levelDetail[level] || levelDetail.advanced}`;

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
  const { input, model, style: _style, quality: _quality } = params;

  if (!input.trim()) return "";

  const modelInstructions: Record<string, string> = {
    "dall-e": `You are an expert image prompt engineer. Create an ultra-detailed, cinematic DALL-E 3 prompt for: "${input}"

STYLE: ${params.style || "Photorealistic"}

QUALITY: ${params.quality || "hd"}

REQUIREMENTS:
- Describe the subject with rich, specific detail (appearance, posture, expression, setting)
- Specify lighting quality and direction (e.g., golden hour, volumetric, rim lighting)
- Define composition and camera perspective (e.g., low angle, wide shot, rule of thirds)
- State the artistic style and color palette
- Include atmosphere, mood, and emotional tone
- Add technical quality markers (resolution, clarity, depth)

Format as flowing, vivid natural language — no bullet points, no lists. The prompt should read like a compelling art direction brief for a professional cinematographer and set designer working together.`,
    midjourney: `You are an expert Midjourney prompt engineer. Create a cinematic, professional Midjourney prompt for: "${input}"

STYLE: ${params.style || "Photorealistic"}

REQUIREMENTS:
- Subject: detailed description of the main subject with specific characteristics
- Environment: setting, background elements, atmospheric details
- Lighting: specific quality (golden hour, volumetric, dramatic rim light, etc.)
- Composition: camera angle, depth of field, framing
- Style references: artistic influences and visual references
- Mood and atmosphere: emotional tone and visual feeling
- End with high-impact Midjourney parameters: --ar ${params.ratio || "1:1"} --style raw --s 750 --q 2 --v 6.1

Create a prompt that reads like a cinematic shot list from a professional film production.`,
    "stable-diffusion": `You are an expert Stable Diffusion XL prompt engineer. Create a detailed, high-quality SDXL prompt for: "${input}"

STYLE: ${params.style || "Photorealistic"}

REQUIREMENTS:
- Subject focus: detailed, specific subject description with distinguishing features
- Environment details: setting, props, background elements
- Lighting setup: type, direction, quality
- Camera/angle: perspective, depth of field, composition
- Quality boosters: (masterpiece, best quality, ultra-detailed, 8K, HDR)
- Artistic style: specific style descriptors
- Negative prompt: common issues to avoid

Structure: positive prompt first, then quality markers, then style. Make each element distinct and powerful.`,
    flux: `You are an expert FLUX Pro prompt engineer. Create a professional prompt optimized for FLUX Pro/Seedream for: "${input}"

STYLE: ${params.style || "Photorealistic"}

REQUIREMENTS:
- Primary subject: highly detailed description with specific attributes
- Scene environment: setting, atmosphere, contextual elements
- Lighting design: specific light quality, direction, and color temperature
- Visual composition: camera perspective, depth, framing
- Style precision: exact artistic direction and reference points
- Technical quality: 8K, photorealistic, cinematic grade, sharp detail

Write as a professional art direction brief. Be extremely specific and descriptive — every detail shapes the final output.`,
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

  return callWithFallback(
    [
      {
        role: "system",
        content: `You are an expert video prompt engineer for VEO3 and Sora. Create a professional, cinematic video generation prompt.

## SCENE DESCRIPTION
${input}

## TECHNICAL SPECIFICATIONS
- Duration: ${dimension} seconds
- Aspect Ratio: ${dimension}
- Framing: ${dimensionSpecs[dimension] || dimensionSpecs["16:9"]}
- Pacing: ${durationSpecs[dimension] || durationSpecs["10"]}

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
- Motion: Smooth 24fps or 30fps with natural easing`,
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

export async function optimizeTextPrompt(
  textInput: string,
  promptTemplate?: string,
  category?: string
): Promise<string> {
  const instruction = `You are an expert prompt engineer and AI specialist. Your task is to optimize and enhance user prompts to get the best possible output from AI models.

TASK: Transform the user's input into a highly optimized, detailed prompt.

INPUT: "${textInput}"
${promptTemplate ? `\nPROMPT TEMPLATE: "${promptTemplate}"` : ""}
${category ? `\nCATEGORY: ${category}` : ""}

INSTRUCTIONS:
1. Analyze the user's intent and goal
2. Use the template structure if provided, or create an optimal structure
3. Add specific details, context, and constraints
4. Include output format specifications
5. Add relevant domain knowledge for better results
6. Make it clear and unambiguous

Return ONLY the optimized prompt, no explanations or markdown.`;

  if (!genAI) {
    return callWithFallback([{ role: "user", content: instruction }], 1500, 0.5);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(instruction);
    return result.response.text().trim();
  } catch (err) {
    console.error("Text optimization error:", err);
    throw err;
  }
}
