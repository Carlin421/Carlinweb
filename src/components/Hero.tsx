import { ButtonLink } from "@/components/ButtonLink";
import { IconLink } from "@/components/IconLink";
import { ArrowRightIcon, FileTextIcon, GithubIcon, LinkedinIcon, SparkleIcon } from "@/components/icons";
import { focusAreas, profile } from "@/data/profile";

const proofPoints = ["Full-stack products", "Applied AI systems", "Backend infrastructure"];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-full bg-[linear-gradient(120deg,rgba(221,239,240,0.72),rgba(247,243,234,0)_42%,rgba(232,216,198,0.42))]"
      />

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-5 inline-flex max-w-2xl items-center gap-3 rounded-full border border-warm-border bg-warm-surface/95 px-4 py-2 text-sm font-medium text-warm-secondary shadow-sm backdrop-blur">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-cool-accent motion-safe:animate-status-pulse" />
            <span>{profile.searchStatus}</span>
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-warm-text md:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-3xl text-xl font-medium leading-8 text-cool-accentDark md:text-2xl">
            {profile.title}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-warm-secondary md:text-lg">
            I build AI-assisted tools, full-stack applications, and systems that turn messy real-world workflows into usable software. My current interests include retrieval systems, backend engineering, voice interfaces, and ML infrastructure.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects" variant="primary" icon={<ArrowRightIcon className="h-full w-full" />}>
              View Projects
            </ButtonLink>
            <ButtonLink href={profile.resume} external icon={<FileTextIcon className="h-full w-full" />} iconPosition="left">
              Resume
            </ButtonLink>
            <IconLink href={profile.github} label="GitHub">
              <GithubIcon className="h-full w-full" />
            </IconLink>
            <IconLink href={profile.linkedin} label="LinkedIn">
              <LinkedinIcon className="h-full w-full" />
            </IconLink>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point} className="rounded-lg border border-warm-border bg-warm-surface/80 px-4 py-3 text-sm font-semibold text-warm-text shadow-sm backdrop-blur">
                <span className="mb-2 block h-1 w-8 rounded-full bg-cool-accent" />
                {point}
              </div>
            ))}
          </div>
        </div>

        <aside className="relative overflow-hidden rounded-lg border border-warm-border bg-warm-surface/95 p-6 shadow-lift backdrop-blur md:p-8 motion-safe:animate-subtle-float" aria-label="Current focus areas">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cool-accent via-signal-gold to-signal-rust" />
          <div className="flex items-center justify-between gap-4 border-b border-warm-border pb-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cool-accent">
                Currently focused on
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-warm-text">
                Applied AI systems that fit real workflows
              </h2>
            </div>
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-warm-border bg-cool-accentSoft text-cool-accentDark md:flex">
              <SparkleIcon className="h-6 w-6" />
            </span>
          </div>

          <div className="mt-6 grid gap-3">
            {focusAreas.map((area, index) => (
              <div
                key={area}
                className="group flex items-center gap-4 rounded-lg border border-warm-border bg-warm-background/60 px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-cool-accent hover:bg-cool-accentSoft/70"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-warm-accentSoft text-sm font-semibold text-warm-accentDark transition group-hover:bg-cool-accent group-hover:text-warm-surface">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-medium text-warm-secondary">{area}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
