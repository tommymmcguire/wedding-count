import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { HeroBanner } from "@/components/site/HeroBanner";
import { faq, faqHeroImage } from "@/lib/content";

export const metadata: Metadata = { title: "FAQ · Jacquelyn & Tommy" };

export default function FaqPage() {
  return (
    <SiteChrome>
      <HeroBanner image={faqHeroImage} title="F.A.Q." subtitle="Frequently Asked Questions" />

      <div className="bg-[#8fb7c2]">
        <div className="mx-auto max-w-3xl space-y-5 px-6 py-20">
          {faq.map((item) => (
            <div key={item.q} className="rounded-xl bg-wedding-olive p-7 shadow-lg">
              <h2 className="font-serif text-xl font-semibold text-wedding-gold sm:text-2xl">
                {item.q}
              </h2>
              <p className="mt-3 font-serif text-lg leading-relaxed text-wedding-cream/90">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SiteChrome>
  );
}
