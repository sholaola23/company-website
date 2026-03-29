import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Logo from "@/components/shared/Logo";
import NewsletterSignup from "@/components/shared/NewsletterSignup";

const SERVICES_LINKS = [
  { label: "AI Lead Intake & Booking", href: "/services/lead-intake" },
  { label: "AI Email Assistant", href: "/services/email-assistant" },
  { label: "SEO Content Automation", href: "/services/seo-content" },
  { label: "WhatsApp Customer Bot", href: "/services/whatsapp-bot" },
  { label: "AI Workshops", href: "/services/ai-workshop" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "ROI Calculator", href: "/tools/ai-roi-calculator" },
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

export default function Footer() {
  return (
    <footer className="bg-slate-900" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link
              href="/"
              className="w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
              aria-label="Oladipupo Consulting — home"
            >
              <Logo size="lg" variant="light" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              AI solutions for small businesses — automation, websites, and
              training. We build systems that save time, capture leads, and grow
              revenue.
            </p>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
              Services
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
              Company
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
              Locations
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {LOCATION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
              Contact
            </h3>
            <ul className="flex flex-col gap-4" role="list">
              <li>
                <a
                  href="mailto:hello@oladipupoconsulting.co.uk"
                  className="flex items-start gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  aria-label="Send us an email"
                >
                  <Mail
                    size={15}
                    className="mt-0.5 text-blue-400 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-slate-400 group-hover:text-white transition-colors duration-150">
                    hello@oladipupoconsulting.co.uk
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+447469347654"
                  className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  aria-label="Call us"
                >
                  <Phone
                    size={15}
                    className="text-blue-400 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-slate-400 group-hover:text-white transition-colors duration-150">
                    07469 347654
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447469347654"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-full px-4 py-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="Message us on WhatsApp"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="py-8 border-t border-slate-800">
          <div className="max-w-md">
            <NewsletterSignup compact />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            &copy; 2026 Oladipupo Consulting Ltd. Registered in England &amp; Wales.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
