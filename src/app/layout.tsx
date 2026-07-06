import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import { profile, socials } from "@/data/profile";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carlin-portfolio.vercel.app";

const description =
  "Carlin Hou is a software engineer and incoming University of Michigan MSI student interested in AI systems, full-stack engineering, backend systems, retrieval systems, and ML infrastructure.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Carlin Hou | Software Engineer",
    template: "%s | Carlin Hou",
  },
  description,
  applicationName: "Carlin Hou — Portfolio",
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    "Carlin Hou",
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
    siteName: "Carlin Hou — Portfolio",
    title: "Carlin Hou | Software Engineer",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlin Hou | Software Engineer",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F3EA",
  colorScheme: "light",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Software Engineer",
    description,
    url: siteUrl,
    alumniOf: profile.education.map((item) => ({
      "@type": "CollegeOrUniversity",
      name: item.school,
    })),
    sameAs: [socials.github, socials.linkedin].filter(Boolean),
  };

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
