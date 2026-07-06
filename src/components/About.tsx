import type { Profile } from "@/lib/siteContent";

import { SectionHeading } from "./SectionHeading";

type AboutProps = {
  profile: Profile;
};

export function About({ profile }: AboutProps) {
  return (
    <section id="about" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <SectionHeading index="01" eyebrow="About" title="Background" />

        <div className="grid gap-x-10 gap-y-12 md:grid-cols-12">
          <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink-dim md:col-span-7">
            {profile.about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="md:col-span-5 md:justify-self-end md:min-w-[18rem]">
            <p className="index-label text-ink-mute">Education</p>
            <ul className="mt-5 space-y-6">
              {profile.education.map((item, index) => (
                <li key={index} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="border-t border-line pt-0.5">
                    <p className="font-display text-lg font-medium leading-tight text-ink">
                      {item.school}
                    </p>
                    <p className="mt-1 text-sm text-ink-dim">{item.degree}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink-mute">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {profile.focusAreas.length > 0 && (
              <div className="mt-10">
                <p className="index-label text-ink-mute">Focus</p>
                <ul className="mt-5 space-y-3">
                  {profile.focusAreas.map((area, index) => (
                    <li
                      key={index}
                      className="grid grid-cols-[auto_1fr] gap-4 border-t border-line pt-2 text-sm text-ink-dim"
                    >
                      <span className="font-mono text-xs text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
