"use client";

import { use } from "react";
import AppShell from "@/components/AppShell";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import { useTradeSchoolStore } from "@/lib/store";
import { getCourseById } from "@/lib/curriculum";

export default function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const store = useTradeSchoolStore();
  const course = getCourseById(courseId);

  if (!course) {
    return (
      <AppShell>
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 600 }}>Course Not Found</h2>
          <Link href="/courses" className="btn-primary" style={{ marginTop: "20px", display: "inline-flex" }}>← Back to Curriculum</Link>
        </div>
      </AppShell>
    );
  }

  const completed = course.lessons.filter((l) => store.isLessonCompleted(l.id)).length;
  const pct = course.lessons.length > 0 ? Math.round((completed / course.lessons.length) * 100) : 0;

  return (
    <AppShell>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", fontSize: "13px", color: "var(--text-muted)" }}>
        <Link href="/courses" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Curriculum</Link>
        <span>→</span>
        <span style={{ color: "var(--text-main)", fontWeight: 500 }}>{course.title}</span>
      </div>

      {/* Header */}
      <div className="card" style={{ padding: "32px 36px", marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px", flexWrap: "wrap" }}>
          <div>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-soft)" }}>Semester {course.semester} · {course.level}</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, margin: "8px 0 12px", color: "var(--text-main)" }}>{course.title}</h1>
            <p style={{ fontSize: "15px", color: "var(--text-muted)", margin: "0 0 20px", maxWidth: "560px", lineHeight: 1.6 }}>{course.description}</p>
            <ProgressBar percent={pct} label={`${completed} of ${course.lessons.length} lessons complete`} />
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "42px", fontWeight: 600, color: "var(--accent)" }}>{pct}%</div>
        </div>
      </div>

      {/* Lesson list */}
      {course.lessons.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {course.lessons.map((lesson, i) => {
            const isDone = store.isLessonCompleted(lesson.id);
            const attempt = store.getQuizAttempt(lesson.id);
            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 22px", background: "var(--surface)", border: `1px solid ${isDone ? "rgba(46,110,82,0.25)" : "var(--border)"}`, borderRadius: "14px", textDecoration: "none", transition: "border-color 0.15s ease" }}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: isDone ? "var(--success)" : "var(--surface-alt)", border: `2px solid ${isDone ? "var(--success)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: isDone ? "white" : "var(--text-soft)", flexShrink: 0 }}>
                  {isDone ? "✓" : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--text-main)", marginBottom: "3px" }}>{lesson.title}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{lesson.summary}</div>
                </div>
                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  {attempt && (
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: attempt.passed ? "var(--success)" : "var(--warning)", marginBottom: "2px" }}>
                      Quiz: {attempt.score}%
                    </div>
                  )}
                  {isDone
                    ? <span className="badge badge-success">Complete</span>
                    : <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 600 }}>Start →</span>
                  }
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "64px 32px", background: "var(--surface)", border: "1px dashed var(--border)", borderRadius: "18px" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>◎</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, margin: "0 0 8px" }}>Lessons Coming in Phase 2</h3>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0 }}>This course is being developed. Check back soon.</p>
        </div>
      )}
    </AppShell>
  );
}
