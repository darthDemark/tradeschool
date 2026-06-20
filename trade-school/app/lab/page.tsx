import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import OptionChainMock from "@/components/OptionChainMock";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

const labModules = [
  {
    id: "options-chain",
    title: "Options Chain Reader",
    description: "Read a live-style options chain. Identify strike prices, open interest, bid-ask spreads, and what the market is pricing in.",
    icon: "◫",
    status: "available" as const,
    difficulty: "Beginner",
    exercises: 5,
  },
  {
    id: "greek-visualizer",
    title: "Greek Visualizer",
    description: "Watch Delta, Gamma, Theta, and Vega shift dynamically as you change stock price, time to expiration, and implied volatility.",
    icon: "Δ",
    status: "coming" as const,
    difficulty: "Intermediate",
    exercises: 8,
  },
  {
    id: "volatility-lab",
    title: "Volatility Lab",
    description: "Compare implied vs. historical volatility. Understand IV rank, IV percentile, and how to identify rich vs. cheap options.",
    icon: "⬡",
    status: "coming" as const,
    difficulty: "Intermediate",
    exercises: 6,
  },
  {
    id: "earnings-lab",
    title: "Earnings Reaction Lab",
    description: "Study historical earnings reactions. See how stocks move relative to the implied move, and identify patterns in the data.",
    icon: "◉",
    status: "coming" as const,
    difficulty: "Advanced",
    exercises: 10,
  },
  {
    id: "risk-calculator",
    title: "Risk Calculator",
    description: "Calculate position size, max loss, and risk-to-reward ratio for any options trade. Enforce your personal risk rules.",
    icon: "◈",
    status: "coming" as const,
    difficulty: "Beginner",
    exercises: 4,
  },
  {
    id: "chart-pattern-replay",
    title: "Chart Pattern Replay",
    description: "Study historical chart patterns frame-by-frame. Identify setups, test your pattern recognition, and review outcomes.",
    icon: "◇",
    status: "coming" as const,
    difficulty: "Advanced",
    exercises: 12,
  },
];

const difficultyColor: Record<string, string> = {
  Beginner: "var(--success)",
  Intermediate: "var(--warning)",
  Advanced: "var(--danger)",
};

export default function LabPage() {
  return (
    <AppShell>
      <PageHeader
        title="Market Lab"
        subtitle="Isolated training drills. Master the tools before using them in the market."
      />

      {/* Lab modules grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px", marginBottom: "48px" }}>
        {labModules.map((mod) => {
          const isAvailable = mod.status === "available";
          return (
            <div
              key={mod.id}
              className="card"
              style={{
                padding: "28px",
                opacity: isAvailable ? 1 : 0.55,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: isAvailable ? "rgba(181,138,60,0.1)" : "var(--surface-alt)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  color: isAvailable ? "var(--accent)" : "var(--text-soft)",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontWeight: 700,
                }}>
                  {mod.icon}
                </div>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: "10px",
                      padding: "3px 8px",
                      borderRadius: "999px",
                      background: `${difficultyColor[mod.difficulty]}18`,
                      color: difficultyColor[mod.difficulty],
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {mod.difficulty}
                  </span>
                  {!isAvailable && <span className="badge badge-muted" style={{ fontSize: "10px" }}>Soon</span>}
                </div>
              </div>

              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, margin: "0 0 8px", color: "var(--text-main)" }}>
                  {mod.title}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>{mod.description}</p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "4px" }}>
                <span style={{ fontSize: "12px", color: "var(--text-soft)" }}>{mod.exercises} exercises</span>
                {isAvailable ? (
                  <button className="btn-primary" style={{ fontSize: "12px", padding: "8px 18px" }}>
                    Begin →
                  </button>
                ) : (
                  <span style={{ fontSize: "12px", color: "var(--text-soft)" }}>Phase 2</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Options Chain drill */}
      <div>
        <SectionHeader
          title="Options Chain Reader"
          subtitle="SPY · Current Exercise · Read and interpret the chain below"
        />
        <div className="card" style={{ padding: "32px", overflowX: "auto" }}>
          <OptionChainMock />
          <div
            style={{
              marginTop: "28px",
              padding: "20px 24px",
              background: "var(--surface-alt)",
              borderRadius: "12px",
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)", marginBottom: "6px" }}>
                Exercise Prompt
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-main)", margin: 0, lineHeight: 1.6 }}>
                Identify the at-the-money strike. Find the call and put with the highest open interest.
                What does the skew in implied volatility between calls and puts tell you?
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <Link href="/coach" className="btn-secondary" style={{ fontSize: "13px" }}>
                Ask Professor →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
