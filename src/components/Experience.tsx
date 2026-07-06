import { getDict, type Locale, pick } from "@/lib/i18n";
import type { ExperienceItem } from "@/lib/siteContent";

import { SectionHeading } from "./SectionHeading";

type ExperienceProps = {
  experience: ExperienceItem[];
  locale: Locale;
};

export function Experience({ experience, locale }: ExperienceProps) {
  const dict = getDict(locale);
  return (
    <section id="experience" className="scroll-mt-20 bg-base-2/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <SectionHeading
          index="03"
          eyebrow={dict.experience.eyebrow}
          title={dict.experience.title}
          description={dict.experience.description}
        />

        <div className="border-t border-line">
          {experience.map((item, index) => (
            <article
              key={index}
              className="group grid gap-x-8 gap-y-5 border-b border-line py-8 md:grid-cols-12 md:py-10"
            >
              {/* Left rail: index + date */}
              <div className="md:col-span-3">
                <p className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
                    {pick(item.date, locale)}
                  </span>
                </p>
              </div>

              {/* Right: role + detail */}
              <div className="md:col-span-9">
                <h3 className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                  {pick(item.role, locale)}
                </h3>
                <p className="mt-1.5 text-sm text-ink-dim">
                  <span className="font-medium text-accent">{item.company}</span>
                  <span aria-hidden="true" className="mx-2 text-line-strong">
                    /
                  </span>
                  {pick(item.location, locale)}
                </p>
                <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-ink-dim">
                  {pick(item.description, locale)}
                </p>
                <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {item.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed text-ink-dim"
                    >
                      <span aria-hidden="true" className="mt-2 h-px w-3 bg-accent" />
                      {pick(bullet, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
