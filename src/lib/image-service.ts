import { logger } from "./logger";

export interface ImageGenerationParams {
  prompt: string;
  style?: "photorealistic" | "illustration" | "3d" | "anime" | "oil-painting" | "watercolor" | "pixel-art" | "cyberpunk";
  size?: "1024x1024" | "1024x1792" | "1792x1024" | "512x512";
  negativePrompt?: string;
  seed?: number;
}

export interface ImageGenerationResult {
  url: string;
  provider: string;
  model: string;
  seed?: number;
}

const STYLE_PREFIXES: Record<string, string> = {
  "photorealistic": "photorealistic, ultra detailed, 8k resolution, professional photography",
  "illustration": "digital illustration, clean lines, vibrant colors, artstation style",
  "3d": "3d render, octane render, cinema 4d, blender, volumetric lighting",
  "anime": "anime style, manga, cel shading, vibrant colors, studio ghibli",
  "oil-painting": "oil painting, classical art style, rich textures, masterpiece",
  "watercolor": "watercolor painting, soft colors, artistic, delicate brushstrokes",
  "pixel-art": "pixel art, 16-bit, retro game style, crisp pixels",
  "cyberpunk": "cyberpunk style, neon lights, futuristic, dystopian, blade runner aesthetic",
};

export async function generateImage(params: ImageGenerationParams): Promise<ImageGenerationResult> {
  const stylePrefix = params.style ? STYLE_PREFIXES[params.style] || "" : "";
  const fullPrompt = stylePrefix ? `${stylePrefix}, ${params.prompt}` : params.prompt;

  const providers = [
    { name: "pollinations-flux", generate: () => generateWithPollinationsFlux(fullPrompt, params) },
    { name: "pollinations", generate: () => generateWithPollinations(fullPrompt, params) },
  ];

  for (const provider of providers) {
    try {
      logger.info("Image generation attempt", { provider: provider.name, prompt: params.prompt });
      const result = await provider.generate();
      logger.info("Image generation success", { provider: provider.name });
      return result;
    } catch (err) {
      logger.warn("Image provider failed", {
        provider: provider.name,
        error: err instanceof Error ? err.message : String(err),
      });
      continue;
    }
  }

  throw new Error("All image generation providers failed");
}

async function generateWithPollinationsFlux(
  prompt: string,
  params: ImageGenerationParams
): Promise<ImageGenerationResult> {
  const seed = params.seed || Math.floor(Math.random() * 1000000);
  const width = params.size?.split("x")[0] || "1024";
  const height = params.size?.split("x")[1] || "1024";

  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true`;

  return {
    url,
    provider: "pollinations",
    model: "flux",
    seed,
  };
}

async function generateWithPollinations(
  prompt: string,
  params: ImageGenerationParams
): Promise<ImageGenerationResult> {
  const seed = params.seed || Math.floor(Math.random() * 1000000);
  const width = params.size?.split("x")[0] || "1024";
  const height = params.size?.split("x")[1] || "1024";

  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&nologo=true`;

  return {
    url,
    provider: "pollinations",
    model: "default",
    seed,
  };
}

export const IMAGE_STYLES: NonNullable<ImageGenerationParams["style"]>[] = ["photorealistic", "illustration", "3d", "anime", "oil-painting", "watercolor", "pixel-art", "cyberpunk"];
export const IMAGE_SIZES: NonNullable<ImageGenerationParams["size"]>[] = ["1024x1024", "1024x1792", "1792x1024", "512x512"];
