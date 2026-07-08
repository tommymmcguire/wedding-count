import type { Metadata } from "next";
import SiteHeader from "@/components/journey-site/SiteHeader";
import SiteFooter from "@/components/journey-site/SiteFooter";
import { SITE } from "@/lib/journey/site";

export const metadata: Metadata = {
  title: {
    default: `${SITE.names.one} & ${SITE.names.two} · Our Journey`,
    template: `%s · ${SITE.names.one} & ${SITE.names.two}`,
  },
  description: `Join ${SITE.names.one} and ${SITE.names.two} in ${SITE.place} — ${SITE.date.display}. Our love story, told as a journey around the globe.`,
  openGraph: {
    title: `${SITE.names.one} & ${SITE.names.two} · ${SITE.place}`,
    description: `Our journey around the globe — ${SITE.date.display} in ${SITE.place}.`,
    type: "website",
  },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="journey-theme font-body min-h-screen">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
