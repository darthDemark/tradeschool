import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getScenarioById } from "@/lib/scenarios";

const schema = z.object({
  scenarioId: z.string(),
  choiceId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { scenarioId, choiceId } = parsed.data;
    const scenario = getScenarioById(scenarioId);

    if (!scenario) {
      return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
    }

    const wasCorrect = scenario.outcome.bestChoiceId === choiceId;
    const chosenOption = scenario.choices.find((c) => c.id === choiceId);

    // In a real app, save to Supabase here
    // const supabase = await createServerSupabaseClient();

    return NextResponse.json({
      wasCorrect,
      outcome: scenario.outcome,
      chosenStrategy: chosenOption?.strategy ?? choiceId,
    });
  } catch (err) {
    console.error("Scenario submit error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
