import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "lg";
  className?: string;
  /** 'light' for dark backgrounds (footer). Default 'dark' for Bone backgrounds. */
  variant?: "dark" | "light";
}

/**
 * Brand wordmark — Inter Medium 500 with locked optical kerning.
 * Renders the actual SVG from /public/brand/, not a typeset substitute.
 * Locked 4 May 2026 — see brand-foundation.md §5.
 */
export default function Logo({ size = "sm", className, variant = "dark" }: LogoProps) {
  const heightPx = size === "sm" ? 22 : 30;
  const widthPx = Math.round(heightPx * 3.875); // wordmark aspect ratio (13211 / 3408)
  const src = variant === "light" ? "/brand/wordmark-bone.svg" : "/brand/wordmark.svg";

  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src={src}
        alt="WorkCrew"
        width={widthPx}
        height={heightPx}
        priority
        className="block"
        style={{ height: heightPx, width: "auto" }}
      />
    </div>
  );
}
