import { NextRequest, NextResponse } from "next/server";
import { routeCompletion } from "@/lib/model-router";
import { getTextGuidelines } from "@/lib/prompts/text-guidelines";
import { withErrorHandling } from "@/lib/errors";
import { rateLimiter, createRateLimitResponse } from "@/lib/rate-limiter";
import { parseJsonBody, validateBody, required, optional, isOneOf } from "@/lib/validation";
import { logger } from "@/lib/logger";
import { streamCompletion } from "@/lib/streaming";

async function handler(req: NextRequest) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  logger.requestStart(requestId, "POST", "/api/text/generate");

  const rateResult = await rateLimiter.checkLimit(ip, "/api/text/generate");
  const rateResponse = createRateLimitResponse(rateResult);
  if ("status" in rateResponse) return rateResponse;

  const body = await parseJsonBody(req);
  validateBody(body, [
    required("input"),
    optional(isOneOf("level", ["simple", "advanced", "expert"])),
    optional("category"),
    optional(isOneOf("language", ["ar", "en"])),
    optional("model"),
    optional("stream"),
  ]);

  const { input, level = "advanced" as const, category = "content", language = "ar" as const, model, stream: wantStream } = body as {
    input: string;
    level?: "simple" | "advanced" | "expert";
    category?: string;
    language?: "ar" | "en";
    model?: string;
    stream?: boolean;
  };

  const guidelines = getTextGuidelines({ level, category, language, model });

  const messages = [
    { role: "system", content: guidelines.systemPrompt },
    { role: "user", content: guidelines.userPrompt(input, { level, category, language, model }) },
  ];

  if (wantStream) {
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    (async () => {
      try {
        await streamCompletion("text-generate", messages, ({ text, done }) => {
          if (!done) {
            writer.write(encoder.encode(`data: ${JSON.stringify({ delta: text })}\n\n`));
          }
        }, { maxTokens: guidelines.maxTokens, temperature: guidelines.temperature });

        await writer.write(encoder.encode(`data: [DONE]\n\n`));
        await writer.close();

        const duration = Date.now() - startTime;
        logger.requestEnd(requestId, "POST", "/api/text/generate", 200, duration);
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

  const result = await routeCompletion("text-generate", messages, {
    maxTokens: guidelines.maxTokens,
    temperature: guidelines.temperature,
  });

  const duration = Date.now() - startTime;
  logger.requestEnd(requestId, "POST", "/api/text/generate", 200, duration);

  return NextResponse.json(
    { success: true, result, model: model || "default", level, category, requestId },
    { headers: rateResponse.headers }
  );
}

export const POST = withErrorHandling(handler);
