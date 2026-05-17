import { NextRequest, NextResponse } from "next/server";
import { logger } from "./logger";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = "ApiError";
  }
}

export function errorHandler(error: unknown, context?: Record<string, unknown>) {
  if (error instanceof ApiError) {
    logger.warn("Operational error", {
      message: error.message,
      statusCode: error.statusCode,
      ...context,
    });
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode }
    );
  }

  if (error instanceof SyntaxError) {
    logger.warn("Invalid JSON in request body", context);
    return NextResponse.json(
      { success: false, error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  const message = error instanceof Error ? error.message : "Internal server error";

  logger.error("Unexpected error", {
    message,
    stack: error instanceof Error ? error.stack : undefined,
    ...context,
  });

  return NextResponse.json(
    { success: false, error: "Internal server error" },
    { status: 500 }
  );
}

export function withErrorHandling(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const startTime = Date.now();
    try {
      return await handler(req);
    } catch (error) {
      const duration = Date.now() - startTime;
      if (error instanceof Error) {
        logger.requestError("unknown", req.method, req.url, error, duration);
      }
      return errorHandler(error, { path: req.url, method: req.method });
    }
  };
}
