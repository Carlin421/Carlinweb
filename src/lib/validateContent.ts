import type { Localized } from "./i18n";
import type {
  AdditionalWorkItem,
  Education,
  ExperienceItem,
  Honor,
  Profile,
  Project,
  SiteContent,
  SkillGroup,
} from "./siteContent";

// Hard caps keep a stored revision bounded no matter what a client sends.
const MAX_STRING = 5000;
const MAX_PROJECTS = 100;
const MAX_LIST = 200;
const MAX_HONORS = 50;
// A year is a short plain string like "2024"; keep it tight.
const MAX_SHORT_STRING = 120;
const SLUG_PATTERN = /^[a-z0-9-]+$/;

export type ValidateResult =
  | { ok: true; content: SiteContent }
  | { ok: false; errors: string[] };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function readString(value: unknown, path: string, errors: string[], required = false): string {
  if (value === undefined || value === null) {
    if (required) errors.push(`${path} is required.`);
    return "";
  }
  if (typeof value !== "string") {
    errors.push(`${path} must be a string.`);
    return "";
  }
  const trimmed = value.trim();
  if (required && trimmed.length === 0) {
    errors.push(`${path} must not be empty.`);
  }
  if (trimmed.length > MAX_STRING) {
    errors.push(`${path} is longer than ${MAX_STRING} characters.`);
  }
  return trimmed.slice(0, MAX_STRING);
}

/**
 * Reads a translatable text field: either a plain string (normalized to a
 * trimmed string) or an object with optional `en`/`zh` string keys. Each
 * language is trimmed and capped; empty keys are dropped. `required` demands at
 * least one non-empty language. The result is rebuilt field-by-field, so
 * unknown keys are stripped and the shape always matches `Localized`.
 */
function readLocalized(
  value: unknown,
  path: string,
  errors: string[],
  required = false
): Localized {
  if (value === undefined || value === null) {
    if (required) errors.push(`${path} is required.`);
    return "";
  }
  if (typeof value === "string") {
    return readString(value, path, errors, required);
  }
  if (!isRecord(value)) {
    errors.push(`${path} must be a string or an object with en/zh text.`);
    return "";
  }
  const result: { en?: string; zh?: string } = {};
  for (const lang of ["en", "zh"] as const) {
    const raw = value[lang];
    if (raw === undefined || raw === null) continue;
    const text = readString(raw, `${path}.${lang}`, errors);
    if (text.length > 0) result[lang] = text;
  }
  if (required && !result.en && !result.zh) {
    errors.push(`${path} must not be empty in at least one language.`);
  }
  return result;
}

function readStringArray(value: unknown, path: string, errors: string[]): string[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) {
    errors.push(`${path} must be an array of strings.`);
    return [];
  }
  if (value.length > MAX_LIST) {
    errors.push(`${path} has more than ${MAX_LIST} items.`);
  }
  return value
    .slice(0, MAX_LIST)
    .map((item, index) => readString(item, `${path}[${index}]`, errors))
    .filter((item) => item.length > 0);
}

/** Has this localized value any non-empty text in either language? */
const hasLocalizedText = (value: Localized): boolean =>
  typeof value === "string" ? value.length > 0 : Boolean(value.en || value.zh);

function readLocalizedArray(value: unknown, path: string, errors: string[]): Localized[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) {
    errors.push(`${path} must be an array.`);
    return [];
  }
  if (value.length > MAX_LIST) {
    errors.push(`${path} has more than ${MAX_LIST} items.`);
  }
  return value
    .slice(0, MAX_LIST)
    .map((item, index) => readLocalized(item, `${path}[${index}]`, errors))
    .filter(hasLocalizedText);
}

function readList<T>(
  value: unknown,
  path: string,
  errors: string[],
  max: number,
  readItem: (item: unknown, itemPath: string, errors: string[]) => T
): T[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) {
    errors.push(`${path} must be an array.`);
    return [];
  }
  if (value.length > max) {
    errors.push(`${path} has more than ${max} items.`);
  }
  return value.slice(0, max).map((item, index) => readItem(item, `${path}[${index}]`, errors));
}

