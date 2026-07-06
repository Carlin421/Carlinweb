import type { Project } from "@/lib/siteContent";

import { ProjectShowcase } from "./ProjectShowcase";
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
          description={`${projects.length} projects across AI systems, full-stack, and automation. Hover a title to see it.`}
        />
        <ProjectShowcase projects={projects} imageMap={imageMap} />
      </div>
    </section>
  );
}
