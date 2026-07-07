import { getDict, type Locale, type Localized, pick } from "@/lib/i18n";
import type { Profile } from "@/lib/siteContent";

import { SectionHeading } from "./SectionHeading";

type AboutProps = {
  profile: Profile;
  locale: Locale;
};

function CredList({ label, items, locale }: { label: string; items: Localized[]; locale: Locale }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <p className="index-label text-ink-mute">{label}</p>
      <ul className="mt-4 space-y-2 border-t border-line pt-4">
        {items.map((item, i) => (
          <li key={i} className="text-sm leading-snug text-ink-dim">
            {pick(item, locale)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function About({ profile, locale }: AboutProps) {
  const dict = getDict(locale);
  const languages = profile.languages ?? [];
  const certifications = profile.certifications ?? [];
  const interests = profile.interests ?? [];

  return (
    <section id="about" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <SectionHeading index="01" eyebrow={dict.about.eyebrow} title={dict.about.title} />

        <div className="grid gap-x-10 gap-y-12 md:grid-cols-12">
          <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink-dim md:col-span-7">
            {profile.about.map((paragraph, index) => (
              <p key={index}>{pick(paragraph, locale)}</p>
            ))}
          </div>

          {/* Education */}
          <div className="md:col-span-5 md:justify-self-end md:min-w-[19rem]">
            <p className="index-label text-ink-mute">{dict.about.education}</p>
            <ul className="mt-5 space-y-6">
              {profile.education.map((item, index) => (
                <li key={index} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="border-t border-line pt-0.5">
                    <p className="font-display text-lg font-medium leading-tight text-ink">
                      {pick(item.school, locale)}
                    </p>
                    <p className="mt-1 text-sm text-ink-dim">{pick(item.degree, locale)}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink-mute">
                      {pick(item.detail, locale)}
                    </p>
                    {item.notes && item.notes.length > 0 && (
                      <ul className="mt-2.5 space-y-1.5">
                        {item.notes.map((note, i) => (
                          <li
                            key={i}
                            className="grid grid-cols-[auto_1fr] gap-2.5 text-sm leading-snug text-ink-dim"
                          >
                            <span aria-hidden="true" className="mt-2 h-px w-2.5 bg-accent" />
                            {pick(note, locale)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Credentials band */}
        <div className="mt-16 grid gap-x-10 gap-y-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <CredList label={dict.about.focus} items={profile.focusAreas} locale={locale} />
          <CredList label={dict.about.languages} items={languages} locale={locale} />
          <CredList label={dict.about.certifications} items={certifications} locale={locale} />
          <CredList label={dict.about.interests} items={interests} locale={locale} />
        </div>
      </div>
    </section>
  );
}
