// ============================================================
// TRADE SCHOOL - Mock Data
// Replace with real API / Supabase calls in future phases
// ============================================================

export const traderProfile = {
  name: "Heron",
  rank: "Freshman Trader",
  rankLevel: 1,
  goal: "$10,000/month trading income",
  graduationRequirement: "6 consecutive profitable months following a written trading plan",
  studyStreak: 4,
  paperAccountBalance: 25000,
  totalTrades: 0,
  winRate: 0,
  riskRuleViolations: 0,
  joinedDate: "2024-09-01",
};

export const traderRanks = [
  { level: 1, title: "Freshman Trader", requirement: "Complete Semester 1" },
  { level: 2, title: "Sophomore Trader", requirement: "Complete Semesters 1–2" },
  { level: 3, title: "Junior Trader", requirement: "Complete Semesters 1–4" },
  { level: 4, title: "Senior Trader", requirement: "Complete all semesters + 50 scenarios" },
  { level: 5, title: "Market Operator", requirement: "3 consecutive profitable months on paper" },
  { level: 6, title: "Professional Trader", requirement: "6 consecutive profitable months with a written plan" },
];

export const curriculumProgress = {
  overallPercent: 18,
  scenariosCompleted: 0,
  lessonsCompleted: 4,
  totalLessons: 22,
  currentSemester: 1,
};

export const semesters = [
  { id: 1, title: "Market Foundations", status: "active" as const, lessonsTotal: 6, lessonsCompleted: 4 },
  { id: 2, title: "Options Basics", status: "locked" as const, lessonsTotal: 8, lessonsCompleted: 0 },
  { id: 3, title: "Greeks & Volatility", status: "locked" as const, lessonsTotal: 7, lessonsCompleted: 0 },
  { id: 4, title: "Risk Management", status: "locked" as const, lessonsTotal: 6, lessonsCompleted: 0 },
  { id: 5, title: "Trading Psychology", status: "locked" as const, lessonsTotal: 5, lessonsCompleted: 0 },
  { id: 6, title: "Professional Strategies", status: "locked" as const, lessonsTotal: 8, lessonsCompleted: 0 },
  { id: 7, title: "Market Operator", status: "locked" as const, lessonsTotal: 4, lessonsCompleted: 0 },
];

export const courses = [
  {
    id: "market-foundations",
    title: "Market Foundations",
    description: "Understand how financial markets work: exchanges, order flow, price discovery, market participants, and the language of the tape.",
    progress: 67,
    status: "active" as const,
    estimatedLessons: 6,
    completedLessons: 4,
    semester: 1,
    tags: ["Foundation", "Markets"],
  },
  {
    id: "options-fundamentals",
    title: "Options Fundamentals",
    description: "Learn what options are, why they exist, the difference between calls and puts, and how premium pricing works at a conceptual level.",
    progress: 0,
    status: "active" as const,
    estimatedLessons: 8,
    completedLessons: 0,
    semester: 2,
    tags: ["Options", "Core Concepts"],
  },
  {
    id: "greeks-volatility",
    title: "Greeks & Volatility",
    description: "Master Delta, Gamma, Theta, Vega, and Rho. Understand implied volatility, historical volatility, and how time decay works against buyers.",
    progress: 0,
    status: "locked" as const,
    estimatedLessons: 7,
    completedLessons: 0,
    semester: 3,
    tags: ["Greeks", "Volatility"],
  },
  {
    id: "reading-the-boards",
    title: "Reading the Boards",
    description: "Learn to read an options chain with precision. Understand open interest, bid-ask spreads, and what the market is pricing in.",
    progress: 0,
    status: "locked" as const,
    estimatedLessons: 5,
    completedLessons: 0,
    semester: 3,
    tags: ["Options Chain", "Analysis"],
  },
  {
    id: "risk-management",
    title: "Risk Management",
    description: "The foundation of professional trading. Position sizing, max loss rules, portfolio heat, and why preservation of capital is paramount.",
    progress: 0,
    status: "locked" as const,
    estimatedLessons: 6,
    completedLessons: 0,
    semester: 4,
    tags: ["Risk", "Capital"],
  },
  {
    id: "trading-psychology",
    title: "Trading Psychology",
    description: "Emotional discipline, avoiding revenge trades, FOMO management, loss aversion, and building the mental frameworks of elite traders.",
    progress: 0,
    status: "locked" as const,
    estimatedLessons: 5,
    completedLessons: 0,
    semester: 5,
    tags: ["Psychology", "Discipline"],
  },
  {
    id: "day-trading-systems",
    title: "Day Trading Systems",
    description: "Build a repeatable trading system: pre-market preparation, scanning criteria, entry signals, and exit management.",
    progress: 0,
    status: "locked" as const,
    estimatedLessons: 7,
    completedLessons: 0,
    semester: 6,
    tags: ["Systems", "Day Trading"],
  },
  {
    id: "professional-execution",
    title: "Professional Execution",
    description: "Combine everything: execution psychology, advanced spreads, portfolio management, and developing your written trading plan.",
    progress: 0,
    status: "locked" as const,
    estimatedLessons: 8,
    completedLessons: 0,
    semester: 6,
    tags: ["Execution", "Advanced"],
  },
];

