import { createHash, createHmac, timingSafeEqual } from "crypto";

import { cookies } from "next/headers";

// Sessions are a signed `<expiry>.<hmac>` value in an httpOnly cookie. The
// signing key is derived from the admin password, so rotating the password
// invalidates every existing session.
const COOKIE_NAME = "carlin_admin_session";
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;
const KEY_CONTEXT = "carlinweb-admin-session-v1";

function adminPassword(): string | null {
  return process.env.ADMIN_PASSWORD ?? process.env.ADMIN_UPLOAD_PASSWORD ?? null;
}

export const isAdminConfigured = () => Boolean(adminPassword());

const sha256 = (value: string) => createHash("sha256").update(value).digest();

/** Constant-time password check (hash both sides to equalize lengths first). */
export function verifyPassword(input: string): boolean {
  const password = adminPassword();
  if (!password) return false;
  return timingSafeEqual(sha256(input), sha256(password));
}

function sign(payload: string): string {
  const key = sha256(`${KEY_CONTEXT}:${adminPassword()}`);
  return createHmac("sha256", key).update(payload).digest("base64url");
}

export function createSessionValue(): string {
  const expiresAt = String(Date.now() + SESSION_TTL_SECONDS * 1000);
  return `${expiresAt}.${sign(expiresAt)}`;
}

export function verifySessionValue(value: string | undefined | null): boolean {
  if (!value || !adminPassword()) return false;
  const dot = value.lastIndexOf(".");
  if (dot <= 0) return false;
  const expiresAt = value.slice(0, dot);
  const signature = Buffer.from(value.slice(dot + 1));
  const expected = Buffer.from(sign(expiresAt));
  if (signature.length !== expected.length || !timingSafeEqual(signature, expected)) return false;
  return Number(expiresAt) > Date.now();
}

export const sessionCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  },
};

/** For server components / route handlers: is the current request an admin? */
export function isAdminSession(): boolean {
  return verifySessionValue(cookies().get(COOKIE_NAME)?.value ?? null);
}

// In-memory login throttle. Serverless instances don't share state and the
// client IP can be spoofed, so this is a best-effort speed bump — the strong,
// constant-time password check is the real gate. The map is bounded by
// MAX_TRACKED with oldest-first eviction so a burst of unique keys can't grow
// it without limit.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 10;
const MAX_TRACKED = 5000;
const attempts = new Map<string, { count: number; resetAt: number }>();

/**
 * Best-effort client IP for throttling. Prefers the platform-set `x-real-ip`
 * (Vercel populates it with the true edge client IP); falls back to the
 * left-most `x-forwarded-for` value, which is client-spoofable and therefore
 * only a courtesy for non-Vercel/local environments.
 */
export function clientIpForThrottle(headers: Headers): string {
  const real = headers.get("x-real-ip")?.trim();
  if (real) return real;
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || "unknown";
}

export function isLoginRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt <= now) return false;
  return entry.count >= MAX_ATTEMPTS;
}

export function recordLoginFailure(ip: string): void {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (entry && entry.resetAt > now) {
    entry.count += 1;
    return;
  }
  // New or expired key: enforce the cap on the insert path too (the old code
  // only checked when incrementing, so unique-key bursts grew unbounded).
  // Map preserves insertion order, so the first key is the oldest.
  while (attempts.size >= MAX_TRACKED) {
    const oldest = attempts.keys().next().value as string | undefined;
    if (oldest === undefined) break;
    attempts.delete(oldest);
  }
  attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
}

export function clearLoginFailures(ip: string): void {
  attempts.delete(ip);
}
