"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { getDict, LOCALE_COOKIE, type Locale } from "@/lib/i18n";

type LanguageToggleProps = {
  locale: Locale;
};

/**
 * Switches the site language. Writes a cookie the server reads on the next
 * render, then refreshes so all server components re-render in the new locale.
 */
export function LanguageToggle({ locale }: LanguageToggleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useState(locale);
  const dict = getDict(optimistic);

  const switchLocale = () => {
    const next: Locale = optimistic === "en" ? "zh" : "en";
    setOptimistic(next);
    // Persist for the server (cookie) and for the no-JS/first-paint path (storage).
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    try {
      localStorage.setItem(LOCALE_COOKIE, next);
    } catch {
      // ignore
    }
    startTransition(() => router.refresh());
  };

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={dict.language.label}
      title={dict.language.switchTo}
      aria-busy={isPending}
      className="inline-flex h-9 min-w-9 items-center justify-center rounded-sm border border-line-strong px-2 font-mono text-[11px] font-medium tracking-wide text-ink-dim transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
    >
      {dict.language.short}
    </button>
  );
}
