interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 32px",
        textAlign: "center",
        background: "var(--surface)",
        border: "1px dashed var(--border)",
        borderRadius: "18px",
      }}
    >
      {icon && <div style={{ fontSize: "40px", marginBottom: "16px" }}>{icon}</div>}
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, color: "var(--text-main)", margin: "0 0 8px" }}>
        {title}
      </h3>
      {description && (
        <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 24px", maxWidth: "360px", lineHeight: 1.6 }}>{description}</p>
      )}
      {action && action}
    </div>
  );
}
