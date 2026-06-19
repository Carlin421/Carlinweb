import { ButtonLink } from "@/components/ButtonLink";
import { IconLink } from "@/components/IconLink";
import { FileTextIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { profile } from "@/data/profile";

export function Contact() {
  const emailHref = profile.email === "YOUR_EMAIL_HERE" ? "#" : `mailto:${profile.email}`;

  return (
    <section id="contact" className="px-5 py-20 md:px-8">
      <div className="mx-auto max-w-5xl rounded-lg border border-warm-border bg-[linear-gradient(135deg,#23211E_0%,#23383A_54%,#5F3F2B_100%)] bg-[length:180%_180%] p-8 text-warm-surface shadow-lift md:p-12 motion-safe:animate-surface-shift">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cool-accentSoft">
          Contact
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
          Let&apos;s build useful AI and software systems.
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-8 text-warm-surfaceMuted md:text-lg">
          I am currently looking for 2027 summer internship opportunities in software engineering, AI engineering, backend systems, and ML infrastructure.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-8 text-warm-surfaceMuted/90">
          If you are working on developer tools, AI systems, retrieval infrastructure, backend platforms, or applied AI products, I would be happy to connect.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <ButtonLink href={emailHref} variant="secondary" ariaLabel="Email Carlin Hou" icon={<MailIcon className="h-full w-full" />} iconPosition="left">
            Email Me
          </ButtonLink>
          <ButtonLink href={profile.resume} variant="secondary" external icon={<FileTextIcon className="h-full w-full" />} iconPosition="left">
            Resume
          </ButtonLink>
          <IconLink href={profile.github} label="GitHub" variant="dark">
            <GithubIcon className="h-full w-full" />
          </IconLink>
          <IconLink href={profile.linkedin} label="LinkedIn" variant="dark">
            <LinkedinIcon className="h-full w-full" />
          </IconLink>
        </div>
      </div>
    </section>
  );
}
