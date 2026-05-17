import { NextRequest, NextResponse } from "next/server";
import { routeCompletion } from "@/lib/model-router";
import { withErrorHandling } from "@/lib/errors";
import { rateLimiter, createRateLimitResponse } from "@/lib/rate-limiter";
import { parseJsonBody, validateBody, required, optional } from "@/lib/validation";
import { logger } from "@/lib/logger";

async function handler(req: NextRequest) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  logger.requestStart(requestId, "POST", "/api/text/optimize");

  const rateResult = await rateLimiter.checkLimit(ip, "/api/text/optimize");
  const rateResponse = createRateLimitResponse(rateResult);
  if ("status" in rateResponse) return rateResponse;

  const body = await parseJsonBody(req);
  validateBody(body, [
    required("content"),
    optional("section"),
    optional("instruction"),
    optional("language"),
  ]);

  const { section, content, instruction, language = "ar" } = body as {
    section?: string;
    content: string;
    instruction?: string;
    language?: string;
  };

  const languageContext = language === "ar"
    ? "Respond in Arabic. Maintain professional Arabic style."
    : "Respond in English. Maintain professional style.";

  const systemPrompt = `You are an expert text editor and AI prompt specialist. Your task is to refine and improve a specific section of generated content.

${languageContext}

SECTION: ${section || "General"}
INSTRUCTION: ${instruction || "Improve clarity, structure, and effectiveness while maintaining the original intent."}

Guidelines:
- Maintain the original meaning and intent
- Improve clarity and readability
- Enhance structure and formatting
- Add specificity where vague
- Remove redundancy
- Keep the same tone and style`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Improve this section:\n\n${content}` },
  ];

  const result = await routeCompletion("text-edit", messages, {
    maxTokens: 2048,
    temperature: 0.5,
  });

  const duration = Date.now() - startTime;
  logger.requestEnd(requestId, "POST", "/api/text/optimize", 200, duration);

  return NextResponse.json({ success: true, result, section, requestId }, { headers: rateResponse.headers });
}

export const POST = withErrorHandling(handler);
