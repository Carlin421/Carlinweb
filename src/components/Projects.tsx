import type { Project } from "@/lib/siteContent";

import { ProjectExplorer } from "./ProjectExplorer";
import { SectionHeading } from "./SectionHeading";

type ProjectsProps = {
  projects: Project[];
  imageMap: Record<string, string>;
};

export function Projects({ projects, imageMap }: ProjectsProps) {
  return (
    <section id="work" className="scroll-mt-20 bg-base-2/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <SectionHeading
          index="02"
          eyebrow="Work"
          title="Selected work"
          description="AI systems, full-stack products, and automation — built end to end, from problem to working software."
        />
        <ProjectExplorer projects={projects} imageMap={imageMap} />
      </div>
    </section>
  );
}
