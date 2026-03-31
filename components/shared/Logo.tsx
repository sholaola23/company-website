import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "lg";
  className?: string;
  /** Use 'light' for dark backgrounds (footer). Default 'dark' for white backgrounds. */
  variant?: "dark" | "light";
}

/**
 * Brand logo — monogram + wordmark.
 * Supports dark text (for light backgrounds) and light text (for dark backgrounds).
 *
 * Usage:
 * <Logo size="sm" />                       // header — dark text
 * <Logo size="lg" variant="light" />       // footer — light text
 */
export default function Logo({ size = "sm", className, variant = "dark" }: LogoProps) {
  const isSm = size === "sm";
  const isLight = variant === "light";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Monogram */}
      <div
        className={cn(
          "flex items-center justify-center rounded-lg bg-blue-600 font-bold text-white shrink-0 select-none",
          isSm ? "h-8 w-8 text-sm" : "h-10 w-10 text-base"
        )}
        aria-hidden="true"
      >
        WC
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-bold tracking-tight",
            isSm ? "text-sm" : "text-base",
            isLight ? "text-white" : "text-slate-900"
          )}
        >
          WorkCrew
        </span>
        {!isSm && (
          <span className={cn(
            "text-xs mt-0.5 tracking-wide",
            isLight ? "text-slate-400" : "text-slate-900"
          )}>
            AI Automation
          </span>
        )}
      </div>
    </div>
  );
}
