import { NextRequest, NextResponse } from "next/server";
import { analyzeReference, optimizeTextPrompt } from "@/lib/ai-service";
import { withErrorHandling } from "@/lib/errors";
import { rateLimiter, createRateLimitResponse } from "@/lib/rate-limiter";
import { parseJsonBody, validateBody, optional } from "@/lib/validation";
import { logger } from "@/lib/logger";

async function handler(req: NextRequest) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  logger.requestStart(requestId, "POST", "/api/analyze-reference");

  const rateResult = await rateLimiter.checkLimit(ip, "/api/analyze-reference");
  const rateResponse = createRateLimitResponse(rateResult);
  if ("status" in rateResponse) return rateResponse;

  const body = await parseJsonBody(req);
  validateBody(body, [
    optional("imageBase64"),
    optional("textInput"),
    optional("promptTemplate"),
    optional("type"),
    optional("context"),
  ]);

  const { imageBase64, textInput, promptTemplate, type, context } = body as {
    imageBase64?: string;
    textInput?: string;
    promptTemplate?: string;
    type?: string;
    context?: string;
  };

  if (!imageBase64 && !textInput) {
    return NextResponse.json({ success: false, error: "No image or text provided" }, { status: 400 });
  }

  let result: Record<string, unknown>;

  if (textInput) {
    const optimizedPrompt = await optimizeTextPrompt(textInput, promptTemplate, type);
    result = { optimizedPrompt };
  } else {
    const analysis = await analyzeReference(imageBase64!, type, context);
    result = { analysis };
  }

  const duration = Date.now() - startTime;
  logger.requestEnd(requestId, "POST", "/api/analyze-reference", 200, duration);

  return NextResponse.json({ success: true, ...result, requestId }, { headers: rateResponse.headers });
}

export const POST = withErrorHandling(handler);
