type TagProps = {
  children: string;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex rounded-full border border-warm-border bg-warm-surfaceMuted/80 px-3 py-1 text-xs font-medium text-warm-secondary transition group-hover:border-cool-accent/50">
      {children}
    </span>
  );
}
