import type { Profile, Socials } from "@/lib/siteContent";

import { ButtonLink } from "./ButtonLink";
import { CopyEmailButton } from "./CopyEmailButton";
import { IconLink } from "./IconLink";
import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "./icons";

type ContactProps = {
  profile: Profile;
  socials: Socials;
};

export function Contact({ profile, socials }: ContactProps) {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <div className="card-topline relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 text-center md:px-16 md:py-20">
          {/* Ambient corner glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(600px 300px at 15% 0%, rgb(var(--c-accent) / 0.09), transparent 60%), radial-gradient(500px 280px at 90% 100%, rgb(var(--c-teal) / 0.08), transparent 60%)",
            }}
          />

          <div className="relative">
            <p className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
              <span aria-hidden="true">06</span>
              <span aria-hidden="true" className="h-px w-10 bg-accent/50" />
              Contact
            </p>

            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-medium tracking-tight text-ink md:text-6xl">
              Let’s build something <em className="text-gradient-accent not-italic">together</em>.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ink-dim md:text-lg">
              {profile.searchStatus}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
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

            <div className="mt-8 flex items-center justify-center gap-3">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
