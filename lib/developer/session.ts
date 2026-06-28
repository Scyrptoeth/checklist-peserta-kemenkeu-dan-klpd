import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "developer_session";
const COOKIE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

function getSecret(): Uint8Array {
  const password = process.env.DEVELOPER_PASSWORD;
  if (!password) {
    throw new Error("DEVELOPER_PASSWORD is required for developer session.");
  }
  return new TextEncoder().encode(password);
}

export interface DeveloperSession {
  role: "developer";
}

export async function signDeveloperSession(): Promise<string> {
  const secret = getSecret();

  return new SignJWT({ role: "developer" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyDeveloperSession(
  token: string,
): Promise<DeveloperSession | null> {
  try {
    const secret = getSecret();
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    if (payload.role !== "developer") {
      return null;
    }

    return { role: "developer" };
  } catch {
    return null;
  }
}

export async function getDeveloperSessionFromCookie(): Promise<DeveloperSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyDeveloperSession(token);
}

export function getCookieConfig(): {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
} {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  };
}

export { COOKIE_NAME };
