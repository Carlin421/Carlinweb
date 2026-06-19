import { SectionHeading } from "@/components/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="bg-cool-accentSoft/45 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Experience"
          title="Internship work across AI support systems and full-stack applications."
          description="Public-safe summaries focused on engineering scope, collaboration, and technologies used."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {experience.map((item) => (
            <article key={`${item.company}-${item.role}`} className="relative overflow-hidden rounded-lg border border-warm-border bg-warm-surface p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cool-accent hover:shadow-lift md:p-8">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cool-accent to-signal-green" aria-hidden="true" />
              <div className="flex flex-col gap-3 border-b border-warm-border pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-warm-text">{item.role}</h3>
                  <p className="mt-2 font-medium text-warm-secondary">{item.company}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm font-semibold text-cool-accent">{item.date}</p>
                  <p className="mt-1 text-sm text-warm-muted">{item.location}</p>
                </div>
              </div>

              <p className="mt-5 text-base leading-8 text-warm-secondary">{item.description}</p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-warm-secondary">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-warm-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
