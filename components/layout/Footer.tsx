import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Logo from "@/components/shared/Logo";

const SERVICES_LINKS = [
  { label: "Lead intake & booking", href: "/services/lead-intake" },
  { label: "Email assistant", href: "/services/email-assistant" },
  { label: "SEO content automation", href: "/services/seo-content" },
  { label: "WhatsApp customer bot", href: "/services/whatsapp-bot" },
  { label: "AI workshops", href: "/services/ai-workshop" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "ROI calculator", href: "/tools/ai-roi-calculator" },
  { label: "Contact", href: "/contact" },
];

const LOCATION_LINKS = [
  { label: "London", href: "/ai-automation-london" },
  { label: "Manchester", href: "/ai-automation-manchester" },
  { label: "Birmingham", href: "/ai-automation-birmingham" },
  { label: "Leeds", href: "/ai-automation-leeds" },
  { label: "Bristol", href: "/ai-automation-bristol" },
  { label: "Edinburgh", href: "/ai-automation-edinburgh" },
  { label: "Liverpool", href: "/ai-automation-liverpool" },
  { label: "Glasgow", href: "/ai-automation-glasgow" },
  { label: "Sheffield", href: "/ai-automation-sheffield" },
  { label: "Kettering", href: "/ai-automation-kettering" },
];

/**
 * Footer — Char ground, Bone wordmark, restrained.
 * Locked 4 May 2026 against brand-foundation.md.
 */
export default function Footer() {
  return (
    <footer
      style={{ background: "var(--color-dark)" }}
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link
              href="/"
              className="w-fit rounded-sm focus-visible:outline-none focus-visible:ring-2"
              style={{ outlineColor: "var(--color-primary)" }}
              aria-label="WorkCrew — home"
            >
              <Logo size="lg" variant="light" />
            </Link>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--color-dark-text)" }}
            >
              AI automation, websites, and training for small businesses.
              Built around how you actually run, not a template.
            </p>
          </div>

          {/* Services column */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--color-dark-muted)" }}
            >
              Services
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2"
                    style={{
                      color: "var(--color-dark-text)",
                      outlineColor: "var(--color-primary)",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--color-dark-muted)" }}
            >
              Company
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2"
                    style={{
                      color: "var(--color-dark-text)",
                      outlineColor: "var(--color-primary)",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations column */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--color-dark-muted)" }}
            >
              Locations
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {LOCATION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2"
                    style={{
                      color: "var(--color-dark-text)",
                      outlineColor: "var(--color-primary)",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--color-dark-muted)" }}
            >
              Contact
            </h3>
            <ul className="flex flex-col gap-4" role="list">
              <li>
                <a
                  href="mailto:hello@workcrew.io"
                  className="flex items-start gap-3 group rounded-sm focus-visible:outline-none focus-visible:ring-2"
                  style={{ outlineColor: "var(--color-primary)" }}
                  aria-label="Send us an email"
                >
                  <Mail
                    size={15}
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--color-primary)" }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-sm transition-colors duration-150"
                    style={{ color: "var(--color-dark-text)" }}
                  >
                    hello@workcrew.io
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+447469347654"
                  className="flex items-center gap-3 group rounded-sm focus-visible:outline-none focus-visible:ring-2"
                  style={{ outlineColor: "var(--color-primary)" }}
                  aria-label="Call us"
                >
                  <Phone
                    size={15}
                    className="shrink-0"
                    style={{ color: "var(--color-primary)" }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-sm transition-colors duration-150"
                    style={{ color: "var(--color-dark-text)" }}
                  >
                    +44 7469 347 654
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447469347654"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium rounded-sm px-4 py-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2"
                  style={{
                    color: "var(--color-dark-text)",
                    border: "1px solid var(--color-dark-border)",
                    outlineColor: "var(--color-primary)",
                  }}
                  aria-label="Message us on WhatsApp"
                >
                  Message on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-6 flex flex-col gap-4"
          style={{ borderTop: "1px solid var(--color-dark-border)" }}
        >
          {/* Statutory disclosures */}
          <p
            className="text-xs text-center sm:text-left leading-relaxed"
            style={{ color: "var(--color-dark-muted)" }}
          >
            WorkCrew Ltd — Registered in England &amp; Wales, company number{" "}
            <span style={{ color: "var(--color-dark-text)" }}>16501246</span>.
            Registered office: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ.{" "}
            Registered with the ICO · Reference: ZC129468.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p
              className="text-xs text-center sm:text-left"
              style={{ color: "var(--color-dark-muted)" }}
            >
              &copy; 2026 WorkCrew Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-xs transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2"
                style={{
                  color: "var(--color-dark-muted)",
                  outlineColor: "var(--color-primary)",
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2"
                style={{
                  color: "var(--color-dark-muted)",
                  outlineColor: "var(--color-primary)",
                }}
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
