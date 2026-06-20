import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  message: z.string().min(1).max(2000),
  context: z
    .object({
      currentLesson: z.string().optional(),
      currentScenario: z.string().optional(),
      recentTrades: z.array(z.any()).optional(),
      userLevel: z.string().optional(),
    })
    .optional(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .optional(),
});

const SYSTEM_PROMPT = `You are Professor, the AI trading tutor inside Trade School — a premium options trading education application.

Your role is to teach options trading, risk management, market structure, trading psychology, and disciplined execution.

Rules:
- You must NOT promise profits or specific returns
- You must NOT give personalized financial advice
- You must teach concepts, review simulated trades, explain mistakes, and help the user think probabilistically
- Use serious, clear, mature language — like a respected mentor, not a salesperson
- Keep responses focused and actionable — 3-5 paragraphs maximum
- If a student shares a trade or loss, ask them what they learned, not just what happened

Focus areas:
- Process over outcome
- Risk management and position sizing
- Probability and expected value thinking
- Emotional discipline and journaling
- Repeatable setups and system development
- Volatility and options pricing concepts

Never use hype. Never say trading is easy. Never encourage overleveraging.

The student's name is Heron.`;

const MOCK_RESPONSES = [
  "That is an important question, Heron. In options trading, the quality of your decision-making process matters far more than any individual outcome. A losing trade made with sound process and proper risk management is a better trade than a winning trade made through recklessness. The market will eventually separate disciplined traders from undisciplined ones — always through the wallet.\n\nWhen evaluating any trade, ask yourself: Did I follow my written plan? Did I define my maximum risk before entering? Did I have a clear thesis and exit strategy? If you can answer yes to those three questions and the trade still lost, that is an acceptable outcome. If any answer is no, the lesson is about process, not price.",
  "Implied volatility is one of the most misunderstood concepts for new options traders. Here is the core idea: IV represents the market's expectation of how much the stock will move, annualized. When IV is high, options are expensive because the market is pricing in significant uncertainty. When IV is low, options are cheap because the market expects relatively calm conditions.\n\nThe key practical insight: in high IV environments, buying options requires the stock to move more than usual just to overcome the premium you paid. In low IV environments, options buyers get more efficient leverage. This is why experienced traders often sell premium when IV is elevated and buy it when IV is depressed.",
  "Position sizing is the most underrated skill in trading. Most beginners focus on picking the right trade. Professionals focus on how much to risk on each trade.\n\nThe 1% rule — never risking more than 1% of your account on a single trade — seems conservative until you understand its purpose. It ensures that even a string of 10 consecutive losses reduces your account by only 10%. From a 10% loss, you can recover. From a 50% loss, you need a 100% gain just to break even. Preservation of capital is not timidity — it is the fundamental discipline that allows you to keep trading long enough to improve.",
  "The journal is one of the most powerful tools available to a trader, and one of the most consistently ignored. Here is why it matters: your memory is unreliable. You will remember your winners more vividly than your losers, and you will unconsciously edit the narrative of your losing trades to be less your fault. The journal is the antidote.\n\nEvery trade entry should include your thesis, your risk parameters, and your emotional state at entry. Every closed trade should include what actually happened, what you would do differently, and what the concrete lesson is. Over 50-100 documented trades, patterns emerge that are invisible in the moment but obvious in the data.",
  "Theta — time decay — is the most reliable force in options. Every day that passes, an option loses a portion of its extrinsic value, regardless of what the stock price does. This is why time is the enemy of option buyers and the ally of option sellers.\n\nFor buyers: this means you need the stock to move significantly in your direction within your timeframe. Holding an option and waiting for something to happen is expensive — you are paying rent every day. For sellers: this means collecting premium and waiting is a strategy with a built-in tailwind, but it requires careful risk management to avoid catastrophic losses on the trades that move against you.",
];

let mockIndex = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { message, context, history = [] } = parsed.data;

    // Build context string
    let contextStr = "";
    if (context?.currentLesson) contextStr += `\nStudent is currently studying: ${context.currentLesson}`;
    if (context?.currentScenario) contextStr += `\nStudent is working on scenario: ${context.currentScenario}`;
    if (context?.userLevel) contextStr += `\nStudent rank: ${context.userLevel}`;

    // If OpenAI API key is configured, use the real API
    if (process.env.OPENAI_API_KEY) {
      const { default: OpenAI } = await import("openai");
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const messages: { role: "user" | "assistant" | "system"; content: string }[] = [
        { role: "system", content: SYSTEM_PROMPT + contextStr },
        ...history.map((h) => ({
          role: h.role as "user" | "assistant",
          content: h.content,
        })),
        { role: "user", content: message },
      ];

      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 600,
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content ?? "I am unable to respond at this time. Please try again.";
      return NextResponse.json({ response: content });
    }

    // Fallback: mock response (so app works without OpenAI key)
    await new Promise((r) => setTimeout(r, 1200)); // simulate latency
    const response = MOCK_RESPONSES[mockIndex % MOCK_RESPONSES.length];
    mockIndex++;
    return NextResponse.json({ response });
  } catch (err) {
    console.error("Professor API error:", err);
    return NextResponse.json(
      { error: "Professor is unavailable. Please try again." },
      { status: 500 }
    );
  }
}
