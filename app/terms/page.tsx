import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Oladipupo Consulting Ltd.",
  alternates: {
    canonical: "https://oladipupoconsulting.co.uk/terms",
  },
  openGraph: {
    title: "Terms of Service | Oladipupo Consulting",
    description: "Terms of service for Oladipupo Consulting Ltd.",
    url: "https://oladipupoconsulting.co.uk/terms",
    type: "website",
  },
  twitter: {
    title: "Terms of Service | Oladipupo Consulting",
    description: "Terms of service for Oladipupo Consulting Ltd.",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-zinc-400 text-sm mb-8">Last updated: 18 March 2026</p>

        <div className="space-y-8 text-zinc-300 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">Agreement</h2>
            <p>
              By using the Oladipupo Consulting website (oladipupoconsulting.co.uk),
              you agree to these terms. If you do not agree, please do not use our
              website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">Services</h2>
            <p>
              Oladipupo Consulting Ltd provides AI automation, website development, and
              AI training services for businesses. Service details, pricing, and
              deliverables are agreed upon individually for each client engagement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">Free AI Readiness Audit</h2>
            <p>
              Our free AI Readiness Audit is provided as a complimentary assessment. It
              does not constitute a binding proposal or guarantee of results. The audit
              is designed to identify opportunities and provide recommendations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">AI-Generated Content</h2>
            <p>
              Parts of our website use AI to generate responses, including the instant
              audit tool and chat assistant. While we strive for accuracy, AI-generated
              content is provided for informational purposes and should not be treated
              as professional advice without further consultation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">Intellectual Property</h2>
            <p>
              All content on this website, including text, design, and code, is the
              property of Oladipupo Consulting Ltd unless otherwise stated. You may not
              reproduce or redistribute our content without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">Limitation of Liability</h2>
            <p>
              Oladipupo Consulting Ltd is not liable for any indirect, incidental, or
              consequential damages arising from the use of our website or services. Our
              total liability is limited to the amount you have paid us for services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">Governing Law</h2>
            <p>
              These terms are governed by the laws of England and Wales. Any disputes
              will be subject to the exclusive jurisdiction of the courts of England
              and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-50 mb-3">Contact</h2>
            <p>
              Questions about these terms? Email us at{" "}
              <a href="mailto:hello@oladipupoconsulting.co.uk" className="text-blue-400 hover:underline">
                hello@oladipupoconsulting.co.uk
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
