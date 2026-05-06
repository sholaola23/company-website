"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "@/components/shared/Logo";
import CTAButton from "@/components/shared/CTAButton";
import { cn } from "@/lib/utils";

const SERVICE_LINKS = [
  { label: "AI Lead Intake & Booking", href: "/services/lead-intake" },
  { label: "AI Email Assistant", href: "/services/email-assistant" },
  { label: "WhatsApp Customer Bot", href: "/services/whatsapp-bot" },
  { label: "AI Workshops", href: "/services/ai-workshop" },
  { label: "View all services", href: "/services" },
];

// Operator nav — 4 items + 1 CTA. Was 5 items + 7-deep dropdown.
const NAV_LINKS = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

/**
 * Sticky header — Bone background, Char wordmark.
 * Locked 4 May 2026 against brand-foundation.md.
 */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md shadow-sm"
          : ""
      )}
      style={{
        background: scrolled
          ? "color-mix(in srgb, var(--color-bg) 92%, transparent)"
          : "var(--color-bg)",
        borderBottom: scrolled
          ? "1px solid var(--color-border)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2"
            style={{ outlineColor: "var(--color-primary)" }}
            aria-label="WorkCrew — home"
          >
            <Logo size="sm" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                onFocus={() => setServicesOpen(true)}
                onBlur={(e) => {
                  if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                    setServicesOpen(false);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setServicesOpen(false);
                }}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2"
                style={{ color: "var(--color-body)", outlineColor: "var(--color-primary)" }}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown size={14} className={cn("transition-transform duration-200", servicesOpen && "rotate-180")} />
              </button>

              {/* Dropdown */}
              <div
                className={cn(
                  "absolute left-0 top-full mt-1 w-64 rounded-sm shadow-md py-2 transition-all duration-200 origin-top",
                  servicesOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                )}
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {SERVICE_LINKS.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block px-4 py-2.5 text-sm transition-colors duration-150",
                      i === SERVICE_LINKS.length - 1 && "mt-1 pt-3 font-semibold"
                    )}
                    style={{
                      color:
                        i === SERVICE_LINKS.length - 1
                          ? "var(--color-primary)"
                          : "var(--color-body)",
                      borderTop:
                        i === SERVICE_LINKS.length - 1
                          ? "1px solid var(--color-border)"
                          : "none",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium rounded-sm transition-colors duration-150 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2"
                style={{ color: "var(--color-body)", outlineColor: "var(--color-primary)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <CTAButton href="https://cal.com/workcrew/free-ai-strategy-call" variant="primary" size="sm">
              Book a call
            </CTAButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2"
            style={{ color: "var(--color-body)", outlineColor: "var(--color-primary)" }}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <div
        id="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out shadow-md",
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
        style={{
          background: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-6 pt-2 flex flex-col gap-1">
          <p
            className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-muted)" }}
          >
            Services
          </p>
          {SERVICE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm font-medium rounded-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2"
              style={{ color: "var(--color-body)", outlineColor: "var(--color-primary)" }}
            >
              {link.label}
            </Link>
          ))}

          <div className="my-2" style={{ borderTop: "1px solid var(--color-border)" }} />

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-base font-medium rounded-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2"
              style={{ color: "var(--color-body)", outlineColor: "var(--color-primary)" }}
            >
              {link.label}
            </Link>
          ))}

          <div
            className="mt-3 pt-3"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            <CTAButton
              href="https://cal.com/workcrew/free-ai-strategy-call"
              variant="primary"
              size="md"
              className="w-full justify-center"
            >
              Book a call
            </CTAButton>
          </div>
        </div>
      </div>
    </header>
  );
}
