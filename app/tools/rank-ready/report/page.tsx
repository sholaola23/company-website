"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Star,
  FileText,
  Calendar,
  Layers,
  Copy,
  Check,
  Download,
  ArrowRight,
  Loader2,
  Lock,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types (kept local to avoid import issues)
// ---------------------------------------------------------------------------

interface GBPVariant {
  label: string;
  text: string;
  character_count: number;
  keywords_used: string[];
  areas_mentioned: string[];
}

interface ReviewTemplates {
  sms: string;
  email: string;
  in_person_script: string;
}

interface ReviewResponseTemplates {
  positive: string;
  negative: string;
  neutral: string;
}

interface ReviewPlaybook {
  timing: string;
  who_to_ask: string;
  frequency: string;
  monthly_plan: string[];
}

interface ServicePage {
  service_name: string;
  page_title: string;
  meta_description: string;
  h1: string;
  intro_paragraph: string;
  sections: { heading: string; content: string }[];
  internal_links_suggested: string[];
}

interface CategoryRec {
  category: string;
  reason: string;
  searches_it_unlocks: string[];
  priority: string;
}

interface CompetitorComparison {
  competitor: string;
  likely_categories: string[];
}

interface Post {
  day: string;
  title: string;
  body: string;
  cta_type: string;
  image_suggestion: string;
  post_type: string;
}

interface Week {
  week_number: number;
  posts: Post[];
}

interface ReportData {
  type?: "preview" | "full";
  businessName: string;
  gbpDescription?: { variants: GBPVariant[]; tips: string[] };
  reviewStrategy?: {
    monthly_target: number;
    request_templates: ReviewTemplates;
    response_templates: ReviewResponseTemplates;
    playbook: ReviewPlaybook;
    quick_wins: string[];
  };
  serviceDescriptions?: {
    pages: ServicePage[];
    implementation_tips: string[];
  };
  categoryAudit?: {
    recommended_primary: {
      category: string;
      reason: string;
      searches_it_unlocks: string[];
    };
    recommended_secondary: CategoryRec[];
    competitor_comparison: CompetitorComparison[];
    categories_to_remove: { category: string; reason: string }[];
    summary: string;
  };
  postingCalendar?: {
    weeks: Week[];
    strategy_notes: string;
  };
}

// ---------------------------------------------------------------------------
// Tabs config
// ---------------------------------------------------------------------------

