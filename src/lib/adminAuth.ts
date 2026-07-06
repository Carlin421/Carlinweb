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

// In-memory login throttle. Serverless instances don't share state, so this is
// a speed bump rather than a guarantee — the strong password is the real gate.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 10;
const attempts = new Map<string, { count: number; resetAt: number }>();

export function isLoginRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt <= now) return false;
  return entry.count >= MAX_ATTEMPTS;
}

export function recordLoginFailure(ip: string): void {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  entry.count += 1;
  if (attempts.size > 1000) attempts.clear(); // unbounded-growth backstop
}

export function clearLoginFailures(ip: string): void {
  attempts.delete(ip);
}
