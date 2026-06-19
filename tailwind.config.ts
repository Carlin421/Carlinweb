import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          background: "#F7F3EA",
          surface: "#FFFDF8",
          surfaceMuted: "#EFE8DA",
          text: "#23211E",
          secondary: "#625D53",
          muted: "#8A8174",
          border: "#DDD3C2",
          accent: "#8B5E3C",
          accentDark: "#5F3F2B",
          accentSoft: "#E8D8C6",
        },
        cool: {
          accent: "#176B73",
          accentDark: "#0D454D",
          accentSoft: "#DDEFF0",
        },
        signal: {
          gold: "#C58A2C",
          rust: "#B85C38",
          green: "#4D7C59",
        },
      },
      boxShadow: {
        card: "0 18px 50px rgba(35, 33, 30, 0.09)",
        lift: "0 22px 60px rgba(13, 69, 77, 0.12)",
      },
      keyframes: {
        "status-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(23, 107, 115, 0.36)" },
          "50%": { boxShadow: "0 0 0 7px rgba(23, 107, 115, 0)" },
        },
        "subtle-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "surface-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "status-pulse": "status-pulse 2.6s ease-in-out infinite",
        "subtle-float": "subtle-float 7s ease-in-out infinite",
        "surface-shift": "surface-shift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
