"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Linkedin,
  CalendarDays,
  Sparkles,
  Send,
  Bot,
  MessageSquare,
  Clock,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import PasswordGate from "@/components/prospect/PasswordGate";

// ---------------------------------------------------------------------------
// Auth wrapper
// ---------------------------------------------------------------------------

export default function RangeBeautyPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/prospect/check?slug=range-beauty")
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-zinc-700 border-t-rose-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return (
      <PasswordGate
        slug="range-beauty"
        onAuthenticated={() => setAuthed(true)}
      />
    );
  }

  return <RangeBeautyContent />;
}

// ---------------------------------------------------------------------------
// Fade-in section wrapper
// ---------------------------------------------------------------------------

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ---------------------------------------------------------------------------
// Shade Matching Chatbot (Range Beauty-specific)
// ---------------------------------------------------------------------------

interface ChatMessage {
  role: "assistant" | "user";
  text: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  text: "Hey! I'm Range Beauty's Shade Matching Assistant. I'll help you find your perfect foundation match from our 21-shade range in under 60 seconds. Ready? Let's start — what's your skin type? (oily, dry, combination, or sensitive)",
};

const DEMO_RESPONSES: Record<string, string> = {
  default:
    "Great question! I'd love to help. Could you tell me a little about your skin type and what shade range you're looking for?",
  shade:
    "With 21 shades to choose from, I can definitely find your perfect match! Let's start — what's your skin type? (oily, dry, combination, or sensitive)",
  eczema:
    "Range Beauty was literally made for you! Alicia Scott founded the brand because of her own eczema struggles. All our products are clean, vegan, and formulated for reactive skin. Want me to help find your shade?",
  acne:
    "Our True Intentions Foundation is specifically designed for acne-prone skin — it won't clog pores and gives a natural, dewy finish. Let me help you find the right shade!",
  shipping:
    "For the most up-to-date shipping info, check rangebeauty.com or email info@rangebeauty.com. They ship across the US and internationally!",
};

function getFallbackResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("shade") || lower.includes("match") || lower.includes("foundation"))
    return DEMO_RESPONSES["shade"];
  if (lower.includes("eczema") || lower.includes("sensitive"))
    return DEMO_RESPONSES["eczema"];
  if (lower.includes("acne") || lower.includes("breakout"))
    return DEMO_RESPONSES["acne"];
  if (lower.includes("ship") || lower.includes("deliver"))
    return DEMO_RESPONSES["shipping"];
  return DEMO_RESPONSES["default"];
}

function RangeBeautyChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const text = input.trim();
      if (!text || typing) return;

      setInput("");
      setMessages((prev) => [...prev, { role: "user", text }]);
      setTyping(true);

      const history = messages
        .filter((_, i) => i > 0)
        .map((m) => ({ role: m.role, content: m.text }));

      try {
        const res = await fetch("/api/prospect/range-beauty-chat", {
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
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-50">Range Shade Finder</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs text-zinc-500">Online — ready to match</p>
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
              className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-rose-600 text-white rounded-br-sm"
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

      {/* Input */}
      <form
        action="#"
        onSubmit={sendMessage}
        className="flex items-center gap-2 px-3 py-3 border-t border-zinc-800 bg-zinc-900"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about shades, products, ingredients..."
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-rose-500 transition-all"
          aria-label="Chat message"
        />
        <button
          type="submit"
          disabled={!input.trim() || typing}
          className="w-9 h-9 flex-shrink-0 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all"
          aria-label="Send message"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main content
// ---------------------------------------------------------------------------

function RangeBeautyContent() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">

      {/* ------------------------------------------------------------------ */}
      {/* 1. Hero                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center px-5 py-24">
        {/* Gradient blobs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-rose-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-amber-600/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-rose-400 uppercase tracking-widest mb-6"
          >
            Built exclusively for Range Beauty
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-50 leading-tight tracking-tight mb-6"
          >
            Alicia, we built this for Range Beauty.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Your customers struggle to pick the right shade from 21 options. We built an AI that solves it in 60 seconds — and it already knows your entire product line.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { label: "AI Shade Matching Chatbot", colour: "text-rose-400", dot: "bg-rose-500" },
              { label: "Customer Service Analysis", colour: "text-amber-400", dot: "bg-amber-500" },
              { label: "ROI Breakdown", colour: "text-emerald-400", dot: "bg-emerald-500" },
            ].map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-sm"
              >
                <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                <span className={item.colour}>{item.label}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Live Shade Matching Chatbot                                       */}
      {/* ------------------------------------------------------------------ */}
      <Section id="chatbot" className="px-5 py-20 max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 text-rose-400 text-xs font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            Live Demo
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-4">
            AI Shade Matching Assistant
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Your customers ask &ldquo;which shade am I?&rdquo; more than anything else. This chatbot knows all 21 shades, every undertone, and recommends the perfect match in under 60 seconds. Try it.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <RangeBeautyChatbot />

          <div className="max-w-xl text-center">
            <p className="text-sm text-zinc-500 leading-relaxed">
              This prototype is trained on your full product range — all 21 foundation shades, the setting powder, primer, and Bali Glow. The production version would live on rangebeauty.com, integrate with Shopify for real-time inventory, and handle order tracking and returns.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 w-full max-w-2xl">
            {[
              { stat: "60s", label: "to find their perfect shade" },
              { stat: "24/7", label: "always available, no staff needed" },
              { stat: "21", label: "shades it knows inside out" },
            ].map((item) => (
              <div key={item.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-rose-400 mb-1">{item.stat}</p>
                <p className="text-xs text-zinc-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-5">
        <div className="h-px bg-zinc-800" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Customer Service Analysis                                         */}
      {/* ------------------------------------------------------------------ */}
      <Section className="px-5 py-20 max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-xs font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Analysis
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-4">
            Customer Service: Where You&apos;re Losing Sales
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            We reviewed Range Beauty&apos;s customer experience from the outside. Here&apos;s what we found.
          </p>
        </div>

        {/* Current vs Future */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Current state */}
          <div className="bg-zinc-900 border border-red-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-semibold text-zinc-100">Current State</h3>
            </div>
            <div className="space-y-3">
              {[
                { icon: Clock, text: "4+ day average email response time", sub: "Customers report waiting days for replies" },
                { icon: MessageSquare, text: "No live chat or chatbot", sub: "Zero real-time support during buying decisions" },
                { icon: ShieldCheck, text: "3-day returns window", sub: "Combined with slow CS = frustrated customers" },
                { icon: AlertTriangle, text: "Shade confusion drives returns", sub: "21 shades with no guidance tool on site" },
              ].map((item) => (
                <div key={item.text} className="flex gap-3 items-start">
                  <item.icon className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-zinc-200">{item.text}</p>
                    <p className="text-xs text-zinc-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What we'd build */}
          <div className="bg-zinc-900 border border-emerald-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-zinc-100">What We&apos;d Build</h3>
            </div>
            <div className="space-y-3">
              {[
                { icon: Bot, text: "AI chatbot — instant shade matching", sub: "Answers in seconds, not days. Trained on all 21 shades." },
                { icon: MessageSquare, text: "24/7 customer support coverage", sub: "Handles FAQs, ingredients, shipping, order tracking automatically" },
                { icon: ShieldCheck, text: "Eczema & acne-safe reassurance", sub: "AI trained on formulations gives instant ingredient confidence" },
                { icon: TrendingUp, text: "Shopify integration + analytics", sub: "Track which shades get recommended most, cart recovery, conversion data" },
              ].map((item) => (
                <div key={item.text} className="flex gap-3 items-start">
                  <item.icon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-zinc-200">{item.text}</p>
                    <p className="text-xs text-zinc-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support channels comparison */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-base font-semibold text-zinc-200 mb-4">Current Support Channels</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-2 pr-4 text-zinc-500 font-medium">Channel</th>
                  <th className="text-left py-2 pr-4 text-zinc-500 font-medium">Status</th>
                  <th className="text-left py-2 text-zinc-500 font-medium">Impact</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Email (info@rangebeauty.com)", "Active — 4+ day response", "Customers leave before getting answers"],
                  ["Live Chat", "None", "No real-time help during purchase decisions"],
                  ["AI Chatbot", "None", "No automated shade matching or FAQ handling"],
                  ["Phone Support", "None", "No voice channel for urgent issues"],
                  ["FAQ Page", "Exists but basic", "Doesn't address shade-specific questions"],
                ].map(([channel, status, impact]) => (
                  <tr key={channel} className="border-b border-zinc-800/50">
                    <td className="py-2.5 pr-4 text-zinc-300">{channel}</td>
                    <td className="py-2.5 pr-4 text-zinc-400">{status}</td>
                    <td className="py-2.5 text-zinc-500">{impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-5">
        <div className="h-px bg-zinc-800" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 4. ROI Numbers                                                       */}
      {/* ------------------------------------------------------------------ */}
      <Section className="px-5 py-20 max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            ROI Estimate
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-4">
            The Numbers
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Conservative estimates based on your product range, price point, and traffic.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { value: "15-25%", label: "Abandoned carts recovered", sub: "Shade confusion is the #1 reason customers leave" },
            { value: "40-60%", label: "Support tickets deflected", sub: "AI handles shade, ingredient, and shipping questions" },
            { value: "8-12 hrs", label: "Saved per week", sub: "Time your team currently spends on repetitive queries" },
            { value: "30%", label: "Fewer wrong-shade returns", sub: "Right shade recommended upfront = fewer returns" },
          ].map((item) => (
            <div key={item.label} className="bg-gradient-to-br from-emerald-600/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-5 text-center">
              <p className="text-3xl font-bold text-emerald-400 mb-2">{item.value}</p>
              <p className="text-sm font-medium text-zinc-200 mb-1">{item.label}</p>
              <p className="text-xs text-zinc-500">{item.sub}</p>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
          <p className="text-sm text-zinc-400 mb-2">At an average order value of $33 and recovering even 50 abandoned carts per month:</p>
          <p className="text-2xl font-bold text-zinc-50">
            ~$1,650/month in recovered revenue
          </p>
          <p className="text-sm text-zinc-500 mt-1">
            The chatbot pays for itself many times over.
          </p>
        </div>
      </Section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-5">
        <div className="h-px bg-zinc-800" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 5. CTA                                                               */}
      {/* ------------------------------------------------------------------ */}
      <Section className="px-5 py-24 max-w-3xl mx-auto text-center">
        <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">
          No pitch. No strings.
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-4">
          If this is useful, we&apos;d love 15 minutes.
        </h2>
        <p className="text-lg text-zinc-400 leading-relaxed mb-10">
          No sales team. No gatekeepers. A quick call to walk through how this would work on rangebeauty.com — and you&apos;d be talking directly to the person who built everything on this page.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            href="https://cal.com/sholastechnotes/free-ai-strategy-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-xl transition-all text-sm"
            aria-label="Book a 15-minute strategy call"
          >
            <CalendarDays className="w-4 h-4" />
            Book a 15-Minute Call
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>

          <Link
            href="https://linkedin.com/in/olushola-oladipupo/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-zinc-100 font-medium rounded-xl transition-all text-sm"
            aria-label="Connect with Olushola on LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
            Connect with Olushola
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>
        </div>

        <p className="text-sm text-zinc-600">
          Built by{" "}
          <Link
            href="https://oladipupoconsulting.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-300 underline underline-offset-2 transition-colors"
          >
            Oladipupo Consulting
          </Link>
          {" "}&mdash; AI Automation for Growing Businesses
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. Footer                                                            */}
      {/* ------------------------------------------------------------------ */}
      <footer className="border-t border-zinc-900 px-5 py-8 text-center">
        <p className="text-sm text-zinc-700">
          This page was built specifically for you. No one else can see it.
        </p>
      </footer>
    </div>
  );
}
