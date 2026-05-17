import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { withErrorHandling, ApiError } from "@/lib/errors";
import { SERVICE_LIMITS, ServiceType } from "@/types/subscription";
import { getUserLimits } from "@/lib/usage-tracker";

async function handler(req: NextRequest) {
  const supabase = await createClient();
  if (!supabase) {
    throw new ApiError(503, "Database unavailable");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new ApiError(401, "Authentication required");
  }

  const userId = session.user.id;

  const now = new Date();
  const dayStart = new Date(now);
  dayStart.setHours(0, 0, 0, 0);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const services: ServiceType[] = [
    "text-generate",
    "text-optimize",
    "humanize",
    "cv-analyze",
    "cv-enhance",
    "image-generate",
    "video-generate",
    "code-generate",
  ];

  const usageByService = await Promise.all(
    services.map(async (service) => {
      const periodStart = SERVICE_LIMITS[service].includes("monthly")
        ? monthStart
        : dayStart;

      const { data: count } = await supabase.rpc("get_usage_count", {
        user_uuid: userId,
        service_name: service,
        period_start: periodStart.toISOString(),
        period_end: now.toISOString(),
      });

      return {
        service,
        used: count ?? 0,
      };
    })
  );

  const limits = await getUserLimits(userId);

  const { data: subscription } = await supabase.rpc("get_user_subscription", {
    user_uuid: userId,
  });

  return NextResponse.json({
    success: true,
    subscription: subscription?.[0] || null,
    limits: limits || {},
    usage: usageByService,
    period: {
      day: {
        start: dayStart.toISOString(),
        end: new Date(dayStart.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      },
      month: {
        start: monthStart.toISOString(),
        end: new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString(),
      },
    },
  });
}

export const GET = withErrorHandling(handler);
