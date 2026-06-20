"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  PaperTrade,
  JournalEntry,
  ScenarioAttempt,
  QuizAttempt,
  RiskViolation,
  TradingPlan,
  TraderRank,
  UserProfile,
  ProfessorMessage,
} from "./types";

// ─── Constants ────────────────────────────────────────────────────────────────
const STARTING_BALANCE = 25000;

const RANK_THRESHOLDS: { rank: TraderRank; lessonsRequired: number; scenariosRequired: number; journalRequired: number }[] = [
  { rank: "Freshman Trader",   lessonsRequired: 0,  scenariosRequired: 0,   journalRequired: 0 },
  { rank: "Sophomore Trader",  lessonsRequired: 5,  scenariosRequired: 5,   journalRequired: 0 },
  { rank: "Junior Trader",     lessonsRequired: 15, scenariosRequired: 25,  journalRequired: 10 },
  { rank: "Senior Trader",     lessonsRequired: 30, scenariosRequired: 100, journalRequired: 0 },
  { rank: "Market Operator",   lessonsRequired: 30, scenariosRequired: 100, journalRequired: 30 },
  { rank: "Professional Trader", lessonsRequired: 30, scenariosRequired: 100, journalRequired: 180 },
];

function computeRank(lessonsCompleted: number, scenariosCompleted: number, journalCount: number): TraderRank {
  for (let i = RANK_THRESHOLDS.length - 1; i >= 0; i--) {
    const t = RANK_THRESHOLDS[i];
    if (
      lessonsCompleted >= t.lessonsRequired &&
      scenariosCompleted >= t.scenariosRequired &&
      journalCount >= t.journalRequired
    ) {
      return t.rank;
    }
  }
  return "Freshman Trader";
}

// ─── Store interface ───────────────────────────────────────────────────────────
interface TradeSchoolState {
  // Profile
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;

  // Lessons
  completedLessons: string[]; // lesson IDs
  quizAttempts: QuizAttempt[];
  markLessonComplete: (lessonId: string) => void;
  saveQuizAttempt: (attempt: QuizAttempt) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  getQuizAttempt: (lessonId: string) => QuizAttempt | undefined;

  // Scenarios
  scenarioAttempts: ScenarioAttempt[];
  saveScenarioAttempt: (attempt: ScenarioAttempt) => void;
  getScenarioAttempt: (scenarioId: string) => ScenarioAttempt | undefined;

  // Paper Trading
  accountBalance: number;
  openTrades: PaperTrade[];
  closedTrades: PaperTrade[];
  dailyLoss: number;
  dailyLossDate: string;
  riskViolations: RiskViolation[];
  openTrade: (trade: PaperTrade) => { success: boolean; violation?: string };
  closeTrade: (tradeId: string, exitPrice: number, notes: string, grade: PaperTrade["grade"]) => void;
  acknowledgeViolation: (violation: RiskViolation) => void;

  // Journal
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;
  updateJournalEntry: (id: string, updates: Partial<JournalEntry>) => void;

  // Professor chat
  professorMessages: ProfessorMessage[];
  addProfessorMessage: (msg: ProfessorMessage) => void;

  // Trading plan
  tradingPlan: TradingPlan;
  updateTradingPlan: (plan: Partial<TradingPlan>) => void;

  // Computed
  getRank: () => TraderRank;
  getAccountStats: () => {
    totalTrades: number;
    winRate: number;
    avgWinner: number;
    avgLoser: number;
    profitFactor: number;
    maxDrawdown: number;
    netPnL: number;
  };
  isDailyLossLimitReached: () => boolean;
}

