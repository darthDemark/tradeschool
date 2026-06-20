interface JournalEntryProps {
  date: string;
  ticker: string;
  strategy: string;
  result: string;
  resultValue: number;
  grade: string;
  notes: string;
  emotionalState: string;
  ruleViolation: boolean;
  lessonLearned: string;
}

export default function JournalEntry({
  date,
  ticker,
  strategy,
  result,
  resultValue,
  grade,
  notes,
  emotionalState,
  ruleViolation,
  lessonLearned,
}: JournalEntryProps) {
  const isWin = resultValue >= 0;

  const gradeColor = () => {
    if (grade.startsWith("A")) return "var(--success)";
    if (grade.startsWith("B")) return "var(--accent)";
    return "var(--warning)";
  };

  return (
    <div className="card" style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "16px", fontWeight: 600, color: "var(--text-main)" }}>
              {ticker}
            </span>
            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{strategy}</span>
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-soft)" }}>{date}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "20px",
              fontWeight: 600,
              color: isWin ? "var(--success)" : "var(--danger)",
            }}
          >
            {result}
          </div>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: `${gradeColor()}18`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "13px",
              fontWeight: 700,
              color: gradeColor(),
            }}
          >
            {grade}
          </div>
        </div>
      </div>

      <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "14px", lineHeight: 1.6 }}>{notes}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
        <span
          style={{
            fontSize: "12px",
            padding: "4px 10px",
            borderRadius: "999px",
            background: "var(--surface-alt)",
            color: "var(--text-soft)",
          }}
        >
          🧠 {emotionalState}
        </span>
        {ruleViolation && (
          <span className="badge badge-danger">Rule Violation</span>
        )}
        {!ruleViolation && (
          <span className="badge badge-success">No Violations</span>
        )}
      </div>

      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-soft)", marginBottom: "4px" }}>
          Lesson Learned
        </div>
        <p style={{ fontSize: "13px", color: "var(--text-main)", margin: 0, lineHeight: 1.6 }}>{lessonLearned}</p>
      </div>
    </div>
  );
}
