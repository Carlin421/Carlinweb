export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "C#", "SQL", "HTML", "CSS"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Angular", "Tailwind CSS", "Bootstrap", "Responsive Design"],
  },
  {
    category: "Backend",
    items: ["ASP.NET Core", "Django", "Flask", "REST APIs", "JWT Authentication", "Webhooks"],
  },
  {
    category: "AI / Data / Retrieval",
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
    category: "Data Processing / Crawling",
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
    category: "Databases",
    items: ["SQL Server", "MySQL", "Firebase", "SQLite", "PostgreSQL"],
  },
  {
    category: "Tools / Platforms",
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
