import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

interface Ingredient {
  id: string;
  name: string;
  category: "dairy" | "meat" | "vegetables";
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();
    const { image } = body; // base64 data URL

    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { error: "image (base64 Data URL) is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const visionModel =
      process.env.OPENROUTER_VISION_MODEL || "google/gemini-2.5-flash";

    let detectedIngredients: Array<{ name: string; category: "dairy" | "meat" | "vegetables" }> = [];

    if (apiKey) {
      try {
        const prompt = "Identify all the food items and raw ingredients visible in this refrigerator image. Return them as a JSON list of objects, where each object has: 'name' (in English capitalized, e.g. 'Cheese', 'Tomato', 'Eggs') and 'category' (must be one of: 'dairy', 'meat', 'vegetables'). Do not include any markdown block wrappers, comments, or explanation, just return the raw JSON array. Example Output: [{\"name\": \"Milk\", \"category\": \"dairy\"}]";

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "MoodFood",
          },
          body: JSON.stringify({
            model: visionModel,
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: prompt,
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: image, // base64 data url
                    },
                  },
                ],
              },
            ],
            temperature: 0.2,
            max_tokens: 500,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          let modelOutput = data?.choices?.[0]?.message?.content?.trim() || "";
          console.log("Vision Model Output:", modelOutput);

          // Strip markdown code blocks if present
          if (modelOutput.startsWith("```")) {
            modelOutput = modelOutput.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/\s*```$/, "");
          }

          try {
            detectedIngredients = JSON.parse(modelOutput);
          } catch (jsonErr) {
            console.error("Failed to parse JSON from vision model output:", jsonErr);
          }
        } else {
          const errText = await response.text();
          console.error("OpenRouter Vision API error:", errText);
        }
      } catch (err) {
        console.error("Error calling OpenRouter Vision API:", err);
      }
    } else {
      console.warn("OPENROUTER_API_KEY is not defined. Using mock fallback detection.");
      // Fallback simulation: random selection
      detectedIngredients = [
        { name: "Cheese", category: "dairy" },
        { name: "Eggs", category: "meat" },
        { name: "Tomatoes", category: "vegetables" },
      ];
    }

    // If parsing failed or array is empty, handle fallback or empty array
    if (!Array.isArray(detectedIngredients)) {
      detectedIngredients = [];
    }

    // Retrieve current user ingredients from database
    const dbUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    let currentIngredients: Ingredient[] = [];
    if (dbUser?.fridgeIngredients) {
      try {
        currentIngredients = JSON.parse(dbUser.fridgeIngredients);
      } catch (e) {
        console.error("Failed to parse existing fridgeIngredients JSON:", e);
      }
    }

    // Merge detected ingredients with current ingredients, avoiding duplicates (case-insensitive name match)
    const existingNames = new Set(
      currentIngredients.map((item) => item.name.toLowerCase().trim())
    );

    const newIngredients: Ingredient[] = [];
    for (const item of detectedIngredients) {
      if (item && item.name && item.category) {
        const cleanName = item.name.trim();
        const lowerName = cleanName.toLowerCase();
        if (!existingNames.has(lowerName)) {
          newIngredients.push({
            id: Math.random().toString(36).substring(2, 9), // unique id
            name: cleanName,
            category: item.category,
          });
          existingNames.add(lowerName);
        }
      }
    }

    const updatedIngredients = [...currentIngredients, ...newIngredients];

    // Save updated list in database
    await db
      .update(users)
      .set({
        fridgeIngredients: JSON.stringify(updatedIngredients),
        fridgeImage: image, // also save base64 image in user record
      })
      .where(eq(users.id, userId));

    return NextResponse.json({
      success: true,
      detected: newIngredients.map((i) => i.name),
      ingredients: updatedIngredients,
    });
  } catch (error: any) {
    console.error("Scan Fridge API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
