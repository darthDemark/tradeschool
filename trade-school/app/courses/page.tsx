"use client";

import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";
import { useTradeSchoolStore } from "@/lib/store";
import { COURSES } from "@/lib/curriculum";

const levelColors = { Beginner: "var(--success)", Intermediate: "var(--warning)", Advanced: "var(--danger)" };

export default function CoursesPage() {
  const store = useTradeSchoolStore();

  const totalLessons = COURSES.reduce((a, c) => a + c.lessons.length, 0);
  const completedTotal = COURSES.reduce((a, c) => a + c.lessons.filter((l) => store.isLessonCompleted(l.id)).length, 0);
  const overallPct = totalLessons > 0 ? Math.round((completedTotal / totalLessons) * 100) : 0;

  return (
    <AppShell>
      <PageHeader title="Curriculum" subtitle="12 courses. The complete options trading education." />

      {/* Overall */}
      <div className="card" style={{ padding: "24px 28px", marginBottom: "36px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, margin: "0 0 2px" }}>Overall Progress</h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>{completedTotal} of {totalLessons} lessons completed</p>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "32px", fontWeight: 600, color: "var(--accent)" }}>{overallPct}%</div>
        </div>
        <ProgressBar percent={overallPct} showPercent={false} height={8} />
      </div>

      {/* Courses grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "18px" }}>
        {COURSES.map((course) => {
          const completed = course.lessons.filter((l) => store.isLessonCompleted(l.id)).length;
          const total = course.lessons.length;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
          const isLocked = total === 0;
          const hasStarted = completed > 0;
          const lc = levelColors[course.level];

          return (
            <div key={course.id} className="card" style={{ padding: "24px", opacity: isLocked ? 0.55 : 1, display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-soft)", marginBottom: "4px" }}>Semester {course.semester}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, margin: 0, color: "var(--text-main)", lineHeight: 1.3 }}>{course.title}</h3>
                </div>
                <span style={{ fontSize: "10px", padding: "3px 9px", borderRadius: "999px", background: `${lc}18`, color: lc, fontWeight: 700, letterSpacing: "0.05em", flexShrink: 0, marginLeft: "10px" }}>{course.level}</span>
              </div>

              <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>{course.description}</p>

              {!isLocked ? (
                <div>
                  <ProgressBar percent={pct} label={`${completed} / ${total} lessons`} />
                  <div style={{ marginTop: "12px" }}>
                    {total > 0 && (
                      <Link href={`/courses/${course.id}`} className="btn-primary" style={{ fontSize: "12px", padding: "8px 18px" }}>
                        {pct === 100 ? "Review" : hasStarted ? "Continue →" : "Begin →"}
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="badge badge-muted">Coming in Phase 2</span>
                  <span style={{ fontSize: "11px", color: "var(--text-soft)" }}>{total} lessons planned</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
