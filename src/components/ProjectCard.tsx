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
  if (imageSrc) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-base-2",
          featured ? "aspect-[16/10] lg:aspect-auto lg:h-full" : "aspect-[16/9]"
        )}
      >
        <Image
          src={imageSrc}
          alt={project.imageAlt ?? `${project.title} project preview`}
          fill
          sizes={featured ? "(min-width: 1024px) 48vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          priority={featured}
          className="object-contain p-3 transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  // No image yet — render an intentional typographic placeholder instead of a gap.
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-surface-2 to-base-2",
        featured ? "aspect-[16/10] lg:aspect-auto lg:h-full" : "aspect-[16/9]"
      )}
    >
      <span className="select-none font-display text-[7rem] font-medium leading-none text-line-strong/60 transition-colors duration-500 group-hover:text-accent/25">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute">
        {project.slug}
      </span>
    </div>
  );
}

export function ProjectCard({ project, imageSrc, index, featured = false }: ProjectCardProps) {
  const links = project.links ?? [];

  return (
    <article
      className={cn(
        "group card-topline overflow-hidden rounded-2xl border border-line bg-surface",
        "transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift",
        featured && "lg:grid lg:grid-cols-2"
      )}
    >
      <CardImage project={project} imageSrc={imageSrc} index={index} featured={featured} />

      <div className={cn("p-6 md:p-7", featured && "lg:flex lg:flex-col lg:p-9")}>
        <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden="true" className="h-px w-5 bg-accent/50" />
          <span className="truncate">{project.category}</span>
        </p>

        <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink md:text-[1.7rem]">
          {project.title}
          {featured && (
            <span className="ml-3 inline-block rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 align-middle font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
              Featured
            </span>
          )}
        </h3>

        <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-dim md:text-[0.95rem]">
          {project.summary}
        </p>

        {featured ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                The problem
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{project.problem}</p>
            </div>
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                What I built
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{project.built}</p>
            </div>
          </div>
        ) : (
          <details className="group/details mt-4">
            <summary className="flex cursor-pointer list-none items-center gap-1.5 font-mono text-xs text-accent transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
              More detail
              <ChevronDown
                width={14}
                height={14}
                className="transition-transform duration-300 group-open/details:rotate-180"
              />
            </summary>
            <div className="mt-4 space-y-4 border-l-2 border-line pl-4">
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                  The problem
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{project.problem}</p>
              </div>
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                  What I built
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{project.built}</p>
              </div>
              {project.highlights.length > 0 && (
                <ul className="space-y-1.5">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2 text-sm leading-relaxed text-ink-dim">
                      <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        )}

        {featured && project.highlights.length > 0 && (
          <ul className="mt-5 space-y-1.5">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2 text-sm leading-relaxed text-ink-dim">
                <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <div className={cn("mt-6 flex flex-wrap items-center gap-1.5", featured && "lg:mt-auto lg:pt-6")}>
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        {links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {links.map((link) => (
              <ButtonLink
                key={link.href}
                href={link.href}
                external
                variant="ghost"
                icon={<ArrowUpRight width={15} height={15} />}
                className="px-0 text-sm"
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
