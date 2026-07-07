import type { Localized } from "@/lib/i18n";
import type { Profile } from "@/lib/siteContent";

export const profile: Omit<Profile, "focusAreas"> = {
  name: "Carlin Hou",
  title: {
    en: "Software Engineer | Incoming MSI Student at University of Michigan",
    zh: "軟體工程師 | 密西根大學 MSI 準研究生",
  },
  tagline: {
    en: "AI application builder & software engineer",
    zh: "AI 應用開發者與軟體工程師",
  },
  shortIntro: {
    en: "I'm a software engineer who likes the messy middle — where real workflows, real users, and half-broken data actually meet. Lately that's been AI support systems and retrieval tools; before that, LINE chatbots, a campus sponsorship platform I co-founded into a funded startup, and a web-crawling course I built and taught from scratch. I came into engineering from information management and finance in Taiwan, and I still care most about the part most people skip: making the complicated thing genuinely usable.",
    zh: "我是一名軟體工程師，喜歡待在最混亂的中間地帶——真實的流程、真實的使用者，還有一堆殘缺資料真正交會的地方。最近我在做 AI 客服系統與檢索工具；在那之前，我寫過 LINE 聊天機器人、把一個校園贊助平台共同創立成拿到資金的新創，也從零開始設計並教了一門網路爬蟲課。我從台灣的資訊管理與財金背景一路走進工程，到現在最在意的，仍是多數人會略過的那一步：把複雜的東西，做到真的好用。",
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
    en: "New York, NY",
    zh: "美國紐約",
  },
  email: "carlin42605@gmail.com",
  phone: "+1 312 617 4950",
  github: "https://github.com/Carlin421",
  linkedin: "https://www.linkedin.com/in/carlin-hou-036212293/",
  resume: "/resume.pdf",
  photo: "",
  about: [
    {
      en: "I'm an incoming Master of Science in Information student at the University of Michigan, with a background spanning full-stack development, AI-assisted systems, IT infrastructure, and real-world software projects across the U.S. and Taiwan.",
      zh: "我是密西根大學資訊科學碩士 (MSI) 的準研究生，背景橫跨全端開發、AI 輔助系統、IT 基礎架構，以及在美國與台灣的實際軟體專案。",
    },
    {
      en: "I co-founded Zanny Studio, a funded startup, and most recently worked on customer-support automation with retrieval-augmented generation during a software engineering internship in New York.",
      zh: "我共同創立了拿到資金的新創 Zanny Studio，並於近期在紐約的軟體工程實習中，投入以 retrieval-augmented generation (RAG) 打造的客服自動化。",
    },
    {
      en: "I care about software engineering, ML infrastructure, retrieval systems, and AI products for education, workforce development, and community-serving organizations — and I like teaching the technical to non-technical audiences.",
      zh: "我關注軟體工程、ML 基礎架構、檢索系統，以及應用於教育、人才培育與服務型組織的 AI 產品，也喜歡把技術講給非技術背景的人聽。",
    },
  ],
  education: [
    {
      school: { en: "University of Michigan", zh: "密西根大學" },
      degree: { en: "Master of Science in Information", zh: "資訊科學碩士 (MSI)" },
      detail: { en: "Incoming · Aug 2026 – May 2028", zh: "準研究生 · 2026 年 8 月 – 2028 年 5 月" },
      notes: [{ en: "50% merit scholarship", zh: "50% 優秀獎學金" }],
    },
    {
      school: { en: "National Chi Nan University", zh: "國立暨南國際大學" },
      degree: {
        en: "B.B.A. in Information Management, Finance minor",
        zh: "資訊管理學士，財務金融輔系",
      },
      detail: { en: "Sep 2021 – Jun 2025 · Nantou, Taiwan", zh: "2021 年 9 月 – 2025 年 6 月 · 台灣南投" },
      notes: [
        { en: "GPA 3.61 / 4.0", zh: "GPA 3.61 / 4.0" },
        {
          en: "Academic Excellence Award — top 5% of department",
          zh: "學業優秀獎——系上前 5%",
        },
        {
          en: "Coursework: OOP, DBMS, Systems Analysis & Design, Data Analysis & Visualization, Linux Administration",
          zh: "修習課程：物件導向程式設計、資料庫管理、系統分析與設計、資料分析與視覺化、Linux 系統管理",
        },
      ],
    },
  ],
  languages: [
    { en: "Mandarin — native", zh: "中文——母語" },
    { en: "English — fluent (IELTS 7.5)", zh: "英文——流利（IELTS 7.5）" },
  ],
  certifications: [
    { en: "Google Analytics Certification", zh: "Google Analytics 認證" },
    { en: "Remote Pilot Certificate (drone)", zh: "無人機操作證（普通）" },
  ],
  interests: [
    { en: "Tennis — school team captain", zh: "網球——校隊隊長" },
    { en: "Volleyball — department captain", zh: "排球——系隊隊長" },
    { en: "Photography & aerial photography", zh: "攝影與空拍" },
    { en: "Cooking", zh: "料理" },
    { en: "Film editing", zh: "影片剪輯" },
  ],
};

export const focusAreas: Localized[] = [
  { en: "AI-assisted support systems", zh: "AI 輔助客服系統" },
  { en: "Retrieval pipelines", zh: "檢索流程" },
  { en: "Full-stack products", zh: "全端產品" },
  { en: "IT & infrastructure", zh: "IT 與基礎架構" },
  { en: "Technical teaching", zh: "技術教學" },
];

// Any value still left as a "YOUR_..._HERE" placeholder is treated as unset so the
// UI can hide it instead of shipping a broken link/mailto.
const isPlaceholder = (value: string) => value.includes("YOUR_") || value.includes("_HERE");

export const socials = {
  email: isPlaceholder(profile.email) ? null : profile.email,
  github: isPlaceholder(profile.github) ? null : profile.github,
  linkedin: isPlaceholder(profile.linkedin) ? null : profile.linkedin,
};
