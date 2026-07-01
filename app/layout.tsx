import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tentative Plans",
  description: "Share your tentative plans for the wedding",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-serif antialiased">
        <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 py-10 sm:py-16">
          {children}
        </div>
      </body>
    </html>
  );
}
