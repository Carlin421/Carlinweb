import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type IconLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
};

/** Square, bordered icon button with a CSS-only tooltip on hover/focus. */
export function IconLink({ href, label, children, external = true, className }: IconLinkProps) {
  return (
    <span className="group/tool relative inline-flex">
      <a
        href={href}
        aria-label={label}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line-strong text-ink-dim no-underline",
          "transition-colors duration-200 hover:border-accent hover:text-accent",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base",
          className
        )}
      >
        {children}
      </a>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-line bg-surface px-2 py-1 font-mono text-[10px] tracking-wide text-ink-dim opacity-0 transition-opacity duration-200 group-hover/tool:opacity-100 group-focus-within/tool:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}