function readEducation(value: unknown, path: string, errors: string[]): Education {
  if (!isRecord(value)) {
    errors.push(`${path} must be an object.`);
    return { school: "", degree: "", detail: "", notes: [] };
  }
  return {
    school: readLocalized(value.school, `${path}.school`, errors),
    degree: readLocalized(value.degree, `${path}.degree`, errors),
    detail: readLocalized(value.detail, `${path}.detail`, errors),
    notes: readLocalizedArray(value.notes, `${path}.notes`, errors),
  };
}

function readProfile(value: unknown, errors: string[]): Profile {
  if (!isRecord(value)) errors.push("profile must be an object.");
  const record = isRecord(value) ? value : {};
  return {
    name: readString(record.name, "profile.name", errors, true),
    title: readLocalized(record.title, "profile.title", errors, true),
    tagline: readLocalized(record.tagline, "profile.tagline", errors),
    shortIntro: readLocalized(record.shortIntro, "profile.shortIntro", errors),
    searchStatus: readLocalized(record.searchStatus, "profile.searchStatus", errors),
    availability: readLocalized(record.availability, "profile.availability", errors),
    location: readLocalized(record.location, "profile.location", errors),
    email: readString(record.email, "profile.email", errors),
    phone: readString(record.phone, "profile.phone", errors),
    github: readString(record.github, "profile.github", errors),
    linkedin: readString(record.linkedin, "profile.linkedin", errors),
    resume: readString(record.resume, "profile.resume", errors),
    photo: readString(record.photo, "profile.photo", errors),
    about: readLocalizedArray(record.about, "profile.about", errors),
    education: readList(record.education, "profile.education", errors, MAX_LIST, readEducation),
    focusAreas: readLocalizedArray(record.focusAreas, "profile.focusAreas", errors),
    languages: readLocalizedArray(record.languages, "profile.languages", errors),
    certifications: readLocalizedArray(record.certifications, "profile.certifications", errors),
    interests: readLocalizedArray(record.interests, "profile.interests", errors),
  };
}

function readLink(
  value: unknown,
  path: string,
  errors: string[]
): { label: Localized; href: string } {
  if (!isRecord(value)) {
    errors.push(`${path} must be an object with label and href.`);
    return { label: "", href: "" };
  }
  const label = readLocalized(value.label, `${path}.label`, errors);
  const href = readString(value.href, `${path}.href`, errors);
  if (hasLocalizedText(label) && href.length === 0) {
    errors.push(`${path}.href must not be empty.`);
  }
  return { label, href };
}

function readProject(value: unknown, path: string, errors: string[]): Project {
  if (!isRecord(value)) errors.push(`${path} must be an object.`);
  const record = isRecord(value) ? value : {};

  const slug = readString(record.slug, `${path}.slug`, errors, true);
  if (slug.length > 0 && !SLUG_PATTERN.test(slug)) {
    errors.push(`${path}.slug must contain only lowercase letters, numbers, and hyphens.`);
  }
  if (record.featured !== undefined && typeof record.featured !== "boolean") {
    errors.push(`${path}.featured must be a boolean.`);
  }

  // Fully empty link rows are dropped instead of rejected.
  const links = readList(record.links, `${path}.links`, errors, MAX_LIST, readLink).filter(
    (link) => hasLocalizedText(link.label) || link.href.length > 0
  );
  const imageAlt = readLocalized(record.imageAlt, `${path}.imageAlt`, errors);

  const project: Project = {
    slug,
    title: readLocalized(record.title, `${path}.title`, errors, true),
    category: readLocalized(record.category, `${path}.category`, errors),
    summary: readLocalized(record.summary, `${path}.summary`, errors),
    problem: readLocalized(record.problem, `${path}.problem`, errors),
    built: readLocalized(record.built, `${path}.built`, errors),
    highlights: readLocalizedArray(record.highlights, `${path}.highlights`, errors),
    tags: readStringArray(record.tags, `${path}.tags`, errors),
  };
  if (links.length > 0) project.links = links;
  if (hasLocalizedText(imageAlt)) project.imageAlt = imageAlt;
  if (record.featured === true) project.featured = true;
  return project;
}

