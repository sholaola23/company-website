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
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
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
