import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["image/webp", "image/png", "image/jpeg", "image/avif"];
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const SLUG_PATTERN = /^[a-z0-9-]+$/;

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_UPLOAD_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { error: "Uploads are not configured. Set ADMIN_UPLOAD_PASSWORD in your environment." },
      { status: 503 },
    );
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "No Vercel Blob store is connected (BLOB_READ_WRITE_TOKEN is missing)." },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const password = form.get("password");
  if (typeof password !== "string" || password !== adminPassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const slug = form.get("slug");
  const file = form.get("file");

  if (typeof slug !== "string" || !SLUG_PATTERN.test(slug)) {
    return NextResponse.json({ error: "Invalid project slug." }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image file was provided." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: `Unsupported file type "${file.type || "unknown"}". Use WEBP, PNG, JPG, or AVIF.` },
      { status: 415 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image is larger than 8 MB." }, { status: 413 });
  }

  // One deterministic key per project slug; overwriting replaces the old image cleanly.
  const blob = await put(`projects/${slug}`, file, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: file.type,
  });

  return NextResponse.json({ url: blob.url, slug });
}
