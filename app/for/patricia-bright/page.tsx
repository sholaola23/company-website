"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Linkedin,
  Play,
  FileText,
  Mic,
  Mail,
  MessageSquare,
  CalendarDays,
  Sparkles,
  LayoutGrid,
  Share2,
  ImageIcon,
  Video,
} from "lucide-react";
import Link from "next/link";
import PasswordGate from "@/components/prospect/PasswordGate";
import ChatDemo from "@/components/prospect/ChatDemo";

// ---------------------------------------------------------------------------
// Auth wrapper — checks cookie via a simple ping, shows gate if not authed
// ---------------------------------------------------------------------------

export default function PatriciaPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    // Probe the API — if the httpOnly cookie exists, this will 204, else 401
    fetch("/api/auth/prospect/check?slug=patricia-bright")
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    // Loading state
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-zinc-700 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return (
      <PasswordGate
        slug="patricia-bright"
        onAuthenticated={() => setAuthed(true)}
      />
    );
  }

  return <PatriciaContent />;
}

// ---------------------------------------------------------------------------
// Fade-in section wrapper
// ---------------------------------------------------------------------------

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ---------------------------------------------------------------------------
// Business cards data
// ---------------------------------------------------------------------------

const BUSINESSES = [
  {
    name: "The Break Co. Agency",
    hours: "5–8 hrs/week",
    tagline: "Talent management across London and Dubai.",
    topOp: "AI-powered brand enquiry qualification — fast-track the best briefs, auto-decline the rest.",
    finding:
      "Brand enquiries are handled manually with no automated qualification or discovery-call booking.",
    colour: "from-blue-600/20 to-blue-600/5",
    border: "border-blue-500/20",
    badge: "bg-blue-500/10 text-blue-400",
    detail: {
      what: "Talent management and brand consultancy connecting creators with brands across London and Dubai.",
      opportunities: [
        {
          title: "Intelligent Brand Enquiry System",
          desc:
            "AI reads each brief, extracts budget, timeline, and campaign type, then scores it against your criteria. High-quality leads get fast-tracked. Low-quality leads get a professional response instantly.",
        },
        {
          title: "Automated Discovery Call Booking",
          desc:
            "Qualified brands go straight to a booking page. No back-and-forth emails. Timezone differences between London and Dubai handled automatically.",
        },
        {
          title: "Campaign Workflow Tracking",
          desc:
            "AI tracks milestones — contract sent, content delivered, brand approved, payment received — and alerts when something stalls.",
        },
      ],
      impact: "Brand response time drops from days to minutes. Fewer qualified leads fall through.",
    },
  },
  {
    name: "UWA Hair Care",
    hours: "4–6 hrs/week",
    tagline: "D2C hair care on Shopify with a loyal, engaged customer base.",
    topOp: "24/7 AI customer service chatbot trained on your product range — we've already built it.",
    finding:
      "No live chat or AI customer support. Customer questions about products and ingredients are handled manually.",
    colour: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/20",
    badge: "bg-amber-500/10 text-amber-400",
    detail: {
      what: "Direct-to-consumer hair care brand on Shopify. Oils, treatments, and accessories.",
      opportunities: [
        {
          title: "24/7 Customer Service Chatbot",
          desc:
            'AI trained on your product range, ingredients, and FAQs. Handles "Which oil is best for 4C hair?", "Is this safe during pregnancy?", delivery questions — automatically. Escalates complex cases to a real person.',
        },
        {
          title: "Automated Review Collection",
          desc:
            "Happy customers get directed to leave public reviews. Unhappy customers get directed to support first — fix the issue before it becomes a one-star rating.",
        },
        {
          title: "Post-Purchase Email Intelligence",
          desc:
            "Someone who bought a hair oil three months ago gets a replenishment reminder. Someone who bought one product gets a recommendation for the complementary one.",
        },
      ],
      impact: "15–25% increase in review volume within 90 days. Measurable lift in repeat purchase rate.",
    },
  },
  {
    name: "The Break Platform",
    hours: "3–5 hrs/week",
    tagline: "Blog, podcast, digital shop, and Glow Up Retreats.",
    topOp: "Content-to-product funnels — someone reading your money articles gets a contextual prompt for the Mind & Money Planner.",
    finding:
      "Content and products exist in separate worlds. Glow Up Retreats have no automated booking or follow-up system.",
    colour: "from-purple-500/20 to-purple-500/5",
    border: "border-purple-500/20",
    badge: "bg-purple-500/10 text-purple-400",
    detail: {
      what: "Content platform with blog, podcast (The Break), digital shop (Mind & Money Planner), and Glow Up Retreats.",
      opportunities: [
        {
          title: "Retreat Booking and Nurture System",
          desc:
            "Automated interest capture, confirmation, warm-up sequence (testimonials, prep tips), post-event follow-up and upsell. Turns one-time attendees into repeat customers.",
        },
        {
          title: "Intelligent Email Segmentation",
          desc:
            "Send different content based on behaviour — money readers get financial content, lifestyle readers get lifestyle content. The system learns what works and adjusts.",
        },
        {
          title: "Content-to-Product Funnels",
          desc:
            "When someone reads a financial planning article, they get a contextual, timed prompt for the Mind & Money Planner — not a generic popup.",
        },
      ],
      impact: "Higher conversion from content readers to product buyers. Retreat sign-ups with less manual follow-up.",
    },
  },
  {
    name: "PPM Creative",
    hours: "10–15 hrs/week",
    tagline: "The content engine powering 2.9M YouTube subscribers and 6+ platforms.",
    topOp: "AI content repurposing engine — one YouTube video becomes 8–10 platform-ready assets automatically.",
    finding:
      "Content goes out across 6+ platforms, each requiring different formats and captions — all handled manually by a smaller team.",
    colour: "from-rose-500/20 to-rose-500/5",
    border: "border-rose-500/20",
    badge: "bg-rose-500/10 text-rose-400",
    detail: {
      what: "Brand collaborations, video production, editing, and distribution across YouTube (2.9M), Instagram (1.26M), TikTok, and more.",
      opportunities: [
        {
          title: "AI Content Repurposing Engine",
          desc:
            "You film one YouTube video. AI generates: a short-form clip for TikTok/Reels/Shorts, an Instagram carousel, a quote graphic, a blog post, a newsletter segment, and an audiogram. 8–10 assets. Your team approves.",
        },
        {
          title: "Automated Scheduling and Publishing",
          desc:
            "Once approved, assets post at optimal times for each platform. No manual uploading, no missed TikToks.",
        },
        {
          title: "Brand Deal Pipeline Tracking",
          desc:
            "AI tracks every deal from enquiry to payment. Overdue invoices get flagged. Stalled contracts get alerts. Revenue stops slipping through the cracks.",
        },
      ],
      impact: "10–15 hours/week saved on repurposing and distribution. That's two full working days, every week.",
    },
  },
];

