"use client";

import { usePathname } from "next/navigation";
import { traderProfile } from "@/lib/mockData";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/courses": "Curriculum",
  "/lab": "Market Lab",
  "/simulator": "Simulator",
  "/trading-desk": "Trading Desk",
  "/journal": "Journal",
  "/coach": "Professor",
  "/profile": "Profile",
};

export default function TopBar() {
  const pathname = usePathname();

  let pageTitle = "Trade School";
  for (const [path, title] of Object.entries(pageTitles)) {
    if (pathname.startsWith(path)) {
      pageTitle = title;
      break;
    }
  }
  if (pathname.startsWith("/lessons/")) pageTitle = "Lessons";

  return (
    <header
      style={{
        height: "64px",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, color: "var(--text-main)" }}>
        {pageTitle}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>Rank</span>
          <span style={{ fontSize: "13px", color: "var(--accent)", fontWeight: 600 }}>{traderProfile.rank}</span>
        </div>
        <div
          style={{
            width: "1px",
            height: "20px",
            background: "var(--border)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>Paper</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", color: "var(--text-main)", fontWeight: 600 }}>
            ${traderProfile.paperAccountBalance.toLocaleString()}
          </span>
        </div>
        <div style={{ width: "1px", height: "20px", background: "var(--border)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "14px" }}>🔥</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: "var(--text-main)", fontWeight: 600 }}>
            {traderProfile.studyStreak}
          </span>
          <span style={{ fontSize: "11px", color: "var(--text-soft)" }}>day streak</span>
        </div>
      </div>
    </header>
  );
}
