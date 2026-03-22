"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Landmark,
  ClipboardList,
  Send,
  Truck,
  CreditCard,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  ChevronDown,
  RefreshCw,
  AlertCircle,
  MapPin,
  Copy,
  Check,
  Upload,
  Loader2,
  FileCheck,
} from "lucide-react";

// We can't import ChefHat if it doesn't exist in this version of lucide,
// so we use UtensilsCrossed as a fallback
let ChefHat: typeof ShoppingCart;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ChefHat = require("lucide-react").ChefHat;
} catch {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ChefHat = require("lucide-react").UtensilsCrossed;
}

// ─── Icon map ────────────────────────────────────────────────
const ICON_MAP: Record<string, typeof ShoppingCart> = {
  ShoppingCart,
  Landmark,
  ClipboardList,
  Send,
  Truck,
  ChefHat,
  CreditCard,
  Sparkles,
};

// ─── Types ───────────────────────────────────────────────────
interface WorkflowStatus {
  id: string;
  name: string;
  shortName: string;
  schedule: string;
  active: boolean;
  lastExecution: {
    status: "success" | "error" | "waiting" | "unknown";
    startedAt: string | null;
    finishedAt: string | null;
  } | null;
  executionsThisWeek: number;
  errorsThisWeek: number;
  businessName: string;
  statusVerb: string;
  expectedScheduleHuman: string;
  icon: string;
}

interface BankDetails {
  accountName: string;
  sortCode: string;
  accountNumber: string;
}

interface StatusData {
  client: { name: string; contactName: string; industry: string; logoUrl: string | null; initials: string; bankDetails: BankDetails | null };
  summary: {
    health: "green" | "amber" | "red";
    activeWorkflows: number;
    totalWorkflows: number;
    executionsThisWeek: number;
    errorsThisWeek: number;
    lastUpdated: string;
  };
  businessSummary: {
    headline: string;
    automationsRunning: number;
    tasksCompletedThisWeek: number;
    issuesNeedingAttention: number;
  };
  workflows: WorkflowStatus[];
}

interface SheetsData {
  orders: {
    totalOrders: number;
    totalRevenue: number;
    paidCount: number;
    unpaidCount: number;
    unpaidAmount: number;
    unpaidCustomers: { name: string; amount: number; daysAgo: number }[];
    paymentBreakdown: {
      totalPaid: number;
      sumupPaid: number;
      sumupCount: number;
      bankTransferPaid: number;
      bankTransferCount: number;
      otherPaid: number;
      otherCount: number;
    } | null;
  } | null;
  production: { product: string; quantity: number }[] | null;
  deliveries: {
    totalStops: number;
    byTown: { town: string; count: number }[];
  } | null;
  lastUpdated: string;
}

