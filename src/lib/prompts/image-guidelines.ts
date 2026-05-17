/**
 * Image Prompt Guidelines — 2026 Best Practices
 * Model-specific prompt structures for image generation.
 */

export interface ImageModel {
  id: string;
  name: string;
  provider: string;
  bestFor: string;
  aspectRatios: string[];
  maxResolution: string;
  styleSupport: string[];
}

export const IMAGE_MODELS: ImageModel[] = [
  {
    id: "imagen-4",
    name: "Imagen 4 Ultra",
    provider: "Google",
    bestFor: "Photorealistic, detailed scenes",
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4"],
    maxResolution: "4096x4096",
    styleSupport: ["Photorealistic", "Cinematic", "Illustration", "3D Render"],
  },
  {
    id: "flux-2",
    name: "Flux 2 Pro",
    provider: "Black Forest Labs",
    bestFor: "Artistic, creative compositions",
    aspectRatios: ["1:1", "16:9", "9:16", "3:2", "2:3"],
    maxResolution: "2048x2048",
    styleSupport: ["Artistic", "Abstract", "Surreal", "Digital Art"],
  },
  {
    id: "ideogram-v3",
    name: "Ideogram v3",
    provider: "Ideogram",
    bestFor: "Typography, text in images",
    aspectRatios: ["1:1", "16:9", "9:16", "4:3"],
    maxResolution: "2048x2048",
    styleSupport: ["Typography", "Logo Design", "Poster", "Branding"],
  },
  {
    id: "seedream-v5",
    name: "Seedream v5.0",
    provider: "ByteDance",
    bestFor: "Asian aesthetics, anime, manga",
    aspectRatios: ["1:1", "16:9", "9:16", "3:4"],
    maxResolution: "2048x2048",
    styleSupport: ["Anime", "Manga", "Asian Art", "Illustration"],
  },
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    provider: "OpenAI",
    bestFor: "Versatile, conversational prompt understanding",
    aspectRatios: ["1:1", "16:9", "9:16"],
    maxResolution: "1024x1024",
    styleSupport: ["Photorealistic", "Illustration", "Cartoon", "Oil Painting"],
  },
];

export const IMAGE_STYLES = [
  { id: "photorealistic", labelAr: "واقعي", labelEn: "Photorealistic" },
  { id: "cinematic", labelAr: "سينمائي", labelEn: "Cinematic" },
  { id: "illustration", labelAr: "رسم توضيحي", labelEn: "Illustration" },
  { id: "3d-render", labelAr: "تصيير ثلاثي الأبعاد", labelEn: "3D Render" },
  { id: "watercolor", labelAr: "ألوان مائية", labelEn: "Watercolor" },
  { id: "oil-painting", labelAr: "رسم زيتي", labelEn: "Oil Painting" },
  { id: "digital-art", labelAr: "فن رقمي", labelEn: "Digital Art" },
  { id: "anime", labelAr: "أنمي", labelEn: "Anime" },
  { id: "minimalist", labelAr: "بسيط", labelEn: "Minimalist" },
  { id: "surreal", labelAr: "سريالي", labelEn: "Surreal" },
  { id: "pop-art", labelAr: "بوب آرت", labelEn: "Pop Art" },
  { id: "sketch", labelAr: "رسم تخطيطي", labelEn: "Sketch" },
];

export const LIGHTING_TYPES = [
  { id: "golden-hour", labelAr: "الساعة الذهبية", labelEn: "Golden Hour" },
  { id: "studio", labelAr: "استوديو", labelEn: "Studio Lighting" },
  { id: "dramatic", labelAr: "درامي", labelEn: "Dramatic" },
  { id: "natural", labelAr: "طبيعي", labelEn: "Natural Light" },
  { id: "neon", labelAr: "نيون", labelEn: "Neon" },
  { id: "volumetric", labelAr: "حجمي", labelEn: "Volumetric" },
  { id: "backlit", labelAr: "إضاءة خلفية", labelEn: "Backlit" },
  { id: "soft", labelAr: "ناعم", labelEn: "Soft Light" },
];

export const CAMERA_ANGLES = [
  { id: "eye-level", labelAr: "مستوى العين", labelEn: "Eye Level" },
  { id: "low-angle", labelAr: "زاوية منخفضة", labelEn: "Low Angle" },
  { id: "high-angle", labelAr: "زاوية عالية", labelEn: "High Angle" },
  { id: "birds-eye", labelAr: "من الأعلى", labelEn: "Bird's Eye View" },
  { id: "close-up", labelAr: "لقطة قريبة", labelEn: "Close-up" },
  { id: "wide-shot", labelAr: "لقطة واسعة", labelEn: "Wide Shot" },
  { id: "macro", labelAr: "ماكرو", labelEn: "Macro" },
  { id: "portrait", labelAr: "بورتريه", labelEn: "Portrait" },
];

export function getImagePromptSystem(model: string, style: string): string {
  const modelInstructions: Record<string, string> = {
    "imagen-4": `You are an expert image prompt engineer for Google Imagen 4 Ultra. Create ultra-detailed, photorealistic image prompts.
Focus on: specific subject details, environmental context, lighting quality, camera perspective, color palette, mood, and technical quality markers.
Write as a single flowing paragraph — no bullet points.`,

    "flux-2": `You are an expert image prompt engineer for FLUX 2 Pro. Create artistic, creative image prompts.
Focus on: artistic style, composition, color theory, emotional impact, visual metaphors, and creative techniques.
Include artistic references and style descriptors.`,

    "ideogram-v3": `You are an expert image prompt engineer for Ideogram v3. Create prompts optimized for typography and text rendering.
Focus on: text content, font style, layout, background, color scheme, and readability.
Specify exact text to render and its visual treatment.`,

    "seedream-v5": `You are an expert image prompt engineer for Seedream v5.0. Create prompts with Asian aesthetic sensibilities.
Focus on: cultural elements, anime/manga style, character design, background details, and atmospheric effects.
Include Japanese/Chinese artistic influences where appropriate.`,

    "dall-e-3": `You are an expert image prompt engineer for DALL-E 3. Create clear, descriptive image prompts.
Focus on: subject description, setting, style, mood, and composition.
DALL-E 3 understands natural language well — write conversationally but precisely.`,
  };

  const styleModifiers: Record<string, string> = {
    photorealistic: "Ultra-realistic, photograph-quality, lifelike details, natural textures",
    cinematic: "Cinematic composition, dramatic lighting, film grain, anamorphic lens quality",
    illustration: "Professional illustration style, clean lines, vibrant colors, editorial quality",
    "3d-render": "3D rendered, octane render, ray tracing, physically based materials",
    watercolor: "Watercolor painting style, soft edges, pigment blooms, paper texture",
    "oil-painting": "Oil painting style, visible brushstrokes, rich impasto, classical technique",
    "digital-art": "Digital art, concept art quality, polished finish, professional illustration",
    anime: "Anime style, cel-shaded, vibrant colors, dynamic pose, manga influence",
    minimalist: "Minimalist design, clean composition, negative space, limited color palette",
    surreal: "Surrealist style, dreamlike quality, impossible geometry, symbolic elements",
    "pop-art": "Pop art style, bold colors, halftone dots, comic book influence",
    sketch: "Pencil sketch style, graphite texture, cross-hatching, artistic line work",
  };

  return `${modelInstructions[model] || modelInstructions["dall-e-3"]}\n\nStyle: ${styleModifiers[style] || styleModifiers.photorealistic}`;
}
