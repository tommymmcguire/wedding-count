import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { HeroBanner } from "@/components/site/HeroBanner";
import { asset, faq, faqHeroImage } from "@/lib/content";

export const metadata: Metadata = { title: "FAQ · Jacquelyn & Tommy" };

export default function FaqPage() {
  return (
    <SiteChrome>
      <HeroBanner
        image={faqHeroImage}
        title="F.A.Q."
        subtitle="Frequently Asked Questions"
        objectPosition="50% 32%"
      />

      {/* Harlequin diamond backdrop, echoing the live FAQ page */}
      <div
        className="px-6 py-20"
        style={{
          backgroundColor: "#efa890",
          backgroundImage: `url(${asset("66cc4be5-harlequin.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className="mx-auto max-w-3xl rounded-lg bg-wedding-olive px-8 py-12 shadow-2xl sm:px-12">
          <div className="space-y-10">
            {faq.map((item) => (
              <div key={item.q}>
                <h2 className="font-serif text-xl font-bold text-wedding-gold sm:text-2xl">
                  {item.q}
                </h2>
                <p className="mt-3 font-serif text-lg leading-relaxed text-wedding-cream/90">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SiteChrome>
  );
}