export const lessons = [
  {
    id: "what-is-an-option",
    courseId: "options-fundamentals",
    title: "What Is a Call Option?",
    description: "The foundational contract. Understand your right, not obligation, to buy.",
    duration: "12 min",
    status: "active" as const,
    order: 1,
  },
  {
    id: "what-is-a-put",
    courseId: "options-fundamentals",
    title: "What Is a Put Option?",
    description: "The other side of the market. Profit when prices fall.",
    duration: "10 min",
    status: "locked" as const,
    order: 2,
  },
  {
    id: "intrinsic-extrinsic",
    courseId: "options-fundamentals",
    title: "Intrinsic vs. Extrinsic Value",
    description: "What you are really paying for when you buy an option.",
    duration: "14 min",
    status: "locked" as const,
    order: 3,
  },
  {
    id: "market-structure",
    courseId: "market-foundations",
    title: "How Markets Are Structured",
    description: "Exchanges, ECNs, market makers, and how prices are formed.",
    duration: "15 min",
    status: "completed" as const,
    order: 1,
  },
];

export const todayTraining = [
  { type: "lesson", title: "What Is an Option?", subtitle: "Semester 2 · Lesson 1", href: "/lessons/what-is-an-option" },
  { type: "drill", title: "Read the Options Chain", subtitle: "Market Lab · Exercise 1", href: "/lab" },
  { type: "scenario", title: "TSLA Earnings Week", subtitle: "Simulator · Scenario #001", href: "/simulator" },
  { type: "journal", title: "Pre-Market Mindset", subtitle: "Journal · Daily Entry", href: "/journal" },
];

export const scenarios = [
  {
    id: "001",
    ticker: "TSLA",
    title: "TSLA Earnings Week",
    currentPrice: 410,
    impliedVolatility: 78,
    daysToExpiration: 4,
    context: "Earnings after close. Analyst estimates diverge. IV near 52-week high.",
    difficulty: "Intermediate",
    status: "available" as const,
    choices: [
      { id: "buy-call", label: "Buy Call" },
      { id: "buy-put", label: "Buy Put" },
      { id: "sell-spread", label: "Sell Credit Spread" },
      { id: "iron-condor", label: "Iron Condor" },
      { id: "no-trade", label: "No Trade" },
    ],
    outcome: {
      headline: "TSLA gaps down 12%",
      description: "Your decision exposed you to volatility crush. The better trade was either no trade or a defined-risk spread.",
      lesson: "When implied volatility is elevated, option buyers overpay for premium. Even directionally correct traders can lose to IV collapse after an earnings event.",
      bestTrade: "Iron Condor or No Trade",
    },
  },
  {
    id: "002",
    ticker: "SPY",
    title: "Fed Announcement Day",
    currentPrice: 445,
    impliedVolatility: 22,
    daysToExpiration: 1,
    context: "FOMC meeting concludes at 2pm. Market pricing in 25bps cut. VIX elevated.",
    difficulty: "Advanced",
    status: "locked" as const,
    choices: [],
    outcome: {
      headline: "Fed surprises with hold",
      description: "Market sells off sharply on the news, then recovers.",
      lesson: "Same-day FOMC plays are extremely high-risk. Professionals often sit out or use very small defined-risk structures.",
      bestTrade: "No Trade or minimal size",
    },
  },
  {
    id: "003",
    ticker: "NVDA",
    title: "NVDA Breakout Setup",
    currentPrice: 620,
    impliedVolatility: 45,
    daysToExpiration: 21,
    context: "NVDA consolidating for 3 weeks above key support. Volume declining on pullbacks.",
    difficulty: "Beginner",
    status: "locked" as const,
    choices: [],
    outcome: {
      headline: "NVDA breaks out +18%",
      description: "The setup was textbook. Patience and discipline were rewarded.",
      lesson: "Consolidation with declining volume often precedes a directional move. Having a plan before the breakout is critical.",
      bestTrade: "Buy Call Debit Spread",
    },
  },
];

export const watchlist = [
  { ticker: "SPY", price: 445.82, change: +1.24, changePct: +0.28 },
  { ticker: "QQQ", price: 382.15, change: -0.67, changePct: -0.175 },
  { ticker: "TSLA", price: 410.30, change: +8.45, changePct: +2.1 },
  { ticker: "NVDA", price: 620.80, change: +12.30, changePct: +2.02 },
  { ticker: "AAPL", price: 189.40, change: -1.20, changePct: -0.63 },
];

export const portfolio = {
  totalValue: 25000,
  cashAvailable: 25000,
  dayPnL: 0,
  dayPnLPct: 0,
  openPositions: 0,
  totalPnL: 0,
  totalPnLPct: 0,
};

