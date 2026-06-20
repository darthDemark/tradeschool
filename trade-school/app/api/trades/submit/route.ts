import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  trade: z.object({
    id: z.string(),
    symbol: z.string(),
    strategy: z.string(),
    direction: z.enum(["Bullish", "Bearish", "Neutral"]),
    contractType: z.enum(["Call", "Put"]).optional(),
    strike: z.number().optional(),
    expiration: z.string().optional(),
    quantity: z.number().min(1),
    entryPrice: z.number().positive(),
    maxRisk: z.number().positive(),
    thesis: z.string(),
    stopRule: z.string(),
    exitRule: z.string(),
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
    // const supabase = await createServerSupabaseClient();

    return NextResponse.json({ success: true, tradeId: parsed.data.trade.id });
  } catch (err) {
    console.error("Trade submit error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
