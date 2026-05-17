import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe/client";
import { logger } from "@/lib/logger";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!webhookSecret) {
  logger.warn("STRIPE_WEBHOOK_SECRET is not set - webhook verification disabled");
}

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe signature" }, { status: 400 });
  }

  let event: Awaited<ReturnType<typeof stripe.webhooks.constructEvent>>;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret!);
  } catch (err) {
    logger.error("Webhook signature verification failed", {
      error: err instanceof Error ? err.message : "Unknown error",
    });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) {
    logger.error("Supabase unavailable for webhook processing");
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.user_id || session.client_reference_id;

        if (!userId) {
          logger.error("No user_id in checkout session metadata", {
            sessionId: session.id,
          });
          break;
        }

        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;

        if (!subscriptionId) {
          logger.error("No subscription in checkout session", {
            sessionId: session.id,
          });
          break;
        }

        const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId) as Stripe.Subscription;
        const sub = stripeSubscription as Stripe.Subscription & {
          current_period_start: number;
          current_period_end: number;
          trial_start: number | null;
          trial_end: number | null;
          cancel_at_period_end: boolean;
          canceled_at: number | null;
        };

        const priceId = sub.items.data[0]?.price.id;
        const interval = sub.items.data[0]?.price.recurring?.interval;

        const tier = session.metadata?.tier || "pro";

        await supabase.from("user_subscriptions").upsert({
          user_id: userId,
          tier_id: await getTierId(supabase, tier),
          status: sub.status,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          stripe_price_id: priceId,
          billing_interval: interval === "month" ? "month" : interval === "year" ? "year" : null,
          trial_start: sub.trial_start
            ? new Date(sub.trial_start * 1000).toISOString()
            : null,
          trial_end: sub.trial_end
            ? new Date(sub.trial_end * 1000).toISOString()
            : null,
          current_period_start: new Date(
            sub.current_period_start * 1000
          ).toISOString(),
          current_period_end: new Date(
            sub.current_period_end * 1000
          ).toISOString(),
          cancel_at_period_end: sub.cancel_at_period_end,
          metadata: {
            checkout_session_id: session.id,
          },
        });

        logger.info("Subscription activated", {
          userId,
          tier,
          subscriptionId,
        });
        break;
      }

      case "customer.subscription.updated": {
        const stripeSubscription = event.data.object as Stripe.Subscription & {
          current_period_start: number;
          current_period_end: number;
          trial_start: number | null;
          trial_end: number | null;
          cancel_at_period_end: boolean;
          canceled_at: number | null;
        };
        const customerId = stripeSubscription.customer as string;

        const { data: sub } = await supabase
          .from("user_subscriptions")
          .select("id, user_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!sub) {
          logger.warn("Subscription not found for customer", {
            customerId,
          });
          break;
        }

        await supabase
          .from("user_subscriptions")
          .update({
            status: stripeSubscription.status,
            stripe_price_id: stripeSubscription.items.data[0]?.price.id,
            current_period_start: new Date(
              stripeSubscription.current_period_start * 1000
            ).toISOString(),
            current_period_end: new Date(
              stripeSubscription.current_period_end * 1000
            ).toISOString(),
            cancel_at_period_end: stripeSubscription.cancel_at_period_end,
            canceled_at: stripeSubscription.canceled_at
              ? new Date(stripeSubscription.canceled_at * 1000).toISOString()
              : null,
            trial_start: stripeSubscription.trial_start
              ? new Date(stripeSubscription.trial_start * 1000).toISOString()
              : null,
            trial_end: stripeSubscription.trial_end
              ? new Date(stripeSubscription.trial_end * 1000).toISOString()
              : null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", sub.id);

        logger.info("Subscription updated", {
          userId: sub.user_id,
          status: stripeSubscription.status,
        });
        break;
      }

      case "customer.subscription.deleted": {
        const stripeSubscription = event.data.object as Stripe.Subscription & {
          customer: string;
        };
        const customerId = stripeSubscription.customer as string;

        await supabase
          .from("user_subscriptions")
          .update({
            status: "canceled",
            canceled_at: new Date().toISOString(),
            cancel_at_period_end: false,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId);

        logger.info("Subscription canceled", {
          customerId,
        });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const customerId = invoice.customer as string;

        const { data: sub } = await supabase
          .from("user_subscriptions")
          .select("id, user_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (sub) {
          await supabase
            .from("user_subscriptions")
            .update({
              status: "past_due",
              updated_at: new Date().toISOString(),
            })
            .eq("id", sub.id);

          logger.warn("Payment failed", {
            userId: sub.user_id,
            invoiceId: invoice.id,
          });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        const customerId = invoice.customer as string;

        const { data: sub } = await supabase
          .from("user_subscriptions")
          .select("id, user_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (sub) {
          await supabase
            .from("user_subscriptions")
            .update({
              status: "active",
              updated_at: new Date().toISOString(),
            })
            .eq("id", sub.id);

          logger.info("Payment succeeded", {
            userId: sub.user_id,
            invoiceId: invoice.id,
          });
        }
        break;
      }

      default:
        logger.info("Unhandled webhook event", {
          eventType: event.type,
        });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    logger.error("Webhook processing error", {
      error: err instanceof Error ? err.message : "Unknown error",
      eventType: event.type,
    });
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

async function getTierId(supabase: Awaited<ReturnType<typeof createClient>>, tierName: string): Promise<string> {
  const { data, error } = await supabase!
    .from("subscription_tiers")
    .select("id")
    .eq("name", tierName)
    .single();

  if (error || !data) {
    throw new Error(`Tier "${tierName}" not found`);
  }

  return data.id;
}
