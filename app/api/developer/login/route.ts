import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";

import {
  getCookieConfig,
  signDeveloperSession,
} from "@/lib/developer/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  return timingSafeEqual(bufferA, bufferB);
}

async function readJsonBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const expectedPassword = process.env.DEVELOPER_PASSWORD;

  if (!expectedPassword) {
    return NextResponse.json(
      { message: "Autentikasi Developer belum dikonfigurasi." },
      { status: 503 },
    );
  }

  const body = await readJsonBody(request);
  const password =
    typeof body === "object" && body !== null && typeof (body as Record<string, unknown>).password === "string"
      ? (body as { password: string }).password
      : "";

  if (!constantTimeEqual(password, expectedPassword)) {
    return NextResponse.json(
      { message: "Password Developer salah." },
      { status: 401 },
    );
  }

  const token = await signDeveloperSession();
  const cookieStore = await cookies();
  const config = getCookieConfig();
  cookieStore.set(config.name, token, config);

  return NextResponse.json({ ok: true });
}
