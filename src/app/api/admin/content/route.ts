import { NextResponse } from "next/server";

import { isAdminSession } from "@/lib/adminAuth";
import { getSiteContent, resetSiteContent, saveSiteContent } from "@/lib/contentStore";
import { validateSiteContent } from "@/lib/validateContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const unauthorized = () => NextResponse.json({ error: "Unauthorized." }, { status: 401 });

export async function GET() {
  if (!isAdminSession()) return unauthorized();
  return NextResponse.json(await getSiteContent());
}

export async function PUT(request: Request) {
  if (!isAdminSession()) return unauthorized();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const result = validateSiteContent(body);
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  await saveSiteContent(result.content);
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  if (!isAdminSession()) return unauthorized();
  await resetSiteContent();
  return NextResponse.json({ ok: true });
}
