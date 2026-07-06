"use client";

import { useState, type ChangeEvent } from "react";

import { pick, setLocalized, type Locale } from "@/lib/i18n";
import type { Project } from "@/lib/siteContent";
import { cn } from "@/lib/utils";

import { moveItem, removeItem, updateItem } from "./arrayUtils";
import { ConfirmDialog } from "./ConfirmDialog";
import { CommaListField, Field, InputField, TextInput } from "./fields";
import { LocalizedInput, LocalizedListEditor, LocalizedTextArea } from "./LocalizedField";
import { MoveButtons } from "./MoveButtons";
import { SectionCard } from "./SectionCard";
import { useToast } from "./Toast";
import { addButtonClass, fileInputClass, iconButtonClass, secondaryButtonClass } from "./styles";

const SLUG_PATTERN = /^[a-z0-9-]+$/;

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const emptyProject = (): Project => ({
  slug: "",
  title: "",
  category: "",
  summary: "",
  problem: "",
  built: "",
  highlights: [],
  tags: [],
  links: [],
  imageAlt: "",
});

type ProjectsEditorProps = {
  projects: Project[];
  onChange: (projects: Project[]) => void;
  imageMap: Record<string, string>;
  onUnauthorized: () => void;
  locale: Locale;
};

export function ProjectsEditor({
  projects,
  onChange,
  imageMap,
  onUnauthorized,
  locale,
}: ProjectsEditorProps) {
  const toast = useToast();
  const [editing, setEditing] = useState<number | null>(null);
  // Auto-derive the slug from the title for brand-new projects until it's edited by hand.
  const [autoSlug, setAutoSlug] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  // Fresh uploads override the server-provided image map so previews update instantly.
  const [uploaded, setUploaded] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);

  const images = { ...imageMap, ...uploaded };

  const addProject = () => {
    onChange([...projects, emptyProject()]);
    setEditing(projects.length);
    setAutoSlug(true);
  };

  const openEditor = (index: number) => {
    setEditing(index);
    setAutoSlug(false);
  };

  // ---- Edit panel -----------------------------------------------------------

  if (editing !== null && projects[editing]) {
    const index = editing;
    const project = projects[index];
    const patch = (p: Partial<Project>) => onChange(updateItem(projects, index, p));

    const slugError =
      project.slug.length === 0
        ? "Slug is required."
        : !SLUG_PATTERN.test(project.slug)
          ? "Lowercase letters, numbers, and hyphens only."
          : projects.some((p, i) => i !== index && p.slug === project.slug)
            ? "Another project already uses this slug."
            : undefined;

    const setFeatured = (on: boolean) =>
      onChange(
        projects.map((p, i) => {
          if (i === index) return { ...p, featured: on };
          if (on && p.featured) return { ...p, featured: false };
          return p;
        })
      );

    const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file) return;
      if (slugError) {
        toast("Fix the slug before uploading an image.", "error");
        return;
      }
      setUploading(true);
      try {
        const form = new FormData();
        form.set("slug", project.slug);
        form.set("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: form });
        if (res.status === 401) {
          onUnauthorized();
          return;
        }
        const data = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;
        if (!res.ok || !data?.url) {
          toast(data?.error ?? "Upload failed. Try again.", "error");
          return;
        }
        setUploaded((current) => ({ ...current, [project.slug]: data.url as string }));
        toast("Image uploaded — may take a few seconds to appear on the site.");
      } catch {
        toast("Upload failed — check your connection.", "error");
      } finally {
        setUploading(false);
      }
    };

    const links = project.links ?? [];

    return (
      <div className="space-y-6">
        <button type="button" onClick={() => setEditing(null)} className={secondaryButtonClass}>
          <span aria-hidden="true">←</span> All projects
        </button>

        <SectionCard title="Basics">
          <LocalizedInput
            label="Title"
            value={project.title}
            locale={locale}
            onChange={(title) => {
              // Slug is a plain ID; auto-derive it from the English title so it
              // stays stable no matter which language is being edited.
              if (autoSlug) {
                onChange(updateItem(projects, index, { title, slug: slugify(pick(title, "en")) }));
              } else {
                patch({ title });
              }
            }}
          />
          <InputField
            label="Slug"
            mono
            value={project.slug}
            onChange={(slug) => {
              setAutoSlug(false);
              patch({ slug });
            }}
            error={slugError}
            hint="Stable ID used for the project image. Lowercase letters, numbers, hyphens."
          />
          <LocalizedInput
            label="Category"
            value={project.category}
            locale={locale}
            onChange={(category) => patch({ category })}
            placeholder="AI Systems / Retrieval / Internal Tools"
          />
          <div className="rounded-xl border border-line bg-base-2 p-4">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={Boolean(project.featured)}
                onChange={(event) => setFeatured(event.target.checked)}
                className="h-4 w-4 shrink-0 accent-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              />
              <span className="text-sm font-medium text-ink">Featured project</span>
            </label>
            <p className="mt-1.5 pl-7 text-xs text-ink-mute">
              Only one project can be featured — turning this on turns it off everywhere else.
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Story">
          <LocalizedTextArea
            label="Summary"
            value={project.summary}
            onChange={(summary) => patch({ summary })}
            locale={locale}
            rows={3}
          />
          <LocalizedTextArea
            label="Problem"
            value={project.problem}
            onChange={(problem) => patch({ problem })}
            locale={locale}
            rows={3}
          />
          <LocalizedTextArea
            label="What I built"
            value={project.built}
            onChange={(built) => patch({ built })}
            locale={locale}
            rows={3}
          />
        </SectionCard>

        <SectionCard title="Details">
          <LocalizedListEditor
            label="Highlights"
            items={project.highlights}
            onChange={(highlights) => patch({ highlights })}
            locale={locale}
            addLabel="Add highlight"
            multiline
            rows={2}
          />
          <CommaListField
            label="Tags"
            value={project.tags}
            onChange={(tags) => patch({ tags })}
            placeholder="RAG, LLM, Python"
          />
          <fieldset className="space-y-2">
            <legend className="block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-dim">
              Links
            </legend>
            {links.length === 0 && <p className="text-xs italic text-ink-mute">No links yet.</p>}
            {links.map((link, i) => (
              <div key={i} className="flex flex-col gap-2 sm:flex-row">
                <TextInput
                  aria-label={`Link ${i + 1} label (${locale === "zh" ? "Chinese" : "English"})`}
                  placeholder={locale === "zh" ? "標籤" : "Label"}
                  value={pick(link.label, locale)}
                  onChange={(event) =>
                    patch({
                      links: updateItem(links, i, {
                        label: setLocalized(link.label, locale, event.target.value),
                      }),
                    })
                  }
                />
                <TextInput
                  aria-label={`Link ${i + 1} URL`}
                  placeholder="https://…"
                  mono
                  value={link.href}
                  onChange={(event) =>
                    patch({ links: updateItem(links, i, { href: event.target.value }) })
                  }
                />
                <button
                  type="button"
                  aria-label={`Remove link ${i + 1}`}
                  onClick={() => patch({ links: removeItem(links, i) })}
                  className={iconButtonClass}
                >
                  <span aria-hidden="true">✕</span>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => patch({ links: [...links, { label: "", href: "" }] })}
              className={addButtonClass}
            >
              + Add link
            </button>
          </fieldset>
        </SectionCard>

        <SectionCard
          title="Image"
          description="Shown on the project card. Uploads replace the previous image for this slug."
        >
          {images[project.slug] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={images[project.slug]}
              alt={pick(project.imageAlt, locale) || `Current image for ${pick(project.title, locale) || project.slug}`}
              className="h-40 w-full max-w-sm rounded-xl border border-line object-cover"
            />
          ) : (
            <p className="text-sm italic text-ink-mute">No image yet for this project.</p>
          )}
          <Field
            label="Upload image"
            htmlFor={`project-image-${index}`}
            hint="WEBP, PNG, JPG, or AVIF — up to 8 MB."
          >
            <input
              id={`project-image-${index}`}
              type="file"
              accept="image/webp,image/png,image/jpeg,image/avif"
              onChange={uploadImage}
              disabled={uploading}
              className={fileInputClass}
            />
          </Field>
          <p aria-live="polite" role="status" className="min-h-4 text-xs text-ink-dim">
            {uploading ? "Uploading…" : ""}
          </p>
          <LocalizedInput
            label="Image alt text"
            value={project.imageAlt}
            onChange={(imageAlt) => patch({ imageAlt })}
            locale={locale}
            hint="Describes the image for screen readers and when it fails to load."
          />
        </SectionCard>
      </div>
    );
  }

  // ---- List view ------------------------------------------------------------

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-ink-dim">
          {projects.length} {projects.length === 1 ? "project" : "projects"} — drag-free ordering
          with the arrows.
        </p>
        <button type="button" onClick={addProject} className={addButtonClass}>
          + Add project
        </button>
      </div>

      <ul className="space-y-3">
        {projects.map((project, i) => {
          const titleText = pick(project.title, locale);
          const categoryText = pick(project.category, locale);
          return (
          <li
            key={i}
            className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4 shadow-card"
          >
            {images[project.slug] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={images[project.slug]}
                alt=""
                className="h-12 w-16 shrink-0 rounded-lg border border-line object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg border border-dashed border-line text-[10px] font-medium uppercase tracking-wider text-ink-mute"
              >
                No img
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 truncate text-sm font-medium text-ink">
                {project.featured && (
                  <span className="text-gold" role="img" aria-label="Featured">
                    ★
                  </span>
                )}
                <span className="truncate">{titleText || "Untitled project"}</span>
              </p>
              <p className="truncate font-mono text-[11px] text-ink-mute">
                {project.slug || "no-slug-yet"}
              </p>
              {categoryText && (
                <p className="truncate text-xs text-ink-dim">{categoryText}</p>
              )}
            </div>
            <MoveButtons
              index={i}
              count={projects.length}
              onMove={(index, dir) => onChange(moveItem(projects, index, dir))}
              label={titleText || `project ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => openEditor(i)}
              className={cn(secondaryButtonClass, "px-3 py-1.5")}
            >
              Edit
            </button>
            <button
              type="button"
              aria-label={`Delete ${titleText || `project ${i + 1}`}`}
              onClick={() => setConfirmDelete(i)}
              className={iconButtonClass}
            >
              <span aria-hidden="true">✕</span>
            </button>
          </li>
          );
        })}
      </ul>

      <ConfirmDialog
        open={confirmDelete !== null}
        title="Delete this project?"
        description={
          confirmDelete !== null
            ? `"${pick(projects[confirmDelete]?.title, locale) || "Untitled project"}" will be removed. This takes effect when you save.`
            : ""
        }
        confirmLabel="Delete project"
        destructive
        onConfirm={() => {
          if (confirmDelete !== null) onChange(removeItem(projects, confirmDelete));
          setConfirmDelete(null);
        }}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
