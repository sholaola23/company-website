"use client";

import { useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
}

/**
 * Counts up from 0 to `target` when scrolled into view.
 * Triggers only once.
 * Initialises to the real target value so SSR / slow hydration never shows "0".
 *
 * Usage:
 *   <AnimatedCounter target={16} suffix="+" />
 *   <AnimatedCounter target={8} prefix="£" suffix="k" />
 */
export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  // Start with the real number so SSR never renders "0"
  const [display, setDisplay] = useState(target.toString());
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    // Reset to 0 then animate up — only on the client once visible
    setDisplay("0");
    const controls = animate(0, target, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return controls.stop;
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
