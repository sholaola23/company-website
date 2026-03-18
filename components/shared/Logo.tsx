import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "lg";
  className?: string;
}

/**
 * Usage:
 * <Logo size="sm" />   // header nav — 32px monogram
 * <Logo size="lg" />   // footer / about page — 40px monogram
 */
export default function Logo({ size = "sm", className }: LogoProps) {
  const isSm = size === "sm";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Monogram */}
      <div
        className={cn(
          "flex items-center justify-center rounded-lg bg-blue-500 font-bold text-white shrink-0 select-none",
          isSm ? "h-8 w-8 text-sm" : "h-10 w-10 text-base"
        )}
        aria-hidden="true"
      >
        OC
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-bold text-zinc-50 tracking-tight",
            isSm ? "text-sm" : "text-base"
          )}
        >
          Oladipupo Consulting
        </span>
        {!isSm && (
          <span className="text-xs text-zinc-400 mt-0.5 tracking-wide">
            AI Automation
          </span>
        )}
      </div>
    </div>
  );
}
