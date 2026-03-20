import { NextRequest, NextResponse } from "next/server";
import { validateClientAuth } from "@/lib/client-auth";
import { getClient } from "@/lib/client-config";

export const dynamic = "force-dynamic";

const N8N_API_BASE = "https://oladipupo-consulting.app.n8n.cloud/api/v1";

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
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
  const workflowMap = new Map<string, { active: boolean }>();
  if (allWorkflows?.data) {
    for (const wf of allWorkflows.data) {
      workflowMap.set(wf.id, { active: wf.active });
    }
  }

  // Fetch execution data for each client workflow
  const workflowStatuses: WorkflowStatus[] = [];

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

    workflowStatuses.push({
      id: wf.id,
      name: wf.name,
      shortName: wf.shortName,
      schedule: wf.schedule,
      active: wfInfo?.active ?? false,
      lastExecution: lastExec
        ? {
            status: lastExec.status === "success" ? "success" : lastExec.status === "error" ? "error" : lastExec.status === "waiting" ? "waiting" : "unknown",
            startedAt: lastExec.startedAt || null,
            finishedAt: lastExec.stoppedAt || null,
          }
        : null,
      executionsThisWeek: weekExecutions.length,
      errorsThisWeek: weekErrors.length,
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
  const errorCount = workflowStatuses.filter(
    (w) => w.lastExecution?.status === "error"
  ).length;

  const overallHealth: "green" | "amber" | "red" =
    errorCount === 0 && totalErrors === 0
      ? "green"
      : errorCount >= 2 || totalErrors >= 5
        ? "red"
        : "amber";

  return NextResponse.json({
    client: {
      name: client.name,
      contactName: client.contactName,
      industry: client.industry,
    },
    summary: {
      health: overallHealth,
      activeWorkflows: activeCount,
      totalWorkflows: workflowStatuses.length,
      executionsThisWeek: totalExecutions,
      errorsThisWeek: totalErrors,
      lastUpdated: new Date().toISOString(),
    },
    workflows: workflowStatuses,
  });
}
