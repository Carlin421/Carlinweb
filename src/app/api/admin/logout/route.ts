import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { sessionCookie } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  cookies().set(sessionCookie.name, "", { ...sessionCookie.options, maxAge: 0 });
  return NextResponse.json({ ok: true });
}
