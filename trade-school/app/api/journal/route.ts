import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  entry: z.object({
    id: z.string(),
    date: z.string(),
    type: z.enum(["trade", "daily", "lesson"]),
    symbol: z.string().optional(),
    strategy: z.string().optional(),
    pnl: z.number().optional(),
    grade: z.enum(["A", "B", "C", "D", "F"]).optional(),
    emotionalState: z.string(),
    ruleFollowed: z.boolean(),
    ruleViolation: z.string().optional(),
    mistakeMade: z.string().optional(),
    lessonLearned: z.string(),
    notes: z.string(),
    setup: z.string().optional(),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
    }

    // In a real app, save to Supabase here

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Journal error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  // In a real app, fetch from Supabase here
  return NextResponse.json({ entries: [] });
}
