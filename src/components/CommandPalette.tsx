"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Socials } from "@/lib/siteContent";

import { toggleTheme } from "./ThemeToggle";
import { ArrowUpRight, Check, Command, Copy, FileText, Github, Linkedin, Mail, Moon } from "./icons";

type CommandPaletteProps = {
  socials: Socials;
  resume: string;
};

type Action = {
  id: string;
  group: "Navigate" | "Actions" | "Links";
  label: string;
  keywords: string;
  icon?: JSX.Element;
  hint?: string;
  run: () => void | Promise<void>;
};

const SECTIONS: { id: string; label: string }[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "more-work", label: "Activities" },
  { id: "contact", label: "Contact" },
];

export function CommandPalette({ socials, resume }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  const copyEmail = useCallback(async () => {
    if (!socials.email) return;
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${socials.email}`;
    }
  }, [socials.email]);

  const actions = useMemo<Action[]>(() => {
    const list: Action[] = SECTIONS.map((section) => ({
      id: `go-${section.id}`,
      group: "Navigate" as const,
      label: `Go to ${section.label}`,
      keywords: `${section.label} section jump scroll`,
      run: () => {
        close();
        document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
      },
    }));

    list.push({
      id: "toggle-theme",
      group: "Actions",
      label: "Toggle light / dark theme",
      keywords: "theme dark light mode appearance color",
      icon: <Moon width={16} height={16} />,
      hint: "T",
      run: () => toggleTheme(),
    });

    if (socials.email) {
      list.push({
        id: "copy-email",
        group: "Actions",
        label: copied ? "Copied!" : "Copy email address",
        keywords: "email copy contact mail",
        icon: copied ? <Check width={16} height={16} /> : <Copy width={16} height={16} />,
        run: copyEmail,
      });
      list.push({
        id: "email",
        group: "Links",
        label: "Send an email",
        keywords: "email mail contact message",
        icon: <Mail width={16} height={16} />,
        run: () => {
          close();
          window.location.href = `mailto:${socials.email}`;
        },
      });
    }

    list.push({
      id: "resume",
      group: "Links",
      label: "Open résumé",
      keywords: "resume cv pdf download",
      icon: <FileText width={16} height={16} />,
      run: () => {
        close();
        window.open(resume, "_blank", "noopener,noreferrer");
      },
    });

    if (socials.github) {
      list.push({
        id: "github",
        group: "Links",
        label: "Open GitHub",
        keywords: "github code repositories source",
        icon: <Github width={16} height={16} />,
        run: () => {
          close();
          window.open(socials.github!, "_blank", "noopener,noreferrer");
        },
      });
    }

    if (socials.linkedin) {
      list.push({
        id: "linkedin",
        group: "Links",
        label: "Open LinkedIn",
        keywords: "linkedin profile network connect",
        icon: <Linkedin width={16} height={16} />,
        run: () => {
          close();
          window.open(socials.linkedin!, "_blank", "noopener,noreferrer");
        },
      });
    }

    return list;
  }, [close, copied, copyEmail, resume, socials.email, socials.github, socials.linkedin]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (action) =>
        action.label.toLowerCase().includes(q) || action.keywords.toLowerCase().includes(q)
    );
  }, [actions, query]);

  // Global shortcuts + the navbar's "open palette" event.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("cmdk:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("cmdk:open", onOpen);
    };
  }, []);

  // Open/close side effects: focus, scroll lock, focus restore.
  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActiveIndex(0);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
      previousFocus.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open) return null;

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      filtered[activeIndex]?.run();
    }
  };

  let lastGroup: string | null = null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[16vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        aria-label="Close command palette"
        onClick={close}
        className="absolute inset-0 cursor-default bg-base/70 backdrop-blur-sm"
        tabIndex={-1}
      />
      <div className="relative w-full max-w-lg animate-pop-in overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-lift">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Command width={16} height={16} className="shrink-0 text-ink-mute" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type a command or search…"
            aria-label="Search commands"
            className="w-full bg-transparent py-3.5 text-sm text-ink placeholder:text-ink-mute focus:outline-none"
          />
          <kbd className="shrink-0 rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-ink-mute">
            esc
          </kbd>
        </div>
        <ul ref={listRef} className="max-h-[46vh] overflow-y-auto p-2" role="listbox">
          {filtered.length === 0 && (
            <li className="px-3 py-8 text-center font-mono text-xs text-ink-mute">
              No results for “{query}”
            </li>
          )}
          {filtered.map((action, index) => {
            const showGroup = action.group !== lastGroup;
            lastGroup = action.group;
            return (
              <li key={action.id}>
                {showGroup && (
                  <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                    {action.group}
                  </p>
                )}
                <button
                  type="button"
                  data-index={index}
                  role="option"
                  aria-selected={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => action.run()}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    index === activeIndex
                      ? "bg-accent/15 text-ink"
                      : "text-ink-dim hover:bg-surface-2"
                  }`}
                >
                  <span className="text-ink-mute">
                    {action.icon ?? <ArrowUpRight width={16} height={16} />}
                  </span>
                  {action.label}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-ink-mute">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span className="ml-auto">⌘K to toggle</span>
        </div>
      </div>
    </div>
  );
}
