import type { Profile, Socials } from "@/lib/siteContent";

type FooterProps = {
  profile: Profile;
  socials: Socials;
};

export function Footer({ profile, socials }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-lg font-medium tracking-tight text-ink">
            {profile.name}
          </p>
          <p className="mt-1 font-mono text-xs text-ink-mute">
            © {year} · Designed &amp; built by {profile.name}
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
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
              Résumé
            </a>
            <a
              href="#top"
              className="text-ink-dim no-underline transition-colors hover:text-accent"
            >
              ↑ top
            </a>
          </div>
          <p className="font-mono text-[11px] text-ink-mute">
            Next.js · TypeScript · Tailwind — press <kbd className="rounded border border-line bg-surface-2 px-1 py-0.5 text-[10px]">⌘K</kbd> to explore
          </p>
        </div>
      </div>
    </footer>
  );
}
