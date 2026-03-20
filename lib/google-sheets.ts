import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// Product columns in the Orders sheet — headers include prices like
// "Agege Bread 800g — £2.00 (quantity)"
const PRODUCT_KEYWORDS = [
  "Agege Bread",
  "Sardine Bread",
  "Meat Pie",
  "Mini Loaf",
  "Midi Loaf",
  "Maxi Loaf",
];

// Short display names for the dashboard
const PRODUCT_DISPLAY_NAMES: Record<string, string> = {
  "Agege Bread": "Agege Bread",
  "Sardine Bread": "Sardine Bread",
  "Meat Pie": "Meat Pie",
  "Mini Loaf": "Banana Cake (Mini)",
  "Midi Loaf": "Banana Cake (Midi)",
  "Maxi Loaf": "Banana Cake (Maxi)",
};

/**
 * Extract price from a product header like "Agege Bread 800g — £2.00 (quantity)"
 */
function extractPriceFromHeader(header: string): number {
  const match = header.match(/£([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

/**
 * Find the matching header for a product keyword from the actual sheet headers
 */
function findProductHeader(
  headers: string[],
  keyword: string
): string | undefined {
  return headers.find((h) =>
    h.toLowerCase().includes(keyword.toLowerCase())
  );
}

export interface OrdersSummary {
  totalOrders: number;
  totalRevenue: number;
  paidCount: number;
  unpaidCount: number;
  unpaidAmount: number;
  unpaidCustomers: { name: string; amount: number; daysAgo: number }[];
}

export interface ProductionItem {
  product: string;
  quantity: number;
}

export interface DeliverySummary {
  totalStops: number;
  byTown: { town: string; count: number }[];
}

export interface SheetsData {
  orders: OrdersSummary | null;
  production: ProductionItem[] | null;
  deliveries: DeliverySummary | null;
}

function getServiceAccountAuth(): JWT | null {
  const creds = process.env.GOOGLE_SERVICE_ACCOUNT;
  if (!creds) return null;
  try {
    const parsed = JSON.parse(creds);
    return new JWT({
      email: parsed.client_email,
      key: parsed.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
  } catch {
    return null;
  }
}

async function getDoc(sheetsId: string): Promise<GoogleSpreadsheet | null> {
  const auth = getServiceAccountAuth();
  if (!auth) return null;
  const doc = new GoogleSpreadsheet(sheetsId, auth);
  await doc.loadInfo();
  return doc;
}

/**
 * Get the current week code in the format used by E'Manuel sheets: "Fri DD Mon"
 * This matches the ARRAYFORMULA in column Y of the Orders tab.
 */
function getCurrentWeekCode(): string {
  const now = new Date();
  // Find the Friday of the current week (or next Friday if before Friday)
  const day = now.getDay(); // 0=Sun, 5=Fri
  const daysUntilFriday = (5 - day + 7) % 7;
  const friday = new Date(now);
  friday.setDate(now.getDate() + daysUntilFriday);
  // If it's Saturday or Sunday, use the previous Friday
  if (day === 6) friday.setDate(now.getDate() - 1);
  if (day === 0) friday.setDate(now.getDate() - 2);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const dd = friday.getDate();
  const mon = months[friday.getMonth()];
  return `Fri ${dd} ${mon}`;
}

export async function getOrdersSummary(
  sheetsId: string
): Promise<OrdersSummary | null> {
  try {
    const doc = await getDoc(sheetsId);
    if (!doc) return null;

    const sheet = doc.sheetsByTitle["Orders"];
    if (!sheet) return null;

    const rows = await sheet.getRows();
    const weekCode = getCurrentWeekCode();

    // Filter to current week, exclude cancelled
    const thisWeek = rows.filter((row) => {
      const wc = row.get("Week Code");
      const status = (row.get("Order Status") || "").toLowerCase();
      return wc === weekCode && status !== "cancelled";
    });

    // Build a map of product header → price from the column names
    const headers = sheet.headerValues;
    const productPrices: { header: string; price: number }[] = [];
    for (const keyword of PRODUCT_KEYWORDS) {
      const header = findProductHeader(headers, keyword);
      if (header) {
        productPrices.push({ header, price: extractPriceFromHeader(header) });
      }
    }

    let totalRevenue = 0;
    let paidCount = 0;
    let unpaidCount = 0;
    let unpaidAmount = 0;
    const unpaidCustomers: { name: string; amount: number; daysAgo: number }[] =
      [];

    for (const row of thisWeek) {
      // Calculate basket total from product quantities × prices (primary)
      // Fall back to pre-calculated "Basket Total" column if products give 0
      let basketTotal = 0;
      for (const { header, price } of productPrices) {
        const qty = parseInt(row.get(header) || "0");
        if (qty > 0) basketTotal += qty * price;
      }
      if (basketTotal === 0) {
        const rawBT = parseFloat(row.get("Basket Total") || "0");
        if (!isNaN(rawBT) && rawBT > 0) basketTotal = rawBT;
      }

      const paymentStatus = (row.get("Payment Status") || "").toLowerCase();
      const name =
        row.get("Full Name") || row.get("Name") || row.get("Customer") || "Unknown";

      totalRevenue += basketTotal;

      if (paymentStatus === "paid") {
        paidCount++;
      } else {
        unpaidCount++;
        // Use Outstanding Balance column if available, else fall back to basket total
        const outstandingRaw = row.get("Outstanding Balance");
        const parsedOutstanding =
          outstandingRaw != null && outstandingRaw !== ""
            ? parseFloat(outstandingRaw)
            : NaN;
        const outstanding = isNaN(parsedOutstanding)
          ? basketTotal
          : parsedOutstanding;
        unpaidAmount += outstanding;

        // Calculate days since order
        const submittedAt =
          row.get("Submitted at") ||
          row.get("Submitted At") ||
          row.get("Timestamp");
        let daysAgo = 0;
        if (submittedAt) {
          const orderDate = new Date(submittedAt);
          daysAgo = Math.floor(
            (Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24)
          );
        }

        unpaidCustomers.push({
          name,
          amount: outstanding,
          daysAgo,
        });
      }
    }

    // Sort unpaid by amount descending
    unpaidCustomers.sort((a, b) => b.amount - a.amount);

    return {
      totalOrders: thisWeek.length,
      totalRevenue: isNaN(totalRevenue) ? 0 : Math.round(totalRevenue * 100) / 100,
      paidCount,
      unpaidCount,
      unpaidAmount: isNaN(unpaidAmount) ? 0 : Math.round(unpaidAmount * 100) / 100,
      unpaidCustomers: unpaidCustomers.map((c) => ({
        ...c,
        amount: isNaN(c.amount) ? 0 : Math.round(c.amount * 100) / 100,
      })),
    };
  } catch (e) {
    console.error("Failed to fetch orders summary:", e);
    return null;
  }
}

export async function getProductionSummary(
  sheetsId: string
): Promise<ProductionItem[] | null> {
  try {
    const doc = await getDoc(sheetsId);
    if (!doc) return null;

    // Try reading from Production Summary tab first (has pre-calculated totals)
    const prodSheet = doc.sheetsByTitle["Production Summary"];
    if (prodSheet) {
      const rows = await prodSheet.getRows();
      const items: ProductionItem[] = [];
      for (const row of rows) {
        const product = row.get("Product") || row.get("Item");
        const qty = parseInt(row.get("Quantity") || row.get("Total") || "0");
        if (product && qty > 0) {
          items.push({
            product: PRODUCT_DISPLAY_NAMES[product] || product,
            quantity: qty,
          });
        }
      }
      if (items.length > 0) return items;
    }

    // Fallback: aggregate from Orders tab directly
    const ordersSheet = doc.sheetsByTitle["Orders"];
    if (!ordersSheet) return null;

    const rows = await ordersSheet.getRows();
    const weekCode = getCurrentWeekCode();

    const headers = ordersSheet.headerValues;
    const totals: Record<string, number> = {};
    for (const keyword of PRODUCT_KEYWORDS) {
      totals[keyword] = 0;
    }

    for (const row of rows) {
      const wc = row.get("Week Code");
      const status = (row.get("Order Status") || "").toLowerCase();
      if (wc !== weekCode || status === "cancelled") continue;

      for (const keyword of PRODUCT_KEYWORDS) {
        const matchingHeader = findProductHeader(headers, keyword);
        if (matchingHeader) {
          const val = parseInt(row.get(matchingHeader) || "0");
          if (val > 0) totals[keyword] += val;
        }
      }
    }

    const items: ProductionItem[] = [];
    for (const [keyword, qty] of Object.entries(totals)) {
      if (qty > 0) {
        items.push({
          product: PRODUCT_DISPLAY_NAMES[keyword] || keyword,
          quantity: qty,
        });
      }
    }

    return items.length > 0 ? items : null;
  } catch (e) {
    console.error("Failed to fetch production summary:", e);
    return null;
  }
}

export async function getDeliverySummary(
  sheetsId: string
): Promise<DeliverySummary | null> {
  try {
    const doc = await getDoc(sheetsId);
    if (!doc) return null;

    const sheet = doc.sheetsByTitle["Delivery Manifest"];
    if (!sheet) return null;

    const rows = await sheet.getRows();
    if (rows.length === 0) return { totalStops: 0, byTown: [] };

    const townCounts: Record<string, number> = {};
    for (const row of rows) {
      const town = row.get("Town") || row.get("Area") || "Unknown";
      townCounts[town] = (townCounts[town] || 0) + 1;
    }

    const byTown = Object.entries(townCounts)
      .map(([town, count]) => ({ town, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalStops: rows.length,
      byTown,
    };
  } catch (e) {
    console.error("Failed to fetch delivery summary:", e);
    return null;
  }
}


export async function getAllSheetsData(
  sheetsId: string
): Promise<SheetsData> {
  // Fetch all three in parallel for speed
  const [orders, production, deliveries] = await Promise.all([
    getOrdersSummary(sheetsId),
    getProductionSummary(sheetsId),
    getDeliverySummary(sheetsId),
  ]);

  return { orders, production, deliveries };
}
