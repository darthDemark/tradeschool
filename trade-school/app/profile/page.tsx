"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";
import BadgeComponent from "@/components/Badge";
import SectionHeader from "@/components/SectionHeader";
import { useTradeSchoolStore } from "@/lib/store";
import type { TradingPlan } from "@/lib/types";
import { ALL_LESSONS, COURSES } from "@/lib/curriculum";

const STARTING_BALANCE = 25000;

const traderRanks = [
  { level: 1, title: "Freshman Trader", requirements: "Default starting rank" },
  { level: 2, title: "Sophomore Trader", requirements: "5 lessons · 5 scenarios" },
  { level: 3, title: "Junior Trader", requirements: "15 lessons · 25 scenarios · 10 journal entries" },
  { level: 4, title: "Senior Trader", requirements: "30 lessons · 100 scenarios · 50 paper trades" },
  { level: 5, title: "Market Operator", requirements: "Positive P/L · Profit factor > 1.2 · Max drawdown < 10% · 30 journal entries" },
  { level: 6, title: "Professional Trader", requirements: "6 consecutive profitable months following a written trading plan" },
];

const rankLevelMap: Record<string, number> = {
  "Freshman Trader": 1, "Sophomore Trader": 2, "Junior Trader": 3,
  "Senior Trader": 4, "Market Operator": 5, "Professional Trader": 6,
};

const fieldConfig: { key: keyof TradingPlan; label: string; placeholder: string; multiline?: boolean }[] = [
  { key: "marketsTraded", label: "Markets I Trade", placeholder: "e.g. SPY, QQQ, AAPL, NVDA, individual tech stocks", multiline: false },
  { key: "timeOfDay", label: "Time of Day", placeholder: "e.g. 9:45–11:30 AM and 2:00–3:30 PM only", multiline: false },
  { key: "setupsTraded", label: "Setups I Trade", placeholder: "e.g. Opening range breakouts, earnings spreads, IV rank > 50 premium selling" },
  { key: "maxRiskPerTrade", label: "Max Risk Per Trade", placeholder: "1% of account", multiline: false },
  { key: "dailyLossLimit", label: "Daily Loss Limit", placeholder: "3% of account", multiline: false },
  { key: "weeklyLossLimit", label: "Weekly Loss Limit", placeholder: "5% of account", multiline: false },
  { key: "entryRules", label: "Entry Rules", placeholder: "Conditions that must be present before I take a trade..." },
  { key: "exitRules", label: "Exit Rules", placeholder: "How and when I exit positions — both winners and losers..." },
  { key: "noTradeConditions", label: "No-Trade Conditions", placeholder: "Conditions under which I will not trade regardless of setups..." },
];

