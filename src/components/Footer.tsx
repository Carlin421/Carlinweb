import { getDict, type Locale } from "@/lib/i18n";
import type { Profile, Socials } from "@/lib/siteContent";

type FooterProps = {
  profile: Profile;
  socials: Socials;
  locale: Locale;
};

export function Footer({ profile, socials, locale }: FooterProps) {
  const dict = getDict(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-base font-semibold uppercase tracking-[0.14em] text-ink">
            {profile.name}
          </p>
          <p className="mt-1.5 font-mono text-[11px] text-ink-mute">
            © {year} — {dict.footer.designedBy} {profile.name.split(" ")[0]}
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex flex-wrap items-center gap-5 font-mono text-[11px] uppercase tracking-[0.12em]">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-dim no-underline transition-colors hover:text-accent"
              >
                GitHub
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-dim no-underline transition-colors hover:text-accent"
              >
                LinkedIn
              </a>
            )}
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-dim no-underline transition-colors hover:text-accent"
            >
              {dict.resume}
            </a>
            <a href="#top" className="text-ink-dim no-underline transition-colors hover:text-accent">
              ↑ {dict.footer.top}
            </a>
          </div>
          <p className="font-mono text-[11px] text-ink-mute">Next.js · TypeScript · Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