const TABS = [
  { id: "description", label: "GBP Description", icon: FileText, free: true },
  { id: "reviews", label: "Review Strategy", icon: Star, free: true },
  { id: "services", label: "Service Pages", icon: Layers, free: true },
  { id: "categories", label: "Category Audit", icon: MapPin, free: false },
  { id: "calendar", label: "Posting Calendar", icon: Calendar, free: false },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function ReportContent() {
  const searchParams = useSearchParams();
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isPreview = report?.type === "preview";

  useEffect(() => {
    async function loadReport() {
      const type = searchParams.get("type");
      const id = searchParams.get("id");
      const sessionId = searchParams.get("session_id");

      // Case 1: Preview data from sessionStorage
      if (type === "preview") {
        const stored = sessionStorage.getItem("rankready-preview");
        if (stored) {
          try {
            setReport({ ...JSON.parse(stored), type: "preview" });
          } catch {
            // ignore parse errors
          }
        }
        setLoading(false);
        return;
      }

      // Case 2: Full report from Blob by ID
      if (id) {
        try {
          const res = await fetch(
            `https://workcrew.io/api/rank-ready/report-data?id=${encodeURIComponent(id)}`
          );
          if (res.ok) {
            const data = await res.json();
            setReport({ ...data, type: "full" });
          }
        } catch {
          // ignore
        }
        setLoading(false);
        return;
      }

      // Case 3: Just paid — poll for report by session_id
      if (sessionId) {
        // The report may take a few minutes to generate. Show a generating state.
        // For MVP, try loading from blob after a short delay.
        let attempts = 0;
        const poll = async () => {
          try {
            const res = await fetch(
              `/api/rank-ready/report-data?session_id=${encodeURIComponent(sessionId)}`
            );
            if (res.ok) {
              const data = await res.json();
              if (data.businessName) {
                setReport({ ...data, type: "full" });
                setLoading(false);
                return;
              }
            }
          } catch {
            // ignore
          }
          attempts++;
          if (attempts < 30) {
            setTimeout(poll, 10000); // Poll every 10s, max 5 minutes
          } else {
            setLoading(false);
          }
        };
        poll();
        return;
      }

      setLoading(false);
    }

    loadReport();
  }, [searchParams]);

  // --- Copy helper ---
  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // --- Loading state ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 text-[var(--color-primary)] animate-spin" />
        <p className="text-[var(--color-body)] text-center">
          Generating your report... This can take up to 2 minutes.
        </p>
        <p className="text-[var(--color-muted)] text-sm text-center">
          We will also email it to you when it is ready.
        </p>
      </div>
    );
  }

  // --- No data ---
  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-[var(--color-body)] text-center">
          No report data found. Please{" "}
          <Link href="/tools/rank-ready" className="text-[var(--color-primary)] underline">
            start a new audit
          </Link>
          .
        </p>
      </div>
    );
  }

  // --- Render tab content ---
  const renderTab = () => {
    switch (activeTab) {
      case "description":
        return report.gbpDescription ? (
          <div className="space-y-6">
            <p className="text-sm text-[var(--color-body)]">
              Three optimised Google Business Profile descriptions ready to
              copy and paste. Each is under 750 characters.
            </p>
            {report.gbpDescription.variants.map((v, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/40 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-[var(--color-heading)]">
                    {v.label}
                  </h4>
                  <button
                    onClick={() => copyText(v.text, `desc-${i}`)}
                    className="flex items-center gap-1.5 text-xs text-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  >
                    {copiedId === `desc-${i}` ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed whitespace-pre-wrap">
                  {v.text}
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-[var(--color-muted)]">
                  <span>{v.character_count} characters</span>
                  <span>
                    Keywords: {v.keywords_used?.join(", ") || "N/A"}
                  </span>
                </div>
              </div>
            ))}
            {report.gbpDescription.tips?.length > 0 && (
              <div className="rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-4">
                <h4 className="text-sm font-semibold text-[var(--color-primary)] mb-2">
                  Tips
                </h4>
                <ul className="text-sm text-[var(--color-body)] space-y-1">
                  {report.gbpDescription.tips.map((t, i) => (
                    <li key={i}>- {t}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null;

      case "reviews":
        return report.reviewStrategy ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-4 py-2">
                <span className="text-xs text-[var(--color-body)]">Monthly Target</span>
                <p className="text-2xl font-bold text-[var(--color-success)]">
                  {report.reviewStrategy.monthly_target}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[var(--color-heading)] mb-3">
                Review Request Templates
              </h4>
              {(
                [
                  ["SMS", report.reviewStrategy.request_templates.sms],
                  ["Email", report.reviewStrategy.request_templates.email],
                  [
                    "In-Person Script",
                    report.reviewStrategy.request_templates.in_person_script,
                  ],
                ] as const
              ).map(([label, text], i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/40 p-4 mb-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[var(--color-body)]">
                      {label}
                    </span>
                    <button
                      onClick={() => copyText(text, `review-req-${i}`)}
                      className="flex items-center gap-1.5 text-xs text-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    >
                      {copiedId === `review-req-${i}` ? (
                        <>
                          <Check className="h-3.5 w-3.5" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-[var(--color-muted)] whitespace-pre-wrap">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[var(--color-heading)] mb-3">
                Review Response Templates
              </h4>
              {(
                [
                  ["Positive", report.reviewStrategy.response_templates.positive],
                  ["Negative", report.reviewStrategy.response_templates.negative],
                  ["Neutral", report.reviewStrategy.response_templates.neutral],
                ] as const
              ).map(([label, text], i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/40 p-4 mb-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[var(--color-body)]">
                      {label} Review
                    </span>
                    <button
                      onClick={() => copyText(text, `review-resp-${i}`)}
                      className="flex items-center gap-1.5 text-xs text-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    >
                      {copiedId === `review-resp-${i}` ? (
                        <>
                          <Check className="h-3.5 w-3.5" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-[var(--color-muted)] whitespace-pre-wrap">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {report.reviewStrategy.quick_wins?.length > 0 && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <h4 className="text-sm font-semibold text-[var(--color-success)] mb-2">
                  Quick Wins — Do This Week
                </h4>
                <ol className="text-sm text-[var(--color-body)] space-y-1 list-decimal list-inside">
                  {report.reviewStrategy.quick_wins.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ) : null;

      case "services":
        return report.serviceDescriptions ? (
          <div className="space-y-6">
            <p className="text-sm text-[var(--color-body)]">
              SEO-optimised service page content ready to add to your website.
            </p>
            {report.serviceDescriptions.pages.map((page, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/40 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-semibold text-[var(--color-heading)]">
                    {page.service_name}
                  </h4>
                  <button
                    onClick={() =>
                      copyText(
                        `${page.h1}\n\n${page.intro_paragraph}\n\n${page.sections.map((s) => `${s.heading}\n${s.content}`).join("\n\n")}`,
                        `service-${i}`
                      )
                    }
                    className="flex items-center gap-1.5 text-xs text-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  >
                    {copiedId === `service-${i}` ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy All
                      </>
                    )}
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-xs text-[var(--color-muted)]">
                    <span className="font-medium">Page Title:</span>{" "}
                    {page.page_title}
                  </div>
                  <div className="text-xs text-[var(--color-muted)]">
                    <span className="font-medium">Meta Description:</span>{" "}
                    {page.meta_description}
                  </div>
                  <h5 className="text-lg font-bold text-[var(--color-heading)] mt-3">
                    {page.h1}
                  </h5>
                  <p className="text-[var(--color-muted)] leading-relaxed">
                    {page.intro_paragraph}
                  </p>
                  {page.sections.map((sec, j) => (
                    <div key={j} className="mt-3">
                      <h6 className="text-sm font-semibold text-[var(--color-heading)] mb-1">
                        {sec.heading}
                      </h6>
                      <p className="text-[var(--color-body)] leading-relaxed whitespace-pre-wrap">
                        {sec.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null;

      case "categories":
        if (isPreview) {
          return (
            <LockedSection
              title="GBP Category Audit"
              description="See which Google Business Profile categories your competitors have that you are missing. Unlock with the full report."
            />
          );
        }
        return report.categoryAudit ? (
          <div className="space-y-6">
            <p className="text-sm text-[var(--color-body)]">
              {report.categoryAudit.summary}
            </p>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <h4 className="text-sm font-semibold text-[var(--color-success)] mb-1">
                Recommended Primary Category
              </h4>
              <p className="text-base font-bold text-[var(--color-heading)]">
                {report.categoryAudit.recommended_primary.category}
              </p>
              <p className="text-sm text-[var(--color-body)] mt-1">
                {report.categoryAudit.recommended_primary.reason}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[var(--color-heading)] mb-3">
                Recommended Secondary Categories
              </h4>
              <div className="space-y-2">
                {report.categoryAudit.recommended_secondary.map((cat, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)]/40 p-3 flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-[var(--color-heading)]">
                          {cat.category}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            cat.priority === "high"
                              ? "bg-red-500/15 text-red-400"
                              : cat.priority === "medium"
                                ? "bg-yellow-500/15 text-yellow-400"
                                : "bg-[var(--color-muted)]/15 text-[var(--color-body)]"
                          }`}
                        >
                          {cat.priority}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-body)]">{cat.reason}</p>
                      <p className="text-xs text-[var(--color-muted)] mt-1">
                        Searches unlocked:{" "}
                        {cat.searches_it_unlocks?.join(", ") || "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {report.categoryAudit.competitor_comparison?.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-[var(--color-heading)] mb-3">
                  Competitor Comparison
                </h4>
                {report.categoryAudit.competitor_comparison.map((comp, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)]/40 p-3 mb-2"
                  >
                    <span className="text-sm font-medium text-[var(--color-heading)]">
                      {comp.competitor}
                    </span>
                    <p className="text-xs text-[var(--color-body)] mt-1">
                      Likely categories:{" "}
                      {comp.likely_categories?.join(", ") || "Unknown"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null;

      case "calendar":
        if (isPreview) {
          return (
            <LockedSection
              title="4-Week GBP Posting Calendar"
              description="Get 12 fully written Google Business Profile posts with titles, bodies, CTAs, and image suggestions. Unlock with the full report."
            />
          );
        }
        return report.postingCalendar ? (
          <div className="space-y-6">
            <p className="text-sm text-[var(--color-body)]">
              {report.postingCalendar.strategy_notes}
            </p>
            {report.postingCalendar.weeks.map((week) => (
              <div key={week.week_number}>
                <h4 className="text-sm font-semibold text-[var(--color-heading)] mb-3">
                  Week {week.week_number}
                </h4>
                <div className="space-y-3">
                  {week.posts.map((post, j) => (
                    <div
                      key={j}
                      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/40 p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-[var(--color-primary)]">
                            {post.day}
                          </span>
                          <span className="text-[10px] bg-[var(--color-surface)] text-[var(--color-body)] px-1.5 py-0.5 rounded">
                            {post.post_type}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            copyText(
                              `${post.title}\n\n${post.body}`,
                              `post-${week.week_number}-${j}`
                            )
                          }
                          className="flex items-center gap-1.5 text-xs text-[var(--color-primary)] hover:text-[var(--color-primary)]"
                        >
                          {copiedId ===
                          `post-${week.week_number}-${j}` ? (
                            <>
                              <Check className="h-3.5 w-3.5" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <h5 className="text-sm font-semibold text-[var(--color-heading)] mb-1">
                        {post.title}
                      </h5>
                      <p className="text-sm text-[var(--color-body)] leading-relaxed whitespace-pre-wrap">
                        {post.body}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-[var(--color-muted)]">
                        <span>CTA: {post.cta_type}</span>
                        <span>Image: {post.image_suggestion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-emerald-500 mb-4 block">
          {isPreview ? "Free Preview" : "Full Report"}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-[var(--color-heading)] leading-tight tracking-tight mb-3">
          Local SEO Report: {report.businessName}
        </h1>
        <p className="text-sm text-[var(--color-muted)]">
          Generated on {new Date().toLocaleDateString("en-GB")}
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-3xl mx-auto">
        <div className="flex overflow-x-auto gap-1 mb-8 border-b border-[var(--color-border)] pb-px">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            const locked = isPreview && !tab.free;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  active
                    ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                    : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-muted)]"
                }`}
              >
                {locked ? (
                  <Lock className="h-3.5 w-3.5" />
                ) : (
                  <Icon className="h-3.5 w-3.5" />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>

        {/* Upgrade CTA for preview */}
        {isPreview && (
          <div className="mt-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
            <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-2">
              Get the Complete Report
            </h3>
            <p className="text-sm text-[var(--color-body)] mb-4">
              Unlock GBP Category Audit and 4-Week Posting Calendar — plus get
              a branded PDF emailed to you.
            </p>
            <Link
              href="/tools/rank-ready"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-[var(--color-bg)] hover:bg-emerald-500 transition-colors"
            >
              Get Full Report — £49
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/60 p-6 text-center">
          <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-2">
            Want Us to Implement This for You?
          </h3>
          <p className="text-sm text-[var(--color-body)] mb-4">
            Book a free 30-minute strategy call and we will walk through your
            report together, then handle the implementation.
          </p>
          <Link
            href="https://cal.com/workcrew/free-ai-strategy-call"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-[var(--color-bg)] hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Book a Free Strategy Call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Locked section placeholder
// ---------------------------------------------------------------------------

function LockedSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-full bg-[var(--color-surface)] flex items-center justify-center mb-4">
        <Lock className="h-6 w-6 text-[var(--color-muted)]" />
      </div>
      <h4 className="text-lg font-semibold text-[var(--color-heading)] mb-2">{title}</h4>
      <p className="text-sm text-[var(--color-body)] max-w-md mb-6">{description}</p>
      <Link
        href="/tools/rank-ready"
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-[var(--color-bg)] hover:bg-emerald-500 transition-colors"
      >
        Unlock — £49
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page export with Suspense boundary for useSearchParams
// ---------------------------------------------------------------------------

export default function RankReadyReportPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 text-[var(--color-primary)] animate-spin" />
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}
