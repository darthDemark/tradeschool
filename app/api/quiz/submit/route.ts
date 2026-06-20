import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getLessonById } from "@/lib/curriculum";

const schema = z.object({
  lessonId: z.string(),
  answers: z.record(z.string(), z.string()),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { lessonId, answers } = parsed.data;
    const lesson = getLessonById(lessonId);

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    let correct = 0;
    const results: Record<string, { correct: boolean; correctAnswer: string; explanation: string }> = {};

    for (const question of lesson.quiz) {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) correct++;
      results[question.id] = {
        correct: isCorrect,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      };
    }

    const score = Math.round((correct / lesson.quiz.length) * 100);
    const passed = score >= 80;

    // In a real app, save to Supabase here using the server client
    // const supabase = await createServerSupabaseClient();
    // if (supabase) { await supabase.from('quiz_attempts').upsert(...) }

    return NextResponse.json({ score, passed, results, total: lesson.quiz.length, correct });
  } catch (err) {
    console.error("Quiz submit error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
