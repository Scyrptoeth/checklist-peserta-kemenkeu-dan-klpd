import { NextResponse } from "next/server";

import {
  ensureFeedbackSchema,
  getFeedbackSql,
  isFeedbackDatabaseConfigured,
} from "@/lib/feedback/database";
import { validateAnonymousFeedback } from "@/lib/feedback/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host") ?? "";

  if (!origin) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
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
