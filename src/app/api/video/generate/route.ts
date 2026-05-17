import { NextRequest, NextResponse } from "next/server";
import { routeCompletion } from "@/lib/model-router";
import { getVideoPromptSystem } from "@/lib/prompts/video-guidelines";
import { withErrorHandling } from "@/lib/errors";
import { rateLimiter, createRateLimitResponse } from "@/lib/rate-limiter";
import { parseJsonBody, validateBody, required, optional, isOneOf } from "@/lib/validation";
import { logger } from "@/lib/logger";
import { generateVideo, VIDEO_DURATIONS, VIDEO_STYLES } from "@/lib/video-service";

async function handler(req: NextRequest) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  logger.requestStart(requestId, "POST", "/api/video/generate");

  const rateResult = await rateLimiter.checkLimit(ip, "/api/video/generate");
  const rateResponse = createRateLimitResponse(rateResult);
  if ("status" in rateResponse) return rateResponse;

  const body = await parseJsonBody(req);
  validateBody(body, [
    required("input"),
    optional("model"),
    optional("style"),
    optional("cameraMovement"),
    optional("duration"),
    optional("language"),
    optional(isOneOf("action", ["prompt", "video"])),
    optional("seed"),
  ]);

  const {
    input,
    model = "veo-3.1",
    style = "cinematic",
    cameraMovement = "static",
    duration: videoDuration = "10",
    language = "ar",
    action = "prompt",
    seed,
  } = body as {
    input: string;
    model?: string;
    style?: string;
    cameraMovement?: string;
    duration?: string;
    language?: string;
    action?: "prompt" | "video";
    seed?: number;
  };

  if (action === "video") {
    const validStyle = VIDEO_STYLES.includes(style as typeof VIDEO_STYLES[number])
      ? (style as typeof VIDEO_STYLES[number])
      : "cinematic";

    const validDuration = VIDEO_DURATIONS.includes(videoDuration as typeof VIDEO_DURATIONS[number])
      ? (videoDuration as typeof VIDEO_DURATIONS[number])
      : "4";

    const result = await generateVideo({
      prompt: input,
      style: validStyle,
      duration: validDuration,
      seed,
    });

    const duration = Date.now() - startTime;
    logger.requestEnd(requestId, "POST", "/api/video/generate", 200, duration);

    return NextResponse.json({
      success: true,
      result: { url: result.url, provider: result.provider, model: result.model, duration: result.duration, seed: result.seed },
      requestId,
    }, { headers: rateResponse.headers });
  }

  const systemPrompt = getVideoPromptSystem(model, style);

  const additionalContext = `
Camera Movement: ${cameraMovement}
Duration: ${videoDuration} seconds
Language: ${language === "ar" ? "Arabic" : "English"}

Create a detailed video generation prompt based on: "${input}"

Include:
- Scene description and setting
- Subject action and movement
- Camera movement and framing
- Lighting and atmosphere
- Color grading and mood
- Pacing and rhythm
- Audio suggestions (if applicable)
- Technical specifications

Structure as a cinematic shot description.`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: additionalContext },
  ];

  const result = await routeCompletion("video-prompt", messages, {
    maxTokens: 1024,
    temperature: 0.8,
  });

  const duration = Date.now() - startTime;
  logger.requestEnd(requestId, "POST", "/api/video/generate", 200, duration);

  return NextResponse.json({ success: true, result, model, style, requestId }, { headers: rateResponse.headers });
}

export const POST = withErrorHandling(handler);
