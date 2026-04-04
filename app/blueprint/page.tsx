import type { Metadata } from "next";
import AnimatedSection from "@/components/shared/AnimatedSection";
import BlueprintGenerator from "@/components/blueprint/BlueprintGenerator";

export const metadata: Metadata = {
  title: "Free AI Blueprint Generator | WorkCrew",
  description:
    "Get a personalised AI automation blueprint for your business in under 2 minutes. See exactly where AI can save you time and money — no email required to view results.",
  alternates: {
    canonical: "https://workcrew.io/blueprint",
  },
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "Free AI Blueprint Generator | WorkCrew",
    description:
      "Get a personalised AI automation blueprint for your business in under 2 minutes. See exactly where AI can save you time and money.",
    url: "https://workcrew.io/blueprint",
    type: "website",
  },
  twitter: {
    title: "Free AI Blueprint Generator | WorkCrew",
    description:
      "Get a personalised AI automation blueprint for your business in under 2 minutes.",
  },
};

export default function BlueprintPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <AnimatedSection>
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-4 block">
            Free, 2 Minutes, No Obligation
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-slate-900 leading-tight mb-5">
            Your Free AI Blueprint
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Answer 5 quick questions about your business. Our AI analyses your industry,
            pain points, and customer channels — then generates a personalised automation
            blueprint showing exactly where you can save time and recover revenue.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <BlueprintGenerator />
      </AnimatedSection>

      {/* Trust signals */}
      <AnimatedSection delay={0.2}>
        <div className="max-w-2xl mx-auto mt-16 pt-10 border-t border-slate-200">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-slate-900">63</p>
              <p className="text-xs text-slate-500 mt-1">AI agents in our fleet</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">3</p>
              <p className="text-xs text-slate-500 mt-1">active clients served</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">90 days</p>
              <p className="text-xs text-slate-500 mt-1">results guarantee</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
