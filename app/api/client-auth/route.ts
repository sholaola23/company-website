import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/lib/client-config";

const COOKIE_PREFIX = "client_auth_";

export async function POST(req: NextRequest) {
  const { slug, password } = await req.json();

  const client = getClient(slug);
  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  const expectedPassword = process.env[client.passwordEnvKey];
  const adminPassword = process.env.CLIENT_ADMIN_PASSWORD;

  const isClientMatch = expectedPassword && password === expectedPassword;
  const isAdminMatch = adminPassword && password === adminPassword;

  if (!isClientMatch && !isAdminMatch) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(`${COOKIE_PREFIX}${slug}`, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: `/`,
  });
  return response;
}
