"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
};

/**
 * Scroll-reveal wrapper. Content is rendered visible on the server (so no-JS
 * visitors and crawlers see everything); on mount, elements still below the
 * fold are hidden and revealed when they scroll into view. Respects
 * prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen (or above it)? Leave it alone — hiding it now would flash.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setPhase("hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPhase("shown");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={phase !== "static" ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        phase === "hidden" && "translate-y-7 opacity-0",
        phase === "shown" &&
          "translate-y-0 opacity-100 transition-all duration-700 ease-out-expo",
        className
      )}
    >
      {children}
    </div>
  );
}
