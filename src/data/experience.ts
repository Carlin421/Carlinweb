export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  date: string;
  description: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineering Intern",
    company: "Universal Processing",
    location: "New York, NY",
    date: "Summer 2026",
    description:
      "Worked on AI-assisted customer-support automation projects, including retrieval-based support workflows, voice interface prototypes, and internal tooling concepts.",
    bullets: [
      "Explored retrieval-augmented generation for technical support workflows.",
      "Built and tested voice-support prototypes using Twilio, Flask, STT/TTS, and LLM APIs.",
      "Investigated support-response quality, retrieval design, and first-turn latency issues.",
      "Collaborated with technical support and engineering stakeholders to clarify data and workflow requirements.",
    ],
  },
  {
    role: "Full-Stack Software Engineering Intern",
    company: "Shinda Technology",
    location: "Taiwan",
    date: "2024",
    description:
      "Developed full-stack features for merchant-facing web applications using Angular, ASP.NET Core, and SQL-backed APIs.",
    bullets: [
      "Implemented authentication, registration, and form-validation flows.",
      "Built frontend components with Angular and TypeScript.",
      "Integrated frontend pages with ASP.NET Core Web API endpoints.",
      "Worked with SQL Server, EF Core, Swagger, IIS deployment, and Git Flow.",
    ],
  },
];
