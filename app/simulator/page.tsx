"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import { useTradeSchoolStore } from "@/lib/store";
import { SCENARIOS } from "@/lib/scenarios";
import type { ScenarioAttempt } from "@/lib/types";

const difficultyColor: Record<string, string> = {
  Beginner: "var(--success)",
  Intermediate: "var(--warning)",
  Advanced: "var(--danger)",
};

function ScenarioCard({ scenario }: { scenario: (typeof SCENARIOS)[0] }) {
  const store = useTradeSchoolStore();
  const existing = store.getScenarioAttempt(scenario.id);

  const [selectedChoice, setSelectedChoice] = useState<string | null>(existing?.choiceId ?? null);
  const [confirmed, setConfirmed] = useState(!!existing);
  const [revealed, setRevealed] = useState(!!existing);
  const [result, setResult] = useState<{ wasCorrect: boolean; outcome: typeof scenario.outcome; chosenStrategy: string } | null>(
    existing
      ? {
          wasCorrect: existing.wasCorrect,
          outcome: scenario.outcome,
          chosenStrategy: scenario.choices.find((c) => c.id === existing.choiceId)?.strategy ?? existing.choiceId,
        }
      : null
  );
  const [loading, setLoading] = useState(false);

  const reveal = async () => {
    if (!selectedChoice || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/scenarios/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId: scenario.id, choiceId: selectedChoice }),
      });
      const data = await res.json();
      setResult(data);
      setRevealed(true);

      const attempt: ScenarioAttempt = {
        scenarioId: scenario.id,
        choiceId: selectedChoice,
        wasCorrect: data.wasCorrect,
        attemptedAt: new Date().toISOString(),
      };
      store.saveScenarioAttempt(attempt);
    } catch {
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSelectedChoice(null);
    setConfirmed(false);
    setRevealed(false);
    setResult(null);
  };

  const dc = difficultyColor[scenario.difficulty];

  return (
    <div className="card" style={{ padding: "32px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--text-soft)", display: "block", marginBottom: "6px" }}>
            {scenario.symbol} · Scenario
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 600, margin: 0, color: "var(--text-main)" }}>
            {scenario.title}
          </h2>
        </div>
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          <span style={{ fontSize: "10px", padding: "3px 9px", borderRadius: "999px", background: `${dc}18`, color: dc, fontWeight: 700 }}>{scenario.difficulty}</span>
          {existing && (
            <span className={existing.wasCorrect ? "badge badge-success" : "badge badge-danger"}>
              {existing.wasCorrect ? "Best Trade ✓" : "Suboptimal"}
            </span>
          )}
        </div>
      </div>

      {/* Market data */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "12px", marginBottom: "20px", background: "var(--surface-alt)", borderRadius: "12px", padding: "18px" }}>
        {[
          { label: "Current Price", value: `$${scenario.currentPrice}`, color: "var(--text-main)" },
          { label: "Implied Volatility", value: `${scenario.impliedVolatility}%`, color: "var(--warning)" },
          { label: "IV Rank", value: `${scenario.ivRank}th %ile`, color: scenario.ivRank > 70 ? "var(--danger)" : "var(--text-main)" },
          { label: "Days to Exp.", value: `${scenario.daysToExpiration}`, color: "var(--text-main)" },
        ].map((item) => (
          <div key={item.label}>
            <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)", marginBottom: "4px" }}>{item.label}</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "18px", fontWeight: 600, color: item.color }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Setup */}
      <div style={{ marginBottom: "20px", borderLeft: "3px solid var(--border)", paddingLeft: "16px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)", marginBottom: "8px" }}>Market Context</div>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 10px", lineHeight: 1.7 }}>{scenario.setup}</p>
        <p style={{ fontSize: "13px", color: "var(--text-soft)", margin: 0, fontStyle: "italic" }}>{scenario.marketContext}</p>
      </div>

      {/* Choices */}
      {!revealed && (
        <div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-main)", marginBottom: "12px" }}>Choose your trade:</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
            {scenario.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => !confirmed && setSelectedChoice(choice.id)}
                disabled={confirmed}
                style={{
                  padding: "10px 20px",
                  borderRadius: "999px",
                  border: `1.5px solid ${selectedChoice === choice.id ? "var(--accent)" : "var(--border)"}`,
                  background: selectedChoice === choice.id ? "rgba(181,138,60,0.1)" : "transparent",
                  color: selectedChoice === choice.id ? "var(--accent)" : "var(--text-main)",
                  fontSize: "13px",
                  fontWeight: selectedChoice === choice.id ? 600 : 400,
                  cursor: confirmed ? "default" : "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {choice.label}
              </button>
            ))}
          </div>

          {selectedChoice && !confirmed && (
            <div style={{ padding: "16px 20px", background: "rgba(181,138,60,0.06)", borderRadius: "12px", border: "1px solid rgba(181,138,60,0.2)", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", marginBottom: "4px" }}>
                Confirm: {scenario.choices.find((c) => c.id === selectedChoice)?.label}
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "0 0 12px" }}>
                Max Risk: ${scenario.choices.find((c) => c.id === selectedChoice)?.maxRisk ?? 0}. This cannot be changed after confirmation.
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setConfirmed(true)} className="btn-primary" style={{ fontSize: "13px", padding: "9px 20px" }}>
                  Confirm Trade
                </button>
                <button onClick={() => setSelectedChoice(null)} className="btn-secondary" style={{ fontSize: "13px", padding: "9px 20px" }}>
                  Change
                </button>
              </div>
            </div>
          )}

          {confirmed && !revealed && (
            <button onClick={reveal} disabled={loading} className="btn-primary" style={{ opacity: loading ? 0.6 : 1 }}>
              {loading ? "Processing..." : "Reveal Outcome →"}
            </button>
          )}
        </div>
      )}

      {/* Revealed outcome */}
      {revealed && result && (
        <div className="animate-fade-in">
          <div style={{ padding: "24px", borderRadius: "14px", background: "var(--surface-alt)", borderLeft: `4px solid ${result.wasCorrect ? "var(--success)" : "var(--accent)"}`, marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: result.wasCorrect ? "var(--success)" : "var(--accent)" }}>
                Outcome Revealed
              </div>
              <span className={result.wasCorrect ? "badge badge-success" : "badge badge-gold"}>
                {result.wasCorrect ? "Optimal Trade ✓" : "Learning Opportunity"}
              </span>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, margin: "0 0 10px" }}>
              {result.outcome.marketMove}
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 14px", lineHeight: 1.7 }}>
              {result.outcome.explanation}
            </p>
            <div style={{ background: "var(--surface)", borderRadius: "10px", padding: "14px 16px", marginBottom: "10px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)", marginBottom: "6px" }}>
                The Teaching Point
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-main)", margin: 0, lineHeight: 1.7 }}>
                {result.outcome.teachingPoint}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "var(--text-soft)" }}>Your choice:</span>
              <span className="badge badge-muted">{result.chosenStrategy}</span>
              <span style={{ fontSize: "12px", color: "var(--text-soft)" }}>Best:</span>
              <span className="badge badge-gold">{scenario.choices.find((c) => c.id === scenario.outcome.bestChoiceId)?.strategy ?? scenario.outcome.bestChoiceId}</span>
            </div>
          </div>
          <button onClick={reset} className="btn-secondary" style={{ fontSize: "13px" }}>
            Reset & Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default function SimulatorPage() {
  const store = useTradeSchoolStore();
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(SCENARIOS[0].id);
  const completed = store.scenarioAttempts.length;
  const correct = store.scenarioAttempts.filter((a) => a.wasCorrect).length;

  const activeScenario = SCENARIOS.find((s) => s.id === activeScenarioId) ?? SCENARIOS[0];

  return (
    <AppShell>
      <PageHeader title="Simulator" subtitle="Hidden-outcome scenario training. Decide before you know the result." />

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "32px" }}>
        {[
          { label: "Completed", value: `${completed}` },
          { label: "Optimal Trades", value: completed > 0 ? `${Math.round((correct / completed) * 100)}%` : "—" },
          { label: "Available", value: `${SCENARIOS.length}` },
          { label: "Your Score", value: correct > 0 ? `${correct}/${completed}` : "—" },
        ].map((s) => (
          <div key={s.label} className="card" style={{ padding: "18px 20px" }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "24px", fontWeight: 600, marginBottom: "2px" }}>{s.value}</div>
            <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "24px", alignItems: "start" }}>
        {/* Scenario list */}
        <div>
          <SectionHeader title="Scenarios" />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {SCENARIOS.map((s) => {
              const attempt = store.getScenarioAttempt(s.id);
              const isActive = s.id === activeScenarioId;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveScenarioId(s.id)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: `1px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
                    background: isActive ? "rgba(181,138,60,0.08)" : "var(--surface)",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ fontSize: "13px", fontWeight: isActive ? 600 : 400, color: isActive ? "var(--accent)" : "var(--text-main)", marginBottom: "2px" }}>{s.symbol}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: 1.3 }}>{s.title}</div>
                  {attempt && (
                    <div style={{ marginTop: "4px" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: attempt.wasCorrect ? "var(--success)" : "var(--warning)" }}>
                        {attempt.wasCorrect ? "✓ Optimal" : "○ Reviewed"}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active scenario */}
        <ScenarioCard key={activeScenario.id} scenario={activeScenario} />
      </div>
    </AppShell>
  );
}
