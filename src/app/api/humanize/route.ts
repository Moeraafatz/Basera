import { NextRequest, NextResponse } from "next/server";
import { routeCompletion } from "@/lib/model-router";
import { withErrorHandling, ApiError } from "@/lib/errors";
import { rateLimiter, createRateLimitResponse } from "@/lib/rate-limiter";
import { parseJsonBody, validateBody, required, isOneOf } from "@/lib/validation";
import { logger } from "@/lib/logger";

async function handler(req: NextRequest) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  logger.requestStart(requestId, "POST", "/api/humanize");

  const rateResult = await rateLimiter.checkLimit(ip, "/api/humanize");
  const rateResponse = createRateLimitResponse(rateResult);
  if ("status" in rateResponse) return rateResponse;

  const body = await parseJsonBody(req);
  validateBody(body, [
    required("text"),
  ]);

  const { text } = body as { text: string };

  const systemPrompt = `أنت خبير في صياغة النصوص بأسلوب بشري طبيعي. مهمتك إعادة صياغة النص المقدم ليبدو وكأنه كُتب بواسطة إنسان، مع الحفاظ على المعنى الأصلي.

القواعد:
- استخدم لغة طبيعية وتدفق سلس
- تجنب العبارات الروبوتية والمتكررة
- أضف تنوعاً في طول الجمل
- استخدم انتقالات طبيعية بين الأفكار
- حافظ على النبرة والسياق الأصلي
- أعد النص المحسّن فقط بدون شروحات`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `أعد صياغة هذا النص بأسلوب بشري طبيعي:\n\n${text}` },
  ];

  const result = await routeCompletion("humanize", messages, {
    maxTokens: 2048,
    temperature: 0.7,
  });

  const duration = Date.now() - startTime;
  logger.requestEnd(requestId, "POST", "/api/humanize", 200, duration);

  return NextResponse.json({ success: true, result, requestId }, { headers: rateResponse.headers });
}

export const POST = withErrorHandling(handler);
