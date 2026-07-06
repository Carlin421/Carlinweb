export type Project = {
  /**
   * Stable identifier used to resolve this project's image.
   * The image is loaded automatically from (in priority order):
   *   1. a Vercel Blob uploaded via the /admin page, stored at `projects/<slug>`
   *   2. a committed file at `public/projects/<slug>.<ext>`
   * To change a project image you never edit code: upload it on /admin, or drop a
   * file named `<slug>.webp` (or .png/.jpg) into `public/projects/` and redeploy.
   */
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  built: string;
  highlights: string[];
  tags: string[];
  links?: {
    label: string;
    href: string;
  }[];
  /** Alt text for the resolved image. Falls back to a generated description. */
  imageAlt?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "customer-service-rag-assistant",
    title: "Customer Service RAG Assistant",
    category: "AI Systems / Retrieval / Internal Tools",
    summary:
      "Built an AI-assisted support system prototype to help technical support teams retrieve merchant-specific information and past issue resolutions more efficiently.",
    problem:
      "Technical support teams often need to search across internal knowledge bases, past support cases, merchant records, and fragmented documentation while handling customer issues. This creates slow response times and inconsistent support quality.",
    built:
      "Designed a retrieval-augmented support assistant that uses structured context from internal knowledge sources to generate more grounded and useful support responses.",
    highlights: [
      "Designed a retrieval pipeline for internal support knowledge.",
      "Explored document chunking, hybrid search, reranking, and evaluation set design.",
      "Integrated LLM-generated responses with retrieved support context.",
      "Investigated first-turn latency and optimized Gemini client initialization behavior.",
      "Considered response quality evaluation for customer-support scenarios.",
    ],
    tags: [
      "RAG",
      "LLM",
      "Gemini API",
      "Python",
      "Retrieval",
      "Hybrid Search",
      "Reranking",
      "Evaluation",
    ],
    featured: true,
  },
  {
    slug: "ai-tennis-analysis",
    title: "AI Tennis Match Analysis",
    category: "Computer Vision / Deep Learning / Sports Analytics",
    summary:
      "Built a deep-learning based tennis analysis system that detects players, tracks court geometry, visualizes shot trajectories, and extracts match-level movement data.",
    problem:
      "Tennis video analysis is difficult because the system needs to understand moving players, court boundaries, ball trajectory, and whether shots land inside or outside the court from broadcast footage.",
    built:
      "Implemented a computer-vision pipeline using object detection, court keypoint localization, trajectory visualization, and data processing to analyze tennis rallies from video frames.",
    highlights: [
      "Used YOLO for detecting dynamic objects such as players and tennis balls.",
      "Used PyTorch and OpenCV to detect and localize court key lines for in/out judgment.",
      "Visualized shot trajectories directly on the tennis court view.",
      "Processed match data such as ball speed, court position, and player running distance.",
      "Combined model inference, geometric reasoning, and Pandas-based data analysis in one workflow.",
    ],
    tags: ["YOLO", "PyTorch", "OpenCV", "Python", "NumPy", "Pandas", "Computer Vision"],
    imageAlt:
      "AI tennis match analysis project slide showing court detection and player tracking screenshots.",
  },
  {
    slug: "zanny-sponsorship-platform",
    title: "Zanny Campus Sponsorship Platform",
    category: "Full-Stack Product / Campus Partnership Platform",
    summary:
      "Built a full-stack sponsorship matching platform for companies and campus organizations, with posting, AI writing assistance, messaging, membership, and admin-review workflows.",
    problem:
      "Campus sponsorship collaboration often depends on fragmented messages, manual negotiation, and unclear approval flows between companies and student organizations.",
    built:
      "Developed a web platform that centralizes sponsorship posts, communication, member access, and administrative review to make the collaboration process easier to manage.",
    highlights: [
      "Implemented a public-facing sponsorship listing and browsing experience.",
      "Built member registration/login and admin permission-review flows.",
      "Integrated AI copywriting support through GPT-4o and Botpress-style chatbot interaction.",
      "Used Django and Python for backend application logic, with MySQL/Firebase data storage.",
      "Designed the interface and collaboration flow with Figma, Bootstrap, and JavaScript.",
    ],
    tags: [
      "Django",
      "Python",
      "JavaScript",
      "Bootstrap",
      "MySQL",
      "Firebase",
      "GPT-4o",
      "Botpress",
      "Figma",
    ],
    links: [
      {
        label: "Live Site",
        href: "https://zanny.net",
      },
    ],
    imageAlt:
      "Zanny campus sponsorship platform slide showing platform screenshots and chatbot interface.",
  },
  {
    slug: "voice-support-twilio",
    title: "Voice Support Demo with Twilio",
    category: "Voice AI / System Integration / Customer Support",
    summary:
      "Developed a voice-based support demo using Twilio, Flask, STT/TTS, and LLM APIs to explore phone-based customer service automation.",
    problem:
      "Many customer-support workflows still happen through phone calls. To make AI support useful in this context, the system needs to handle voice input, speech recognition, response generation, and call flow integration.",
    built:
      "Built a prototype that connects phone-call flows with speech-to-text, text-to-speech, and LLM-based response generation.",
    highlights: [
      "Built outbound call and webhook flows using Twilio and Flask.",
      "Used ngrok for local webhook testing.",
      "Tested multilingual speech-recognition scenarios involving English and Mandarin.",
      "Connected voice input to LLM-based response generation.",
      "Debugged callback URL, deployment, environment variable, and API-integration issues.",
    ],
    tags: ["Twilio", "Flask", "Python", "STT", "TTS", "LLM", "Webhooks", "ngrok"],
  },
  {
    slug: "merchant-platform",
    title: "Merchant Platform Full-Stack Features",
    category: "Full-Stack Engineering / Web Application",
    summary:
      "Implemented full-stack features for a merchant-facing web platform using Angular, ASP.NET Core, SQL Server, and JWT authentication.",
    problem:
      "Merchant-facing platforms need reliable account flows, form validation, payment-related search interfaces, authentication handling, and API-backed data views.",
    built:
      "Developed production-style web application features across frontend, backend API integration, authentication, and database-backed workflows.",
    highlights: [
      "Built registration, login, token interceptor, and form validation flows.",
      "Implemented API-backed search and data-display features.",
      "Worked on merchant account and payment-link related interfaces.",
      "Integrated frontend Angular components with ASP.NET Core Web API endpoints.",
      "Used Swagger, IIS, Git Flow, and database-backed development workflows.",
    ],
    tags: [
      "Angular",
      "TypeScript",
      "ASP.NET Core",
      "C#",
      ".NET 7",
      "EF Core",
      "SQL Server",
      "JWT",
      "Swagger",
      "IIS",
    ],
  },
  {
    slug: "security-escape-linebot",
    title: "Cybersecurity Escape Room LINE Bot",
    category: "Automation / LINE Bot / Educational Game",
    summary:
      "Built an automated LINE Bot for a cybersecurity escape-room activity, connecting question delivery, answer checking, hint logic, and progress data through Google Apps Script.",
    problem:
      "In-person educational games can be hard to run manually because facilitators need to distribute questions, check answers, send hints, and track participant progress at the same time.",
    built:
      "Designed a LINE Messaging API workflow that automates the game flow and connects bot interactions with a spreadsheet-style question database.",
    highlights: [
      "Implemented user-facing interactions through LINE Official Account and LINE Messaging API.",
      "Used Google Apps Script to handle routing logic, answer validation, and data transfer.",
      "Connected the bot to a structured question database for game content and progress tracking.",
      "Automated question dispatch, answer judgment, and hint delivery.",
      "Improved the operational flow for facilitators running the cybersecurity activity.",
    ],
    tags: ["LINE Messaging API", "Google Apps Script", "JavaScript", "Automation", "Chatbot"],
    imageAlt:
      "Cybersecurity escape room LINE Bot slide showing LINE interaction and spreadsheet database screenshots.",
  },
  {
    slug: "admissions-choice-linebot",
    title: "Admissions Choice Game LINE Bot",
    category: "Automation / LINE Bot / Campus Engagement",
    summary:
      "Built an interactive LINE Bot quiz game for admissions and campus engagement, guiding users through choice questions, campus information, and reward interactions.",
    problem:
      "Admissions outreach needs a more interactive way to introduce campus spaces and information than static posts or long informational pages.",
    built:
      "Created a LINE Bot experience that presents campus-related questions, validates choices, sends follow-up information, and connects with Firebase-backed data flow.",
    highlights: [
      "Built an interactive multiple-choice flow inside LINE.",
      "Used Firebase as the data layer for game content and user progress.",
      "Used Google Apps Script and JavaScript to manage bot logic and data transfer.",
      "Delivered campus information through conversational UI and image-based prompts.",
      "Supported reward-style interaction through LINE Official Account coupon features.",
    ],
    tags: ["LINE Messaging API", "Firebase", "Google Apps Script", "JavaScript", "Automation"],
    imageAlt:
      "Admissions choice game LINE Bot slide showing campus quiz interactions and reward screenshots.",
  },
  {
    slug: "web-crawling-course",
    title: "Web Crawling and Data Analysis Course",
    category: "Data Engineering / Teaching / Applied Analytics",
    summary:
      "Designed and taught a practical course that takes learners from web crawling fundamentals to basic data analysis and visualization projects.",
    problem:
      "Non-CS learners often need a concrete path from simple web data collection to useful analysis without getting lost in abstract programming details.",
    built:
      "Created teaching materials and project examples covering HTML basics, Python crawling, scraping principles, no-code crawling tools, text analysis, mapping, and visualization.",
    highlights: [
      "Taught Requests, BeautifulSoup, Selenium, and Octoparse for data collection.",
      "Used Pandas and Jieba for data cleaning, processing, and Chinese text analysis.",
      "Built example projects including 104 job scraping, convenience-store competition analysis, and news keyword word clouds.",
      "Used WordCloud and Folium to turn raw data into visual outputs.",
      "Translated technical topics into beginner-friendly teaching flow for business-oriented learners.",
    ],
    tags: [
      "Python",
      "Requests",
      "BeautifulSoup",
      "Selenium",
      "Pandas",
      "Jieba",
      "WordCloud",
      "Folium",
      "Octoparse",
    ],
    imageAlt:
      "Web crawling and data analysis course slide showing maps, word clouds, spreadsheet data, and course modules.",
  },
  {
    slug: "linkedu",
    title: "LinkEDU",
    category: "Education / Public Engagement / Leadership",
    summary:
      "Co-founded an education advocacy and campus action project focused on education resource inequality, rural student representation, and public engagement.",
    problem:
      "Education policy issues such as evaluation systems, resource inequality, and rural student representation are often difficult for the public to understand and engage with.",
    built:
      "Helped turn abstract education issues into accessible public-facing materials, campus engagement activities, and collaborative advocacy work.",
    highlights: [
      "Co-founded the project with peers.",
      "Translated education policy issues into understandable public materials.",
      "Designed surveys, storytelling content, and campus engagement activities.",
      "Worked on public communication around education resource inequality and rural student representation.",
      "Demonstrated leadership, collaboration, and civic-tech/product-thinking potential.",
    ],
    tags: [
      "Leadership",
      "Public Engagement",
      "Education Equity",
      "Research",
      "Storytelling",
      "Project Design",
    ],
  },
];
