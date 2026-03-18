import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Oladipupo Consulting Ltd.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-zinc-400 text-sm mb-8">Last updated: 18 March 2026</p>

        <div className="space-y-8 text-zinc-300 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">Who We Are</h2>
            <p>
              Oladipupo Consulting Ltd is a UK-registered company that provides AI
              automation services, website development, and AI training for small
              businesses. Our website is oladipupoconsulting.co.uk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">What Data We Collect</h2>
            <p className="mb-3">When you use our website, we may collect:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
              <li><strong className="text-zinc-300">Contact form submissions:</strong> name, email address, phone number (optional), and your message.</li>
              <li><strong className="text-zinc-300">Audit request submissions:</strong> business name, industry, website URL, email address, and details about your business challenges.</li>
              <li><strong className="text-zinc-300">Chat conversations:</strong> messages exchanged with our AI assistant are processed in real-time and not permanently stored.</li>
              <li><strong className="text-zinc-300">Usage data:</strong> pages visited and interactions, stored locally in your browser (localStorage/sessionStorage) to personalise your experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
              <li>To respond to your enquiries and provide the services you request.</li>
              <li>To generate AI Readiness Audit reports tailored to your business.</li>
              <li>To send you relevant follow-up communications about our services.</li>
              <li>To improve our website and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">Third-Party Services</h2>
            <p>We use the following third-party services to operate our website:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400 mt-3">
              <li><strong className="text-zinc-300">Vercel:</strong> Website hosting.</li>
              <li><strong className="text-zinc-300">Anthropic (Claude):</strong> AI-powered responses and audit generation.</li>
              <li><strong className="text-zinc-300">Resend:</strong> Email delivery for form confirmations and notifications.</li>
              <li><strong className="text-zinc-300">Cloudflare:</strong> DNS and email routing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">Data Storage</h2>
            <p>
              Form submissions are processed and forwarded to our team via email. We do
              not store your data in a separate database. Chat conversations with our AI
              assistant are stored only in your browser session and are not retained by us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">Your Rights</h2>
            <p>
              Under UK data protection law (UK GDPR), you have the right to access,
              correct, or delete your personal data. To exercise these rights, contact
              us at hello@oladipupoconsulting.co.uk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">Contact</h2>
            <p>
              If you have questions about this policy, email us at{" "}
              <a href="mailto:hello@oladipupoconsulting.co.uk" className="text-blue-400 hover:underline">
                hello@oladipupoconsulting.co.uk
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