export default function ProfilePage() {
  const store = useTradeSchoolStore();
  const stats = store.getAccountStats();
  const rank = store.getRank();
  const currentRankLevel = rankLevelMap[rank] ?? 1;
  const pnl = store.accountBalance - STARTING_BALANCE;
  const [editingPlan, setEditingPlan] = useState(false);
  const [planDraft, setPlanDraft] = useState(store.tradingPlan);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(store.profile.name);

  const totalLessons = ALL_LESSONS.length;
  const completedLessons = store.completedLessons.length;

  const badges = [
    { id: "first-lesson", title: "First Lesson", description: "Completed first lesson", earned: completedLessons >= 1, icon: "📖" },
    { id: "five-lessons", title: "5 Lessons", description: "Completed 5 lessons", earned: completedLessons >= 5, icon: "🎓" },
    { id: "all-beginner", title: "Foundations", description: "Completed all beginner lessons", earned: completedLessons >= 8, icon: "🏛" },
    { id: "first-scenario", title: "Scenario Runner", description: "Completed first scenario", earned: store.scenarioAttempts.length >= 1, icon: "🎯" },
    { id: "five-scenarios", title: "5 Scenarios", description: "Completed 5 scenarios", earned: store.scenarioAttempts.length >= 5, icon: "◉" },
    { id: "perfect-scenario", title: "Optimal Trade", description: "Made the optimal choice in a scenario", earned: store.scenarioAttempts.some((a) => a.wasCorrect), icon: "✓" },
    { id: "first-trade", title: "Paper Trader", description: "Placed first paper trade", earned: store.openTrades.length + store.closedTrades.length >= 1, icon: "📊" },
    { id: "journal-habit", title: "Journaling", description: "Wrote 5 journal entries", earned: store.journalEntries.length >= 5, icon: "✍️" },
    { id: "no-violations", title: "Disciplined", description: "No rule violations", earned: store.riskViolations.length === 0, icon: "🛡️" },
    { id: "trading-plan", title: "Has a Plan", description: "Wrote a trading plan", earned: !!(store.tradingPlan.entryRules && store.tradingPlan.exitRules), icon: "📋" },
  ];

  return (
    <AppShell>
      <PageHeader title="Profile" subtitle="Your trader identity, rank, and progress record." />

      {/* Identity card */}
      <div className="card" style={{ padding: "32px 36px", marginBottom: "28px", display: "flex", gap: "28px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "var(--text-main)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>
          {store.profile.name[0]}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px", flexWrap: "wrap" }}>
            {editingName ? (
              <div style={{ display: "flex", gap: "8px" }}>
                <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} style={{ padding: "6px 12px", border: "1.5px solid var(--accent)", borderRadius: "8px", fontSize: "18px", fontWeight: 600, outline: "none", background: "var(--background)", fontFamily: "'Playfair Display', serif" }} />
                <button onClick={() => { store.updateProfile({ name: nameInput }); setEditingName(false); }} className="btn-primary" style={{ fontSize: "12px", padding: "6px 14px" }}>Save</button>
                <button onClick={() => setEditingName(false)} className="btn-secondary" style={{ fontSize: "12px", padding: "6px 14px" }}>Cancel</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, margin: 0 }}>{store.profile.name}</h2>
                <button onClick={() => setEditingName(true)} style={{ fontSize: "11px", color: "var(--text-soft)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Edit</button>
              </>
            )}
            <span className="badge badge-gold">{rank}</span>
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 12px" }}>Goal: {store.profile.goal}</p>
          <div style={{ padding: "12px 16px", background: "var(--surface-alt)", borderRadius: "10px", maxWidth: "480px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)", marginBottom: "4px" }}>Graduation Requirement</div>
            <p style={{ fontSize: "13px", color: "var(--text-main)", margin: 0, lineHeight: 1.5 }}>6 consecutive profitable months following a written trading plan.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px", marginBottom: "32px" }}>
        <StatCard label="Account Balance" value={`$${store.accountBalance.toLocaleString()}`} />
        <StatCard label="All-Time P/L" value={`${pnl >= 0 ? "+" : ""}$${Math.abs(pnl).toFixed(0)}`} positive={pnl >= 0} negative={pnl < 0} />
        <StatCard label="Lessons Done" value={`${completedLessons}/${totalLessons}`} accent />
        <StatCard label="Scenarios Done" value={`${store.scenarioAttempts.length}`} accent />
        <StatCard label="Journal Entries" value={`${store.journalEntries.length}`} accent />
        <StatCard label="Win Rate" value={stats.totalTrades > 0 ? `${stats.winRate}%` : "—"} positive={stats.winRate >= 50} />
      </div>

      {/* Two-column */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", marginBottom: "32px" }}>
        {/* Rank progression */}
        <div>
          <SectionHeader title="Rank Progression" />
          <div className="card" style={{ padding: "20px" }}>
            {traderRanks.map((r, i) => {
              const isCurrent = r.level === currentRankLevel;
              const isCompleted = r.level < currentRankLevel;
              return (
                <div key={r.title} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "12px 0", borderBottom: i < traderRanks.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: isCompleted ? "var(--success)" : isCurrent ? "var(--accent)" : "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: isCompleted || isCurrent ? "white" : "var(--text-soft)", flexShrink: 0 }}>
                    {isCompleted ? "✓" : r.level}
                  </div>
                  <div style={{ flex: 1, opacity: !isCurrent && !isCompleted ? 0.5 : 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                      <span style={{ fontWeight: 600, fontSize: "14px", color: isCurrent ? "var(--accent)" : "var(--text-main)" }}>{r.title}</span>
                      {isCurrent && <span className="badge badge-gold" style={{ fontSize: "9px" }}>Current</span>}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.4 }}>{r.requirements}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Course progress rings */}
        <div>
          <SectionHeader title="Curriculum Progress" subtitle="By course" />
          <div className="card" style={{ padding: "20px" }}>
            {COURSES.filter((c) => c.lessons.length > 0).map((course) => {
              const completed = course.lessons.filter((l) => store.isLessonCompleted(l.id)).length;
              const total = course.lessons.length;
              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
              return (
                <div key={course.id} style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "13px", color: "var(--text-main)", fontWeight: 500 }}>{course.title}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--text-soft)" }}>{completed}/{total}</span>
                  </div>
                  <ProgressBar percent={pct} showPercent={false} height={5} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Risk rules */}
      <div style={{ marginBottom: "32px" }}>
        <SectionHeader title="Risk Rules" subtitle="Your hard limits — enforced in the Trading Desk" />
        <div className="card" style={{ padding: "24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {[
              { label: "Max Risk Per Trade", value: "1% of account", sub: `$${(store.accountBalance * 0.01).toFixed(0)}` },
              { label: "Max Daily Loss", value: "3% of account", sub: `$${(store.accountBalance * 0.03).toFixed(0)}` },
              { label: "Max Open Positions", value: "3 trades", sub: `${store.openTrades.length} currently open` },
              { label: "Required Before Entry", value: "Thesis + Stop + Exit", sub: "All three required" },
            ].map((r) => (
              <div key={r.label} style={{ padding: "16px", background: "var(--surface-alt)", borderRadius: "12px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)", marginBottom: "4px" }}>{r.label}</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "16px", fontWeight: 600, color: "var(--text-main)", marginBottom: "2px" }}>{r.value}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trading Plan */}
      <div style={{ marginBottom: "32px" }}>
        <SectionHeader
          title="My Trading Plan"
          subtitle="Your written rules govern every decision."
          action={
            !editingPlan ? (
              <button onClick={() => { setPlanDraft(store.tradingPlan); setEditingPlan(true); }} className="btn-secondary" style={{ fontSize: "13px", padding: "8px 18px" }}>
                {Object.values(store.tradingPlan).some(Boolean) ? "Edit Plan" : "Write Plan"}
              </button>
            ) : (
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => { store.updateTradingPlan(planDraft); setEditingPlan(false); }} className="btn-primary" style={{ fontSize: "13px", padding: "8px 18px" }}>Save Plan</button>
                <button onClick={() => setEditingPlan(false)} className="btn-secondary" style={{ fontSize: "13px", padding: "8px 18px" }}>Cancel</button>
              </div>
            )
          }
        />
        <div className="card" style={{ padding: "28px" }}>
          {!editingPlan ? (
            Object.values(store.tradingPlan).some(Boolean) ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                {fieldConfig.map(({ key, label }) => {
                  const val = store.tradingPlan[key];
                  if (!val) return null;
                  return (
                    <div key={key}>
                      <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)", marginBottom: "6px" }}>{label}</div>
                      <div style={{ fontSize: "14px", color: "var(--text-main)", lineHeight: 1.6 }}>{val}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>📋</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, margin: "0 0 8px" }}>No Trading Plan Written Yet</h3>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 20px", maxWidth: "380px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
                  A written trading plan is the difference between a trader and a gambler. Every professional has one.
                </p>
                <button onClick={() => setEditingPlan(true)} className="btn-primary">Write My Trading Plan</button>
              </div>
            )
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {fieldConfig.map(({ key, label, placeholder, multiline }) => (
                <div key={key}>
                  <label style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "6px" }}>{label}</label>
                  {multiline === false ? (
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={planDraft[key]}
                      onChange={(e) => setPlanDraft({ ...planDraft, [key]: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontSize: "14px", color: "var(--text-main)", outline: "none" }}
                    />
                  ) : (
                    <textarea
                      placeholder={placeholder}
                      value={planDraft[key]}
                      onChange={(e) => setPlanDraft({ ...planDraft, [key]: e.target.value })}
                      rows={3}
                      style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontSize: "14px", color: "var(--text-main)", outline: "none", resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Badges */}
      <div>
        <SectionHeader title="Achievements" subtitle={`${badges.filter((b) => b.earned).length} / ${badges.length} earned`} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px" }}>
          {badges.map((badge) => <BadgeComponent key={badge.id} {...badge} />)}
        </div>
      </div>
    </AppShell>
  );
}
