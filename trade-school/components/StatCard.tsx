interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  positive?: boolean;
  negative?: boolean;
  icon?: string;
}

export default function StatCard({ label, value, sub, accent, positive, negative, icon }: StatCardProps) {
  let valueColor = "var(--text-main)";
  if (positive) valueColor = "var(--success)";
  if (negative) valueColor = "var(--danger)";
  if (accent) valueColor = "var(--accent)";

  return (
    <div
      className="card"
      style={{
        padding: "24px 28px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {icon && <span style={{ fontSize: "16px" }}>{icon}</span>}
        <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-soft)" }}>
          {label}
        </span>
      </div>
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "28px",
          fontWeight: 500,
          color: valueColor,
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{sub}</div>
      )}
    </div>
  );
}
