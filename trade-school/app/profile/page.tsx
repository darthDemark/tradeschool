import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";
import ProgressRing from "@/components/ProgressRing";
import BadgeComponent from "@/components/Badge";
import SectionHeader from "@/components/SectionHeader";
import { traderProfile, traderRanks, badges, curriculumProgress, journalStats } from "@/lib/mockData";

export default function ProfilePage() {
  return (
    <AppShell>
      <PageHeader title="Profile" subtitle="Your trader identity, progress, and performance record." />

      {/* Identity card */}
      <div
        className="card"
        style={{ padding: "36px 40px", marginBottom: "32px", display: "flex", gap: "32px", alignItems: "center", flexWrap: "wrap" }}
      >
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "var(--text-main)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Playfair Display', serif",
          fontSize: "32px",
          fontWeight: 700,
          color: "var(--accent)",
          flexShrink: 0,
        }}>
          {traderProfile.name[0]}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px", flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, margin: 0 }}>
              {traderProfile.name}
            </h2>
            <span className="badge badge-gold">{traderProfile.rank}</span>
          </div>
          <p style={{ fontSize: "15px", color: "var(--text-muted)", margin: "0 0 16px" }}>
            Goal: {traderProfile.goal}
          </p>
          <div style={{ padding: "14px 18px", background: "var(--surface-alt)", borderRadius: "12px", maxWidth: "480px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)", marginBottom: "4px" }}>
              Graduation Requirement
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-main)", margin: 0, lineHeight: 1.6 }}>
              {traderProfile.graduationRequirement}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "32px", fontWeight: 600, color: "var(--text-main)" }}>
            🔥 {traderProfile.studyStreak}
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>day streak</div>
        </div>
      </div>

      {/* Training stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px", marginBottom: "40px" }}>
        <StatCard label="Paper Account" value={`$${traderProfile.paperAccountBalance.toLocaleString()}`} />
        <StatCard label="Curriculum" value={`${curriculumProgress.overallPercent}%`} accent sub={`${curriculumProgress.lessonsCompleted} / ${curriculumProgress.totalLessons} lessons`} />
        <StatCard label="Win Rate" value={journalStats.winRate > 0 ? `${journalStats.winRate}%` : "—"} positive={journalStats.winRate > 0} sub="On paper trades" />
        <StatCard label="Rule Violations" value={`${traderProfile.riskRuleViolations}`} positive={traderProfile.riskRuleViolations === 0} sub="Last 30 days" />
      </div>

      {/* Two column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "40px" }}>

        {/* Rank progression */}
        <div>
          <SectionHeader title="Rank Progression" subtitle="Complete requirements to advance" />
          <div className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {traderRanks.map((rank, i) => {
                const isCurrent = rank.level === traderProfile.rankLevel;
                const isCompleted = rank.level < traderProfile.rankLevel;
                return (
                  <div
                    key={rank.level}
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                      padding: "14px 0",
                      borderBottom: i < traderRanks.length - 1 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <div style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: isCompleted ? "var(--success)" : isCurrent ? "var(--accent)" : "var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: isCompleted || isCurrent ? "var(--surface)" : "var(--text-soft)",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}>
                      {isCompleted ? "✓" : rank.level}
                    </div>
                    <div style={{ flex: 1, opacity: !isCurrent && !isCompleted ? 0.5 : 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                        <span style={{ fontWeight: 600, fontSize: "14px", color: isCurrent ? "var(--accent)" : "var(--text-main)" }}>
                          {rank.title}
                        </span>
                        {isCurrent && <span className="badge badge-gold" style={{ fontSize: "9px" }}>Current</span>}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.4 }}>{rank.requirement}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Risk profile + curriculum rings */}
        <div>
          <SectionHeader title="Curriculum Progress" subtitle="By semester" />
          <div className="card" style={{ padding: "28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", justifyItems: "center" }}>
              {[
                { label: "Sem 1", pct: 67 },
                { label: "Sem 2", pct: 0 },
                { label: "Sem 3", pct: 0 },
                { label: "Sem 4", pct: 0 },
                { label: "Sem 5", pct: 0 },
                { label: "Sem 6", pct: 0 },
                { label: "Sem 7", pct: 0 },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <ProgressRing percent={s.pct} size={60} strokeWidth={4} />
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", fontWeight: 600, color: "var(--accent)" }}>
                    {s.pct}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <SectionHeader title="Risk Profile" />
            <div className="card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Max Risk Per Trade</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", fontWeight: 600 }}>2% / $500</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-soft)" }}>Based on $25,000 paper account</div>
                </div>
                <div style={{ height: "1px", background: "var(--border)" }} />
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Max Daily Loss</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", fontWeight: 600 }}>$1,000</span>
                  </div>
                  <ProgressBar percent={0} showPercent={false} height={4} />
                </div>
                <div style={{ height: "1px", background: "var(--border)" }} />
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                    <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Risk Tolerance</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", fontWeight: 600, color: "var(--success)" }}>Conservative</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div>
        <SectionHeader
          title="Badges"
          subtitle={`${badges.filter((b) => b.earned).length} of ${badges.length} earned`}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "14px" }}>
          {badges.map((badge) => (
            <BadgeComponent key={badge.id} {...badge} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
