import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Usage:
 * <SectionHeading
 *   eyebrow="What we do"
 *   heading="AI automation that pays for itself"
 *   description="We build and maintain automation systems for UK small businesses..."
 *   align="center"
 * />
 */
export default function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold tracking-widest uppercase text-blue-500">
          {eyebrow}
        </span>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
        {heading}
      </h2>

      {description && (
        <p
          className={cn(
            "text-zinc-400 text-base leading-relaxed",
            isCenter ? "max-w-2xl" : "max-w-xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
