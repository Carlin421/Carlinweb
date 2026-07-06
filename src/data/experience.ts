import type { ExperienceItem } from "@/lib/siteContent";

export const experience: ExperienceItem[] = [
  {
    role: {
      en: "Software Engineering Intern",
      zh: "軟體工程實習生",
    },
    company: "Universal Processing",
    location: {
      en: "New York, NY",
      zh: "美國紐約",
    },
    date: {
      en: "Summer 2026",
      zh: "2026 年夏",
    },
    description: {
      en: "Worked on AI-assisted customer-support automation projects, including retrieval-based support workflows, voice interface prototypes, and internal tooling concepts.",
      zh: "參與 AI 輔助的客服自動化專案，包含以檢索為基礎的客服工作流程、語音介面原型，以及內部工具的概念設計。",
    },
    bullets: [
      {
        en: "Explored retrieval-augmented generation for technical support workflows.",
        zh: "探索將 retrieval-augmented generation (RAG) 應用於技術客服工作流程。",
      },
      {
        en: "Built and tested voice-support prototypes using Twilio, Flask, STT/TTS, and LLM APIs.",
        zh: "使用 Twilio、Flask、STT/TTS 與 LLM API 建置並測試語音客服原型。",
      },
      {
        en: "Investigated support-response quality, retrieval design, and first-turn latency issues.",
        zh: "研究客服回應品質、檢索設計，以及首輪回應延遲問題。",
      },
      {
        en: "Collaborated with technical support and engineering stakeholders to clarify data and workflow requirements.",
        zh: "與技術客服及工程相關人員協作，釐清資料與工作流程需求。",
      },
    ],
  },
  {
    role: {
      en: "Full-Stack Software Engineering Intern",
      zh: "全端軟體工程實習生",
    },
    company: "Shinda Technology",
    location: {
      en: "Taiwan",
      zh: "台灣",
    },
    date: {
      en: "2024",
      zh: "2024 年",
    },
    description: {
      en: "Developed full-stack features for merchant-facing web applications using Angular, ASP.NET Core, and SQL-backed APIs.",
      zh: "使用 Angular、ASP.NET Core 與 SQL 支援的 API，開發面向商家的網頁應用程式全端功能。",
    },
    bullets: [
      {
        en: "Implemented authentication, registration, and form-validation flows.",
        zh: "實作身分驗證、註冊與表單驗證流程。",
      },
      {
        en: "Built frontend components with Angular and TypeScript.",
        zh: "使用 Angular 與 TypeScript 建置前端元件。",
      },
      {
        en: "Integrated frontend pages with ASP.NET Core Web API endpoints.",
        zh: "將前端頁面與 ASP.NET Core Web API 端點整合。",
      },
      {
        en: "Worked with SQL Server, EF Core, Swagger, IIS deployment, and Git Flow.",
        zh: "使用 SQL Server、EF Core、Swagger、IIS 部署與 Git Flow 進行開發。",
      },
    ],
  },
];
