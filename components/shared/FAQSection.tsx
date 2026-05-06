"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import JsonLd from "@/components/shared/JsonLd";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  heading?: string;
  eyebrow?: string;
}

/**
 * Premium FAQ accordion section — clean white cards with subtle borders.
 * Active item gets elevated shadow (inspired by Fliweel's FAQ pattern).
 */
export default function FAQSection({
  items,
  heading = "Frequently Asked Questions",
  eyebrow,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section aria-labelledby="faq-section-heading">
      <JsonLd data={faqJsonLd} />

      <div className="mx-auto max-w-3xl">
        {eyebrow && (
          <span className="mb-4 block text-center eyebrow">
            {eyebrow}
          </span>
        )}
        <h2
          id="faq-section-heading"
          className="mb-10 text-center heading-section text-2xl sm:text-3xl lg:text-[48px]"
        >
          {heading}
        </h2>

        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "border-[var(--color-border)] bg-[var(--color-bg)] shadow-lg"
                    : "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-border-strong)]"
                }`}
              >
                <button
                  type="button"
                  id={`faq-button-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                >
                  <span className="text-base font-semibold text-[var(--color-heading)]">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[var(--color-muted)] transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[var(--color-primary)]" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  className={`grid transition-all duration-200 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-base leading-relaxed text-[var(--color-body)]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
