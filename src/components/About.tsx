import type { Profile } from "@/lib/siteContent";

import { SectionHeading } from "./SectionHeading";
import { Sparkle } from "./icons";

type AboutProps = {
  profile: Profile;
};

export function About({ profile }: AboutProps) {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-28">
        <SectionHeading index="01" eyebrow="About" title="A builder’s background" />
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="space-y-5 text-pretty leading-relaxed text-ink-dim md:text-lg">
            {profile.about.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-6xl first-letter:font-medium first-letter:leading-[0.8] first-letter:text-accent"
                    : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-5">
            <div className="card-topline rounded-2xl border border-line bg-surface p-6 transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-accent/40 hover:shadow-card">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Education
              </h3>
              <ul className="mt-4 space-y-5">
                {profile.education.map((item) => (
                  <li key={item.school} className="border-l-2 border-line pl-4">
                    <p className="font-medium text-ink">{item.school}</p>
                    <p className="mt-0.5 text-sm text-ink-dim">{item.degree}</p>
                    <p className="mt-1 font-mono text-xs text-ink-mute">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-teal/25 bg-teal/[0.07] p-6">
              <h3 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
                <Sparkle width={13} height={13} aria-hidden="true" />
                Currently
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">{profile.searchStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
