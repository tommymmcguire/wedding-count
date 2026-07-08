import { Button } from "@/components/journey-site/ui/Button";
import { LuggageTag } from "@/components/journey-site/ui/LuggageTag";
import { FlightPathDivider } from "@/components/journey-site/ui/FlightPathDivider";

/** Placeholder for pages built out in Phase 2 — keeps the chrome navigable. */
export function ComingSoon({ tag, title, note }: { tag: string; title: string; note?: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
      <LuggageTag>{tag}</LuggageTag>
      <h1 className="mt-6 font-title text-journey-ivory" style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}>
        {title}
      </h1>
      <FlightPathDivider className="w-full max-w-sm" />
      <p className="max-w-md font-serif text-lg text-journey-ivory/70">
        {note ?? "This page is on its way — arriving in the next build phase."}
      </p>
      <div className="mt-10">
        <Button href="/preview" variant="outline">Back to home</Button>
      </div>
    </main>
  );
}
