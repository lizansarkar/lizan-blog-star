import { NextRequest, NextResponse } from "next/server";
import { stories } from "../../../../../prisma/seed";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, answers } = body;

    if (!slug || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Invalid quiz submission payload" }, { status: 400 });
    }

    const story = stories.find(
      (s) => s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
    );

    if (!story?.quiz) {
      return NextResponse.json({ error: "Quiz not found for this story" }, { status: 404 });
    }

    const questions = story.quiz.questions;
    let correctCount = 0;
    const results = questions.map((q, idx) => {
      const selected = answers[idx];
      const isCorrect = selected === q.answer;
      if (isCorrect) correctCount++;
      return {
        prompt: q.prompt,
        selected,
        correctAnswer: q.answer,
        isCorrect,
        explanation: (q as any).explanation || "Verified against the core tenets of the story.",
      };
    });

    const total = questions.length;
    const percentage = Math.round((correctCount / total) * 100);

    return NextResponse.json({
      success: true,
      score: correctCount,
      total,
      percentage,
      passed: percentage >= 66,
      results,
    });
  } catch (error) {
    console.error("Quiz score calculation error:", error);
    return NextResponse.json({ error: "Server error scoring quiz" }, { status: 500 });
  }
}
