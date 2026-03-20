// Client configuration for the client dashboard
// Each client has a slug, display name, and their n8n workflow IDs

export interface ClientConfig {
  slug: string;
  name: string;
  contactName: string;
  industry: string;
  // n8n workflow IDs to monitor
  workflows: {
    id: string;
    name: string;
    shortName: string;
    schedule: string;
  }[];
  // Google Sheets ID for order data (optional)
  sheetsId?: string;
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
      { id: "fLLDdF34MDxYGlEf", name: "Tally → Sheet Order Sync", shortName: "Order Sync", schedule: "Every 30 min" },
      { id: "NHBBHmLemmxWbQPV", name: "HSBC CSV Bank Match", shortName: "Bank Match", schedule: "Every 1 min" },
      { id: "KtoalRNhFVKa9AVf", name: "Production Summary", shortName: "Production", schedule: "Every 30 min" },
      { id: "YfZPwpngWEg0uyYv", name: "Order Update", shortName: "Order Update", schedule: "Thu 2pm" },
      { id: "xp6rs4YDco1n3oXg", name: "Delivery Route Optimiser", shortName: "Delivery Route", schedule: "Fri 2pm" },
      { id: "UqXddNGPu0q0IgNj", name: "Baking List & Payment Summary", shortName: "Baking List", schedule: "Thu 7pm" },
      { id: "YYTlfccah2LHZ207", name: "SumUp Checkout Links", shortName: "Checkout Links", schedule: "Every 30 min (Wed-Fri)" },
      { id: "PDJfPcqZq8c4Za6B", name: "Monday Order Cleanup", shortName: "Monday Cleanup", schedule: "Mon 8am" },
    ],
    sheetsId: "1Ns6S_2Nt7-OxQv2As5iof62_6wYu-qb2jK42MPUa8vw",
    passwordEnvKey: "CLIENT_PASSWORD_EMANUEL",
  },
};

export function getClient(slug: string): ClientConfig | undefined {
  return CLIENTS[slug];
}
