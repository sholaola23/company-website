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
  Link,
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
  Search,
  Phone,
  RotateCcw,
  X,
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
  Link,
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
  currentlyFailing: boolean;
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

interface OrderRow {
  fullName: string;
  phone: string;
  items: string;
  deliveryAddress: string;
  postcode: string;
  town: string;
  basketTotal: number;
  paymentStatus: string;
  outstandingBalance: number;
  orderStatus: string;
  refundAmount: number | null;
  refundDate: string | null;
  refundReason: string | null;
  refundMethod: string | null;
  sheetRowIndex: number;
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
    orderRows?: OrderRow[];
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
// Animation was getting stuck at the 0.001 initial value in production
// (RAF callbacks not progressing, leaving stats at "0" / "£0.00" while real
// data was correct). Showing the final number immediately is strictly safer
// than a broken count-up — accuracy beats cosmetics.
function useCountUp(target: number, _duration = 900, _decimals = 0) {
  void _duration;
  void _decimals;
  return target;
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
function LoginForm({ slug, clientInfo }: { slug: string; clientInfo: { name: string; initials: string } | null }) {
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
            <span className="text-lg font-bold text-zinc-200 tracking-tight">{clientInfo?.initials || "W"}</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-xl font-semibold text-[var(--color-bg)] mb-1">
            {clientInfo?.name || "Your Dashboard"}
          </p>
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
              className="w-full px-4 py-3.5 bg-zinc-800/60 border border-zinc-700/80 rounded-xl text-[var(--color-bg)] placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 transition-all text-sm"
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
            className="w-full py-3.5 bg-[var(--color-bg)] hover:bg-zinc-100 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-900 rounded-xl font-medium transition-all text-sm shadow-sm"
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
          Powered by WorkCrew
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
  if (wf.currentlyFailing) {
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
      <div className="text-3xl font-bold tabular-nums tracking-tight text-[var(--color-bg)]">
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
            <Loader2 className="w-4 h-4 text-[var(--color-primary)] shrink-0 animate-spin" />
          ) : (
            <Upload className="w-4 h-4 text-[var(--color-primary)]/70 shrink-0 group-hover:text-[var(--color-accent)] transition-colors" />
          )}
          <span className="text-[var(--color-accent)]/70 text-xs leading-relaxed group-hover:text-[var(--color-primary)] transition-colors">
            {uploadState === "uploading"
              ? "Uploading..."
              : "Upload bank statement (.csv)"}
          </span>
        </button>
      )}
    </div>
  );
}

// ─── Refund Reasons & Methods ─────────────────────────────
const REFUND_REASONS = [
  "Product unavailable",
  "Customer request",
  "Quality issue",
  "Overpayment",
  "Other",
];
const REFUND_METHODS = ["SumUp", "Bank Transfer", "Cash"];

// ─── Success Toast ───────────────────────────────────────
function SuccessToast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 4000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[calc(100%-2rem)]"
    >
      <div className="flex items-center gap-3 bg-emerald-900/90 border border-emerald-500/30 rounded-xl px-4 py-3 shadow-2xl shadow-black/50 backdrop-blur-sm">
        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
        <p className="text-emerald-200 text-sm">{message}</p>
      </div>
    </motion.div>
  );
}

// ─── Refund Modal ────────────────────────────────────────
interface RefundModalProps {
  order: OrderRow;
  orderIndex: number;
  slug: string;
  onClose: () => void;
  onSuccess: (customerName: string) => void;
}

