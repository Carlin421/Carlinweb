type TagProps = {
  children: string;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-sm border border-line px-2 py-1 font-mono text-[11px] leading-none tracking-wide text-ink-dim transition-colors duration-200 hover:border-accent hover:text-accent">
      {children}
    </span>
  );
}
