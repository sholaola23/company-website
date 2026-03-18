"use client";

import { motion } from "framer-motion";

interface GradientBlobProps {
  className?: string;
  /** Animation duration in seconds. Default 8. */
  duration?: number;
  /** Delay before animation starts (useful to stagger multiple blobs). */
  delay?: number;
}

/**
 * A floating, animated gradient blob for hero section depth.
 * Pair with `absolute` positioning and a colour class on the parent.
 *
 * Usage:
 *   <div className="relative overflow-hidden">
 *     <GradientBlob className="w-[600px] h-[600px] bg-blue-600 -top-40 -left-32" />
 *     <GradientBlob className="w-[400px] h-[400px] bg-purple-600 top-10 right-0" delay={2} />
 *   </div>
 */
export default function GradientBlob({
  className = "",
  duration = 8,
  delay = 0,
}: GradientBlobProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
