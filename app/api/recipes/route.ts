import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { savedRecipes } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const recipes = await db.query.savedRecipes.findMany({
      where: eq(savedRecipes.userId, userId),
      orderBy: [desc(savedRecipes.createdAt)],
    });

    return NextResponse.json({ success: true, recipes });
  } catch (error: any) {
    console.error("GET Recipes API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();
    const { title, ingredients, instructions, mood, image } = body;

    if (!title || !ingredients || !instructions) {
      return NextResponse.json(
        { error: "title, ingredients, and instructions are required" },
        { status: 400 }
      );
    }

    const newRecipe = await db
      .insert(savedRecipes)
      .values({
        userId,
        title,
        ingredients, // JSON string or text list of ingredients
        instructions, // JSON string or text list of steps
        mood: mood || null,
        image: image || null,
      })
      .returning();

    return NextResponse.json({ success: true, recipe: newRecipe[0] });
  } catch (error: any) {
    console.error("POST Recipes API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id parameter is required" }, { status: 400 });
    }

    await db
      .delete(savedRecipes)
      .where(and(eq(savedRecipes.id, id), eq(savedRecipes.userId, userId)));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE Recipes API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
