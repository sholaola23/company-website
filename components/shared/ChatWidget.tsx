"use client";

/**
 * ChatWidget — floating AI assistant available on all pages.
 *
 * Usage: mounted once in app/layout.tsx via dynamic import (ssr: false).
 * Sessions are persisted to sessionStorage key `oc_chat_messages`.
 *
 * Example:
 *   import dynamic from "next/dynamic";
 *   const ChatWidget = dynamic(() => import("@/components/shared/ChatWidget"), { ssr: false });
 *   // Then: <ChatWidget />
 */

import { useEffect, useRef, useState, useCallback, KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { trackChatOpened, trackChatMessageSent } from "@/lib/analytics";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SESSION_KEY = "oc_chat_messages";

const INITIAL_MESSAGE: Message = {
  id: "init",
  role: "assistant",
  content:
    "Hi! I'm the Oladipupo Consulting AI assistant. I can help with questions about our services, pricing, or figuring out if AI automation is right for your business. What can I help with?",
};

function generateId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2 }}
      className="mr-auto max-w-[80%]"
    >
      <div className="bg-zinc-800 text-zinc-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-zinc-400"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={isUser ? "ml-auto max-w-[80%]" : "mr-auto max-w-[80%]"}
    >
      <div
        className={
          isUser
            ? "bg-blue-500 text-white rounded-2xl rounded-br-md px-3 py-2.5 text-sm leading-relaxed"
            : "bg-zinc-800 text-zinc-100 rounded-2xl rounded-bl-md px-3 py-2.5 text-sm leading-relaxed"
        }
      >
        {message.content}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingIdRef = useRef<string | null>(null);
  // Tracks whether chat_opened has been fired this session (fire once per session)
  const chatOpenTrackedRef = useRef(false);

  // ── Rehydrate from sessionStorage on mount ──────────────────────────────────
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed: Message[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch {
      // Ignore parse errors — fall through to initial message
    }
    // First visit: show notification dot
    setShowNotification(true);
  }, []);

  // ── Persist messages to sessionStorage ─────────────────────────────────────
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
    } catch {
      // Storage quota exceeded or private mode — silently ignore
    }
  }, [messages]);

  // ── Auto-scroll to latest message ──────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  // ── Focus input when opening ────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setShowNotification(false);
      setTimeout(() => inputRef.current?.focus(), 100);
      // Fire once per session on first open
      if (!chatOpenTrackedRef.current) {
        chatOpenTrackedRef.current = true;
        trackChatOpened();
      }
    }
  }, [isOpen]);

  // ── Escape key closes widget ────────────────────────────────────────────────
  useEffect(() => {
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // ── Send message ────────────────────────────────────────────────────────────
  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: trimmed,
    };

    setInput("");
    setMessages((prev) => [...prev, userMessage]);
    trackChatMessageSent();
    setIsStreaming(true);

    // Build conversation payload — exclude the static initial message if it's
    // the only message, to keep the API call clean
    const history = [...messages, userMessage].map(({ role, content }) => ({
      role,
      content,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      // ── Non-streaming fallback (error / rate limit) ───────────────────────
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("text/event-stream")) {
        const data = await res.json();
        const fallbackText =
          data.text ||
          data.error ||
          "Something went wrong. Please try again.";
        setMessages((prev) => [
          ...prev,
          { id: generateId(), role: "assistant", content: fallbackText },
        ]);
        setIsStreaming(false);
        return;
      }

      // ── Streaming path ────────────────────────────────────────────────────
      const assistantId = generateId();
      streamingIdRef.current = assistantId;
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6);
          if (payload === "[DONE]") break;
          try {
            const parsed = JSON.parse(payload);
            if (parsed.text) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + parsed.text }
                    : m
                )
              );
            }
          } catch {
            // Ignore malformed chunks
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content:
            "I lost connection for a moment. Please try again, or reach us at hello@oladipupoconsulting.co.uk",
        },
      ]);
    } finally {
      setIsStreaming(false);
      streamingIdRef.current = null;
    }
  }, [input, isStreaming, messages]);

  // ── Handle Enter key in textarea ────────────────────────────────────────────
  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Chat window ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            role="dialog"
            aria-label="Chat with our AI assistant"
            aria-modal="true"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={[
              // Desktop
              "fixed z-50",
              "sm:bottom-24 sm:right-6 sm:w-[380px] sm:h-[520px]",
              "sm:rounded-2xl sm:inset-x-auto sm:top-auto",
              // Mobile — sheet from bottom
              "inset-x-0 bottom-0 h-[85vh]",
              "rounded-t-2xl rounded-b-none",
              // Common
              "bg-zinc-900 border border-zinc-800",
              "flex flex-col overflow-hidden",
              "shadow-2xl",
            ].join(" ")}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
                </span>
                <span className="text-sm font-semibold text-zinc-100">
                  AI Assistant
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              <AnimatePresence>
                {isStreaming &&
                  streamingIdRef.current === null && (
                    <TypingIndicator />
                  )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-zinc-800 p-3 flex-shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  rows={1}
                  disabled={isStreaming}
                  aria-label="Message input"
                  className={[
                    "flex-1 resize-none bg-zinc-800 border border-zinc-700 rounded-xl",
                    "px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500",
                    "focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
                    "transition-colors max-h-32 leading-relaxed",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                  ].join(" ")}
                  style={{ fieldSizing: "content" } as React.CSSProperties}
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={!input.trim() || isStreaming}
                  aria-label="Send message"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={[
                    "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center",
                    "bg-blue-500 text-white transition-all",
                    "disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100",
                    "hover:bg-blue-400",
                  ].join(" ")}
                >
                  <ArrowUp size={16} />
                </motion.button>
              </div>
              <p className="text-[11px] text-zinc-600 mt-2 text-center">
                Shift+Enter for new line
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button (hidden on mobile when chat is open) ──────────── */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open AI assistant chat"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className={[
          "fixed z-40 bottom-6 right-6",
          "sm:bottom-6 sm:right-6",
          "bottom-4 right-4",
          isOpen ? "hidden sm:flex" : "",
          "w-14 h-14 rounded-full",
          "bg-blue-500 text-white shadow-lg shadow-blue-500/25",
          "flex items-center justify-center",
          "transition-colors hover:bg-blue-400",
          // Pulse ring
          "ring-2 ring-blue-500/30",
          isOpen ? "" : "animate-pulse-ring",
        ].join(" ")}
        style={{
          // Manual pulse ring so we don't pollute Tailwind config
          boxShadow: isOpen
            ? "0 8px 32px rgba(59,130,246,0.35)"
            : "0 8px 32px rgba(59,130,246,0.35), 0 0 0 6px rgba(59,130,246,0.1)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Notification dot — shown on first visit until opened */}
        <AnimatePresence>
          {showNotification && !isOpen && (
            <motion.span
              key="dot"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-400 border-2 border-zinc-900" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
