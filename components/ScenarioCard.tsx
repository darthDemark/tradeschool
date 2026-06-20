interface ScenarioCardProps {
  id: string;
  ticker: string;
  title: string;
  currentPrice: number;
  impliedVolatility: number;
  daysToExpiration: number;
  context: string;
  difficulty: string;
  status: "available" | "locked" | "completed";
  choices: { id: string; label: string }[];
  outcome: {
    headline: string;
    description: string;
    lesson: string;
    bestTrade: string;
  };
}

import { useState } from "react";

export default function ScenarioCard({
  id,
  ticker,
  title,
  currentPrice,
  impliedVolatility,
  daysToExpiration,
  context,
  difficulty,
  status,
  choices,
  outcome,
}: ScenarioCardProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const isLocked = status === "locked";

  const difficultyColor = {
    Beginner: "var(--success)",
    Intermediate: "var(--warning)",
    Advanced: "var(--danger)",
  }[difficulty] || "var(--text-muted)";

  if (isLocked) {
    return (
      <div className="card" style={{ padding: "28px", opacity: 0.5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--text-soft)" }}>
            Scenario #{id}
          </span>
          <span className="badge badge-muted">Locked</span>
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, margin: "0 0 8px" }}>{title}</h3>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0 }}>Complete earlier scenarios to unlock.</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--text-soft)", display: "block", marginBottom: "4px" }}>
            Scenario #{id}
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 600, margin: 0 }}>{title}</h2>
        </div>
        <span
          className="badge"
          style={{ background: `${difficultyColor}18`, color: difficultyColor, flexShrink: 0 }}
        >
          {difficulty}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "20px",
          background: "var(--surface-alt)",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <div>
          <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)", marginBottom: "4px" }}>
            Current Price
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "20px", fontWeight: 500 }}>
            ${currentPrice}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)", marginBottom: "4px" }}>
            Implied Volatility
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "20px", fontWeight: 500, color: "var(--warning)" }}>
            {impliedVolatility}%
          </div>
        </div>
        <div>
          <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)", marginBottom: "4px" }}>
            Days to Expiration
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "20px", fontWeight: 500 }}>
            {daysToExpiration}
          </div>
        </div>
      </div>

      <p style={{ fontSize: "15px", color: "var(--text-muted)", marginBottom: "24px", lineHeight: 1.7, fontStyle: "italic", borderLeft: "3px solid var(--border)", paddingLeft: "16px" }}>
        {context}
      </p>

      {!revealed && (
        <div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-main)", marginBottom: "12px" }}>
            Choose your trade:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => setSelectedChoice(choice.id)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "999px",
                  border: `1.5px solid ${selectedChoice === choice.id ? "var(--accent)" : "var(--border)"}`,
                  background: selectedChoice === choice.id ? "rgba(181,138,60,0.1)" : "transparent",
                  color: selectedChoice === choice.id ? "var(--accent)" : "var(--text-main)",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {choice.label}
              </button>
            ))}
          </div>
          {selectedChoice && (
            <button
              onClick={() => setRevealed(true)}
              className="btn-primary"
              style={{ marginTop: "20px" }}
            >
              Reveal Outcome
            </button>
          )}
        </div>
      )}

      {revealed && (
        <div
          style={{
            background: "var(--surface-alt)",
            borderRadius: "14px",
            padding: "24px",
            borderLeft: "4px solid var(--accent)",
          }}
          className="animate-fade-in"
        >
          <div style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "8px" }}>
            Outcome Revealed
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, margin: "0 0 12px" }}>
            {outcome.headline}
          </h3>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "16px", lineHeight: 1.7 }}>{outcome.description}</p>
          <div style={{ background: "var(--surface)", borderRadius: "10px", padding: "16px", marginBottom: "12px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)", marginBottom: "6px" }}>
              The Lesson
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-main)", margin: 0, lineHeight: 1.7 }}>{outcome.lesson}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-soft)" }}>Best trade:</span>
            <span className="badge badge-success">{outcome.bestTrade}</span>
          </div>
          <button
            onClick={() => { setRevealed(false); setSelectedChoice(null); }}
            className="btn-secondary"
            style={{ marginTop: "16px", fontSize: "13px", padding: "8px 20px" }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
