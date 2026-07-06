import type { Profile, Socials } from "@/lib/siteContent";

import { ButtonLink } from "./ButtonLink";
import { IconLink } from "./IconLink";
import { Spotlight } from "./Spotlight";
import { TerminalCard } from "./TerminalCard";
import { ArrowRight, FileText, Github, Linkedin, Mail, MapPin } from "./icons";

type HeroProps = {
  profile: Profile;
  socials: Socials;
  projectCount: number;
  experienceCount: number;
};

export function Hero({ profile, socials, projectCount, experienceCount }: HeroProps) {
  const education = profile.education[0];
  const stats = [
    { value: String(projectCount).padStart(2, "0"), label: "projects & builds" },
    { value: String(experienceCount).padStart(2, "0"), label: "engineering internships" },
    ...(education
      ? [{ value: education.school, label: education.detail.toLowerCase(), wide: true }]
      : []),
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      <Spotlight />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-16 pt-32 md:px-8 md:pt-40 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pb-20">
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-teal">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal motion-safe:animate-status-pulse" />
            </span>
            {profile.availability}
          </p>

          <h1 className="mt-6 font-display text-[2.6rem] font-medium leading-[1.06] tracking-tight text-ink md:text-6xl lg:text-[4.2rem]">
            Hi, I’m {profile.name.split(" ")[0]}. I build{" "}
            <em className="text-gradient-accent not-italic">AI systems</em> that turn messy
            workflows into working software.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-dim md:text-lg">
            {profile.shortIntro}
          </p>

          <p className="mt-5 flex items-center gap-2 font-mono text-xs text-ink-mute">
            <MapPin width={14} height={14} aria-hidden="true" />
            {profile.location}
            <span aria-hidden="true" className="text-line-strong">
              ·
            </span>
            {profile.title}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <ButtonLink
              href="#projects"
              variant="primary"
              icon={<ArrowRight width={16} height={16} />}
            >
              View projects
            </ButtonLink>
            <ButtonLink
              href={profile.resume}
              external
              icon={<FileText width={15} height={15} />}
              iconPosition="left"
            >
              Résumé
            </ButtonLink>
            <span className="flex items-center gap-2.5">
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

        <div className="motion-safe:animate-subtle-float lg:pl-4">
          <TerminalCard focusAreas={profile.focusAreas} availability={profile.availability} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20 md:px-8">
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 bg-surface px-6 py-5">
              <dt className="order-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                {stat.label}
              </dt>
              <dd
                className={`order-1 font-display font-medium text-ink ${
                  "wide" in stat && stat.wide ? "text-xl leading-9 md:text-2xl" : "text-3xl"
                }`}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
