import type { Profile, Socials } from "@/lib/siteContent";

import { ButtonLink } from "./ButtonLink";
import { CopyEmailButton } from "./CopyEmailButton";
import { ArrowUpRight, FileText, Mail } from "./icons";

type ContactProps = {
  profile: Profile;
  socials: Socials;
};

export function Contact({ profile, socials }: ContactProps) {
  const directory = [
    socials.email ? { label: "Email", value: socials.email, href: `mailto:${socials.email}` } : null,
    socials.github
      ? { label: "GitHub", value: socials.github.replace(/^https?:\/\//, ""), href: socials.github }
      : null,
    socials.linkedin
      ? {
          label: "LinkedIn",
          value: socials.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
          href: socials.linkedin,
        }
      : null,
    { label: "Location", value: profile.location, href: null },
  ].filter((row): row is { label: string; value: string; href: string | null } => row !== null);

  return (
    <section id="contact" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <div className="rule" />
        <p className="index-label mt-4 text-accent">
          06 <span className="text-ink-mute">/ Contact</span>
        </p>

        <div className="mt-8 grid gap-x-10 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-4xl font-medium tracking-[-0.02em] text-ink md:text-6xl">
              Get in touch
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-dim">
              {profile.searchStatus}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {socials.email ? (
                <>
                  <ButtonLink
                    href={`mailto:${socials.email}`}
                    variant="primary"
                    icon={<Mail width={16} height={16} />}
                    iconPosition="left"
                  >
                    Email me
                  </ButtonLink>
                  <CopyEmailButton email={socials.email} />
                </>
              ) : (
                socials.linkedin && (
                  <ButtonLink
                    href={socials.linkedin}
                    external
                    variant="primary"
                    icon={<ArrowUpRight width={16} height={16} />}
                  >
                    Connect on LinkedIn
                  </ButtonLink>
                )
              )}
              <ButtonLink
                href={profile.resume}
                external
                icon={<FileText width={15} height={15} />}
                iconPosition="left"
              >
                Résumé
              </ButtonLink>
            </div>
          </div>

          {/* Contact directory */}
          <div className="md:col-span-5 md:justify-self-end md:text-right">
            <dl className="border-t border-line">
              {directory.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                >
                  <dt className="index-label text-ink-mute">{row.label}</dt>
                  <dd className="min-w-0 font-mono text-[13px] text-ink">
                    {row.href ? (
                      <a
                        href={row.href}
                        {...(row.href.startsWith("mailto:")
                          ? {}
                          : { target: "_blank", rel: "noopener noreferrer" })}
                        className="truncate text-ink no-underline transition-colors hover:text-accent"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="truncate">{row.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