// ─── Helpers ─────────────────────────────────────────────────
function friendlyTime(dateStr: string): string {
  const date = new Date(dateStr);
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 6) return `${hrs}h ago`;
  const dayName = date.toLocaleDateString("en-GB", { weekday: "long" });
  const time = date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${dayName} at ${time}`;
}

function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return "£0.00";
  return `£${amount.toFixed(2)}`;
}

// ─── Animation Variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ─── Count-up Hook ───────────────────────────────────────────
function useCountUp(target: number, duration = 900, decimals = 0) {
  const [value, setValue] = useState(target === 0 ? 0 : 0.001);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    if (target === 0) return;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, decimals]);

  return value;
}

// ─── Skeleton Loading ────────────────────────────────────────
function SkeletonCard({ rows = 2 }: { rows?: number }) {
  return (
    <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800/60 p-5 space-y-3">
      <div className="h-3 w-24 rounded-full bg-zinc-800 animate-pulse" />
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-9 rounded-xl bg-zinc-800/70 animate-pulse"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Mock header */}
      <div className="border-b border-zinc-800/60 px-5 py-5">
        <div className="max-w-lg mx-auto space-y-2">
          <div className="h-3 w-16 rounded-full bg-zinc-800 animate-pulse" />
          <div className="h-6 w-48 rounded-full bg-zinc-800/80 animate-pulse" />
        </div>
      </div>
      <div className="max-w-lg mx-auto w-full px-5 py-6 space-y-4">
        <SkeletonCard rows={1} />
        <SkeletonCard rows={2} />
        <SkeletonCard rows={3} />
        <SkeletonCard rows={2} />
      </div>
    </div>
  );
}

// ─── Login Form ──────────────────────────────────────────────
function LoginForm({ slug }: { slug: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/client-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, password }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      setError("Incorrect password. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative bg-zinc-900 rounded-2xl p-8 w-full max-w-md border border-zinc-800/80 shadow-2xl shadow-black/40"
      >
        {/* Logo mark */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-zinc-200 tracking-tight">EM</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-white mb-1">
            E&apos;Manuel Foods and Bakery
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Enter your password to see how things are going.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Dashboard password"
              className="w-full px-4 py-3.5 bg-zinc-800/60 border border-zinc-700/80 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 transition-all text-sm"
              autoFocus
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-400 text-xs flex items-center gap-1.5 overflow-hidden"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3.5 bg-white hover:bg-zinc-100 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-900 rounded-xl font-medium transition-all text-sm shadow-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Signing in
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="text-zinc-700 text-xs text-center mt-6">
          Powered by Oladipupo Consulting
        </p>
      </motion.div>
    </div>
  );
}

// ─── Data Unavailable ────────────────────────────────────────
function DataUnavailable({ label }: { label: string }) {
  return (
    <div className="bg-zinc-900/60 rounded-2xl border border-zinc-800/60 p-5">
      <div className="flex items-center gap-3 text-zinc-600">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <p className="text-sm">Unable to load {label} right now</p>
      </div>
    </div>
  );
}

// ─── Status Badge ────────────────────────────────────────────
function StatusBadge({ wf }: { wf: WorkflowStatus }) {
  if (!wf.active) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-500">
        Paused
      </span>
    );
  }
  if (wf.lastExecution?.status === "error") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
        Needs attention
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
      {wf.statusVerb}
    </span>
  );
}

// ─── Animated Stat ───────────────────────────────────────────
function AnimatedStat({
  value,
  label,
  prefix = "",
  decimals = 0,
}: {
  value: number;
  label: string;
  prefix?: string;
  decimals?: number;
}) {
  const animated = useCountUp(value, 1000, decimals);

  return (
    <div>
      <div className="text-3xl font-bold tabular-nums tracking-tight text-white">
        {prefix}
        {decimals > 0 ? animated.toFixed(decimals) : Math.round(animated)}
      </div>
      <div className="text-zinc-500 text-sm mt-0.5">{label}</div>
    </div>
  );
}

// ─── Section Wrapper ─────────────────────────────────────────
function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Bank Statement Upload ───────────────────────────────────
function BankStatementUpload({ slug, onUploadComplete }: { slug: string; onUploadComplete?: () => void }) {
  const [uploadState, setUploadState] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [resultMsg, setResultMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadState("uploading");
    setErrorMsg("");
    setResultMsg("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`/api/client-upload/${slug}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Upload failed. Please try again.");
      }

      setUploadState("success");
      setResultMsg(data.message || "Statement processed");
      // Auto-refresh dashboard data after 2 seconds (let Sheets propagate)
      setTimeout(() => onUploadComplete?.(), 2000);
      // Reset message after 10 seconds
      setTimeout(() => {
        setUploadState("idle");
        setResultMsg("");
      }, 10000);
    } catch (err) {
      setUploadState("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Upload failed. Please try again."
      );
      setTimeout(() => {
        setUploadState("idle");
        setErrorMsg("");
      }, 8000);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="mt-3 rounded-xl bg-zinc-800/50 border border-zinc-700/40 p-3">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload bank statement CSV"
      />

      {uploadState === "success" ? (
        <div className="flex items-center gap-2.5">
          <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <p className="text-emerald-300/90 text-xs leading-relaxed">
            {resultMsg}
          </p>
        </div>
      ) : uploadState === "error" ? (
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-red-300/90 text-xs leading-relaxed">{errorMsg}</p>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadState === "uploading"}
          className="flex items-center gap-2.5 w-full text-left group disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {uploadState === "uploading" ? (
            <Loader2 className="w-4 h-4 text-amber-400 shrink-0 animate-spin" />
          ) : (
            <Upload className="w-4 h-4 text-amber-400/70 shrink-0 group-hover:text-amber-300 transition-colors" />
          )}
          <span className="text-amber-300/70 text-xs leading-relaxed group-hover:text-amber-200 transition-colors">
            {uploadState === "uploading"
              ? "Uploading..."
              : "Upload bank statement (.csv)"}
          </span>
        </button>
      )}
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────
export default function ClientDashboard() {
  const params = useParams();
  const slug = params.slug as string;
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [sheetsData, setSheetsData] = useState<SheetsData | null>(null);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [systemHealthOpen, setSystemHealthOpen] = useState(false);
  const [justRefreshed, setJustRefreshed] = useState(false);
  const [bankCopied, setBankCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"week" | "all">("week");
  const viewModeRef = useRef(viewMode);

  async function fetchAll(isRefresh = false, view?: "week" | "all") {
    const currentView = view ?? viewModeRef.current;
    try {
      const cacheBust = `_t=${Date.now()}`;
      const viewParam = currentView === "all" ? `?view=all&${cacheBust}` : `?${cacheBust}`;
      const [statusRes, sheetsRes] = await Promise.all([
        fetch(`/api/client-status/${slug}?${cacheBust}`),
        fetch(`/api/client-sheets/${slug}${viewParam}`),
      ]);

      if (statusRes.status === 401) {
        setNeedsLogin(true);
        setLoading(false);
        return;
      }

      if (statusRes.ok) {
        setStatusData(await statusRes.json());
      }

      if (sheetsRes.ok) {
        setSheetsData(await sheetsRes.json());
      }

      setNeedsLogin(false);
      setLoading(false);

      if (isRefresh) {
        setJustRefreshed(true);
        setTimeout(() => setJustRefreshed(false), 2000);
      }
    } catch {
      setError("Connection error. Please try again.");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
    const interval = setInterval(() => fetchAll(true), 5 * 60 * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (loading) return <LoadingScreen />;
  if (needsLogin) return <LoginForm slug={slug} />;

  if (error || !statusData) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <XCircle className="w-10 h-10 text-red-500/60 mx-auto" />
          <p className="text-zinc-400">{error || "Something went wrong."}</p>
          <button
            onClick={() => {
              setError("");
              setLoading(true);
              fetchAll();
            }}
            className="px-5 py-2.5 bg-zinc-800 text-zinc-300 rounded-xl hover:bg-zinc-700 transition-colors text-sm font-medium"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const { health } = statusData.summary;

  const bannerConfig = {
    green: {
      bg: "bg-gradient-to-br from-emerald-950/60 to-zinc-900",
      border: "border-emerald-500/20",
      iconColor: "text-emerald-400",
      icon: CheckCircle,
    },
    amber: {
      bg: "bg-gradient-to-br from-amber-950/50 to-zinc-900",
      border: "border-amber-500/20",
      iconColor: "text-amber-400",
      icon: AlertTriangle,
    },
    red: {
      bg: "bg-gradient-to-br from-red-950/50 to-zinc-900",
      border: "border-red-500/20",
      iconColor: "text-red-400",
      icon: XCircle,
    },
  };

  const banner = bannerConfig[health];
  const BannerIcon = banner.icon;

  // Hour-based greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Ambient top glow */}
      <div
        className="fixed top-0 left-0 right-0 h-64 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(30,30,40,0.8) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-zinc-800/60 px-5 py-5">
        <div className="max-w-lg mx-auto flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            {/* Client logo or initials */}
            {statusData.client.logoUrl ? (
              <Image
                src={statusData.client.logoUrl}
                alt={statusData.client.name}
                width={44}
                height={44}
                className="rounded-xl object-cover border border-zinc-700/50"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-700/60 flex items-center justify-center shadow-lg shrink-0">
                <span className="text-sm font-bold text-zinc-200 tracking-tight">
                  {statusData.client.initials}
                </span>
              </div>
            )}
            <div>
              <p className="text-zinc-500 text-sm">
                {greeting}, {statusData.client.contactName}
              </p>
              <h1 className="text-lg font-semibold mt-0.5 text-white leading-tight">
                {statusData.client.name}
              </h1>
            </div>
          </div>

          {/* Refresh indicator */}
          <div className="flex items-center gap-1.5 mt-1 shrink-0">
            <AnimatePresence>
              {justRefreshed ? (
                <motion.span
                  key="refreshed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1 text-emerald-400 text-xs"
                >
                  <CheckCircle className="w-3 h-3" />
                  Updated
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-zinc-700 text-xs"
                >
                  {friendlyTime(statusData.summary.lastUpdated)}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-lg mx-auto px-5 py-5">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {/* Health Banner */}
          <Section>
            <div
              className={`rounded-2xl border p-5 ${banner.bg} ${banner.border}`}
            >
              <div className="flex items-center gap-3.5">
                <div className="relative shrink-0">
                  <BannerIcon className={`w-7 h-7 ${banner.iconColor}`} />
                  {health === "green" && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        background: "rgba(52,211,153,0.15)",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold leading-snug text-white">
                    {statusData.businessSummary.headline}
                  </p>
                  <p className="text-sm text-zinc-400 mt-0.5">
                    {statusData.businessSummary.automationsRunning} automations
                    running for you
                  </p>
                </div>
              </div>
              {health !== "green" && (
                <p className="text-sm text-zinc-400 mt-3 pl-10">
                  We&apos;re already looking into it &mdash; no action needed
                  from you.
                </p>
              )}
            </div>
          </Section>

          {/* This Week Summary */}
          {sheetsData?.orders ? (
            <Section>
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/60 rounded-2xl border border-zinc-800/60 p-5">
                <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
                  This Week
                </h2>
                <div className="grid grid-cols-2 gap-5">
                  <AnimatedStat
                    value={sheetsData.orders.totalOrders}
                    label="orders"
                  />
                  <AnimatedStat
                    value={sheetsData.orders.totalRevenue}
                    label="revenue"
                    prefix="£"
                    decimals={2}
                  />
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-zinc-800/60 text-sm">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {sheetsData.orders.paidCount} paid
                  </span>
                  <span className="text-zinc-700">&middot;</span>
                  <span
                    className={`flex items-center gap-1.5 ${
                      sheetsData.orders.unpaidCount > 0
                        ? "text-amber-400"
                        : "text-zinc-600"
                    }`}
                  >
                    {sheetsData.orders.unpaidCount > 0 && (
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                    {sheetsData.orders.unpaidCount} unpaid
                    {sheetsData.orders.unpaidCount > 0 &&
                      ` (${formatCurrency(sheetsData.orders.unpaidAmount)})`}
                  </span>
                </div>
              </div>
            </Section>
          ) : (
            <Section>
              <DataUnavailable label="order summary" />
            </Section>
          )}

          {/* Payments Breakdown */}
          {sheetsData?.orders?.paymentBreakdown && (
            <Section>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800/60 overflow-hidden">
                {/* Accent strip */}
                <div className="h-0.5 bg-gradient-to-r from-emerald-500/50 via-emerald-400/20 to-transparent" />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Landmark className="w-4 h-4 text-emerald-400/80" />
                    <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                      Payments
                    </h2>
                  </div>

                  {/* Total paid — large animated figure */}
                  <div className="mb-4">
                    <AnimatedStat
                      value={sheetsData.orders.paymentBreakdown.totalPaid}
                      label={`${sheetsData.orders.paymentBreakdown.sumupCount + sheetsData.orders.paymentBreakdown.bankTransferCount + sheetsData.orders.paymentBreakdown.otherCount} payments collected`}
                      prefix="£"
                      decimals={2}
                    />
                  </div>

                  {/* Method breakdown grid */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800/60">
                    {/* SumUp */}
                    <div className="bg-zinc-800/40 rounded-xl p-3 space-y-1">
                      <div className="flex items-center gap-1.5 text-zinc-500">
                        <CreditCard className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-xs font-medium uppercase tracking-wide">
                          SumUp
                        </span>
                      </div>
                      <p className="text-white font-semibold tabular-nums text-base">
                        {formatCurrency(sheetsData.orders.paymentBreakdown.sumupPaid)}
                      </p>
                      <p className="text-zinc-600 text-xs">
                        {sheetsData.orders.paymentBreakdown.sumupCount}{" "}
                        {sheetsData.orders.paymentBreakdown.sumupCount === 1
                          ? "payment"
                          : "payments"}
                      </p>
                    </div>

                    {/* Bank Transfer */}
                    <div className="bg-zinc-800/40 rounded-xl p-3 space-y-1">
                      <div className="flex items-center gap-1.5 text-zinc-500">
                        <Landmark className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-xs font-medium uppercase tracking-wide">
                          Bank Transfer
                        </span>
                      </div>
                      <p className="text-white font-semibold tabular-nums text-base">
                        {formatCurrency(sheetsData.orders.paymentBreakdown.bankTransferPaid)}
                      </p>
                      <p className="text-zinc-600 text-xs">
                        {sheetsData.orders.paymentBreakdown.bankTransferCount}{" "}
                        {sheetsData.orders.paymentBreakdown.bankTransferCount === 1
                          ? "payment"
                          : "payments"}
                      </p>
                    </div>
                  </div>

                  {/* Bank statement upload */}
                  <BankStatementUpload slug={slug} onUploadComplete={() => fetchAll(true)} />
                </div>
              </div>
            </Section>
          )}

          {/* What to Bake */}
          {sheetsData?.production && sheetsData.production.length > 0 ? (
            <Section>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800/60 overflow-hidden">
                {/* Accent strip */}
                <div className="h-0.5 bg-gradient-to-r from-amber-500/60 via-orange-400/40 to-transparent" />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <ChefHat className="w-4 h-4 text-amber-400/80" />
                    <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                      What to Bake
                    </h2>
                  </div>
                  <div className="space-y-2.5">
                    {sheetsData.production.map((item, i) => (
                      <motion.div
                        key={item.product}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.35 }}
                        className="flex items-center justify-between py-2 border-b border-zinc-800/40 last:border-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-1 h-4 rounded-full bg-amber-500/50 shrink-0" />
                          <span className="text-zinc-200 text-sm">
                            {item.product}
                          </span>
                        </div>
                        <span className="text-white font-semibold tabular-nums text-sm bg-zinc-800/60 px-2.5 py-0.5 rounded-lg">
                          {item.quantity}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>
          ) : sheetsData?.production === null ? (
            <Section>
              <DataUnavailable label="production summary" />
            </Section>
          ) : null}

          {/* Unpaid Orders */}
          {sheetsData?.orders &&
            sheetsData.orders.unpaidCustomers.length > 0 && (
              <Section>
                <div className="bg-gradient-to-br from-amber-950/30 to-zinc-900 rounded-2xl border border-amber-500/20 overflow-hidden">
                  <div className="h-0.5 bg-gradient-to-r from-amber-500/70 via-amber-400/30 to-transparent" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <CreditCard className="w-4 h-4 text-amber-400/80" />
                      <h2 className="text-xs font-semibold text-amber-500/80 uppercase tracking-widest">
                        Unpaid Orders
                      </h2>
                    </div>
                    <div className="space-y-3">
                      {sheetsData.orders.unpaidCustomers.map((c, i) => (
                        <div
                          key={`${c.name}-${i}`}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <span className="text-zinc-200 text-sm">
                              {c.name}
                            </span>
                            <span className="text-zinc-600 text-xs ml-2">
                              {c.daysAgo === 0
                                ? "today"
                                : c.daysAgo === 1
                                  ? "yesterday"
                                  : `${c.daysAgo} days ago`}
                            </span>
                          </div>
                          <span className="text-amber-400 font-semibold tabular-nums text-sm">
                            {formatCurrency(c.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-amber-500/10 flex justify-between text-sm">
                      <span className="text-zinc-500">Total outstanding</span>
                      <span className="text-amber-400 font-semibold tabular-nums">
                        {formatCurrency(sheetsData.orders.unpaidAmount)}
                      </span>
                    </div>

                    {/* Quick payment reminder — copy message to send to customers */}
                    {statusData.client.bankDetails && (
                      <div className="mt-4 pt-3 border-t border-amber-500/10">
                        <button
                          onClick={() => {
                            const bd = statusData.client.bankDetails!;
                            const text = `Hi! Just a gentle reminder about your order from E'Manuel Foods and Bakery.\n\nPlease send payment via bank transfer:\n\nAccount: ${bd.accountName}\nSort Code: ${bd.sortCode}\nAccount No: ${bd.accountNumber}\n\nThank you!`;
                            navigator.clipboard.writeText(text);
                            setBankCopied(true);
                            setTimeout(() => setBankCopied(false), 2500);
                          }}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 hover:text-amber-300 transition-all text-xs font-medium"
                        >
                          {bankCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Payment reminder copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy payment reminder message
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Section>
            )}

          {/* Deliveries */}
          {sheetsData?.deliveries && sheetsData.deliveries.totalStops > 0 ? (
            <Section>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800/60 overflow-hidden">
                <div className="h-0.5 bg-gradient-to-r from-blue-500/50 via-blue-400/20 to-transparent" />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-blue-400/70" />
                    <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                      Deliveries
                    </h2>
                  </div>
                  <div className="space-y-2.5">
                    {sheetsData.deliveries.byTown.map((t) => (
                      <div
                        key={t.town}
                        className="flex items-center justify-between py-1.5 border-b border-zinc-800/40 last:border-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-1 h-4 rounded-full bg-blue-500/40 shrink-0" />
                          <span className="text-zinc-200 text-sm">{t.town}</span>
                        </div>
                        <span className="text-zinc-400 text-sm tabular-nums">
                          {t.count} {t.count === 1 ? "stop" : "stops"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800/60 flex justify-between text-sm">
                    <span className="text-zinc-500">Total deliveries</span>
                    <span className="text-white font-semibold tabular-nums">
                      {sheetsData.deliveries.totalStops}
                    </span>
                  </div>
                </div>
              </div>
            </Section>
          ) : sheetsData?.deliveries?.totalStops === 0 ? (
            <Section>
              <div className="bg-zinc-900/60 rounded-2xl border border-zinc-800/60 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-zinc-600" />
                  <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                    Deliveries
                  </h2>
                </div>
                <p className="text-zinc-600 text-sm pl-6">
                  No deliveries scheduled yet this week
                </p>
              </div>
            </Section>
          ) : null}

          {/* Activity Summary */}
          <Section>
            <div className="bg-zinc-900/40 rounded-2xl border border-zinc-800/40 p-5">
              <p className="text-zinc-400 text-sm leading-relaxed">
                We completed{" "}
                <span className="text-white font-semibold">
                  {statusData.businessSummary.tasksCompletedThisWeek}
                </span>{" "}
                tasks across your{" "}
                <span className="text-white font-medium">
                  {statusData.businessSummary.automationsRunning}
                </span>{" "}
                automations this week.{" "}
                {statusData.businessSummary.issuesNeedingAttention === 0 ? (
                  <span className="text-emerald-400">No issues detected.</span>
                ) : (
                  <span className="text-amber-400">
                    {statusData.businessSummary.issuesNeedingAttention} item
                    {statusData.businessSummary.issuesNeedingAttention > 1
                      ? "s"
                      : ""}{" "}
                    needed attention.
                  </span>
                )}
              </p>
            </div>
          </Section>

          {/* System Health (Collapsible) */}
          <Section>
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800/60 overflow-hidden">
              <button
                onClick={() => setSystemHealthOpen(!systemHealthOpen)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-zinc-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 text-zinc-600" />
                  <span className="text-sm font-medium text-zinc-400">
                    System Health
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      health === "green"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : health === "amber"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {health === "green"
                      ? "All good"
                      : `${statusData.businessSummary.issuesNeedingAttention} issue${statusData.businessSummary.issuesNeedingAttention !== 1 ? "s" : ""}`}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: systemHealthOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-4 h-4 text-zinc-600" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {systemHealthOpen && (
                  <motion.div
                    key="health-panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-zinc-800/60 divide-y divide-zinc-800/40">
                      {statusData.workflows.map((wf) => {
                        const IconComponent = ICON_MAP[wf.icon] || RefreshCw;
                        return (
                          <div
                            key={wf.id}
                            className="px-5 py-3.5 flex items-start gap-3"
                          >
                            <div className="mt-0.5 p-1.5 rounded-xl bg-zinc-800/70 shrink-0">
                              <IconComponent className="w-3.5 h-3.5 text-zinc-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-sm font-medium text-white truncate">
                                  {wf.businessName}
                                </p>
                                <StatusBadge wf={wf} />
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-xs text-zinc-600">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {wf.lastExecution?.startedAt
                                    ? friendlyTime(
                                        wf.lastExecution.startedAt
                                      )
                                    : "Hasn't run yet"}
                                </span>
                                <span>Next: {wf.expectedScheduleHuman}</span>
                              </div>
                              {wf.errorsThisWeek > 0 && (
                                <p className="text-red-400/80 text-xs mt-1">
                                  {wf.errorsThisWeek} issue
                                  {wf.errorsThisWeek > 1 ? "s" : ""} this
                                  week &mdash; we&apos;re on it
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Section>

          {/* Footer */}
          <Section>
            <div className="pt-2 pb-10 text-center space-y-1.5">
              <p className="text-zinc-600 text-xs">
                Questions?{" "}
                <a
                  href="mailto:hello@oladipupoconsulting.co.uk"
                  className="text-zinc-400 hover:text-white transition-colors underline underline-offset-2 decoration-zinc-700"
                >
                  hello@oladipupoconsulting.co.uk
                </a>
              </p>
              <p className="text-zinc-800 text-xs">
                Powered by Oladipupo Consulting
              </p>
            </div>
          </Section>
        </motion.div>
      </div>
    </div>
  );
}
