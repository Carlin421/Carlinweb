import type { SkillGroup } from "@/lib/siteContent";

import { SectionHeading } from "./SectionHeading";
import { Tag } from "./Tag";

type SkillsProps = {
  skills: SkillGroup[];
};

export function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="scroll-mt-24 bg-base-2/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-28">
        <SectionHeading
          index="04"
          eyebrow="Skills"
          title="Tools I reach for"
          description="The languages, frameworks, and platforms behind the projects above."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, index) => (
            <div
              key={group.category}
              className="group card-topline rounded-2xl border border-line bg-surface p-6 transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
            >
              <h3 className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="font-mono text-[11px] tracking-[0.2em] text-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg font-medium tracking-tight text-ink">
                  {group.category}
                </span>
              </h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
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
