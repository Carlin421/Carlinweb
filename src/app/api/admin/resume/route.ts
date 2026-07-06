import { promises as fs } from "fs";
import path from "path";

import { del, list, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { isAdminSession } from "@/lib/adminAuth";
import { getSiteContent, saveSiteContent } from "@/lib/contentStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const BLOB_PREFIX = "resume/";
const LOCAL_FILE = path.join(process.cwd(), "public", "resume.pdf");

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
      // Timestamped key so the CDN can never serve a stale résumé from the old URL.
      const blob = await put(`${BLOB_PREFIX}resume-${Date.now()}.pdf`, file, {
        access: "public",
        addRandomSuffix: false,
        contentType: "application/pdf",
      });

      // Best-effort cleanup of older uploads; never fail the request over it.
      try {
        const { blobs } = await list({ prefix: BLOB_PREFIX });
        const stale = blobs.filter((b) => b.url !== blob.url);
        if (stale.length > 0) await del(stale.map((b) => b.url));
      } catch {
        // Old files linger until the next upload — harmless.
      }

      // Point the live site at the new file immediately.
      const content = await getSiteContent();
      await saveSiteContent({
        ...content,
        profile: { ...content.profile, resume: blob.url },
      });

      revalidatePath("/");
      return NextResponse.json({ url: blob.url });
    }

    // Local dev fallback: overwrite the committed file in place.
    await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
    await fs.writeFile(LOCAL_FILE, Buffer.from(await file.arrayBuffer()));
    revalidatePath("/");
    return NextResponse.json({ url: "/resume.pdf" });
  } catch {
    return NextResponse.json({ error: "Upload failed. Try again." }, { status: 500 });
  }
}
