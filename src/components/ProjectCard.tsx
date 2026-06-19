import Image from "next/image";

import { ButtonLink } from "@/components/ButtonLink";
import { Tag } from "@/components/Tag";
import { ExternalLinkIcon } from "@/components/icons";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = Project;

export function ProjectCard({
  title,
  category,
  summary,
  problem,
  built,
  highlights,
  tags,
  links,
  image,
  featured = false,
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-lg border border-warm-border bg-warm-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cool-accent hover:shadow-lift",
      )}
    >
      {image ? (
        <div className="border-b border-warm-border bg-warm-surfaceMuted/45 p-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-warm-border bg-warm-background">
            <Image
              src={image.src}
              alt={image.alt}
              width={900}
              height={1273}
              className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      ) : null}

      <div className={cn("p-6 md:p-8", featured && "md:p-10")}>
        <div className={cn("grid gap-8", featured && "lg:grid-cols-[0.85fr_1.15fr]")}> 
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-warm-accent">
              {category}
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-warm-text md:text-3xl">
              {title}
            </h3>
            <p className="mt-4 text-base leading-8 text-warm-secondary">{summary}</p>

            {links?.length ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {links.map((link) => (
                  <ButtonLink key={link.href} href={link.href} external variant="secondary" icon={<ExternalLinkIcon className="h-full w-full" />}>
                    {link.label}
                  </ButtonLink>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border-l-2 border-cool-accent bg-warm-background/60 py-1 pl-4">
                <h4 className="text-sm font-semibold text-warm-text">Problem</h4>
                <p className="mt-3 text-sm leading-7 text-warm-secondary">{problem}</p>
              </div>
              <div className="border-l-2 border-signal-gold bg-warm-background/60 py-1 pl-4">
                <h4 className="text-sm font-semibold text-warm-text">What I built</h4>
                <p className="mt-3 text-sm leading-7 text-warm-secondary">{built}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-warm-text">Technical highlights</h4>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-warm-secondary">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-warm-accent" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
