import type { SkillGroup } from "@/lib/siteContent";

export const skills: SkillGroup[] = [
  {
    category: {
      en: "Languages",
      zh: "程式語言",
    },
    items: ["TypeScript", "JavaScript", "Python", "C#", "SQL", "HTML", "CSS"],
  },
  {
    category: {
      en: "Frontend",
      zh: "前端",
    },
    items: ["React", "Next.js", "Angular", "Tailwind CSS", "Bootstrap", "Responsive Design"],
  },
  {
    category: {
      en: "Backend",
      zh: "後端",
    },
    items: ["ASP.NET Core", "Django", "Flask", "REST APIs", "JWT Authentication", "Webhooks"],
  },
  {
    category: {
      en: "AI / Data / Retrieval",
      zh: "AI / 資料 / 檢索",
    },
    items: [
      "LLM APIs",
      "RAG",
      "Embeddings",
      "Hybrid Search",
      "Reranking",
      "Evaluation Sets",
      "Prompt Engineering",
      "YOLO",
      "PyTorch",
      "OpenCV",
    ],
  },
  {
    category: {
      en: "Data Processing / Crawling",
      zh: "資料處理 / 網路爬蟲",
    },
    items: [
      "Pandas",
      "NumPy",
      "Requests",
      "BeautifulSoup",
      "Selenium",
      "Jieba",
      "WordCloud",
      "Folium",
    ],
  },
  {
    category: {
      en: "Databases",
      zh: "資料庫",
    },
    items: ["SQL Server", "MySQL", "Firebase", "SQLite", "PostgreSQL"],
  },
  {
    category: {
      en: "Tools / Platforms",
      zh: "工具 / 平台",
    },
    items: [
      "Git",
      "GitHub",
      "Swagger",
      "IIS",
      "Docker",
      "ngrok",
      "Twilio",
      "Vercel",
      "LINE Messaging API",
      "Google Apps Script",
      "Botpress",
      "Figma",
    ],
  },
];
