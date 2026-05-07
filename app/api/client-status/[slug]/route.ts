import { NextRequest, NextResponse } from "next/server";
import { validateClientAuth } from "@/lib/client-auth";
import { getClient } from "@/lib/client-config";

export const dynamic = "force-dynamic";

const N8N_API_BASE = process.env.N8N_API_BASE || "https://n8n-production-d877.up.railway.app/api/v1";

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
  // Business-friendly fields
  businessName: string;
  statusVerb: string;
  expectedScheduleHuman: string;
  icon: string;
}

async function fetchN8nWorkflows(apiKey: string) {
  const res = await fetch(`${N8N_API_BASE}/workflows`, {
    headers: { "X-N8N-API-KEY": apiKey },
  });
  if (!res.ok) return null;
  return res.json();
}

async function fetchN8nExecutions(
  apiKey: string,
  workflowId: string,
  limit = 10
) {
  const res = await fetch(
    `${N8N_API_BASE}/executions?workflowId=${workflowId}&limit=${limit}`,
    { headers: { "X-N8N-API-KEY": apiKey } }
  );
  if (!res.ok) return null;
  return res.json();
}

function isWithinLastWeek(dateStr: string): boolean {
  const date = new Date(dateStr);
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return date >= weekAgo;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Auth check
  const isAuthed = await validateClientAuth(slug);
  if (!isAuthed) {
    const clientForLogin = getClient(slug);
    return NextResponse.json(
      {
        error: "Unauthorized",
        clientInfo: clientForLogin
          ? { name: clientForLogin.name, initials: clientForLogin.initials }
          : null,
      },
      { status: 401 }
    );
  }

  const client = getClient(slug);
  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  const apiKey = process.env.N8N_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "n8n API not configured" },
      { status: 500 }
    );
  }

  // Fetch all workflows to get active/inactive status
  const allWorkflows = await fetchN8nWorkflows(apiKey);
  const workflowMap = new Map<string, { active: boolean; updatedAt?: string }>();
  if (allWorkflows?.data) {
    for (const wf of allWorkflows.data) {
      workflowMap.set(wf.id, { active: wf.active, updatedAt: wf.updatedAt });
    }
  }

  // Fetch execution data for each client workflow
  const workflowStatuses: WorkflowStatus[] = [];
  const now = Date.now();
  const FORTY_EIGHT_HOURS = 48 * 60 * 60 * 1000;

  for (const wf of client.workflows) {
    const execData = await fetchN8nExecutions(apiKey, wf.id, 20);
    const executions = execData?.data || [];

    const weekExecutions = executions.filter(
      (e: { startedAt: string }) =>
        e.startedAt && isWithinLastWeek(e.startedAt)
    );

    const weekErrors = weekExecutions.filter(
      (e: { status: string }) => e.status === "error"
    );

    const lastExec = executions[0] || null;
    const wfInfo = workflowMap.get(wf.id);
    const isActive = wfInfo?.active ?? false;
    const lastStatus: "success" | "error" | "waiting" | "unknown" = lastExec
      ? lastExec.status === "success"
        ? "success"
        : lastExec.status === "error"
          ? "error"
          : lastExec.status === "waiting"
            ? "waiting"
            : "unknown"
      : "unknown";
    const lastStartedAt = lastExec?.startedAt || null;

    // A workflow is "currently failing" only if:
    // 1. Active (inactive workflows are intentionally paused, not failing).
    // 2. Last execution status was "error".
    // 3. Error within the last 48 hours (not a stale old error).
    // 4. Workflow has not been updated/redeployed after the error (an update means the
    //    issue has been addressed — auto-healer fix or manual intervention).
    let currentlyFailing = false;
    if (isActive && lastStatus === "error" && lastStartedAt) {
      const lastRun = new Date(lastStartedAt).getTime();
      const fresh = now - lastRun < FORTY_EIGHT_HOURS;
      const updatedAt = wfInfo?.updatedAt
        ? new Date(wfInfo.updatedAt).getTime()
        : 0;
      const addressed = updatedAt > lastRun;
      currentlyFailing = fresh && !addressed;
    }

    workflowStatuses.push({
      id: wf.id,
      name: wf.name,
      shortName: wf.shortName,
      schedule: wf.schedule,
      active: isActive,
      lastExecution: lastExec
        ? {
            status: lastStatus,
            startedAt: lastStartedAt,
            finishedAt: lastExec.stoppedAt || null,
          }
        : null,
      executionsThisWeek: weekExecutions.length,
      errorsThisWeek: weekErrors.length,
      currentlyFailing,
      // Business-friendly fields from config
      businessName: wf.businessName,
      statusVerb: wf.statusVerb,
      expectedScheduleHuman: wf.expectedScheduleHuman,
      icon: wf.icon,
    });
  }

  // Calculate summary
  const totalExecutions = workflowStatuses.reduce(
    (sum, w) => sum + w.executionsThisWeek,
    0
  );
  const totalErrors = workflowStatuses.reduce(
    (sum, w) => sum + w.errorsThisWeek,
    0
  );
  const activeCount = workflowStatuses.filter((w) => w.active).length;

  const currentlyFailingCount = workflowStatuses.filter(
    (w) => w.currentlyFailing
  ).length;

  const overallHealth: "green" | "amber" | "red" =
    currentlyFailingCount === 0
      ? "green"
      : currentlyFailingCount >= 2 ||
          currentlyFailingCount > workflowStatuses.length / 2
        ? "red"
        : "amber";

  const issuesNeedingAttention = currentlyFailingCount;

  const headline =
    overallHealth === "green"
      ? "All systems running"
      : overallHealth === "amber"
        ? "Most systems running"
        : "We're looking into an issue";

  return NextResponse.json({
    client: {
      name: client.name,
      contactName: client.contactName,
      industry: client.industry,
      logoUrl: client.logoUrl || null,
      initials: client.initials,
      bankDetails: client.bankDetails || null,
    },
    summary: {
      health: overallHealth,
      activeWorkflows: activeCount,
      totalWorkflows: workflowStatuses.length,
      executionsThisWeek: totalExecutions,
      errorsThisWeek: totalErrors,
      lastUpdated: new Date().toISOString(),
    },
    businessSummary: {
      headline,
      automationsRunning: activeCount,
      tasksCompletedThisWeek: totalExecutions,
      issuesNeedingAttention,
    },
    workflows: workflowStatuses,
  });
}