// ─── Store ────────────────────────────────────────────────────────────────────
export const useTradeSchoolStore = create<TradeSchoolState>()(
  persist(
    (set, get) => ({
      // ── Profile ──────────────────────────────────────────────────────────
      profile: {
        name: "Heron",
        goal: "$10,000/month trading income",
        rank: "Freshman Trader",
        joinedAt: new Date().toISOString(),
      },
      updateProfile: (updates) =>
        set((s) => ({ profile: { ...s.profile, ...updates } })),

      // ── Lessons ───────────────────────────────────────────────────────────
      completedLessons: [],
      quizAttempts: [],
      markLessonComplete: (lessonId) =>
        set((s) => ({
          completedLessons: s.completedLessons.includes(lessonId)
            ? s.completedLessons
            : [...s.completedLessons, lessonId],
        })),
      saveQuizAttempt: (attempt) =>
        set((s) => {
          const existing = s.quizAttempts.findIndex((a) => a.lessonId === attempt.lessonId);
          if (existing >= 0) {
            const updated = [...s.quizAttempts];
            updated[existing] = attempt;
            return { quizAttempts: updated };
          }
          return { quizAttempts: [...s.quizAttempts, attempt] };
        }),
      isLessonCompleted: (lessonId) => get().completedLessons.includes(lessonId),
      getQuizAttempt: (lessonId) => get().quizAttempts.find((a) => a.lessonId === lessonId),

      // ── Scenarios ─────────────────────────────────────────────────────────
      scenarioAttempts: [],
      saveScenarioAttempt: (attempt) =>
        set((s) => {
          const existing = s.scenarioAttempts.findIndex((a) => a.scenarioId === attempt.scenarioId);
          if (existing >= 0) {
            const updated = [...s.scenarioAttempts];
            updated[existing] = attempt;
            return { scenarioAttempts: updated };
          }
          return { scenarioAttempts: [...s.scenarioAttempts, attempt] };
        }),
      getScenarioAttempt: (scenarioId) =>
        get().scenarioAttempts.find((a) => a.scenarioId === scenarioId),

      // ── Paper Trading ─────────────────────────────────────────────────────
      accountBalance: STARTING_BALANCE,
      openTrades: [],
      closedTrades: [],
      dailyLoss: 0,
      dailyLossDate: new Date().toDateString(),
      riskViolations: [],

      openTrade: (trade) => {
        const s = get();
        const maxRiskAllowed = s.accountBalance * 0.01; // 1% rule
        const maxDailyLoss = s.accountBalance * 0.03;  // 3% rule

        // Reset daily loss if new day
        const today = new Date().toDateString();
        if (s.dailyLossDate !== today) {
          set({ dailyLoss: 0, dailyLossDate: today });
        }

        // Check max positions
        if (s.openTrades.length >= 3) {
          const v: RiskViolation = {
            id: crypto.randomUUID(),
            type: "max_positions",
            description: "You already have 3 open trades. Close a position before opening a new one.",
            acknowledgedAt: new Date().toISOString(),
          };
          set((s) => ({ riskViolations: [...s.riskViolations, v] }));
          return { success: false, violation: v.description };
        }

        // Check daily loss limit
        if (s.dailyLoss >= maxDailyLoss) {
          return { success: false, violation: `Daily loss limit reached ($${maxDailyLoss.toFixed(0)}). No new trades today.` };
        }

        // Check required fields (soft warnings)
        if (!trade.thesis.trim()) {
          const v: RiskViolation = { id: crypto.randomUUID(), type: "no_thesis", description: "Trade submitted without a thesis.", acknowledgedAt: new Date().toISOString() };
          set((s) => ({ riskViolations: [...s.riskViolations, v] }));
        }
        if (!trade.stopRule.trim()) {
          const v: RiskViolation = { id: crypto.randomUUID(), type: "no_stop", description: "Trade submitted without a stop rule.", acknowledgedAt: new Date().toISOString() };
          set((s) => ({ riskViolations: [...s.riskViolations, v] }));
        }
        if (!trade.exitRule.trim()) {
          const v: RiskViolation = { id: crypto.randomUUID(), type: "no_exit", description: "Trade submitted without an exit rule.", acknowledgedAt: new Date().toISOString() };
          set((s) => ({ riskViolations: [...s.riskViolations, v] }));
        }

        set((s) => ({
          openTrades: [...s.openTrades, trade],
        }));
        return { success: true };
      },

      closeTrade: (tradeId, exitPrice, notes, grade) =>
        set((s) => {
          const trade = s.openTrades.find((t) => t.id === tradeId);
          if (!trade) return s;

          let pnl = 0;
          if (trade.contractType === "Call" || trade.contractType === "Put") {
            pnl = (exitPrice - trade.entryPrice) * trade.quantity * 100;
          } else {
            pnl = (exitPrice - trade.entryPrice) * trade.quantity * 100;
          }

          const pnlPercent = (pnl / (trade.entryPrice * trade.quantity * 100)) * 100;
          const closed: PaperTrade = {
            ...trade,
            exitPrice,
            pnl,
            pnlPercent,
            grade,
            notes,
            status: "Closed",
            closedAt: new Date().toISOString(),
          };

          const newBalance = s.accountBalance + pnl;
          const newDailyLoss = pnl < 0 ? s.dailyLoss + Math.abs(pnl) : s.dailyLoss;

          return {
            openTrades: s.openTrades.filter((t) => t.id !== tradeId),
            closedTrades: [...s.closedTrades, closed],
            accountBalance: newBalance,
            dailyLoss: newDailyLoss,
          };
        }),

      acknowledgeViolation: (violation) =>
        set((s) => ({ riskViolations: [...s.riskViolations, violation] })),

      // ── Journal ───────────────────────────────────────────────────────────
      journalEntries: [],
      addJournalEntry: (entry) =>
        set((s) => ({ journalEntries: [entry, ...s.journalEntries] })),
      updateJournalEntry: (id, updates) =>
        set((s) => ({
          journalEntries: s.journalEntries.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        })),

      // ── Professor ─────────────────────────────────────────────────────────
      professorMessages: [
        {
          id: "init-1",
          role: "professor",
          content:
            "Welcome to Trade School, Heron. I am Professor — your AI trading mentor. Ask me anything about options, risk management, market structure, or your trades. I am here to help you build the discipline and process required to trade professionally.",
          timestamp: new Date().toISOString(),
        },
      ],
      addProfessorMessage: (msg) =>
        set((s) => ({ professorMessages: [...s.professorMessages, msg] })),

      // ── Trading Plan ─────────────────────────────────────────────────────
      tradingPlan: {
        marketsTraded: "",
        timeOfDay: "",
        setupsTraded: "",
        maxRiskPerTrade: "1% of account",
        dailyLossLimit: "3% of account",
        weeklyLossLimit: "5% of account",
        entryRules: "",
        exitRules: "",
        noTradeConditions: "",
      },
      updateTradingPlan: (plan) =>
        set((s) => ({ tradingPlan: { ...s.tradingPlan, ...plan } })),

      // ── Computed ─────────────────────────────────────────────────────────
      getRank: () => {
        const s = get();
        return computeRank(
          s.completedLessons.length,
          s.scenarioAttempts.length,
          s.journalEntries.length
        );
      },

      getAccountStats: () => {
        const s = get();
        const closed = s.closedTrades;
        const winners = closed.filter((t) => (t.pnl ?? 0) > 0);
        const losers = closed.filter((t) => (t.pnl ?? 0) < 0);
        const grossProfit = winners.reduce((a, t) => a + (t.pnl ?? 0), 0);
        const grossLoss = Math.abs(losers.reduce((a, t) => a + (t.pnl ?? 0), 0));

        // Max drawdown: largest peak-to-trough in running P&L
        let peak = STARTING_BALANCE;
        let maxDrawdown = 0;
        let running = STARTING_BALANCE;
        for (const t of closed) {
          running += t.pnl ?? 0;
          if (running > peak) peak = running;
          const dd = peak - running;
          if (dd > maxDrawdown) maxDrawdown = dd;
        }

        return {
          totalTrades: closed.length,
          winRate: closed.length > 0 ? Math.round((winners.length / closed.length) * 100) : 0,
          avgWinner: winners.length > 0 ? grossProfit / winners.length : 0,
          avgLoser: losers.length > 0 ? grossLoss / losers.length : 0,
          profitFactor: grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? 999 : 0,
          maxDrawdown,
          netPnL: s.accountBalance - STARTING_BALANCE,
        };
      },

      isDailyLossLimitReached: () => {
        const s = get();
        const today = new Date().toDateString();
        if (s.dailyLossDate !== today) return false;
        return s.dailyLoss >= s.accountBalance * 0.03;
      },
    }),
    {
      name: "trade-school-store",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") return localStorage;
        // SSR fallback — no-op storage
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
