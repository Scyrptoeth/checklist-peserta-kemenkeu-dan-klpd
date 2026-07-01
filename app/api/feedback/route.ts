import { NextResponse } from "next/server";

import {
  ensureFeedbackSchema,
  getFeedbackSql,
  isFeedbackDatabaseConfigured,
} from "@/lib/feedback/database";
import { validateAnonymousFeedback } from "@/lib/feedback/validation";
import { rateLimitByIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FEEDBACK_RATE_LIMIT = 5;
const FEEDBACK_RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

function getClientIp(request: Request): string {
  const headers = request.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return headers.get("x-real-ip") ?? "unknown";
}

function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host") ?? "";
  const protocol = headersGetProtocol(request.headers);

  if (!origin) return false;

  try {
    const originUrl = new URL(origin);
    return originUrl.host === host && originUrl.protocol === protocol;
  } catch {
    return false;
  }
}

function headersGetProtocol(headers: Headers): string {
  const forwardedProto = headers.get("x-forwarded-proto");
  if (forwardedProto) {
    return forwardedProto === "https" ? "https:" : "http:";
  }
  return "https:";
}

async function readJsonBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { message: "Permintaan feedback tidak valid." },
      { status: 403 },
    );
  }

  const clientIp = getClientIp(request);
  const rateLimit = rateLimitByIp(`feedback:${clientIp}`, FEEDBACK_RATE_LIMIT, FEEDBACK_RATE_LIMIT_WINDOW_MS);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { message: "Terlalu banyak pengiriman feedback. Silakan coba beberapa saat lagi." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)) } },
    );
  }

  if (!isFeedbackDatabaseConfigured()) {
    return NextResponse.json(
      { message: "Storage feedback belum terhubung. Hubungi developer aplikasi." },
      { status: 503 },
    );
  }

  const body = await readJsonBody(request);
  const feedback =
    typeof body === "object" && body !== null && typeof (body as Record<string, unknown>).feedback === "string"
      ? (body as { feedback: string }).feedback.trim()
      : "";

  const validationMessage = validateAnonymousFeedback(feedback);
  if (validationMessage) {
    return NextResponse.json({ message: validationMessage }, { status: 400 });
  }

  try {
    await ensureFeedbackSchema();
    const sql = getFeedbackSql();

    await sql`
      INSERT INTO checklist_peserta_anonymous_feedback (feedback_text)
      VALUES (${feedback})
    `;

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Feedback belum berhasil disimpan. Coba kembali dalam beberapa saat." },
      { status: 500 },
    );
  }
}
