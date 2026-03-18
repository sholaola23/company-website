export interface VisitorProfile {
  pagesVisited: string[];
  visitCount: number;
  hasStartedAudit: boolean;
  hasCompletedAudit: boolean;
  lastVisit: number;
}

const VISITS_KEY = "oc_visits";
const AUDIT_STARTED_KEY = "oc_audit_started";
const AUDIT_COMPLETED_KEY = "oc_audit_completed";

function isBrowser() {
  return typeof window !== "undefined";
}

export function trackPageVisit(page: string): void {
  if (!isBrowser()) return;
  try {
    const raw = localStorage.getItem(VISITS_KEY);
    const visits: Array<{ page: string; timestamp: number }> = raw
      ? JSON.parse(raw)
      : [];
    visits.push({ page, timestamp: Date.now() });
    // Keep only last 50 visits
    const trimmed = visits.slice(-50);
    localStorage.setItem(VISITS_KEY, JSON.stringify(trimmed));
  } catch {
    // localStorage might be full or disabled
  }
}

export function getVisitorProfile(): VisitorProfile {
  if (!isBrowser()) {
    return {
      pagesVisited: [],
      visitCount: 0,
      hasStartedAudit: false,
      hasCompletedAudit: false,
      lastVisit: 0,
    };
  }

  try {
    const raw = localStorage.getItem(VISITS_KEY);
    const visits: Array<{ page: string; timestamp: number }> = raw
      ? JSON.parse(raw)
      : [];
    const pages = [...new Set(visits.map((v) => v.page))];
    const lastVisit = visits.length > 0 ? visits[visits.length - 1].timestamp : 0;

    return {
      pagesVisited: pages,
      visitCount: visits.length,
      hasStartedAudit: localStorage.getItem(AUDIT_STARTED_KEY) === "true",
      hasCompletedAudit: localStorage.getItem(AUDIT_COMPLETED_KEY) === "true",
      lastVisit,
    };
  } catch {
    return {
      pagesVisited: [],
      visitCount: 0,
      hasStartedAudit: false,
      hasCompletedAudit: false,
      lastVisit: 0,
    };
  }
}

export function markAuditStarted(): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(AUDIT_STARTED_KEY, "true");
  } catch {
    // ignore
  }
}

export function markAuditCompleted(): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(AUDIT_COMPLETED_KEY, "true");
  } catch {
    // ignore
  }
}
