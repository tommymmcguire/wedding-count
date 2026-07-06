import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/** Shared page shell: fixed nav on top, content, footer. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-wedding-ink">
      <SiteHeader />
      <main className="pt-12">{children}</main>
      <SiteFooter />
    </div>
  );
}
