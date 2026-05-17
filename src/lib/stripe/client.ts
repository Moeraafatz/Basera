import Stripe from "stripe";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-04-22.dahlia",
      typescript: true,
    })
  : null;

export function getStripePriceId(tier: "free" | "pro" | "enterprise", interval: "month" | "year"): string | null {
  const priceKey = interval === "month" ? "stripe_price_id_monthly" : "stripe_price_id_yearly";

  const priceMap: Record<string, Record<string, string | null>> = {
    free: { stripe_price_id_monthly: null, stripe_price_id_yearly: null },
    pro: {
      stripe_price_id_monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || null,
      stripe_price_id_yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID || null,
    },
    enterprise: {
      stripe_price_id_monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID || null,
      stripe_price_id_yearly: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID || null,
    },
  };

  return priceMap[tier]?.[priceKey] ?? null;
}
