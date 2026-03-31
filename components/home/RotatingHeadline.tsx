"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const headlines = [
  {
    static: "You Run Your Business.",
    highlight: "We Build the AI.",
  },
  {
    static: "Stop Losing Leads to",
    highlight: "Slow Follow-Up.",
  },
  {
    static: "Digital Systems That",
    highlight: "Run Your Business.",
  },
  {
    static: "Websites & Web Apps That",
    highlight: "Win You Customers.",
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
      className="mx-auto max-w-4xl text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-slate-900 sm:text-5xl lg:mx-0 lg:text-7xl"
      aria-label={`${headlines[index].static} ${headlines[index].highlight}`}
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
          {headlines[index].static}{" "}
          <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            {headlines[index].highlight}
          </span>
        </motion.span>
      </AnimatePresence>
    </h1>
  );
}
