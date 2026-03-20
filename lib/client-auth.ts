import { cookies } from "next/headers";
import { getClient } from "./client-config";

const COOKIE_PREFIX = "client_auth_";

export async function validateClientAuth(slug: string): Promise<boolean> {
  const client = getClient(slug);
  if (!client) return false;

  const cookieStore = await cookies();
  const authCookie = cookieStore.get(`${COOKIE_PREFIX}${slug}`);
  if (!authCookie) return false;

  const expectedPassword = process.env[client.passwordEnvKey];
  if (!expectedPassword) return false;

  return authCookie.value === expectedPassword;
}

export async function setClientAuthCookie(slug: string, password: string) {
  const cookieStore = await cookies();
  cookieStore.set(`${COOKIE_PREFIX}${slug}`, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: `/client/${slug}`,
  });
}

export function getClientPasswordEnvKey(slug: string): string {
  return `CLIENT_PASSWORD_${slug.toUpperCase()}`;
}
