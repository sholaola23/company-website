"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
}

interface DashboardData {
  client: { name: string; contactName: string; industry: string };
  summary: {
    health: "green" | "amber" | "red";
    activeWorkflows: number;
    totalWorkflows: number;
    executionsThisWeek: number;
    errorsThisWeek: number;
    lastUpdated: string;
  };
  workflows: WorkflowStatus[];
}

function StatusDot({ status }: { status: "green" | "amber" | "red" | "gray" }) {
  const colors = {
    green: "bg-emerald-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
    gray: "bg-gray-400",
  };
  return (
    <span
      className={`inline-block w-3 h-3 rounded-full ${colors[status]}`}
    />
  );
}

function getWorkflowHealth(wf: WorkflowStatus): "green" | "amber" | "red" | "gray" {
  if (!wf.active) return "gray";
  if (wf.lastExecution?.status === "error" || wf.errorsThisWeek > 0) return "red";
  if (!wf.lastExecution) return "amber";
  return "green";
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

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
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md border border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Client Dashboard</h1>
          <p className="text-gray-400">Enter your password to view your automation status.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Dashboard password"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg font-medium transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-gray-500 text-xs text-center mt-6">
          Powered by Oladipupo Consulting
        </p>
      </div>
    </div>
  );
}

export default function ClientDashboard() {
  const params = useParams();
  const slug = params.slug as string;
  const [data, setData] = useState<DashboardData | null>(null);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchStatus() {
    try {
      const res = await fetch(`/api/client-status/${slug}`);
      if (res.status === 401) {
        setNeedsLogin(true);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setError("Failed to load dashboard data.");
        setLoading(false);
        return;
      }
      const json = await res.json();
      setData(json);
      setNeedsLogin(false);
      setLoading(false);
    } catch {
      setError("Connection error. Please try again.");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStatus();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (needsLogin) {
    return <LoginForm slug={slug} />;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-red-400 text-lg">{error || "Something went wrong."}</div>
      </div>
    );
  }

  const healthLabels = {
    green: "All Systems Operational",
    amber: "Minor Issues Detected",
    red: "Attention Required",
  };

  const healthColors = {
    green: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    red: "text-red-400 border-red-500/30 bg-red-500/10",
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{data.client.name}</h1>
            <p className="text-gray-400 text-sm">Automation Dashboard</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            Last updated: {timeAgo(data.summary.lastUpdated)}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Health Banner */}
        <div
          className={`rounded-xl border p-6 mb-8 ${healthColors[data.summary.health]}`}
        >
          <div className="flex items-center gap-3">
            <StatusDot status={data.summary.health} />
            <span className="text-lg font-semibold">
              {healthLabels[data.summary.health]}
            </span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="text-3xl font-bold">{data.summary.activeWorkflows}</div>
            <div className="text-gray-400 text-sm mt-1">Active Workflows</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="text-3xl font-bold">{data.summary.totalWorkflows}</div>
            <div className="text-gray-400 text-sm mt-1">Total Workflows</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="text-3xl font-bold">{data.summary.executionsThisWeek}</div>
            <div className="text-gray-400 text-sm mt-1">Runs This Week</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className={`text-3xl font-bold ${data.summary.errorsThisWeek > 0 ? "text-red-400" : "text-emerald-400"}`}>
              {data.summary.errorsThisWeek}
            </div>
            <div className="text-gray-400 text-sm mt-1">Errors This Week</div>
          </div>
        </div>

        {/* Workflow Table */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold">Workflow Status</h2>
          </div>
          <div className="divide-y divide-gray-800">
            {data.workflows.map((wf) => {
              const health = getWorkflowHealth(wf);
              return (
                <div key={wf.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <StatusDot status={health} />
                    <div className="min-w-0">
                      <div className="font-medium truncate">{wf.shortName}</div>
                      <div className="text-gray-500 text-sm">{wf.schedule}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm shrink-0">
                    <div className="text-right">
                      <div className="text-gray-300">{wf.executionsThisWeek} runs</div>
                      {wf.errorsThisWeek > 0 && (
                        <div className="text-red-400">{wf.errorsThisWeek} errors</div>
                      )}
                    </div>
                    <div className="text-gray-500 w-20 text-right">
                      {wf.lastExecution?.startedAt
                        ? timeAgo(wf.lastExecution.startedAt)
                        : "Never"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>
            Hi {data.client.contactName} — this dashboard auto-refreshes every 5
            minutes.
          </p>
          <p className="mt-1">
            Questions? Email{" "}
            <a
              href="mailto:hello@oladipupoconsulting.co.uk"
              className="text-blue-400 hover:underline"
            >
              hello@oladipupoconsulting.co.uk
            </a>
          </p>
          <p className="mt-4 text-gray-700">Powered by Oladipupo Consulting</p>
        </div>
      </main>
    </div>
  );
}
