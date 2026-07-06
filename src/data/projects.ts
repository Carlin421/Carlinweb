import type { Project } from "@/lib/siteContent";

export const projects: Project[] = [
  {
    slug: "customer-service-rag-assistant",
    title: {
      en: "Customer Service RAG Assistant",
      zh: "客服 RAG 助理",
    },
    category: {
      en: "AI Systems / Retrieval / Internal Tools",
      zh: "AI 系統 / 檢索 / 內部工具",
    },
    summary: {
      en: "Built an AI-assisted support system prototype to help technical support teams retrieve merchant-specific information and past issue resolutions more efficiently.",
      zh: "打造一套 AI 輔助客服系統原型，協助技術客服團隊更有效率地檢索特定商家資訊與過往問題的處理方式。",
    },
    problem: {
      en: "Technical support teams often need to search across internal knowledge bases, past support cases, merchant records, and fragmented documentation while handling customer issues. This creates slow response times and inconsistent support quality.",
      zh: "技術客服團隊在處理客戶問題時，往往需要橫跨內部知識庫、過往客服案例、商家紀錄與零散文件進行搜尋，導致回應速度慢且客服品質不一致。",
    },
    built: {
      en: "Designed a retrieval-augmented support assistant that uses structured context from internal knowledge sources to generate more grounded and useful support responses.",
      zh: "設計一套 retrieval-augmented 客服助理，運用內部知識來源的結構化脈絡，生成更有依據且實用的客服回應。",
    },
    highlights: [
      {
        en: "Designed a retrieval pipeline for internal support knowledge.",
        zh: "設計一套用於內部客服知識庫的檢索流程。",
      },
      {
        en: "Explored document chunking, hybrid search, reranking, and evaluation set design.",
        zh: "探索文件切塊 (chunking)、hybrid search、reranking 與評估集 (evaluation set) 的設計。",
      },
      {
        en: "Integrated LLM-generated responses with retrieved support context.",
        zh: "將 LLM 生成的回應與檢索到的客服脈絡整合。",
      },
      {
        en: "Investigated first-turn latency and optimized Gemini client initialization behavior.",
        zh: "研究首輪回應延遲，並優化 Gemini client 的初始化行為。",
      },
      {
        en: "Considered response quality evaluation for customer-support scenarios.",
        zh: "針對客服情境評估回應品質。",
      },
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
    title: {
      en: "AI Tennis Match Analysis",
      zh: "AI 網球賽事分析",
    },
    category: {
      en: "Computer Vision / Deep Learning / Sports Analytics",
      zh: "電腦視覺 / 深度學習 / 運動分析",
    },
    summary: {
      en: "Built a deep-learning based tennis analysis system that detects players, tracks court geometry, visualizes shot trajectories, and extracts match-level movement data.",
      zh: "打造一套以深度學習為基礎的網球分析系統，可偵測球員、追蹤球場幾何、視覺化擊球軌跡，並擷取賽事層級的移動資料。",
    },
    problem: {
      en: "Tennis video analysis is difficult because the system needs to understand moving players, court boundaries, ball trajectory, and whether shots land inside or outside the court from broadcast footage.",
      zh: "網球影片分析相當困難，因為系統必須從轉播畫面中理解移動的球員、球場邊界、球的軌跡，以及擊球落點是否出界。",
    },
    built: {
      en: "Implemented a computer-vision pipeline using object detection, court keypoint localization, trajectory visualization, and data processing to analyze tennis rallies from video frames.",
      zh: "以物件偵測、球場關鍵點定位、軌跡視覺化與資料處理，實作一條電腦視覺流程，從影片影格分析網球來回對打。",
    },
    highlights: [
      {
        en: "Used YOLO for detecting dynamic objects such as players and tennis balls.",
        zh: "使用 YOLO 偵測球員與網球等動態物件。",
      },
      {
        en: "Used PyTorch and OpenCV to detect and localize court key lines for in/out judgment.",
        zh: "使用 PyTorch 與 OpenCV 偵測並定位球場關鍵線，以判定球是否出界。",
      },
      {
        en: "Visualized shot trajectories directly on the tennis court view.",
        zh: "在網球場視角上直接視覺化擊球軌跡。",
      },
      {
        en: "Processed match data such as ball speed, court position, and player running distance.",
        zh: "處理球速、球場位置與球員跑動距離等賽事資料。",
      },
      {
        en: "Combined model inference, geometric reasoning, and Pandas-based data analysis in one workflow.",
        zh: "在單一工作流程中結合模型推論、幾何推理與以 Pandas 為基礎的資料分析。",
      },
    ],
    tags: ["YOLO", "PyTorch", "OpenCV", "Python", "NumPy", "Pandas", "Computer Vision"],
    imageAlt: {
      en: "AI tennis match analysis project slide showing court detection and player tracking screenshots.",
      zh: "AI 網球賽事分析專案投影片，展示球場偵測與球員追蹤的截圖。",
    },
  },
  {
    slug: "zanny-sponsorship-platform",
    title: {
      en: "Zanny Campus Sponsorship Platform",
      zh: "Zanny 校園贊助媒合平台",
    },
    category: {
      en: "Full-Stack Product / Campus Partnership Platform",
      zh: "全端產品 / 校園合作平台",
    },
    summary: {
      en: "Built a full-stack sponsorship matching platform for companies and campus organizations, with posting, AI writing assistance, messaging, membership, and admin-review workflows.",
      zh: "打造一個面向企業與校園社團的全端贊助媒合平台，具備刊登、AI 寫作輔助、訊息、會員與後台審核等工作流程。",
    },
    problem: {
      en: "Campus sponsorship collaboration often depends on fragmented messages, manual negotiation, and unclear approval flows between companies and student organizations.",
      zh: "校園贊助合作往往仰賴零散的訊息、人工協商，以及企業與學生社團之間不明確的審核流程。",
    },
    built: {
      en: "Developed a web platform that centralizes sponsorship posts, communication, member access, and administrative review to make the collaboration process easier to manage.",
      zh: "開發一個網頁平台，集中管理贊助刊登、溝通、會員權限與後台審核，讓合作流程更容易管理。",
    },
    highlights: [
      {
        en: "Implemented a public-facing sponsorship listing and browsing experience.",
        zh: "實作對外公開的贊助刊登與瀏覽體驗。",
      },
      {
        en: "Built member registration/login and admin permission-review flows.",
        zh: "建置會員註冊/登入與後台權限審核流程。",
      },
      {
        en: "Integrated AI copywriting support through GPT-4o and Botpress-style chatbot interaction.",
        zh: "透過 GPT-4o 與 Botpress 風格的聊天機器人互動，整合 AI 文案輔助。",
      },
      {
        en: "Used Django and Python for backend application logic, with MySQL/Firebase data storage.",
        zh: "使用 Django 與 Python 撰寫後端應用邏輯，並以 MySQL/Firebase 儲存資料。",
      },
      {
        en: "Designed the interface and collaboration flow with Figma, Bootstrap, and JavaScript.",
        zh: "以 Figma、Bootstrap 與 JavaScript 設計介面與合作流程。",
      },
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
        label: {
          en: "Live Site",
          zh: "線上網站",
        },
        href: "https://zanny.net",
      },
    ],
    imageAlt: {
      en: "Zanny campus sponsorship platform slide showing platform screenshots and chatbot interface.",
      zh: "Zanny 校園贊助媒合平台投影片，展示平台截圖與聊天機器人介面。",
    },
  },
  {
    slug: "voice-support-twilio",
    title: {
      en: "Voice Support Demo with Twilio",
      zh: "以 Twilio 打造的語音客服示範",
    },
    category: {
      en: "Voice AI / System Integration / Customer Support",
      zh: "語音 AI / 系統整合 / 客戶服務",
    },
    summary: {
      en: "Developed a voice-based support demo using Twilio, Flask, STT/TTS, and LLM APIs to explore phone-based customer service automation.",
      zh: "使用 Twilio、Flask、STT/TTS 與 LLM API 開發一個語音客服示範，探索以電話為基礎的客服自動化。",
    },
    problem: {
      en: "Many customer-support workflows still happen through phone calls. To make AI support useful in this context, the system needs to handle voice input, speech recognition, response generation, and call flow integration.",
      zh: "許多客服工作流程仍透過電話進行。要讓 AI 客服在這種情境下派上用場，系統必須能處理語音輸入、語音辨識、回應生成與通話流程整合。",
    },
    built: {
      en: "Built a prototype that connects phone-call flows with speech-to-text, text-to-speech, and LLM-based response generation.",
      zh: "打造一個原型，將電話通話流程與 speech-to-text、text-to-speech 及以 LLM 為基礎的回應生成串接起來。",
    },
    highlights: [
      {
        en: "Built outbound call and webhook flows using Twilio and Flask.",
        zh: "使用 Twilio 與 Flask 建置外撥電話與 webhook 流程。",
      },
      {
        en: "Used ngrok for local webhook testing.",
        zh: "使用 ngrok 進行本機 webhook 測試。",
      },
      {
        en: "Tested multilingual speech-recognition scenarios involving English and Mandarin.",
        zh: "測試涵蓋英文與中文的多語言語音辨識情境。",
      },
      {
        en: "Connected voice input to LLM-based response generation.",
        zh: "將語音輸入與以 LLM 為基礎的回應生成串接。",
      },
      {
        en: "Debugged callback URL, deployment, environment variable, and API-integration issues.",
        zh: "除錯 callback URL、部署、環境變數與 API 整合等問題。",
      },
    ],
    tags: ["Twilio", "Flask", "Python", "STT", "TTS", "LLM", "Webhooks", "ngrok"],
  },
  {
    slug: "merchant-platform",
    title: {
      en: "Merchant Platform Full-Stack Features",
      zh: "商家平台全端功能",
    },
    category: {
      en: "Full-Stack Engineering / Web Application",
      zh: "全端工程 / 網頁應用程式",
    },
    summary: {
      en: "Implemented full-stack features for a merchant-facing web platform using Angular, ASP.NET Core, SQL Server, and JWT authentication.",
      zh: "使用 Angular、ASP.NET Core、SQL Server 與 JWT 驗證，為面向商家的網頁平台實作全端功能。",
    },
    problem: {
      en: "Merchant-facing platforms need reliable account flows, form validation, payment-related search interfaces, authentication handling, and API-backed data views.",
      zh: "面向商家的平台需要可靠的帳號流程、表單驗證、與付款相關的搜尋介面、身分驗證處理，以及由 API 支援的資料檢視。",
    },
    built: {
      en: "Developed production-style web application features across frontend, backend API integration, authentication, and database-backed workflows.",
      zh: "橫跨前端、後端 API 整合、身分驗證與資料庫支援的工作流程，開發接近正式環境的網頁應用功能。",
    },
    highlights: [
      {
        en: "Built registration, login, token interceptor, and form validation flows.",
        zh: "建置註冊、登入、token interceptor 與表單驗證流程。",
      },
      {
        en: "Implemented API-backed search and data-display features.",
        zh: "實作由 API 支援的搜尋與資料顯示功能。",
      },
      {
        en: "Worked on merchant account and payment-link related interfaces.",
        zh: "開發與商家帳號及付款連結相關的介面。",
      },
      {
        en: "Integrated frontend Angular components with ASP.NET Core Web API endpoints.",
        zh: "將前端 Angular 元件與 ASP.NET Core Web API 端點整合。",
      },
      {
        en: "Used Swagger, IIS, Git Flow, and database-backed development workflows.",
        zh: "使用 Swagger、IIS、Git Flow 與資料庫支援的開發流程。",
      },
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
    title: {
      en: "Cybersecurity Escape Room LINE Bot",
      zh: "資安密室逃脫 LINE Bot",
    },
    category: {
      en: "Automation / LINE Bot / Educational Game",
      zh: "自動化 / LINE Bot / 教育遊戲",
    },
    summary: {
      en: "Built an automated LINE Bot for a cybersecurity escape-room activity, connecting question delivery, answer checking, hint logic, and progress data through Google Apps Script.",
      zh: "為資安密室逃脫活動打造一個自動化 LINE Bot，透過 Google Apps Script 串接題目派送、答案檢核、提示邏輯與進度資料。",
    },
    problem: {
      en: "In-person educational games can be hard to run manually because facilitators need to distribute questions, check answers, send hints, and track participant progress at the same time.",
      zh: "實體教育遊戲若以人工方式進行會相當吃力，因為主持人必須同時派發題目、檢核答案、發送提示並追蹤參與者進度。",
    },
    built: {
      en: "Designed a LINE Messaging API workflow that automates the game flow and connects bot interactions with a spreadsheet-style question database.",
      zh: "設計一套 LINE Messaging API 工作流程，將遊戲流程自動化，並把機器人互動與試算表形式的題庫串接起來。",
    },
    highlights: [
      {
        en: "Implemented user-facing interactions through LINE Official Account and LINE Messaging API.",
        zh: "透過 LINE 官方帳號與 LINE Messaging API 實作面向使用者的互動。",
      },
      {
        en: "Used Google Apps Script to handle routing logic, answer validation, and data transfer.",
        zh: "使用 Google Apps Script 處理路由邏輯、答案驗證與資料傳輸。",
      },
      {
        en: "Connected the bot to a structured question database for game content and progress tracking.",
        zh: "將機器人與結構化題庫串接，用於遊戲內容與進度追蹤。",
      },
      {
        en: "Automated question dispatch, answer judgment, and hint delivery.",
        zh: "自動化題目派送、答案判定與提示發送。",
      },
      {
        en: "Improved the operational flow for facilitators running the cybersecurity activity.",
        zh: "改善主持人執行資安活動時的運作流程。",
      },
    ],
    tags: ["LINE Messaging API", "Google Apps Script", "JavaScript", "Automation", "Chatbot"],
    imageAlt: {
      en: "Cybersecurity escape room LINE Bot slide showing LINE interaction and spreadsheet database screenshots.",
      zh: "資安密室逃脫 LINE Bot 投影片，展示 LINE 互動與試算表題庫的截圖。",
    },
  },
  {
    slug: "admissions-choice-linebot",
    title: {
      en: "Admissions Choice Game LINE Bot",
      zh: "招生選擇題遊戲 LINE Bot",
    },
    category: {
      en: "Automation / LINE Bot / Campus Engagement",
      zh: "自動化 / LINE Bot / 校園互動",
    },
    summary: {
      en: "Built an interactive LINE Bot quiz game for admissions and campus engagement, guiding users through choice questions, campus information, and reward interactions.",
      zh: "為招生與校園互動打造一個互動式 LINE Bot 問答遊戲，引導使用者完成選擇題、認識校園資訊並進行獎勵互動。",
    },
    problem: {
      en: "Admissions outreach needs a more interactive way to introduce campus spaces and information than static posts or long informational pages.",
      zh: "招生推廣需要比靜態貼文或冗長資訊頁面更具互動性的方式，來介紹校園空間與資訊。",
    },
    built: {
      en: "Created a LINE Bot experience that presents campus-related questions, validates choices, sends follow-up information, and connects with Firebase-backed data flow.",
      zh: "打造一套 LINE Bot 體驗，呈現與校園相關的題目、驗證選項、發送後續資訊，並串接以 Firebase 為基礎的資料流程。",
    },
    highlights: [
      {
        en: "Built an interactive multiple-choice flow inside LINE.",
        zh: "在 LINE 內建置互動式選擇題流程。",
      },
      {
        en: "Used Firebase as the data layer for game content and user progress.",
        zh: "使用 Firebase 作為遊戲內容與使用者進度的資料層。",
      },
      {
        en: "Used Google Apps Script and JavaScript to manage bot logic and data transfer.",
        zh: "使用 Google Apps Script 與 JavaScript 管理機器人邏輯與資料傳輸。",
      },
      {
        en: "Delivered campus information through conversational UI and image-based prompts.",
        zh: "透過對話式 UI 與圖片提示傳遞校園資訊。",
      },
      {
        en: "Supported reward-style interaction through LINE Official Account coupon features.",
        zh: "透過 LINE 官方帳號的優惠券功能支援獎勵式互動。",
      },
    ],
    tags: ["LINE Messaging API", "Firebase", "Google Apps Script", "JavaScript", "Automation"],
    imageAlt: {
      en: "Admissions choice game LINE Bot slide showing campus quiz interactions and reward screenshots.",
      zh: "招生選擇題遊戲 LINE Bot 投影片，展示校園問答互動與獎勵截圖。",
    },
  },
  {
    slug: "web-crawling-course",
    title: {
      en: "Web Crawling and Data Analysis Course",
      zh: "網路爬蟲與資料分析課程",
    },
    category: {
      en: "Data Engineering / Teaching / Applied Analytics",
      zh: "資料工程 / 教學 / 應用分析",
    },
    summary: {
      en: "Designed and taught a practical course that takes learners from web crawling fundamentals to basic data analysis and visualization projects.",
      zh: "設計並教授一門實作課程，帶領學員從網路爬蟲基礎入門，一路做到基本的資料分析與視覺化專案。",
    },
    problem: {
      en: "Non-CS learners often need a concrete path from simple web data collection to useful analysis without getting lost in abstract programming details.",
      zh: "非資訊背景的學員往往需要一條具體的路徑，從簡單的網路資料蒐集走到實用的分析，而不至於迷失在抽象的程式細節中。",
    },
    built: {
      en: "Created teaching materials and project examples covering HTML basics, Python crawling, scraping principles, no-code crawling tools, text analysis, mapping, and visualization.",
      zh: "製作教學教材與專案範例，涵蓋 HTML 基礎、Python 爬蟲、抓取原理、免寫程式的爬蟲工具、文字分析、地圖繪製與視覺化。",
    },
    highlights: [
      {
        en: "Taught Requests, BeautifulSoup, Selenium, and Octoparse for data collection.",
        zh: "教授 Requests、BeautifulSoup、Selenium 與 Octoparse 進行資料蒐集。",
      },
      {
        en: "Used Pandas and Jieba for data cleaning, processing, and Chinese text analysis.",
        zh: "使用 Pandas 與 Jieba 進行資料清理、處理與中文斷詞分析。",
      },
      {
        en: "Built example projects including 104 job scraping, convenience-store competition analysis, and news keyword word clouds.",
        zh: "製作範例專案，包括 104 人力銀行職缺爬取、超商競爭分析與新聞關鍵字文字雲。",
      },
      {
        en: "Used WordCloud and Folium to turn raw data into visual outputs.",
        zh: "使用 WordCloud 與 Folium 將原始資料轉化為視覺化成果。",
      },
      {
        en: "Translated technical topics into beginner-friendly teaching flow for business-oriented learners.",
        zh: "將技術主題轉化為適合商管背景學員、易於入門的教學流程。",
      },
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
    imageAlt: {
      en: "Web crawling and data analysis course slide showing maps, word clouds, spreadsheet data, and course modules.",
      zh: "網路爬蟲與資料分析課程投影片，展示地圖、文字雲、試算表資料與課程單元。",
    },
  },
  {
    slug: "linkedu",
    title: {
      en: "LinkEDU",
      zh: "LinkEDU",
    },
    category: {
      en: "Education / Public Engagement / Leadership",
      zh: "教育 / 公共參與 / 領導",
    },
    summary: {
      en: "Co-founded an education advocacy and campus action project focused on education resource inequality, rural student representation, and public engagement.",
      zh: "共同創辦一個教育倡議與校園行動專案，聚焦於教育資源不均、偏鄉學生的發聲與公共參與。",
    },
    problem: {
      en: "Education policy issues such as evaluation systems, resource inequality, and rural student representation are often difficult for the public to understand and engage with.",
      zh: "評鑑制度、資源不均與偏鄉學生發聲等教育政策議題，往往讓大眾難以理解與參與。",
    },
    built: {
      en: "Helped turn abstract education issues into accessible public-facing materials, campus engagement activities, and collaborative advocacy work.",
      zh: "協助將抽象的教育議題轉化為淺顯易懂的對外素材、校園參與活動與協作式的倡議工作。",
    },
    highlights: [
      {
        en: "Co-founded the project with peers.",
        zh: "與同儕共同創辦這個專案。",
      },
      {
        en: "Translated education policy issues into understandable public materials.",
        zh: "將教育政策議題轉化為大眾易懂的素材。",
      },
      {
        en: "Designed surveys, storytelling content, and campus engagement activities.",
        zh: "設計問卷、故事性內容與校園參與活動。",
      },
      {
        en: "Worked on public communication around education resource inequality and rural student representation.",
        zh: "投入教育資源不均與偏鄉學生發聲相關的公共溝通。",
      },
      {
        en: "Demonstrated leadership, collaboration, and civic-tech/product-thinking potential.",
        zh: "展現領導、協作，以及公民科技/產品思維的潛力。",
      },
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
