import { NextResponse } from "next/server";
import { logger } from "./logger";

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const DEFAULT_CONFIGS: Record<string, RateLimitConfig> = {
  default: { maxRequests: 30, windowMs: 60_000 },
  "cv-analyze": { maxRequests: 10, windowMs: 60_000 },
  "cv-enhance": { maxRequests: 10, windowMs: 60_000 },
  "image-generate": { maxRequests: 20, windowMs: 60_000 },
  generate: { maxRequests: 30, windowMs: 60_000 },
};

class RateLimiter {
  private requests = new Map<string, number[]>();

  private cleanup() {
    const now = Date.now();
    const maxWindow = Math.max(...Object.values(DEFAULT_CONFIGS).map((c) => c.windowMs));
    for (const [key, timestamps] of this.requests.entries()) {
      const recent = timestamps.filter((t) => now - t < maxWindow);
      if (recent.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, recent);
      }
    }
  }

  async checkLimit(
    identifier: string,
    path: string,
    config?: RateLimitConfig
  ): Promise<{ allowed: boolean; remaining: number; limit: number; reset: number }> {
    const now = Date.now();
    const { maxRequests, windowMs } = config || DEFAULT_CONFIGS.default;

    const key = `${identifier}:${path}`;
    const requests = this.requests.get(key) || [];

    const recentRequests = requests.filter((t) => now - t < windowMs);

    if (recentRequests.length >= maxRequests) {
      logger.rateLimitExceeded(identifier, path);
      const resetTime = recentRequests[0] + windowMs;
      return {
        allowed: false,
        remaining: 0,
        limit: maxRequests,
        reset: resetTime,
      };
    }

    recentRequests.push(now);
    this.requests.set(key, recentRequests);

    if (this.requests.size > 10_000) {
      this.cleanup();
    }

    return {
      allowed: true,
      remaining: maxRequests - recentRequests.length,
      limit: maxRequests,
      reset: now + windowMs,
    };
  }
}

export const rateLimiter = new RateLimiter();

export function getRateLimitHeaders(result: {
  allowed: boolean;
  remaining: number;
  limit: number;
  reset: number;
}): Record<string, string> {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.reset),
  };

  if (!result.allowed) {
    headers["Retry-After"] = String(Math.ceil((result.reset - Date.now()) / 1000));
  }

  return headers;
}

export function createRateLimitResponse(result: {
  allowed: boolean;
  remaining: number;
  limit: number;
  reset: number;
}) {
  const headers = getRateLimitHeaders(result);

  if (!result.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Rate limit exceeded. Please try again later.",
        retryAfter: Math.ceil((result.reset - Date.now()) / 1000),
      },
      { status: 429, headers }
    );
  }

  return { headers };
}
