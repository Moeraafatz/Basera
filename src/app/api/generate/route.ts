import { NextRequest, NextResponse } from "next/server";
import { generateAIPrompt, generateImagePrompt, generateVideoPrompt } from "@/lib/ai-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...params } = body;

    switch (type) {
      case "ai-prompt": {
        const result = await generateAIPrompt(params);
        return NextResponse.json({ result });
      }
      case "image-prompt": {
        const result = await generateImagePrompt(params);
        return NextResponse.json({ result });
      }
      case "video-prompt": {
        const result = await generateVideoPrompt(params);
        return NextResponse.json({ result });
      }
      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to generate prompt" },
      { status: 500 }
    );
  }
}
