import { About } from "@/components/About";
import { AdditionalWork } from "@/components/AdditionalWork";
import { CommandPalette } from "@/components/CommandPalette";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Reveal } from "@/components/Reveal";
import { Skills } from "@/components/Skills";
import { getSiteContent } from "@/lib/contentStore";
import { getProjectImageMap } from "@/lib/projectImages";
import { getSocials } from "@/lib/siteContent";

export default async function HomePage() {
  const content = await getSiteContent();
  const imageMap = await getProjectImageMap();
  const socials = getSocials(content.profile);

  return (
    <>
      <Navbar name={content.profile.name} socials={socials} resume={content.profile.resume} />
      <CommandPalette socials={socials} resume={content.profile.resume} />

      <main>
        <Hero
          profile={content.profile}
          socials={socials}
          projectCount={content.projects.length}
          experienceCount={content.experience.length}
        />
        <Reveal>
          <About profile={content.profile} />
        </Reveal>
        <Reveal delay={40}>
          <Projects projects={content.projects} imageMap={imageMap} />
        </Reveal>
        <Reveal delay={40}>
          <Experience experience={content.experience} />
        </Reveal>
        <Reveal delay={40}>
          <Skills skills={content.skills} />
        </Reveal>
        <Reveal delay={40}>
          <AdditionalWork items={content.additionalWork} />
        </Reveal>
        <Reveal delay={40}>
          <Contact profile={content.profile} socials={socials} />
        </Reveal>
      </main>

      <Footer profile={content.profile} socials={socials} />
    </>
  );
}
