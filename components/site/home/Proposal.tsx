import { home } from "@/lib/content";

export function Proposal() {
  return (
    <section className="bg-wedding-hero px-6 py-20">
      <h2 className="text-center font-title text-6xl text-wedding-gold sm:text-7xl">
        The Proposal
      </h2>

      <div className="mx-auto mt-10 max-w-2xl space-y-5 text-center font-serif text-lg leading-relaxed text-wedding-gold/95 sm:text-xl">
        {home.proposal.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