function readExperience(value: unknown, path: string, errors: string[]): ExperienceItem {
  if (!isRecord(value)) errors.push(`${path} must be an object.`);
  const record = isRecord(value) ? value : {};
  if (record.featured !== undefined && typeof record.featured !== "boolean") {
    errors.push(`${path}.featured must be a boolean.`);
  }
  const item: ExperienceItem = {
    role: readLocalized(record.role, `${path}.role`, errors),
    company: readString(record.company, `${path}.company`, errors),
    location: readLocalized(record.location, `${path}.location`, errors),
    date: readLocalized(record.date, `${path}.date`, errors),
    description: readLocalized(record.description, `${path}.description`, errors),
    bullets: readLocalizedArray(record.bullets, `${path}.bullets`, errors),
  };
  // Experience featured is not mutually exclusive — coerce and omit when false.
  if (record.featured === true) item.featured = true;
  return item;
}

function readHonor(value: unknown, path: string, errors: string[]): Honor {
  if (!isRecord(value)) errors.push(`${path} must be an object.`);
  const record = isRecord(value) ? value : {};
  const year = readString(record.year, `${path}.year`, errors);
  if (year.length > MAX_SHORT_STRING) {
    errors.push(`${path}.year is longer than ${MAX_SHORT_STRING} characters.`);
  }
  return {
    title: readLocalized(record.title, `${path}.title`, errors, true),
    detail: readLocalized(record.detail, `${path}.detail`, errors),
    year: year.slice(0, MAX_SHORT_STRING),
  };
}

function readSkillGroup(value: unknown, path: string, errors: string[]): SkillGroup {
  if (!isRecord(value)) errors.push(`${path} must be an object.`);
  const record = isRecord(value) ? value : {};
  return {
    category: readLocalized(record.category, `${path}.category`, errors),
    items: readStringArray(record.items, `${path}.items`, errors),
  };
}

function readAdditionalWork(value: unknown, path: string, errors: string[]): AdditionalWorkItem {
  if (!isRecord(value)) errors.push(`${path} must be an object.`);
  const record = isRecord(value) ? value : {};
  return {
    title: readLocalized(record.title, `${path}.title`, errors),
    category: readLocalized(record.category, `${path}.category`, errors),
    description: readLocalized(record.description, `${path}.description`, errors),
    evidence: readLocalizedArray(record.evidence, `${path}.evidence`, errors),
    tags: readStringArray(record.tags, `${path}.tags`, errors),
  };
}

/**
 * Validates and normalizes an untrusted payload into a `SiteContent`.
 * Objects are rebuilt field-by-field (unknown keys are stripped), strings are
 * trimmed and capped, and structural problems come back as readable errors.
 */
export function validateSiteContent(input: unknown): ValidateResult {
  if (!isRecord(input)) {
    return { ok: false, errors: ["Content must be a JSON object."] };
  }

  const errors: string[] = [];
  const profile = readProfile(input.profile, errors);
  const projects = readList(input.projects, "projects", errors, MAX_PROJECTS, readProject);
  const experience = readList(input.experience, "experience", errors, MAX_LIST, readExperience);
  const honors = readList(input.honors, "honors", errors, MAX_HONORS, readHonor);
  const skills = readList(input.skills, "skills", errors, MAX_LIST, readSkillGroup);
  const additionalWork = readList(
    input.additionalWork,
    "additionalWork",
    errors,
    MAX_LIST,
    readAdditionalWork
  );

  const seenSlugs = new Set<string>();
  for (const project of projects) {
    if (project.slug.length === 0) continue;
    if (seenSlugs.has(project.slug)) {
      errors.push(`Duplicate project slug "${project.slug}" — slugs must be unique.`);
    }
    seenSlugs.add(project.slug);
  }

  // Zero featured projects is fine (the site falls back to the first project).
  if (projects.filter((project) => project.featured).length > 1) {
    errors.push("Only one project can be featured at a time.");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }
  return { ok: true, content: { profile, projects, experience, honors, skills, additionalWork } };
}
