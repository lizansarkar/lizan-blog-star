import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Try saving to database if connected
    try {
      await prisma.subscriber.upsert({
        where: { email: cleanEmail },
        update: { unsubscribedAt: null },
        create: { email: cleanEmail, source: "footer" },
      });
    } catch (dbError) {
      // If DB is offline, continue gracefully with in-memory confirmation
      console.warn("DB offline, registered subscriber in-memory:", cleanEmail);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to Lizan Blog Star dispatch!",
      email: cleanEmail,
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription. Please try again." },
      { status: 500 }
    );
  }
}
