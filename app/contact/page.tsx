import type { Metadata } from "next";
import { Mail, Phone, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Oladipupo Consulting. Whether you have a question or you're ready to get started with AI automation.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Page heading */}
      <div className="max-w-xl mb-14 sm:mb-16">
        <span className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-4 block">
          Get in touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-50 leading-tight mb-4">
          Let&apos;s Talk
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          Whether you have a question, want to learn more about a service, or
          you&apos;re ready to get started — we&apos;re here.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left: Form */}
        <div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 sm:p-8">
            <h2 className="text-lg font-semibold text-zinc-50 mb-6">
              Send us a message
            </h2>
            <ContactForm />
          </div>
        </div>

        {/* Right: Direct contact info */}
        <div className="flex flex-col gap-8 lg:pt-2">
          <section aria-labelledby="contact-direct-heading">
            <h2
              id="contact-direct-heading"
              className="text-lg font-semibold text-zinc-50 mb-6"
            >
              Direct contact
            </h2>

            <div className="flex flex-col gap-5">
              {/* Email */}
              <a
                href="mailto:olusholaoladipupo1@gmail.com"
                className="flex items-start gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Send email to olusholaoladipupo1@gmail.com"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 shrink-0">
                  <Mail size={16} className="text-blue-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">
                    Email
                  </p>
                  <p className="text-sm text-zinc-200 group-hover:text-zinc-50 transition-colors">
                    olusholaoladipupo1@gmail.com
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+447469347654"
                className="flex items-start gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Call +44 7469 347654"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 shrink-0">
                  <Phone size={16} className="text-blue-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">
                    Phone
                  </p>
                  <p className="text-sm text-zinc-200 group-hover:text-zinc-50 transition-colors">
                    +44 7469 347654
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/447469347654"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Message on WhatsApp"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-green-400"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">
                    WhatsApp
                  </p>
                  <p className="text-sm text-zinc-200 group-hover:text-zinc-50 transition-colors">
                    Message us directly
                  </p>
                </div>
              </a>
            </div>
          </section>

          {/* Office hours */}
          <section
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
            aria-labelledby="hours-heading"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <Clock size={15} className="text-amber-400" aria-hidden="true" />
              <h2
                id="hours-heading"
                className="text-sm font-semibold text-zinc-300"
              >
                Availability
              </h2>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Weekdays</span>
                <span className="text-zinc-200 font-medium">5pm – 10pm GMT</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Weekends</span>
                <span className="text-zinc-200 font-medium">9am – 10pm GMT</span>
              </div>
              <div className="mt-3 pt-3 border-t border-zinc-800">
                <p className="text-xs text-zinc-500 leading-relaxed">
                  We typically respond within a few hours. For urgent matters,
                  WhatsApp is fastest.
                </p>
              </div>
            </div>
          </section>

          {/* Prefer audit */}
          <div className="bg-gradient-to-br from-blue-500/10 to-zinc-900 border border-blue-500/20 rounded-xl p-6">
            <p className="text-sm font-semibold text-zinc-50 mb-1.5">
              Not sure where to start?
            </p>
            <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
              A free AI readiness audit is the fastest way to get clarity on
              exactly how we can help your business.
            </p>
            <a
              href="/audit"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded group"
            >
              Request your free audit
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-0.5 transition-transform"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
