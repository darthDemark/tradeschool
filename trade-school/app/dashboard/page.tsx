"use client";

import AppShell from "@/components/AppShell";
import StatCard from "@/components/StatCard";
import SectionHeader from "@/components/SectionHeader";
import ProgressBar from "@/components/ProgressBar";
import EquityChart from "@/components/EquityChart";
import Link from "next/link";
import { useTradeSchoolStore } from "@/lib/store";
import { COURSES, ALL_LESSONS } from "@/lib/curriculum";

const STARTING_BALANCE = 25000;

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
  const store = useTradeSchoolStore();
  const stats = store.getAccountStats();
  const rank = store.getRank();

  const completedCount = store.completedLessons.length;
  const totalLessons = ALL_LESSONS.length;
  const progressPct = Math.round((completedCount / totalLessons) * 100);
  const pnl = store.accountBalance - STARTING_BALANCE;

  // Today's training tasks
  const nextLesson = ALL_LESSONS.find((l) => !store.isLessonCompleted(l.id));
  const todayTasks = [
    nextLesson
      ? { type: "lesson", title: nextLesson.title, subtitle: `${COURSES.find((c) => c.id === nextLesson.courseId)?.title ?? "Lesson"}`, href: `/lessons/${nextLesson.id}` }
      : { type: "lesson", title: "All lessons complete!", subtitle: "Great work", href: "/courses" },
    { type: "drill", title: "Options Chain Reader", subtitle: "Market Lab · Exercise", href: "/lab" },
    { type: "scenario", title: "Run a Scenario", subtitle: "Simulator · Hidden outcome", href: "/simulator" },
    { type: "journal", title: "Daily Journal Entry", subtitle: "Journal · Reflection", href: "/journal" },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <AppShell>
      {/* Welcome block */}
      <div
        style={{
          marginBottom: "32px",
          padding: "32px 40px",
          background: "var(--text-main)",
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: 0, right: 0, width: "300px", height: "100%", background: "radial-gradient(ellipse at top right, rgba(181,138,60,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 6px" }}>{greeting}</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "#FDFBF7", margin: "0 0 10px", lineHeight: 1.2 }}>
            {greeting}, {store.profile.name}.
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(253,251,247,0.6)", margin: 0, lineHeight: 1.7, maxWidth: "480px" }}>
            Your objective is not to predict every move. Your objective is to execute your process.
          </p>
          <div style={{ marginTop: "20px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
            <div>
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(253,251,247,0.4)" }}>Current Rank</span>
              <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--accent)", marginTop: "2px" }}>{rank}</div>
            </div>
            <div>
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(253,251,247,0.4)" }}>Study Streak</span>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: "13px", color: "#FDFBF7", marginTop: "2px" }}>🔥 {store.riskViolations.length === 0 ? "0" : ""} violations · Keep the streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px", marginBottom: "32px" }}>
        <StatCard label="Curriculum Progress" value={`${progressPct}%`} sub={`${completedCount} / ${totalLessons} lessons`} accent />
        <StatCard label="Scenarios Completed" value={`${store.scenarioAttempts.length}`} sub="Hidden outcome drills" />
        <StatCard label="Paper Account" value={`$${store.accountBalance.toLocaleString()}`} sub={pnl >= 0 ? `+$${pnl.toFixed(0)} all-time` : `-$${Math.abs(pnl).toFixed(0)} all-time`} positive={pnl >= 0} negative={pnl < 0} />
        <StatCard label="Open Trades" value={`${store.openTrades.length}`} sub={`${store.closedTrades.length} closed`} />
        <StatCard label="Win Rate" value={stats.totalTrades > 0 ? `${stats.winRate}%` : "—"} sub={`${stats.totalTrades} closed trades`} positive={stats.winRate >= 50} />
        <StatCard label="Rule Violations" value={`${store.riskViolations.length}`} sub="Keep this low" positive={store.riskViolations.length === 0} negative={store.riskViolations.length > 3} />
      </div>

      {/* Main 2-col grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px", marginBottom: "32px" }}>
        {/* Course progress */}
        <div>
          <SectionHeader title="Course Progress" subtitle="Your curriculum at a glance" />
          <div className="card" style={{ padding: "8px" }}>
            {COURSES.filter((c) => c.lessons.length > 0).map((course) => {
              const completed = course.lessons.filter((l) => store.isLessonCompleted(l.id)).length;
              const total = course.lessons.length;
              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
              const hasStarted = completed > 0;
              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "10px", textDecoration: "none", marginBottom: "2px", background: hasStarted ? "rgba(181,138,60,0.04)" : "transparent" }}
                >
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: pct === 100 ? "var(--success)" : hasStarted ? "var(--accent)" : "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: hasStarted || pct === 100 ? "white" : "var(--text-soft)", flexShrink: 0 }}>
                    {pct === 100 ? "✓" : course.semester}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: "13px", color: "var(--text-main)", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{course.title}</div>
                    <ProgressBar percent={pct} showPercent={false} height={4} />
                  </div>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--text-soft)", flexShrink: 0 }}>{completed}/{total}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Today's training */}
        <div>
          <SectionHeader title="Today's Training" subtitle="Your daily assignments" />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {todayTasks.map((item) => (
              <Link
                key={item.type}
                href={item.href}
                style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 18px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", textDecoration: "none", transition: "border-color 0.15s ease" }}
              >
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: `${trainingColors[item.type]}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: trainingColors[item.type], flexShrink: 0 }}>
                  {trainingIcons[item.type]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--text-main)", marginBottom: "2px" }}>{item.title}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{item.subtitle}</div>
                </div>
                <span style={{ color: "var(--border)" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Equity chart */}
      <div>
        <SectionHeader
          title="Account Equity"
          subtitle="Paper trading performance"
          action={
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: pnl >= 0 ? "var(--success)" : "var(--danger)", fontWeight: 600 }}>
              {pnl >= 0 ? "+" : ""}${pnl.toFixed(0)} all-time
            </div>
          }
        />
        <div className="card" style={{ padding: "24px" }}>
          <EquityChart />
        </div>
      </div>
    </AppShell>
  );
}
