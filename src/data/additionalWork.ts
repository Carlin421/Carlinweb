import type { AdditionalWorkItem } from "@/lib/siteContent";

// Localized text authored in English; zh filled by the content pipeline.
export const additionalWork: AdditionalWorkItem[] = [
  {
    title: { en: "Google Developers on Campus, NCNU", zh: "Google Developers on Campus 暨南國際大學" },
    category: { en: "Lead & President · Jul 2024 – Jun 2025", zh: "負責人暨社長・2024 年 7 月 – 2025 年 6 月" },
    description: {
      en: "Led the student developer chapter — building a technical community around AI, cloud, and software.",
      zh: "帶領學生開發者社群，圍繞 AI、雲端與軟體打造技術社群。",
    },
    evidence: [
      {
        en: "Organized 20+ workshops and seminars, reaching 90% student participation.",
        zh: "籌辦 20+ 場工作坊與講座，學生參與率達 90%。",
      },
      {
        en: "Led a 9-member team to ship 3 long-term AI and cloud projects.",
        zh: "帶領 9 人團隊完成 3 個長期 AI 與雲端專案。",
      },
      {
        en: "Partnered across 5 university departments and 4 external partners to widen the chapter's reach.",
        zh: "串連校內 5 個系所與 4 個外部夥伴，擴大社群影響力。",
      },
    ],
    tags: ["GDSC", "Community", "AI & Cloud", "Mentorship", "Leadership"],
  },
  {
    title: { en: "NCNU Yueren Café", zh: "暨南國際大學悅人咖啡" },
    category: { en: "Co-Founder & President · Sep 2023 – Jun 2025", zh: "共同創辦人暨社長・2023 年 9 月 – 2025 年 6 月" },
    description: {
      en: "Co-founded a career-exploration community with university departments and the career center.",
      zh: "與校內系所及職涯中心共同創立生涯探索社群。",
    },
    evidence: [
      {
        en: "Organized 10+ workshops with 16 university collaborators.",
        zh: "與 16 個校內合作單位共同籌辦 10+ 場工作坊。",
      },
      {
        en: "Reached 500+ participants per semester, connecting students facing career challenges with mentors.",
        zh: "每學期觸及 500+ 位參與者，為面臨生涯困惑的學生媒合業師。",
      },
    ],
    tags: ["Community Building", "Career Exploration", "Events", "Leadership"],
  },
  {
    title: { en: "Digital Learning Companions / Rural Service", zh: "數位學伴／偏鄉服務" },
    category: { en: "Organizer · IT Instructor · Tutor · 2020 – 2025", zh: "籌辦人・資訊講師・家教・2020 – 2025 年" },
    description: {
      en: "Ran multi-year rural-service programs, teaching technology to children as a gateway to broaden their horizons.",
      zh: "推動多年期偏鄉服務計畫，透過教導孩童科技為契機，開拓他們的視野。",
    },
    evidence: [
      {
        en: "Organized 10+ on-site rural service activities and delivered 10+ training sessions.",
        zh: "籌辦 10+ 場實地偏鄉服務活動，並開設 10+ 場培訓課程。",
      },
      {
        en: "Taught programming, drones, AI-in-education, and creative technology, plus core subjects.",
        zh: "教授程式設計、無人機、AI 教育應用與創意科技，並輔導核心學科。",
      },
      {
        en: "Recognized as a National Outstanding University Mentor by Taiwan's Ministry of Education.",
        zh: "獲教育部評選為全國傑出大專輔導員。",
      },
    ],
    tags: ["Education", "Teaching", "Service", "Programming", "Drones"],
  },
];
