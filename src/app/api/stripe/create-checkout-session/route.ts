import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { withErrorHandling, ApiError } from "@/lib/errors";
import { stripe, getStripePriceId } from "@/lib/stripe/client";
import { parseJsonBody, validateBody, required, optional, isOneOf } from "@/lib/validation";
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
  const email = session.user.email;

  if (!email) {
    throw new ApiError(400, "User email is required");
  }

  const body = await parseJsonBody(req);
  validateBody(body, [
    required("tier"),
    isOneOf("tier", ["pro", "enterprise"]),
    optional(isOneOf("interval", ["month", "year"])),
  ]);

  const { tier, interval = "month" } = body as {
    tier: "pro" | "enterprise";
    interval?: "month" | "year";
  };

  const priceId = getStripePriceId(tier, interval);
  if (!priceId) {
    throw new ApiError(400, `Price not found for ${tier} (${interval})`);
  }

  const { data: existingSub } = await supabase
    .from("user_subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", userId)
    .single();

  let customerId = existingSub?.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email,
      metadata: { user_id: userId },
    });
    customerId = customer.id;

    await supabase
      .from("user_subscriptions")
      .update({ stripe_customer_id: customerId })
      .eq("user_id", userId);
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/dashboard?subscription=success`,
    cancel_url: `${baseUrl}/pricing?subscription=cancelled`,
    metadata: {
      user_id: userId,
      tier,
      interval,
    },
    client_reference_id: userId,
  });

  logger.info("Checkout session created", {
    userId,
    tier,
    interval,
    sessionId: checkoutSession.id,
  });

  return NextResponse.json({
    success: true,
    url: checkoutSession.url,
    sessionId: checkoutSession.id,
  });
}

export const POST = withErrorHandling(handler);
