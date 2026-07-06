import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Elegant serif used for nav, invitation text and prose
        serif: ["var(--font-serif)", "Cormorant Garamond", "ui-serif", "Georgia", "serif"],
        display: ["var(--font-serif)", "Cormorant Garamond", "ui-serif", "Georgia", "serif"],
        // Clean sans for UI / body labels
        body: ["var(--font-body)", "Jost", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "Jost", "ui-sans-serif", "system-ui", "sans-serif"],
        // Formal calligraphy for the couple's names ("Jacquelyn & Tommy")
        script: ["var(--font-script)", "Alex Brush", "cursive"],
        // Bouncy display script for section titles ("Save the Date", "Our Love Story")
        title: ["var(--font-title)", "Yellowtail", "cursive"],
      },
      colors: {
        // Wedding site palette, sampled from the published Canva design
        wedding: {
          ink: "#14160f", // near-black olive (page base / nav)
          hero: "#1c2113", // hero olive-black
          olive: "#2a331d", // "Our Love Story" section
          blue: "#2b3f8f", // "Save the Date" royal blue
          maroon: "#6b1420", // invitation card
          coral: "#cd5a52", // gallery background
          cream: "#ede0c4", // warm cream text
          gold: "#f2e392", // pale yellow script / accents
          sand: "#d8c9a6",
        },
        // Legacy RSVP (Paperless-Post-style) palette — kept for /rsvp
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
