import { promises as fs } from "fs";
import path from "path";

import { list } from "@vercel/blob";
import { unstable_noStore as noStore } from "next/cache";

// Images are addressed by a project's `slug`. Two sources are merged, with Vercel
// Blob uploads winning over committed files so a fresh upload always takes effect:
//   1. public/projects/<slug>.<ext>   (committed, fully static)
//   2. Vercel Blob  projects/<slug>   (uploaded via /admin, no redeploy needed)
const BLOB_PREFIX = "projects/";
const LOCAL_DIR = path.join(process.cwd(), "public", "projects");
const IMAGE_EXT = /\.(?:webp|png|jpe?g|avif|gif)$/i;

const stripExt = (name: string) => name.replace(IMAGE_EXT, "");

/** Returns a map of project `slug` -> resolvable image URL (local path or blob URL). */
export async function getProjectImageMap(): Promise<Record<string, string>> {
  const map: Record<string, string> = {};

  // 1. Committed images in public/projects.
  try {
    const entries = await fs.readdir(LOCAL_DIR);
    for (const name of entries) {
      if (!IMAGE_EXT.test(name)) continue;
      map[stripExt(name)] = `/projects/${name}`;
    }
  } catch {
    // public/projects may not exist yet — that's fine.
  }

  // 2. Vercel Blob uploads (only when a store is connected). Newest upload per slug wins.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    // Reading uploads at request time keeps newly uploaded images fresh without a redeploy.
    noStore();
    try {
      const { blobs } = await list({ prefix: BLOB_PREFIX });
      const newest: Record<string, { url: string; at: number }> = {};
      for (const blob of blobs) {
        const slug = stripExt(blob.pathname.slice(BLOB_PREFIX.length));
        if (!slug) continue;
        const at = blob.uploadedAt ? new Date(blob.uploadedAt).getTime() : 0;
        if (!newest[slug] || at >= newest[slug].at) {
          newest[slug] = { url: blob.url, at };
        }
      }
      for (const [slug, value] of Object.entries(newest)) {
        map[slug] = value.url;
      }
    } catch {
      // Blob unreachable/misconfigured — fall back to committed images only.
    }
  }

  return map;
}
