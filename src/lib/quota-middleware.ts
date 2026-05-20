import { NextRequest, NextResponse } from "next/server";
import { logger } from "./logger";

export function withQuotaCheck(
  handler: (req: NextRequest) => Promise<NextResponse>,
  service: string
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const requestId = crypto.randomUUID();

    logger.info("API request", {
      service,
      ip,
      requestId,
    });

    try {
      const response = await handler(req);
      return response;
    } catch (error) {
      logger.error("API error", {
        service,
        error: error instanceof Error ? error.message : "Unknown error",
        ip,
        requestId,
      });
      throw error;
    }
  };
}