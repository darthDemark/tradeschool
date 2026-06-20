"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import SectionHeader from "@/components/SectionHeader";
import EquityChart from "@/components/EquityChart";
import { useTradeSchoolStore } from "@/lib/store";
import type { PaperTrade } from "@/lib/types";

const STARTING_BALANCE = 25000;
const strategies = ["Buy Call", "Buy Put", "Call Debit Spread", "Put Debit Spread", "Iron Condor", "Credit Spread", "Covered Call", "Straddle", "Strangle"];
const expirations = ["This Friday", "Next Friday", "Oct 18, 2024", "Nov 15, 2024", "Dec 20, 2024", "Jan 17, 2025"];
const grades = ["A", "B", "C", "D", "F"] as const;

const watchlist = [
  { ticker: "SPY", price: 445.82, change: +1.24, changePct: +0.28 },
  { ticker: "QQQ", price: 382.15, change: -0.67, changePct: -0.175 },
  { ticker: "TSLA", price: 410.30, change: +8.45, changePct: +2.1 },
  { ticker: "NVDA", price: 620.80, change: +12.30, changePct: +2.02 },
  { ticker: "AAPL", price: 189.40, change: -1.20, changePct: -0.63 },
];

function CloseTradeModal({ trade, onClose, onSubmit }: {
  trade: PaperTrade;
  onClose: () => void;
  onSubmit: (exitPrice: number, notes: string, grade: PaperTrade["grade"]) => void;
}) {
  const [exitPrice, setExitPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [grade, setGrade] = useState<PaperTrade["grade"]>("B");

  const calcPnL = () => {
    const ep = parseFloat(exitPrice);
    if (isNaN(ep)) return null;
    return (ep - trade.entryPrice) * trade.quantity * 100;
  };
  const pnl = calcPnL();

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(31,31,31,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 500, padding: "20px" }}>
      <div className="card" style={{ width: "100%", maxWidth: "480px", padding: "32px" }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, margin: "0 0 4px" }}>Close Trade</h3>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "0 0 24px" }}>
          {trade.symbol} · {trade.strategy} · {trade.quantity} contract{trade.quantity > 1 ? "s" : ""}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "6px" }}>
              Exit Price (per share/contract)
            </label>
            <input
              type="number"
              step="0.01"
              placeholder={`Entry was $${trade.entryPrice}`}
              value={exitPrice}
              onChange={(e) => setExitPrice(e.target.value)}
              style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "15px", color: "var(--text-main)", outline: "none" }}
            />
          </div>

          {pnl !== null && (
            <div style={{ padding: "14px", background: pnl >= 0 ? "rgba(46,110,82,0.08)" : "rgba(140,59,59,0.08)", borderRadius: "10px", border: `1px solid ${pnl >= 0 ? "rgba(46,110,82,0.2)" : "rgba(140,59,59,0.2)"}` }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "22px", fontWeight: 600, color: pnl >= 0 ? "var(--success)" : "var(--danger)" }}>
                {pnl >= 0 ? "+" : ""}${pnl.toFixed(0)}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>Estimated P/L · Prototype calculation</div>
            </div>
          )}

          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "8px" }}>
              Grade This Trade
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              {grades.map((g) => {
                const colors = { A: "var(--success)", B: "var(--accent)", C: "var(--warning)", D: "var(--danger)", F: "var(--danger)" };
                const c = colors[g];
                return (
                  <button key={g} onClick={() => setGrade(g)} style={{ width: "40px", height: "40px", borderRadius: "50%", border: `2px solid ${grade === g ? c : "var(--border)"}`, background: grade === g ? `${c}18` : "transparent", color: grade === g ? c : "var(--text-muted)", fontWeight: 700, fontSize: "15px", cursor: "pointer" }}>
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "6px" }}>
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What happened? What did you learn?"
              rows={3}
              style={{ width: "100%", padding: "10px 14px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontSize: "13px", color: "var(--text-main)", outline: "none", resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
            <button
              onClick={() => exitPrice && onSubmit(parseFloat(exitPrice), notes, grade)}
              className="btn-primary"
              disabled={!exitPrice}
              style={{ flex: 1, justifyContent: "center", opacity: !exitPrice ? 0.5 : 1 }}
            >
              Close Trade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TradingDeskPage() {
  const store = useTradeSchoolStore();
  const stats = store.getAccountStats();
  const pnl = store.accountBalance - STARTING_BALANCE;
  const maxRiskAllowed = store.accountBalance * 0.01;
  const maxDailyLoss = store.accountBalance * 0.03;
  const isDailyLimited = store.isDailyLossLimitReached();

  const [form, setForm] = useState({
    symbol: "SPY",
    strategy: "Buy Call",
    direction: "Bullish" as PaperTrade["direction"],
    contractType: "Call" as "Call" | "Put",
    strike: "",
    expiration: expirations[0],
    quantity: "1",
    entryPrice: "",
    maxRisk: "",
    thesis: "",
    stopRule: "",
    exitRule: "",
  });
  const [toast, setToast] = useState<{ type: "success" | "error" | "warning"; msg: string } | null>(null);
  const [closingTrade, setClosingTrade] = useState<PaperTrade | null>(null);
  const [violations, setViolations] = useState<string[]>([]);

  const showToast = (type: "success" | "error" | "warning", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.entryPrice || !form.maxRisk) {
      showToast("error", "Entry price and max risk are required.");
      return;
    }

    const warns: string[] = [];
    const mr = parseFloat(form.maxRisk);
    if (mr > maxRiskAllowed) warns.push(`Max risk $${mr} exceeds 1% rule ($${maxRiskAllowed.toFixed(0)})`);
    if (!form.thesis.trim()) warns.push("No trade thesis provided");
    if (!form.stopRule.trim()) warns.push("No stop rule defined");
    if (!form.exitRule.trim()) warns.push("No exit rule defined");

    if (warns.length > 0 && violations.length === 0) {
      setViolations(warns);
      return;
    }

    const trade: PaperTrade = {
      id: crypto.randomUUID(),
      symbol: form.symbol.toUpperCase(),
      strategy: form.strategy,
      direction: form.direction,
      contractType: form.contractType,
      strike: form.strike ? parseFloat(form.strike) : undefined,
      expiration: form.expiration,
      quantity: parseInt(form.quantity),
      entryPrice: parseFloat(form.entryPrice),
      maxRisk: parseFloat(form.maxRisk),
      thesis: form.thesis,
      stopRule: form.stopRule,
      exitRule: form.exitRule,
      status: "Open",
      openedAt: new Date().toISOString(),
      ruleViolation: violations.length > 0,
    };

    const result = store.openTrade(trade);

    if (!result.success) {
      showToast("error", result.violation ?? "Could not open trade.");
      setViolations([]);
      return;
    }

    showToast("success", `Paper trade opened: ${trade.quantity}x ${trade.symbol} ${trade.strategy}`);
    setForm({ symbol: "SPY", strategy: "Buy Call", direction: "Bullish", contractType: "Call", strike: "", expiration: expirations[0], quantity: "1", entryPrice: "", maxRisk: "", thesis: "", stopRule: "", exitRule: "" });
    setViolations([]);
  };

  const handleCloseTrade = (exitPrice: number, notes: string, grade: PaperTrade["grade"]) => {
    if (!closingTrade) return;
    store.closeTrade(closingTrade.id, exitPrice, notes, grade);
    setClosingTrade(null);
    showToast("success", `Trade closed. P/L calculated.`);
  };

  const toastColors = { success: "var(--success)", error: "var(--danger)", warning: "var(--warning)" };

  return (
    <AppShell>
      {/* Toast */}
      {toast && (
        <div className="animate-fade-in" style={{ position: "fixed", bottom: "32px", right: "32px", zIndex: 1000, background: "var(--text-main)", color: "var(--surface)", borderRadius: "12px", padding: "14px 20px", boxShadow: "0 20px 60px rgba(31,31,31,0.2)", maxWidth: "380px", display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ color: toastColors[toast.type], fontSize: "18px" }}>{toast.type === "success" ? "✓" : toast.type === "warning" ? "⚠" : "✗"}</span>
          <span style={{ fontSize: "14px" }}>{toast.msg}</span>
        </div>
      )}

      {closingTrade && (
        <CloseTradeModal trade={closingTrade} onClose={() => setClosingTrade(null)} onSubmit={handleCloseTrade} />
      )}

      <PageHeader title="Trading Desk" subtitle="Paper trading account. Practice execution with no real capital at risk." />

      {/* Daily loss warning */}
      {isDailyLimited && (
        <div style={{ padding: "16px 20px", background: "rgba(140,59,59,0.08)", border: "1.5px solid rgba(140,59,59,0.25)", borderRadius: "12px", marginBottom: "24px" }}>
          <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--danger)", marginBottom: "4px" }}>Daily Loss Limit Reached</div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
            You have reached your 3% daily loss limit (${maxDailyLoss.toFixed(0)}). No new trades for today. This is not a punishment — it is the discipline that keeps you trading tomorrow.
          </p>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px", marginBottom: "32px" }}>
        <StatCard label="Account Balance" value={`$${store.accountBalance.toLocaleString()}`} />
        <StatCard label="All-Time P/L" value={`${pnl >= 0 ? "+" : ""}$${pnl.toFixed(0)}`} positive={pnl >= 0} negative={pnl < 0} />
        <StatCard label="Open Trades" value={`${store.openTrades.length}`} sub="max 3" />
        <StatCard label="Win Rate" value={stats.totalTrades > 0 ? `${stats.winRate}%` : "—"} sub={`${stats.totalTrades} closed`} positive={stats.winRate >= 50} />
        <StatCard label="Profit Factor" value={stats.totalTrades > 0 ? stats.profitFactor.toFixed(2) : "—"} sub="Target > 1.5" positive={stats.profitFactor >= 1.5} accent={stats.profitFactor > 0 && stats.profitFactor < 1.5} />
        <StatCard label="Max Drawdown" value={stats.maxDrawdown > 0 ? `$${stats.maxDrawdown.toFixed(0)}` : "$0"} negative={stats.maxDrawdown > store.accountBalance * 0.1} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "28px", alignItems: "start" }}>
        {/* Left column */}
        <div>
          {/* Open positions */}
          <div style={{ marginBottom: "28px" }}>
            <SectionHeader title="Open Positions" subtitle={`${store.openTrades.length} / 3 max positions`} />
            {store.openTrades.length === 0 ? (
              <div style={{ padding: "40px", textAlign: "center", background: "var(--surface)", border: "1px dashed var(--border)", borderRadius: "14px" }}>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>◫</div>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0 }}>No open positions. Use the order ticket to open a paper trade.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {store.openTrades.map((t) => (
                  <div key={t.id} className="card" style={{ padding: "18px 22px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: "16px" }}>{t.symbol}</span>
                          <span className="badge badge-gold">{t.strategy}</span>
                          <span style={{ fontSize: "12px", color: t.direction === "Bullish" ? "var(--success)" : t.direction === "Bearish" ? "var(--danger)" : "var(--text-muted)" }}>{t.direction}</span>
                        </div>
                        {t.strike && <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--text-soft)" }}>${t.strike} {t.contractType} · {t.expiration} · {t.quantity}x</div>}
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>Entry: ${t.entryPrice} · Max Risk: ${t.maxRisk}</div>
                        {t.thesis && <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px", fontStyle: "italic" }}>Thesis: {t.thesis}</div>}
                      </div>
                      <button onClick={() => setClosingTrade(t)} className="btn-secondary" style={{ fontSize: "12px", padding: "7px 14px" }}>
                        Close Trade
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Equity chart */}
          <div style={{ marginBottom: "28px" }}>
            <SectionHeader title="Account Equity" />
            <div className="card" style={{ padding: "24px" }}>
              <EquityChart />
            </div>
          </div>

          {/* Closed trades */}
          {store.closedTrades.length > 0 && (
            <div>
              <SectionHeader title="Closed Trades" subtitle={`${store.closedTrades.length} trades · ${stats.winRate}% win rate`} />
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[...store.closedTrades].reverse().map((t) => (
                  <div key={t.id} className="card" style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: "14px" }}>{t.symbol}</span>
                        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t.strategy}</span>
                        {t.grade && (
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", fontWeight: 700, width: "24px", height: "24px", borderRadius: "50%", background: "var(--surface-alt)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>{t.grade}</span>
                        )}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "15px", fontWeight: 600, color: (t.pnl ?? 0) >= 0 ? "var(--success)" : "var(--danger)" }}>
                          {(t.pnl ?? 0) >= 0 ? "+" : ""}${(t.pnl ?? 0).toFixed(0)}
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>{new Date(t.closedAt ?? "").toLocaleDateString()}</div>
                      </div>
                    </div>
                    {t.notes && <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "6px 0 0", fontStyle: "italic" }}>{t.notes}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Watchlist */}
          <div style={{ marginTop: "28px" }}>
            <SectionHeader title="Watchlist" subtitle="Static prices · Phase 2 will add live data" />
            <div className="card" style={{ overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["Symbol", "Last", "Change", "%"].map((h) => (
                      <th key={h} style={{ padding: "10px 18px", textAlign: h === "Symbol" ? "left" : "right", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-soft)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map((w, i) => (
                    <tr key={w.ticker} style={{ borderBottom: i < watchlist.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <td style={{ padding: "12px 18px", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>{w.ticker}</td>
                      <td style={{ padding: "12px 18px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>${w.price.toFixed(2)}</td>
                      <td style={{ padding: "12px 18px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: w.change >= 0 ? "var(--success)" : "var(--danger)" }}>{w.change >= 0 ? "+" : ""}{w.change.toFixed(2)}</td>
                      <td style={{ padding: "12px 18px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: w.changePct >= 0 ? "var(--success)" : "var(--danger)" }}>{w.changePct >= 0 ? "+" : ""}{w.changePct.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order ticket */}
        <div style={{ position: "sticky", top: "80px" }}>
          <SectionHeader title="Order Ticket" subtitle="Paper trades only" />
          <div className="card" style={{ padding: "24px" }}>
            {isDailyLimited ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>🛑</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, margin: "0 0 8px" }}>Trading Halted</h3>
                <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>Daily loss limit reached. Come back tomorrow with a clear head.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {/* Violations warning */}
                {violations.length > 0 && (
                  <div style={{ padding: "14px", background: "rgba(197,139,42,0.08)", border: "1.5px solid rgba(197,139,42,0.25)", borderRadius: "10px" }}>
                    <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--warning)", marginBottom: "8px" }}>⚠ Rule Violations Detected</div>
                    {violations.map((v, i) => <div key={i} style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "3px" }}>· {v}</div>)}
                    <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                      <button type="submit" className="btn-primary" style={{ fontSize: "12px", padding: "8px 14px" }}>Submit Anyway (Log Violation)</button>
                      <button type="button" onClick={() => setViolations([])} className="btn-secondary" style={{ fontSize: "12px", padding: "8px 14px" }}>Fix First</button>
                    </div>
                  </div>
                )}

                {/* Symbol */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Symbol</label>
                  <input type="text" value={form.symbol} onChange={(e) => setForm({ ...form, symbol: e.target.value.toUpperCase() })} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "15px", fontWeight: 700, color: "var(--text-main)", outline: "none" }} />
                </div>

                {/* Strategy */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Strategy</label>
                  <select value={form.strategy} onChange={(e) => setForm({ ...form, strategy: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontSize: "13px", color: "var(--text-main)", outline: "none", appearance: "none" }}>
                    {strategies.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>

                {/* Direction */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Direction</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
                    {(["Bullish", "Bearish", "Neutral"] as const).map((d) => {
                      const c = d === "Bullish" ? "var(--success)" : d === "Bearish" ? "var(--danger)" : "var(--text-muted)";
                      return (
                        <button key={d} type="button" onClick={() => setForm({ ...form, direction: d })} style={{ padding: "8px", borderRadius: "8px", border: `1.5px solid ${form.direction === d ? c : "var(--border)"}`, background: form.direction === d ? `${c}12` : "transparent", color: form.direction === d ? c : "var(--text-muted)", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>{d}</button>
                      );
                    })}
                  </div>
                </div>

                {/* Call/Put */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Contract Type</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                    {(["Call", "Put"] as const).map((t) => {
                      const c = t === "Call" ? "var(--success)" : "var(--danger)";
                      return (
                        <button key={t} type="button" onClick={() => setForm({ ...form, contractType: t })} style={{ padding: "8px", borderRadius: "8px", border: `1.5px solid ${form.contractType === t ? c : "var(--border)"}`, background: form.contractType === t ? `${c}12` : "transparent", color: form.contractType === t ? c : "var(--text-muted)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>{t}</button>
                      );
                    })}
                  </div>
                </div>

                {/* Strike, Qty, Entry, MaxRisk */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Strike</label>
                    <input type="number" placeholder="450" value={form.strike} onChange={(e) => setForm({ ...form, strike: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", color: "var(--text-main)", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Qty</label>
                    <input type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", color: "var(--text-main)", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Entry Price $</label>
                    <input required type="number" step="0.01" placeholder="4.50" value={form.entryPrice} onChange={(e) => setForm({ ...form, entryPrice: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", color: "var(--text-main)", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Max Risk $</label>
                    <input required type="number" placeholder={`≤$${maxRiskAllowed.toFixed(0)}`} value={form.maxRisk} onChange={(e) => setForm({ ...form, maxRisk: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: `1.5px solid ${parseFloat(form.maxRisk) > maxRiskAllowed ? "var(--danger)" : "var(--border)"}`, borderRadius: "10px", background: "var(--background)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", color: "var(--text-main)", outline: "none" }} />
                  </div>
                </div>

                {/* Expiration */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Expiration</label>
                  <select value={form.expiration} onChange={(e) => setForm({ ...form, expiration: e.target.value })} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontSize: "13px", color: "var(--text-main)", outline: "none", appearance: "none" }}>
                    {expirations.map((e) => <option key={e}>{e}</option>)}
                  </select>
                </div>

                {/* Thesis, Stop, Exit */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Trade Thesis <span style={{ color: "var(--danger)" }}>*</span></label>
                  <textarea value={form.thesis} onChange={(e) => setForm({ ...form, thesis: e.target.value })} placeholder="Why are you entering this trade?" rows={2} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontSize: "13px", color: "var(--text-main)", outline: "none", resize: "vertical", fontFamily: "inherit" }} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Stop Rule <span style={{ color: "var(--danger)" }}>*</span></label>
                  <input type="text" value={form.stopRule} onChange={(e) => setForm({ ...form, stopRule: e.target.value })} placeholder="e.g. Close if premium drops 50%" style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontSize: "13px", color: "var(--text-main)", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>Exit Rule <span style={{ color: "var(--danger)" }}>*</span></label>
                  <input type="text" value={form.exitRule} onChange={(e) => setForm({ ...form, exitRule: e.target.value })} placeholder="e.g. Take profit at 100% gain" style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontSize: "13px", color: "var(--text-main)", outline: "none" }} />
                </div>

                {/* Risk callout */}
                <div style={{ padding: "10px 12px", background: "rgba(181,138,60,0.06)", borderRadius: "8px", border: "1px solid rgba(181,138,60,0.15)" }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                    1% rule max risk: <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: "var(--accent)" }}>${maxRiskAllowed.toFixed(0)}</span> · Max 3 open trades · Daily loss limit: <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: "var(--accent)" }}>${maxDailyLoss.toFixed(0)}</span>
                  </div>
                </div>

                {violations.length === 0 && (
                  <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px" }}>
                    Submit Paper Trade
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
