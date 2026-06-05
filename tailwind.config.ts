import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0E0E10",
        plum: "#2B1A2E",
        forest: "#1F2E27",
        gold: "#C7A15A",
        "gold-soft": "#D4B96A",
        "gold-dark": "#8B6F3A",
        smoke: "#2A2A2F",
        parchment: "#E8E4D9",
      },
      fontFamily: {
        serif:   ["var(--font-playfair)", "Georgia", "serif"],
        sans:    ["var(--font-jakarta)", "system-ui", "sans-serif"],
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body:    ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.15em",
        wide4: "0.04em",
        wide5: "0.05em",
      },
      lineHeight: {
        relaxed: "1.8",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
