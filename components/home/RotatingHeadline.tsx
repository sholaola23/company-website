"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const headlines = [
  {
    line1: "Save 8+ Hours a Week.",
    highlight: "We Build the AI.",
  },
  {
    line1: "Stop Losing Leads to",
    highlight: "Slow Follow-Up",
  },
  {
    line1: "From Conversation to",
    highlight: "Live Automation in 14 Days",
  },
  {
    line1: "Websites & Web Apps That",
    highlight: "Win You Customers",
  },
];

export default function RotatingHeadline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1
      className="mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-zinc-50 sm:text-6xl lg:mx-0 lg:text-7xl"
      aria-label={`${headlines[index].line1} ${headlines[index].highlight} — We'll fix that in 14 days`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="block"
        >
          {headlines[index].line1}{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            {headlines[index].highlight}
          </span>
        </motion.span>
      </AnimatePresence>
      <span className="block mt-10 text-zinc-50">
        You Run Your Business.
      </span>
    </h1>
  );
}
