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
  className?: string;
};

const variants = {
  primary: "bg-accent text-accent-ink hover:brightness-110 border border-accent",
  secondary: "border border-line-strong text-ink hover:border-accent hover:text-accent",
  ghost: "border-none px-0 text-ink hover:text-accent",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  external = false,
  ariaLabel,
  icon,
  iconPosition = "right",
  className,
}: ButtonLinkProps) {
  const classes = cn(
    "group inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium no-underline",
    "transition-all duration-200 ease-out-expo",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base",
    variants[variant],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="transition-transform duration-200 group-hover:translate-x-1">{icon}</span>
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {content}
    </Link>
  );
}
