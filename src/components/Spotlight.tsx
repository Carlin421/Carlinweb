"use client";

import { useEffect, useRef } from "react";

/**
 * A soft radial glow that follows the cursor inside its parent element.
 * Pointer-events: none, fine-pointer only, disabled for reduced motion.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    const parent = element?.parentElement;
    if (!element || !parent) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = parent.getBoundingClientRect();
        element.style.opacity = "1";
        element.style.background = `radial-gradient(560px circle at ${event.clientX - rect.left}px ${event.clientY - rect.top}px, rgb(var(--c-accent) / 0.07), transparent 65%)`;
      });
    };
    const onLeave = () => {
      element.style.opacity = "0";
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
    />
  );
}
