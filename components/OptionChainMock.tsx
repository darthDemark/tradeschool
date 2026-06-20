import { optionChainMock } from "@/lib/mockData";

export default function OptionChainMock() {
  const { ticker, currentPrice, expiration, calls, puts } = optionChainMock;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "22px", fontWeight: 600 }}>{ticker}</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "16px", color: "var(--text-muted)", marginLeft: "12px" }}>
            ${currentPrice}
          </span>
        </div>
        <span className="badge badge-muted">Exp: {expiration}</span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border)" }}>
              <th colSpan={5} style={{ padding: "8px 12px", textAlign: "center", color: "var(--success)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                CALLS
              </th>
              <th style={{ padding: "8px 12px", textAlign: "center", background: "var(--surface-alt)", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
                STRIKE
              </th>
              <th colSpan={5} style={{ padding: "8px 12px", textAlign: "center", color: "var(--danger)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                PUTS
              </th>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Delta", "OI", "Bid", "Ask", "Last"].map((h) => (
                <th key={h} style={{ padding: "8px 12px", textAlign: "right", color: "var(--text-soft)", fontWeight: 600, fontSize: "11px" }}>{h}</th>
              ))}
              <th style={{ padding: "8px 12px", textAlign: "center", background: "var(--surface-alt)", fontWeight: 700, fontSize: "11px" }}>$</th>
              {["Last", "Ask", "Bid", "OI", "Delta"].map((h) => (
                <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "var(--text-soft)", fontWeight: 600, fontSize: "11px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calls.map((call, i) => {
              const put = puts[i];
              const isAtm = Math.abs(call.strike - currentPrice) < 5;
              return (
                <tr
                  key={call.strike}
                  style={{
                    borderBottom: "1px solid var(--border)",
                    background: isAtm ? "rgba(181,138,60,0.05)" : "transparent",
                  }}
                >
                  <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--success)" }}>
                    {call.delta.toFixed(2)}
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px" }}>
                    {call.oi.toLocaleString()}
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px" }}>
                    {call.bid.toFixed(2)}
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px" }}>
                    {call.ask.toFixed(2)}
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", fontWeight: 600 }}>
                    {call.last.toFixed(2)}
                  </td>

                  <td style={{ padding: "10px 16px", textAlign: "center", background: isAtm ? "rgba(181,138,60,0.1)" : "var(--surface-alt)", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: "13px" }}>
                    {call.strike}
                  </td>

                  <td style={{ padding: "10px 12px", textAlign: "left", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", fontWeight: 600 }}>
                    {put.last.toFixed(2)}
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "left", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px" }}>
                    {put.ask.toFixed(2)}
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "left", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px" }}>
                    {put.bid.toFixed(2)}
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "left", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px" }}>
                    {put.oi.toLocaleString()}
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "left", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--danger)" }}>
                    {put.delta.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
