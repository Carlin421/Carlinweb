import type { ExperienceItem } from "@/lib/siteContent";

// Localized text is authored in English; the zh translations are filled in by
// the content pipeline (falls back to English until then).
export const experience: ExperienceItem[] = [
  {
    role: { en: "Software Engineer Intern", zh: "軟體工程實習生" },
    company: "Universal Processing LLC",
    location: { en: "New York, NY", zh: "美國紐約" },
    date: { en: "Jun 2026 – Present", zh: "2026 年 6 月 – 至今" },
    description: {
      en: "Building AI-assisted customer-support tooling — using retrieval-augmented generation to help technical support teams resolve merchant issues faster.",
      zh: "開發 AI 輔助的客服工具——運用檢索增強生成（RAG）協助技術支援團隊更快解決商家問題。",
    },
    bullets: [
      {
        en: "Developing an AI-powered technical-support assistant with RAG to surface merchant wiki entries, past support resolutions, and account context for support agents.",
        zh: "開發以 RAG 為核心的 AI 技術支援助理，為客服人員即時呈現商家 wiki 條目、過往支援解法與帳戶脈絡。",
      },
      {
        en: "Profiled first-turn latency across RAG context building, embeddings, and LLM client init; identified lazy Gemini client initialization as the main bottleneck and proposed startup-time initialization.",
        zh: "剖析 RAG 脈絡建構、嵌入運算與 LLM 用戶端初始化的首次回應延遲；找出 Gemini 用戶端延遲初始化為主要瓶頸，並提出於啟動時預先初始化的方案。",
      },
      {
        en: "Work with support stakeholders to scope knowledge-base needs and define reliable, non-technical-facing answers.",
        zh: "與客服相關人員合作釐清知識庫需求，並定義可靠且非技術導向的回覆內容。",
      },
    ],
  },
  {
    role: { en: "Co-Founder & Tech Lead", zh: "共同創辦人暨技術負責人" },
    company: "Zanny Studio",
    location: { en: "Taichung, Taiwan", zh: "台灣台中" },
    date: { en: "May 2025 – Present", zh: "2025 年 5 月 – 至今" },
    description: {
      en: "Co-founded a registered startup: an AI-enabled platform connecting student organizations with corporate sponsors.",
      zh: "共同創立一家立案新創：一個串連學生組織與企業贊助商的 AI 平台。",
    },
    bullets: [
      {
        en: "Secured NT$500,000 in competitive seed funding from Taiwan's Ministry of Education U-Start Program.",
        zh: "取得教育部 U-Start 計畫 NT$50 萬競爭型種子資金。",
      },
      {
        en: "Architected and built a full-stack platform (Django, SQL, AI chatbot) for sponsorship workflows and user interaction.",
        zh: "設計並建置全端平台（Django、SQL、AI 聊天機器人），支援贊助流程與使用者互動。",
      },
      {
        en: "Scoped product requirements across both student-organization and corporate-sponsor stakeholders.",
        zh: "整合學生組織與企業贊助商雙方需求，釐清產品規格。",
      },
      {
        en: "Launched WishRail, a nationwide university gifting platform delivering chocolate and handwritten wishes.",
        zh: "推出 WishRail，一個橫跨全國大學、寄送巧克力與手寫祝福的送禮平台。",
      },
    ],
    featured: true,
  },
  {
    role: { en: "IT Help Desk", zh: "IT 服務台" },
    company: "Allianz Taiwan Life Insurance",
    location: { en: "Taipei, Taiwan", zh: "台灣台北" },
    date: { en: "Sep 2025 – Jan 2026", zh: "2025 年 9 月 – 2026 年 1 月" },
    description: {
      en: "Infrastructure operations and IT automation for an enterprise insurer.",
      zh: "為一家企業級保險公司負責基礎架構維運與 IT 自動化。",
    },
    bullets: [
      {
        en: "Designed and maintained Windows .bat automation for one-click packaging, setup, and restart — cutting deployment time by 70% and reducing manual errors.",
        zh: "設計並維護 Windows .bat 自動化腳本，實現一鍵打包、安裝與重啟——將部署時間縮短 70% 並降低人為錯誤。",
      },
      {
        en: "Supported infrastructure operations: server monitoring, troubleshooting, and documentation.",
        zh: "支援基礎架構維運：伺服器監控、故障排除與文件撰寫。",
      },
      {
        en: "Resolved office IT issues across hardware, software, network, and access requests.",
        zh: "解決辦公室在硬體、軟體、網路與權限申請等各類 IT 問題。",
      },
    ],
  },
  {
    role: { en: "IT Intern", zh: "IT 實習生" },
    company: "ManpowerGroup Taiwan",
    location: { en: "Taipei, Taiwan", zh: "台灣台北" },
    date: { en: "Jul 2024 – Apr 2025", zh: "2024 年 7 月 – 2025 年 4 月" },
    description: {
      en: "IT project management and data-center operations for a global staffing firm.",
      zh: "為一家全球人力資源公司負責 IT 專案管理與資料中心維運。",
    },
    bullets: [
      {
        en: "Project-managed internal system enhancements (incl. HR interview & exam management): led requirements workshops, drafted PRDs and BPMN flowcharts, prioritized backlog, and aligned HR–IT stakeholders.",
        zh: "專案管理內部系統優化（含 HR 面試與考試管理）：主持需求討論會、撰寫 PRD 與 BPMN 流程圖、排定需求優先順序，並協調 HR 與 IT 相關人員。",
      },
      {
        en: "Supported ISO 27001 with security-metric monitoring and documentation (SOPs, access logs, change records).",
        zh: "協助 ISO 27001 資安管理，進行安全指標監控與文件維護（SOP、存取紀錄、變更紀錄）。",
      },
      {
        en: "Managed servers, NAS, firewalls, and hyper-converged infrastructure; supported 150+ users with a 99% satisfaction rate.",
        zh: "管理伺服器、NAS、防火牆與超融合基礎架構；支援 150+ 名使用者並維持 99% 滿意度。",
      },
    ],
  },
  {
    role: { en: "Full-Stack Engineer Intern", zh: "全端工程實習生" },
    company: "Shinspire Tech",
    location: { en: "Taipei, Taiwan", zh: "台灣台北" },
    date: { en: "Feb 2024 – Jun 2024", zh: "2024 年 2 月 – 2024 年 6 月" },
    description: {
      en: "Full-stack web development for investment and commercial-bidding clients.",
      zh: "為投資與商業標案客戶進行全端網站開發。",
    },
    bullets: [
      {
        en: "Built responsive UI with HTML, CSS, JavaScript, and Angular, ensuring cross-browser compatibility.",
        zh: "以 HTML、CSS、JavaScript 與 Angular 打造響應式介面，並確保跨瀏覽器相容性。",
      },
      {
        en: "Developed RESTful APIs with C#/.NET Core and SQL-backed data workflows.",
        zh: "以 C#/.NET Core 開發 RESTful API，並建置以 SQL 為基礎的資料流程。",
      },
      {
        en: "Maintained client investment and commercial-bidding websites, improving reliability and information accuracy.",
        zh: "維護客戶的投資與商業標案網站，提升穩定性與資訊正確性。",
      },
    ],
  },
];
