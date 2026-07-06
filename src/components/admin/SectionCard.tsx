import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function SectionCard({ title, description, actions, children }: SectionCardProps) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5 shadow-card md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-ink">{title}</h2>
          {description && <p className="mt-1 text-xs leading-5 text-ink-mute">{description}</p>}
        </div>
        {actions}
      </div>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
