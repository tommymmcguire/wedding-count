import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { PageBanner } from "@/components/site/PageBanner";
import { registry, wedding } from "@/lib/content";

export const metadata: Metadata = { title: "Registry · Jacquelyn & Tommy" };

export default function RegistryPage() {
  return (
    <SiteChrome>
      <div className="flex min-h-[calc(100vh-3rem)] flex-col items-center justify-center bg-wedding-olive px-6 pb-24">
        <PageBanner title={registry.title} />
        <p className="mx-auto max-w-xl text-center font-serif text-xl leading-relaxed text-wedding-cream/90">
          {registry.body}
        </p>
        <a
          href={wedding.links.registry}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-wedding-gold px-8 py-3 font-serif text-lg text-wedding-ink transition-transform hover:scale-105"
        >
          {registry.cta}
        </a>
      </div>
    </SiteChrome>
  );
}
