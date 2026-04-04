"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Clock,
  CreditCard,
  FileText,
  Share2,
  Users,
  Search,
  Megaphone,
  Globe,
  Phone,
  Zap,
  ArrowRight,
  ArrowLeft,
  Mail,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";
import { INDUSTRIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Opportunity {
  title: string;
  impact: "high" | "medium" | "low";
  hoursSavedPerWeek: number;
  description: string;
  solution: string;
}

interface BlueprintResult {
  headline: string;
  opportunities: Opportunity[];
  totalHoursSaved: number;
  monthlyRevenuePotential: number;
  roiMultiple: number;
  beforeAfter: { before: string; after: string };
  recommendedTier: "starter" | "growth" | "scale";
  tierReason: string;
}

type Step = "industry" | "painPoints" | "channels" | "volume" | "name" | "generating" | "result" | "email" | "complete";

// ---------------------------------------------------------------------------
// Option Data
// ---------------------------------------------------------------------------

const PAIN_POINTS = [
  { id: "responding", label: "Responding to enquiries", icon: MessageSquare, desc: "Leads or customers wait hours (or forever) for a reply" },
  { id: "scheduling", label: "Scheduling & bookings", icon: Calendar, desc: "Back-and-forth to find a time that works" },
  { id: "orders", label: "Managing orders & fulfilment", icon: FileText, desc: "Tracking orders, stock, deliveries, or production manually" },
  { id: "payments", label: "Chasing payments", icon: CreditCard, desc: "Manually following up on unpaid invoices" },
  { id: "admin", label: "Admin & data entry", icon: FileText, desc: "Copy-pasting between spreadsheets, emails, and tools" },
  { id: "content", label: "Content & social media", icon: Share2, desc: "No time to post, create, or manage content regularly" },
  { id: "followups", label: "Customer follow-ups & retention", icon: Users, desc: "Forgetting to check in, send reminders, or re-engage" },
  { id: "website", label: "No website or poor online presence", icon: Globe, desc: "Need a professional website, online menu, or booking page" },
];

const CHANNELS = [
  { id: "google", label: "Google / Website", icon: Search },
  { id: "wordofmouth", label: "Word of mouth", icon: Users },
  { id: "social", label: "Social media", icon: Share2 },
  { id: "ads", label: "Paid ads", icon: Megaphone },
  { id: "directories", label: "Directory listings", icon: Globe },
  { id: "phone", label: "Phone / walk-ins", icon: Phone },
];

const VOLUMES = ["Under 10", "10–30", "30–50", "50–100", "100+"];

// Popular industries shown as visual cards (subset), rest in dropdown
const POPULAR_INDUSTRIES = [
  "Plumbing", "Cleaning", "Salon / Barber", "Restaurant / Cafe",
  "Dentist / Dental", "Gym / Fitness", "Accounting / Finance",
  "Estate Agent", "Construction", "Electrician", "Legal", "Trades",
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BlueprintGenerator() {
  const [step, setStep] = useState<Step>("industry");
  const [direction, setDirection] = useState(1);

  // Answers
  const [industry, setIndustry] = useState("");
  const [painPoints, setPainPoints] = useState<string[]>([]);
  const [channels, setChannels] = useState<string[]>([]);
  const [volume, setVolume] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [customPainPoint, setCustomPainPoint] = useState("");

  // Result
  const [blueprint, setBlueprint] = useState<BlueprintResult | null>(null);
  const [error, setError] = useState("");

  // Email capture
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const stepOrder: Step[] = ["industry", "painPoints", "channels", "volume", "name"];
  const currentIdx = stepOrder.indexOf(step);

  const goNext = useCallback(() => {
    setDirection(1);
    if (currentIdx < stepOrder.length - 1) {
      setStep(stepOrder[currentIdx + 1]);
    }
  }, [currentIdx]);

  const goBack = useCallback(() => {
    setDirection(-1);
    if (currentIdx > 0) {
      setStep(stepOrder[currentIdx - 1]);
    }
  }, [currentIdx]);

  const toggleSelection = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
  };

  // Generate blueprint
  const handleGenerate = async () => {
    setDirection(1);
    setStep("generating");
    setError("");

    try {
      const res = await fetch("/api/blueprint/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry,
          painPoints: [...painPoints.map((id) => PAIN_POINTS.find((p) => p.id === id)?.label ?? id), ...(customPainPoint.trim() ? [customPainPoint.trim()] : [])],
          channels: channels.map((id) => CHANNELS.find((c) => c.id === id)?.label ?? id),
          enquiryVolume: volume,
          businessName,
        }),
      });

      if (!res.ok) throw new Error("Generation failed");

      const data = await res.json();
      setBlueprint(data.blueprint);
      setStep("result");
    } catch {
      setError("Something went wrong generating your blueprint. Please try again.");
      setStep("name");
    }
  };

  // Save email
  const handleSaveEmail = async () => {
    if (!email || !blueprint) return;
    setEmailStatus("loading");

    try {
      await fetch("/api/blueprint/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          businessName,
          industry,
          painPoints: [...painPoints.map((id) => PAIN_POINTS.find((p) => p.id === id)?.label ?? id), ...(customPainPoint.trim() ? [customPainPoint.trim()] : [])],
          channels: channels.map((id) => CHANNELS.find((c) => c.id === id)?.label ?? id),
          enquiryVolume: volume,
          blueprint: {
            headline: blueprint.headline,
            totalHoursSaved: blueprint.totalHoursSaved,
            monthlyRevenuePotential: blueprint.monthlyRevenuePotential,
            recommendedTier: blueprint.recommendedTier,
            opportunities: blueprint.opportunities.map((o) => ({ title: o.title, solution: o.solution })),
          },
        }),
      });

      setEmailStatus("done");
      setStep("complete");
    } catch {
      setEmailStatus("error");
    }
  };

  // Progress bar
  const progress = step === "generating" || step === "result" || step === "email" || step === "complete"
    ? 100
    : ((currentIdx + 1) / stepOrder.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      {step !== "result" && step !== "email" && step !== "complete" && (
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Step {Math.min(currentIdx + 1, 5)} of 5</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      )}

      <div>
          {step === "industry" && (<>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">What type of business do you run?</h2>
            <p className="text-slate-500 mb-6">Pick the closest match — we'll tailor your blueprint to your industry.</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
              {POPULAR_INDUSTRIES.map((ind) => (
                <button key={ind} onClick={() => { setIndustry(ind); setDirection(1); setStep("painPoints"); }} className={cn("p-3 rounded-xl border-2 text-sm font-medium transition-all text-center hover:border-indigo-400 hover:bg-indigo-50", industry === ind ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-700")}>{ind}</button>
              ))}
            </div>
            <select value={POPULAR_INDUSTRIES.includes(industry) ? "" : industry} onChange={(e) => { setIndustry(e.target.value); if (e.target.value) { setDirection(1); setStep("painPoints"); } }} className="w-full p-3 rounded-xl border-2 border-slate-200 text-sm text-slate-600 focus:border-indigo-400 focus:outline-none">
              <option value="">Other industry...</option>
              {INDUSTRIES.filter((i) => !POPULAR_INDUSTRIES.includes(i)).map((ind) => (<option key={ind} value={ind}>{ind}</option>))}
            </select>
          </>)}

          {step === "painPoints" && (<>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">What&apos;s eating your time right now?</h2>
            <p className="text-slate-500 mb-6">Select all that apply — this shapes your blueprint recommendations.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {PAIN_POINTS.map(({ id, label, icon: Icon, desc }) => (
                <button key={id} onClick={() => toggleSelection(painPoints, setPainPoints, id)} className={cn("flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all hover:border-indigo-400", painPoints.includes(id) ? "border-indigo-500 bg-indigo-50" : "border-slate-200")}>
                  <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", painPoints.includes(id) ? "text-indigo-600" : "text-slate-400")} />
                  <div>
                    <span className={cn("text-sm font-semibold", painPoints.includes(id) ? "text-indigo-700" : "text-slate-700")}>{label}</span>
                    <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <input
              type="text"
              value={customPainPoint}
              onChange={(e) => setCustomPainPoint(e.target.value)}
              placeholder="Something else? Type it here..."
              className="w-full p-3 rounded-xl border-2 border-slate-200 text-sm text-slate-600 focus:border-indigo-400 focus:outline-none mb-6"
            />
            <div className="flex gap-3">
              <button onClick={goBack} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back</button>
              <button onClick={goNext} disabled={painPoints.length === 0 && !customPainPoint.trim()} className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1">Continue <ArrowRight className="w-4 h-4" /></button>
            </div>
          </>)}

          {step === "channels" && (<>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">How do customers find you?</h2>
            <p className="text-slate-500 mb-6">This helps us recommend the right automation channels.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {CHANNELS.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => toggleSelection(channels, setChannels, id)} className={cn("flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:border-indigo-400", channels.includes(id) ? "border-indigo-500 bg-indigo-50" : "border-slate-200")}>
                  <Icon className={cn("w-6 h-6", channels.includes(id) ? "text-indigo-600" : "text-slate-400")} />
                  <span className={cn("text-sm font-medium text-center", channels.includes(id) ? "text-indigo-700" : "text-slate-600")}>{label}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={goBack} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back</button>
              <button onClick={goNext} disabled={channels.length === 0} className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1">Continue <ArrowRight className="w-4 h-4" /></button>
            </div>
          </>)}

          {step === "volume" && (<>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">How many new enquiries per month?</h2>
            <p className="text-slate-500 mb-6">Rough estimate is fine — this sizes your ROI projection.</p>
            <div className="flex flex-wrap gap-3 mb-6">
              {VOLUMES.map((v) => (
                <button key={v} onClick={() => { setVolume(v); setDirection(1); setStep("name"); }} className={cn("px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all hover:border-indigo-400", volume === v ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-700")}>{v}</button>
              ))}
            </div>
            <button onClick={goBack} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back</button>
          </>)}

          {step === "name" && (<>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Last one — what&apos;s your business called?</h2>
            <p className="text-slate-500 mb-6">We&apos;ll personalise your blueprint with your business name.</p>
            <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g. Smith & Sons Plumbing" className="w-full p-4 rounded-xl border-2 border-slate-200 text-base focus:border-indigo-400 focus:outline-none mb-4" onKeyDown={(e) => { if (e.key === "Enter" && businessName.trim()) handleGenerate(); }} autoFocus />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex gap-3">
              <button onClick={goBack} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back</button>
              <button onClick={handleGenerate} disabled={!businessName.trim()} className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"><Sparkles className="w-4 h-4" /> Generate My Blueprint</button>
            </div>
          </>)}

          {step === "generating" && (
            <div className="text-center py-16">
              <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-6" />
              <h2 className="text-xl font-bold text-slate-900 mb-2">Building your AI blueprint...</h2>
              <p className="text-slate-500">Analysing your {industry.toLowerCase()} business and matching to our automation solutions.</p>
            </div>
          )}

          {step === "result" && blueprint && (<>
            <div className="bg-slate-900 rounded-t-2xl p-6 sm:p-8">
              <p className="text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-2">AI Blueprint</p>
              <h2 className="text-white text-xl sm:text-2xl font-bold">{blueprint.headline}</h2>
              <p className="text-slate-400 text-sm mt-1">{businessName} · {industry}</p>
            </div>
            <div className="grid grid-cols-3 border border-t-0 border-slate-200 divide-x divide-slate-200">
              <div className="p-4 text-center">
                <p className="text-2xl font-bold text-indigo-600">{blueprint.totalHoursSaved}</p>
                <p className="text-xs text-slate-500">hrs/week saved</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600">£{blueprint.monthlyRevenuePotential.toLocaleString()}</p>
                <p className="text-xs text-slate-500">/month potential</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-2xl font-bold text-amber-600">{blueprint.roiMultiple}x</p>
                <p className="text-xs text-slate-500">ROI</p>
              </div>
            </div>
            <div className="border border-t-0 border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Your Top 3 Automation Opportunities</h3>
              <div className="space-y-4">
                {blueprint.opportunities.map((opp, i) => (
                  <div key={i} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", opp.impact === "high" ? "bg-red-100 text-red-700" : opp.impact === "medium" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600")}>{opp.impact.toUpperCase()} IMPACT</span>
                        <span className="text-xs text-slate-400">{opp.solution}</span>
                      </div>
                      <span className="text-sm font-bold text-indigo-600">{opp.hoursSavedPerWeek} hrs/week</span>
                    </div>
                    <h4 className="text-base font-semibold text-slate-900 mb-1">{opp.title}</h4>
                    <p className="text-sm text-slate-600">{opp.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-t-0 border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Your Monday Morning: Before & After</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-xs font-bold text-red-600 uppercase mb-2">Before</p>
                  <p className="text-sm text-red-900">{blueprint.beforeAfter.before}</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-xs font-bold text-emerald-600 uppercase mb-2">After</p>
                  <p className="text-sm text-emerald-900">{blueprint.beforeAfter.after}</p>
                </div>
              </div>
            </div>
            <div className="border border-t-0 border-slate-200 rounded-b-2xl p-6 bg-slate-50">
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setStep("email")} className="flex-1 px-5 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 flex items-center justify-center gap-2"><Mail className="w-4 h-4" /> Email Me This Blueprint</button>
                <a href="https://cal.com/workcrew/free-ai-strategy-call" target="_blank" rel="noopener noreferrer" className="flex-1 px-5 py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 text-sm font-bold hover:bg-indigo-50 flex items-center justify-center gap-2"><Calendar className="w-4 h-4" /> Book a Strategy Call</a>
              </div>
              <p className="text-xs text-slate-400 text-center mt-3">Recommended: {blueprint.recommendedTier} tier — {blueprint.tierReason}</p>
            </div>
          </>)}

          {step === "email" && (
            <div className="text-center py-8">
              <Mail className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Where should we send it?</h2>
              <p className="text-slate-500 mb-6">We&apos;ll email your full blueprint and add you to our weekly AI tips newsletter (unsubscribe anytime).</p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 p-3 rounded-xl border-2 border-slate-200 text-sm focus:border-indigo-400 focus:outline-none" onKeyDown={(e) => { if (e.key === "Enter" && email.includes("@")) handleSaveEmail(); }} autoFocus />
                <button onClick={handleSaveEmail} disabled={!email.includes("@") || emailStatus === "loading"} className="px-5 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 disabled:opacity-40 flex items-center gap-2">{emailStatus === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />} Send</button>
              </div>
              {emailStatus === "error" && <p className="text-red-500 text-sm mt-3">Something went wrong — please try again.</p>}
              <button onClick={() => setStep("result")} className="text-sm text-slate-400 hover:text-slate-600 mt-4 inline-block">Back to blueprint</button>
            </div>
          )}

          {step === "complete" && (
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Blueprint sent!</h2>
              <p className="text-slate-500 mb-8">Check your inbox — your personalised AI blueprint is on its way. We&apos;ve also added you to our weekly tips newsletter.</p>
              <a href="https://cal.com/workcrew/free-ai-strategy-call" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700"><Calendar className="w-4 h-4" /> Book Your Free Strategy Call</a>
              <p className="text-xs text-slate-400 mt-3">30 minutes. No obligation. We&apos;ll walk through your blueprint together.</p>
            </div>
          )}
      </div>
    </div>
  );
}
