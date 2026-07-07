export type Locale = "en" | "zh";

export const LOCALES: Locale[] = ["en", "zh"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "locale";

/**
 * A translatable value: either a plain string (same in both languages — the
 * shape all committed defaults start as) or a per-locale object. `pick()`
 * resolves it and always falls back to a non-empty value so nothing renders blank.
 */
export type Localized = string | { en?: string; zh?: string };

export function pick(value: Localized | undefined | null, locale: Locale): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return (value[locale] ?? "").trim() || (value.en ?? "").trim() || (value.zh ?? "").trim();
}

/** Immutably set one locale's text, promoting a plain string to an object. */
export function setLocalized(
  value: Localized | undefined,
  locale: Locale,
  next: string
): Localized {
  const base: { en?: string; zh?: string } =
    value && typeof value === "object" ? { ...value } : value ? { en: value } : {};
  base[locale] = next;
  return base;
}

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "zh";
}

/** The `lang` attribute for <html>. */
export function htmlLang(locale: Locale): string {
  return locale === "zh" ? "zh-Hant" : "en";
}

// `resolveLocale` (which reads next/headers) lives in "@/lib/locale.server" so
// this module stays safe to import from client components.

// --- UI chrome dictionary --------------------------------------------------
// Content (projects, about, etc.) is localized in the content store; these are
// the fixed interface strings the components render.

const en = {
  skipToContent: "Skip to content",
  nav: {
    about: "About",
    work: "Work",
    experience: "Experience",
    awards: "Awards",
    skills: "Skills",
    activities: "Community",
    contact: "Contact",
  },
  resume: "Résumé",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  language: { switchTo: "切換到中文", label: "Switch language", short: "中" },
  hero: {
    viewWork: "View work",
    statsProjects: "Projects & builds",
    statsRoles: "Roles held",
    statsAwards: "Awards won",
    portrait: "Portrait",
  },
  about: {
    eyebrow: "About",
    title: "Background",
    education: "Education",
    focus: "Focus",
    languages: "Languages",
    certifications: "Certifications",
    interests: "Interests",
    coursework: "Coursework",
  },
  work: {
    eyebrow: "Work",
    title: "Selected work",
    description: "{n} projects across AI systems, full-stack, and automation. Hover or tap a title to see it.",
    problem: "Problem",
    approach: "Approach",
    featured: "Featured",
    filters: {
      all: "All",
      ai: "AI & ML",
      fullstack: "Full-stack",
      automation: "Automation",
      teaching: "Teaching",
      other: "Other",
    },
    showing: (n: number, scope: string | null) =>
      n === 0
        ? `No projects in ${scope ?? "this filter"}`
        : `Showing ${n} project${n === 1 ? "" : "s"}${scope ? ` in ${scope}` : ""}`,
  },
  experience: {
    eyebrow: "Experience",
    title: "Where I've worked",
    description: "From a co-founded startup to AI support and enterprise IT — across the U.S. and Taiwan.",
  },
  awards: {
    eyebrow: "Awards",
    title: "Recognition",
    description: "Competitions won, scholarships, and national honors.",
  },
  skills: {
    eyebrow: "Skills",
    title: "Toolkit",
    description: "Languages, frameworks, and platforms I work with.",
  },
  activities: {
    eyebrow: "Community",
    title: "Community & leadership",
    description: "Teaching, mentoring, and building student communities.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    emailMe: "Email me",
    connectLinkedin: "Connect on LinkedIn",
    copied: "Copied",
    copyAria: "Copy email address",
    dirEmail: "Email",
    dirPhone: "Phone",
    dirGithub: "GitHub",
    dirLinkedin: "LinkedIn",
    dirLocation: "Location",
  },
  footer: { designedBy: "Designed & built by", top: "Top" },
};

type Dict = typeof en;

const zh: Dict = {
  skipToContent: "跳至主要內容",
  nav: {
    about: "關於",
    work: "作品",
    experience: "經歷",
    awards: "獲獎",
    skills: "技能",
    activities: "社群",
    contact: "聯絡",
  },
  resume: "履歷",
  openMenu: "開啟選單",
  closeMenu: "關閉選單",
  language: { switchTo: "Switch to English", label: "切換語言", short: "EN" },
  hero: {
    viewWork: "查看作品",
    statsProjects: "專案與作品",
    statsRoles: "職務經歷",
    statsAwards: "獲獎次數",
    portrait: "照片",
  },
  about: {
    eyebrow: "關於",
    title: "背景",
    education: "學歷",
    focus: "專注領域",
    languages: "語言",
    certifications: "證照",
    interests: "興趣",
    coursework: "相關課程",
  },
  work: {
    eyebrow: "作品",
    title: "精選作品",
    description: "{n} 個橫跨 AI 系統、全端與自動化的專案。將游標移到標題或點選即可查看。",
    problem: "問題",
    approach: "做法",
    featured: "精選",
    filters: {
      all: "全部",
      ai: "AI 與機器學習",
      fullstack: "全端",
      automation: "自動化",
      teaching: "教學",
      other: "其他",
    },
    showing: (n: number, scope: string | null) =>
      n === 0
        ? `${scope ?? "此分類"}沒有專案`
        : `顯示 ${n} 個專案${scope ? `（${scope}）` : ""}`,
  },
  experience: {
    eyebrow: "經歷",
    title: "工作經歷",
    description: "從共同創立的新創、AI 客服到企業 IT——橫跨美國與台灣。",
  },
  awards: {
    eyebrow: "獲獎",
    title: "獲獎與榮譽",
    description: "競賽獲獎、獎學金與全國性榮譽。",
  },
  skills: {
    eyebrow: "技能",
    title: "技術工具",
    description: "我常用的語言、框架與平台。",
  },
  activities: {
    eyebrow: "社群",
    title: "社群與領導",
    description: "教學、輔導與建立學生社群。",
  },
  contact: {
    eyebrow: "聯絡",
    title: "與我聯絡",
    emailMe: "寄送郵件",
    connectLinkedin: "在 LinkedIn 聯繫",
    copied: "已複製",
    copyAria: "複製電子郵件地址",
    dirEmail: "電子郵件",
    dirPhone: "電話",
    dirGithub: "GitHub",
    dirLinkedin: "LinkedIn",
    dirLocation: "所在地",
  },
  footer: { designedBy: "設計與開發：", top: "回到頂端" },
};

const DICTS: Record<Locale, Dict> = { en, zh };

/** Returns the UI-string dictionary for a locale. */
export function getDict(locale: Locale): Dict {
  return DICTS[locale];
}
