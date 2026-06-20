"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileItems = [
  { label: "Learn", href: "/courses", icon: "◎" },
  { label: "Lab", href: "/lab", icon: "⬡" },
  { label: "Trade", href: "/trading-desk", icon: "◉" },
  { label: "Journal", href: "/journal", icon: "◧" },
  { label: "Coach", href: "/coach", icon: "◬" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        zIndex: 200,
        padding: "4px 0 env(safe-area-inset-bottom, 4px)",
      }}
    >
      {mobileItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              padding: "10px 4px",
              textDecoration: "none",
              color: isActive ? "var(--accent)" : "var(--text-soft)",
            }}
          >
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            <span style={{ fontSize: "10px", fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
