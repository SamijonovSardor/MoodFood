import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

const moodMap: Record<string, { emoji: string; label: string }> = {
  happy: { emoji: "😊", label: "Happy 😊" },
  relaxed: { emoji: "😌", label: "Relaxed 😌" },
  tired: { emoji: "😴", label: "Tired 😴" },
  sad: { emoji: "😔", label: "Sad 😔" },
  stressed: { emoji: "😤", label: "Stressed 😤" },
  excited: { emoji: "🤩", label: "Excited 🤩" },
};

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const modelName = process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash";

    if (!apiKey) {
      console.warn("OPENROUTER_API_KEY is not defined in environment variables. Falling back to local heuristic.");
      return NextResponse.json({
        success: false,
        error: "OPENROUTER_API_KEY is not configured in .env",
      });
    }

    const systemPrompt = `You are a mood classifier. Based on the user's input text (which might be in Uzbek, English, Russian or other languages), classify their mood into exactly one of these 6 categories and reply with ONLY the corresponding emoji and English capitalized word, nothing else. Do not add punctuation or extra text.

Categories:
- 😊 Happy
- 😌 Relaxed
- 😴 Tired
- 😔 Sad
- 😤 Stressed
- 🤩 Excited

Example Output:
😌 Relaxed`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "MoodFood",
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text.trim() },
        ],
        temperature: 0.2,
        max_tokens: 10,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error response:", errorText);
      return NextResponse.json({
        success: false,
        error: `OpenRouter API returned status ${response.status}`,
      });
    }

    const data = await response.json();
    const modelOutput = data?.choices?.[0]?.message?.content?.trim() || "";
    console.log("OpenRouter Model Output:", modelOutput);

    // Defensive parsing: find which of our standard mood keys is present in the output
    const cleanOutput = modelOutput.toLowerCase();
    let detectedKey = "";

    for (const key of Object.keys(moodMap)) {
      if (cleanOutput.includes(key)) {
        detectedKey = key;
        break;
      }
    }

    // Special mapping case: if "calm" is somehow returned, map it to relaxed
    if (!detectedKey && cleanOutput.includes("calm")) {
      detectedKey = "relaxed";
    }

    if (!detectedKey) {
      console.warn("Could not parse key from model output. Output was:", modelOutput);
      return NextResponse.json({
        success: false,
        error: `Could not determine mood from model output: "${modelOutput}"`,
      });
    }

    const { emoji, label } = moodMap[detectedKey];

    // Return the mapped result in the exact format: emoji + " " + word (e.g. "😌 Relaxed")
    const formattedResult = `${emoji} ${detectedKey.charAt(0).toUpperCase() + detectedKey.slice(1)}`;

    return NextResponse.json({
      success: true,
      mood: detectedKey,
      label: formattedResult,
    });
  } catch (error: any) {
    console.error("Error in analyze-mood route:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
