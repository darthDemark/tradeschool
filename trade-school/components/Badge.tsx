interface BadgeProps {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  icon: string;
}

export default function Badge({ title, description, earned, icon }: BadgeProps) {
  return (
    <div
      className="card"
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "8px",
        opacity: earned ? 1 : 0.4,
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: earned ? "rgba(181,138,60,0.12)" : "var(--surface-alt)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          border: earned ? "2px solid rgba(181,138,60,0.3)" : "2px solid var(--border)",
        }}
      >
        {icon}
      </div>
      <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--text-main)" }}>{title}</div>
      <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>{description}</div>
      {!earned && <span className="badge badge-muted" style={{ fontSize: "10px" }}>Locked</span>}
      {earned && <span className="badge badge-gold" style={{ fontSize: "10px" }}>Earned</span>}
    </div>
  );
}
