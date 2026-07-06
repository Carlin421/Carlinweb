"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TerminalCardProps = {
  focusAreas: string[];
  availability: string;
};

type Line = {
  text: string;
  tone: "prompt" | "output" | "list" | "status";
};

/**
 * A faux terminal that types out the profile's focus areas. Always dark (it's
 * a terminal), types character-by-character, and renders everything at once
 * for reduced-motion users or before hydration.
 */
export function TerminalCard({ focusAreas, availability }: TerminalCardProps) {
  const lines = useMemo<Line[]>(
    () => [
      { text: "$ whoami", tone: "prompt" },
      { text: "software engineer — ai systems & full-stack", tone: "output" },
      { text: "$ cat focus.txt", tone: "prompt" },
      ...focusAreas.map((area): Line => ({ text: `· ${area.toLowerCase()}`, tone: "list" })),
      { text: "$ status --now", tone: "prompt" },
      { text: `➜ ${availability.toLowerCase()} ✓`, tone: "status" },
    ],
    [availability, focusAreas]
  );

  const totalChars = useMemo(
    () => lines.reduce((sum, line) => sum + line.text.length + 1, 0),
    [lines]
  );

  // Progress counts characters across all lines; starts fully-typed (SSR/no-JS)
  // and replays the typing animation once on mount for motion-friendly users.
  const [progress, setProgress] = useState(totalChars);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setProgress(0);
    let current = 0;
    timer.current = setInterval(() => {
      // Type in small bursts so long lines don't drag.
      current += 2;
      setProgress(current);
      if (current >= totalChars && timer.current) clearInterval(timer.current);
    }, 24);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [totalChars]);

  const toneClass: Record<Line["tone"], string> = {
    prompt: "text-[#52C7B7]",
    output: "text-[#B0A695]",
    list: "text-[#E0B486]",
    status: "text-[#7FD9C0]",
  };

  let remaining = progress;
  const done = progress >= totalChars;

  return (
    <div className="card-topline overflow-hidden rounded-2xl border border-[#3A332A] bg-[#12100C] shadow-lift">
      <div className="flex items-center gap-2 border-b border-[#2A251E] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E0645C]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#D9B168]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#6FBF73]" aria-hidden="true" />
        <span className="ml-2 font-mono text-[11px] text-[#877D6D]">carlin@portfolio — zsh</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#52C7B7]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#52C7B7] motion-safe:animate-status-pulse" />
          live
        </span>
      </div>
      <div className="min-h-[15rem] px-5 py-4 font-mono text-[13px] leading-7" aria-hidden="true">
        {lines.map((line, index) => {
          if (remaining <= 0) return null;
          const visible = line.text.slice(0, remaining);
          const isTyping = remaining < line.text.length;
          remaining -= line.text.length + 1;
          return (
            <p key={index} className={toneClass[line.tone]}>
              {visible}
              {isTyping && (
                <span className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-[#E0B486]" />
              )}
            </p>
          );
        })}
        {done && (
          <p className="text-[#52C7B7]">
            ${" "}
            <span className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-[#E0B486] motion-safe:animate-caret" />
          </p>
        )}
      </div>
      {/* Screen-reader friendly version of the same content. */}
      <div className="sr-only">
        Focus areas: {focusAreas.join(", ")}. Status: {availability}.
      </div>
    </div>
  );
}
