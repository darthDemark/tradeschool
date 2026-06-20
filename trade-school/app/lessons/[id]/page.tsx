"use client";

import { use, useState } from "react";
import AppShell from "@/components/AppShell";
import Link from "next/link";
import { useTradeSchoolStore } from "@/lib/store";
import { getLessonById, getCourseById } from "@/lib/curriculum";
import type { QuizAttempt } from "@/lib/types";

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const store = useTradeSchoolStore();
  const lesson = getLessonById(id);
  const course = lesson ? getCourseById(lesson.courseId) : null;

  const [activeSection, setActiveSection] = useState<"content" | "quiz" | "done">("content");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizResult, setQuizResult] = useState<{
    score: number;
    passed: boolean;
    correct: number;
    total: number;
    results: Record<string, { correct: boolean; correctAnswer: string; explanation: string }>;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const existingAttempt = lesson ? store.getQuizAttempt(lesson.id) : undefined;
  const isCompleted = lesson ? store.isLessonCompleted(lesson.id) : false;

  if (!lesson) {
    return (
      <AppShell>
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 600 }}>Lesson Not Found</h2>
          <Link href="/courses" className="btn-primary" style={{ marginTop: "20px", display: "inline-flex" }}>← Back to Curriculum</Link>
        </div>
      </AppShell>
    );
  }

  // Parse content sections (split by ## headings)
  const sections = lesson.content.split(/(?=^## )/m).filter(Boolean);

  const submitQuiz = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: lesson.id, answers: quizAnswers }),
      });
      const data = await res.json();
      setQuizResult(data);

      const attempt: QuizAttempt = {
        lessonId: lesson.id,
        score: data.score,
        passed: data.passed,
        answers: quizAnswers,
        attemptedAt: new Date().toISOString(),
      };
      store.saveQuizAttempt(attempt);
      if (data.passed) {
        store.markLessonComplete(lesson.id);
      }
      setActiveSection("done");
    } catch {
      alert("Failed to submit quiz. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const answeredAll = lesson.quiz.length > 0 && Object.keys(quizAnswers).length === lesson.quiz.length;

  return (
    <AppShell>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", fontSize: "13px", color: "var(--text-muted)", flexWrap: "wrap" }}>
        <Link href="/courses" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Curriculum</Link>
        <span>→</span>
        {course && <Link href={`/courses/${course.id}`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{course.title}</Link>}
        {course && <span>→</span>}
        <span style={{ color: "var(--text-main)", fontWeight: 500 }}>{lesson.title}</span>
        {isCompleted && <span className="badge badge-success" style={{ marginLeft: "6px" }}>Complete</span>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "28px", alignItems: "start" }}>
        {/* Main content */}
        <div>
          {/* Lesson header */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
              {course && <span className="badge badge-muted">{course.title}</span>}
              <span className="badge badge-gold">Lesson {lesson.order}</span>
              {existingAttempt && (
                <span className="badge" style={{ background: existingAttempt.passed ? "rgba(46,110,82,0.1)" : "rgba(197,139,42,0.1)", color: existingAttempt.passed ? "var(--success)" : "var(--warning)" }}>
                  Quiz: {existingAttempt.score}% {existingAttempt.passed ? "✓" : "— Retry"}
                </span>
              )}
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, margin: 0, lineHeight: 1.15, color: "var(--text-main)" }}>
              {lesson.title}
            </h1>
            <p style={{ fontSize: "15px", color: "var(--text-muted)", marginTop: "10px", lineHeight: 1.6 }}>{lesson.summary}</p>
          </div>

          {/* Tab nav */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "24px", background: "var(--surface-alt)", padding: "4px", borderRadius: "12px", width: "fit-content" }}>
            {[
              { key: "content", label: "Lesson Content" },
              { key: "quiz", label: `Quiz (${lesson.quiz.length} questions)` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSection(tab.key as "content" | "quiz")}
                style={{ padding: "7px 18px", borderRadius: "8px", border: "none", background: activeSection === tab.key || (activeSection === "done" && tab.key === "quiz") ? "var(--surface)" : "transparent", color: activeSection === tab.key || (activeSection === "done" && tab.key === "quiz") ? "var(--text-main)" : "var(--text-muted)", fontWeight: activeSection === tab.key ? 600 : 400, fontSize: "13px", cursor: "pointer", boxShadow: (activeSection === tab.key) ? "0 2px 8px rgba(31,31,31,0.08)" : "none", transition: "all 0.15s ease" }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content tab */}
          {activeSection === "content" && (
            <div>
              {sections.map((section, i) => {
                const lines = section.trim().split("\n");
                const heading = lines[0].replace(/^## /, "");
                const body = lines.slice(1).join("\n").trim();

                return (
                  <div key={i} className="card" style={{ padding: "28px 32px", marginBottom: "14px" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, margin: "0 0 16px", color: "var(--text-main)" }}>{heading}</h2>
                    <div style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.85 }}>
                      {body.split("\n").map((line, j) => {
                        if (line.startsWith("### ")) {
                          return <h3 key={j} style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, color: "var(--text-main)", margin: "20px 0 8px" }}>{line.replace("### ", "")}</h3>;
                        }
                        if (line.startsWith("> ")) {
                          return <blockquote key={j} style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "16px", margin: "16px 0", color: "var(--text-main)", fontStyle: "italic", fontSize: "14px" }}>{line.replace("> ", "")}</blockquote>;
                        }
                        if (line.startsWith("- ") || line.startsWith("* ")) {
                          return <div key={j} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}><span style={{ color: "var(--accent)", flexShrink: 0 }}>·</span><span>{line.replace(/^[-*] /, "")}</span></div>;
                        }
                        if (line.startsWith("**") && line.endsWith("**")) {
                          return <p key={j} style={{ margin: "12px 0 4px" }}><strong style={{ color: "var(--text-main)", fontWeight: 700 }}>{line.replace(/\*\*/g, "")}</strong></p>;
                        }
                        if (line.startsWith("|")) {
                          return null; // skip table lines for now
                        }
                        if (line.trim() === "") return <br key={j} />;
                        // Bold inline
                        const parts = line.split(/(\*\*[^*]+\*\*)/g);
                        return (
                          <p key={j} style={{ margin: "0 0 4px" }}>
                            {parts.map((p, k) =>
                              p.startsWith("**") ? <strong key={k} style={{ color: "var(--text-main)", fontWeight: 600 }}>{p.replace(/\*\*/g, "")}</strong> : p
                            )}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                <button onClick={() => setActiveSection("quiz")} className="btn-primary">
                  Take the Quiz →
                </button>
              </div>
            </div>
          )}

          {/* Quiz tab */}
          {(activeSection === "quiz" || activeSection === "done") && (
            <div>
              {activeSection === "done" && quizResult && (
                <div className="animate-fade-in" style={{ padding: "24px 28px", borderRadius: "16px", background: quizResult.passed ? "rgba(46,110,82,0.08)" : "rgba(197,139,42,0.08)", border: `1px solid ${quizResult.passed ? "rgba(46,110,82,0.25)" : "rgba(197,139,42,0.25)"}`, marginBottom: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ fontSize: "32px" }}>{quizResult.passed ? "✓" : "○"}</div>
                    <div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, margin: "0 0 4px", color: quizResult.passed ? "var(--success)" : "var(--warning)" }}>
                        {quizResult.passed ? "Lesson Complete!" : "Keep Studying"}
                      </h3>
                      <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0 }}>
                        Score: <strong style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{quizResult.score}%</strong>
                        {" "}({quizResult.correct} / {quizResult.total} correct)
                        {quizResult.passed ? " — Lesson marked complete." : " — Score 80%+ to complete this lesson."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {lesson.quiz.map((q, qi) => {
                  const result = quizResult?.results[q.id];
                  return (
                    <div key={q.id} className="card" style={{ padding: "24px 28px" }}>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-main)", margin: "0 0 16px", lineHeight: 1.5 }}>
                        {qi + 1}. {q.question}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {q.choices.map((choice) => {
                          const selected = quizAnswers[q.id] === choice;
                          const isCorrect = result?.correct && selected;
                          const isWrong = result && !result.correct && selected;
                          const isActuallyCorrect = result && choice === result.correctAnswer;
                          return (
                            <button
                              key={choice}
                              onClick={() => !quizResult && setQuizAnswers({ ...quizAnswers, [q.id]: choice })}
                              style={{
                                padding: "12px 16px",
                                borderRadius: "10px",
                                border: `1.5px solid ${isCorrect || isActuallyCorrect && quizResult ? "var(--success)" : isWrong ? "var(--danger)" : selected ? "var(--accent)" : "var(--border)"}`,
                                background: isCorrect || isActuallyCorrect && quizResult ? "rgba(46,110,82,0.08)" : isWrong ? "rgba(140,59,59,0.08)" : selected ? "rgba(181,138,60,0.08)" : "transparent",
                                textAlign: "left",
                                fontSize: "14px",
                                color: "var(--text-main)",
                                cursor: quizResult ? "default" : "pointer",
                                transition: "all 0.15s ease",
                                fontWeight: selected ? 500 : 400,
                              }}
                            >
                              {choice}
                              {isCorrect && " ✓"}
                              {isActuallyCorrect && quizResult && !selected && " ← correct"}
                            </button>
                          );
                        })}
                      </div>
                      {result && (
                        <div style={{ marginTop: "12px", padding: "12px 14px", background: "var(--surface-alt)", borderRadius: "10px" }}>
                          <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: result.correct ? "var(--success)" : "var(--danger)", marginBottom: "4px" }}>
                            {result.correct ? "Correct" : "Incorrect"}
                          </div>
                          <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!quizResult && (
                <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
                  <button onClick={() => setActiveSection("content")} className="btn-secondary">← Back to Lesson</button>
                  <button
                    onClick={submitQuiz}
                    className="btn-primary"
                    disabled={!answeredAll || submitting}
                    style={{ opacity: !answeredAll || submitting ? 0.5 : 1 }}
                  >
                    {submitting ? "Grading..." : "Submit Quiz"}
                  </button>
                </div>
              )}

              {quizResult && (
                <div style={{ marginTop: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {!quizResult.passed && (
                    <button onClick={() => { setQuizAnswers({}); setQuizResult(null); setActiveSection("quiz"); }} className="btn-secondary">
                      Retry Quiz
                    </button>
                  )}
                  {course && (
                    <Link href={`/courses/${course.id}`} className="btn-primary">
                      {quizResult.passed ? "Next Lesson →" : "Back to Course"}
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Key Terms */}
          <div className="card" style={{ padding: "22px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 600, margin: "0 0 14px" }}>Key Terms</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {lesson.keyTerms.map((item) => (
                <div key={item.term} style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "12px" }}>
                  <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--text-main)", marginBottom: "2px" }}>{item.term}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>{item.definition}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="card" style={{ padding: "22px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 600, margin: "0 0 12px" }}>Your Progress</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Lesson</span>
                <span className={isCompleted ? "badge badge-success" : "badge badge-muted"}>{isCompleted ? "Complete" : "In Progress"}</span>
              </div>
              {existingAttempt && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Best quiz score</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", fontWeight: 600, color: existingAttempt.passed ? "var(--success)" : "var(--warning)" }}>{existingAttempt.score}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Professor note */}
          <div style={{ padding: "18px 20px", background: "var(--text-main)", borderRadius: "16px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "8px" }}>Professor's Note</div>
            <p style={{ fontSize: "13px", color: "rgba(253,251,247,0.75)", margin: "0 0 12px", lineHeight: 1.6 }}>
              Have a question about this lesson? Ask Professor in the coaching session.
            </p>
            <Link href={`/coach?lesson=${encodeURIComponent(lesson.title)}`} style={{ fontSize: "12px", color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
              Ask Professor →
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
