import type { AdditionalWorkItem } from "@/lib/siteContent";

import { SectionHeading } from "./SectionHeading";
import { Tag } from "./Tag";

type AdditionalWorkProps = {
  items: AdditionalWorkItem[];
};

export function AdditionalWork({ items }: AdditionalWorkProps) {
  return (
    <section id="more-work" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-28">
        <SectionHeading
          index="05"
          eyebrow="Activities"
          title="Beyond the codebase"
          description="Leadership, teaching, and community work — the parts of building that aren’t about the code."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.title}
              className="group card-topline flex flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-accent/40 hover:shadow-card md:p-7"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {item.category}
              </p>
              <h3 className="mt-2.5 font-display text-xl font-medium tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-dim">
                {item.description}
              </p>
              <ul className="mt-4 space-y-1.5">
                {item.evidence.map((line) => (
                  <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-ink-dim">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-teal"
                    />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5 pt-1 lg:mt-auto lg:pt-5">
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
