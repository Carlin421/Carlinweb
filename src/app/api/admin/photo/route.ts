import { promises as fs } from "fs";
import path from "path";

import { del, list, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
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
      const blob = await put(`${BLOB_PREFIX}photo-${Date.now()}.${ext}`, file, {
        access: "public",
        addRandomSuffix: false,
        contentType: file.type,
      });

      // Best-effort cleanup of older portraits; never fail the request over it.
      try {
        const { blobs } = await list({ prefix: BLOB_PREFIX });
        const stale = blobs.filter((b) => b.url !== blob.url);
        if (stale.length > 0) await del(stale.map((b) => b.url));
      } catch {
        // Old files linger until the next upload — harmless.
      }

      revalidatePath("/");
      return NextResponse.json({ url: blob.url });
    }

    // Local dev fallback: write into public/uploads, clearing older variants.
    await fs.mkdir(LOCAL_DIR, { recursive: true });
    try {
      const entries = await fs.readdir(LOCAL_DIR);
      await Promise.all(
        entries
          .filter((name) => name.startsWith("profile."))
          .map((name) => fs.rm(path.join(LOCAL_DIR, name), { force: true }))
      );
    } catch {
      // Nothing stale to remove.
    }
    await fs.writeFile(path.join(LOCAL_DIR, `profile.${ext}`), Buffer.from(await file.arrayBuffer()));
    revalidatePath("/");
    return NextResponse.json({ url: `/uploads/profile.${ext}` });
  } catch {
    return NextResponse.json({ error: "Upload failed. Try again." }, { status: 500 });
  }
}
