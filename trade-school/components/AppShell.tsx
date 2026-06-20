"use client";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import MobileNav from "./MobileNav";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--background)" }}>
      {/* Desktop Sidebar */}
      <div style={{ display: "none" }} className="sidebar-desktop">
        <Sidebar />
      </div>

      <style>{`
        @media (min-width: 768px) {
          .sidebar-desktop { display: block !important; }
          .main-content { margin-left: 240px !important; }
          .mobile-nav { display: none !important; }
        }
        @media (max-width: 767px) {
          .main-content { padding-bottom: 80px !important; }
        }
      `}</style>

      {/* Main content */}
      <div
        className="main-content"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          minWidth: 0,
        }}
      >
        <TopBar />
        <main
          style={{
            flex: 1,
            padding: "clamp(24px, 4vw, 48px)",
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          {children}
        </main>
      </div>

      {/* Mobile nav */}
      <div className="mobile-nav">
        <MobileNav />
      </div>
    </div>
  );
}
