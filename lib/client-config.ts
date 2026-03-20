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
        name: "Tally → Sheet Order Sync",
        shortName: "Order Sync",
        schedule: "Every 30 min",
        businessName: "Online orders syncing to your sheet",
        statusVerb: "Syncing",
        expectedScheduleHuman: "Every 30 minutes",
        icon: "ShoppingCart",
      },
      {
        id: "NHBBHmLemmxWbQPV",
        name: "HSBC CSV Bank Match",
        shortName: "Bank Match",
        schedule: "Every 1 min",
        businessName: "Bank payments matching to orders",
        statusVerb: "Matching",
        expectedScheduleHuman: "Continuously",
        icon: "Landmark",
      },
      {
        id: "KtoalRNhFVKa9AVf",
        name: "Production Summary",
        shortName: "Production",
        schedule: "Every 30 min",
        businessName: "Production summary updated",
        statusVerb: "Updated",
        expectedScheduleHuman: "Every 30 minutes",
        icon: "ClipboardList",
      },
      {
        id: "YfZPwpngWEg0uyYv",
        name: "Order Update",
        shortName: "Order Update",
        schedule: "Thu 2pm",
        businessName: "Weekly order update sent",
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
        name: "Baking List & Payment Summary",
        shortName: "Baking List",
        schedule: "Thu 7pm",
        businessName: "Baking list generated",
        statusVerb: "Generated",
        expectedScheduleHuman: "Thursdays at 7pm",
        icon: "ChefHat",
      },
      {
        id: "YYTlfccah2LHZ207",
        name: "SumUp Checkout Links",
        shortName: "Checkout Links",
        schedule: "Every 30 min (Wed-Fri)",
        businessName: "SumUp payment links created",
        statusVerb: "Created",
        expectedScheduleHuman: "Wed\u2013Fri, every 30 min",
        icon: "CreditCard",
      },
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
  },
};

export function getClient(slug: string): ClientConfig | undefined {
  return CLIENTS[slug];
}
