import { additionalWork } from "@/data/additionalWork";
import { experience } from "@/data/experience";
import { honors } from "@/data/honors";
import { focusAreas, profile as profileDefaults } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import type { Localized } from "@/lib/i18n";

// Canonical content types. Translatable text fields are `Localized` (a plain
// string, or a { en, zh } object). Identifiers, URLs, and tech-name lists stay
// plain strings — they read the same in every language.

export type Education = {
  school: Localized;
  degree: Localized;
  detail: Localized;
  /** Bullet notes: scholarship, GPA, awards, coursework. */
  notes: Localized[];
};

export type Profile = {
  name: string;
  title: Localized;
  /** One-line positioning statement shown under the name. */
  tagline: Localized;
  shortIntro: Localized;
  searchStatus: Localized;
  /** Short text shown in the availability badge. */
  availability: Localized;
  location: Localized;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  /** Path or URL for the resume PDF. Defaults to the committed /resume.pdf. */
  resume: string;
  /** Portrait photo URL (uploaded via /admin or committed). Empty = show monogram. */
  photo: string;
  about: Localized[];
  education: Education[];
  focusAreas: Localized[];
  languages: Localized[];
  certifications: Localized[];
  interests: Localized[];
};

export type Honor = {
  title: Localized;
  /** Placement / distinction, e.g. "1st Place" or "National Award". */
  detail: Localized;
  year: string;
};

export type Project = {
  slug: string;
  title: Localized;
  category: Localized;
  summary: Localized;
  problem: Localized;
  built: Localized;
  highlights: Localized[];
  tags: string[];
  links?: { label: Localized; href: string }[];
  imageAlt?: Localized;
  featured?: boolean;
};

export type ExperienceItem = {
  role: Localized;
  company: string;
  location: Localized;
  date: Localized;
  description: Localized;
  bullets: Localized[];
  /** Highlight this entry (e.g. a founded startup). */
  featured?: boolean;
};

export type SkillGroup = {
  category: Localized;
  items: string[];
};

export type AdditionalWorkItem = {
  title: Localized;
  category: Localized;
  description: Localized;
  evidence: Localized[];
  tags: string[];
};

/**
 * Everything the public site renders. Defaults come from src/data/*; the admin
 * panel saves overrides through the content store so no code edit or redeploy
 * is ever needed to change what the site says.
 */
export type SiteContent = {
  profile: Profile;
  projects: Project[];
  experience: ExperienceItem[];
  honors: Honor[];
  skills: SkillGroup[];
  additionalWork: AdditionalWorkItem[];
  /** ISO timestamp stamped by the content store on save. */
  updatedAt?: string;
};

export const defaultContent: SiteContent = {
  profile: { ...profileDefaults, focusAreas },
  projects,
  experience,
  honors,
  skills,
  additionalWork,
};

// Any value still left as a "YOUR_..._HERE" placeholder is treated as unset so
// the UI hides it instead of shipping a broken link/mailto.
const isPlaceholder = (value: string) => value.includes("YOUR_") || value.includes("_HERE");

export type Socials = {
  email: string | null;
  github: string | null;
  linkedin: string | null;
};

export function getSocials(profile: Profile): Socials {
  return {
    email: profile.email && !isPlaceholder(profile.email) ? profile.email : null,
    github: profile.github && !isPlaceholder(profile.github) ? profile.github : null,
    linkedin: profile.linkedin && !isPlaceholder(profile.linkedin) ? profile.linkedin : null,
  };
}
