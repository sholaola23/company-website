import { NextRequest, NextResponse } from "next/server";
import { validateClientAuth } from "@/lib/client-auth";
import { getClient } from "@/lib/client-config";
import { getAllSheetsData } from "@/lib/google-sheets";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const isAuthed = await validateClientAuth(slug);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = getClient(slug);
  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  if (!client.sheetsId) {
    return NextResponse.json(
      { error: "Google Sheets not configured for this client" },
      { status: 404 }
    );
  }

  if (!process.env.GOOGLE_SERVICE_ACCOUNT) {
    // In development, return realistic mock data so we can preview the full dashboard
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json({
        orders: {
          totalOrders: 23,
          totalRevenue: 487.5,
          paidCount: 15,
          unpaidCount: 8,
          unpaidAmount: 162.0,
          unpaidCustomers: [
            { name: "Amina Okafor", amount: 35.0, daysAgo: 3 },
            { name: "Bola Adewale", amount: 28.5, daysAgo: 2 },
            { name: "Chioma Eze", amount: 24.0, daysAgo: 4 },
            { name: "David Mensah", amount: 22.0, daysAgo: 1 },
            { name: "Funke Balogun", amount: 18.5, daysAgo: 2 },
            { name: "Grace Nwosu", amount: 16.5, daysAgo: 5 },
            { name: "Hassan Ibrahim", amount: 10.0, daysAgo: 1 },
            { name: "Joy Akinwale", amount: 7.5, daysAgo: 3 },
          ],
          paymentBreakdown: {
            totalPaid: 325.5,
            sumupPaid: 245.0,
            sumupCount: 10,
            bankTransferPaid: 80.5,
            bankTransferCount: 5,
            otherPaid: 0,
            otherCount: 0,
          },
        },
        production: [
          { product: "Agege Bread", quantity: 42 },
          { product: "Sardine Bread", quantity: 18 },
          { product: "Meat Pie", quantity: 24 },
          { product: "Banana Cake (Mini)", quantity: 12 },
          { product: "Banana Cake (Midi)", quantity: 8 },
          { product: "Banana Cake (Maxi)", quantity: 5 },
        ],
        deliveries: {
          totalStops: 19,
          byTown: [
            { town: "Kettering", count: 8 },
            { town: "Wellingborough", count: 5 },
            { town: "Northampton", count: 4 },
            { town: "Corby", count: 2 },
          ],
        },
        lastUpdated: new Date().toISOString(),
      });
    }
    return NextResponse.json(
      { error: "Google Sheets credentials not configured" },
      { status: 500 }
    );
  }

  const data = await getAllSheetsData(client.sheetsId);

  return NextResponse.json({
    ...data,
    lastUpdated: new Date().toISOString(),
  });
}
