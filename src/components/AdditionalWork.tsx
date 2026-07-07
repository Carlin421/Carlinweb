import { getDict, type Locale, pick } from "@/lib/i18n";
import type { AdditionalWorkItem } from "@/lib/siteContent";

import { SectionHeading } from "./SectionHeading";
import { Tag } from "./Tag";

type AdditionalWorkProps = {
  items: AdditionalWorkItem[];
  locale: Locale;
};

export function AdditionalWork({ items, locale }: AdditionalWorkProps) {
  const dict = getDict(locale);
  return (
    <section id="activities" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <SectionHeading
          index="06"
          eyebrow={dict.activities.eyebrow}
          title={dict.activities.title}
          description={dict.activities.description}
        />

        <div className="grid gap-px border border-line bg-line md:grid-cols-2">
          {items.map((item, index) => (
            <article key={index} className="flex flex-col gap-3 bg-base p-6 md:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <p className="index-label text-accent">{pick(item.category, locale)}</p>
                <span className="font-mono text-[11px] text-ink-mute">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                {pick(item.title, locale)}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-ink-dim">
                {pick(item.description, locale)}
              </p>
              <ul className="space-y-2">
                {item.evidence.map((line, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed text-ink-dim"
                  >
                    <span aria-hidden="true" className="mt-2 h-px w-3 bg-accent" />
                    {pick(line, locale)}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
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
