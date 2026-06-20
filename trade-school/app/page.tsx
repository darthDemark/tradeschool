import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{ background: "var(--background)", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>

      {/* Top nav */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 clamp(24px, 6vw, 80px)",
        height: "72px",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "var(--text-main)" }}>
            Trade School
          </div>
          <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)" }}>
            Learn. Practice. Execute.
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link href="/courses" className="btn-secondary" style={{ padding: "9px 20px", fontSize: "13px" }}>Curriculum</Link>
          <Link href="/dashboard" className="btn-primary" style={{ padding: "9px 20px", fontSize: "13px" }}>Enter Dashboard</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "48px",
      }}>
        <div style={{ maxWidth: "720px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            background: "rgba(181,138,60,0.1)",
            borderRadius: "999px",
            marginBottom: "32px",
            border: "1px solid rgba(181,138,60,0.25)",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
            <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>
              Prototype · Phase 1
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(42px, 7vw, 72px)",
            fontWeight: 700,
            color: "var(--text-main)",
            lineHeight: 1.1,
            margin: "0 0 8px",
          }}>
            Trade School
          </h1>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 400,
            color: "var(--accent)",
            margin: "0 0 32px",
            fontStyle: "italic",
          }}>
            Learn. Practice. Execute.
          </p>
          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--text-muted)",
            lineHeight: 1.75,
            margin: "0 0 48px",
            maxWidth: "600px",
          }}>
            The complete training ground for options traders. Study the market.
            Practice with paper money. Run scenarios with hidden outcomes.
            Build the discipline required to trade professionally.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link href="/dashboard" className="btn-primary" style={{ fontSize: "15px", padding: "14px 32px" }}>
              Enter Dashboard →
            </Link>
            <Link href="/courses" className="btn-secondary" style={{ fontSize: "15px", padding: "14px 32px" }}>
              View Curriculum
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          paddingTop: "48px",
          borderTop: "1px solid var(--border)",
        }}>
          {[
            { label: "Semesters", value: "7", sub: "Structured curriculum" },
            { label: "Scenarios", value: "50+", sub: "Hidden-outcome simulations" },
            { label: "Paper Account", value: "$25,000", sub: "Risk-free practice" },
            { label: "Greeks Covered", value: "5", sub: "Delta Gamma Theta Vega Rho" },
          ].map((stat) => (
            <div key={stat.label} style={{ padding: "20px 0" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "28px", fontWeight: 600, color: "var(--text-main)", marginBottom: "4px" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)", marginBottom: "2px" }}>
                {stat.label}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 1: The Mission */}
      <section style={{ background: "var(--text-main)", padding: "clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "64px", alignItems: "center" }}>
          <div>
            <div style={{ width: "40px", height: "2px", background: "var(--accent)", marginBottom: "24px" }} />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 4vw, 42px)",
              fontWeight: 700,
              color: "#FDFBF7",
              lineHeight: 1.2,
              margin: "0 0 24px",
            }}>
              Trading is not gambling. It is a discipline.
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(253,251,247,0.65)", lineHeight: 1.8, margin: 0 }}>
              Trade School teaches that consistent performance in options trading comes from probabilistic thinking,
              pattern recognition, risk management, and emotional control — not from luck, tips, or shortcuts.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { title: "Probabilistic Thinking", desc: "Understand expected value, not prediction. The best traders think in probabilities." },
              { title: "Pattern Recognition", desc: "Learn to read market structure, options flow, and volatility patterns with discipline." },
              { title: "Emotional Control", desc: "Build the psychological frameworks required to execute your plan under pressure." },
              { title: "System Development", desc: "Create and refine a personal trading system that generates repeatable edge over time." },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "20px 24px",
                  background: "rgba(253,251,247,0.05)",
                  borderRadius: "14px",
                  border: "1px solid rgba(253,251,247,0.08)",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--accent)", marginBottom: "6px" }}>{item.title}</div>
                <div style={{ fontSize: "14px", color: "rgba(253,251,247,0.6)", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: How Training Works */}
      <section style={{ padding: "clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ width: "40px", height: "2px", background: "var(--accent)", margin: "0 auto 24px" }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, color: "var(--text-main)", margin: "0 0 16px" }}>
              How Training Works
            </h2>
            <p style={{ fontSize: "16px", color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto" }}>
              Four integrated training methods that compound your skill over time.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {[
              { step: "01", title: "Study the Curriculum", desc: "7 structured semesters covering market foundations through professional execution. Each lesson builds on the last.", icon: "◎" },
              { step: "02", title: "Practice in the Lab", desc: "Drill options chains, Greeks, volatility, and risk calculations in an isolated training environment.", icon: "⬡" },
              { step: "03", title: "Run Scenarios", desc: "Face real market situations with hidden outcomes. Choose your trade. See the result. Learn from the feedback.", icon: "◉" },
              { step: "04", title: "Trade on Paper", desc: "Execute paper trades with a $25,000 virtual account. Review every decision in your journal.", icon: "◧" },
            ].map((item) => (
              <div
                key={item.step}
                className="card"
                style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "28px", color: "var(--accent)" }}>{item.icon}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: "var(--border)", fontWeight: 600 }}>{item.step}</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, margin: 0, color: "var(--text-main)" }}>{item.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Trader Path */}
      <section style={{ background: "var(--surface-alt)", padding: "clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px" }}>
            <div style={{ width: "40px", height: "2px", background: "var(--accent)", marginBottom: "20px" }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, color: "var(--text-main)", margin: "0 0 12px" }}>
              The Trader Path
            </h2>
            <p style={{ fontSize: "16px", color: "var(--text-muted)", margin: 0 }}>
              Progress through six ranks as you build verified competency.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { rank: "Freshman Trader", req: "Complete Semester 1: Market Foundations", level: 1 },
              { rank: "Sophomore Trader", req: "Complete Semesters 1–2", level: 2 },
              { rank: "Junior Trader", req: "Complete Semesters 1–4", level: 3 },
              { rank: "Senior Trader", req: "Complete all semesters + 50 scenarios", level: 4 },
              { rank: "Market Operator", req: "3 consecutive profitable months on paper", level: 5 },
              { rank: "Professional Trader", req: "6 consecutive profitable months with a written plan", level: 6 },
            ].map((item, i) => (
              <div
                key={item.rank}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  padding: "20px 0",
                  borderBottom: i < 5 ? "1px solid var(--border)" : "none",
                }}
              >
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: i === 0 ? "var(--accent)" : "var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: i === 0 ? "var(--surface)" : "var(--text-soft)",
                  flexShrink: 0,
                }}>
                  {item.level}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "16px", color: i === 0 ? "var(--accent)" : "var(--text-main)", marginBottom: "2px" }}>
                    {item.rank}
                    {i === 0 && <span className="badge badge-gold" style={{ marginLeft: "10px", fontSize: "10px" }}>Current</span>}
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{item.req}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Built for Discipline */}
      <section style={{ padding: "clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "48px", alignItems: "center" }}>
          <div>
            <div style={{ width: "40px", height: "2px", background: "var(--accent)", marginBottom: "24px" }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, color: "var(--text-main)", margin: "0 0 20px" }}>
              Built for Discipline
            </h2>
            <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.8, margin: "0 0 32px" }}>
              Every feature in Trade School reinforces the habits of professional traders:
              pre-trade planning, risk-first thinking, and systematic review.
            </p>
            <Link href="/dashboard" className="btn-primary">Begin Your Training →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              { label: "Risk Rules", desc: "Enforced position limits and max loss checks" },
              { label: "Journal", desc: "Required entry for every paper trade" },
              { label: "Professor", desc: "AI coach that reviews your trades and habits" },
              { label: "Scenarios", desc: "Hidden outcomes that force genuine decisions" },
              { label: "Streaks", desc: "Daily study accountability tracking" },
              { label: "Progress", desc: "Competency-based, not time-based advancement" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "20px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                }}
              >
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)", marginBottom: "6px" }}>{item.label}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: "var(--text-main)",
        padding: "clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ width: "40px", height: "2px", background: "var(--accent)", margin: "0 auto 32px" }} />
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700,
            color: "#FDFBF7",
            margin: "0 0 20px",
            lineHeight: 1.2,
          }}>
            Begin Training
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(253,251,247,0.65)", marginBottom: "40px", lineHeight: 1.7 }}>
            Your paper account is ready. The curriculum is waiting.
            The only requirement is showing up with discipline.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/dashboard" className="btn-primary" style={{ fontSize: "16px", padding: "16px 36px" }}>
              Enter Dashboard →
            </Link>
            <Link
              href="/courses"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "16px 36px",
                borderRadius: "999px",
                border: "1.5px solid rgba(253,251,247,0.2)",
                color: "rgba(253,251,247,0.8)",
                fontSize: "16px",
                textDecoration: "none",
                transition: "border-color 0.2s ease",
              }}
            >
              View Curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "var(--text-main)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "32px clamp(24px, 6vw, 80px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: 700, color: "rgba(253,251,247,0.8)" }}>Trade School</div>
          <div style={{ fontSize: "11px", color: "rgba(253,251,247,0.35)", marginTop: "2px" }}>Where Traders Are Made.</div>
        </div>
        <div style={{ fontSize: "12px", color: "rgba(253,251,247,0.3)" }}>
          Prototype · Phase 1 · For educational purposes only
        </div>
      </footer>

    </div>
  );
}
