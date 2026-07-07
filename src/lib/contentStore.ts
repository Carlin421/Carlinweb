import { promises as fs } from "fs";
import path from "path";

import { del, list, put } from "@vercel/blob";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

import { defaultContent, type SiteContent } from "./siteContent";

// Content revisions are written as new timestamped blobs (never overwritten in
// place) so the CDN can never serve a stale revision: each save gets a fresh URL
// and reads always pick the newest one. Older revisions beyond KEEP_REVISIONS
// are pruned best-effort.
const BLOB_PREFIX = "site-content/";
const KEEP_REVISIONS = 10;
const LOCAL_FILE = path.join(process.cwd(), ".content", "site.json");

export const CONTENT_TAG = "site-content";

const hasBlobStore = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

type StoredContent = Partial<SiteContent> | null;

async function readFromBlob(): Promise<StoredContent> {
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX });
    if (blobs.length === 0) return null;
    const newest = blobs.reduce((a, b) =>
      new Date(a.uploadedAt).getTime() >= new Date(b.uploadedAt).getTime() ? a : b
    );
    const res = await fetch(newest.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Partial<SiteContent>;
  } catch {
    return null;
  }
}

async function readFromDisk(): Promise<StoredContent> {
  try {
    return JSON.parse(await fs.readFile(LOCAL_FILE, "utf8")) as Partial<SiteContent>;
  } catch {
    return null;
  }
}

// Cached + tagged so pages stay fast; admin saves call revalidateTag for
// instant updates, with `revalidate` as a safety net.
const readFromBlobCached = unstable_cache(readFromBlob, ["site-content-read-v1"], {
  tags: [CONTENT_TAG],
  revalidate: 300,
});

/** Merge stored overrides on top of the committed defaults, defensively. */
function mergeContent(stored: StoredContent): SiteContent {
  if (!stored || typeof stored !== "object") return defaultContent;
  return {
    profile:
      stored.profile && typeof stored.profile === "object"
        ? { ...defaultContent.profile, ...stored.profile }
        : defaultContent.profile,
    projects: Array.isArray(stored.projects) ? stored.projects : defaultContent.projects,
    experience: Array.isArray(stored.experience) ? stored.experience : defaultContent.experience,
    honors: Array.isArray(stored.honors) ? stored.honors : defaultContent.honors,
    skills: Array.isArray(stored.skills) ? stored.skills : defaultContent.skills,
    additionalWork: Array.isArray(stored.additionalWork)
      ? stored.additionalWork
      : defaultContent.additionalWork,
    updatedAt: typeof stored.updatedAt === "string" ? stored.updatedAt : undefined,
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  const stored = hasBlobStore() ? await readFromBlobCached() : await readFromDisk();
  return mergeContent(stored);
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const body = JSON.stringify({ ...content, updatedAt: new Date().toISOString() }, null, 2);

  if (hasBlobStore()) {
    await put(`${BLOB_PREFIX}content-${Date.now()}.json`, body, {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });
    await pruneOldRevisions();
  } else {
    await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
    await fs.writeFile(LOCAL_FILE, body, "utf8");
  }

  revalidateTag(CONTENT_TAG);
  revalidatePath("/");
}

/** Wipe stored overrides so the site falls back to the committed defaults. */
export async function resetSiteContent(): Promise<void> {
  if (hasBlobStore()) {
    try {
      const { blobs } = await list({ prefix: BLOB_PREFIX });
      if (blobs.length > 0) await del(blobs.map((b) => b.url));
    } catch {
      // Best effort — a failed delete just means old content stays until next save.
    }
  } else {
    await fs.rm(LOCAL_FILE, { force: true });
  }

  revalidateTag(CONTENT_TAG);
  revalidatePath("/");
}

async function pruneOldRevisions(): Promise<void> {
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX });
    const stale = blobs
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
      .slice(KEEP_REVISIONS);
    if (stale.length > 0) await del(stale.map((b) => b.url));
  } catch {
    // Pruning is housekeeping only; never fail a save over it.
  }
}
