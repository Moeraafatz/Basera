import { NextRequest, NextResponse } from "next/server";
import { routeCompletion } from "@/lib/model-router";
import { withErrorHandling, ApiError } from "@/lib/errors";
import { rateLimiter, createRateLimitResponse } from "@/lib/rate-limiter";
import { parseJsonBody, validateBody, required, optional, isOneOf, isString } from "@/lib/validation";
import { logger } from "@/lib/logger";
import { withQuotaCheck } from "@/lib/quota-middleware";
import { createClient } from "@/lib/supabase/server";

async function handler(req: NextRequest, userId: string) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  logger.requestStart(requestId, "POST", "/api/cv/analyze");

  const rateResult = await rateLimiter.checkLimit(ip, "/api/cv/analyze");
  const rateResponse = createRateLimitResponse(rateResult);
  if ("status" in rateResponse) return rateResponse;

  const body = await parseJsonBody(req);
  validateBody(body, [
    required("cvText"),
    optional(isString("targetJob", { min: 2, max: 200 })),
    optional(isOneOf("targetMarket", ["global", "us", "uk", "eu", "gcc", "asia", "remote"])),
    optional(isOneOf("language", ["ar", "en"])),
  ]);

  const { cvText, targetJob, targetMarket = "global", language = "ar" } = body as {
    cvText: string;
    targetJob?: string;
    targetMarket?: string;
    language?: string;
  };

  const languageContext = language === "ar"
    ? "Respond in Arabic. Use professional Arabic suitable for the target job market."
    : "Respond in English. Use professional language suitable for the target job market.";

  const marketContext: Record<string, string> = {
    us: "United States",
    uk: "United Kingdom",
    eu: "European Union",
    gcc: "GCC Countries",
    asia: "Asia Pacific",
    remote: "Global Remote",
    global: "Global",
  };

  const systemPrompt = `You are an expert CV analyst and ATS compliance specialist for global job markets.

${languageContext}

Target Market: ${marketContext[targetMarket] || "Global"}

Analyze the provided CV and provide ONLY a valid JSON object (no markdown, no code blocks, no backticks) with this exact structure:
{
  "score": 75,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2"],
  "missingFields": ["field 1", "field 2"],
  "keywords": ["keyword 1", "keyword 2"],
  "recommendations": ["recommendation 1", "recommendation 2"]
}

Do NOT wrap the JSON in markdown code blocks. Do NOT add any text before or after the JSON. Return ONLY the raw JSON object.`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Analyze this CV${targetJob ? ` for the position: ${targetJob}` : ""}:\n\n${cvText}` },
  ];

  const result = await routeCompletion("cv-analyze", messages, {
    maxTokens: 2048,
    temperature: 0.3,
  });

  let parsedResult: unknown;
  try {
    const cleaned = result.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    parsedResult = JSON.parse(cleaned);
  } catch {
    throw new ApiError(502, "AI response was not valid JSON. Please try again.");
  }

  const duration = Date.now() - startTime;
  logger.requestEnd(requestId, "POST", "/api/cv/analyze", 200, duration);

  return NextResponse.json({ success: true, result: parsedResult, requestId, userId }, { headers: rateResponse.headers });
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

  return withQuotaCheck(handler, "cv-analyze")(req);
}

export const POST = withErrorHandling(rawHandler);
