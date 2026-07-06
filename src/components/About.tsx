import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="Engineering practical AI products from real workflow problems."
          description="I care about software that is understandable, maintainable, and useful enough for real teams to adopt."
        />

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="relative overflow-hidden rounded-lg border border-warm-border bg-warm-surface p-6 shadow-sm md:p-8">
            <span className="absolute inset-x-0 top-0 h-1 bg-cool-accent" aria-hidden="true" />
            <div className="space-y-5 text-base leading-8 text-warm-secondary md:text-lg">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-warm-border bg-warm-surfaceMuted/80 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cool-accent">
              Education
            </p>
            <div className="mt-6 space-y-4">
              {profile.education.map((item) => (
                <div key={item.school} className="rounded-lg border border-warm-border bg-warm-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-cool-accent hover:shadow-card">
                  <h3 className="font-semibold text-warm-text">{item.school}</h3>
                  <p className="mt-2 text-sm font-medium text-warm-secondary">{item.degree}</p>
                  <p className="mt-1 text-sm text-warm-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
