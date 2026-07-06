type TagProps = {
  children: string;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-surface-2/60 px-2.5 py-1 font-mono text-[11px] leading-none tracking-wide text-ink-dim transition-colors duration-300 hover:border-accent/50 hover:text-ink">
      {children}
    </span>
  );
}
