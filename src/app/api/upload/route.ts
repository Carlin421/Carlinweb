import { promises as fs } from "fs";
import path from "path";

import { put } from "@vercel/blob";
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
const SLUG_PATTERN = /^[a-z0-9-]+$/;
const LOCAL_DIR = path.join(process.cwd(), "public", "projects");

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

  const slug = form.get("slug");
  const file = form.get("file");

  if (typeof slug !== "string" || !SLUG_PATTERN.test(slug)) {
    return NextResponse.json({ error: "Invalid project slug." }, { status: 400 });
  }
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
    let url: string;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // One deterministic key per project slug; overwriting replaces the old image cleanly.
      const blob = await put(`projects/${slug}`, file, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: file.type,
      });
      url = blob.url;
    } else {
      // Local dev fallback: write into public/projects, removing any older
      // <slug>.<ext> variants first so the newest upload always wins.
      await fs.mkdir(LOCAL_DIR, { recursive: true });
      try {
        const entries = await fs.readdir(LOCAL_DIR);
        await Promise.all(
          entries
            .filter((name) => name.startsWith(`${slug}.`))
            .map((name) => fs.rm(path.join(LOCAL_DIR, name), { force: true }))
        );
      } catch {
        // Nothing stale to remove.
      }
      await fs.writeFile(path.join(LOCAL_DIR, `${slug}.${ext}`), Buffer.from(await file.arrayBuffer()));
      url = `/projects/${slug}.${ext}`;
    }

    revalidatePath("/");
    return NextResponse.json({ url, slug });
  } catch {
    return NextResponse.json({ error: "Upload failed. Try again." }, { status: 500 });
  }
}
