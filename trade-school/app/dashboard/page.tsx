import AppShell from "@/components/AppShell";
import StatCard from "@/components/StatCard";
import MockChart from "@/components/MockChart";
import SectionHeader from "@/components/SectionHeader";
import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";
import {
  traderProfile,
  curriculumProgress,
  semesters,
  todayTraining,
} from "@/lib/mockData";

const trainingIcons: Record<string, string> = {
  lesson: "◎",
  drill: "⬡",
  scenario: "◉",
  journal: "◧",
};

const trainingColors: Record<string, string> = {
  lesson: "var(--accent)",
  drill: "var(--success)",
  scenario: "var(--warning)",
  journal: "var(--text-main)",
};

export default function DashboardPage() {
  const hour = 10; // mock: morning
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <AppShell>
      {/* Welcome block */}
      <div
        style={{
          marginBottom: "40px",
          padding: "36px 40px",
          background: "var(--text-main)",
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "300px",
            height: "100%",
            background: "radial-gradient(ellipse at top right, rgba(181,138,60,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 8px" }}>
            {greeting}
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "#FDFBF7", margin: "0 0 12px", lineHeight: 1.2 }}>
            {greeting}, {traderProfile.name}.
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(253,251,247,0.6)", margin: 0, lineHeight: 1.7, maxWidth: "520px" }}>
            Your objective is not to predict every move.
            Your objective is to execute your process.
          </p>
          <div style={{ marginTop: "24px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(253,251,247,0.4)" }}>Rank</span>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--accent)", marginTop: "2px" }}>{traderProfile.rank}</div>
            </div>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(253,251,247,0.4)" }}>Study Streak</span>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: "14px", color: "#FDFBF7", marginTop: "2px" }}>
                🔥 {traderProfile.studyStreak} days
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        <StatCard
          label="Curriculum Progress"
          value={`${curriculumProgress.overallPercent}%`}
          sub={`${curriculumProgress.lessonsCompleted} of ${curriculumProgress.totalLessons} lessons`}
          accent
        />
        <StatCard
          label="Scenarios Completed"
          value={`${curriculumProgress.scenariosCompleted}`}
          sub="Begin in the Simulator"
        />
        <StatCard
          label="Paper Account"
          value={`$${traderProfile.paperAccountBalance.toLocaleString()}`}
          sub="Starting balance"
        />
        <StatCard
          label="Risk Violations"
          value={`${traderProfile.riskRuleViolations}`}
          sub="Keep this at zero"
          positive={traderProfile.riskRuleViolations === 0}
        />
      </div>

      {/* Two-col layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", marginBottom: "40px" }}>

        {/* Current Path */}
        <div>
          <SectionHeader title="Current Path" subtitle="7 Semesters to Market Operator" />
          <div className="card" style={{ padding: "8px" }}>
            {semesters.map((sem, i) => {
              const isActive = sem.status === "active";
              const isLocked = sem.status === "locked";
              return (
                <div
                  key={sem.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    background: isActive ? "rgba(181,138,60,0.06)" : "transparent",
                    marginBottom: i < semesters.length - 1 ? "2px" : 0,
                    opacity: isLocked ? 0.5 : 1,
                  }}
                >
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: isActive ? "var(--accent)" : isLocked ? "var(--border)" : "var(--success)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: isActive ? "var(--surface)" : "var(--text-soft)",
                    flexShrink: 0,
                  }}>
                    {sem.id}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: isActive ? 600 : 400, fontSize: "14px", color: isActive ? "var(--text-main)" : "var(--text-muted)", marginBottom: "4px" }}>
                      {sem.title}
                    </div>
                    <ProgressBar percent={isActive ? (sem.lessonsCompleted / sem.lessonsTotal) * 100 : 0} showPercent={false} height={4} />
                  </div>
                  {isActive && <span className="badge badge-gold" style={{ fontSize: "10px", flexShrink: 0 }}>Active</span>}
                  {isLocked && <span style={{ fontSize: "14px" }}>🔒</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Training */}
        <div>
          <SectionHeader title="Today's Training" subtitle="Your daily assignments" />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {todayTraining.map((item) => (
              <Link
                key={item.type}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "16px 20px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  textDecoration: "none",
                  transition: "border-color 0.15s ease",
                }}
              >
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: `${trainingColors[item.type]}12`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  color: trainingColors[item.type],
                  flexShrink: 0,
                }}>
                  {trainingIcons[item.type]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--text-main)", marginBottom: "2px" }}>{item.title}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{item.subtitle}</div>
                </div>
                <span style={{ fontSize: "16px", color: "var(--border)" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Performance chart */}
      <div>
        <SectionHeader title="Paper Account Performance" subtitle="All-time history" />
        <MockChart height={220} showLabels />
      </div>
    </AppShell>
  );
}
