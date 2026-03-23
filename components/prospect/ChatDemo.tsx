"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  text: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  text: "Hey! Welcome to UWA. I'm here to help you find the right products for your hair. What are you looking for today?",
};

// Fallback responses used when the API is unavailable
const DEMO_RESPONSES: Record<string, string> = {
  default:
    "Great question! I'd love to help. For the most personalised recommendation, could you tell me a little about your hair type and what you're hoping to achieve?",
  oil: "Our Yangu Rooted Hair Oil is one of our bestsellers — it's lightweight, silicone-free, and locks in moisture without weighing your hair down. Would you like to know more about ingredients or how to use it?",
  "4c": "For 4C hair, we'd recommend the Yangu Rooted Hair Oil for moisture sealing and the Flourishing Follicles Serum for scalp stimulation. Together they strengthen and protect beautifully.",
  pregnancy:
    "All our products are formulated with carefully selected natural ingredients. That said, we always recommend checking with your healthcare provider during pregnancy. Would you like me to list the full ingredients for any specific product?",
  shipping:
    "We offer FREE UK shipping on all orders via Royal Mail tracked service — delivery in 24-48 hours. International shipping is also available, with free shipping on orders over $60 USD.",
  order:
    "You can track your order using the Royal Mail tracking info sent with your dispatch confirmation. For any issues, contact UWA support at hello@uwaworld.com.",
};

function getFallbackResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("oil") || lower.includes("yangu") || lower.includes("marula"))
    return DEMO_RESPONSES["oil"];
  if (lower.includes("4c") || lower.includes("4 c")) return DEMO_RESPONSES["4c"];
  if (lower.includes("pregnan")) return DEMO_RESPONSES["pregnancy"];
  if (lower.includes("ship") || lower.includes("deliver"))
    return DEMO_RESPONSES["shipping"];
  if (lower.includes("order") || lower.includes("track"))
    return DEMO_RESPONSES["order"];
  return DEMO_RESPONSES["default"];
}

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = useCallback(
    async (e: React.FormEvent) => {
      // FIX 1: Prevent form submission from navigating the page
      e.preventDefault();
      e.stopPropagation();

      const text = input.trim();
      if (!text || typing) return;

      setInput("");
      setMessages((prev) => [...prev, { role: "user", text }]);
      setTyping(true);

      // Build conversation history for context (exclude the initial greeting)
      const history = messages
        .filter((_, i) => i > 0) // skip initial assistant greeting
        .map((m) => ({ role: m.role, content: m.text }));

      try {
        const res = await fetch("/api/prospect/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history }),
        });

        if (!res.ok) throw new Error(`API ${res.status}`);

        const data = await res.json();
        const reply = data.reply;

        if (!reply) throw new Error("Empty reply");

        setTyping(false);
        setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      } catch {
        // Fallback to hardcoded responses if API fails
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: getFallbackResponse(text) },
        ]);
      }
    },
    [input, typing, messages]
  );

  return (
    <div className="w-full max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-50">UWA Assistant</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs text-zinc-500">Online — ready to help</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-3 p-4 h-80 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-zinc-800 text-zinc-100 rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input — action="#" prevents native form navigation as a belt-and-suspenders fix */}
      <form
        action="#"
        onSubmit={sendMessage}
        className="flex items-center gap-2 px-3 py-3 border-t border-zinc-800 bg-zinc-900"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about products, ingredients, shipping..."
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-all"
          aria-label="Chat message"
        />
        <button
          type="submit"
          disabled={!input.trim() || typing}
          className="w-9 h-9 flex-shrink-0 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all"
          aria-label="Send message"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </form>
    </div>
  );
}
