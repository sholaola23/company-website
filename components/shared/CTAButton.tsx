"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  disabled?: boolean;
}

interface LinkProps extends BaseProps {
  href: string;
  onClick?: never;
}

interface ClickProps extends BaseProps {
  onClick: () => void;
  href?: never;
}

type CTAButtonProps = LinkProps | ClickProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-bg)] hover:bg-[var(--color-dark)] border border-[var(--color-primary)] hover:border-slate-900 shadow-[0_1px_6px_-1px_rgba(37,99,235,0.4)] hover:shadow-[0_2px_10px_-2px_rgba(15,23,42,0.3)]",
  secondary:
    "bg-[var(--color-bg)] text-[var(--color-primary)] border-2 border-[var(--color-border)] hover:bg-[var(--color-dark)] hover:text-[var(--color-bg)] hover:border-slate-900 shadow-sm hover:shadow-md",
  ghost:
    "bg-transparent text-[var(--color-body)] border border-transparent hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]/50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-6 py-2.5 text-sm gap-1.5",
  md: "px-7 py-3.5 text-base gap-2",
  lg: "px-8 py-4 text-base gap-2.5",
};

/**
 * Premium pill-shaped CTA button with arrow icon.
 * Inspired by Fliweel's button pattern: pill shape, shadow, hover → black.
 *
 * Usage:
 * <CTAButton href="/audit" variant="primary" size="md">Get Free Audit</CTAButton>
 * <CTAButton onClick={handleClick} variant="secondary" showArrow={false}>Learn More</CTAButton>
 */
export default function CTAButton({
  variant = "primary",
  size = "md",
  children,
  className,
  showArrow = true,
  disabled = false,
  ...rest
}: CTAButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center font-semibold rounded-full",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    "group cursor-pointer select-none",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-50 pointer-events-none",
    className
  );

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight
          className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          size={size === "lg" ? 18 : 16}
          aria-hidden="true"
        />
      )}
    </>
  );

  if ("href" in rest && rest.href) {
    return (
      <Link href={rest.href} className={baseStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={"onClick" in rest ? rest.onClick : undefined}
      disabled={disabled}
      className={baseStyles}
    >
      {content}
    </button>
  );
}
