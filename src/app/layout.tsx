import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import { getSiteContent } from "@/lib/contentStore";
import { htmlLang, pick } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale.server";
import { getSocials } from "@/lib/siteContent";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Grotesk display face: geometric, tabular figures, a designed-not-default feel.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carlin-portfolio.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveLocale();
  const { profile } = await getSiteContent();
  const role = pick(profile.title, locale).split("|")[0]?.trim() || "Software Engineer";
  const title = `${profile.name} | ${role}`;
  const description = pick(profile.shortIntro, locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${profile.name}`,
    },
    description,
    applicationName: `${profile.name} — Portfolio`,
    authors: [{ name: profile.name, url: siteUrl }],
    creator: profile.name,
    keywords: [
      profile.name,
      "software engineer",
      "AI engineer",
      "RAG",
      "retrieval systems",
      "backend engineering",
      "full-stack developer",
      "ML infrastructure",
      "University of Michigan MSI",
      "software engineering internship 2027",
    ],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: siteUrl,
      siteName: `${profile.name} — Portfolio`,
      title,
      description,
      locale: locale === "zh" ? "zh_TW" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#12110E" },
    { media: "(prefers-color-scheme: light)", color: "#FBFAF7" },
  ],
  colorScheme: "light dark",
};

// Runs before paint so the persisted (or system) theme never flashes.
// Light is the primary palette; system preference is honored on first visit.
const themeInitScript = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.dataset.theme=t})()`;

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = resolveLocale();
  const { profile } = await getSiteContent();
  const socials = getSocials(profile);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Software Engineer",
    description: pick(profile.shortIntro, locale),
    url: siteUrl,
    alumniOf: profile.education.map((item) => ({
      "@type": "CollegeOrUniversity",
      name: pick(item.school, "en"),
    })),
    sameAs: [socials.github, socials.linkedin].filter(Boolean),
  };

  return (
    <html
      lang={htmlLang(locale)}
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-base font-sans text-ink">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
