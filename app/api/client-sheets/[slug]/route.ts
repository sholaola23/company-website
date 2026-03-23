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
          orderRows: [
            { fullName: "Amina Okafor", phone: "+447700100001", items: "3x Agege Bread, 2x Meat Pie", deliveryAddress: "14 Rockingham Road", postcode: "NN16 9DA", town: "Kettering", basketTotal: 14.00, paymentStatus: "Paid", outstandingBalance: 0, orderStatus: "Confirmed" },
            { fullName: "Bola Adewale", phone: "+447700100002", items: "2x Sardine Bread, 1x Banana Cake (Mini)", deliveryAddress: "7 Gold Street", postcode: "NN8 4BA", town: "Wellingborough", basketTotal: 28.50, paymentStatus: "Unpaid", outstandingBalance: 28.50, orderStatus: "Confirmed" },
            { fullName: "Chioma Eze", phone: "+447700100003", items: "4x Agege Bread", deliveryAddress: "22 Abington Avenue", postcode: "NN1 4PE", town: "Northampton", basketTotal: 8.00, paymentStatus: "Paid", outstandingBalance: 0, orderStatus: "Confirmed" },
            { fullName: "David Mensah", phone: "+447700100004", items: "1x Banana Cake (Maxi), 2x Meat Pie", deliveryAddress: "5 Stamford Road", postcode: "NN17 1DP", town: "Corby", basketTotal: 22.00, paymentStatus: "Unpaid", outstandingBalance: 22.00, orderStatus: "Confirmed" },
            { fullName: "Funke Balogun", phone: "+447700100005", items: "2x Agege Bread, 1x Sardine Bread", deliveryAddress: "31 Montagu Street", postcode: "NN16 8RX", town: "Kettering", basketTotal: 7.50, paymentStatus: "Partial", outstandingBalance: 3.50, orderStatus: "Confirmed" },
            { fullName: "Grace Nwosu", phone: "+447700100006", items: "1x Banana Cake (Midi)", deliveryAddress: "8 Spencer Bridge Road", postcode: "NN5 7BA", town: "Northampton", basketTotal: 16.50, paymentStatus: "Paid", outstandingBalance: 0, orderStatus: "Confirmed" },
            { fullName: "Hassan Ibrahim", phone: "+447700100007", items: "5x Agege Bread, 3x Meat Pie", deliveryAddress: "19 Headlands", postcode: "NN16 9BN", town: "Kettering", basketTotal: 19.00, paymentStatus: "Paid", outstandingBalance: 0, orderStatus: "Confirmed" },
            { fullName: "Joy Akinwale", phone: "+447700100008", items: "1x Agege Bread", deliveryAddress: "42 Oxford Street", postcode: "NN8 4HN", town: "Wellingborough", basketTotal: 2.00, paymentStatus: "Unpaid", outstandingBalance: 2.00, orderStatus: "Confirmed" },
          ],
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

  const allTime = req.nextUrl.searchParams.get("view") === "all";
  const data = await getAllSheetsData(client.sheetsId, allTime);

  return NextResponse.json({
    ...data,
    view: allTime ? "all" : "week",
    lastUpdated: new Date().toISOString(),
  });
}
