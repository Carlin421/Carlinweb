import { About } from "@/components/About";
import { AdditionalWork } from "@/components/AdditionalWork";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { SectionReveal } from "@/components/SectionReveal";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionReveal delay={40}>
          <About />
        </SectionReveal>
        <SectionReveal delay={60}>
          <Projects />
        </SectionReveal>
        <SectionReveal delay={80}>
          <Experience />
        </SectionReveal>
        <SectionReveal delay={100}>
          <Skills />
        </SectionReveal>
        <SectionReveal delay={120}>
          <AdditionalWork />
        </SectionReveal>
        <SectionReveal delay={140}>
          <Contact />
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
}
