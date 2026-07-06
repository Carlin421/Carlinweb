import { getDict, type Locale, pick } from "@/lib/i18n";
import type { Profile, Socials } from "@/lib/siteContent";

import { ButtonLink } from "./ButtonLink";
import { IconLink } from "./IconLink";
import { Portrait } from "./Portrait";
import { ArrowRight, FileText, Github, Linkedin, Mail } from "./icons";

type HeroProps = {
  profile: Profile;
  socials: Socials;
  projectCount: number;
  experienceCount: number;
  locale: Locale;
};

export function Hero({ profile, socials, projectCount, experienceCount, locale }: HeroProps) {
  const dict = getDict(locale);
  const education = profile.education[0];
  const title = pick(profile.title, locale);
  const roleLine = title.split("|")[0]?.trim() || title;

  const stats = [
    { label: dict.hero.statsProjects, value: String(projectCount).padStart(2, "0") },
    { label: dict.hero.statsInternships, value: String(experienceCount).padStart(2, "0") },
  ];

  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-32 md:px-8 md:pt-40">
        {/* Availability line */}
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent motion-safe:animate-status-pulse" />
          </span>
          {pick(profile.availability, locale)}
        </div>

        <div className="mt-8 grid items-start gap-x-10 gap-y-12 lg:grid-cols-12">
          {/* Left: identity + statement */}
          <div className="lg:col-span-7">
            <p className="index-label text-accent">{roleLine}</p>
            <h1 className="mt-4 font-display text-6xl font-medium leading-[0.95] tracking-[-0.03em] text-ink sm:text-7xl lg:text-[5.5rem]">
              {profile.name}
            </h1>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-ink-dim md:text-xl">
              {pick(profile.shortIntro, locale)}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink
                href="#work"
                variant="primary"
                icon={<ArrowRight width={16} height={16} />}
              >
                {dict.hero.viewWork}
              </ButtonLink>
              <ButtonLink
                href={profile.resume}
                external
                icon={<FileText width={15} height={15} />}
                iconPosition="left"
              >
                {dict.resume}
              </ButtonLink>
              <span className="flex items-center gap-2">
                {socials.github && (
                  <IconLink href={socials.github} label="GitHub">
                    <Github width={17} height={17} />
                  </IconLink>
                )}
                {socials.linkedin && (
                  <IconLink href={socials.linkedin} label="LinkedIn">
                    <Linkedin width={17} height={17} />
                  </IconLink>
                )}
                {socials.email && (
                  <IconLink href={`mailto:${socials.email}`} label="Email" external={false}>
                    <Mail width={17} height={17} />
                  </IconLink>
                )}
              </span>
            </div>
          </div>

          {/* Right: portrait */}
          <div className="lg:col-span-5 lg:pl-6">
            <div className="mx-auto max-w-[20rem] lg:ml-auto lg:mr-0">
              <Portrait
                photo={profile.photo}
                name={profile.name}
                caption={pick(profile.location, locale)}
                label={dict.hero.portrait}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Metadata strip: two peer stats on one scale, education as its own row. */}
      <div className="mx-auto max-w-6xl px-6 pb-16 md:px-8">
        <div className="rule" />
        <dl className="grid sm:grid-cols-2">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-1 py-6 sm:px-6 ${
                i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : "sm:pl-0"
              }`}
            >
              <dt className="order-2 index-label text-ink-mute">{stat.label}</dt>
              <dd className="order-1 font-display text-3xl font-medium text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>
        {education && (
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line py-5">
            <p className="index-label text-ink-mute">{pick(education.detail, locale)}</p>
            <p className="font-display text-lg font-medium text-ink">
              {pick(education.school, locale)}
              <span className="ml-2 font-sans text-sm font-normal text-ink-dim">
                {pick(education.degree, locale)}
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
