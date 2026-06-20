interface CoachMessageProps {
  role: "professor" | "user";
  content: string;
  timestamp?: string;
}

export default function CoachMessage({ role, content, timestamp }: CoachMessageProps) {
  const isProfessor = role === "professor";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isProfessor ? "row" : "row-reverse",
        gap: "14px",
        alignItems: "flex-start",
        maxWidth: "85%",
        marginLeft: isProfessor ? 0 : "auto",
      }}
    >
      {isProfessor && (
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "var(--text-main)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: "16px",
            color: "var(--surface)",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
          }}
        >
          P
        </div>
      )}
      <div
        style={{
          background: isProfessor ? "var(--surface)" : "var(--text-main)",
          color: isProfessor ? "var(--text-main)" : "var(--surface)",
          border: isProfessor ? "1px solid var(--border)" : "none",
          borderRadius: isProfessor ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
          padding: "16px 20px",
          boxShadow: "0 4px 20px rgba(31,31,31,0.06)",
        }}
      >
        {isProfessor && (
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "6px" }}>
            Professor
          </div>
        )}
        <p style={{ fontSize: "15px", lineHeight: 1.7, margin: 0 }}>{content}</p>
        {timestamp && (
          <div style={{ fontSize: "11px", color: isProfessor ? "var(--text-soft)" : "rgba(255,255,255,0.5)", marginTop: "8px" }}>
            {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        )}
      </div>
    </div>
  );
}
