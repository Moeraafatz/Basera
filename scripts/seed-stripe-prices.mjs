/**
 * Seed Stripe Price IDs to subscription_tiers table
 * Run this after creating products in Stripe Dashboard
 * 
 * Usage:
 * STRIPE_SECRET_KEY=sk_test_... node scripts/seed-stripe-prices.mjs
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

if (!stripeSecretKey) {
  console.error("Missing STRIPE_SECRET_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedStripePrices() {
  console.log("Fetching Stripe products...");

  const stripe = (await import("stripe")).default;
  const stripeClient = new stripe(stripeSecretKey, { apiVersion: "2025-02-24.clover" });

  const products = await stripeClient.products.list({
    expand: ["data.default_price"],
    active: true,
  });

  console.log(`Found ${products.data.length} active Stripe products`);

  for (const product of products.data) {
    const tierName = product.metadata?.tier_name?.toLowerCase();
    if (!tierName || !["free", "pro", "enterprise"].includes(tierName)) {
      console.log(`Skipping product "${product.name}" (no valid tier_name metadata)`);
      continue;
    }

    const prices = await stripeClient.prices.list({
      product: product.id,
      active: true,
    });

    const monthlyPrice = prices.data.find((p) => p.recurring?.interval === "month");
    const yearlyPrice = prices.data.find((p) => p.recurring?.interval === "year");

    console.log(`Updating tier "${tierName}":`, {
      monthly: monthlyPrice?.id,
      yearly: yearlyPrice?.id,
    });

    const { error } = await supabase
      .from("subscription_tiers")
      .update({
        stripe_price_id_monthly: monthlyPrice?.id || null,
        stripe_price_id_yearly: yearlyPrice?.id || null,
      })
      .eq("name", tierName);

    if (error) {
      console.error(`Error updating ${tierName}:`, error);
    }
  }

  console.log("Done! Verify with:");
  console.log("SELECT name, stripe_price_id_monthly, stripe_price_id_yearly FROM subscription_tiers;");
}

seedStripePrices().catch(console.error);
