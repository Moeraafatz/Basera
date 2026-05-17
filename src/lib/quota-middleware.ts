import { NextRequest, NextResponse } from "next/server";
import { checkQuota, logUsage, QuotaCheck } from "@/lib/usage-tracker";
import { ServiceType } from "@/types/subscription";
import { createClient } from "@/lib/supabase/server";
import { logger } from "./logger";

const quotaCache = new Map<string, { result: QuotaCheck; expiresAt: number }>();
const CACHE_TTL = 5 * 60 * 1000;

function getCacheKey(userId: string, service: ServiceType): string {
  return `${userId}:${service}`;
}

async function getCachedQuota(userId: string, service: ServiceType): Promise<QuotaCheck> {
  const key = getCacheKey(userId, service);
  const cached = quotaCache.get(key);

  if (cached && Date.now() < cached.expiresAt) {
    return cached.result;
  }

  const result = await checkQuota(userId, service);
  quotaCache.set(key, { result, expiresAt: Date.now() + CACHE_TTL });

  return result;
}

export function clearQuotaCache(userId: string, service: ServiceType) {
  const key = getCacheKey(userId, service);
  quotaCache.delete(key);
}

export function withQuotaCheck(
  handler: (req: NextRequest, userId: string) => Promise<NextResponse>,
  service: ServiceType
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const requestId = crypto.randomUUID();

    const supabase = await createClient();
    if (!supabase) {
      return handler(req, "anonymous");
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const quota = await getCachedQuota(userId, service);

    if (!quota.allowed) {
      await logUsage({
        userId,
        service,
        status: "rate_limited",
        ipAddress: ip,
        requestId,
        metadata: { limit: quota.limit, used: quota.used },
      });

      logger.warn("Quota exceeded", {
        userId,
        service,
        limit: quota.limit,
        used: quota.used,
      });

      return NextResponse.json(
        {
          success: false,
          error: "Quota exceeded",
          quota: {
            limit: quota.limit,
            used: quota.used,
            remaining: 0,
            resetsAt: quota.resetsAt.toISOString(),
          },
        },
        { status: 429 }
      );
    }

    try {
      const response = await handler(req, userId);

      if (response.status >= 200 && response.status < 300) {
        await logUsage({
          userId,
          service,
          status: "success",
          ipAddress: ip,
          requestId,
        });

        clearQuotaCache(userId, service);
      }

      return response;
    } catch (error) {
      await logUsage({
        userId,
        service,
        status: "error",
        errorMessage: error instanceof Error ? error.message : "Unknown error",
        ipAddress: ip,
        requestId,
      });

      throw error;
    }
  };
}
