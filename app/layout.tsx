import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

// The real ornate roundhand script from the original Canva design — extracted
// from the published site's embedded webfont so titles + names match exactly.
// Powers both --font-script (couple's names) and --font-title (section/page titles).
const canvaScript = localFont({
  src: "./fonts/canva-script.woff",
  variable: "--font-script",
  display: "swap",
});

const canvaTitle = localFont({
  src: "./fonts/canva-script.woff",
  variable: "--font-title",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jacquelyn & Tommy · Sorrento 2027",
  description:
    "Join us as we say I do — Jacquelyn and Tommy's wedding in Sorrento, Italy, June 2027.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${body.variable} ${canvaScript.variable} ${canvaTitle.variable}`}
    >
      <body className="min-h-screen bg-wedding-ink font-serif text-wedding-cream antialiased">
        {children}
      </body>
    </html>
  );
}
