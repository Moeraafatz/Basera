import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const checks: Record<string, { status: string; details?: string }> = {};

  const supabase = await createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("prompts").select("id").limit(1);
      if (error) throw error;
      checks.supabase = { status: "ok", details: "Connected" };
    } catch (err) {
      const details = err instanceof Error ? err.message : JSON.stringify(err);
      console.error("Supabase health check failed:", details);
      checks.supabase = {
        status: "error",
        details,
      };
    }
  } else {
    checks.supabase = { status: "disabled", details: "Missing environment variables" };
  }

  const allOk = Object.values(checks).every(
    (c) => c.status === "ok" || c.status === "disabled"
  );

  return NextResponse.json({
    status: allOk ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    checks,
  });
}
