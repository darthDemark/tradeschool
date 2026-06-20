// ============================================================
// TRADE SCHOOL — Core Types
// ============================================================

export type QuizQuestion = {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  courseId: string;
  title: string;
  summary: string;
  content: string; // markdown-like rich text
  keyTerms: { term: string; definition: string }[];
  quiz: QuizQuestion[];
  order: number;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  semester: number;
  lessons: Lesson[];
};

export type ScenarioChoice = {
  id: string;
  label: string;
  strategy: "Buy Call" | "Buy Put" | "Credit Spread" | "Iron Condor" | "No Trade" | "Debit Spread";
  maxRisk: number;
};

export type ScenarioOutcome = {
  marketMove: string;
  percentChange: number;
  bestChoiceId: string;
  explanation: string;
  teachingPoint: string;
};

export type Scenario = {
  id: string;
  title: string;
  symbol: string;
  setup: string;
  currentPrice: number;
  impliedVolatility: number;
  ivRank: number;
  daysToExpiration: number;
  marketContext: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  choices: ScenarioChoice[];
  outcome: ScenarioOutcome;
};

export type PaperTrade = {
  id: string;
  symbol: string;
  strategy: string;
  direction: "Bullish" | "Bearish" | "Neutral";
  contractType?: "Call" | "Put";
  strike?: number;
  expiration?: string;
  quantity: number;
  entryPrice: number;
  exitPrice?: number;
  maxRisk: number;
  thesis: string;
  stopRule: string;
  exitRule: string;
  status: "Open" | "Closed";
  openedAt: string;
  closedAt?: string;
  pnl?: number;
  pnlPercent?: number;
  grade?: "A" | "B" | "C" | "D" | "F";
  notes?: string;
  ruleViolation?: boolean;
};

export type EmotionalState =
  | "Calm"
  | "Confident"
  | "Fearful"
  | "Greedy"
  | "Impulsive"
  | "Patient"
  | "Frustrated"
  | "Neutral";

export type JournalEntry = {
  id: string;
  date: string;
  type: "trade" | "daily" | "lesson";
  tradeId?: string;
  symbol?: string;
  strategy?: string;
  pnl?: number;
  grade?: "A" | "B" | "C" | "D" | "F";
  emotionalState: EmotionalState;
  ruleFollowed: boolean;
  ruleViolation?: string;
  mistakeMade?: string;
  lessonLearned: string;
  notes: string;
  setup?: string;
};

export type ScenarioAttempt = {
  scenarioId: string;
  choiceId: string;
  wasCorrect: boolean;
  attemptedAt: string;
};

export type QuizAttempt = {
  lessonId: string;
  score: number;
  passed: boolean;
  answers: Record<string, string>;
  attemptedAt: string;
};

export type RiskViolation = {
  id: string;
  type: "max_risk" | "daily_loss" | "no_thesis" | "no_stop" | "no_exit" | "max_positions";
  description: string;
  acknowledgedAt: string;
};

export type TradingPlan = {
  marketsTraded: string;
  timeOfDay: string;
  setupsTraded: string;
  maxRiskPerTrade: string;
  dailyLossLimit: string;
  weeklyLossLimit: string;
  entryRules: string;
  exitRules: string;
  noTradeConditions: string;
};

export type TraderRank =
  | "Freshman Trader"
  | "Sophomore Trader"
  | "Junior Trader"
  | "Senior Trader"
  | "Market Operator"
  | "Professional Trader";

export type UserProfile = {
  name: string;
  goal: string;
  rank: TraderRank;
  joinedAt: string;
};

export type ProfessorMessage = {
  id: string;
  role: "professor" | "user";
  content: string;
  timestamp: string;
};
