"use client";

import { mockChartData } from "@/lib/mockData";

interface MockChartProps {
  height?: number;
  showLabels?: boolean;
  positive?: boolean;
}

export default function MockChart({ height = 200, showLabels = true, positive = true }: MockChartProps) {
  const data = mockChartData;
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  const width = 600;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d.value - min) / range) * (height - 20) - 10;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;
  const fillD = `M ${points[0]} L ${points.join(" L ")} L ${width},${height} L 0,${height} Z`;

  const strokeColor = positive ? "#B58A3C" : "#8C3B3B";
  const fillColor = positive ? "rgba(181,138,60,0.08)" : "rgba(140,59,59,0.08)";

  const lastValue = values[values.length - 1];
  const firstValue = values[0];
  const pnl = lastValue - firstValue;
  const pnlPct = ((pnl / firstValue) * 100).toFixed(2);

  return (
    <div className="chart-container" style={{ padding: "24px" }}>
      {showLabels && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "24px", fontWeight: 500, color: "var(--text-main)" }}>
              ${lastValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "13px",
                color: positive ? "var(--success)" : "var(--danger)",
                marginTop: "2px",
              }}
            >
              {pnl >= 0 ? "+" : ""}${Math.abs(pnl).toFixed(0)} ({pnl >= 0 ? "+" : ""}{pnlPct}%)
            </div>
          </div>
          <span className="badge badge-muted" style={{ fontSize: "11px" }}>Paper Account · All Time</span>
        </div>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: "100%", height: `${height}px`, display: "block" }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={fillD} fill="url(#chartGrad)" />
        <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
