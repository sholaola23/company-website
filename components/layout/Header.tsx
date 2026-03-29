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
  { label: "SEO Content Automation", href: "/services/seo-content" },
  { label: "WhatsApp Customer Bot", href: "/services/whatsapp-bot" },
  { label: "AI Workshops", href: "/services/ai-workshop" },
  { label: "Website Development", href: "/services/business-website" },
  { label: "View All Services", href: "/services" },
];

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/**
 * Premium sticky header — white background, subtle shadow on scroll.
 * Services dropdown on desktop, full-screen overlay on mobile.
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
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-white"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
            aria-label="Oladipupo Consulting — home"
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
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg transition-colors duration-150 hover:text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown size={14} className={cn("transition-transform duration-200", servicesOpen && "rotate-180")} />
              </button>

              {/* Dropdown */}
              <div
                className={cn(
                  "absolute left-0 top-full mt-1 w-64 rounded-xl bg-white border border-slate-200 shadow-lg py-2 transition-all duration-200 origin-top",
                  servicesOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                )}
              >
                {SERVICE_LINKS.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block px-4 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors duration-150",
                      i === SERVICE_LINKS.length - 1 && "border-t border-slate-100 mt-1 pt-3 font-semibold text-blue-600"
                    )}
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
                className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg transition-colors duration-150 hover:text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <CTAButton href="/audit" variant="primary" size="sm">
              Get Free Audit
            </CTAButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
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
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          "bg-white border-b border-slate-200 shadow-lg",
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-6 pt-2 flex flex-col gap-1">
          {/* Services header */}
          <p className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Services
          </p>
          {SERVICE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-slate-600 rounded-lg transition-colors duration-150 hover:text-blue-600 hover:bg-blue-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {link.label}
            </Link>
          ))}

          {/* Separator */}
          <div className="my-2 border-t border-slate-100" />

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-base font-medium text-slate-600 rounded-lg transition-colors duration-150 hover:text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-3 pt-3 border-t border-slate-100">
            <CTAButton
              href="/audit"
              variant="primary"
              size="md"
              className="w-full justify-center"
            >
              Get Free Audit
            </CTAButton>
          </div>
        </div>
      </div>
    </header>
  );
}
