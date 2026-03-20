import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/lib/client-config";
import { setClientAuthCookie } from "@/lib/client-auth";

export async function POST(req: NextRequest) {
  const { slug, password } = await req.json();

  const client = getClient(slug);
  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  const expectedPassword = process.env[client.passwordEnvKey];
  if (!expectedPassword || password !== expectedPassword) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  await setClientAuthCookie(slug, password);
  return NextResponse.json({ ok: true });
}
