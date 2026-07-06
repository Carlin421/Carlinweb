import type { Metadata } from "next";
import Link from "next/link";

import { UploadForm } from "@/components/UploadForm";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Upload project images",
  description: "Private admin page for uploading portfolio project images.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const projectOptions = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
  }));

  return (
    <main className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-sm font-medium text-warm-secondary transition hover:text-cool-accentDark"
        >
          ← Back to site
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-warm-text md:text-4xl">
          Upload project images
        </h1>
        <p className="mt-4 text-base leading-8 text-warm-secondary">
          Pick a project, choose an image, and upload. The new image replaces the old one for
          that project — no code changes, no redeploy. It appears on the site within about a
          minute (refresh to see it). Uploads are protected by your admin password.
        </p>

        <div className="mt-8">
          <UploadForm projects={projectOptions} />
        </div>
      </div>
    </main>
  );
}
