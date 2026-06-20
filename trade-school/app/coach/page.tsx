"use client";

import { useState, useRef, useEffect } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import CoachMessage from "@/components/CoachMessage";
import { professorMessages, traderProfile } from "@/lib/mockData";

type Message = {
  id: string;
  role: "professor" | "user";
  content: string;
  timestamp: string;
};

const mockResponses = [
  "That is a good question. When implied volatility is elevated — above the 50th percentile of its historical range — option premiums are expensive. In those conditions, selling premium often has a statistical edge over buying it. However, risk management and position sizing remain the most important variables regardless of direction.",
  "The goal of journaling is not to grade yourself emotionally. It is to build a database of your decisions over a large sample size. After 50 trades, patterns emerge that are impossible to see in the moment. Trust the process of documentation.",
  "A rule violation is not a catastrophic failure. It is data. The important question is: what was the thought process that led you to override your rule? Identifying that trigger is the real lesson.",
  "Delta measures how much an option's price moves per $1 move in the underlying. A 0.50 delta call will move approximately $0.50 for every $1 the stock moves. This changes constantly — which is why Gamma matters. Gamma measures the rate of change of Delta.",
  "Never size a position based on how confident you feel. Confidence and accuracy are not correlated in trading. Size every position based on your maximum acceptable loss. If you follow that rule consistently, no single trade can damage your account meaningfully.",
];

let responseIndex = 0;

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>(
    professorMessages.map((m) => ({ ...m, role: m.role as "professor" | "user" }))
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate professor response
    setTimeout(() => {
      const response = mockResponses[responseIndex % mockResponses.length];
      responseIndex++;
      const profMsg: Message = {
        id: `prof-${Date.now()}`,
        role: "professor",
        content: response,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, profMsg]);
      setIsTyping(false);
    }, 1800);
  };

  const suggestedQuestions = [
    "When should I sell options instead of buy them?",
    "How do I size my positions correctly?",
    "What is the most common mistake beginners make?",
    "Explain theta decay to me.",
    "How should I think about earnings trades?",
  ];

  return (
    <AppShell>
      <PageHeader
        title="Professor"
        subtitle="Your AI trading coach. Ask anything about trades, concepts, or your habits."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "32px", alignItems: "start" }}>

        {/* Chat area */}
        <div>
          {/* Professor identity card */}
          <div
            className="card"
            style={{
              padding: "24px 28px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "var(--text-main)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Playfair Display', serif",
              fontSize: "24px",
              fontWeight: 700,
              color: "var(--surface)",
              flexShrink: 0,
            }}>
              P
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, color: "var(--text-main)", marginBottom: "4px" }}>
                Professor
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                Your AI trading coach. Trained on market structure, options theory, risk management, and trading psychology.
              </p>
            </div>
            <div style={{ marginLeft: "auto", flexShrink: 0 }}>
              <span className="badge badge-gold">AI Integration · Phase 2</span>
            </div>
          </div>

          {/* Message thread */}
          <div
            style={{
              minHeight: "400px",
              maxHeight: "500px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "24px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "18px",
              marginBottom: "16px",
            }}
          >
            {messages.map((msg) => (
              <CoachMessage key={msg.id} {...msg} />
            ))}
            {isTyping && (
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%", background: "var(--text-main)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "var(--surface)", flexShrink: 0,
                }}>P</div>
                <div style={{ background: "var(--surface-alt)", border: "1px solid var(--border)", borderRadius: "4px 18px 18px 18px", padding: "16px 20px" }}>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: "6px", height: "6px", borderRadius: "50%", background: "var(--text-soft)",
                          animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                  <style>{`
                    @keyframes pulse {
                      0%, 100% { opacity: 0.3; transform: scale(0.8); }
                      50% { opacity: 1; transform: scale(1.2); }
                    }
                  `}</style>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Ask Professor about a trade, concept, or mistake..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{
                flex: 1,
                padding: "14px 18px",
                border: "1.5px solid var(--border)",
                borderRadius: "999px",
                background: "var(--surface)",
                fontSize: "14px",
                color: "var(--text-main)",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="btn-primary"
              style={{ borderRadius: "999px", padding: "14px 24px", opacity: !input.trim() ? 0.5 : 1 }}
            >
              Send
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Suggested questions */}
          <div className="card" style={{ padding: "22px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 600, margin: "0 0 14px" }}>
              Suggested Questions
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    textAlign: "left",
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    lineHeight: 1.4,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Session context */}
          <div className="card" style={{ padding: "22px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 600, margin: "0 0 14px" }}>
              Session Context
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Student", value: traderProfile.name },
                { label: "Rank", value: traderProfile.rank },
                { label: "Current Semester", value: "1 · Market Foundations" },
                { label: "Recent Trade", value: "SPY Call Spread" },
                { label: "Rule Violations", value: "1 (last 30 days)" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-soft)" }}>{item.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-main)", textAlign: "right" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI note */}
          <div style={{ padding: "16px", background: "var(--surface-alt)", borderRadius: "14px", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
              Professor is currently using placeholder responses. Real AI integration with your trade history and journal data comes in Phase 2.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
