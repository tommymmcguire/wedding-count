import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Alex_Brush, Luxurious_Script } from "next/font/google";
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

// Formal calligraphy for the couple's names.
const script = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

// Ornate display script for section/page titles ("Save the Date", "F.A.Q.", "Travel").
const title = Luxurious_Script({
  subsets: ["latin"],
  weight: "400",
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
      className={`${serif.variable} ${body.variable} ${script.variable} ${title.variable}`}
    >
      <body className="min-h-screen bg-wedding-ink font-serif text-wedding-cream antialiased">
        {children}
      </body>
    </html>
  );
}
