"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { traderProfile } from "@/lib/mockData";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "◈" },
  { label: "Courses", href: "/courses", icon: "◎" },
  { label: "Lessons", href: "/lessons/what-is-an-option", icon: "◇" },
  { label: "Market Lab", href: "/lab", icon: "⬡" },
  { label: "Simulator", href: "/simulator", icon: "◉" },
  { label: "Trading Desk", href: "/trading-desk", icon: "◫" },
  { label: "Journal", href: "/journal", icon: "◧" },
  { label: "Professor", href: "/coach", icon: "◬" },
  { label: "Profile", href: "/profile", icon: "◯" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "32px 24px 24px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "var(--text-main)", letterSpacing: "0.02em" }}>
            Trade School
          </div>
          <div style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginTop: "2px" }}>
            Learn. Practice. Execute.
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href.split("/").slice(0, 2).join("/")));
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "10px",
                marginBottom: "2px",
                textDecoration: "none",
                background: isActive ? "rgba(181,138,60,0.1)" : "transparent",
                color: isActive ? "var(--accent)" : "var(--text-muted)",
                fontWeight: isActive ? 600 : 400,
                fontSize: "14px",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
            >
              <span style={{ fontSize: "16px", lineHeight: 1 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Profile snippet */}
      <div
        style={{
          padding: "20px 24px",
          borderTop: "1px solid var(--border)",
          background: "var(--background)",
        }}
      >
        <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-main)", marginBottom: "2px" }}>
          {traderProfile.name}
        </div>
        <div style={{ fontSize: "11px", color: "var(--accent)", marginBottom: "8px" }}>
          {traderProfile.rank}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-soft)" }}>🔥</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--text-soft)" }}>
            {traderProfile.studyStreak}-day streak
          </span>
        </div>
      </div>
    </aside>
  );
}
