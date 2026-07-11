import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  // Set this to your live RSVP domain so preview/embed cards can resolve the
  // absolute image URL. Update if your subdomain differs.
  metadataBase: new URL("https://savethedate.jacquelynandtommy.com"),
  title: "Tentative Plans · Jacquelyn & Tommy",
  description:
    "Share your tentative plans for Jacquelyn & Tommy's wedding in Sorrento, Italy — June 2027.",
  openGraph: {
    type: "website",
    title: "Tentative Plans · Jacquelyn & Tommy",
    description:
      "Share your tentative plans for our wedding in Sorrento, Italy — June 2027.",
    images: [
      {
        url: "/sorrento-desktop.jpg",
        width: 2560,
        height: 1440,
        alt: "Sorrento, Italy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentative Plans · Jacquelyn & Tommy",
    description:
      "Share your tentative plans for our wedding in Sorrento, Italy — June 2027.",
    images: ["/sorrento-desktop.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-paper font-body font-light text-ink antialiased">
        <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 py-10 sm:py-16">
          {children}
        </div>
      </body>
    </html>
  );
}
