"use client";

import Link from "next/link";
import { useState } from "react";

import { IconLink } from "@/components/IconLink";
import { GithubIcon, LinkedinIcon, MenuIcon, XIcon } from "@/components/icons";
import { profile, socials } from "@/data/profile";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Activities", href: "#more-work" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-warm-border/80 bg-warm-background/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8" aria-label="Main navigation">
        <Link
          href="#top"
          className="rounded-full text-sm font-semibold tracking-tight text-warm-text transition hover:text-warm-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-accent focus-visible:ring-offset-2 focus-visible:ring-offset-warm-background"
        >
          {profile.name}
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-warm-secondary transition hover:bg-cool-accentSoft hover:text-cool-accentDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cool-accent focus-visible:ring-offset-2 focus-visible:ring-offset-warm-background"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-full bg-warm-text px-4 py-2 text-sm font-semibold text-warm-surface transition hover:-translate-y-0.5 hover:bg-cool-accentDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cool-accent focus-visible:ring-offset-2 focus-visible:ring-offset-warm-background"
          >
            Resume
          </a>
          {socials.github ? (
            <IconLink href={socials.github} label="GitHub" variant="nav">
              <GithubIcon className="h-full w-full" />
            </IconLink>
          ) : null}
          {socials.linkedin ? (
            <IconLink href={socials.linkedin} label="LinkedIn" variant="nav">
              <LinkedinIcon className="h-full w-full" />
            </IconLink>
          ) : null}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-warm-border bg-warm-surface text-warm-text transition hover:bg-cool-accentSoft hover:text-cool-accentDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cool-accent focus-visible:ring-offset-2 focus-visible:ring-offset-warm-background md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={cn(
          "border-t border-warm-border bg-warm-background px-5 py-4 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-warm-secondary transition hover:bg-cool-accentSoft hover:text-cool-accentDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cool-accent"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 rounded-lg bg-warm-text px-3 py-3 text-center text-sm font-semibold text-warm-surface transition hover:bg-cool-accentDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cool-accent"
          >
            Download Resume
          </a>
          <div className="mt-3 flex gap-3">
            {socials.github ? (
              <IconLink href={socials.github} label="GitHub" variant="nav" onClick={() => setOpen(false)}>
                <GithubIcon className="h-full w-full" />
              </IconLink>
            ) : null}
            {socials.linkedin ? (
              <IconLink href={socials.linkedin} label="LinkedIn" variant="nav" onClick={() => setOpen(false)}>
                <LinkedinIcon className="h-full w-full" />
              </IconLink>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
