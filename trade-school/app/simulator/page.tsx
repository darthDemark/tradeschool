"use client";

import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import ScenarioCard from "@/components/ScenarioCard";
import SectionHeader from "@/components/SectionHeader";
import { scenarios } from "@/lib/mockData";

export default function SimulatorPage() {
  return (
    <AppShell>
      <PageHeader
        title="Simulator"
        subtitle="Hidden-outcome scenario training. Make decisions without knowing the result in advance."
      />

      {/* Philosophy callout */}
      <div
        style={{
          padding: "24px 28px",
          background: "var(--text-main)",
          borderRadius: "16px",
          marginBottom: "40px",
          display: "flex",
          gap: "20px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: "28px" }}>◉</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "15px", color: "rgba(253,251,247,0.9)", marginBottom: "4px" }}>
            How Scenarios Work
          </div>
          <p style={{ fontSize: "14px", color: "rgba(253,251,247,0.55)", margin: 0, lineHeight: 1.6 }}>
            Each scenario presents real market conditions. You choose a trade without knowing the outcome.
            The result is then revealed with a debrief on what happened and what the better approach was.
            The goal is not to be right — it is to make a sound decision given the information available.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px", marginBottom: "40px" }}>
        {[
          { label: "Completed", value: "0", sub: "scenarios" },
          { label: "Available", value: "1", sub: "this session" },
          { label: "Coming Soon", value: "2", sub: "unlocking" },
          { label: "Win Rate", value: "—", sub: "start trading" },
        ].map((s) => (
          <div
            key={s.label}
            className="card"
            style={{ padding: "20px 22px" }}
          >
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "24px", fontWeight: 600, color: "var(--text-main)", marginBottom: "2px" }}>
              {s.value}
            </div>
            <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)" }}>
              {s.label}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Scenarios */}
      <SectionHeader title="Available Scenarios" subtitle="Complete each scenario to unlock the next" />
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {scenarios.map((scenario) => (
          <ScenarioCard key={scenario.id} {...scenario} />
        ))}
      </div>

      {/* Phase 2 note */}
      <div
        style={{
          marginTop: "40px",
          padding: "32px",
          background: "var(--surface)",
          border: "1px dashed var(--border)",
          borderRadius: "18px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-soft)", marginBottom: "10px" }}>
          Phase 2
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, margin: "0 0 8px", color: "var(--text-main)" }}>
          50+ Scenarios Coming
        </h3>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, maxWidth: "480px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          Earnings plays, Fed days, sector rotations, breakout setups, and more.
          Each with real historical data, hidden outcomes, and a full debrief.
        </p>
      </div>
    </AppShell>
  );
}
