import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-body)", "Jost", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "Jost", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        // Clean, Paperless-Post-style palette: charcoal on warm ivory,
        // hairline rules, gold used only as a thin ornament accent.
        paper: "#faf7f2",
        card: "#ffffff",
        ink: "#211f1c",
        gold: "#a9884f",
        line: "#e7e0d4",
        terracotta: "#a83a26",
      },
    },
  },
  plugins: [],
} satisfies Config;
