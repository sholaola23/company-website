import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Render the heading as h1 instead of h2 (for page-level headings) */
  as?: "h1" | "h2";
}

/**
 * Premium section heading with eyebrow label.
 * Uses DM Sans for headings (set via CSS heading rules).
 *
 * Usage:
 * <SectionHeading
 *   eyebrow="What we do"
 *   heading="AI automation that pays for itself"
 *   description="We build and maintain automation systems..."
 *   align="center"
 * />
 */
export default function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "center",
  className,
  as: Tag = "h2",
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
        <span className="eyebrow">
          {eyebrow}
        </span>
      )}

      <Tag className="heading-section text-3xl sm:text-4xl lg:text-[56px]">
        {heading}
      </Tag>

      {description && (
        <p
          className={cn(
            "text-slate-600 text-base leading-relaxed sm:text-lg",
            isCenter ? "max-w-2xl" : "max-w-xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