function RefundModal({ order, orderIndex, slug, onClose, onSuccess }: RefundModalProps) {
  const [refundAmount, setRefundAmount] = useState(order.basketTotal.toString());
  const [reason, setReason] = useState(REFUND_REASONS[0]);
  const [otherReason, setOtherReason] = useState("");
  const [method, setMethod] = useState(REFUND_METHODS[0]);
  const [step, setStep] = useState<"form" | "confirm">("form");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const parsedAmount = parseFloat(refundAmount);
  const isValidAmount = !isNaN(parsedAmount) && parsedAmount > 0;

  const finalReason =
    reason === "Other" && otherReason.trim()
      ? `Other: ${otherReason.trim()}`
      : reason;

  async function handleSubmit() {
    if (!isValidAmount) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/client-sheets/${slug}/refund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rowIndex: orderIndex,
          refundAmount: parsedAmount,
          refundReason: finalReason,
          refundMethod: method,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(data.error || "Failed to process refund");
      }

      onSuccess(order.fullName);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("form");
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative bg-zinc-900 rounded-2xl border border-zinc-700/60 shadow-2xl shadow-black/60 w-full max-w-md overflow-hidden"
      >
        {/* Purple accent strip */}
        <div className="h-0.5 bg-gradient-to-r from-purple-500/60 via-purple-400/30 to-transparent" />

        <div className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-[var(--color-muted)]" />
              <p className="text-sm font-semibold text-[var(--color-bg)]">Process Refund</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Order info */}
          <div className="bg-zinc-800/50 rounded-xl p-3 space-y-1">
            <p className="text-zinc-200 text-sm font-medium">{order.fullName}</p>
            <p className="text-zinc-500 text-xs">{order.items}</p>
            <p className="text-zinc-400 text-xs">
              Basket total: <span className="text-[var(--color-bg)] font-medium">{formatCurrency(order.basketTotal)}</span>
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === "form" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-3"
              >
                {/* Refund Amount */}
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">
                    Refund Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
                      £
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={refundAmount}
                      onChange={(e) => setRefundAmount(e.target.value)}
                      className="w-full pl-7 pr-3 py-2.5 bg-zinc-800/60 border border-zinc-700/60 rounded-xl text-[var(--color-bg)] placeholder-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-[var(--color-muted)]/50 transition-all tabular-nums"
                    />
                  </div>
                </div>

                {/* Refund Reason */}
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">
                    Reason
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-800/60 border border-zinc-700/60 rounded-xl text-[var(--color-bg)] text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-[var(--color-muted)]/50 transition-all appearance-none"
                  >
                    {REFUND_REASONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {reason === "Other" && (
                    <input
                      type="text"
                      placeholder="Describe the reason..."
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      className="mt-2 w-full px-3 py-2.5 bg-zinc-800/60 border border-zinc-700/60 rounded-xl text-[var(--color-bg)] placeholder-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-[var(--color-muted)]/50 transition-all"
                    />
                  )}
                </div>

                {/* Refund Method */}
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">
                    Refund Method
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-800/60 border border-zinc-700/60 rounded-xl text-[var(--color-bg)] text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-[var(--color-muted)]/50 transition-all appearance-none"
                  >
                    {REFUND_METHODS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Error */}
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

                {/* Actions */}
                <div className="flex gap-2.5 pt-1">
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 rounded-xl border border-zinc-700/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-all text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setStep("confirm")}
                    disabled={!isValidAmount || (reason === "Other" && !otherReason.trim())}
                    className="flex-1 py-2.5 rounded-xl bg-[var(--color-muted)] hover:bg-[var(--color-muted)] disabled:bg-zinc-800 disabled:text-zinc-600 text-[var(--color-bg)] font-medium transition-all text-sm shadow-sm"
                  >
                    Process Refund
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                {/* Confirmation */}
                <div className="bg-[var(--color-muted)]/10 border border-[var(--color-muted)]/20 rounded-xl p-4 text-center space-y-2">
                  <p className="text-[var(--color-muted)] text-sm">
                    Are you sure you want to process a{" "}
                    <span className="text-[var(--color-bg)] font-semibold">
                      {formatCurrency(parsedAmount)}
                    </span>{" "}
                    refund for{" "}
                    <span className="text-[var(--color-bg)] font-semibold">
                      {order.fullName}
                    </span>
                    ?
                  </p>
                  <p className="text-[var(--color-muted)]/70 text-xs">
                    {finalReason} &middot; {method}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2.5">
                  <button
                    onClick={() => setStep("form")}
                    disabled={submitting}
                    className="flex-1 py-2.5 rounded-xl border border-zinc-700/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 disabled:opacity-50 transition-all text-sm font-medium"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex-1 py-2.5 rounded-xl bg-[var(--color-muted)] hover:bg-[var(--color-muted)] disabled:bg-[var(--color-muted)] text-[var(--color-bg)] font-medium transition-all text-sm shadow-sm flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Confirm Refund"
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────
export default function ClientDashboard() {
  const params = useParams();
  const slug = params.slug as string;
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [sheetsData, setSheetsData] = useState<SheetsData | null>(null);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [loginClientInfo, setLoginClientInfo] = useState<{ name: string; initials: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [systemHealthOpen, setSystemHealthOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [orderSearch, setOrderSearch] = useState("");
  const [justRefreshed, setJustRefreshed] = useState(false);
  const [bankCopied, setBankCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"week" | "all">("week");
  const viewModeRef = useRef(viewMode);
  const [refundTarget, setRefundTarget] = useState<{ order: OrderRow; index: number } | null>(null);
  const [toastMessage, setToastMessage] = useState("");

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
        const body = await statusRes.json().catch(() => ({}));
        if (body.clientInfo) setLoginClientInfo(body.clientInfo);
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
  if (needsLogin) return <LoginForm slug={slug} clientInfo={loginClientInfo} />;

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
      border: "border-[var(--color-primary)]/20",
      iconColor: "text-[var(--color-primary)]",
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
    <div className="min-h-screen bg-zinc-950 text-[var(--color-bg)]">
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
              <p className="text-lg font-semibold mt-0.5 text-[var(--color-bg)] leading-tight">
                {statusData.client.name}
              </p>
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
                  <p className="text-base font-semibold leading-snug text-[var(--color-bg)]">
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
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
                  This Week
                </p>
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
                        ? "text-[var(--color-primary)]"
                        : "text-zinc-600"
                    }`}
                  >
                    {sheetsData.orders.unpaidCount > 0 && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
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
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                      Payments
                    </p>
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
                      <p className="text-[var(--color-bg)] font-semibold tabular-nums text-base">
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
                      <p className="text-[var(--color-bg)] font-semibold tabular-nums text-base">
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
                    <ChefHat className="w-4 h-4 text-[var(--color-primary)]/80" />
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                      What to Bake
                    </p>
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
                          <div className="w-1 h-4 rounded-full bg-[var(--color-primary)]/50 shrink-0" />
                          <span className="text-zinc-200 text-sm">
                            {item.product}
                          </span>
                        </div>
                        <span className="text-[var(--color-bg)] font-semibold tabular-nums text-sm bg-zinc-800/60 px-2.5 py-0.5 rounded-lg">
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
                <div className="bg-gradient-to-br from-amber-950/30 to-zinc-900 rounded-2xl border border-[var(--color-primary)]/20 overflow-hidden">
                  <div className="h-0.5 bg-gradient-to-r from-amber-500/70 via-amber-400/30 to-transparent" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <CreditCard className="w-4 h-4 text-[var(--color-primary)]/80" />
                      <p className="text-xs font-semibold text-[var(--color-primary)]/80 uppercase tracking-widest">
                        Unpaid Orders
                      </p>
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
                          <span className="text-[var(--color-primary)] font-semibold tabular-nums text-sm">
                            {formatCurrency(c.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--color-primary)]/10 flex justify-between text-sm">
                      <span className="text-zinc-500">Total outstanding</span>
                      <span className="text-[var(--color-primary)] font-semibold tabular-nums">
                        {formatCurrency(sheetsData.orders.unpaidAmount)}
                      </span>
                    </div>

                    {/* Quick payment reminder — copy message to send to customers */}
                    {statusData.client.bankDetails && (
                      <div className="mt-4 pt-3 border-t border-[var(--color-primary)]/10">
                        <button
                          onClick={() => {
                            const bd = statusData.client.bankDetails!;
                            const text = `Hi! Just a gentle reminder about your order from E'Manuel Foods and Bakery.\n\nPlease send payment via bank transfer:\n\nAccount: ${bd.accountName}\nSort Code: ${bd.sortCode}\nAccount No: ${bd.accountNumber}\n\nThank you!`;
                            navigator.clipboard.writeText(text);
                            setBankCopied(true);
                            setTimeout(() => setBankCopied(false), 2500);
                          }}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/20 text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-all text-xs font-medium"
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

          {/* Orders Detail (Collapsible) */}
          {sheetsData?.orders?.orderRows && sheetsData.orders.orderRows.length > 0 && (
            <Section>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800/60 overflow-hidden">
                <button
                  onClick={() => setOrdersOpen(!ordersOpen)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-zinc-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-4 h-4 text-zinc-600" />
                    <span className="text-sm font-medium text-zinc-400">
                      Orders
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-zinc-800 text-zinc-400">
                      {sheetsData.orders.orderRows.length}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: ordersOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-4 h-4 text-zinc-600" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {ordersOpen && (
                    <motion.div
                      key="orders-panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-zinc-800/60 px-5 py-4 space-y-3">
                        {/* Search input */}
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                          <input
                            type="text"
                            placeholder="Search by name..."
                            value={orderSearch}
                            onChange={(e) => setOrderSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 bg-zinc-800/60 border border-zinc-700/60 rounded-xl text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all"
                          />
                        </div>

                        {/* Order cards */}
                        <div className="space-y-2.5">
                          {(() => {
                            const filtered = sheetsData.orders!.orderRows!.filter(
                              (o) =>
                                o.fullName
                                  .toLowerCase()
                                  .includes(orderSearch.toLowerCase())
                            );
                            if (filtered.length === 0) {
                              return (
                                <p className="text-zinc-600 text-sm text-center py-4">
                                  No orders match &ldquo;{orderSearch}&rdquo;
                                </p>
                              );
                            }
                            return filtered.map((order, i) => {
                              const status = order.paymentStatus.toLowerCase();
                              const isPaid = status === "paid";
                              const isCancelled = order.orderStatus.toLowerCase() === "cancelled";
                              const accentColor = isCancelled
                                ? "border-red-500/30"
                                : isPaid
                                  ? "border-emerald-500/30"
                                  : "border-[var(--color-primary)]/30";
                              const accentStrip = isCancelled
                                ? "bg-red-500/50"
                                : isPaid
                                  ? "bg-emerald-500/50"
                                  : "bg-[var(--color-primary)]/50";
                              const statusBadgeBg = isCancelled
                                ? "bg-red-500/10 text-red-400"
                                : isPaid
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]";

                              return (
                                <motion.div
                                  key={`${order.fullName}-${i}`}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.04, duration: 0.3 }}
                                  className={`bg-zinc-800/40 rounded-xl border ${accentColor} overflow-hidden`}
                                >
                                  {/* Thin accent strip at top */}
                                  <div className={`h-0.5 ${accentStrip}`} />
                                  <div className="p-3.5 space-y-2.5">
                                    {/* Name + status */}
                                    <div className="flex items-center justify-between gap-2">
                                      <p className="text-[var(--color-bg)] text-sm font-semibold truncate">
                                        {order.fullName}
                                      </p>
                                      <span
                                        className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${statusBadgeBg}`}
                                      >
                                        {order.paymentStatus}
                                      </span>
                                    </div>

                                    {/* Items */}
                                    <p className="text-zinc-400 text-xs leading-relaxed">
                                      {order.items}
                                    </p>

                                    {/* Address row */}
                                    {(order.deliveryAddress || order.town) && (
                                      <div className="flex items-start gap-1.5 text-zinc-500 text-xs">
                                        <MapPin className="w-3 h-3 shrink-0 mt-0.5" />
                                        <span>
                                          {[order.deliveryAddress, order.town, order.postcode]
                                            .filter(Boolean)
                                            .join(", ")}
                                        </span>
                                      </div>
                                    )}

                                    {/* Bottom row: total + phone */}
                                    <div className="flex items-center justify-between pt-1.5 border-t border-zinc-700/30">
                                      <span className="text-[var(--color-bg)] font-semibold tabular-nums text-sm">
                                        {formatCurrency(order.basketTotal)}
                                      </span>
                                      {order.phone && (
                                        <a
                                          href={`https://wa.me/${order.phone.replace(/[^0-9]/g, "")}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
                                        >
                                          <Phone className="w-3 h-3" />
                                          <span className="hidden sm:inline">{order.phone}</span>
                                          <span className="sm:hidden">WhatsApp</span>
                                        </a>
                                      )}
                                    </div>

                                    {/* Outstanding balance for partial/unpaid */}
                                    {!isPaid && !isCancelled && order.outstandingBalance > 0 && (
                                      <div className="text-xs text-[var(--color-primary)]/80">
                                        Outstanding: {formatCurrency(order.outstandingBalance)}
                                      </div>
                                    )}

                                    {/* Refund indicator */}
                                    {order.refundAmount != null && order.refundAmount > 0 && (
                                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[var(--color-muted)]/10 border border-[var(--color-muted)]/20">
                                        <RefreshCw className="w-3 h-3 text-[var(--color-muted)] shrink-0" />
                                        <div className="flex-1 min-w-0">
                                          <span className="text-xs font-medium text-[var(--color-muted)]">
                                            Refunded {formatCurrency(order.refundAmount)}
                                          </span>
                                          {order.refundMethod && (
                                            <span className="text-xs text-[var(--color-muted)]/70"> via {order.refundMethod}</span>
                                          )}
                                          {order.refundReason && (
                                            <p className="text-xs text-[var(--color-muted)]/60 truncate mt-0.5">{order.refundReason}</p>
                                          )}
                                        </div>
                                      </div>
                                    )}

                                    {/* Refund button — only if not already refunded */}
                                    {order.refundAmount == null && !isCancelled && (
                                      <button
                                        onClick={() => setRefundTarget({ order, index: order.sheetRowIndex })}
                                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--color-muted)]/30 text-[var(--color-muted)] hover:bg-[var(--color-muted)]/10 hover:text-[var(--color-muted)] transition-all text-xs font-medium self-start"
                                      >
                                        <RotateCcw className="w-3 h-3" />
                                        Refund
                                      </button>
                                    )}
                                  </div>
                                </motion.div>
                              );
                            });
                          })()}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                    <MapPin className="w-4 h-4 text-[var(--color-accent)]/70" />
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                      Deliveries
                    </p>
                  </div>
                  <div className="space-y-2.5">
                    {sheetsData.deliveries.byTown.map((t) => (
                      <div
                        key={t.town}
                        className="flex items-center justify-between py-1.5 border-b border-zinc-800/40 last:border-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-1 h-4 rounded-full bg-[var(--color-primary)]/40 shrink-0" />
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
                    <span className="text-[var(--color-bg)] font-semibold tabular-nums">
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
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                    Deliveries
                  </p>
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
                <span className="text-[var(--color-bg)] font-semibold">
                  {statusData.businessSummary.tasksCompletedThisWeek}
                </span>{" "}
                tasks across your{" "}
                <span className="text-[var(--color-bg)] font-medium">
                  {statusData.businessSummary.automationsRunning}
                </span>{" "}
                automations this week.{" "}
                {statusData.businessSummary.issuesNeedingAttention === 0 ? (
                  <span className="text-emerald-400">No issues detected.</span>
                ) : (
                  <span className="text-[var(--color-primary)]">
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
                          ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
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
                                <p className="text-sm font-medium text-[var(--color-bg)] truncate">
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
                              {wf.currentlyFailing && wf.errorsThisWeek > 0 && (
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
                  href="mailto:hello@workcrew.io"
                  className="text-zinc-400 hover:text-[var(--color-bg)] transition-colors underline underline-offset-2 decoration-zinc-700"
                >
                  hello@workcrew.io
                </a>
              </p>
              <p className="text-zinc-800 text-xs">
                Powered by WorkCrew
              </p>
            </div>
          </Section>
        </motion.div>
      </div>

      {/* Refund Modal */}
      <AnimatePresence>
        {refundTarget && (
          <RefundModal
            order={refundTarget.order}
            orderIndex={refundTarget.index}
            slug={slug}
            onClose={() => setRefundTarget(null)}
            onSuccess={(name) => {
              setRefundTarget(null);
              setToastMessage(`Refund processed for ${name}`);
              fetchAll(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {toastMessage && (
          <SuccessToast
            message={toastMessage}
            onDone={() => setToastMessage("")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
