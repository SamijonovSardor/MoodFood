import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

const defaultIngredients = [
  { id: "1", name: "Cheese", category: "dairy" },
  { id: "2", name: "Eggs", category: "meat" },
  { id: "3", name: "Tomatoes", category: "vegetables" },
  { id: "4", name: "Potatoes", category: "vegetables" },
  { id: "5", name: "Beef Meat", category: "meat" },
  { id: "6", name: "Milk", category: "dairy" },
];

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const dbUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    let ingredients = defaultIngredients;
    if (dbUser?.fridgeIngredients) {
      try {
        ingredients = JSON.parse(dbUser.fridgeIngredients);
      } catch (e) {
        console.error("Failed to parse fridgeIngredients JSON, using default:", e);
      }
    } else {
      // If user has no ingredients set, initialize with default list
      await db
        .update(users)
        .set({ fridgeIngredients: JSON.stringify(defaultIngredients) })
        .where(eq(users.id, userId));
    }

    return NextResponse.json({ success: true, ingredients });
  } catch (error: any) {
    console.error("GET Fridge API error:", error);
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
    const { ingredients } = body;

    if (!Array.isArray(ingredients)) {
      return NextResponse.json(
        { error: "ingredients array is required" },
        { status: 400 }
      );
    }

    await db
      .update(users)
      .set({ fridgeIngredients: JSON.stringify(ingredients) })
      .where(eq(users.id, userId));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("POST Fridge API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
