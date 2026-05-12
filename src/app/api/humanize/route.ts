import { NextRequest, NextResponse } from "next/server";
import { generateAIPrompt } from "@/lib/ai-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, text } = body;

    if (type === "humanize") {
      const result = await generateAIPrompt({
        input: text,
        level: "expert",
        category: "Creative Writing",
        model: "claude",
      });
      return NextResponse.json({ result });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to humanize text" }, { status: 500 });
  }
}
