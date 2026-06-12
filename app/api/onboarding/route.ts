import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, moodLogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { preferredCuisines, fridgeImage, currentMood } = body;

    const userId = session.user.id;

    // Update user onboarding information
    await db
      .update(users)
      .set({
        isOnboarded: true,
        preferredCuisines: Array.isArray(preferredCuisines)
          ? preferredCuisines.join(",")
          : null,
        fridgeImage: fridgeImage || null,
        currentMood: currentMood || null,
      })
      .where(eq(users.id, userId));

    // If currentMood is provided during onboarding, insert a log in the mood logs
    if (currentMood) {
      await db.insert(moodLogs).values({
        userId,
        mood: currentMood,
        note: "Onboarding mood preset",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Onboarding API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
