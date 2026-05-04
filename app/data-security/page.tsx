import type { Metadata } from "next";
import {
  Shield,
  Database,
  Lock,
  MapPin,
  Brain,
  FileCheck,
  CheckCircle,
  Download,
  Trash2,
  Server,
  KeyRound,
  RefreshCw,
  Eye,
  ShieldCheck,
  Clock,
  FileText,
  Users,
} from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import SectionHeading from "@/components/shared/SectionHeading";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "How We Protect Your Data | WorkCrew Data Security & Privacy",
  description:
    "Security and privacy are built into every system WorkCrew builds. AES-256 encryption, UK-hosted infrastructure, GDPR compliance, and full data ownership. Learn how we keep your business data safe.",
  alternates: {
    canonical: "https://workcrew.io/data-security",
  },
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "How We Protect Your Data | WorkCrew Data Security & Privacy",
    description:
      "AES-256 encryption, UK-hosted servers, GDPR compliance, and zero AI data retention. See exactly how WorkCrew keeps your business data safe.",
    url: "https://workcrew.io/data-security",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How We Protect Your Data | WorkCrew Data Security & Privacy",
    description:
      "AES-256 encryption, UK-hosted servers, GDPR compliance, and zero AI data retention. See exactly how WorkCrew keeps your business data safe.",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who owns the data in systems built by WorkCrew?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You do. You own your data at all times. You can export everything in standard formats or request full deletion whenever you want. There is no lock-in.",
      },
    },
    {
      "@type": "Question",
      name: "Where is my data stored?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All data is stored in UK-region servers (London, eu-west-2). Your data never leaves the UK without your explicit consent. We are fully UK GDPR compliant.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data shared with other clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Never. Every client gets their own dedicated database with separate authentication and access controls. Your data is completely isolated from other clients.",
      },
    },
    {
      "@type": "Question",
      name: "Does the AI store or retain my data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. When AI processes your documents (receipts, invoices, etc.), it processes in real time with zero retention. The AI provider does not store your data. Only the minimum necessary data is sent for processing, and results are stored in your database, not with the AI provider.",
      },
    },
    {
      "@type": "Question",
      name: "What encryption does WorkCrew use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use AES-256 encryption for data at rest and TLS/HTTPS encryption for all data in transit. All access is protected by password-based authentication with daily automated backups.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if there is a data breach?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We commit to notifying affected clients within 72 hours of discovering any breach, in line with UK GDPR requirements. A Data Processing Agreement is available on request.",
      },
    },
  ],
};

