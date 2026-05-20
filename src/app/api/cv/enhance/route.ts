import { NextRequest, NextResponse } from "next/server";
import { routeCompletion } from "@/lib/model-router";
import { withErrorHandling, ApiError } from "@/lib/errors";
import { rateLimiter, createRateLimitResponse } from "@/lib/rate-limiter";
import { parseJsonBody, validateBody, required, optional, isOneOf } from "@/lib/validation";
import { logger } from "@/lib/logger";

function extractJsonFromText(text: string): unknown | null {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    return null;
  }
  return null;
}

async function handler(req: NextRequest) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  logger.requestStart(requestId, "POST", "/api/cv/enhance");

  const rateResult = await rateLimiter.checkLimit(ip, "/api/cv/enhance");
  const rateResponse = createRateLimitResponse(rateResult);
  if ("status" in rateResponse) return rateResponse;

  const body = await parseJsonBody(req);
  validateBody(body, [
    required("cvData"),
    optional(isOneOf("targetMarket", ["global", "us", "uk", "eu", "gcc", "asia", "remote"])),
    optional(isOneOf("language", ["ar", "en"])),
  ]);

  const { cvData, targetJob, targetMarket = "global", language = "ar" } = body as {
    cvData: Record<string, unknown>;
    targetJob?: string;
    targetMarket?: string;
    language?: string;
  };

  if (typeof cvData !== "object" || cvData === null || Array.isArray(cvData)) {
    throw new ApiError(400, "cvData must be a valid JSON object");
  }

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

  const systemPrompt = `You are an expert CV enhancer and career consultant specializing in global job markets.

${languageContext}

Target Market: ${marketContext[targetMarket] || "Global"}
${targetJob ? `Target Position: ${targetJob}` : ""}

Enhance the provided CV by:
1. Optimizing professional summary for the target market
2. Rewriting experience bullet points with action verbs and metrics
3. Adding market-specific keywords and relevant experience
4. Improving skills section with relevant certifications
5. Ensuring ATS compatibility
6. Adding work authorization and location preferences if missing

Return enhanced CV sections in JSON format:
{
  "summary": string,
  "experience": [{ "role": string, "company": string, "bullets": string[] }],
  "suggestedKeywords": string[],
  "atsRecommendations": string[]
}`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Enhance this CV:\n\n${JSON.stringify(cvData, null, 2)}` },
  ];

  const result = await routeCompletion("cv-enhance", messages, {
    maxTokens: 4096,
    temperature: 0.5,
  });

  let parsedResult: unknown;
  let parseError = null;
  
  const cleaned = result.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  
  try {
    parsedResult = JSON.parse(cleaned);
  } catch (e) {
    parseError = e;
    const extracted = extractJsonFromText(result);
    if (extracted) {
      parsedResult = extracted;
      parseError = null;
    }
  }

  if (parseError || !parsedResult) {
    logger.warn("CV enhance JSON parse failed - using fallback", { result: result.substring(0, 500) });
    parsedResult = {
      summary: cleaned.substring(0, 500),
      experience: [],
      suggestedKeywords: [],
      atsRecommendations: ["Could not parse AI response - please try again"],
    };
  }

  const duration = Date.now() - startTime;
  logger.requestEnd(requestId, "POST", "/api/cv/enhance", 200, duration);

  return NextResponse.json({ success: true, result: parsedResult, requestId }, { headers: rateResponse.headers });
}

export const POST = withErrorHandling(handler);
