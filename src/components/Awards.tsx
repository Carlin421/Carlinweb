import { getDict, type Locale, pick } from "@/lib/i18n";
import type { Honor } from "@/lib/siteContent";

import { SectionHeading } from "./SectionHeading";

type AwardsProps = {
  honors: Honor[];
  locale: Locale;
};

export function Awards({ honors, locale }: AwardsProps) {
  const dict = getDict(locale);
  if (honors.length === 0) return null;

  return (
    <section id="awards" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <SectionHeading
          index="04"
          eyebrow={dict.awards.eyebrow}
          title={dict.awards.title}
          description={dict.awards.description}
        />

        <ol className="border-t border-line">
          {honors.map((honor, index) => (
            <li
              key={index}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1 border-b border-line py-6 sm:grid-cols-[5rem_1fr_auto] sm:gap-x-8 md:py-7"
            >
              <span className="font-mono text-sm text-accent sm:text-base">{honor.year}</span>
              <h3 className="font-display text-lg font-medium tracking-tight text-ink transition-colors group-hover:text-accent md:text-2xl">
                {pick(honor.title, locale)}
              </h3>
              <span className="col-start-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute sm:col-start-3 sm:text-right sm:text-xs">
                {pick(honor.detail, locale)}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
