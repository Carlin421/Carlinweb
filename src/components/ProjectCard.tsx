import Image from "next/image";

import type { Project } from "@/lib/siteContent";
import { cn } from "@/lib/utils";

import { ButtonLink } from "./ButtonLink";
import { Tag } from "./Tag";
import { ArrowUpRight, ChevronDown } from "./icons";

type ProjectCardProps = {
  project: Project;
  imageSrc?: string;
  index: number;
  featured?: boolean;
};

function CardImage({ project, imageSrc, index, featured }: ProjectCardProps) {
  const ratio = featured ? "aspect-[16/10] lg:aspect-auto lg:h-full" : "aspect-[16/10]";

  if (imageSrc) {
    return (
      <div className={cn("relative overflow-hidden border-b border-line bg-surface-2", ratio, featured && "lg:border-b-0 lg:border-r")}>
        <Image
          src={imageSrc}
          alt={project.imageAlt ?? `${project.title} preview`}
          fill
          sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          priority={featured}
          className="object-contain p-4 transition-transform duration-500 ease-out-expo group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  // No image: an authored "spec panel" — blueprint grid, category kicker,
  // slug, a few tech tags, and the index as a composed element (never a single
  // lonely centered digit stretched over dead space).
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex flex-col justify-between gap-6 overflow-hidden border-b border-line bg-surface-2 p-6 md:p-7",
        ratio,
        featured && "lg:border-b-0 lg:border-r"
      )}
    >
      <span className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgb(var(--c-ink)/0.045)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--c-ink)/0.045)_1px,transparent_1px)] [background-size:26px_26px]" />
      <p className="relative truncate font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
        {project.category}
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
        <span className="select-none font-display text-5xl font-medium leading-none text-line-strong transition-colors duration-500 group-hover:text-accent/40 md:text-6xl">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export function ProjectCard({ project, imageSrc, index, featured = false }: ProjectCardProps) {
  const links = project.links ?? [];

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-sm border border-line bg-base transition-colors duration-300 hover:border-line-strong",
        featured && "lg:grid lg:grid-cols-2"
      )}
    >
      <CardImage project={project} imageSrc={imageSrc} index={index} featured={featured} />

      <div className={cn("p-6 md:p-7", featured && "lg:flex lg:flex-col lg:p-9")}>
        <div className="flex items-baseline justify-between gap-3">
          <p className="index-label text-accent">
            <span className="truncate">{project.category}</span>
          </p>
          <span className="shrink-0 font-mono text-[11px] text-ink-mute">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink md:text-[1.65rem]">
          {project.title}
          {featured && (
            <span className="ml-3 inline-block rounded-sm border border-accent px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              Featured
            </span>
          )}
        </h3>

        <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-dim md:text-[0.95rem]">
          {project.summary}
        </p>

        {featured ? (
          <>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <h4 className="index-label text-ink-mute">The problem</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{project.problem}</p>
              </div>
              <div>
                <h4 className="index-label text-ink-mute">What I built</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{project.built}</p>
              </div>
            </div>
            {project.highlights.length > 0 && (
              <ul className="mt-5 space-y-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed text-ink-dim"
                  >
                    <span aria-hidden="true" className="mt-2 h-px w-3 bg-accent" />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <details className="group/details mt-4">
            <summary className="flex cursor-pointer list-none items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-accent transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
              Detail
              <ChevronDown
                width={14}
                height={14}
                className="transition-transform duration-300 group-open/details:rotate-180"
              />
            </summary>
            <div className="mt-4 space-y-4 border-l border-line pl-4">
              <div>
                <h4 className="index-label text-ink-mute">The problem</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{project.problem}</p>
              </div>
              <div>
                <h4 className="index-label text-ink-mute">What I built</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{project.built}</p>
              </div>
              {project.highlights.length > 0 && (
                <ul className="space-y-2">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed text-ink-dim"
                    >
                      <span aria-hidden="true" className="mt-2 h-px w-3 bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        )}

        <div className={cn("mt-6 flex flex-wrap items-center gap-1.5", featured && "lg:mt-auto lg:pt-6")}>
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
                {link.label}
              </ButtonLink>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
