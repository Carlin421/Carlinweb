import { promises as fs } from "fs";
import path from "path";

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { isAdminSession } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EXT_BY_TYPE: Record<string, string> = {
  "image/webp": "webp",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/avif": "avif",
};
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const BLOB_PREFIX = "profile/";
const LOCAL_DIR = path.join(process.cwd(), "public", "uploads");

// Returns the uploaded URL; the ProfileEditor puts it into profile.photo and
// the user saves. Kept separate from project images (which are keyed by slug).
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
    return NextResponse.json({ error: "No image file was provided." }, { status: 400 });
  }
  const ext = EXT_BY_TYPE[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: `Unsupported file type "${file.type || "unknown"}". Use WEBP, PNG, JPG, or AVIF.` },
      { status: 415 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image is larger than 8 MB." }, { status: 413 });
  }

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Timestamped key so the CDN can't serve a stale portrait from an old URL.
      // Old uploads are left in place (rare, tiny) so a Discard can't orphan the
      // photo URL that saved content still points at.
      const blob = await put(`${BLOB_PREFIX}photo-${Date.now()}.${ext}`, file, {
        access: "public",
        addRandomSuffix: false,
        contentType: file.type,
      });
      return NextResponse.json({ url: blob.url });
    }

    // Local dev fallback: write a per-extension file. Older-extension variants
    // are left alone so discarding an unsaved change can't delete the file the
    // saved content still references.
    await fs.mkdir(LOCAL_DIR, { recursive: true });
    await fs.writeFile(path.join(LOCAL_DIR, `profile.${ext}`), Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ url: `/uploads/profile.${ext}` });
  } catch {
    return NextResponse.json({ error: "Upload failed. Try again." }, { status: 500 });
  }
}