// ---------------------------------------------------------------------------
// Quote card data
// ---------------------------------------------------------------------------

const QUOTE_CARDS = [
  {
    quote: "Clarity will remove panic. You cannot fix what you refuse to look at.",
    bg: "bg-[#1B2A4A]",
    text: "text-white",
    accent: "border-l-4 border-blue-400",
  },
  {
    quote:
      "Financial pressure makes people feel very uncomfortable and decisions rooted in fear become very expensive.",
    bg: "bg-[#1C1C1C]",
    text: "text-white",
    accent: "border-l-4 border-yellow-400",
  },
  {
    quote: "High earners price outcomes. Most people under-earn because they price on their time.",
    bg: "bg-[#6B1D2A]",
    text: "text-white",
    accent: "border-l-4 border-rose-300",
  },
  {
    quote: "Wealth isn't built on vibes. It's built on structure.",
    bg: "bg-[#F5F0EB]",
    text: "text-zinc-900",
    accent: "border-l-4 border-zinc-900",
  },
  {
    quote: "You cannot shrink your way to wealth.",
    bg: "bg-black",
    text: "text-white",
    accent: "",
  },
];

// ---------------------------------------------------------------------------
// Expandable business detail panel
// ---------------------------------------------------------------------------

function BusinessDetail({
  detail,
}: {
  detail: (typeof BUSINESSES)[0]["detail"];
}) {
  return (
    <div className="mt-4 pt-4 border-t border-zinc-800 space-y-4">
      <p className="text-sm text-zinc-400">{detail.what}</p>
      <div className="space-y-3">
        {detail.opportunities.map((op) => (
          <div key={op.title} className="pl-3 border-l border-zinc-700">
            <p className="text-sm font-semibold text-zinc-200 mb-0.5">{op.title}</p>
            <p className="text-sm text-zinc-500">{op.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-zinc-400 italic">{detail.impact}</p>
    </div>
  );
}

function BusinessCard({ biz }: { biz: (typeof BUSINESSES)[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`relative rounded-2xl bg-gradient-to-br ${biz.colour} border ${biz.border} p-5 transition-all`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-base font-semibold text-zinc-50">{biz.name}</h3>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 flex items-center gap-1 ${biz.badge}`}>
          <Clock className="w-3 h-3" />
          {biz.hours}
        </span>
      </div>
      <p className="text-sm text-zinc-400 mb-2">{biz.tagline}</p>
      <p className="text-sm text-zinc-300 mb-3">{biz.finding}</p>
      <div className="bg-zinc-900/60 rounded-lg px-3 py-2 mb-3">
        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-0.5">Top Opportunity</p>
        <p className="text-sm text-zinc-200">{biz.topOp}</p>
      </div>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        aria-expanded={expanded}
      >
        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        {expanded ? "Hide full breakdown" : "See full breakdown"}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <BusinessDetail detail={biz.detail} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Short clip card
// ---------------------------------------------------------------------------

function ClipCard({
  number,
  title,
  hook,
  platforms,
  caption,
}: {
  number: string;
  title: string;
  hook: string;
  platforms: string[];
  caption: string;
}) {
  const PLATFORM_STYLES: Record<string, string> = {
    TikTok: "bg-zinc-800 text-zinc-300",
    Reels: "bg-pink-500/20 text-pink-400",
    Shorts: "bg-red-500/20 text-red-400",
    LinkedIn: "bg-blue-500/20 text-blue-400",
    "Twitter/X": "bg-zinc-700 text-zinc-300",
    Facebook: "bg-blue-600/20 text-blue-400",
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
          <Play className="w-3 h-3 text-zinc-400 fill-zinc-400" />
        </div>
        <span className="text-xs text-zinc-500">Clip {number}</span>
      </div>
      <p className="text-base font-semibold text-zinc-50">{title}</p>
      <div className="bg-zinc-800 rounded-lg px-3 py-2">
        <p className="text-xs text-zinc-500 mb-0.5">Hook (first 3 seconds)</p>
        <p className="text-sm text-zinc-200 italic">&ldquo;{hook}&rdquo;</p>
      </div>
      <p className="text-sm text-zinc-500 leading-relaxed">{caption}</p>
      <div className="flex flex-wrap gap-1.5">
        {platforms.map((p) => (
          <span
            key={p}
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${PLATFORM_STYLES[p] ?? "bg-zinc-800 text-zinc-400"}`}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Content asset icons
// ---------------------------------------------------------------------------

const ASSET_TYPES = [
  { icon: Play, label: "3 Short Clips", sub: "TikTok · Reels · Shorts" },
  { icon: ImageIcon, label: "Instagram Carousel", sub: "5 slides, save-worthy" },
  { icon: Share2, label: "Twitter/X Thread", sub: "5-tweet thread" },
  { icon: Linkedin, label: "LinkedIn Post", sub: "Thought leadership" },
  { icon: MessageSquare, label: "5 Quote Cards", sub: "Designed, brand-colours" },
  { icon: Mic, label: "Audiogram", sub: "60-second audio visual" },
  { icon: Mail, label: "Newsletter Snippet", sub: "The Break ready" },
  { icon: FileText, label: "Blog Post", sub: "SEO-optimised, 800 words" },
];

// ---------------------------------------------------------------------------
// Main content (shown after auth)
// ---------------------------------------------------------------------------

function PatriciaContent() {
  const [blueprintExpanded, setBlueprintExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">

      {/* ------------------------------------------------------------------ */}
      {/* 1. Hero                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center px-5 py-24">
        {/* Gradient blobs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-purple-600/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-6"
          >
            Built exclusively for Patricia Bright
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-50 leading-tight tracking-tight mb-6"
          >
            Patricia, we built this for you.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            No pitch. No obligation. Just three things we thought you&apos;d find useful — built before we said a word.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { label: "AI Operations Blueprint", colour: "text-blue-400", dot: "bg-blue-500" },
              { label: "Content Repurposing Pack", colour: "text-purple-400", dot: "bg-purple-500" },
              { label: "Live UWA Chatbot", colour: "text-amber-400", dot: "bg-amber-500" },
            ].map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-sm"
              >
                <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                <span className={item.colour}>{item.label}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. AI Operations Blueprint                                           */}
      {/* ------------------------------------------------------------------ */}
      <Section
        id="blueprint"
        className="px-5 py-20 max-w-6xl mx-auto"
      >
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 text-xs font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <LayoutGrid className="w-3.5 h-3.5" />
            Deliverable 1 of 3
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-4">
            Your AI Operations Blueprint
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            We analysed all four of your businesses and found{" "}
            <span className="text-zinc-50 font-semibold">25–35 hours of automatable work per week</span>
            {" "}— the equivalent of a full-time employee.
          </p>
        </div>

        {/* Total savings banner */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6 mb-10 text-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: "Hours/week automatable", value: "25–35" },
              { label: "Annual equivalent", value: "1,800 hrs" },
              { label: "Cost if done with people", value: "£35K/yr" },
              { label: "Our delivery timeline", value: "7-day sprint" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-zinc-50 mb-1">{stat.value}</p>
                <p className="text-xs text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Business grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {BUSINESSES.map((biz) => (
            <BusinessCard key={biz.name} biz={biz} />
          ))}
        </div>

        {/* Cross-business section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-zinc-50 mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            Cross-Business Opportunities
          </h3>
          <p className="text-sm text-zinc-400 mb-4">
            You said something in your video that stuck with us: that the loss crept up because you
            didn&apos;t have control of what was going on overall. This is the most important section.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: "Unified Business Dashboard",
                desc: "One screen showing the health of all four businesses — revenue, invoices, support volume, content performance. Not four logins. One view, updated daily.",
              },
              {
                title: "Centralised Contact Management",
                desc: "A brand working with The Break Co. and PPM Creative shouldn't exist in two worlds. One system, full relationship history across all four entities.",
              },
              {
                title: "AI Financial Monitoring",
                desc: "Cash flow anomalies flagged early. Unusual spending increases. Invoice payments overdue. The early warning system that catches problems before they become accountant news.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-zinc-800/50 rounded-xl p-4">
                <p className="text-sm font-semibold text-zinc-200 mb-1.5">{item.title}</p>
                <p className="text-sm text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Full report expandable */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setBlueprintExpanded((v) => !v)}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-700 px-4 py-2.5 rounded-xl transition-all"
            aria-expanded={blueprintExpanded}
          >
            {blueprintExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {blueprintExpanded ? "Collapse full report" : "Read the full report narrative"}
          </button>

          <AnimatePresence>
            {blueprintExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden text-left mt-6"
              >
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6 text-sm text-zinc-400 leading-relaxed">
                  <div>
                    <h4 className="text-zinc-200 font-semibold mb-2">Executive Summary</h4>
                    <p>
                      We watched your recent video about rebuilding after discovering you were down on paper.
                      One line stood out: you said you&apos;d invested in software and tools to understand
                      what&apos;s happening across your businesses. That&apos;s exactly what we do — except
                      we take it further. We don&apos;t just give you visibility. We automate the repetitive
                      work that&apos;s eating your team&apos;s time.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-zinc-200 font-semibold mb-2">ROI Summary</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <tbody>
                          {(
                            [
                              ["Total automatable hours", "25–35 hours/week across all 4 businesses"],
                              ["Annual equivalent", "1,300–1,800 hours/year"],
                              ["Cost of doing this with people", "Equivalent to 1 FTE at £25–35K/year"],
                              ["Our implementation timeline", "7-day sprint per business"],
                              ["Our guarantee", "90 days — if you don't save 5+ hrs/week, we refund the setup fee"],
                            ] as [string, string][]
                          ).map(([key, val]) => (
                            <tr key={key} className="border-b border-zinc-800">
                              <td className="py-2 pr-4 text-zinc-500 font-medium">{key}</td>
                              <td className="py-2 text-zinc-300">{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-zinc-200 font-semibold mb-2">Recommended Phased Approach</h4>
                    <ol className="space-y-2">
                      {(
                        [
                          ["Phase 1 — Week 1", "UWA Chatbot. Already built. Quickest win. Live within days."],
                          ["Phase 2 — Weeks 2–3", "The Break Co. Lead Intake. Highest revenue impact. Every unanswered enquiry is a potential deal lost."],
                          ["Phase 3 — Weeks 3–4", "PPM Creative Content Engine. 10–15 hours/week back — that's two full working days."],
                          ["Phase 4 — Week 5", "Cross-Business Dashboard. One screen for all four businesses."],
                        ] as [string, string][]
                      ).map(([phase, desc]) => (
                        <li key={phase} className="flex gap-3">
                          <span className="text-zinc-500 font-medium flex-shrink-0">{phase}:</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-5">
        <div className="h-px bg-zinc-800" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Content Repurposing Pack                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section className="px-5 py-20 max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 text-xs font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Deliverable 2 of 3
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-4">
            One Video. 8+ Assets. Ready to Post.
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            We took your latest YouTube video — &ldquo;If I Wanted to Make My First $100K in 2026&rdquo; — and turned
            it into a full content pack. This is what the AI engine produces for every video, automatically.
          </p>
        </div>

        {/* Asset overview grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {ASSET_TYPES.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                <Icon className="w-4 h-4 text-zinc-400" />
              </div>
              <p className="text-sm font-semibold text-zinc-200 leading-tight">{label}</p>
              <p className="text-xs text-zinc-600">{sub}</p>
            </div>
          ))}
        </div>

        {/* Short clips */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-zinc-200 mb-1">Short Clips — Ready to Cut</h3>
          <p className="text-sm text-zinc-500 mb-5">
            Three clips from your video, with hooks, captions, and platform recommendations.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <ClipCard
              number="01"
              title="The £700K Wake-Up Call"
              hook="I sat down with my accountant and found out I was £700,000 down."
              platforms={["TikTok", "Reels", "Shorts"]}
              caption="I lost £700K on paper. Not because I was reckless — because I wasn't paying attention. Clarity will remove panic. #MoneyTalk #FinancialClarity"
            />
            <ClipCard
              number="02"
              title="Stop Pricing Your Time"
              hook="Most people under-earn because they price on their time."
              platforms={["LinkedIn", "Twitter/X", "TikTok"]}
              caption="You're not underpaid. You're underpriced. High earners don't charge for hours — they charge for outcomes. #IncomeFirst #WealthMindset"
            />
            <ClipCard
              number="03"
              title="Wealth Isn't Built on Vibes"
              hook="Wealth isn't built on vibes. It's built on structure."
              platforms={["Reels", "Shorts", "Facebook"]}
              caption="I stopped guessing and started structuring. Software. Systems. Operators. Vibes don't build wealth — structure does. #BusinessSystems"
            />
          </div>
        </div>

        {/* Instagram Carousel */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-zinc-200 mb-1">Instagram Carousel — 5 Slides</h3>
          <p className="text-sm text-zinc-500 mb-5">
            Caption: &ldquo;I lost £700K on paper. Here&apos;s the exact 3-step framework I used to rebuild. Save this.&rdquo;
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              {
                n: "1",
                title: "How I'd Make My First £100K in 2026",
                sub: "After discovering I was £700K down",
                bg: "bg-zinc-900",
              },
              {
                n: "2",
                title: "Step 1: Audit Everything",
                sub: "List every income source, expense, debt, liability. Calculate your survival number.",
                bg: "bg-zinc-800",
              },
              {
                n: "3",
                title: "Step 2: Stabilise the Floor",
                sub: "Decisions rooted in fear become expensive. Build the floor first.",
                bg: "bg-zinc-900",
              },
              {
                n: "4",
                title: "Step 3: Income First",
                sub: "You cannot shrink your way to wealth. Price outcomes, not time.",
                bg: "bg-zinc-800",
              },
              {
                n: "5",
                title: "The Framework",
                sub: "Clarity. Cash Flow. Assets. In that order. Always.",
                bg: "bg-zinc-900",
              },
            ].map((slide) => (
              <div
                key={slide.n}
                className={`flex-shrink-0 w-44 h-44 rounded-xl ${slide.bg} border border-zinc-700 p-4 flex flex-col justify-between`}
              >
                <span className="text-xs text-zinc-600">{slide.n} / 5</span>
                <div>
                  <p className="text-sm font-semibold text-zinc-100 leading-tight mb-1">{slide.title}</p>
                  <p className="text-xs text-zinc-500 leading-snug">{slide.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Twitter thread */}
        <div className="mb-12 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-zinc-200 mb-1 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Twitter/X Thread
            </h3>
            <p className="text-sm text-zinc-500 mb-4">5-tweet thread, structured to drive profile visits.</p>
            <div className="space-y-2">
              {[
                "I sat down with my accountant and found out I was £700,000 down on paper. Not from reckless spending. From not paying attention. Here's the 3-step framework I'd use to make my first £100K in 2026:",
                "Step 1: AUDIT EVERYTHING. List every income source, expense, subscription, debt, asset, liability. Calculate your monthly burn rate. Work out your survival number.",
                "Step 2: STABILISE BEFORE YOU SCALE. Financial pressure makes people chase revenue out of fear. Fear-based decisions are expensive decisions. Build the floor first.",
                "Step 3: INCOME FIRST. You cannot shrink your way to wealth. Stop pricing your time. Start pricing outcomes. High earners price outcomes.",
                "The framework is 3 words: Clarity. Cash Flow. Assets. In that order. Always. Wealth isn't built on vibes. It's built on structure.",
              ].map((tweet, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
                  <p className="text-xs text-zinc-600 mb-1">Tweet {i + 1}</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">{tweet}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-200 mb-1 flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              LinkedIn Post
            </h3>
            <p className="text-sm text-zinc-500 mb-4">Thought leadership angle for the professional audience.</p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4">
              <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{`I discovered I was £700,000 down on paper.

Not from a catastrophic decision. From a slow, creeping lack of visibility across my businesses.

My team changed. Structures shifted. Cash flow moved between entities. And I wasn't monitoring closely enough.

Here's what I did:

1. Audited everything — every income source, expense, subscription, debt.

2. Stabilised the floor — before chasing revenue, I built the financial foundation.

3. Focused on income, not cuts — you cannot shrink your way to wealth.

The real lesson: the loss crept up because I lacked operational visibility.

Wealth isn't built on vibes. It's built on structure.

#Entrepreneurship #BusinessStrategy #FinancialClarity`}</p>
            </div>
          </div>
        </div>

        {/* Quote cards */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-zinc-200 mb-1">Quote Cards — 5 Designs</h3>
          <p className="text-sm text-zinc-500 mb-5">
            Each card uses the brand colours from the original design brief. Ready to export at 2x.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUOTE_CARDS.map((card, i) => (
              <div
                key={i}
                className={`${card.bg} ${card.text} ${card.accent} rounded-2xl p-6 min-h-[140px] flex flex-col justify-between`}
              >
                <p className="text-base font-semibold leading-relaxed">&ldquo;{card.quote}&rdquo;</p>
                <p className={`text-xs mt-3 ${card.text === "text-zinc-900" ? "text-zinc-500" : "text-zinc-400"}`}>
                  — Patricia Bright
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Audiogram + Newsletter */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Audiogram concept */}
          <div className="bg-gradient-to-br from-[#0D1B2A] to-[#1B3A4B] border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Mic className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-semibold text-zinc-100">Audiogram Concept</h3>
            </div>
            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Selected Clip</p>
            <p className="text-sm font-semibold text-zinc-200 mb-3">&ldquo;The Audit That Changed Everything&rdquo;</p>
            {/* Fake waveform */}
            <div className="flex items-end gap-0.5 h-10 mb-4" aria-hidden="true">
              {[3, 6, 9, 12, 8, 5, 10, 14, 11, 7, 13, 9, 6, 10, 14, 8, 5, 9, 12, 7, 4, 8, 11, 6, 9, 13, 10, 7, 4, 8].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full bg-amber-400/60"
                  style={{ height: `${h * 2.5}px` }}
                />
              ))}
            </div>
            <div className="space-y-1">
              {[
                "I sat down with my accountant...",
                "...and found out I was £700,000 down.",
                "Clarity will remove panic.",
                "You cannot fix what you refuse to look at.",
              ].map((line) => (
                <p key={line} className="text-xs text-zinc-400">{line}</p>
              ))}
            </div>
            <p className="text-xs text-zinc-600 mt-3">60 seconds · Instagram · TikTok · LinkedIn</p>
          </div>

          {/* Newsletter snippet */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-blue-400" />
              <h3 className="text-base font-semibold text-zinc-100">Newsletter Snippet</h3>
            </div>
            <div className="space-y-2 mb-4">
              <div className="bg-zinc-800 rounded-lg px-3 py-2">
                <p className="text-xs text-zinc-500 mb-0.5">Subject line</p>
                <p className="text-sm text-zinc-200">I was £700K down. Here&apos;s my 3-word rebuild framework.</p>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              A few months ago, I sat with my accountant and got the kind of news that rearranges your priorities.
              I was £700,000 down on paper. Not from one bad call — from a slow, creeping lack of visibility
              across my businesses.
            </p>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              So I rebuilt the whole system around three words:{" "}
              <span className="text-zinc-200 font-semibold">Clarity. Cash Flow. Assets.</span>
            </p>
            <div className="mt-4 bg-blue-600/10 border border-blue-500/20 rounded-lg px-3 py-2 text-center">
              <p className="text-sm text-blue-400 font-medium">Watch the Full Breakdown on YouTube →</p>
            </div>
            <p className="text-xs text-zinc-600 mt-3">~195 words · The Break newsletter format</p>
          </div>
        </div>
      </Section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-5">
        <div className="h-px bg-zinc-800" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 4. Live UWA Chatbot                                                  */}
      {/* ------------------------------------------------------------------ */}
      <Section className="px-5 py-20 max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-xs font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <Video className="w-3.5 h-3.5" />
            Deliverable 3 of 3
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-4">
            Your UWA Customer Service Bot
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Trained on your actual products. Answers in your brand voice. 24/7. Try it.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <ChatDemo />

          <div className="max-w-xl text-center">
            <p className="text-sm text-zinc-500 leading-relaxed">
              This prototype answers questions about your product range, ingredients, and shipping.
              The production version connects directly to your Shopify store, handles returns, integrates
              with order tracking, and escalates complex issues to your team — all without any manual work.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 w-full max-w-2xl">
            {[
              { stat: "40–60%", label: "of queries handled automatically" },
              { stat: "24/7", label: "availability, no staff required" },
              { stat: "4–6 hrs", label: "saved per week on support" },
            ].map((item) => (
              <div key={item.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-amber-400 mb-1">{item.stat}</p>
                <p className="text-xs text-zinc-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-5">
        <div className="h-px bg-zinc-800" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 5. CTA                                                               */}
      {/* ------------------------------------------------------------------ */}
      <Section className="px-5 py-24 max-w-3xl mx-auto text-center">
        <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">
          No pitch. No strings.
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-4">
          If any of this is useful, we&apos;d love 15 minutes.
        </h2>
        <p className="text-lg text-zinc-400 leading-relaxed mb-10">
          No sales team. No gatekeepers. A 15-minute call to walk through what matters most
          to you right now — and you&apos;d be talking directly to the person who built everything on this page.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            href="https://cal.com/sholastechnotes/free-ai-strategy-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all text-sm"
            aria-label="Book a 15-minute strategy call"
          >
            <CalendarDays className="w-4 h-4" />
            Book a 15-Minute Call
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>

          <Link
            href="https://linkedin.com/in/olushola-oladipupo/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-zinc-100 font-medium rounded-xl transition-all text-sm"
            aria-label="Connect with Olushola on LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
            Connect with Olushola
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>
        </div>

        <p className="text-sm text-zinc-600">
          Built by{" "}
          <Link
            href="https://oladipupoconsulting.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-300 underline underline-offset-2 transition-colors"
          >
            Oladipupo Consulting
          </Link>
          {" "}— AI Automation for Growing Businesses
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. Footer                                                            */}
      {/* ------------------------------------------------------------------ */}
      <footer className="border-t border-zinc-900 px-5 py-8 text-center">
        <p className="text-sm text-zinc-700">
          This page was built specifically for you. No one else can see it.
        </p>
      </footer>
    </div>
  );
}
