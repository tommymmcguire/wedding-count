import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { HeroBanner } from "@/components/site/HeroBanner";
import { registry, wedding } from "@/lib/content";

export const metadata: Metadata = { title: "Registry · Jacquelyn & Tommy" };

export default function RegistryPage() {
  return (
    <SiteChrome>
      <HeroBanner image={registry.heroImage} title={registry.title} />

      <div className="bg-wedding-gold">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
          <p className="font-serif text-2xl leading-relaxed text-wedding-ink/90 sm:text-3xl">
            {registry.body}
          </p>
          <a
            href={wedding.links.registry}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block rounded-full bg-wedding-maroon px-10 py-4 font-serif text-lg text-wedding-cream shadow-lg transition-transform hover:scale-105"
          >
            {registry.cta}
          </a>
        </div>
      </div>
    </SiteChrome>
  );
}
