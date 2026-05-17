import { logger } from "./logger";

export interface VideoGenerationParams {
  prompt: string;
  duration?: "4" | "8" | "12";
  style?: "cinematic" | "anime" | "realistic" | "abstract" | "3d-animation";
  resolution?: "720p" | "1080p";
  seed?: number;
}

export interface VideoGenerationResult {
  url: string;
  provider: string;
  model: string;
  duration: string;
  seed?: number;
}

export async function generateVideo(params: VideoGenerationParams): Promise<VideoGenerationResult> {
  const providers = [
    { name: "pollinations", generate: () => generateWithPollinations(params) },
  ];

  for (const provider of providers) {
    try {
      logger.info("Video generation attempt", { provider: provider.name, prompt: params.prompt });
      const result = await provider.generate();
      logger.info("Video generation success", { provider: provider.name });
      return result;
    } catch (err) {
      logger.warn("Video provider failed", {
        provider: provider.name,
        error: err instanceof Error ? err.message : String(err),
      });
      continue;
    }
  }

  throw new Error("All video generation providers failed");
}

async function generateWithPollinations(
  params: VideoGenerationParams
): Promise<VideoGenerationResult> {
  const seed = params.seed || Math.floor(Math.random() * 1000000);
  const duration = params.duration || "4";

  const url = `https://video.pollinations.ai/prompt/${encodeURIComponent(params.prompt)}?duration=${duration}&seed=${seed}`;

  return {
    url,
    provider: "pollinations",
    model: "default",
    duration,
    seed,
  };
}

export const VIDEO_DURATIONS: NonNullable<VideoGenerationParams["duration"]>[] = ["4", "8", "12"];
export const VIDEO_STYLES: NonNullable<VideoGenerationParams["style"]>[] = ["cinematic", "anime", "realistic", "abstract", "3d-animation"];
export const VIDEO_RESOLUTIONS: NonNullable<VideoGenerationParams["resolution"]>[] = ["720p", "1080p"];