export const openPositions: {
  ticker: string;
  strategy: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPct: number;
  expiration: string;
  delta: number;
}[] = [];

export const journalEntries = [
  {
    id: "j001",
    date: "2024-09-15",
    ticker: "SPY",
    strategy: "Call Debit Spread",
    result: "+$238",
    resultValue: 238,
    grade: "A-",
    notes: "Good setup, exited slightly late. Should have taken 50% profit target.",
    emotionalState: "Disciplined",
    ruleViolation: false,
    lessonLearned: "Set alerts for profit targets before entering a trade.",
  },
  {
    id: "j002",
    date: "2024-09-12",
    ticker: "AAPL",
    strategy: "Iron Condor",
    result: "-$150",
    resultValue: -150,
    grade: "B",
    notes: "Setup was valid. Market moved against me but I followed the max loss rule and exited cleanly.",
    emotionalState: "Neutral",
    ruleViolation: false,
    lessonLearned: "Max loss rules exist precisely for these scenarios. Following them is a win.",
  },
  {
    id: "j003",
    date: "2024-09-10",
    ticker: "TSLA",
    strategy: "Buy Call",
    result: "-$320",
    resultValue: -320,
    grade: "C+",
    notes: "Chased into earnings. Volatility crush hit hard. Did not follow pre-trade checklist.",
    emotionalState: "Frustrated",
    ruleViolation: true,
    lessonLearned: "Never buy single-leg options into earnings. Defined risk or no trade.",
  },
];

export const journalStats = {
  winRate: 67,
  avgWinner: 238,
  avgLoser: 235,
  profitFactor: 1.01,
  maxDrawdown: 470,
  totalTrades: 3,
  grossProfit: 238,
  grossLoss: -470,
  netPnL: -232,
};

export const professorMessages = [
  {
    id: "pm001",
    role: "professor" as const,
    content: "Good evening, Heron. Your goal is not to be right on every trade. Your goal is to follow your process, manage risk, and improve your expectancy over a large sample of trades.",
    timestamp: "2024-09-15T18:00:00",
  },
  {
    id: "pm002",
    role: "professor" as const,
    content: "I reviewed your TSLA journal entry. The lesson here is not about the loss — it is about discipline. You recognized the rule violation yourself. That self-awareness is the foundation of growth.",
    timestamp: "2024-09-15T18:02:00",
  },
];

export const badges = [
  { id: "first-lesson", title: "First Lesson", description: "Completed your first lesson", earned: true, icon: "📖" },
  { id: "four-day-streak", title: "4-Day Streak", description: "Studied 4 days in a row", earned: true, icon: "🔥" },
  { id: "first-scenario", title: "Scenario Runner", description: "Completed your first scenario", earned: false, icon: "🎯" },
  { id: "first-trade", title: "Paper Trader", description: "Placed your first paper trade", earned: false, icon: "📊" },
  { id: "risk-manager", title: "Risk Manager", description: "30 days with zero rule violations", earned: false, icon: "🛡️" },
  { id: "journal-habit", title: "Journal Habit", description: "Journaled 10 consecutive trading days", earned: false, icon: "✍️" },
];

export const mockChartData = Array.from({ length: 60 }, (_, i) => {
  const base = 25000;
  const noise = Math.sin(i * 0.3) * 300 + Math.random() * 200 - 100;
  const trend = i * 15;
  return {
    index: i,
    value: base + noise + trend,
  };
});

export const optionChainMock = {
  ticker: "SPY",
  currentPrice: 445.82,
  expiration: "Oct 18, 2024",
  calls: [
    { strike: 435, bid: 12.40, ask: 12.60, last: 12.50, iv: "18.2%", delta: 0.78, oi: 4820 },
    { strike: 440, bid: 8.20, ask: 8.40, last: 8.30, iv: "17.8%", delta: 0.65, oi: 7340 },
    { strike: 445, bid: 4.80, ask: 5.00, last: 4.90, iv: "17.4%", delta: 0.51, oi: 12450 },
    { strike: 450, bid: 2.40, ask: 2.55, last: 2.47, iv: "17.1%", delta: 0.36, oi: 9870 },
    { strike: 455, bid: 0.95, ask: 1.05, last: 1.00, iv: "16.9%", delta: 0.20, oi: 6230 },
  ],
  puts: [
    { strike: 435, bid: 1.85, ask: 2.00, last: 1.92, iv: "19.4%", delta: -0.22, oi: 5640 },
    { strike: 440, bid: 3.40, ask: 3.55, last: 3.47, iv: "18.8%", delta: -0.35, oi: 8920 },
    { strike: 445, bid: 5.90, ask: 6.05, last: 5.97, iv: "18.2%", delta: -0.49, oi: 14320 },
    { strike: 450, bid: 9.80, ask: 10.00, last: 9.90, iv: "17.9%", delta: -0.64, oi: 7680 },
    { strike: 455, bid: 14.60, ask: 14.80, last: 14.70, iv: "17.5%", delta: -0.80, oi: 3240 },
  ],
};
