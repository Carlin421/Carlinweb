"use client";

import { useState } from "react";

type ProjectOption = {
  slug: string;
  title: string;
};

type UploadFormProps = {
  projects: ProjectOption[];
};

type Status =
  | { state: "idle" }
  | { state: "uploading" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

export function UploadForm({ projects }: UploadFormProps) {
  const [password, setPassword] = useState("");
  const [slug, setSlug] = useState(projects[0]?.slug ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
    setStatus({ state: "idle" });
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(selected ? URL.createObjectURL(selected) : null);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setStatus({ state: "error", message: "Choose an image first." });
      return;
    }

    setStatus({ state: "uploading" });
    const body = new FormData();
    body.append("password", password);
    body.append("slug", slug);
    body.append("file", file);

    try {
      const response = await fetch("/api/upload", { method: "POST", body });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok) {
        setStatus({ state: "error", message: data.error ?? "Upload failed." });
        return;
      }
      setStatus({
        state: "success",
        message: "Uploaded. Refresh the homepage in a minute to see it live.",
      });
    } catch {
      setStatus({ state: "error", message: "Network error — please try again." });
    }
  };

  const fieldClass =
    "w-full rounded-lg border border-warm-border bg-warm-surface px-4 py-3 text-warm-text shadow-sm focus:border-cool-accent focus:outline-none focus:ring-2 focus:ring-cool-accent/40";

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-lg border border-warm-border bg-warm-surface p-6 shadow-sm md:p-8"
    >
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-warm-text">
          Admin password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className={`mt-2 ${fieldClass}`}
        />
      </div>

      <div>
        <label htmlFor="project" className="block text-sm font-semibold text-warm-text">
          Project
        </label>
        <select
          id="project"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          className={`mt-2 ${fieldClass}`}
        >
          {projects.map((project) => (
            <option key={project.slug} value={project.slug}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="file" className="block text-sm font-semibold text-warm-text">
          Image (WEBP, PNG, JPG, or AVIF — max 8 MB)
        </label>
        <input
          id="file"
          type="file"
          accept="image/webp,image/png,image/jpeg,image/avif"
          onChange={onFileChange}
          required
          className="mt-2 block w-full text-sm text-warm-secondary file:mr-4 file:rounded-full file:border-0 file:bg-warm-text file:px-4 file:py-2 file:text-sm file:font-semibold file:text-warm-surface hover:file:bg-cool-accentDark"
        />
      </div>

      {previewUrl ? (
        <div className="overflow-hidden rounded-lg border border-warm-border bg-warm-surfaceMuted/40 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-warm-muted">
            Preview
          </p>
          <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-warm-background">
            {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview, not a remote asset */}
            <img src={previewUrl} alt="Selected upload preview" className="h-full w-full object-contain" />
          </div>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status.state === "uploading"}
        className="inline-flex items-center justify-center rounded-full bg-warm-text px-6 py-3 text-sm font-semibold text-warm-surface shadow-sm transition hover:-translate-y-0.5 hover:bg-cool-accentDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cool-accent focus-visible:ring-offset-2 focus-visible:ring-offset-warm-surface disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status.state === "uploading" ? "Uploading…" : "Upload image"}
      </button>

      {status.state === "success" ? (
        <p className="rounded-lg border border-signal-green/40 bg-signal-green/10 px-4 py-3 text-sm font-medium text-signal-green">
          {status.message}
        </p>
      ) : null}
      {status.state === "error" ? (
        <p className="rounded-lg border border-signal-rust/40 bg-signal-rust/10 px-4 py-3 text-sm font-medium text-signal-rust">
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
