"use client";

import AppShell from "@/components/AppShell";
import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";
import { useState } from "react";

const lessonContent = {
  title: "What Is a Call Option?",
  course: "Options Fundamentals",
  semester: 2,
  lesson: 1,
  duration: "12 min",
  sections: [
    {
      heading: "Definition",
      content:
        "A call option is a financial contract that gives the buyer the right — but not the obligation — to purchase 100 shares of a specific stock at a predetermined price (the strike price) before or on a specific date (the expiration date). The buyer pays a premium for this right. If they choose not to exercise it, they simply lose the premium paid.",
    },
    {
      heading: "A Simple Example",
      content:
        "Suppose Apple (AAPL) is trading at $180. You believe it will rise to $200 over the next 30 days. Instead of buying 100 shares for $18,000, you buy one call option with a $185 strike price expiring in 30 days for a $4.00 premium per share — a total cost of $400 (options control 100 shares). If AAPL rises to $200, your option is now worth at least $15 (the difference between current price and strike). Your $400 turned into $1,500 — a 275% return. If AAPL stays below $185, your maximum loss is the $400 premium.",
    },
    {
      heading: "Why Traders Use Calls",
      content:
        "Call options allow traders to gain leveraged exposure to upward price movement with defined, limited risk. A trader who is right about direction can multiply returns relative to simply buying stock. Calls are also used in combination strategies like spreads, to reduce cost and define risk more precisely. Institutions use calls to hedge short positions, acquire stock at favorable prices, or generate income through covered calls.",
    },
    {
      heading: "Common Beginner Mistake",
      content:
        "The most frequent error made by new options traders is buying calls into high implied volatility events — such as earnings announcements. Even when the stock moves in the expected direction, the collapse in implied volatility after the event (known as 'volatility crush') can cause the option to lose value. Buying a call right before earnings and watching the stock go up — yet still losing money — is a rite of passage for most traders, and a costly one.",
    },
  ],
  keyTerms: [
    { term: "Call Option", def: "A contract giving the right to buy 100 shares at the strike price before expiration." },
    { term: "Strike Price", def: "The predetermined price at which the option buyer can purchase the stock." },
    { term: "Expiration Date", def: "The date on which the option contract expires and becomes worthless if not exercised." },
    { term: "Premium", def: "The price paid to purchase the option contract." },
    { term: "In the Money (ITM)", def: "A call is ITM when the stock price is above the strike price." },
    { term: "Out of the Money (OTM)", def: "A call is OTM when the stock price is below the strike price." },
    { term: "Volatility Crush", def: "A sharp drop in implied volatility after a known event, reducing option premiums." },
  ],
  quizQuestions: [
    {
      q: "What does the buyer of a call option have the RIGHT to do?",
      options: ["Sell 100 shares at the strike price", "Buy 100 shares at the strike price", "Receive dividends", "Sell the option at any time"],
      correct: 1,
    },
    {
      q: "If you buy a $185 call on AAPL for a $4.00 premium and AAPL expires at $183, what is your outcome?",
      options: ["You profit $200", "You lose $400", "You break even", "You exercise the option"],
      correct: 1,
    },
  ],
};

