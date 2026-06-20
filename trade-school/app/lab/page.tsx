"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import { optionChainMock } from "@/lib/mockData";

// ─── Options Chain module ─────────────────────────────────────────────────────
function OptionsChainModule() {
  const [selectedRow, setSelectedRow] = useState<{ type: "call" | "put"; strike: number; delta: number; iv: string; bid: number; ask: number } | null>(null);
  const { ticker, currentPrice, expiration, calls, puts } = optionChainMock;

  return (
    <div>
      <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "20px", lineHeight: 1.6 }}>
        Study the options chain below. Click any row to see an explanation of what those numbers mean. 
        The highlighted row is at-the-money (ATM) — where the stock price equals the strike price.
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
        <div style={{ display: "flex", gap: "16px" }}>
          <div><span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "18px", fontWeight: 700 }}>{ticker}</span><span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "16px", color: "var(--text-muted)", marginLeft: "10px" }}>${currentPrice}</span></div>
        </div>
        <span className="badge badge-muted">Exp: {expiration}</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border)" }}>
              <th colSpan={5} style={{ padding: "8px", textAlign: "center", color: "var(--success)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.1em" }}>CALLS</th>
              <th style={{ padding: "8px", textAlign: "center", background: "var(--surface-alt)", fontWeight: 700 }}>STRIKE</th>
              <th colSpan={5} style={{ padding: "8px", textAlign: "center", color: "var(--danger)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.1em" }}>PUTS</th>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Delta", "OI", "Bid", "Ask", "IV"].map((h) => <th key={h} style={{ padding: "6px 10px", textAlign: "right", color: "var(--text-soft)", fontWeight: 600, fontSize: "11px" }}>{h}</th>)}
              <th style={{ padding: "6px 10px", textAlign: "center", background: "var(--surface-alt)", fontWeight: 700, fontSize: "11px" }}>$</th>
              {["IV", "Bid", "Ask", "OI", "Delta"].map((h) => <th key={h} style={{ padding: "6px 10px", textAlign: "left", color: "var(--text-soft)", fontWeight: 600, fontSize: "11px" }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {calls.map((call, i) => {
              const put = puts[i];
              const isAtm = Math.abs(call.strike - currentPrice) < 5;
              return (
                <tr
                  key={call.strike}
                  style={{ borderBottom: "1px solid var(--border)", background: isAtm ? "rgba(181,138,60,0.06)" : "transparent", cursor: "pointer" }}
                >
                  {[call.delta.toFixed(2), call.oi.toLocaleString(), call.bid.toFixed(2), call.ask.toFixed(2), call.iv].map((v, j) => (
                    <td key={j} onClick={() => setSelectedRow({ type: "call", strike: call.strike, delta: call.delta, iv: call.iv, bid: call.bid, ask: call.ask })} style={{ padding: "10px 10px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: j === 0 ? "var(--success)" : "var(--text-main)" }}>{v}</td>
                  ))}
                  <td style={{ padding: "10px 14px", textAlign: "center", background: isAtm ? "rgba(181,138,60,0.1)" : "var(--surface-alt)", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: "13px" }}>{call.strike}</td>
                  {[put.iv, put.bid.toFixed(2), put.ask.toFixed(2), put.oi.toLocaleString(), put.delta.toFixed(2)].map((v, j) => (
                    <td key={j} onClick={() => setSelectedRow({ type: "put", strike: call.strike, delta: put.delta, iv: put.iv, bid: put.bid, ask: put.ask })} style={{ padding: "10px 10px", textAlign: "left", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: j === 4 ? "var(--danger)" : "var(--text-main)" }}>{v}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedRow && (
        <div className="animate-fade-in" style={{ marginTop: "20px", padding: "20px 24px", background: "var(--surface-alt)", borderRadius: "12px", borderLeft: "4px solid var(--accent)" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 600, marginBottom: "10px" }}>
            {ticker} ${selectedRow.strike} {selectedRow.type.toUpperCase()} — Reading the Numbers
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
            <div><strong style={{ color: "var(--text-main)" }}>Delta ({selectedRow.delta.toFixed(2)}):</strong> This option moves approximately ${Math.abs(selectedRow.delta).toFixed(2)} for every $1 move in {ticker}. It also approximates a {Math.abs(Math.round(selectedRow.delta * 100))}% probability of expiring in the money.</div>
            <div><strong style={{ color: "var(--text-main)" }}>IV ({selectedRow.iv}):</strong> The market is pricing in this annualized level of volatility for this strike. Compared to ATM, this tells you about the volatility skew in the market.</div>
            <div><strong style={{ color: "var(--text-main)" }}>Bid/Ask (${selectedRow.bid.toFixed(2)} / ${selectedRow.ask.toFixed(2)}):</strong> The spread is ${(selectedRow.ask - selectedRow.bid).toFixed(2)}. Use a limit order at the midpoint (${((selectedRow.bid + selectedRow.ask) / 2).toFixed(2)}) to minimize transaction cost.</div>
          </div>
          <button onClick={() => setSelectedRow(null)} style={{ marginTop: "14px", fontSize: "12px", background: "none", border: "none", color: "var(--text-soft)", cursor: "pointer" }}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

// ─── Greek Visualizer ─────────────────────────────────────────────────────────
function GreekVisualizer() {
  const [priceDelta, setPriceDelta] = useState(0); // -50 to +50
  const [daysElapsed, setDaysElapsed] = useState(0); // 0 to 30
  const [ivChange, setIvChange] = useState(0); // -30 to +30

  // Mock ATM call starting values
  const base = { delta: 0.50, gamma: 0.025, theta: -0.08, vega: 0.18, price: 5.00 };

  const delta = Math.max(0.01, Math.min(0.99, base.delta + priceDelta * 0.01));
  const theta = base.theta - daysElapsed * 0.002;
  const vega = base.vega + ivChange * 0.003;
  const priceEffect = priceDelta * base.delta + (priceDelta * priceDelta * base.gamma * 0.5);
  const timeEffect = daysElapsed * base.theta;
  const ivEffect = ivChange * base.vega;
  const estimatedPrice = Math.max(0.01, base.price + priceEffect + timeEffect + ivEffect);

  return (
    <div>
      <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "20px", lineHeight: 1.6 }}>
        Adjust the sliders below to see how Delta, Theta, and Vega affect a hypothetical at-the-money SPY call option. 
        Starting assumptions: SPY at-the-money call, 30 days to expiration, base price $5.00.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Sliders */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {[
            { label: "Stock Price Change", sublabel: `${priceDelta >= 0 ? "+" : ""}$${priceDelta}`, value: priceDelta, setter: setPriceDelta, min: -20, max: 20, color: priceDelta >= 0 ? "var(--success)" : "var(--danger)" },
            { label: "Days Elapsed", sublabel: `${daysElapsed} days later`, value: daysElapsed, setter: setDaysElapsed, min: 0, max: 25, color: "var(--warning)" },
            { label: "IV Change", sublabel: `${ivChange >= 0 ? "+" : ""}${ivChange}%`, value: ivChange, setter: setIvChange, min: -20, max: 20, color: ivChange >= 0 ? "var(--success)" : "var(--danger)" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)" }}>{s.label}</label>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", fontWeight: 600, color: s.color }}>{s.sublabel}</span>
              </div>
              <input type="range" min={s.min} max={s.max} value={s.value} onChange={(e) => s.setter(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--accent)" }} />
            </div>
          ))}
          <button onClick={() => { setPriceDelta(0); setDaysElapsed(0); setIvChange(0); }} className="btn-secondary" style={{ fontSize: "12px", padding: "8px 16px", width: "fit-content" }}>Reset</button>
        </div>

        {/* Results */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ padding: "20px", background: "var(--surface-alt)", borderRadius: "14px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)", marginBottom: "8px" }}>Estimated Option Price</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "32px", fontWeight: 600, color: estimatedPrice > base.price ? "var(--success)" : estimatedPrice < base.price ? "var(--danger)" : "var(--text-main)" }}>
              ${estimatedPrice.toFixed(2)}
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: "var(--text-soft)", marginTop: "4px" }}>
              {((estimatedPrice - base.price) >= 0 ? "+" : "")}${(estimatedPrice - base.price).toFixed(2)} from entry
            </div>
          </div>
          {[
            { label: "Delta", value: delta.toFixed(2), desc: `Option moves $${delta.toFixed(2)} per $1 stock move` },
            { label: "Theta Effect", value: `${timeEffect.toFixed(2)}`, desc: `Time decay after ${daysElapsed}d`, color: "var(--warning)" },
            { label: "Vega Effect", value: `${ivEffect >= 0 ? "+" : ""}${ivEffect.toFixed(2)}`, desc: `From ${ivChange}% IV change`, color: ivEffect >= 0 ? "var(--success)" : "var(--danger)" },
          ].map((g) => (
            <div key={g.label} style={{ padding: "14px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{g.label}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{g.desc}</div>
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "18px", fontWeight: 600, color: g.color || "var(--text-main)" }}>{g.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Risk Calculator ─────────────────────────────────────────────────────────
function RiskCalculator() {
  const [accountSize, setAccountSize] = useState("25000");
  const [riskPercent, setRiskPercent] = useState("1");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopPrice, setStopPrice] = useState("");

  const acct = parseFloat(accountSize) || 0;
  const riskPct = parseFloat(riskPercent) || 1;
  const entry = parseFloat(entryPrice) || 0;
  const stop = parseFloat(stopPrice) || 0;

  const maxDollarRisk = acct * (riskPct / 100);
  const riskPerShare = entry > 0 && stop > 0 ? Math.abs(entry - stop) : 0;
  const suggestedShares = riskPerShare > 0 ? Math.floor(maxDollarRisk / riskPerShare) : 0;
  const suggestedContracts = riskPerShare > 0 ? Math.floor(maxDollarRisk / (riskPerShare * 100)) : 0;

  return (
    <div>
      <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "20px", lineHeight: 1.6 }}>
        Enter your account size, acceptable risk percentage, and trade parameters to calculate your proper position size.
        This enforces the 1% rule and helps you never risk more than your plan allows.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { label: "Account Size", placeholder: "25000", value: accountSize, setter: setAccountSize, prefix: "$" },
            { label: "Risk Per Trade (%)", placeholder: "1", value: riskPercent, setter: setRiskPercent, suffix: "%" },
            { label: "Entry Price", placeholder: "4.50", value: entryPrice, setter: setEntryPrice, prefix: "$" },
            { label: "Stop Price (premium stop)", placeholder: "2.25", value: stopPrice, setter: setStopPrice, prefix: "$" },
          ].map((f) => (
            <div key={f.label}>
              <label style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-soft)", display: "block", marginBottom: "5px" }}>{f.label}</label>
              <div style={{ position: "relative" }}>
                {f.prefix && <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontFamily: "'IBM Plex Mono', monospace", color: "var(--text-soft)" }}>{f.prefix}</span>}
                <input type="number" placeholder={f.placeholder} value={f.value} onChange={(e) => f.setter(e.target.value)} style={{ width: "100%", padding: `10px ${f.suffix ? "32px" : "14px"} 10px ${f.prefix ? "28px" : "14px"}`, border: "1.5px solid var(--border)", borderRadius: "10px", background: "var(--background)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "15px", color: "var(--text-main)", outline: "none" }} />
                {f.suffix && <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", fontFamily: "'IBM Plex Mono', monospace", color: "var(--text-soft)" }}>{f.suffix}</span>}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ padding: "20px", background: "var(--text-main)", borderRadius: "14px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(253,251,247,0.5)", marginBottom: "8px" }}>Max Dollars at Risk</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "32px", fontWeight: 600, color: "var(--accent)" }}>${maxDollarRisk.toFixed(0)}</div>
            <div style={{ fontSize: "12px", color: "rgba(253,251,247,0.5)", marginTop: "4px" }}>{riskPct}% of ${acct.toLocaleString()}</div>
          </div>
          <div className="card" style={{ padding: "18px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-soft)", marginBottom: "6px" }}>Risk Per Share/Contract</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "22px", fontWeight: 600 }}>${riskPerShare.toFixed(2)}</div>
          </div>
          <div className="card" style={{ padding: "18px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-soft)", marginBottom: "4px" }}>Suggested Position</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "20px", fontWeight: 600, color: "var(--success)", marginBottom: "2px" }}>{suggestedContracts > 0 ? `${suggestedContracts} contracts` : "—"}</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{suggestedShares > 0 ? `${suggestedShares} shares if stock position` : "Enter entry & stop price"}</div>
          </div>
          <div style={{ padding: "14px", background: "rgba(181,138,60,0.06)", borderRadius: "10px", border: "1px solid rgba(181,138,60,0.15)" }}>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
              Never risk more than 1% of your account on a single trade. Even 10 consecutive losses at 1% = only a 10% drawdown. Recoverable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Lab modules ─────────────────────────────────────────────────────────────
const modules = [
  { id: "chain", label: "Options Chain Reader", icon: "◫", difficulty: "Beginner", available: true },
  { id: "greeks", label: "Greek Visualizer", icon: "Δ", difficulty: "Intermediate", available: true },
  { id: "risk", label: "Risk Calculator", icon: "◈", difficulty: "Beginner", available: true },
  { id: "volatility", label: "Volatility Lab", icon: "⬡", difficulty: "Intermediate", available: false },
  { id: "earnings", label: "Earnings Lab", icon: "◉", difficulty: "Advanced", available: false },
  { id: "replay", label: "Chart Pattern Replay", icon: "◇", difficulty: "Advanced", available: false },
];

const difficultyColors: Record<string, string> = { Beginner: "var(--success)", Intermediate: "var(--warning)", Advanced: "var(--danger)" };

export default function LabPage() {
  const [activeModule, setActiveModule] = useState("chain");

  return (
    <AppShell>
      <PageHeader title="Market Lab" subtitle="Isolated training drills. Master each tool before using it in the market." />

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "24px", alignItems: "start" }}>
        {/* Module list */}
        <div>
          <SectionHeader title="Modules" />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {modules.map((mod) => {
              const isActive = mod.id === activeModule;
              const dc = difficultyColors[mod.difficulty];
              return (
                <button
                  key={mod.id}
                  onClick={() => mod.available && setActiveModule(mod.id)}
                  style={{ padding: "12px 14px", borderRadius: "10px", border: `1px solid ${isActive ? "var(--accent)" : "var(--border)"}`, background: isActive ? "rgba(181,138,60,0.08)" : "var(--surface)", textAlign: "left", cursor: mod.available ? "pointer" : "default", opacity: mod.available ? 1 : 0.5 }}
                >
                  <div style={{ fontSize: "18px", color: isActive ? "var(--accent)" : "var(--text-soft)", marginBottom: "4px", fontFamily: "'IBM Plex Mono', monospace" }}>{mod.icon}</div>
                  <div style={{ fontSize: "12px", fontWeight: isActive ? 600 : 400, color: isActive ? "var(--accent)" : "var(--text-main)", marginBottom: "3px", lineHeight: 1.3 }}>{mod.label}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "10px", color: dc, fontWeight: 700 }}>{mod.difficulty}</span>
                    {!mod.available && <span style={{ fontSize: "10px", color: "var(--text-soft)" }}>Phase 2</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active module */}
        <div className="card" style={{ padding: "32px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 600, margin: "0 0 4px" }}>
              {modules.find((m) => m.id === activeModule)?.label}
            </h2>
            <span style={{ fontSize: "11px", color: difficultyColors[modules.find((m) => m.id === activeModule)?.difficulty ?? "Beginner"], fontWeight: 700 }}>
              {modules.find((m) => m.id === activeModule)?.difficulty}
            </span>
          </div>
          {activeModule === "chain" && <OptionsChainModule />}
          {activeModule === "greeks" && <GreekVisualizer />}
          {activeModule === "risk" && <RiskCalculator />}
        </div>
      </div>
    </AppShell>
  );
}
