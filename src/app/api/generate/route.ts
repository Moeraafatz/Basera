import { NextRequest, NextResponse } from "next/server";
import { generateAIPrompt, generateImagePrompt, generateVideoPrompt } from "@/lib/ai-service";
import { withErrorHandling, ApiError } from "@/lib/errors";
import { rateLimiter, createRateLimitResponse } from "@/lib/rate-limiter";
import { parseJsonBody, validateBody, required, isOneOf } from "@/lib/validation";
import { logger } from "@/lib/logger";
import { withQuotaCheck } from "@/lib/quota-middleware";
import { createClient } from "@/lib/supabase/server";
import { streamCompletion } from "@/lib/streaming";

async function handler(req: NextRequest, userId: string) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  logger.requestStart(requestId, "POST", "/api/generate");

  const rateResult = await rateLimiter.checkLimit(ip, "/api/generate");
  const rateResponse = createRateLimitResponse(rateResult);
  if ("status" in rateResponse) return rateResponse;

  const body = await parseJsonBody(req);
  validateBody(body, [
    required("type"),
    isOneOf("type", ["ai-prompt", "image-prompt", "video-prompt"]),
    required("input"),
  ]);

  const { type, stream: wantStream, ...params } = body as Record<string, unknown>;

  let service: "text-generate" | "image-generate" | "video-generate";

  switch (type) {
    case "ai-prompt":
      service = "text-generate";
      break;
    case "image-prompt":
      service = "image-generate";
      break;
    case "video-prompt":
      service = "video-generate";
      break;
    default:
      throw new ApiError(400, `Invalid type: ${type}`);
  }

  if (wantStream && type === "ai-prompt") {
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    const messages = [
      { role: "system", content: "You are an expert prompt engineer. Generate professional, detailed AI prompts." },
      { role: "user", content: String(params.input) },
    ];

    (async () => {
      try {
        let fullText = "";
        await streamCompletion("text-generate", messages, ({ text, done }) => {
          if (!done) {
            fullText += text;
            writer.write(encoder.encode(`data: ${JSON.stringify({ delta: text })}\n\n`));
          }
        }, { maxTokens: 4096, temperature: 0.7 });

        await writer.write(encoder.encode(`data: [DONE]\n\n`));
        await writer.close();

        const duration = Date.now() - startTime;
        logger.requestEnd(requestId, "POST", "/api/generate", 200, duration);
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Stream error";
        await writer.write(encoder.encode(`data: ${JSON.stringify({ error: errMsg })}\n\n`));
        await writer.close();
      }
    })();

    return new NextResponse(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  let result: string;

  switch (type) {
    case "ai-prompt":
      result = await generateAIPrompt(params as Parameters<typeof generateAIPrompt>[0]);
      break;
    case "image-prompt":
      result = await generateImagePrompt(params as Parameters<typeof generateImagePrompt>[0]);
      break;
    case "video-prompt":
      result = await generateVideoPrompt(params as Parameters<typeof generateVideoPrompt>[0]);
      break;
    default:
      throw new ApiError(400, `Invalid type: ${type}`);
  }

  const duration = Date.now() - startTime;
  logger.requestEnd(requestId, "POST", "/api/generate", 200, duration);

  return NextResponse.json({ success: true, result, requestId, service }, { headers: rateResponse.headers });
}

async function rawHandler(req: NextRequest) {
  const supabase = await createClient();
  if (!supabase) {
    return handler(req, "anonymous");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return handler(req, "anonymous");
  }

  const body = await req.json().catch(() => null);
  const type = body?.type;

  let service: "text-generate" | "image-generate" | "video-generate" = "text-generate";
  if (type === "image-prompt") service = "image-generate";
  else if (type === "video-prompt") service = "video-generate";

  return withQuotaCheck(handler, service)(req);
}

export const POST = withErrorHandling(rawHandler);
