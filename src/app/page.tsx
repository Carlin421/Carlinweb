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
import { getProjectImageMap } from "@/lib/projectImages";
import { getSocials } from "@/lib/siteContent";

export default async function HomePage() {
  const content = await getSiteContent();
  const imageMap = await getProjectImageMap();
  const socials = getSocials(content.profile);

  return (
    <>
      <Navbar name={content.profile.name} socials={socials} resume={content.profile.resume} />

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
        <Reveal>
          <Projects projects={content.projects} imageMap={imageMap} />
        </Reveal>
        <Reveal>
          <Experience experience={content.experience} />
        </Reveal>
        <Reveal>
          <Skills skills={content.skills} />
        </Reveal>
        <Reveal>
          <AdditionalWork items={content.additionalWork} />
        </Reveal>
        <Reveal>
          <Contact profile={content.profile} socials={socials} />
        </Reveal>
      </main>

      <Footer profile={content.profile} socials={socials} />
    </>
  );
}
