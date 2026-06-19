import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  const [featuredProject, ...restProjects] = projects;

  return (
    <section id="projects" className="px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Projects that show system thinking, product sense, and implementation range."
          description="The strongest projects are written to be public-safe while still showing technical depth and the type of problems I like working on."
        />

        <div className="space-y-6">
          <ProjectCard {...featuredProject} />
          <div className="grid gap-6 lg:grid-cols-2">
            {restProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
