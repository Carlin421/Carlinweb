"use client";

import { useMemo, useState } from "react";

import type { Project } from "@/lib/siteContent";
import { cn } from "@/lib/utils";

import { ProjectCard } from "./ProjectCard";

type ProjectExplorerProps = {
  projects: Project[];
  imageMap: Record<string, string>;
};

// Buckets are derived from category keywords so admin-added projects sort
// themselves without code changes; anything unmatched lands in "Other".
const BUCKETS: { id: string; label: string; test: (category: string) => boolean }[] = [
  {
    id: "ai",
    label: "AI & ML",
    test: (c) => /\b(ai|ml|vision|retrieval|voice|deep learning|llm)\b/i.test(c),
  },
  {
    id: "fullstack",
    label: "Full-stack",
    test: (c) => /full[- ]stack|web application|platform|product/i.test(c),
  },
  {
    id: "automation",
    label: "Bots & automation",
    test: (c) => /automation|bot|chatbot/i.test(c),
  },
  {
    id: "teaching",
    label: "Teaching & leadership",
    test: (c) => /teaching|education|leadership|course/i.test(c),
  },
];

function bucketOf(project: Project): string {
  const match = BUCKETS.find((bucket) => bucket.test(project.category));
  return match ? match.id : "other";
}

export function ProjectExplorer({ projects, imageMap }: ProjectExplorerProps) {
  const [filter, setFilter] = useState("all");

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: projects.length };
    for (const project of projects) {
      const bucket = bucketOf(project);
      result[bucket] = (result[bucket] ?? 0) + 1;
    }
    return result;
  }, [projects]);

  const filters = [
    { id: "all", label: "All" },
    ...BUCKETS.filter((bucket) => counts[bucket.id]),
    ...(counts.other ? [{ id: "other", label: "Other" }] : []),
  ];

  const featured = projects.find((project) => project.featured) ?? projects[0];
  const visible = projects.filter(
    (project) => filter === "all" ? project !== featured : bucketOf(project) === filter
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by area"
        className="mb-10 flex flex-wrap gap-2"
      >
        {filters.map((item) => {
          const selected = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(item.id)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-xs transition-all duration-300 ease-out-expo",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base",
                selected
                  ? "border-accent bg-accent text-accent-ink shadow-card"
                  : "border-line-strong bg-surface/70 text-ink-dim hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
              )}
            >
              {item.label}
              <span className={cn("ml-1.5", selected ? "text-accent-ink/70" : "text-ink-mute")}>
                {counts[item.id] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {filter === "all" && featured && (
        <div className="mb-8">
          <ProjectCard
            project={featured}
            imageSrc={imageMap[featured.slug]}
            index={projects.indexOf(featured)}
            featured
          />
        </div>
      )}

      <div key={filter} className="grid gap-8 md:grid-cols-2">
        {visible.map((project, order) => (
          <div
            key={project.slug}
            className="motion-safe:animate-fade-up"
            style={{ animationDelay: `${Math.min(order * 60, 360)}ms` }}
          >
            <ProjectCard
              project={project}
              imageSrc={imageMap[project.slug]}
              index={projects.indexOf(project)}
            />
          </div>
        ))}
      </div>

      {visible.length === 0 && filter !== "all" && (
        <p className="rounded-2xl border border-line bg-surface px-6 py-10 text-center font-mono text-sm text-ink-mute">
          Nothing in this bucket yet.
        </p>
      )}
    </div>
  );
}
