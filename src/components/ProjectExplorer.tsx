"use client";

import { useMemo, useState } from "react";

import type { Project } from "@/lib/siteContent";
import { cn } from "@/lib/utils";

import { ProjectCard } from "./ProjectCard";

type ProjectExplorerProps = {
  projects: Project[];
  imageMap: Record<string, string>;
};

// Buckets derive from category keywords so admin-added projects sort themselves.
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
  { id: "automation", label: "Automation", test: (c) => /automation|bot|chatbot/i.test(c) },
  {
    id: "teaching",
    label: "Teaching",
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
  const visible = projects.filter((project) =>
    filter === "all" ? project !== featured : bucketOf(project) === filter
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by area"
        className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line pb-4"
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
                "group flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200",
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
            style={{ animationDelay: `${Math.min(order * 55, 330)}ms` }}
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
        <p className="border border-line py-10 text-center font-mono text-sm text-ink-mute">
          Nothing in this bucket yet.
        </p>
      )}
    </div>
  );
}
