type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16">
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
        <span aria-hidden="true">{index}</span>
        <span aria-hidden="true" className="h-px w-10 bg-accent/50" />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ink-dim md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
