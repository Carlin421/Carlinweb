import type { ExperienceItem } from "@/lib/siteContent";

import { SectionHeading } from "./SectionHeading";

type ExperienceProps = {
  experience: ExperienceItem[];
};

export function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-28">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title="Where I’ve worked"
          description="Internships where prototypes had to survive contact with real users, real data, and real deadlines."
        />

        <ol className="relative space-y-10 border-l border-line pl-8 md:space-y-12 md:pl-10">
          {experience.map((item, index) => (
            <li key={`${item.company}-${item.date}`} className="group relative">
              {/* Timeline node */}
              <span
                aria-hidden="true"
                className="absolute -left-8 top-2 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:-left-10"
              >
                <span className="h-3 w-3 rounded-full border-2 border-teal bg-base transition-colors duration-300 group-hover:bg-teal" />
              </span>

              <div className="card-topline rounded-2xl border border-line bg-surface p-6 transition-all duration-300 ease-out-expo group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-card md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm text-ink-dim">
                      <span className="font-medium text-accent">{item.company}</span>
                      <span aria-hidden="true" className="mx-2 text-line-strong">
                        ·
                      </span>
                      {item.location}
                    </p>
                  </div>
                  <p className="rounded-full border border-line bg-surface-2/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
                    {item.date}
                  </p>
                </div>

                <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-dim md:text-[0.95rem]">
                  {item.description}
                </p>

                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-ink-dim">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <span className="sr-only">Position {index + 1} of {experience.length}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
