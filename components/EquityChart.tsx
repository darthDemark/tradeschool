"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTradeSchoolStore } from "@/lib/store";

const STARTING_BALANCE = 25000;

interface TooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const pnl = val - STARTING_BALANCE;
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "10px 14px", boxShadow: "0 8px 24px rgba(31,31,31,0.1)" }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "16px", fontWeight: 600, color: "var(--text-main)" }}>
        ${val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
      </div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: pnl >= 0 ? "var(--success)" : "var(--danger)", marginTop: "2px" }}>
        {pnl >= 0 ? "+" : ""}${pnl.toFixed(0)} all-time
      </div>
      <div style={{ fontSize: "11px", color: "var(--text-soft)", marginTop: "4px" }}>{label}</div>
    </div>
  );
}

export default function EquityChart() {
  const closedTrades = useTradeSchoolStore((s) => s.closedTrades);
  const accountBalance = useTradeSchoolStore((s) => s.accountBalance);

  const data = useMemo(() => {
    const points: { date: string; balance: number }[] = [
      { date: "Start", balance: STARTING_BALANCE },
    ];
    let running = STARTING_BALANCE;
    for (const trade of closedTrades) {
      running += trade.pnl ?? 0;
      const d = new Date(trade.closedAt ?? trade.openedAt);
      points.push({
        date: `${d.getMonth() + 1}/${d.getDate()}`,
        balance: Math.round(running),
      });
    }
    if (closedTrades.length === 0) {
      // Flat line placeholder
      points.push({ date: "Today", balance: accountBalance });
    }
    return points;
  }, [closedTrades, accountBalance]);

  const isPositive = accountBalance >= STARTING_BALANCE;
  const color = isPositive ? "#2E6E52" : "#8C3B3B";

  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="equity-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.15} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fill: "var(--text-soft)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fill: "var(--text-soft)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            width={45}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke={color}
            strokeWidth={2}
            fill="url(#equity-grad)"
            dot={false}
            activeDot={{ r: 5, fill: color, stroke: "var(--surface)", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
