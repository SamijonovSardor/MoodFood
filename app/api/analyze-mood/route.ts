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

const searchQueryMap: Record<string, string> = {
  happy: "nutritious foods and ingredients to maintain happiness and energy health benefits",
  relaxed: "healthy relaxing foods and ingredients to maintain calm and focus medical health benefits",
  tired: "energy boosting healthy foods and ingredients to eat when tired fatigue medical benefits",
  sad: "best foods and ingredients to boost mood eat when sad depression medical research",
  stressed: "best healthy foods and ingredients to reduce stress and anxiety medical advice",
  excited: "healthy calming foods to balance high energy excited state medical advice",
};

// Image Generation Helper Function (supports Together AI, OpenAI, and other standard APIs)
async function generateImage(prompt: string): Promise<string | null> {
  const apiKey = process.env.IMAGE_GENERATION_API_KEY;
  const apiUrl = process.env.IMAGE_GENERATION_API_URL || "https://api.together.xyz/v1/images/generations";
  const modelName = process.env.IMAGE_GENERATION_MODEL || "black-forest-labs/FLUX.1-schnell";

  if (!apiKey) {
    console.warn("IMAGE_GENERATION_API_KEY is not defined. Skipping image generation.");
    return null;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        prompt: `${prompt}, professional food photography, appetizing, studio lighting, highly detailed, 512x512 resolution`,
        width: 512,
        height: 512,
        size: "512x512", // Compatibility for OpenAI DALL-E
        n: 1,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const imageUrl = data?.data?.[0]?.url;
      const b64 = data?.data?.[0]?.b64_json;
      if (imageUrl) return imageUrl;
      if (b64) return `data:image/png;base64,${b64}`;
    } else {
      const errText = await response.text();
      console.error("Image generation API error response:", errText);
    }
  } catch (err) {
    console.error("Error in generateImage function:", err);
  }
  return null;
}

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

    // Step 1: Detect mood using LLM
    let detectedKey = "";
    if (apiKey) {
      try {
        const systemPrompt = `You are a mood classifier. Based on the user's input text (which might be in Uzbek, English, Russian or other languages), classify their mood into exactly one of these 6 categories and reply with ONLY the corresponding English lowercase word (happy, relaxed, tired, sad, stressed, excited), nothing else. Do not add punctuation, emojis or extra text.

Categories:
- happy
- relaxed
- tired
- sad
- stressed
- excited`;

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
            temperature: 0.1,
            max_tokens: 5,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const classification = data?.choices?.[0]?.message?.content?.trim()?.toLowerCase() || "";
          for (const key of Object.keys(moodMap)) {
            if (classification.includes(key)) {
              detectedKey = key;
              break;
            }
          }
        }
      } catch (err) {
        console.error("Error classifying mood via LLM:", err);
      }
    }

    // Fallback: Local Keyword Heuristic if LLM classification fails or apiKey is missing
    if (!detectedKey) {
      const lowerText = text.toLowerCase();
      if (lowerText.includes("charch") || lowerText.includes("tired") || lowerText.includes("holsiz") || lowerText.includes("uyqu") || lowerText.includes("charchadim") || lowerText.includes("toliqdim")) {
        detectedKey = "tired";
      } else if (lowerText.includes("stress") || lowerText.includes("asab") || lowerText.includes("siqil") || lowerText.includes("g'azab") || lowerText.includes("angry") || lowerText.includes("asabiylash")) {
        detectedKey = "stressed";
      } else if (lowerText.includes("xafa") || lowerText.includes("yomon") || lowerText.includes("sad") || lowerText.includes("ma'yus") || lowerText.includes("yig'la") || lowerText.includes("g'amgin")) {
        detectedKey = "sad";
      } else if (lowerText.includes("tinch") || lowerText.includes("xotirjam") || lowerText.includes("relaxed") || lowerText.includes("calm") || lowerText.includes("dam ol") || lowerText.includes("hordiq")) {
        detectedKey = "relaxed";
      } else if (lowerText.includes("hayajon") || lowerText.includes("excited") || lowerText.includes("zo'r") || lowerText.includes("a'lo") || lowerText.includes("quvnoq") || lowerText.includes("xursandman")) {
        detectedKey = "excited";
      } else {
        detectedKey = "happy";
      }
    }

    const { emoji } = moodMap[detectedKey];
    const formattedResult = `${emoji} ${detectedKey.charAt(0).toUpperCase() + detectedKey.slice(1)}`;

    // Step 2: Google Custom Web Search
    let snippets = "No detailed search results found.";
    const searchKey = process.env.GOOGLE_SEARCH_API_KEY;
    const searchCx = process.env.GOOGLE_SEARCH_ENGINE_ID;

    if (searchKey && searchCx) {
      try {
        const query = searchQueryMap[detectedKey];
        const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${searchKey}&cx=${searchCx}&q=${encodeURIComponent(query)}`;
        const searchResponse = await fetch(searchUrl);

        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          if (searchData.items && searchData.items.length > 0) {
            snippets = searchData.items
              .slice(0, 3)
              .map((item: any) => `- ${item.title}: ${item.snippet}`)
              .join("\n");
          }
        } else {
          console.error("Google Custom Search API returned status:", searchResponse.status);
        }
      } catch (err) {
        console.error("Failed to perform Google Search:", err);
      }
    } else {
      console.warn("GOOGLE_SEARCH_API_KEY or GOOGLE_SEARCH_ENGINE_ID not configured. Fallback to LLM inner knowledge.");
      snippets = "Google Search keys are not configured. Synthesize the recipe based on general medical nutrition knowledge for this mood.";
    }

    // Step 3: LLM Synthesis to generate the custom recipe
    let recommendation = null;
    if (apiKey) {
      try {
        const synthesisPrompt = `You are a professional dietitian, nutritionist, and executive chef.
Based on the user's current mood and the provided medical search results detailing beneficial ingredients, recommend a healthy and delicious meal.

User input description of day: "${text.trim()}"
User detected mood: ${formattedResult}

Medical/Nutritional Search Results:
${snippets}

Please synthesize this information and suggest a suitable recipe. The response MUST be written in Uzbek language, using markdown for formatting, and MUST be returned strictly as a JSON object (no markdown block wrapper around the JSON, just the raw JSON object itself) with the following structure:
{
  "title": "Taom nomi (e.g. Ismaloqli va Yong'oqli Issiq Salat)",
  "benefits": "Tibbiy jihatdan nima uchun bu taom tanlanganligi va uning foydasi (tibbiy/nutritional sabablar, qidiruv natijalariga asoslangan holda)",
  "ingredients": "Zaruriy mahsulotlar ro'yxati (tibbiy jihatdan foydali ingredientlarni alohida ta'kidlang)",
  "recipe": "Tayyorlanish usuli (bosqichma-bosqich qisqa yo'riqnoma)",
  "image_prompt": "A detailed English descriptive prompt to generate a realistic image of this recommended food item (e.g. 'Appetizing plate of warm spinach salad with walnuts and red pepper flakes, close-up')"
}`;

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
              { role: "user", content: synthesisPrompt },
            ],
            temperature: 0.3,
            max_tokens: 800,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          let modelOutput = data?.choices?.[0]?.message?.content?.trim() || "";
          console.log("Synthesis Model Output:", modelOutput);

          // Strip markdown code block markers if present
          if (modelOutput.startsWith("```")) {
            modelOutput = modelOutput.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/\s*```$/, "");
          }

          try {
            recommendation = JSON.parse(modelOutput);
          } catch (jsonErr) {
            console.error("Failed to parse JSON from model output:", jsonErr);
          }
        }
      } catch (err) {
        console.error("Error calling OpenRouter for recipe synthesis:", err);
      }
    }

    // Fallback: If OpenRouter synthesis fails, generate a mock recipe recommendation
    if (!recommendation) {
      recommendation = {
        title: `Comforting ${detectedKey.charAt(0).toUpperCase() + detectedKey.slice(1)} Bowl`,
        benefits: `Bu taom tarkibidagi mahsulotlar sizning ${detectedKey} kayfiyatingizga ijobiy ta'sir ko'rsatish uchun tibbiy jihatdan foydali hisoblanadi.`,
        ingredients: `- Asosiy mahsulotlar\n- Ziravorlar\n- Ko'katlar`,
        recipe: `1. Masalliqlarni tozalab to'g'rang.\n2. Idishga solib pishiring yoki aralashtiring.\n3. Issiq holatida ko'katlar bilan bezab dasturxonga torting.`,
        image_prompt: `Comforting food bowl for ${detectedKey} mood`,
      };
    }

    // Step 4: Generate Image based on LLM prompt
    let generatedImage = "/images/food-placeholder.jpg"; // default placeholder
    if (recommendation.image_prompt) {
      const imgResult = await generateImage(recommendation.image_prompt);
      if (imgResult) {
        generatedImage = imgResult;
      }
    }
    recommendation.image = generatedImage;

    return NextResponse.json({
      success: true,
      mood: detectedKey,
      label: formattedResult,
      recommendation,
    });
  } catch (error: any) {
    console.error("Error in analyze-mood route:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
