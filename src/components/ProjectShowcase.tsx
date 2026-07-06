"use client";

import { useMemo, useState } from "react";

import { getDict, type Locale, pick } from "@/lib/i18n";
import type { Project } from "@/lib/siteContent";
import { cn } from "@/lib/utils";

import { ButtonLink } from "./ButtonLink";
import { ProjectMedia } from "./ProjectMedia";
import { Tag } from "./Tag";
import { ArrowUpRight, ChevronDown } from "./icons";

type ProjectShowcaseProps = {
  projects: Project[];
  imageMap: Record<string, string>;
  locale: Locale;
};

type BucketId = "ai" | "fullstack" | "automation" | "teaching";

const BUCKETS: { id: BucketId; test: (category: string) => boolean }[] = [
  {
    id: "ai",
    test: (c) => /\b(ai|ml|vision|retrieval|voice|deep learning|llm)\b/i.test(c),
  },
  {
    id: "fullstack",
    test: (c) => /full[- ]stack|web application|platform|product/i.test(c),
  },
  { id: "automation", test: (c) => /automation|bot|chatbot/i.test(c) },
  { id: "teaching", test: (c) => /teaching|education|leadership|course/i.test(c) },
];

// Bucket on the English category so the classification is stable regardless of
// the display language.
function bucketOf(project: Project): string {
  const category = pick(project.category, "en");
  return BUCKETS.find((bucket) => bucket.test(category))?.id ?? "other";
}

/** The detail body shown in the desktop spotlight and the mobile expand. */
function ProjectDetail({
  project,
  imageSrc,
  index,
  locale,
}: {
  project: Project;
  imageSrc?: string;
  index: number;
  locale: Locale;
}) {
  const dict = getDict(locale);
  const links = project.links ?? [];
  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-line bg-surface-2">
        <ProjectMedia project={project} imageSrc={imageSrc} index={index} locale={locale} />
      </div>

      <p className="mt-5 index-label text-accent">{pick(project.category, locale)}</p>
      <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-dim">
        {pick(project.summary, locale)}
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <h4 className="index-label text-ink-mute">{dict.work.problem}</h4>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">{pick(project.problem, locale)}</p>
        </div>
        <div>
          <h4 className="index-label text-ink-mute">{dict.work.approach}</h4>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">{pick(project.built, locale)}</p>
        </div>
      </div>

      {project.highlights.length > 0 && (
        <ul className="mt-5 space-y-2">
          {project.highlights.slice(0, 4).map((highlight, i) => (
            <li
              key={i}
              className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed text-ink-dim"
            >
              <span aria-hidden="true" className="mt-2 h-px w-3 bg-accent" />
              {pick(highlight, locale)}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      {links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-4">
          {links.map((link) => (
            <ButtonLink
              key={link.href}
              href={link.href}
              external
              variant="ghost"
              icon={<ArrowUpRight width={15} height={15} />}
              className="text-sm"
            >
              {pick(link.label, locale)}
            </ButtonLink>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectShowcase({ projects, imageMap, locale }: ProjectShowcaseProps) {
  const dict = getDict(locale);
  const [filter, setFilter] = useState("all");
  const featuredSlug = (projects.find((p) => p.featured) ?? projects[0])?.slug ?? "";
  // Desktop spotlight follows hover/focus; mobile uses tap-to-expand.
  const [activeSlug, setActiveSlug] = useState(featuredSlug);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: projects.length };
    for (const project of projects) {
      const bucket = bucketOf(project);
      result[bucket] = (result[bucket] ?? 0) + 1;
    }
    return result;
  }, [projects]);

  const filters = [
    { id: "all", label: dict.work.filters.all },
    ...BUCKETS.filter((bucket) => counts[bucket.id]).map((bucket) => ({
      id: bucket.id,
      label: dict.work.filters[bucket.id],
    })),
    ...(counts.other ? [{ id: "other", label: dict.work.filters.other }] : []),
  ];

  const visible = projects.filter((p) => filter === "all" || bucketOf(p) === filter);
  const active = visible.find((p) => p.slug === activeSlug) ?? visible[0];
  const activeLabel = filters.find((item) => item.id === filter)?.label ?? dict.work.filters.all;

  return (
    <div>
      <p role="status" aria-live="polite" className="sr-only">
        {dict.work.showing(visible.length, filter === "all" ? null : activeLabel)}
      </p>

      {/* Filter row */}
      <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line pb-4">
        {filters.map((item) => {
          const selected = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(item.id)}
              className={cn(
                "flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-base",
                selected ? "text-accent" : "text-ink-dim hover:text-ink"
              )}
            >
              {item.label}
              <span className={selected ? "text-accent" : "text-ink-mute"}>
                {counts[item.id] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-x-12 lg:grid-cols-12">
        {/* Editorial index */}
        <ol className="border-t border-line lg:col-span-7">
          {visible.map((project) => {
            const index = projects.indexOf(project);
            const isActive = active?.slug === project.slug;
            const isOpen = openSlug === project.slug;
            return (
              <li key={project.slug} className="border-b border-line">
                <button
                  type="button"
                  onMouseEnter={() => setActiveSlug(project.slug)}
                  onFocus={() => setActiveSlug(project.slug)}
                  onClick={() => setOpenSlug(isOpen ? null : project.slug)}
                  aria-expanded={isOpen}
                  aria-controls={`project-detail-${project.slug}`}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-4 py-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:py-6"
                >
                  <span
                    className={cn(
                      "font-mono text-xs transition-colors",
                      isActive ? "text-accent" : "text-ink-mute"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block font-display text-xl font-medium tracking-tight transition-colors md:text-3xl",
                        isActive ? "text-accent" : "text-ink group-hover:text-accent"
                      )}
                    >
                      {pick(project.title, locale)}
                    </span>
                    {project.featured && (
                      <span className="mt-1 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                        {dict.work.featured}
                      </span>
                    )}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="hidden max-w-[11rem] truncate text-right font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute sm:block">
                      {pick(project.category, locale).split("/")[0]?.trim()}
                    </span>
                    <ArrowUpRight
                      width={18}
                      height={18}
                      className={cn(
                        "shrink-0 transition-all duration-200 lg:hidden",
                        isOpen ? "rotate-90 text-accent" : "text-ink-mute"
                      )}
                    />
                    <ArrowUpRight
                      width={18}
                      height={18}
                      className={cn(
                        "hidden shrink-0 transition-all duration-200 lg:block",
                        isActive
                          ? "translate-x-0 text-accent opacity-100"
                          : "-translate-x-1 text-ink-mute opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      )}
                    />
                  </span>
                </button>

                {/* Mobile expand */}
                <div
                  id={`project-detail-${project.slug}`}
                  className={cn("overflow-hidden lg:hidden", isOpen ? "block" : "hidden")}
                >
                  <div className="pb-8 pt-1 motion-safe:animate-fade-up">
                    <ProjectDetail
                      project={project}
                      imageSrc={imageMap[project.slug]}
                      index={index}
                      locale={locale}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Desktop spotlight */}
        <div className="hidden lg:col-span-5 lg:block">
          {active && (
            <div className="sticky top-24">
              <div key={active.slug} className="motion-safe:animate-fade-in">
                <ProjectDetail
                  project={active}
                  imageSrc={imageMap[active.slug]}
                  index={projects.indexOf(active)}
                  locale={locale}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
