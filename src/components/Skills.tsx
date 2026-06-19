import { SectionHeading } from "@/components/SectionHeading";
import { Tag } from "@/components/Tag";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="A practical toolkit for building full-stack and AI-assisted systems."
          description="Grouped by the technologies and workflows I have used in projects, internships, and prototypes."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <article key={group.category} className="rounded-lg border border-warm-border bg-warm-surface p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cool-accent hover:shadow-card">
              <span className="mb-4 block h-1 w-10 rounded-full bg-signal-gold" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-warm-text">{group.category}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
