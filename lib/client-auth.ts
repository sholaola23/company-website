import { cookies } from "next/headers";
import { getClient, resolveSlug } from "./client-config";

const COOKIE_PREFIX = "client_auth_";

export async function validateClientAuth(slug: string): Promise<boolean> {
  const client = getClient(slug);
  if (!client) return false;

  const resolved = resolveSlug(slug);
  const cookieStore = await cookies();
  // Check both the raw slug and resolved slug cookies (vanity URL support)
  const authCookie =
    cookieStore.get(`${COOKIE_PREFIX}${slug}`) ||
    cookieStore.get(`${COOKIE_PREFIX}${resolved}`);
  if (!authCookie) return false;

  const expectedPassword = process.env[client.passwordEnvKey];
  const adminPassword = process.env.CLIENT_ADMIN_PASSWORD;

  const isClientMatch = expectedPassword && authCookie.value === expectedPassword;
  const isAdminMatch = adminPassword && authCookie.value === adminPassword;

  return !!(isClientMatch || isAdminMatch);
}

export async function setClientAuthCookie(slug: string, password: string) {
  const cookieStore = await cookies();
  cookieStore.set(`${COOKIE_PREFIX}${slug}`, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: `/`,
  });
}

export function getClientPasswordEnvKey(slug: string): string {
  return `CLIENT_PASSWORD_${slug.toUpperCase()}`;
}
