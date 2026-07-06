// Shared class strings so every admin control looks, hovers, and focuses the same.

export const inputClass =
  "w-full rounded-lg border border-line bg-base px-3 py-2 text-sm text-ink placeholder:text-ink-mute " +
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export const labelClass =
  "block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-dim";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-base disabled:pointer-events-none disabled:opacity-50";

export const primaryButtonClass = `${buttonBase} bg-accent px-4 py-2 text-accent-ink shadow-card hover:brightness-105`;

export const secondaryButtonClass = `${buttonBase} border border-line-strong bg-surface px-4 py-2 text-ink hover:border-accent/60 hover:bg-surface-2`;

export const dangerButtonClass = `${buttonBase} border border-accent/50 px-4 py-2 text-accent hover:bg-accent/10`;

export const addButtonClass = `${buttonBase} border border-dashed border-line-strong px-3 py-1.5 text-ink-dim hover:border-accent/60 hover:text-accent`;

export const iconButtonClass =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-ink-dim " +
  "transition-colors hover:border-line-strong hover:text-ink focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-35";

export const linkClass =
  "rounded font-medium text-accent underline-offset-4 hover:underline " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export const fileInputClass =
  "block w-full cursor-pointer rounded-lg border border-line bg-base text-sm text-ink-dim " +
  "file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-accent/10 file:px-3 file:py-2 " +
  "file:text-sm file:font-medium file:text-accent hover:file:bg-accent/20 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
