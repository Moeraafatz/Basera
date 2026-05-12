import { NextRequest, NextResponse } from "next/server";
import { analyzeReference, optimizeTextPrompt } from "@/lib/ai-service";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, textInput, promptTemplate, type, context } = await req.json();

    if (!imageBase64 && !textInput) {
      return NextResponse.json({ error: "No image or text provided" }, { status: 400 });
    }

    if (textInput) {
      const optimizedPrompt = await optimizeTextPrompt(textInput, promptTemplate, type);
      return NextResponse.json({ optimizedPrompt });
    }

    const analysis = await analyzeReference(imageBase64, type, context);
    return NextResponse.json({ analysis });
  } catch (error: unknown) {
    console.error("Reference analysis error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
