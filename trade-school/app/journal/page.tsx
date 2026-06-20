"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import { useTradeSchoolStore } from "@/lib/store";
import type { JournalEntry, EmotionalState } from "@/lib/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const emotionalStates: EmotionalState[] = ["Calm", "Confident", "Fearful", "Greedy", "Impulsive", "Patient", "Frustrated", "Neutral"];
const grades = ["A", "B", "C", "D", "F"] as const;

const gradeColors: Record<string, string> = { A: "var(--success)", B: "var(--accent)", C: "var(--warning)", D: "var(--danger)", F: "var(--danger)" };

function GradeDistributionChart({ entries }: { entries: JournalEntry[] }) {
  const distribution = grades.map((g) => ({
    grade: g,
    count: entries.filter((e) => e.grade === g).length,
    color: gradeColors[g],
  }));
  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={distribution} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <XAxis dataKey="grade" tick={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fill: "var(--text-soft)" }} axisLine={false} tickLine={false} />
        <YAxis hide />
        <Tooltip
          content={({ active, payload }) =>
            active && payload?.length ? (
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "8px 12px", fontSize: "13px" }}>
                Grade {payload[0].payload.grade}: {payload[0].value} trades
              </div>
            ) : null
          }
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {distribution.map((d, i) => <Cell key={i} fill={d.color} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function JournalPage() {
  const store = useTradeSchoolStore();
  const stats = store.getAccountStats();
  const [activeTab, setActiveTab] = useState<"entries" | "metrics" | "new">("entries");
  const [form, setForm] = useState({
    type: "daily" as JournalEntry["type"],
    symbol: "",
    strategy: "",
    pnl: "",
    grade: "B" as (typeof grades)[number],
    emotionalState: "Neutral" as EmotionalState,
    ruleFollowed: true,
    ruleViolation: "",
    mistakeMade: "",
    lessonLearned: "",
    notes: "",
    setup: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0],
      type: form.type,
      symbol: form.symbol || undefined,
      strategy: form.strategy || undefined,
      pnl: form.pnl ? parseFloat(form.pnl) : undefined,
      grade: form.grade,
      emotionalState: form.emotionalState,
      ruleFollowed: form.ruleFollowed,
      ruleViolation: form.ruleViolation || undefined,
      mistakeMade: form.mistakeMade || undefined,
      lessonLearned: form.lessonLearned,
      notes: form.notes,
      setup: form.setup || undefined,
    };
    store.addJournalEntry(entry);
    setSubmitted(true);
  };

  const emotionCount = (state: EmotionalState) =>
    store.journalEntries.filter((e) => e.emotionalState === state).length;

  const tabs = [
    { key: "entries", label: "Entries" },
    { key: "metrics", label: "Metrics" },
    { key: "new", label: "+ New Entry" },
  ];

  return (
    <AppShell>
      <PageHeader title="Trading Journal" subtitle="Review every trade. Build self-awareness. Find the patterns." />

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "28px", background: "var(--surface-alt)", padding: "4px", borderRadius: "12px", width: "fit-content" }}>
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => { setActiveTab(tab.key as typeof activeTab); setSubmitted(false); }} style={{ padding: "8px 18px", borderRadius: "8px", border: "none", background: activeTab === tab.key ? "var(--surface)" : "transparent", color: activeTab === tab.key ? "var(--text-main)" : "var(--text-muted)", fontWeight: activeTab === tab.key ? 600 : 400, fontSize: "13px", cursor: "pointer", boxShadow: activeTab === tab.key ? "0 2px 8px rgba(31,31,31,0.08)" : "none", transition: "all 0.15s ease" }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Entries ── */}
      {activeTab === "entries" && (
        <div>
          {store.journalEntries.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 32px", background: "var(--surface)", border: "1px dashed var(--border)", borderRadius: "18px" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>◧</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, margin: "0 0 8px" }}>No Journal Entries Yet</h3>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 20px" }}>Start documenting your trades and daily reflections.</p>
              <button onClick={() => setActiveTab("new")} className="btn-primary">Write First Entry</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {store.journalEntries.map((entry) => {
                const hasPnl = entry.pnl !== undefined;
                return (
                  <div key={entry.id} className="card" style={{ padding: "22px 26px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                          {entry.symbol && <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: "15px" }}>{entry.symbol}</span>}
                          {entry.strategy && <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{entry.strategy}</span>}
                          {!entry.symbol && <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--text-main)" }}>{entry.type === "daily" ? "Daily Reflection" : "Lesson Note"}</span>}
                          <span className="badge badge-muted">{entry.emotionalState}</span>
                          {!entry.ruleFollowed && <span className="badge badge-danger">Violation</span>}
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--text-soft)" }}>{new Date(entry.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {hasPnl && (
                          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "18px", fontWeight: 600, color: (entry.pnl ?? 0) >= 0 ? "var(--success)" : "var(--danger)" }}>
                            {(entry.pnl ?? 0) >= 0 ? "+" : ""}${entry.pnl?.toFixed(0)}
                          </div>
                        )}
                        {entry.grade && (
                          <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: `${gradeColors[entry.grade]}18`, border: `2px solid ${gradeColors[entry.grade]}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", fontWeight: 700, color: gradeColors[entry.grade] }}>
                            {entry.grade}
                          </div>
                        )}
                      </div>
                    </div>
                    {entry.notes && <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 10px", lineHeight: 1.6 }}>{entry.notes}</p>}
                    {entry.lessonLearned && (
                      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "10px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-soft)" }}>Lesson: </span>
                        <span style={{ fontSize: "13px", color: "var(--text-main)" }}>{entry.lessonLearned}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Metrics ── */}
      {activeTab === "metrics" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px", marginBottom: "28px" }}>
            <StatCard label="Total Trades" value={`${stats.totalTrades}`} sub="paper trades closed" />
            <StatCard label="Win Rate" value={stats.totalTrades > 0 ? `${stats.winRate}%` : "—"} positive={stats.winRate >= 50} />
            <StatCard label="Avg Winner" value={stats.avgWinner > 0 ? `+$${stats.avgWinner.toFixed(0)}` : "—"} positive />
            <StatCard label="Avg Loser" value={stats.avgLoser > 0 ? `-$${stats.avgLoser.toFixed(0)}` : "—"} negative />
            <StatCard label="Profit Factor" value={stats.totalTrades > 0 ? stats.profitFactor.toFixed(2) : "—"} sub="Target: > 1.5" accent />
            <StatCard label="Max Drawdown" value={`$${stats.maxDrawdown.toFixed(0)}`} negative={stats.maxDrawdown > 0} />
            <StatCard label="Journal Entries" value={`${store.journalEntries.length}`} accent />
            <StatCard label="Rule Violations" value={`${store.riskViolations.length}`} negative={store.riskViolations.length > 0} positive={store.riskViolations.length === 0} />
          </div>

          {/* Grade distribution */}
          {store.journalEntries.filter((e) => e.grade).length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }}>
              <div>
                <SectionHeader title="Trade Grades" />
                <div className="card" style={{ padding: "24px" }}>
                  <GradeDistributionChart entries={store.journalEntries} />
                  <div style={{ marginTop: "14px", padding: "12px", background: "var(--surface-alt)", borderRadius: "8px" }}>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                      <strong style={{ color: "var(--text-main)" }}>Grading rubric:</strong> A = Followed plan, great result. B = Followed plan, result varied. C = Minor deviation. D/F = Rule violation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Emotional state */}
              <div>
                <SectionHeader title="Emotional States" />
                <div className="card" style={{ padding: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {emotionalStates.filter((s) => emotionCount(s) > 0).map((state) => {
                      const count = emotionCount(state);
                      const total = store.journalEntries.length;
                      const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                      return (
                        <div key={state} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ width: "90px", fontSize: "13px", color: "var(--text-main)" }}>{state}</div>
                          <div style={{ flex: 1, background: "var(--surface-alt)", borderRadius: "999px", height: "6px", overflow: "hidden" }}>
                            <div style={{ width: `${pct}%`, background: "var(--accent)", height: "100%", borderRadius: "999px" }} />
                          </div>
                          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--text-soft)", width: "20px", textAlign: "right" }}>{count}</div>
                        </div>
                      );
                    })}
                    {store.journalEntries.length === 0 && <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>No entries yet.</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Violation log */}
          {store.riskViolations.length > 0 && (
            <div>
              <SectionHeader title="Rule Violations" />
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {store.riskViolations.map((v) => (
                  <div key={v.id} style={{ padding: "14px 18px", background: "rgba(140,59,59,0.06)", border: "1px solid rgba(140,59,59,0.15)", borderRadius: "12px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--danger)", flexShrink: 0 }}>⚠</span>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", marginBottom: "2px" }}>{v.type.replace(/_/g, " ").toUpperCase()}</div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{v.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── New Entry ── */}
      {activeTab === "new" && (
        <div style={{ maxWidth: "680px" }}>
          {submitted ? (
            <div className="card" style={{ padding: "48px", textAlign: "center" }}>
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>✓</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 600, margin: "0 0 8px" }}>Entry Saved</h3>
              <p style={{ fontSize: "15px", color: "var(--text-muted)", marginBottom: "24px" }}>
                Reflection is how traders improve. The journal compounds over time.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button onClick={() => setSubmitted(false)} className="btn-secondary">Write Another</button>
                <button onClick={() => setActiveTab("entries")} className="btn-primary">View Entries</button>
              </div>
            </div>
          ) : (
            <div className="card" style={{ padding: "32px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 600, margin: "0 0 24px" }}>New Journal Entry</h2>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Type */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "8px" }}>Entry Type</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {(["trade", "daily", "lesson"] as const).map((t) => (
                      <button key={t} type="button" onClick={() => setForm({ ...form, type: t })} style={{ padding: "8px 16px", borderRadius: "999px", border: `1.5px solid ${form.type === t ? "var(--accent)" : "var(--border)"}`, background: form.type === t ? "rgba(181,138,60,0.1)" : "transparent", color: form.type === t ? "var(--accent)" : "var(--text-muted)", fontSize: "13px", fontWeight: form.type === t ? 600 : 400, cursor: "pointer", textTransform: "capitalize" }}>
                        {t === "trade" ? "Trade Review" : t === "daily" ? "Daily Reflection" : "Lesson Note"}
                      </button>
                    ))}
                  </div>
                </div>

                {form.type === "trade" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Symbol</label>
                      <input type="text" placeholder="SPY" value={form.symbol} onChange={(e) => setForm({ ...form, symbol: e.target.value.toUpperCase() })} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "15px", fontWeight: 600, outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Strategy</label>
                      <input type="text" placeholder="Iron Condor" value={form.strategy} onChange={(e) => setForm({ ...form, strategy: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontSize: "13px", color: "var(--text-main)", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>P/L Result</label>
                      <input type="number" placeholder="+238 or -150" value={form.pnl} onChange={(e) => setForm({ ...form, pnl: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "8px" }}>Grade</label>
                      <div style={{ display: "flex", gap: "6px" }}>
                        {grades.map((g) => (
                          <button key={g} type="button" onClick={() => setForm({ ...form, grade: g })} style={{ width: "36px", height: "36px", borderRadius: "50%", border: `2px solid ${form.grade === g ? gradeColors[g] : "var(--border)"}`, background: form.grade === g ? `${gradeColors[g]}18` : "transparent", color: form.grade === g ? gradeColors[g] : "var(--text-muted)", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>{g}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Emotional state */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "8px" }}>Emotional State</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                    {emotionalStates.map((s) => (
                      <button key={s} type="button" onClick={() => setForm({ ...form, emotionalState: s })} style={{ padding: "6px 14px", borderRadius: "999px", border: `1.5px solid ${form.emotionalState === s ? "var(--accent)" : "var(--border)"}`, background: form.emotionalState === s ? "rgba(181,138,60,0.1)" : "transparent", color: form.emotionalState === s ? "var(--accent)" : "var(--text-muted)", fontSize: "12px", fontWeight: form.emotionalState === s ? 600 : 400, cursor: "pointer" }}>{s}</button>
                    ))}
                  </div>
                </div>

                {/* Rule followed */}
                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                    <input type="checkbox" checked={!form.ruleFollowed} onChange={(e) => setForm({ ...form, ruleFollowed: !e.target.checked })} style={{ width: "16px", height: "16px" }} />
                    <span style={{ fontSize: "14px", color: "var(--text-main)", fontWeight: 500 }}>This entry involves a rule violation</span>
                  </label>
                  {!form.ruleFollowed && (
                    <input type="text" placeholder="Which rule?" value={form.ruleViolation} onChange={(e) => setForm({ ...form, ruleViolation: e.target.value })} style={{ marginTop: "8px", width: "100%", padding: "9px 12px", border: "1.5px solid var(--danger)", borderRadius: "10px", background: "var(--background)", fontSize: "13px", color: "var(--text-main)", outline: "none" }} />
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Notes</label>
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="What happened? What did you do well? What would you change?" rows={4} required style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontSize: "14px", color: "var(--text-main)", outline: "none", resize: "vertical", lineHeight: 1.6, fontFamily: "inherit" }} />
                </div>

                {/* Lesson learned */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Lesson Learned</label>
                  <input type="text" placeholder="One concrete insight that will improve your next trade." value={form.lessonLearned} onChange={(e) => setForm({ ...form, lessonLearned: e.target.value })} required style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontSize: "14px", color: "var(--text-main)", outline: "none" }} />
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px" }}>Save Journal Entry</button>
              </form>
            </div>
          )}
        </div>
      )}
    </AppShell>
  );
}
