"use client";

import { useState, type ChangeEvent } from "react";

import { Field } from "./fields";
import { SectionCard } from "./SectionCard";
import { useToast } from "./Toast";
import { fileInputClass, labelClass, linkClass } from "./styles";

type ResumeEditorProps = {
  resume: string;
  onChange: (url: string) => void;
  onUnauthorized: () => void;
};

export function ResumeEditor({ resume, onChange, onUnauthorized }: ResumeEditorProps) {
  const toast = useToast();
  const [uploading, setUploading] = useState(false);

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.set("file", file);
      const res = await fetch("/api/admin/resume", { method: "POST", body: form });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      const data = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (!res.ok || !data?.url) {
        toast(data?.error ?? "Upload failed. Try again.", "error");
        return;
      }
      onChange(data.url);
      toast("Résumé uploaded — click Save to keep the new link in your content.");
    } catch {
      toast("Upload failed — check your connection.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Résumé PDF"
        description="The file served by the résumé button on the site."
      >
        <div className="space-y-1.5">
          <span className={labelClass}>Current file</span>
          <p className="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-base px-3 py-2">
            <span className="min-w-0 flex-1 truncate font-mono text-[13px] text-ink">{resume}</span>
            <a href={resume} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Open <span aria-hidden="true">↗</span>
            </a>
          </p>
        </div>

        <Field label="Upload new résumé" htmlFor="resume-file" hint="PDF only, up to 10 MB.">
          <input
            id="resume-file"
            type="file"
            accept="application/pdf,.pdf"
            onChange={upload}
            disabled={uploading}
            className={fileInputClass}
          />
        </Field>
        <p aria-live="polite" role="status" className="min-h-4 text-xs text-ink-dim">
          {uploading ? "Uploading…" : ""}
        </p>

        <p className="rounded-xl border border-line bg-base-2 p-4 text-xs leading-5 text-ink-mute">
          With a Vercel Blob store connected, the upload goes live immediately and the résumé link
          is updated for you — click Save afterwards so your edits here stay in sync. In local dev
          without a Blob token, the file overwrites <span className="font-mono">public/resume.pdf</span>{" "}
          directly.
        </p>
      </SectionCard>
    </div>
  );
}
