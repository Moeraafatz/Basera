import { NextRequest, NextResponse } from "next/server";
import { providerMetrics } from "@/lib/provider-metrics";
import { getAvailableProviders } from "@/lib/model-router";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const view = url.searchParams.get("view") || "summary";

  if (view === "health") {
    return NextResponse.json({
      status: "ok",
      providers: getAvailableProviders(),
      health: providerMetrics.getHealthSummary(),
    });
  }

  if (view === "providers") {
    return NextResponse.json({
      providers: providerMetrics.getProviderStats(),
    });
  }

  if (view === "services") {
    return NextResponse.json({
      services: providerMetrics.getServiceStats(),
    });
  }

  if (view === "failures") {
    return NextResponse.json({
      failures: providerMetrics.getRecentFailures(50),
    });
  }

  return NextResponse.json({
    health: providerMetrics.getHealthSummary(),
    providers: providerMetrics.getProviderStats(),
    services: providerMetrics.getServiceStats(),
  });
}
