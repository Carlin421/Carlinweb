"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { Socials } from "@/lib/siteContent";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "./ThemeToggle";
import { Command, FileText, Github, Linkedin, Menu, X } from "./icons";

type NavbarProps = {
  name: string;
  socials: Socials;
  resume: string;
};

const NAV_ITEMS = [
  { href: "#about", id: "about", label: "About" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#more-work", id: "more-work", label: "Activities" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export function Navbar({ name, socials, resume }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Scroll progress hairline + elevated style once the page moves.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
        setScrolled(window.scrollY > 8);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Scrollspy: highlight the section currently in the reading band.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (element): element is HTMLElement => element !== null
    );
    if (sections.length === 0 || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: close on Escape and on click outside.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const openPalette = () => window.dispatchEvent(new CustomEvent("cmdk:open"));

  return (
    <header ref={menuRef} className="fixed inset-x-0 top-0 z-40">
      <div
        aria-hidden="true"
        className="h-0.5 origin-left bg-gradient-to-r from-accent via-gold to-teal transition-transform duration-150 ease-linear"
        style={{ transform: `scaleX(${progress})` }}
      />
      <div
        className={cn(
          "border-b backdrop-blur-xl transition-colors duration-300",
          scrolled ? "border-line bg-base/75" : "border-transparent bg-base/40"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 md:px-8"
        >
          <Link
            href="#top"
            className="group flex items-center gap-2.5 no-underline"
            onClick={() => setOpen(false)}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal motion-safe:animate-status-pulse" />
            </span>
            <span className="font-display text-lg font-medium tracking-tight text-ink transition-colors group-hover:text-accent">
              {name}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm no-underline transition-colors duration-300",
                    active === item.id ? "text-accent" : "text-ink-dim hover:text-ink"
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-opacity duration-300",
                      active === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={openPalette}
              aria-label="Open command palette"
              title="Command palette (⌘K)"
              className="hidden items-center gap-2 rounded-full border border-line-strong bg-surface/70 px-3 py-2 font-mono text-[11px] text-ink-dim transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent/60 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base sm:inline-flex"
            >
              <Command width={13} height={13} />
              <span>⌘K</span>
            </button>
            <ThemeToggle />
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-ink no-underline shadow-card transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base md:inline-flex"
            >
              <FileText width={15} height={15} />
              Résumé
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-surface/70 text-ink-dim transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
            >
              {open ? <X width={18} height={18} /> : <Menu width={18} height={18} />}
            </button>
          </div>
        </nav>

        {open && (
          <div id="mobile-navigation" className="border-t border-line lg:hidden">
            <ul className="mx-auto max-w-6xl space-y-1 px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm no-underline transition-colors",
                      active === item.id
                        ? "bg-accent/10 text-accent"
                        : "text-ink-dim hover:bg-surface-2 hover:text-ink"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3 px-3 pt-3">
                <a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-ink no-underline"
                  onClick={() => setOpen(false)}
                >
                  <FileText width={15} height={15} />
                  Résumé
                </a>
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-ink-dim hover:text-ink"
                  >
                    <Github width={18} height={18} />
                  </a>
                )}
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-ink-dim hover:text-ink"
                  >
                    <Linkedin width={18} height={18} />
                  </a>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
