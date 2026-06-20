"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import JournalEntry from "@/components/JournalEntry";
import StatCard from "@/components/StatCard";
import SectionHeader from "@/components/SectionHeader";
import { journalEntries, journalStats } from "@/lib/mockData";

const emotionalStates = ["Disciplined", "Neutral", "Anxious", "Frustrated", "Confident", "FOMO", "Overconfident"];

export default function JournalPage() {
  const [newEntryOpen, setNewEntryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"entries" | "metrics" | "new">("entries");
  const [form, setForm] = useState({
    ticker: "",
    strategy: "",
    result: "",
    emotionalState: "Neutral",
    ruleViolation: false,
    notes: "",
    lessonLearned: "",
  });
  const [submitted, setSubmitted] = useState(false);

  return (
    <AppShell>
      <PageHeader
        title="Trading Journal"
        subtitle="Review every trade. Identify patterns. Build self-awareness."
        action={
          <button className="btn-primary" onClick={() => setActiveTab("new")}>
            + New Entry
          </button>
        }
      />

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "32px", background: "var(--surface-alt)", padding: "4px", borderRadius: "12px", width: "fit-content" }}>
        {[
          { key: "entries", label: "Journal Entries" },
          { key: "metrics", label: "Performance Metrics" },
          { key: "new", label: "New Entry" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            style={{
              padding: "8px 20px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === tab.key ? "var(--surface)" : "transparent",
              color: activeTab === tab.key ? "var(--text-main)" : "var(--text-muted)",
              fontWeight: activeTab === tab.key ? 600 : 400,
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: activeTab === tab.key ? "0 2px 8px rgba(31,31,31,0.08)" : "none",
              transition: "all 0.15s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Entries tab */}
      {activeTab === "entries" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {journalEntries.map((entry) => (
            <JournalEntry key={entry.id} {...entry} />
          ))}
        </div>
      )}

      {/* Metrics tab */}
      {activeTab === "metrics" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px", marginBottom: "32px" }}>
            <StatCard
              label="Win Rate"
              value={`${journalStats.winRate}%`}
              sub={`${journalStats.totalTrades} trades`}
              positive
            />
            <StatCard
              label="Avg Winner"
              value={`+$${journalStats.avgWinner}`}
              positive
            />
            <StatCard
              label="Avg Loser"
              value={`-$${journalStats.avgLoser}`}
              negative
            />
            <StatCard
              label="Profit Factor"
              value={journalStats.profitFactor.toFixed(2)}
              sub="Target: > 1.5"
              accent
            />
            <StatCard
              label="Max Drawdown"
              value={`$${journalStats.maxDrawdown}`}
              negative
            />
            <StatCard
              label="Net P/L"
              value={`${journalStats.netPnL >= 0 ? "+" : ""}$${journalStats.netPnL}`}
              negative={journalStats.netPnL < 0}
              positive={journalStats.netPnL >= 0}
            />
          </div>

          {/* Trade review breakdown */}
          <SectionHeader title="Trade Review" subtitle="Grade distribution" />
          <div className="card" style={{ padding: "28px" }}>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {[
                { grade: "A", count: 1, color: "var(--success)" },
                { grade: "B", count: 1, color: "var(--accent)" },
                { grade: "C", count: 1, color: "var(--warning)" },
                { grade: "D", count: 0, color: "var(--danger)" },
              ].map((g) => (
                <div key={g.grade} style={{ flex: 1, minWidth: "80px", textAlign: "center" }}>
                  <div style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: `${g.color}18`,
                    border: `2px solid ${g.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: g.color,
                    margin: "0 auto 8px",
                  }}>
                    {g.grade}
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "20px", fontWeight: 600 }}>{g.count}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>trades</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "24px", padding: "16px", background: "var(--surface-alt)", borderRadius: "10px" }}>
              <div style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                <strong style={{ color: "var(--text-main)" }}>Grading rubric:</strong> A = Followed plan, great outcome.
                B = Followed plan, outcome was random. C = Minor deviations, acceptable outcome. D = Rule violation.
              </div>
            </div>
          </div>

          {/* Emotional state breakdown */}
          <div style={{ marginTop: "32px" }}>
            <SectionHeader title="Emotional State Analysis" />
            <div className="card" style={{ padding: "28px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { state: "Disciplined", count: 1 },
                  { state: "Neutral", count: 1 },
                  { state: "Frustrated", count: 1 },
                ].map((s) => (
                  <div key={s.state} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: "120px", fontSize: "13px", color: "var(--text-main)", fontWeight: 500 }}>{s.state}</div>
                    <div style={{ flex: 1, background: "var(--surface-alt)", borderRadius: "999px", height: "8px", overflow: "hidden" }}>
                      <div style={{ width: `${(s.count / 3) * 100}%`, background: "var(--accent)", height: "100%", borderRadius: "999px" }} />
                    </div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: "var(--text-muted)", width: "20px" }}>{s.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New entry tab */}
      {activeTab === "new" && (
        <div className="card" style={{ padding: "36px", maxWidth: "680px" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>✓</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 600, margin: "0 0 8px" }}>
                Journal Entry Saved
              </h3>
              <p style={{ fontSize: "15px", color: "var(--text-muted)", marginBottom: "24px" }}>
                Reflection is the foundation of improvement.
              </p>
              <button
                onClick={() => { setSubmitted(false); setActiveTab("entries"); }}
                className="btn-primary"
              >
                View All Entries →
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 600, margin: 0 }}>
                New Journal Entry
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                    Ticker
                  </label>
                  <input
                    type="text"
                    placeholder="SPY"
                    value={form.ticker}
                    onChange={(e) => setForm({ ...form, ticker: e.target.value.toUpperCase() })}
                    required
                    style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "15px", fontWeight: 600, color: "var(--text-main)", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                    Strategy
                  </label>
                  <input
                    type="text"
                    placeholder="Iron Condor"
                    value={form.strategy}
                    onChange={(e) => setForm({ ...form, strategy: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontSize: "14px", color: "var(--text-main)", outline: "none" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  P/L Result
                </label>
                <input
                  type="text"
                  placeholder="+$238 or -$150"
                  value={form.result}
                  onChange={(e) => setForm({ ...form, result: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "15px", color: "var(--text-main)", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                  Emotional State
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {emotionalStates.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, emotionalState: s })}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "999px",
                        border: `1.5px solid ${form.emotionalState === s ? "var(--accent)" : "var(--border)"}`,
                        background: form.emotionalState === s ? "rgba(181,138,60,0.1)" : "transparent",
                        color: form.emotionalState === s ? "var(--accent)" : "var(--text-muted)",
                        fontSize: "13px",
                        fontWeight: form.emotionalState === s ? 600 : 400,
                        cursor: "pointer",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={form.ruleViolation}
                    onChange={(e) => setForm({ ...form, ruleViolation: e.target.checked })}
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span style={{ fontSize: "14px", color: "var(--text-main)", fontWeight: 500 }}>
                    This trade involved a rule violation
                  </span>
                </label>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  Trade Notes
                </label>
                <textarea
                  placeholder="What happened? What did you do well? What would you do differently?"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={4}
                  style={{ width: "100%", padding: "12px 14px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontSize: "14px", color: "var(--text-main)", outline: "none", resize: "vertical", lineHeight: 1.6, fontFamily: "inherit" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  Lesson Learned
                </label>
                <textarea
                  placeholder="In one sentence: what specific insight will improve your next trade?"
                  value={form.lessonLearned}
                  onChange={(e) => setForm({ ...form, lessonLearned: e.target.value })}
                  rows={2}
                  style={{ width: "100%", padding: "12px 14px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontSize: "14px", color: "var(--text-main)", outline: "none", resize: "vertical", lineHeight: 1.6, fontFamily: "inherit" }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "15px", padding: "14px" }}>
                Save Journal Entry
              </button>
            </form>
          )}
        </div>
      )}
    </AppShell>
  );
}
