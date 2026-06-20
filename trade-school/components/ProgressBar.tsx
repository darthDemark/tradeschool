interface ProgressBarProps {
  percent: number;
  label?: string;
  showPercent?: boolean;
  color?: string;
  height?: number;
}

export default function ProgressBar({ percent, label, showPercent = true, color, height = 6 }: ProgressBarProps) {
  return (
    <div>
      {(label || showPercent) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
          {label && <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{label}</span>}
          {showPercent && (
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "12px",
                color: "var(--accent)",
                fontWeight: 600,
              }}
            >
              {percent}%
            </span>
          )}
        </div>
      )}
      <div className="progress-bar" style={{ height }}>
        <div
          className="progress-fill"
          style={{
            width: `${Math.min(percent, 100)}%`,
            background: color || "var(--accent)",
          }}
        />
      </div>
    </div>
  );
}
