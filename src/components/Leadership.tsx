import { SectionHeading } from "@/components/SectionHeading";

const leadershipItems = [
  {
    title: "LinkEDU",
    description:
      "Co-founded an education advocacy and campus action project focused on education resource inequality, rural student representation, and public engagement.",
  },
  {
    title: "Google Developer Student Clubs / Technical Community",
    description:
      "Supported student technical learning through workshops, side-project guidance, and community activities.",
  },
];

export function Leadership() {
  return (
    <section id="leadership" className="bg-warm-surfaceMuted/65 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Leadership & Social Impact"
          title="Translating complex problems into accessible, collaborative action."
          description="Beyond engineering, I have worked on education-focused public engagement and student-led initiatives."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {leadershipItems.map((item) => (
            <article key={item.title} className="rounded-lg border border-warm-border bg-warm-surface p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cool-accent hover:shadow-card md:p-8">
              <span className="mb-5 block h-1 w-12 rounded-full bg-signal-rust" aria-hidden="true" />
              <h3 className="text-2xl font-semibold tracking-tight text-warm-text">{item.title}</h3>
              <p className="mt-4 text-base leading-8 text-warm-secondary">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
