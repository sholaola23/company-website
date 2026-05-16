import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for WorkCrew Ltd.",
  alternates: {
    canonical: "https://workcrew.io/privacy",
  },
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "Privacy Policy | WorkCrew",
    description: "Privacy policy for WorkCrew Ltd.",
    url: "https://workcrew.io/privacy",
    type: "website",
  },
  twitter: {
    title: "Privacy Policy | WorkCrew",
    description: "Privacy policy for WorkCrew Ltd.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-[var(--color-body)] text-sm mb-8">Last updated: 20 April 2026</p>

        <div className="space-y-8 text-[var(--color-muted)] text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[var(--color-heading)] mb-3">Who We Are</h2>
            <p>
              WorkCrew Ltd is a UK-registered company providing AI automation services,
              website development, and AI training for small businesses. Our website is{" "}
              <a href="https://workcrew.io" className="text-[var(--color-primary)] hover:underline">workcrew.io</a>.
              This notice is governed by UK GDPR, the Data Protection Act 2018 and the
              Data (Use and Access) Act 2025.
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-3 text-[var(--color-body)]">
              <li><strong className="text-[var(--color-muted)]">Company:</strong> WorkCrew Ltd, England &amp; Wales</li>
              <li><strong className="text-[var(--color-muted)]">Data Controller:</strong> WorkCrew Ltd</li>
              <li><strong className="text-[var(--color-muted)]">ICO Registration:</strong> Pending (application in progress — reference to be added once issued)</li>
              <li><strong className="text-[var(--color-muted)]">Contact:</strong> <a href="mailto:hello@workcrew.io" className="text-[var(--color-primary)] hover:underline">hello@workcrew.io</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-heading)] mb-3">What Data We Collect</h2>
            <p className="mb-3">When you use our website or engage us as a client, we may collect:</p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-body)]">
              <li><strong className="text-[var(--color-muted)]">Contact form submissions:</strong> name, email address, phone number (optional), and your message.</li>
              <li><strong className="text-[var(--color-muted)]">Audit / Blueprint request submissions:</strong> business name, industry, website URL, email address, and details about your business challenges.</li>
              <li><strong className="text-[var(--color-muted)]">Chat conversations:</strong> messages exchanged with our AI assistant, processed in real-time and stored only in your browser session unless you submit them to us via a form.</li>
              <li><strong className="text-[var(--color-muted)]">Client data (as processor):</strong> when you engage WorkCrew under a service agreement, we may process personal data on your behalf (e.g. your customers&apos; names, phone numbers, emails). This is governed by a separate Data Processing Agreement and you remain the controller of that data.</li>
              <li><strong className="text-[var(--color-muted)]">Usage data:</strong> pages visited, interactions, and device info stored in your browser (localStorage / sessionStorage). Analytics data is collected only after you consent via our cookie banner.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-heading)] mb-3">Legal Basis for Processing</h2>
            <p className="mb-3">Under UK GDPR we rely on the following lawful bases:</p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-body)]">
              <li><strong className="text-[var(--color-muted)]">Consent</strong> — for marketing emails, analytics cookies, and non-essential tracking.</li>
              <li><strong className="text-[var(--color-muted)]">Contract</strong> — to deliver services you have engaged us to provide.</li>
              <li><strong className="text-[var(--color-muted)]">Legitimate interests</strong> — to respond to enquiries, improve our services, and operate our business (balanced against your rights).</li>
              <li><strong className="text-[var(--color-muted)]">Legal obligation</strong> — to meet accounting, tax, and regulatory requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-heading)] mb-3">How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-body)]">
              <li>To respond to enquiries and deliver the services you request.</li>
              <li>To generate AI Blueprint / Audit reports tailored to your business.</li>
              <li>To send you follow-up communications about our services (you can unsubscribe at any time).</li>
              <li>To process payments for services via our payment providers.</li>
              <li>To improve our website, tools, and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-heading)] mb-3">Third-Party Services &amp; Sub-Processors</h2>
            <p>We use the following service providers to operate our website and deliver services. Each is bound by their own data protection obligations.</p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-body)] mt-3">
              <li><strong className="text-[var(--color-muted)]">Vercel</strong> (USA) — website hosting. EU data regions where available.</li>
              <li><strong className="text-[var(--color-muted)]">Anthropic</strong> (USA) — Claude AI for responses, Blueprint generation, and agent tooling. Covered by Standard Contractual Clauses (SCCs).</li>
              <li><strong className="text-[var(--color-muted)]">OpenAI</strong> (USA) — supporting AI models for specific features. Covered by SCCs.</li>
              <li><strong className="text-[var(--color-muted)]">Resend</strong> (USA) — transactional email delivery. Covered by SCCs.</li>
              <li><strong className="text-[var(--color-muted)]">Cloudflare</strong> (USA/Global) — DNS, CDN, and email routing.</li>
              <li><strong className="text-[var(--color-muted)]">Supabase</strong> (EU region — Frankfurt/London) — database and authentication for client portals.</li>
              <li><strong className="text-[var(--color-muted)]">Stripe</strong> (USA/UK) — payment processing.</li>
              <li><strong className="text-[var(--color-muted)]">Vercel Analytics &amp; Speed Insights</strong> — aggregate, anonymised usage analytics (consent required).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-heading)] mb-3">International Data Transfers</h2>
            <p>
              Some of our service providers are based outside the UK (primarily the USA).
              Where your data is transferred outside the UK, we rely on UK IDTA /
              Standard Contractual Clauses and appropriate technical safeguards to
              protect your rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-heading)] mb-3">Data Retention</h2>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-body)]">
              <li><strong className="text-[var(--color-muted)]">Contact / Blueprint submissions:</strong> 24 months, then deleted unless you become a client.</li>
              <li><strong className="text-[var(--color-muted)]">Client records:</strong> retained for the duration of the engagement plus 7 years (statutory accounting period).</li>
              <li><strong className="text-[var(--color-muted)]">Marketing email lists:</strong> retained until you unsubscribe; reviewed every 24 months.</li>
              <li><strong className="text-[var(--color-muted)]">Website analytics:</strong> 14 months (if consent given).</li>
              <li><strong className="text-[var(--color-muted)]">Chat sessions:</strong> session-only — not retained unless submitted via a form.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-heading)] mb-3">Cookies</h2>
            <p>
              We use essential cookies to make the site work and, with your consent,
              analytics and marketing cookies to understand usage and improve our
              services. You can accept or decline non-essential cookies via our cookie
              banner at any time, or change your preference through your browser
              settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-heading)] mb-3">Your Rights</h2>
            <p className="mb-3">Under UK GDPR and the Data Protection Act 2018, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-body)]">
              <li><strong className="text-[var(--color-muted)]">Access</strong> — request a copy of the personal data we hold about you.</li>
              <li><strong className="text-[var(--color-muted)]">Rectification</strong> — ask us to correct inaccurate or incomplete data.</li>
              <li><strong className="text-[var(--color-muted)]">Erasure</strong> — ask us to delete your data (subject to legal retention obligations).</li>
              <li><strong className="text-[var(--color-muted)]">Restriction</strong> — ask us to limit how we use your data.</li>
              <li><strong className="text-[var(--color-muted)]">Portability</strong> — receive your data in a structured, machine-readable format.</li>
              <li><strong className="text-[var(--color-muted)]">Objection</strong> — object to processing based on legitimate interests or direct marketing.</li>
              <li><strong className="text-[var(--color-muted)]">Withdraw consent</strong> — at any time, where consent is the legal basis.</li>
              <li><strong className="text-[var(--color-muted)]">Not be subject to automated decisions</strong> — including profiling with significant effects.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email <a href="mailto:hello@workcrew.io" className="text-[var(--color-primary)] hover:underline">hello@workcrew.io</a>.
              We will respond within one month.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-heading)] mb-3">Complaints</h2>
            <p>
              If you are unhappy with how we have handled your data, please contact us
              first at <a href="mailto:hello@workcrew.io" className="text-[var(--color-primary)] hover:underline">hello@workcrew.io</a>.
              You also have the right to lodge a complaint with the UK Information
              Commissioner&apos;s Office (ICO): <a href="https://ico.org.uk" className="text-[var(--color-primary)] hover:underline" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-heading)] mb-3">Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. The &quot;Last updated&quot;
              date at the top indicates the most recent change. Significant changes
              will be flagged on our website or via email if you are an active client.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-heading)] mb-3">Contact</h2>
            <p>
              Questions about this policy? Email{" "}
              <a href="mailto:hello@workcrew.io" className="text-[var(--color-primary)] hover:underline">
                hello@workcrew.io
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
