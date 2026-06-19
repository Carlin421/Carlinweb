import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

import { cn } from "@/lib/utils";

type IconLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
  external?: boolean;
  variant?: "light" | "dark" | "nav";
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const variants = {
  light:
    "border-warm-border bg-warm-surface text-warm-text hover:border-cool-accent hover:bg-cool-accentSoft hover:text-cool-accentDark focus-visible:ring-cool-accent",
  dark:
    "border-white/15 bg-white/10 text-warm-surface hover:border-cool-accentSoft hover:bg-cool-accentSoft hover:text-cool-accentDark focus-visible:ring-cool-accentSoft",
  nav:
    "border-warm-border/80 bg-warm-surface/80 text-warm-secondary hover:border-cool-accent hover:bg-cool-accentSoft hover:text-cool-accentDark focus-visible:ring-cool-accent",
};

export function IconLink({
  href,
  label,
  children,
  external = true,
  variant = "light",
  onClick,
}: IconLinkProps) {
  const className = cn(
    "group/tool relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-background",
    variants[variant],
  );

  const content = (
    <>
      <span className="sr-only">{label}</span>
      <span className="h-5 w-5" aria-hidden="true">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[calc(100%+0.5rem)] z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-warm-text px-2.5 py-1 text-xs font-semibold text-warm-surface opacity-0 shadow-card transition duration-150 group-hover/tool:opacity-100 group-focus-visible/tool:opacity-100"
      >
        {label}
      </span>
    </>
  );

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={href} aria-label={label} title={label} onClick={onClick}>
      {content}
    </Link>
  );
}
