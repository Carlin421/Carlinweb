import { additionalWork, type AdditionalWorkItem } from "@/data/additionalWork";
import { experience, type ExperienceItem } from "@/data/experience";
import { focusAreas, profile as profileDefaults } from "@/data/profile";
import { projects, type Project } from "@/data/projects";
import { skills, type SkillGroup } from "@/data/skills";

export type { AdditionalWorkItem, ExperienceItem, Project, SkillGroup };

export type Education = {
  school: string;
  degree: string;
  detail: string;
};

export type Profile = {
  name: string;
  title: string;
  shortIntro: string;
  searchStatus: string;
  /** Short text shown in the availability badge, e.g. "Open to 2027 summer internships". */
  availability: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  /** Path or URL for the resume PDF. Defaults to the committed /resume.pdf. */
  resume: string;
  /** Portrait photo URL (uploaded via /admin or committed). Empty = show monogram. */
  photo: string;
  about: string[];
  education: Education[];
  focusAreas: string[];
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
  skills: SkillGroup[];
  additionalWork: AdditionalWorkItem[];
  /** ISO timestamp stamped by the content store on save. */
  updatedAt?: string;
};

export const defaultContent: SiteContent = {
  profile: {
    ...profileDefaults,
    availability: "Open to 2027 summer internships",
    photo: "",
    focusAreas,
  },
  projects,
  experience,
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
