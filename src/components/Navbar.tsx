"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { getDict, type Locale } from "@/lib/i18n";
import type { Socials } from "@/lib/siteContent";
import { cn } from "@/lib/utils";

import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { Github, Linkedin, Menu, X } from "./icons";

type NavbarProps = {
  name: string;
  socials: Socials;
  resume: string;
  locale: Locale;
};

type NavKey = "about" | "work" | "experience" | "skills" | "activities" | "contact";

const NAV_ITEMS: { href: string; id: string; key: NavKey; num: string }[] = [
  { href: "#about", id: "about", key: "about", num: "01" },
  { href: "#work", id: "work", key: "work", num: "02" },
  { href: "#experience", id: "experience", key: "experience", num: "03" },
  { href: "#skills", id: "skills", key: "skills", num: "04" },
  { href: "#activities", id: "activities", key: "activities", num: "05" },
  { href: "#contact", id: "contact", key: "contact", num: "06" },
];

export function Navbar({ name, socials, resume, locale }: NavbarProps) {
  const dict = getDict(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (element): element is HTMLElement => element !== null
    );
    if (sections.length === 0 || !("IntersectionObserver" in window)) return;
    // Track which sections are within the reading band and derive the active one
    // deterministically as the topmost in document order — so it also clears
    // (rather than sticking on a stale id) as sections scroll out.
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(NAV_ITEMS.find((item) => visible.has(item.id))?.id ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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

  return (
    <header ref={menuRef} className="fixed inset-x-0 top-0 z-40">
      <div
        aria-hidden="true"
        className="h-px origin-left bg-accent transition-transform duration-150 ease-linear"
        style={{ transform: `scaleX(${progress})` }}
      />
      <div
        className={cn(
          "border-b backdrop-blur-md transition-colors duration-300",
          scrolled ? "border-line bg-base/85" : "border-transparent bg-base/50"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 md:px-8"
        >
          <Link href="#top" className="no-underline" onClick={() => setOpen(false)}>
            <span className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent">
              {name}
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "group flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] no-underline transition-colors duration-200",
                    active === item.id ? "text-accent" : "text-ink-dim hover:text-ink"
                  )}
                >
                  <span
                    className={cn(
                      "transition-colors",
                      active === item.id ? "text-accent" : "text-ink-mute"
                    )}
                  >
                    {item.num}
                  </span>
                  {dict.nav[item.key]}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <LanguageToggle locale={locale} />
            <ThemeToggle />
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center rounded-sm border border-line-strong px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink no-underline transition-colors duration-200 hover:border-accent hover:text-accent md:inline-flex"
            >
              {dict.resume}
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? dict.closeMenu : dict.openMenu}
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line-strong text-ink-dim transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
            >
              {open ? <X width={18} height={18} /> : <Menu width={18} height={18} />}
            </button>
          </div>
        </nav>

        {open && (
          <div id="mobile-navigation" className="border-t border-line lg:hidden">
            <ul className="mx-auto max-w-6xl px-6 py-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className="border-b border-line last:border-0">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 py-3 font-mono text-xs uppercase tracking-[0.12em] no-underline transition-colors",
                      active === item.id ? "text-accent" : "text-ink-dim hover:text-ink"
                    )}
                  >
                    <span className="text-ink-mute">{item.num}</span>
                    {dict.nav[item.key]}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-4 py-4">
                <a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm border border-line-strong px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink no-underline"
                  onClick={() => setOpen(false)}
                >
                  {dict.resume}
                </a>
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-ink-dim hover:text-accent"
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
                    className="text-ink-dim hover:text-accent"
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
