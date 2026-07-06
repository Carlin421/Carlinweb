import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

// Semantic tokens backed by CSS variables (RGB triplets) from globals.css, so
// dark/light is a single `data-theme` swap and every token supports Tailwind
// alpha modifiers like `text-accent/70`.
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", "var(--font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        base: {
          DEFAULT: "rgb(var(--c-bg) / <alpha-value>)",
          2: "rgb(var(--c-bg-2) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "rgb(var(--c-surface) / <alpha-value>)",
          2: "rgb(var(--c-surface-2) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--c-ink) / <alpha-value>)",
          dim: "rgb(var(--c-ink-dim) / <alpha-value>)",
          mute: "rgb(var(--c-ink-mute) / <alpha-value>)",
        },
        line: {
          DEFAULT: "rgb(var(--c-line) / <alpha-value>)",
          strong: "rgb(var(--c-line-strong) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--c-accent) / <alpha-value>)",
          ink: "rgb(var(--c-accent-ink) / <alpha-value>)",
        },
      },
      borderRadius: {
        // Crisp Swiss corners — small, consistent, never pill-soft on structure.
        DEFAULT: "3px",
        sm: "2px",
        md: "4px",
        lg: "6px",
        xl: "8px",
        "2xl": "10px",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pop-in": {
          from: { opacity: "0", transform: "scale(0.98) translateY(4px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "status-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgb(var(--c-accent) / 0.4)" },
          "50%": { boxShadow: "0 0 0 5px rgb(var(--c-accent) / 0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.4s ease-out both",
        "pop-in": "pop-in 0.16s cubic-bezier(0.16, 1, 0.3, 1) both",
        "status-pulse": "status-pulse 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
