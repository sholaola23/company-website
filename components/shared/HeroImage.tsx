"use client";

import { motion } from "framer-motion";

/**
 * A pure CSS/SVG animated illustration representing AI automation.
 * Shows a cluster of floating data cards connected by animated lines and
 * pulsing nodes — abstract but clearly "AI system" in feel.
 *
 * Sits to the right of the hero text on desktop, hidden on mobile.
 *
 * Usage:
 *   <HeroImage />
 */

const CARDS = [
  {
    label: "Lead Captured",
    sub: "New enquiry from website",
    color: "border-blue-500/40 bg-blue-500/5",
    dot: "bg-blue-400",
    delay: 0,
    top: "top-0",
    left: "left-0",
  },
  {
    label: "AI Qualified",
    sub: "High intent — budget confirmed",
    color: "border-emerald-500/40 bg-emerald-500/5",
    dot: "bg-emerald-400",
    delay: 0.15,
    top: "top-24",
    left: "left-36",
  },
  {
    label: "Booking Sent",
    sub: "Calendar link dispatched",
    color: "border-purple-500/40 bg-purple-500/5",
    dot: "bg-purple-400",
    delay: 0.3,
    top: "top-52",
    left: "left-4",
  },
  {
    label: "Follow-up",
    sub: "Day 2 reminder queued",
    color: "border-amber-500/40 bg-amber-500/5",
    dot: "bg-amber-400",
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
        className={`rounded-xl border ${card.color} px-4 py-3 backdrop-blur-sm w-52 shadow-lg`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`w-2 h-2 rounded-full ${card.dot} shrink-0`}
            aria-hidden="true"
          />
          <p className="text-xs font-semibold text-zinc-100">{card.label}</p>
        </div>
        <p className="text-xs text-zinc-500 pl-4">{card.sub}</p>
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
      {/* SVG connection lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 310 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Static faint lines */}
        {LINES.map((line, i) => (
          <line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgb(63 63 70)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {/* Animated travelling dot along each line */}
        {LINES.map((line, i) => (
          <motion.circle
            key={`dot-${i}`}
            r="3"
            fill="#3b82f6"
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

        {/* Node circles */}
        {NODES.map((node, i) => (
          <g key={`node-${i}`}>
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="10"
              fill="rgb(24 24 27)"
              stroke="rgb(63 63 70)"
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
              fill="#3b82f6"
              opacity="0.9"
            />
          </g>
        ))}
      </svg>

      {/* Floating data cards */}
      {CARDS.map((card, i) => (
        <FloatingCard key={card.label} card={card} index={i} />
      ))}
    </div>
  );
}
