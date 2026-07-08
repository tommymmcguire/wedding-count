import type { Metadata } from "next";
import JourneyExperience from "@/components/journey/JourneyExperience";

export const metadata: Metadata = {
  title: "Our Journey · Globe Demo",
  description: "Isolated demo of the scroll-driven flight-path globe experience.",
};

export default function JourneyDemoPage() {
  return (
    <main className="bg-[#070a1c] text-white">
      <JourneyExperience />
    </main>
  );
}
