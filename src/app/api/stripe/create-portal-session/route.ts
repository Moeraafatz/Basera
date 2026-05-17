import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { withErrorHandling, ApiError } from "@/lib/errors";
import { stripe } from "@/lib/stripe/client";
import { logger } from "@/lib/logger";

async function handler(req: NextRequest) {
  if (!stripe) {
    throw new ApiError(503, "Stripe is not configured");
  }

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

  const { data: subscription } = await supabase
    .from("user_subscriptions")
    .select("stripe_customer_id, stripe_subscription_id")
    .eq("user_id", userId)
    .single();

  if (!subscription?.stripe_customer_id) {
    throw new ApiError(400, "No active subscription found");
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripe_customer_id,
    return_url: `${baseUrl}/dashboard`,
  });

  logger.info("Portal session created", {
    userId,
    sessionId: portalSession.id,
  });

  return NextResponse.json({
    success: true,
    url: portalSession.url,
  });
}

export const POST = withErrorHandling(handler);
