"use client";

import { motion } from "framer-motion";

/**
 * Animated workflow visualisation — illustrates the four-stage agent flow.
 * Recoloured 5 May 2026 to brand palette: Char/Forest/Ember/Stone.
 * Each stage keeps its own hue so the eye can still parse the four steps,
 * but every hue is on-brand. Hidden on mobile (no graceful tablet variant).
 */

const CARDS = [
  {
    label: "Lead Captured",
    sub: "New enquiry from website",
    border: "rgba(28, 24, 20, 0.25)",       // Char hairline
    bg: "rgba(28, 24, 20, 0.04)",
    dot: "var(--color-heading)",             // Char
    delay: 0,
    top: "top-0",
    left: "left-0",
  },
  {
    label: "AI Qualified",
    sub: "High intent — budget confirmed",
    border: "rgba(63, 107, 78, 0.4)",        // Forest hairline
    bg: "rgba(63, 107, 78, 0.05)",
    dot: "var(--color-success)",             // Forest
    delay: 0.15,
    top: "top-24",
    left: "left-36",
  },
  {
    label: "Booking Sent",
    sub: "Calendar link dispatched",
    border: "rgba(168, 52, 31, 0.4)",        // Ember hairline
    bg: "rgba(168, 52, 31, 0.05)",
    dot: "var(--color-primary)",             // Ember (brand primary)
    delay: 0.3,
    top: "top-52",
    left: "left-4",
  },
  {
    label: "Follow-up",
    sub: "Day 2 reminder queued",
    border: "rgba(139, 130, 120, 0.4)",      // Stone hairline
    bg: "rgba(139, 130, 120, 0.05)",
    dot: "var(--color-muted)",               // Stone
    delay: 0.45,
    top: "top-72",
    left: "left-40",
  },
];

const NODES = [
  { cx: 80, cy: 40 },
  { cx: 220, cy: 110 },
  { cx: 90, cy: 210 },
  { cx: 230, cy: 290 },
];

const LINES = [
  { x1: 80, y1: 40, x2: 220, y2: 110 },
  { x1: 220, y1: 110, x2: 90, y2: 210 },
  { x1: 90, y1: 210, x2: 230, y2: 290 },
];

function FloatingCard({
  card,
  index,
}: {
  card: (typeof CARDS)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + card.delay, duration: 0.6, ease: "easeOut" }}
      className={`absolute ${card.top} ${card.left}`}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3.5 + index * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.6,
        }}
        className="rounded-sm px-4 py-3 backdrop-blur-sm w-52"
        style={{
          border: `1px solid ${card.border}`,
          background: card.bg,
          boxShadow: "0 4px 16px -4px rgba(28, 24, 20, 0.06)",
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: card.dot }}
            aria-hidden="true"
          />
          <p className="text-xs font-semibold" style={{ color: "var(--color-heading)" }}>
            {card.label}
          </p>
        </div>
        <p className="text-xs pl-4" style={{ color: "var(--color-muted)" }}>
          {card.sub}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function HeroImage() {
  return (
    <div
      className="hidden lg:block relative w-[340px] h-[380px] shrink-0"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 310 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Static hairline connectors — Stone */}
        {LINES.map((line, i) => (
          <line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#B0A89E"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {/* Animated travelling dot — Ember */}
        {LINES.map((line, i) => (
          <motion.circle
            key={`dot-${i}`}
            r="3"
            fill="#A8341F"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{
              duration: 2.4,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1.2,
            }}
            style={{
              offsetPath: `path('M${line.x1} ${line.y1} L${line.x2} ${line.y2}')`,
            }}
          />
        ))}

        {/* Node circles — Mist outer, Char inner */}
        {NODES.map((node, i) => (
          <g key={`node-${i}`}>
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="10"
              fill="#F4EDE0"
              stroke="#B0A89E"
              strokeWidth="1.5"
              animate={{ r: [10, 13, 10] }}
              transition={{
                duration: 2.8,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r="4"
              fill="#1C1814"
              opacity="0.9"
            />
          </g>
        ))}
      </svg>

      {CARDS.map((card, i) => (
        <FloatingCard key={card.label} card={card} index={i} />
      ))}
    </div>
  );
}