const SECTIONS = [
  {
    id: "ownership",
    icon: Shield,
    eyebrow: "Data Ownership",
    title: "Your Data Stays Yours",
    description:
      "You own every piece of data in the systems we build for you. No exceptions, no small print.",
    points: [
      {
        icon: CheckCircle,
        text: "You own your data — always",
      },
      {
        icon: Download,
        text: "Export everything at any time in standard formats",
      },
      {
        icon: Trash2,
        text: "Request full deletion whenever you want",
      },
      {
        icon: ShieldCheck,
        text: "No lock-in, no hostage data",
      },
    ],
  },
  {
    id: "isolation",
    icon: Database,
    eyebrow: "Infrastructure",
    title: "Isolated Infrastructure",
    description:
      "Your business data is never mixed with anyone else's. Every client environment is completely separate.",
    points: [
      {
        icon: Server,
        text: "Every client gets their own dedicated database",
      },
      {
        icon: ShieldCheck,
        text: "Your data is never mixed with other clients",
      },
      {
        icon: KeyRound,
        text: "Separate authentication and access controls per client",
      },
    ],
  },
  {
    id: "encryption",
    icon: Lock,
    eyebrow: "Encryption",
    title: "Encryption & Security",
    description:
      "Industry-standard encryption protects your data whether it is being stored or transmitted.",
    points: [
      {
        icon: Lock,
        text: "AES-256 encryption at rest",
      },
      {
        icon: ShieldCheck,
        text: "TLS/HTTPS encryption in transit",
      },
      {
        icon: KeyRound,
        text: "Password-protected access controls",
      },
      {
        icon: RefreshCw,
        text: "Daily automated backups",
      },
    ],
  },
  {
    id: "uk-hosted",
    icon: MapPin,
    eyebrow: "Location",
    title: "UK-Hosted",
    description:
      "Your data stays in the UK. Full stop.",
    points: [
      {
        icon: Server,
        text: "All data stored in UK-region servers (London, eu-west-2)",
      },
      {
        icon: ShieldCheck,
        text: "Data never leaves the UK without your consent",
      },
      {
        icon: FileCheck,
        text: "Full UK GDPR compliance",
      },
    ],
  },
  {
    id: "ai-transparency",
    icon: Brain,
    eyebrow: "AI Processing",
    title: "AI Processing Transparency",
    description:
      "When we use AI to process your documents, here is exactly what happens — and what does not.",
    points: [
      {
        icon: Eye,
        text: "AI processes your documents (receipts, invoices, etc.) in real time",
      },
      {
        icon: ShieldCheck,
        text: "Zero retention — the AI provider does not store your data",
      },
      {
        icon: CheckCircle,
        text: "Only minimum necessary data is sent for processing",
      },
      {
        icon: Database,
        text: "Results stored in YOUR database, not with the AI provider",
      },
    ],
  },
  {
    id: "commitments",
    icon: FileCheck,
    eyebrow: "Our Promises",
    title: "Our Commitments",
    description:
      "Clear, enforceable commitments — not vague promises.",
    points: [
      {
        icon: ShieldCheck,
        text: "We never sell or share your data",
      },
      {
        icon: Clock,
        text: "72-hour breach notification",
      },
      {
        icon: FileText,
        text: "Data Processing Agreement available on request",
      },
      {
        icon: Users,
        text: "Full transparency about sub-processors (Supabase, Vercel, Anthropic)",
      },
    ],
  },
];

export default function DataSecurityPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <JsonLd data={FAQ_SCHEMA} />

      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-20 sm:mb-24">
        <span className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4 block">
          Data Security & Privacy
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-slate-900 leading-tight tracking-tight mb-6">
          How We Protect Your Data
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Security and privacy are built into every system we build. Here&apos;s
          exactly how we keep your business data safe.
        </p>
      </div>

      {/* Sections */}
      {SECTIONS.map((section, index) => {
        const SectionIcon = section.icon;
        const isEven = index % 2 === 0;

        return (
          <section
            key={section.id}
            id={section.id}
            className="mb-16 sm:mb-20"
            aria-labelledby={`${section.id}-heading`}
          >
            <div
              className={`bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 max-w-4xl mx-auto ${
                isEven ? "" : ""
              }`}
            >
              <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 shrink-0">
                    <SectionIcon
                      size={22}
                      className="text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                      {section.eyebrow}
                    </span>
                    <h2
                      id={`${section.id}-heading`}
                      className="text-xl sm:text-2xl font-bold text-slate-900"
                    >
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {section.description}
                </p>

                {/* Points */}
                <ul className="flex flex-col gap-3" role="list">
                  {section.points.map((point) => {
                    const PointIcon = point.icon;
                    return (
                      <li key={point.text} className="flex items-start gap-3">
                        <PointIcon
                          size={16}
                          className="text-blue-600 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-slate-500 leading-relaxed">
                          {point.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <div className="text-center mt-20 sm:mt-24">
        <div className="inline-flex flex-col items-center gap-4">
          <p className="text-slate-600 text-base">
            Have questions about data security?
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <CTAButton href="/contact" variant="primary" size="lg">
              Get in Touch
            </CTAButton>
            <CTAButton
              href="https://cal.com/workcrew/free-ai-strategy-call"
              variant="secondary"
              size="lg"
            >
              Book a Call
            </CTAButton>
          </div>
          <p className="text-xs text-slate-400">
            We are happy to answer any questions about how we handle your data.
          </p>
        </div>
      </div>
    </div>
  );
}
