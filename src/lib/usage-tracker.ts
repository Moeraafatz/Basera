import { createClient } from "@/lib/supabase/server";
import { ServiceType, SERVICE_LIMITS, PERIOD_MAP } from "@/types/subscription";
import { logger } from "./logger";

export interface UsageLogParams {
  userId: string;
  service: ServiceType;
  model?: string;
  tokensUsed?: number;
  requestId?: string;
  status?: "success" | "error" | "rate_limited";
  errorMessage?: string;
  ipAddress?: string;
  metadata?: Record<string, unknown>;
}

export async function logUsage(params: UsageLogParams) {
  const supabase = await createClient();
  if (!supabase) {
    logger.warn("Usage logging skipped: Supabase unavailable");
    return;
  }

  const { error } = await supabase.from("usage_logs").insert({
    user_id: params.userId,
    service: params.service,
    model: params.model || null,
    tokens_used: params.tokensUsed || 0,
    request_id: params.requestId || null,
    status: params.status || "success",
    error_message: params.errorMessage || null,
    ip_address: params.ipAddress || null,
    metadata: params.metadata || {},
  });

  if (error) {
    logger.error("Failed to log usage", { error: error.message, service: params.service });
  }
}

export interface QuotaCheck {
  allowed: boolean;
  limit: number;
  used: number;
  remaining: number;
  resetsAt: Date;
}

export async function checkQuota(
  userId: string,
  service: ServiceType
): Promise<QuotaCheck> {
  const supabase = await createClient();
  if (!supabase) {
    return { allowed: true, limit: -1, used: 0, remaining: -1, resetsAt: new Date() };
  }

  const limitKey = SERVICE_LIMITS[service];
  const period = PERIOD_MAP[service];

  const { data: subscription } = await supabase.rpc("get_user_subscription", {
    user_uuid: userId,
  });

  if (!subscription || subscription.length === 0) {
    return { allowed: true, limit: -1, used: 0, remaining: -1, resetsAt: new Date() };
  }

  const sub = subscription[0];
  const limits = sub.limits as Record<string, number>;
  const limit = limits[limitKey] ?? -1;

  if (limit === -1) {
    return { allowed: true, limit: -1, used: 0, remaining: -1, resetsAt: new Date() };
  }

  const now = new Date();
  let periodStart: Date;
  let resetsAt: Date;

  if (period === "day") {
    periodStart = new Date(now);
    periodStart.setHours(0, 0, 0, 0);
    resetsAt = new Date(periodStart);
    resetsAt.setDate(resetsAt.getDate() + 1);
  } else {
    periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    resetsAt = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }

  const { data: usageCount } = await supabase.rpc("get_usage_count", {
    user_uuid: userId,
    service_name: service,
    period_start: periodStart.toISOString(),
    period_end: resetsAt.toISOString(),
  });

  const used = usageCount ?? 0;
  const remaining = Math.max(0, limit - used);

  return {
    allowed: used < limit,
    limit,
    used,
    remaining,
    resetsAt,
  };
}

export async function getUserLimits(userId: string) {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data: subscription } = await supabase.rpc("get_user_subscription", {
    user_uuid: userId,
  });

  if (!subscription || subscription.length === 0) {
    const { data: freeTier } = await supabase
      .from("subscription_tiers")
      .select("limits")
      .eq("name", "free")
      .single();

    return freeTier?.limits as Record<string, number> | null;
  }

  return subscription[0].limits as Record<string, number>;
}
