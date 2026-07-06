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
};

export function Hero({ profile, socials, projectCount, experienceCount }: HeroProps) {
  const education = profile.education[0];
  const roleLine = profile.title.split("|")[0]?.trim() || profile.title;

  const facts = [
    { label: "Projects & builds", value: String(projectCount).padStart(2, "0") },
    { label: "Internships", value: String(experienceCount).padStart(2, "0") },
    ...(education
      ? [{ label: education.detail, value: education.school, wide: true }]
      : []),
  ];

  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-32 md:px-8 md:pt-40">
        {/* Availability line */}
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent motion-safe:animate-status-pulse" />
          </span>
          {profile.availability}
        </div>

        <div className="mt-8 grid items-start gap-x-10 gap-y-12 lg:grid-cols-12">
          {/* Left: identity + statement */}
          <div className="lg:col-span-7">
            <p className="index-label text-accent">{roleLine}</p>
            <h1 className="mt-4 font-display text-6xl font-medium leading-[0.95] tracking-[-0.03em] text-ink sm:text-7xl lg:text-[5.5rem]">
              {profile.name}
            </h1>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-ink-dim md:text-xl">
              {profile.shortIntro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink
                href="#work"
                variant="primary"
                icon={<ArrowRight width={16} height={16} />}
              >
                View work
              </ButtonLink>
              <ButtonLink
                href={profile.resume}
                external
                icon={<FileText width={15} height={15} />}
                iconPosition="left"
              >
                Résumé
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
              <Portrait photo={profile.photo} name={profile.name} caption={profile.location} />
            </div>
          </div>
        </div>
      </div>

      {/* Metadata strip */}
      <div className="mx-auto max-w-6xl px-6 pb-16 md:px-8">
        <div className="rule" />
        <dl className="grid sm:grid-cols-3">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              className={`flex flex-col gap-1 py-6 sm:px-6 ${
                i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : "sm:pl-0"
              }`}
            >
              <dt className="index-label text-ink-mute">{fact.label}</dt>
              <dd
                className={`font-display font-medium text-ink ${
                  "wide" in fact && fact.wide ? "text-lg leading-7" : "text-3xl"
                }`}
              >
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
