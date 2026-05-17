import { NextRequest, NextResponse } from "next/server";
import { routeCompletion } from "@/lib/model-router";
import { getImagePromptSystem } from "@/lib/prompts/image-guidelines";
import { withErrorHandling, ApiError } from "@/lib/errors";
import { rateLimiter, createRateLimitResponse } from "@/lib/rate-limiter";
import { parseJsonBody, validateBody, required, optional, isOneOf } from "@/lib/validation";
import { logger } from "@/lib/logger";
import { generateImage, IMAGE_STYLES, IMAGE_SIZES } from "@/lib/image-service";

async function handler(req: NextRequest) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  logger.requestStart(requestId, "POST", "/api/image/generate");

  const rateResult = await rateLimiter.checkLimit(ip, "/api/image/generate");
  const rateResponse = createRateLimitResponse(rateResult);
  if ("status" in rateResponse) return rateResponse;

  const body = await parseJsonBody(req);
  validateBody(body, [
    required("input"),
    optional("model"),
    optional("style"),
    optional("lighting"),
    optional("camera"),
    optional(isOneOf("language", ["ar", "en"])),
    optional(isOneOf("action", ["prompt", "image"])),
    optional(isOneOf("size", IMAGE_SIZES)),
    optional("negativePrompt"),
    optional("seed"),
  ]);

  const {
    input,
    model = "imagen-4",
    style = "photorealistic",
    lighting = "natural",
    camera = "eye-level",
    language = "ar",
    action = "prompt",
    size,
    negativePrompt,
    seed,
  } = body as {
    input: string;
    model?: string;
    style?: string;
    lighting?: string;
    camera?: string;
    language?: string;
    action?: "prompt" | "image";
    size?: string;
    negativePrompt?: string;
    seed?: number;
  };

  if (action === "image") {
    const validStyle = IMAGE_STYLES.includes(style as typeof IMAGE_STYLES[number])
      ? (style as typeof IMAGE_STYLES[number])
      : undefined;

    const result = await generateImage({
      prompt: input,
      style: validStyle,
      size: size as typeof IMAGE_SIZES[number],
      negativePrompt,
      seed,
    });

    const duration = Date.now() - startTime;
    logger.requestEnd(requestId, "POST", "/api/image/generate", 200, duration);

    return NextResponse.json({
      success: true,
      result: { url: result.url, provider: result.provider, model: result.model, seed: result.seed },
      requestId,
    }, { headers: rateResponse.headers });
  }

  const systemPrompt = getImagePromptSystem(model, style);

  const additionalContext = `
Lighting: ${lighting}
Camera Angle: ${camera}
Language: ${language === "ar" ? "Arabic" : "English"}

Create a detailed, vivid image prompt based on: "${input}"

Include:
- Subject description with specific details
- Environment and setting
- Lighting quality and direction
- Camera perspective and composition
- Color palette and mood
- Technical quality markers
- Style-specific elements

Write as a flowing, descriptive paragraph.`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: additionalContext },
  ];

  const result = await routeCompletion("image-prompt", messages, {
    maxTokens: 1024,
    temperature: 0.8,
  });

  const duration = Date.now() - startTime;
  logger.requestEnd(requestId, "POST", "/api/image/generate", 200, duration);

  return NextResponse.json({ success: true, result, model, style, requestId }, { headers: rateResponse.headers });
}

export const POST = withErrorHandling(handler);
