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
    "bg-blue-500 text-white hover:bg-blue-600 border border-blue-500 hover:border-blue-600",
  secondary:
    "bg-zinc-800 text-zinc-50 border border-zinc-600 hover:bg-zinc-700 hover:border-zinc-500",
  ghost:
    "bg-transparent text-zinc-300 border border-transparent hover:text-white hover:bg-zinc-800/60",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2",
};

/**
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
    "inline-flex items-center justify-center font-medium rounded-lg",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
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
