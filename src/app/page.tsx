import { About } from "@/components/About";
import { AdditionalWork } from "@/components/AdditionalWork";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Reveal } from "@/components/Reveal";
import { Skills } from "@/components/Skills";
import { getSiteContent } from "@/lib/contentStore";
import { getDict } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale.server";
import { getProjectImageMap } from "@/lib/projectImages";
import { getSocials } from "@/lib/siteContent";

export default async function HomePage() {
  const content = await getSiteContent();
  const imageMap = await getProjectImageMap();
  const socials = getSocials(content.profile);
  const locale = resolveLocale();
  const dict = getDict(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:border focus:border-accent focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        {dict.skipToContent}
      </a>
      <Navbar
        name={content.profile.name}
        socials={socials}
        resume={content.profile.resume}
        locale={locale}
      />

      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero
          profile={content.profile}
          socials={socials}
          projectCount={content.projects.length}
          experienceCount={content.experience.length}
          locale={locale}
        />
        <Reveal>
          <About profile={content.profile} locale={locale} />
        </Reveal>
        <Reveal>
          <Projects projects={content.projects} imageMap={imageMap} locale={locale} />
        </Reveal>
        <Reveal>
          <Experience experience={content.experience} locale={locale} />
        </Reveal>
        <Reveal>
          <Skills skills={content.skills} locale={locale} />
        </Reveal>
        <Reveal>
          <AdditionalWork items={content.additionalWork} locale={locale} />
        </Reveal>
        <Reveal>
          <Contact profile={content.profile} socials={socials} locale={locale} />
        </Reveal>
      </main>

      <Footer profile={content.profile} socials={socials} locale={locale} />
    </>
  );
}
