import { SectionHeading } from "@/components/SectionHeading";
import { Tag } from "@/components/Tag";
import { additionalWork } from "@/data/additionalWork";

export function AdditionalWork() {
  return (
    <section id="more-work" className="px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Leadership & Activities"
          title="Community work and learning experiences that support my engineering profile."
          description="These items stay compact so the main project section remains focused, while still showing teaching, leadership, and communication range."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {additionalWork.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-lg border border-warm-border bg-warm-surface p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cool-accent hover:shadow-card"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cool-accent">
                {item.category}
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-warm-text">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-warm-secondary">{item.description}</p>

              <ul className="mt-5 space-y-2 text-sm leading-7 text-warm-secondary">
                {item.evidence.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-warm-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {item.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
