import { NextRequest, NextResponse } from "next/server";
import { routeCompletion } from "@/lib/model-router";
import { getCodePromptSystem } from "@/lib/prompts/code-guidelines";
import { withErrorHandling } from "@/lib/errors";
import { rateLimiter, createRateLimitResponse } from "@/lib/rate-limiter";
import { parseJsonBody, validateBody, required, optional } from "@/lib/validation";
import { logger } from "@/lib/logger";

async function handler(req: NextRequest) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  logger.requestStart(requestId, "POST", "/api/code/generate");

  const rateResult = await rateLimiter.checkLimit(ip, "/api/code/generate");
  const rateResponse = createRateLimitResponse(rateResult);
  if ("status" in rateResponse) return rateResponse;

  const body = await parseJsonBody(req);
  validateBody(body, [
    required("input"),
    optional("model"),
    optional("category"),
    optional("task"),
    optional("language"),
  ]);

  const { input, model = "gpt-5.5-codex", category = "web", task = "new-feature", language = "ar" } = body as {
    input: string;
    model?: string;
    category?: string;
    task?: string;
    language?: string;
  };

  const systemPrompt = getCodePromptSystem(model, category, task);

  const additionalContext = `
Task Description: ${input}
Language: ${language === "ar" ? "Arabic" : "English"}

Provide a comprehensive solution that includes:
- Clear explanation of the approach
- Complete, working code
- Setup instructions and dependencies
- Usage examples
- Error handling considerations
- Testing approach
- Best practices applied

Format code blocks with proper syntax highlighting markers.`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: additionalContext },
  ];

  const result = await routeCompletion("code-generate", messages, {
    maxTokens: 4096,
    temperature: 0.3,
  });

  const duration = Date.now() - startTime;
  logger.requestEnd(requestId, "POST", "/api/code/generate", 200, duration);

  return NextResponse.json({ success: true, result, model, category, task, requestId }, { headers: rateResponse.headers });
}

export const POST = withErrorHandling(handler);
