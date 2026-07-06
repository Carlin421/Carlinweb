type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

/** Swiss section header: full-width rule, tabular index label, tight display title. */
export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="rule" />
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <p className="index-label text-accent">
          {index} <span className="text-ink-mute">/ {eyebrow}</span>
        </p>
      </div>
      <div className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-12">
        <h2 className="font-display text-4xl font-medium tracking-[-0.02em] text-ink md:col-span-7 md:text-5xl lg:text-6xl">
          {title}
        </h2>
        {description && (
          <p className="max-w-md self-end text-pretty leading-relaxed text-ink-dim md:col-span-5 md:justify-self-end md:text-right">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
