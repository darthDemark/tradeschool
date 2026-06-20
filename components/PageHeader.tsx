interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
      <div>
        <div className="section-divider" />
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 38px)",
            fontWeight: 700,
            color: "var(--text-main)",
            margin: "0 0 8px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: "16px", color: "var(--text-muted)", margin: 0 }}>{subtitle}</p>
        )}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  );
}
