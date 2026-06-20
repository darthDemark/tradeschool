"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { useTradeSchoolStore } from "@/lib/store";
import type { ProfessorMessage } from "@/lib/types";

const suggestedQuestions = [
  "When should I sell options instead of buying them?",
  "How do I size my positions correctly?",
  "What is the most common mistake beginners make?",
  "Explain theta decay in simple terms.",
  "How should I think about earnings trades?",
  "What is implied volatility rank?",
  "How do I build a repeatable trading system?",
  "When is 'no trade' the right answer?",
];

function ChatInterface() {
  const searchParams = useSearchParams();
  const lessonContext = searchParams.get("lesson");
  const store = useTradeSchoolStore();
  const [input, setInput] = useState(lessonContext ? `I have a question about the lesson: "${lessonContext}". ` : "");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [store.professorMessages, isTyping]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isTyping) return;

    const userMsg: ProfessorMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    store.addProfessorMessage(userMsg);
    setInput("");
    setIsTyping(true);

    try {
      // Build conversation history for context
      const history = store.professorMessages.slice(-10).map((m) => ({
        role: m.role === "professor" ? "assistant" : "user",
        content: m.content,
      }));

      const res = await fetch("/api/professor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          context: {
            userLevel: store.getRank(),
            currentLesson: lessonContext ?? undefined,
            recentTrades: store.closedTrades.slice(-3),
          },
          history,
        }),
      });
      const data = await res.json();

      const profMsg: ProfessorMessage = {
        id: crypto.randomUUID(),
        role: "professor",
        content: data.response ?? "I am unable to respond at this time. Please try again.",
        timestamp: new Date().toISOString(),
      };
      store.addProfessorMessage(profMsg);
    } catch {
      store.addProfessorMessage({
        id: crypto.randomUUID(),
        role: "professor",
        content: "I am experiencing a connection issue. Please try again in a moment.",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: "28px", alignItems: "start" }}>
      <div>
        {/* Professor card */}
        <div className="card" style={{ padding: "22px 26px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "var(--text-main)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>P</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, marginBottom: "3px" }}>Professor</div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
              Your AI trading mentor. Ask about options, risk, psychology, trade review, or market mechanics.
            </p>
          </div>
          <div style={{ marginLeft: "auto", flexShrink: 0 }}>
            <span className="badge badge-gold">
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? "AI Connected" : "Mock Mode"}
            </span>
          </div>
        </div>

        {/* Message thread */}
        <div style={{ minHeight: "420px", maxHeight: "520px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "18px", padding: "24px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "18px", marginBottom: "14px" }}>
          {store.professorMessages.map((msg) => {
            const isProfessor = msg.role === "professor";
            return (
              <div key={msg.id} style={{ display: "flex", flexDirection: isProfessor ? "row" : "row-reverse", gap: "12px", alignItems: "flex-start", maxWidth: "88%", marginLeft: isProfessor ? 0 : "auto" }}>
                {isProfessor && (
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--text-main)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>P</div>
                )}
                <div style={{ background: isProfessor ? "var(--surface-alt)" : "var(--text-main)", color: isProfessor ? "var(--text-main)" : "var(--surface)", border: isProfessor ? "1px solid var(--border)" : "none", borderRadius: isProfessor ? "4px 16px 16px 16px" : "16px 4px 16px 16px", padding: "14px 18px" }}>
                  {isProfessor && <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "6px" }}>Professor</div>}
                  <p style={{ fontSize: "14px", lineHeight: 1.75, margin: 0, whiteSpace: "pre-line" }}>{msg.content}</p>
                  <div style={{ fontSize: "10px", color: isProfessor ? "var(--text-soft)" : "rgba(255,255,255,0.4)", marginTop: "6px" }}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--text-main)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>P</div>
              <div style={{ background: "var(--surface-alt)", border: "1px solid var(--border)", borderRadius: "4px 16px 16px 16px", padding: "14px 20px" }}>
                <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--text-soft)", animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                  <style>{`@keyframes pulse { 0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)} }`}</style>
                </div>
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
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            style={{ flex: 1, padding: "13px 18px", border: "1.5px solid var(--border)", borderRadius: "999px", background: "var(--surface)", fontSize: "14px", color: "var(--text-main)", outline: "none", fontFamily: "inherit" }}
          />
          <button onClick={() => sendMessage()} disabled={!input.trim() || isTyping} className="btn-primary" style={{ borderRadius: "999px", padding: "13px 24px", opacity: !input.trim() || isTyping ? 0.5 : 1 }}>
            Send
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "14px" }}>
        <div className="card" style={{ padding: "20px" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: 600, margin: "0 0 12px" }}>Questions to Ask</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {suggestedQuestions.map((q) => (
              <button key={q} onClick={() => sendMessage(q)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid var(--border)", background: "transparent", textAlign: "left", fontSize: "12px", color: "var(--text-muted)", cursor: "pointer", lineHeight: 1.4, transition: "all 0.15s ease" }}>
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: "20px" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: 600, margin: "0 0 12px" }}>Session Context</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { label: "Rank", value: store.getRank() },
              { label: "Lessons Done", value: `${store.completedLessons.length}` },
              { label: "Open Trades", value: `${store.openTrades.length}` },
              { label: "Journal Entries", value: `${store.journalEntries.length}` },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "12px", color: "var(--text-soft)" }}>{item.label}</span>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-main)" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "14px 16px", background: "var(--surface-alt)", borderRadius: "12px", border: "1px solid var(--border)" }}>
          <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
            Professor does not provide personalized financial advice. All responses are educational. Add your OpenAI API key to enable AI-powered responses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CoachPage() {
  return (
    <AppShell>
      <PageHeader title="Professor" subtitle="Your AI trading coach. Ask anything about options, risk, or your trades." />
      <Suspense fallback={<div>Loading...</div>}>
        <ChatInterface />
      </Suspense>
    </AppShell>
  );
}
