import Image from "next/image";

import { type Locale, pick } from "@/lib/i18n";
import type { Project } from "@/lib/siteContent";

type ProjectMediaProps = {
  project: Project;
  imageSrc?: string;
  index: number;
  locale: Locale;
};

/**
 * Fills a positioned (relative) parent. Renders the project screenshot, or an
 * authored "spec panel" (blueprint grid + category + slug + tags + index) when
 * there's no image — never a blank tile.
 */
export function ProjectMedia({ project, imageSrc, index, locale }: ProjectMediaProps) {
  if (imageSrc) {
    return (
      <Image
        src={imageSrc}
        alt={pick(project.imageAlt, locale) || `${pick(project.title, locale)} preview`}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-contain p-4"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex flex-col justify-between gap-6 p-6"
    >
      <span className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgb(var(--c-ink)/0.045)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--c-ink)/0.045)_1px,transparent_1px)] [background-size:26px_26px]" />
      <p className="relative truncate font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
        {pick(project.category, locale)}
      </p>
      <div className="relative flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">
            {project.slug}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-line px-2 py-1 font-mono text-[10px] leading-none text-ink-dim"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="select-none font-display text-5xl font-medium leading-none text-line-strong md:text-6xl">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
