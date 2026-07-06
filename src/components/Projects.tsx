import { getDict, type Locale } from "@/lib/i18n";
import type { Project } from "@/lib/siteContent";

import { ProjectShowcase } from "./ProjectShowcase";
import { SectionHeading } from "./SectionHeading";

type ProjectsProps = {
  projects: Project[];
  imageMap: Record<string, string>;
  locale: Locale;
};

export function Projects({ projects, imageMap, locale }: ProjectsProps) {
  const dict = getDict(locale);
  return (
    <section id="work" className="scroll-mt-20 bg-base-2/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <SectionHeading
          index="02"
          eyebrow={dict.work.eyebrow}
          title={dict.work.title}
          description={dict.work.description.replace("{n}", String(projects.length))}
        />
        <ProjectShowcase projects={projects} imageMap={imageMap} locale={locale} />
      </div>
    </section>
  );
}
