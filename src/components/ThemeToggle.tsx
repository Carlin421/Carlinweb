"use client";

import { useEffect, useState } from "react";

import { Moon, Sun } from "./icons";

type Theme = "dark" | "light";

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Storage unavailable (private mode) — the choice just won't persist.
  }
  window.dispatchEvent(new CustomEvent("themechange"));
}

export function toggleTheme() {
  setTheme(currentTheme() === "dark" ? "light" : "dark");
}

export function ThemeToggle() {
  // Theme is only knowable on the client (set pre-paint by the init script),
  // so render a neutral placeholder until mounted to avoid hydration mismatch.
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    setThemeState(currentTheme());
    const sync = () => setThemeState(currentTheme());
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-surface/70 text-ink-dim transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent/60 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
    >
      <span className="relative inline-flex h-[18px] w-[18px] items-center justify-center">
        <span
          className={`absolute inline-flex transition-all duration-300 ${
            theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
          }`}
        >
          <Sun width={18} height={18} />
        </span>
        <span
          className={`absolute inline-flex transition-all duration-300 ${
            theme === "light" ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        >
          <Moon width={18} height={18} />
        </span>
      </span>
    </button>
  );
}
