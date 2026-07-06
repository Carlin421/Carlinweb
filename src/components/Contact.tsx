import { getDict, type Locale, pick } from "@/lib/i18n";
import type { Profile, Socials } from "@/lib/siteContent";

import { ButtonLink } from "./ButtonLink";
import { CopyEmailButton } from "./CopyEmailButton";
import { ArrowUpRight, FileText, Mail } from "./icons";

type ContactProps = {
  profile: Profile;
  socials: Socials;
  locale: Locale;
};

export function Contact({ profile, socials, locale }: ContactProps) {
  const dict = getDict(locale);
  const directory = [
    socials.email
      ? { label: dict.contact.dirEmail, value: socials.email, href: `mailto:${socials.email}` }
      : null,
    socials.github
      ? {
          label: dict.contact.dirGithub,
          value: socials.github.replace(/^https?:\/\//, ""),
          href: socials.github,
        }
      : null,
    socials.linkedin
      ? {
          label: dict.contact.dirLinkedin,
          value: socials.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
          href: socials.linkedin,
        }
      : null,
    { label: dict.contact.dirLocation, value: pick(profile.location, locale), href: null },
  ].filter((row): row is { label: string; value: string; href: string | null } => row !== null);

  return (
    <section id="contact" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <div className="rule" />
        <p className="index-label mt-4 text-accent">
          06 <span className="text-ink-mute">/ {dict.contact.eyebrow}</span>
        </p>

        <div className="mt-8 grid gap-x-10 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-4xl font-medium tracking-[-0.02em] text-ink md:text-6xl">
              {dict.contact.title}
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-dim">
              {pick(profile.searchStatus, locale)}
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
                    {dict.contact.emailMe}
                  </ButtonLink>
                  <CopyEmailButton email={socials.email} locale={locale} />
                </>
              ) : (
                socials.linkedin && (
                  <ButtonLink
                    href={socials.linkedin}
                    external
                    variant="primary"
                    icon={<ArrowUpRight width={16} height={16} />}
                  >
                    {dict.contact.connectLinkedin}
                  </ButtonLink>
                )
              )}
              <ButtonLink
                href={profile.resume}
                external
                icon={<FileText width={15} height={15} />}
                iconPosition="left"
              >
                {dict.resume}
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
