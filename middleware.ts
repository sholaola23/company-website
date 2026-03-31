import { NextRequest, NextResponse } from "next/server";
import { VANITY_SLUGS } from "@/lib/client-config";

/**
 * Middleware for app.workcrew.io subdomain routing.
 * (Also supports legacy app.oladipupoconsulting.co.uk for backward compatibility)
 *
 * Rewrites:
 *   app.workcrew.io/emanuelbakery  →  /client/emanuel
 *   app.workcrew.io/emanuelbakery/… →  /client/emanuel/…
 *
 * Also handles the API routes needed by the dashboard:
 *   app.workcrew.io/api/…  →  passes through normally
 *
 * The main domain (workcrew.io) is unaffected.
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const isAppSubdomain =
    host.startsWith("app.workcrew.io") ||
    host.startsWith("app.oladipupoconsulting.co.uk") ||
    host.startsWith("app.oladipupoconsulting.com") ||
    host.startsWith("app.localhost");

  if (!isAppSubdomain) return NextResponse.next();

  const { pathname } = req.nextUrl;

  // Let API routes, _next, and static files pass through
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Root of app subdomain — could redirect to a client selector later
  // For now, show a simple message or redirect
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Extract the first path segment as the vanity slug
  const segments = pathname.split("/").filter(Boolean);
  const vanitySlug = segments[0];

  // Resolve vanity slug to internal slug
  const internalSlug = VANITY_SLUGS[vanitySlug] || vanitySlug;

  // Rewrite to the internal /client/[slug] route
  const remainingPath = segments.slice(1).join("/");
  const rewritePath = remainingPath
    ? `/client/${internalSlug}/${remainingPath}`
    : `/client/${internalSlug}`;

  const url = req.nextUrl.clone();
  url.pathname = rewritePath;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files and internal Next.js routes.
     * This runs on every request but exits early for non-app subdomains.
     */
    "/((?!_next/static|_next/image).*)",
  ],
};
