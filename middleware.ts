import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim().toLowerCase())
  : [];

function normalizeHost(value: string): string {
  return value.toLowerCase().replace(/^https?:\/\//, "").replace(/\/+$/, "");
}

function isAllowedOrigin(origin: string | null, host: string | null): boolean {
  if (!origin) return false;
  const normalizedOrigin = normalizeHost(origin);
  const normalizedHost = host ? normalizeHost(host) : "";

  if (ALLOWED_ORIGINS.length === 0) {
    // Default behavior: origin must match the request host.
    return normalizedOrigin === normalizedHost;
  }

  return ALLOWED_ORIGINS.includes(normalizedOrigin);
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const response = NextResponse.next();

  // Content-Security-Policy: strict default, allow scripts/styles from self and Vercel.
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-inline/eval in dev; review for production hardening
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "upgrade-insecure-requests",
  ];

  response.headers.set("Content-Security-Policy", cspDirectives.join("; "));
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  // HSTS: enforce HTTPS for 1 year (only meaningful when served over HTTPS).
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  // CORS protection: only allow configured origins for API routes.
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const host = request.headers.get("host");
    if (!isAllowedOrigin(origin, host)) {
      return NextResponse.json(
        { message: "Origin tidak diizinkan." },
        { status: 403 },
      );
    }
    response.headers.set("Access-Control-Allow-Origin", origin ?? "");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    response.headers.set("Vary", "Origin");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.png|buku-panduan.pdf|robots.txt|sitemap.xml).*)",
  ],
};
