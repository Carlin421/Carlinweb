import type { Localized } from "@/lib/i18n";
import type { Profile } from "@/lib/siteContent";

export const profile: Omit<Profile, "focusAreas"> = {
  name: "Carlin Hou",
  title: {
    en: "Software Engineer | Incoming MSI Student at University of Michigan",
    zh: "軟體工程師 | 密西根大學 MSI 準研究生",
  },
  shortIntro: {
    en: "I'm a software engineer who likes the messy middle — where real workflows, real users, and half-broken data actually meet. Lately that's been AI support systems and retrieval tools; before that, LINE chatbots, a campus sponsorship platform, and a web-crawling course I built and taught from scratch. I came into engineering from information management and finance in Taiwan, and I still care most about the part most people skip: making the complicated thing genuinely usable.",
    zh: "我是一名軟體工程師，喜歡待在最混亂的中間地帶——真實的流程、真實的使用者，還有一堆殘缺資料真正交會的地方。最近我在做 AI 客服系統與檢索工具；在那之前，我寫過 LINE 聊天機器人、一個校園贊助媒合平台，也從零開始設計並教了一門網路爬蟲課。我從台灣的資訊管理與財金背景一路走進工程，到現在最在意的，仍是多數人會略過的那一步：把複雜的東西，做到真的好用。",
  },
  searchStatus: {
    en: "Currently looking for 2027 summer internship opportunities in software engineering, AI engineering, backend systems, and ML infrastructure.",
    zh: "目前正在尋找 2027 年暑期實習機會，領域涵蓋軟體工程、AI 工程、後端系統與 ML 基礎架構。",
  },
  availability: {
    en: "Open to 2027 summer internships",
    zh: "開放 2027 暑期實習",
  },
  location: {
    en: "Based in the U.S.",
    zh: "現居美國",
  },
  email: "YOUR_EMAIL_HERE",
  github: "https://github.com/Carlin421",
  linkedin: "https://www.linkedin.com/in/carlin-hou-036212293/",
  resume: "/resume.pdf",
  photo: "",
  about: [
    {
      en: "I am an incoming Master of Science in Information student at the University of Michigan with experience in full-stack development, AI-assisted systems, and real-world software projects.",
      zh: "我是密西根大學資訊科學碩士 (MSI) 的準研究生，具備全端開發、AI 輔助系統以及實際軟體專案的經驗。",
    },
    {
      en: "Recently, I worked on customer-support automation projects involving retrieval-augmented generation, voice interfaces, and LLM-based workflow tools during a software engineering internship in New York.",
      zh: "近期我在美國紐約的軟體工程實習中，參與客服自動化專案，涵蓋 retrieval-augmented generation (RAG)、語音介面，以及以 LLM 為核心的工作流程工具。",
    },
    {
      en: "My current interests are software engineering, ML infrastructure, retrieval systems, backend development, and AI products that improve operational efficiency.",
      zh: "我目前的興趣是軟體工程、ML 基礎架構、檢索系統、後端開發，以及能提升營運效率的 AI 產品。",
    },
  ],
  education: [
    {
      school: {
        en: "University of Michigan",
        zh: "密西根大學",
      },
      degree: {
        en: "Master of Science in Information",
        zh: "資訊科學碩士 (MSI)",
      },
      detail: {
        en: "Incoming student, Fall 2026",
        zh: "2026 秋季入學",
      },
    },
    {
      school: {
        en: "National Chi Nan University",
        zh: "國立暨南國際大學",
      },
      degree: {
        en: "Information Management major, Finance minor",
        zh: "資訊管理系主修，財務金融輔系",
      },
      detail: {
        en: "Undergraduate background",
        zh: "大學背景",
      },
    },
  ],
};

export const focusAreas: Localized[] = [
  {
    en: "AI-assisted support systems",
    zh: "AI 輔助客服系統",
  },
  {
    en: "Retrieval pipelines",
    zh: "檢索流程",
  },
  {
    en: "Backend infrastructure",
    zh: "後端基礎架構",
  },
  {
    en: "Voice interfaces",
    zh: "語音介面",
  },
  {
    en: "Full-stack products",
    zh: "全端產品",
  },
];

// Any value still left as a "YOUR_..._HERE" placeholder is treated as unset so the
// UI can hide it instead of shipping a broken link/mailto. Fill the real value into
// `profile` above and the corresponding link appears automatically.
const isPlaceholder = (value: string) =>
  value.includes("YOUR_") || value.includes("_HERE");

export const socials = {
  email: isPlaceholder(profile.email) ? null : profile.email,
  github: isPlaceholder(profile.github) ? null : profile.github,
  linkedin: isPlaceholder(profile.linkedin) ? null : profile.linkedin,
};