export default function LessonPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const progress = ((activeSection + 1) / (lessonContent.sections.length + 1)) * 100;

  return (
    <AppShell>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px", fontSize: "13px", color: "var(--text-muted)" }}>
        <Link href="/courses" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Curriculum</Link>
        <span>→</span>
        <span style={{ color: "var(--text-muted)" }}>{lessonContent.course}</span>
        <span>→</span>
        <span style={{ color: "var(--text-main)", fontWeight: 500 }}>{lessonContent.title}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "32px", alignItems: "start" }}>

        {/* Main content */}
        <div>
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
              <span className="badge badge-muted">Semester {lessonContent.semester}</span>
              <span className="badge badge-gold">Lesson {lessonContent.lesson}</span>
              <span style={{ fontSize: "12px", color: "var(--text-soft)", display: "flex", alignItems: "center", gap: "4px" }}>
                ◷ {lessonContent.duration}
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "var(--text-main)", margin: "0 0 24px", lineHeight: 1.2 }}>
              {lessonContent.title}
            </h1>
            <ProgressBar percent={progress} label="Lesson Progress" />
          </div>

          {/* Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "32px" }}>
            {lessonContent.sections.map((section, i) => {
              const isActive = i <= activeSection;
              const isCurrent = i === activeSection;
              return (
                <div
                  key={i}
                  onClick={() => setActiveSection(i)}
                  style={{
                    padding: "24px 28px",
                    background: isCurrent ? "var(--surface)" : isActive ? "var(--surface)" : "var(--background)",
                    border: `1px solid ${isCurrent ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    opacity: !isActive && i > activeSection ? 0.5 : 1,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: isActive ? "12px" : 0 }}>
                    <div style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: isActive ? "var(--accent)" : "var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: isActive ? "var(--surface)" : "var(--text-soft)",
                      flexShrink: 0,
                    }}>
                      {isActive ? "✓" : i + 1}
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, margin: 0, color: "var(--text-main)" }}>
                      {section.heading}
                    </h3>
                  </div>
                  {isActive && (
                    <p style={{ fontSize: "15px", color: "var(--text-muted)", margin: "0 0 0 36px", lineHeight: 1.8 }}>
                      {section.content}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
            <button
              onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
              className="btn-secondary"
              disabled={activeSection === 0}
              style={{ opacity: activeSection === 0 ? 0.4 : 1 }}
            >
              ← Previous
            </button>
            {activeSection < lessonContent.sections.length - 1 ? (
              <button
                onClick={() => setActiveSection(activeSection + 1)}
                className="btn-primary"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={() => setActiveSection(lessonContent.sections.length)}
                className="btn-primary"
              >
                Take Quiz →
              </button>
            )}
          </div>

          {/* Quiz */}
          {activeSection >= lessonContent.sections.length && (
            <div className="card animate-fade-in" style={{ padding: "32px" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, marginBottom: "24px" }}>
                Knowledge Check
              </div>
              {lessonContent.quizQuestions.map((q, qi) => (
                <div key={qi} style={{ marginBottom: "28px" }}>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-main)", marginBottom: "14px", lineHeight: 1.5 }}>
                    {qi + 1}. {q.q}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {q.options.map((opt, oi) => {
                      const selected = quizAnswers[qi] === oi;
                      const correct = quizSubmitted && oi === q.correct;
                      const wrong = quizSubmitted && selected && oi !== q.correct;
                      return (
                        <button
                          key={oi}
                          onClick={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [qi]: oi })}
                          style={{
                            padding: "12px 16px",
                            borderRadius: "10px",
                            border: `1.5px solid ${correct ? "var(--success)" : wrong ? "var(--danger)" : selected ? "var(--accent)" : "var(--border)"}`,
                            background: correct ? "rgba(46,110,82,0.08)" : wrong ? "rgba(140,59,59,0.08)" : selected ? "rgba(181,138,60,0.08)" : "transparent",
                            textAlign: "left",
                            fontSize: "14px",
                            color: "var(--text-main)",
                            cursor: quizSubmitted ? "default" : "pointer",
                            transition: "all 0.15s ease",
                            fontWeight: selected ? 500 : 400,
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  className="btn-primary"
                  disabled={Object.keys(quizAnswers).length < lessonContent.quizQuestions.length}
                  style={{ opacity: Object.keys(quizAnswers).length < lessonContent.quizQuestions.length ? 0.5 : 1 }}
                >
                  Submit Answers
                </button>
              ) : (
                <div style={{ marginTop: "16px", padding: "20px", background: "var(--surface-alt)", borderRadius: "12px" }}>
                  <div style={{ fontWeight: 600, fontSize: "16px", color: "var(--success)", marginBottom: "8px" }}>
                    ✓ Review Complete
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 16px" }}>
                    Good work. Proceed to the next lesson when you are ready.
                  </p>
                  <Link href="/courses" className="btn-primary" style={{ fontSize: "13px" }}>
                    Back to Curriculum →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Phase 2 placeholder */}
          <div
            style={{
              marginTop: "32px",
              padding: "32px",
              background: "var(--surface)",
              border: "1px dashed var(--border)",
              borderRadius: "18px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-soft)", marginBottom: "10px" }}>
              Phase 2 Feature
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, margin: "0 0 8px", color: "var(--text-main)" }}>
              Interactive Simulation
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 12px", lineHeight: 1.7 }}>
              Adjust a stock price slider, select a strike price, set an expiration date,
              and watch how the option premium changes in real time using a live pricing model.
            </p>
            <span className="badge badge-muted">Coming in Phase 2</span>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Key Terms */}
          <div className="card" style={{ padding: "24px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, margin: "0 0 16px" }}>Key Terms</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {lessonContent.keyTerms.map((item) => (
                <div key={item.term} style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "12px" }}>
                  <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--text-main)", marginBottom: "2px" }}>{item.term}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>{item.def}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Lesson nav */}
          <div className="card" style={{ padding: "24px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 600, margin: "0 0 14px" }}>In This Lesson</h3>
            {lessonContent.sections.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSection(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: activeSection === i ? "rgba(181,138,60,0.08)" : "transparent",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  marginBottom: "2px",
                }}
              >
                <span style={{ fontSize: "12px", fontFamily: "'IBM Plex Mono', monospace", color: "var(--text-soft)", width: "16px" }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: "13px", color: activeSection === i ? "var(--accent)" : "var(--text-muted)", fontWeight: activeSection === i ? 600 : 400 }}>
                  {s.heading}
                </span>
              </button>
            ))}
          </div>

          {/* Professor note */}
          <div style={{ padding: "20px", background: "var(--text-main)", borderRadius: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "8px" }}>
              Professor's Note
            </div>
            <p style={{ fontSize: "13px", color: "rgba(253,251,247,0.75)", margin: 0, lineHeight: 1.7 }}>
              The most valuable thing you will learn in this lesson is not the mechanics —
              it is understanding what you are actually paying for when you buy an option.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
