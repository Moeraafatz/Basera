import { NextRequest, NextResponse } from "next/server";
import { analyzeReference } from "@/lib/ai-service";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, type, context } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const analysis = await analyzeReference(imageBase64, type, context);

    return NextResponse.json({ analysis });
  } catch (error: unknown) {
    console.error("Reference analysis error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
