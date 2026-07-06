import { SiteChrome } from "@/components/site/SiteChrome";
import { Hero } from "@/components/site/home/Hero";
import { SaveTheDate } from "@/components/site/home/SaveTheDate";
import { LoveStory } from "@/components/site/home/LoveStory";
import { Proposal } from "@/components/site/home/Proposal";

export default function HomePage() {
  return (
    <SiteChrome>
      <Hero />
      <SaveTheDate />
      <LoveStory />
      <Proposal />
    </SiteChrome>
  );
}
