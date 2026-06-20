"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import MockChart from "@/components/MockChart";
import SectionHeader from "@/components/SectionHeader";
import EmptyState from "@/components/EmptyState";
import { watchlist, portfolio } from "@/lib/mockData";

const strategies = ["Buy Call", "Buy Put", "Call Debit Spread", "Put Debit Spread", "Iron Condor", "Covered Call", "Cash Secured Put", "Straddle", "Strangle"];
const expirations = ["Oct 18, 2024", "Nov 15, 2024", "Dec 20, 2024", "Jan 17, 2025"];

export default function TradingDeskPage() {
  const [orderForm, setOrderForm] = useState({
    symbol: "SPY",
    strategy: "Buy Call",
    type: "Call",
    strike: "",
    expiration: expirations[0],
    quantity: "1",
    maxRisk: "",
  });
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMsg(`Paper trade submitted: ${orderForm.quantity}x ${orderForm.symbol} ${orderForm.strategy}`);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
  };

  return (
    <AppShell>
      <PageHeader
        title="Trading Desk"
        subtitle="Your paper trading account. Practice execution without real capital at risk."
      />

      {/* Toast */}
      {toastVisible && (
        <div
          className="toast animate-fade-in"
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            zIndex: 1000,
            maxWidth: "380px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "18px" }}>✓</span>
            <div>
              <div style={{ fontWeight: 600, marginBottom: "2px" }}>Paper Trade Submitted</div>
              <div style={{ fontSize: "13px", opacity: 0.7 }}>{toastMsg}</div>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px", marginBottom: "40px" }}>
        <StatCard label="Portfolio Value" value={`$${portfolio.totalValue.toLocaleString()}`} />
        <StatCard label="Today's P/L" value="$0.00" sub="No open positions" />
        <StatCard label="Open Positions" value={`${portfolio.openPositions}`} />
        <StatCard label="Cash Available" value={`$${portfolio.cashAvailable.toLocaleString()}`} positive />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px", alignItems: "start" }}>

        {/* Left: chart + positions */}
        <div>
          {/* Chart */}
          <div style={{ marginBottom: "32px" }}>
            <SectionHeader title="Portfolio Performance" subtitle="Paper account · All time" />
            <MockChart height={200} showLabels />
          </div>

          {/* Open positions */}
          <div style={{ marginBottom: "32px" }}>
            <SectionHeader
              title="Open Positions"
              subtitle="Active paper trades"
            />
            <EmptyState
              icon="◫"
              title="No Open Positions"
              description="Submit a paper trade using the order ticket to open your first position."
            />
          </div>

          {/* Watchlist */}
          <div>
            <SectionHeader title="Watchlist" subtitle="Price data is static for prototype" />
            <div className="card" style={{ overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["Symbol", "Last", "Change", "Change %"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 20px",
                          textAlign: h === "Symbol" ? "left" : "right",
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.07em",
                          color: "var(--text-soft)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map((item, i) => {
                    const isPos = item.change >= 0;
                    return (
                      <tr
                        key={item.ticker}
                        style={{
                          borderBottom: i < watchlist.length - 1 ? "1px solid var(--border)" : "none",
                          background: "transparent",
                          transition: "background 0.1s ease",
                        }}
                      >
                        <td style={{ padding: "14px 20px", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: "15px", color: "var(--text-main)" }}>
                          {item.ticker}
                        </td>
                        <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "15px" }}>
                          ${item.price.toFixed(2)}
                        </td>
                        <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", color: isPos ? "var(--success)" : "var(--danger)" }}>
                          {isPos ? "+" : ""}{item.change.toFixed(2)}
                        </td>
                        <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", color: isPos ? "var(--success)" : "var(--danger)" }}>
                          {isPos ? "+" : ""}{item.changePct.toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: order ticket */}
        <div style={{ position: "sticky", top: "80px" }}>
          <SectionHeader title="Order Ticket" subtitle="Paper trades only" />
          <div className="card" style={{ padding: "28px" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Symbol */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  Symbol
                </label>
                <input
                  type="text"
                  value={orderForm.symbol}
                  onChange={(e) => setOrderForm({ ...orderForm, symbol: e.target.value.toUpperCase() })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1.5px solid var(--border)",
                    borderRadius: "10px",
                    background: "var(--background)",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "var(--text-main)",
                    outline: "none",
                  }}
                />
              </div>

              {/* Strategy */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  Strategy
                </label>
                <select
                  value={orderForm.strategy}
                  onChange={(e) => setOrderForm({ ...orderForm, strategy: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1.5px solid var(--border)",
                    borderRadius: "10px",
                    background: "var(--background)",
                    fontSize: "14px",
                    color: "var(--text-main)",
                    outline: "none",
                    appearance: "none",
                  }}
                >
                  {strategies.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              {/* Call / Put */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  Type
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {["Call", "Put"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setOrderForm({ ...orderForm, type: t })}
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: `1.5px solid ${orderForm.type === t ? (t === "Call" ? "var(--success)" : "var(--danger)") : "var(--border)"}`,
                        background: orderForm.type === t ? (t === "Call" ? "rgba(46,110,82,0.08)" : "rgba(140,59,59,0.08)") : "transparent",
                        color: orderForm.type === t ? (t === "Call" ? "var(--success)" : "var(--danger)") : "var(--text-muted)",
                        fontWeight: 600,
                        fontSize: "14px",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Strike */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  Strike Price
                </label>
                <input
                  type="number"
                  placeholder="e.g. 450"
                  value={orderForm.strike}
                  onChange={(e) => setOrderForm({ ...orderForm, strike: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1.5px solid var(--border)",
                    borderRadius: "10px",
                    background: "var(--background)",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "15px",
                    color: "var(--text-main)",
                    outline: "none",
                  }}
                />
              </div>

              {/* Expiration */}
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  Expiration
                </label>
                <select
                  value={orderForm.expiration}
                  onChange={(e) => setOrderForm({ ...orderForm, expiration: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1.5px solid var(--border)",
                    borderRadius: "10px",
                    background: "var(--background)",
                    fontSize: "14px",
                    color: "var(--text-main)",
                    outline: "none",
                    appearance: "none",
                  }}
                >
                  {expirations.map((e) => <option key={e}>{e}</option>)}
                </select>
              </div>

              {/* Quantity */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={orderForm.quantity}
                    onChange={(e) => setOrderForm({ ...orderForm, quantity: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1.5px solid var(--border)",
                      borderRadius: "10px",
                      background: "var(--background)",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "15px",
                      color: "var(--text-main)",
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                    Max Risk $
                  </label>
                  <input
                    type="number"
                    placeholder="500"
                    value={orderForm.maxRisk}
                    onChange={(e) => setOrderForm({ ...orderForm, maxRisk: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1.5px solid var(--border)",
                      borderRadius: "10px",
                      background: "var(--background)",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "15px",
                      color: "var(--text-main)",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Risk reminder */}
              <div style={{ padding: "12px 14px", background: "rgba(181,138,60,0.06)", borderRadius: "10px", border: "1px solid rgba(181,138,60,0.15)" }}>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  ⚠ Max risk per trade: 2% of portfolio = <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: "var(--accent)" }}>$500</span>. Follow your rules.
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "15px", padding: "14px" }}>
                Submit Paper Trade
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
