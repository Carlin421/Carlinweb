import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  clearLoginFailures,
  createSessionValue,
  isAdminConfigured,
  isLoginRateLimited,
  recordLoginFailure,
  sessionCookie,
  verifyPassword,
} from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // Deliberately generic: never tell unauthenticated callers which env var is missing.
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Admin not configured." }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isLoginRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a few minutes." },
      { status: 429 }
    );
  }

  let password: unknown;
  try {
    const body = (await request.json()) as { password?: unknown };
    password = body?.password;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof password !== "string" || !verifyPassword(password)) {
    recordLoginFailure(ip);
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  clearLoginFailures(ip);
  cookies().set(sessionCookie.name, createSessionValue(), sessionCookie.options);
  return NextResponse.json({ ok: true });
}
