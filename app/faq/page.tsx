import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { PageBanner } from "@/components/site/PageBanner";
import { faq } from "@/lib/content";

export const metadata: Metadata = { title: "FAQ · Jacquelyn & Tommy" };

export default function FaqPage() {
  return (
    <SiteChrome>
      <div className="bg-wedding-hero">
        <PageBanner title="F.A.Q." subtitle="Frequently Asked Questions" />

        <div className="mx-auto max-w-3xl px-6 pb-24">
          <div className="divide-y divide-wedding-gold/15 border-y border-wedding-gold/15">
            {faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl text-wedding-gold marker:hidden">
                  {item.q}
                  <span className="shrink-0 text-wedding-gold/60 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 font-serif text-lg leading-relaxed text-wedding-cream/85">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </SiteChrome>
  );
}
