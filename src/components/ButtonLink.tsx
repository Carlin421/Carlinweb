import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  ariaLabel?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

const variants = {
  primary:
    "bg-warm-text text-warm-surface shadow-sm hover:bg-cool-accentDark focus-visible:ring-cool-accent",
  secondary:
    "border border-warm-border bg-warm-surface text-warm-text shadow-sm hover:border-cool-accent hover:bg-cool-accentSoft hover:text-cool-accentDark focus-visible:ring-cool-accent",
  ghost:
    "text-warm-secondary hover:bg-warm-surfaceMuted hover:text-warm-text focus-visible:ring-cool-accent",
};

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  external = false,
  ariaLabel,
  icon,
  iconPosition = "right",
}: ButtonLinkProps) {
  const className = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-background",
    variants[variant],
  );

  const content = (
    <>
      {icon && iconPosition === "left" ? (
        <span className="h-4 w-4 transition duration-200 group-hover:-translate-x-0.5" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? (
        <span className="h-4 w-4 transition duration-200 group-hover:translate-x-0.5" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={href} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
