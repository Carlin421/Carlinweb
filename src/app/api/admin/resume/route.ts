import { promises as fs } from "fs";
import path from "path";

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { isAdminSession } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const BLOB_PREFIX = "resume/";
const LOCAL_FILE = path.join(process.cwd(), "public", "resume.pdf");

// Uploads the PDF and returns { url }. It deliberately does NOT write to the
// content store: the client sets profile.resume from the returned url and the
// normal Save button persists it, so an upload can never overwrite the admin's
// other unsaved edits, and a Discard can never orphan a referenced URL.
export async function POST(request: Request) {
  if (!isAdminSession()) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No PDF file was provided." }, { status: 400 });
  }
  if (file.type !== "application/pdf" || !file.name.toLowerCase().endsWith(".pdf")) {
    return NextResponse.json({ error: "The résumé must be a PDF file." }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "The PDF is larger than 10 MB." }, { status: 413 });
  }

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Timestamped key so the CDN can't serve a stale résumé from an old URL.
      // Old uploads are left in place (rare, tiny) so a Discard can't orphan the
      // resume link that saved content still points at.
      const blob = await put(`${BLOB_PREFIX}resume-${Date.now()}.pdf`, file, {
        access: "public",
        addRandomSuffix: false,
        contentType: "application/pdf",
      });
      return NextResponse.json({ url: blob.url });
    }

    // Local dev fallback: overwrite the committed file in place (stable path).
    await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
    await fs.writeFile(LOCAL_FILE, Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ url: "/resume.pdf" });
  } catch {
    return NextResponse.json({ error: "Upload failed. Try again." }, { status: 500 });
  }
}
