// Client configuration for the client dashboard
// Each client has a slug, display name, and their n8n workflow IDs

export interface WorkflowConfig {
  id: string;
  name: string;
  shortName: string;
  schedule: string;
  // Business-friendly metadata for the dashboard
  businessName: string;
  statusVerb: string;
  expectedScheduleHuman: string;
  icon: string;
}

export interface BankDetails {
  accountName: string;
  sortCode: string;
  accountNumber: string;
}

export interface ClientConfig {
  slug: string;
  name: string;
  contactName: string;
  industry: string;
  // n8n workflow IDs to monitor
  workflows: WorkflowConfig[];
  // Google Sheets ID for order data (optional)
  sheetsId?: string;
  // Client logo URL (optional — falls back to initials)
  logoUrl?: string;
  // Short initials for logo fallback (e.g. "EM" for E'Manuel)
  initials: string;
  // Password hash — stored as env var CLIENT_PASSWORD_{SLUG_UPPER}
  passwordEnvKey: string;
  // Bank transfer details for unpaid order follow-ups (optional)
  bankDetails?: BankDetails;
  // Google Drive folder ID for bank statement uploads (optional)
  driveFolderId?: string;
}

export const CLIENTS: Record<string, ClientConfig> = {
  emanuel: {
    slug: "emanuel",
    name: "E'Manuel Foods and Bakery",
    contactName: "Tunmise",
    industry: "Bakery",
    workflows: [
      {
        id: "fLLDdF34MDxYGlEf",
        name: "SumUp Transaction Polling",
        shortName: "Transactions",
        schedule: "Every 15 min (Thu–Sat)",
        businessName: "SumUp payments matched to orders",
        statusVerb: "Matched",
        expectedScheduleHuman: "Thu–Sat, every 15 min",
        icon: "CreditCard",
      },
      // WF02 (HSBC CSV Bank Match — NHBBHmLemmxWbQPV) REMOVED 31 March 2026
      // Bank matching ported to Next.js (lib/bank-match.ts). n8n workflow archived.
      {
        id: "KtoalRNhFVKa9AVf",
        name: "SumUp Checkout Links",
        shortName: "Checkout Links",
        schedule: "Every 30 min",
        businessName: "SumUp payment links created",
        statusVerb: "Created",
        expectedScheduleHuman: "Every 30 minutes",
        icon: "Link",
      },
      {
        id: "YfZPwpngWEg0uyYv",
        name: "Production Summary Alert",
        shortName: "Production Alert",
        schedule: "Thu 2pm",
        businessName: "Weekly production summary sent",
        statusVerb: "Sent",
        expectedScheduleHuman: "Thursdays at 2pm",
        icon: "Send",
      },
      {
        id: "xp6rs4YDco1n3oXg",
        name: "Delivery Route Optimiser",
        shortName: "Delivery Route",
        schedule: "Fri 2pm",
        businessName: "Delivery route sent to WhatsApp",
        statusVerb: "Sent",
        expectedScheduleHuman: "Fridays at 2pm",
        icon: "Truck",
      },
      {
        id: "UqXddNGPu0q0IgNj",
        name: "Baking List & Exception Alerts",
        shortName: "Baking List",
        schedule: "Thu 7pm",
        businessName: "Baking list generated",
        statusVerb: "Generated",
        expectedScheduleHuman: "Thursdays at 7pm",
        icon: "ChefHat",
      },
      // WF08 (YYTlfccah2LHZ207 — duplicate SumUp Checkout Links) ARCHIVED 31 March 2026
      {
        id: "PDJfPcqZq8c4Za6B",
        name: "Monday Order Cleanup",
        shortName: "Monday Cleanup",
        schedule: "Mon 8am",
        businessName: "Weekly sheet cleanup done",
        statusVerb: "Done",
        expectedScheduleHuman: "Mondays at 8am",
        icon: "Sparkles",
      },
    ],
    sheetsId: "1Ns6S_2Nt7-OxQv2As5iof62_6wYu-qb2jK42MPUa8vw",
    initials: "EM",
    passwordEnvKey: "CLIENT_PASSWORD_EMANUEL",
    bankDetails: {
      accountName: "E'MANUEL FOODS AND BAKERY LIMITED",
      sortCode: "40-09-06",
      accountNumber: "82077337",
    },
    driveFolderId: "18kuxNiXgohekG9-3StB1moGveAEx3t6a",
  },
  "emanuel-test": {
    slug: "emanuel-test",
    name: "E'Manuel Foods and Bakery (TEST)",
    contactName: "Test User",
    industry: "Bakery",
    workflows: [],
    sheetsId: "1HCS6jTgUznzXLsJyMZ5aAkoVS1UbboygdnmBvB8O5MA",
    initials: "ET",
    passwordEnvKey: "CLIENT_PASSWORD_EMANUEL_TEST",
    bankDetails: {
      accountName: "E'MANUEL FOODS AND BAKERY LIMITED",
      sortCode: "40-09-06",
      accountNumber: "82077337",
    },
  },
};

// Vanity slugs for clean app.workcrew.io URLs
// Maps friendly URL path → internal client slug
export const VANITY_SLUGS: Record<string, string> = {
  emanuelbakery: "emanuel",
  emanueltest: "emanuel-test",
};

export function getClient(slug: string): ClientConfig | undefined {
  // Check vanity slugs first, then direct match
  const resolvedSlug = VANITY_SLUGS[slug] || slug;
  return CLIENTS[resolvedSlug];
}

export function resolveSlug(slug: string): string {
  return VANITY_SLUGS[slug] || slug;
}
