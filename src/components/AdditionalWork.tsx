import type { AdditionalWorkItem } from "@/lib/siteContent";

import { SectionHeading } from "./SectionHeading";
import { Tag } from "./Tag";

type AdditionalWorkProps = {
  items: AdditionalWorkItem[];
};

export function AdditionalWork({ items }: AdditionalWorkProps) {
  return (
    <section id="activities" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <SectionHeading
          index="05"
          eyebrow="Activities"
          title="Beyond the code"
          description="Leadership, teaching, and community work — the parts of building that aren't about code."
        />

        <div className="grid gap-px border border-line bg-line md:grid-cols-2">
          {items.map((item, index) => (
            <article key={index} className="flex flex-col gap-3 bg-base p-6 md:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <p className="index-label text-accent">{item.category}</p>
                <span className="font-mono text-[11px] text-ink-mute">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-ink-dim">{item.description}</p>
              <ul className="space-y-2">
                {item.evidence.map((line) => (
                  <li
                    key={line}
                    className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed text-ink-dim"
                  >
                    <span aria-hidden="true" className="mt-2 h-px w-3 bg-accent" />
                    {line}
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
