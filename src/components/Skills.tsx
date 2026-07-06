import type { SkillGroup } from "@/lib/siteContent";

import { SectionHeading } from "./SectionHeading";
import { Tag } from "./Tag";

type SkillsProps = {
  skills: SkillGroup[];
};

export function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <SectionHeading
          index="04"
          eyebrow="Skills"
          title="Toolkit"
          description="Languages, frameworks, and platforms I work with."
        />

        <div className="border-t border-line">
          {skills.map((group, index) => (
            <div
              key={index}
              className="grid gap-x-8 gap-y-3 border-b border-line py-6 md:grid-cols-[auto_1fr] md:py-7"
            >
              <div className="flex items-baseline gap-3 md:w-56">
                <span className="font-mono text-[11px] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-medium tracking-tight text-ink">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
