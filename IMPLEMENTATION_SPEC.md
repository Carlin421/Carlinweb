# Carlin Hou Personal Portfolio Website — Codex Implementation README

## 0. Codex Task Summary

Build a complete personal portfolio website for **Carlin Hou**.

This project is intended for 2027 summer internship recruiting. The final website should present Carlin as a software engineer and incoming University of Michigan MSI student with interests in:

- Software engineering
- AI engineering
- Backend systems
- Retrieval systems
- ML infrastructure
- Full-stack product engineering
- Voice and customer-support automation

The website should be clean, polished, fast, responsive, recruiter-friendly, and easy to maintain.

The visual style should be **Claude-inspired but not copied**: warm, calm, minimal, precise, spacious, editorial, and highly readable. Do **not** use Anthropic or Claude logos, proprietary brand assets, exact typography, or exact brand identity. Use the general feeling as reference only.

---

## 1. Most Important Instruction

Prioritize a polished final product over clever implementation.

This website should help a recruiter or engineer understand Carlin in 30 seconds:

1. Who he is
2. What he is looking for
3. What technical areas he cares about
4. What projects are worth reading
5. Where to find his resume, GitHub, LinkedIn, and email

Do not over-engineer. Do not add unnecessary backend logic, CMS, authentication, database, complex animations, or heavy dependencies.

---

## 2. Recommended Tech Stack

Use:

- Next.js with App Router
- React
- TypeScript
- Tailwind CSS
- ESLint
- Static-first implementation
- Vercel-ready deployment

Preferred setup command if starting from scratch:

```bash
npx create-next-app@latest carlin-portfolio --typescript --eslint --app --tailwind
```

If this repository already exists, adapt the current project while keeping the same stack and goals.

---

## 3. Design Direction: Claude-Inspired, Not Copied

The design should feel inspired by Claude's general interface and Anthropic-style communication: calm, warm, thoughtful, spacious, and text-forward.

### Desired feeling

- Warm minimalism
- Calm editorial layout
- Human but technical
- Spacious sections
- Low visual noise
- Clear typography
- Soft cards
- Subtle borders
- Muted color palette
- Recruiter-readable content
- Professional but not corporate-cold

### Avoid

- Do not copy Claude's UI exactly
- Do not use Anthropic or Claude logos
- Do not use official Anthropic brand assets
- Do not claim affiliation with Anthropic or Claude
- Do not use loud gradients
- Do not use overly saturated colors
- Do not use excessive shadows
- Do not use flashy animation
- Do not make it look like a generic AI-generated template
- Do not make it look like a crypto landing page

### Suggested visual language

Use a warm neutral base and dark readable text.

Suggested color tokens:

```ts
const colors = {
  background: "#F7F3EA",      // warm off-white / parchment
  surface: "#FFFDF8",         // card background
  surfaceMuted: "#EFE8DA",    // muted warm section background
  textPrimary: "#23211E",     // charcoal
  textSecondary: "#625D53",   // warm gray
  textMuted: "#8A8174",       // muted gray-brown
  border: "#DDD3C2",          // soft warm border
  accent: "#8B5E3C",          // muted clay brown
  accentDark: "#5F3F2B",      // darker clay
  accentSoft: "#E8D8C6",      // soft accent background
};
```

It is acceptable to adjust these slightly if needed for contrast.

### Typography direction

Use system fonts or Google fonts only if already configured cleanly.

Preferred:

- Headings: strong, refined, not too playful
- Body: highly readable
- Line height: generous
- Letter spacing: subtle

Suggested CSS idea:

```css
body {
  background: #F7F3EA;
  color: #23211E;
}
```

Do not use tiny text. This is a recruiter-facing site, not a dense dashboard.

---

## 4. Site Structure

Build a one-page portfolio website with anchor navigation.

Required sections in order:

1. Navbar
2. Hero
3. About
4. Featured Projects
5. Experience
6. Skills
7. Leadership & Social Impact
8. Contact
9. Footer

Optional but not required:

- `/projects` route
- Individual project pages
- Blog

For this version, a strong single-page site is preferred over a half-finished multi-page site.

---

## 5. Recommended File Structure

Use a clean, maintainable structure.

Preferred:

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    Navbar.tsx
    Hero.tsx
    About.tsx
    Projects.tsx
    ProjectCard.tsx
    Experience.tsx
    Skills.tsx
    Leadership.tsx
    Contact.tsx
    Footer.tsx
    SectionHeading.tsx
    Tag.tsx
    ButtonLink.tsx
  data/
    profile.ts
    projects.ts
    experience.ts
    skills.ts
  lib/
    utils.ts
public/
  resume.pdf
README.md
```

If the project does not use `src/`, that is acceptable, but keep the organization clean.

Important: Put editable content in `data/` files whenever possible so Carlin can update the site easily later.

---

## 6. Public Profile Data

Create `src/data/profile.ts`.

Use the following structure:

```ts
export const profile = {
  name: "Carlin Hou",
  title: "Software Engineer | Incoming MSI Student at University of Michigan",
  shortIntro:
    "I build AI-assisted tools, full-stack applications, and systems that turn messy real-world workflows into usable software.",
  searchStatus:
    "Currently looking for 2027 summer internship opportunities in software engineering, AI engineering, backend systems, and ML infrastructure.",
  location: "Based in the U.S.",
  email: "YOUR_EMAIL_HERE",
  github: "YOUR_GITHUB_URL_HERE",
  linkedin: "YOUR_LINKEDIN_URL_HERE",
  resume: "/resume.pdf",
  education: [
    {
      school: "University of Michigan",
      degree: "Master of Science in Information",
      detail: "Incoming student, Fall 2026",
    },
    {
      school: "National Chi Nan University",
      degree: "Information Management major, Finance minor",
      detail: "Undergraduate background",
    },
  ],
};
```

If actual links are unavailable, keep placeholders clearly marked and easy to update. Do not invent URLs.

---

## 7. Navbar Requirements

Navbar items:

- About
- Projects
- Experience
- Skills
- Contact

Behavior:

- Sticky top preferred
- Subtle translucent warm background preferred
- Smooth scroll to sections
- Left side: `Carlin Hou`
- Right side: nav links + Resume button
- Mobile responsive
- No horizontal overflow
- Clear hover and focus states

Suggested nav style:

- Background: warm off-white with slight transparency
- Border bottom: soft warm border
- Links: charcoal / warm gray
- Active or hover: muted clay accent

---

## 8. Hero Section

This is the most important section.

Hero should be spacious and visually calm.

Required content:

```text
Carlin Hou
Software Engineer | Incoming MSI Student at University of Michigan
```

Hero paragraph:

```text
I build AI-assisted tools, full-stack applications, and systems that turn messy real-world workflows into usable software. My current interests include retrieval systems, backend engineering, voice interfaces, and ML infrastructure.
```

Job search line:

```text
Currently looking for 2027 summer internship opportunities in software engineering, AI engineering, backend systems, and ML infrastructure.
```

Buttons:

1. View Projects
2. Download Resume
3. GitHub
4. LinkedIn

Layout:

- Desktop: text on left, highlight card on right
- Mobile: stack vertically

Right-side highlight card:

```text
Currently focused on

AI-assisted support systems
Retrieval pipelines
Backend infrastructure
Voice interfaces
Full-stack products
```

Design suggestion:

- Use a soft surface card
- Rounded corners
- Thin border
- Minimal icon usage, if any
- Do not use distracting illustrations

---

## 9. About Section

Use this text:

```text
I am an incoming Master of Science in Information student at the University of Michigan with experience in full-stack development, AI-assisted systems, and real-world software projects.

Recently, I worked on customer-support automation projects involving retrieval-augmented generation, voice interfaces, and LLM-based workflow tools during a software engineering internship in New York.

My current interests are software engineering, ML infrastructure, retrieval systems, backend development, and AI products that improve operational efficiency.
```

Tone:

- Professional
- Direct
- Clear
- No exaggeration
- No fake metrics

---

## 10. Featured Projects Section

This is the most important content section.

Create 4 project cards:

1. Customer Service RAG Assistant
2. Voice Support Demo with Twilio
3. Merchant Platform Full-Stack Features
4. LinkEDU

Each project card should include:

- Category label
- Project title
- Summary
- Problem
- What I built
- Technical highlights
- Tags
- Optional links if available

Do not invent GitHub/demo links.

### Project 1 — Customer Service RAG Assistant

```ts
{
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
    "Considered response quality evaluation for customer-support scenarios."
  ],
  tags: ["RAG", "LLM", "Gemini API", "Python", "Retrieval", "Hybrid Search", "Reranking", "Evaluation"],
  featured: true
}
```

Public-safe note:

Do not include confidential company data, merchant IDs, customer names, internal screenshots, private wiki content, or proprietary documents.

---

### Project 2 — Voice Support Demo with Twilio

```ts
{
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
    "Debugged callback URL, deployment, environment variable, and API-integration issues."
  ],
  tags: ["Twilio", "Flask", "Python", "STT", "TTS", "LLM", "Webhooks", "ngrok"]
}
```

Public-safe note:

Do not expose API keys, phone numbers, private logs, or customer data.

---

### Project 3 — Merchant Platform Full-Stack Features

```ts
{
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
    "Used Swagger, IIS, Git Flow, and database-backed development workflows."
  ],
  tags: ["Angular", "TypeScript", "ASP.NET Core", "C#", ".NET 7", "EF Core", "SQL Server", "JWT", "Swagger", "IIS"]
}
```

---

### Project 4 — LinkEDU

```ts
{
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
    "Demonstrated leadership, collaboration, and civic-tech/product-thinking potential."
  ],
  tags: ["Leadership", "Public Engagement", "Education Equity", "Research", "Storytelling", "Project Design"]
}
```

Important: LinkEDU should be presented as a leadership and social-impact project, not as a software engineering project.

---

## 11. Project Card Design

Recommended card layout:

```text
[Category label]
Project Title
Short summary

Problem
...

Built
...

Highlights
- ...
- ...

[Tech tags]
```

Visual design:

- Soft warm surface background
- Rounded corners
- Thin warm border
- Slight hover lift or border-color change
- No heavy box shadow
- Tags as small rounded pills
- First project can be larger or full-width

Desktop layout:

- RAG project full width or visually emphasized
- Other projects in 2-column grid

Mobile layout:

- All project cards stacked

---

## 12. Experience Section

Create timeline-style cards or stacked experience cards.

### Experience 1

```ts
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
    "Collaborated with technical support and engineering stakeholders to clarify data and workflow requirements."
  ]
}
```

### Experience 2

```ts
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
    "Worked with SQL Server, EF Core, Swagger, IIS deployment, and Git Flow."
  ]
}
```

Keep all internship descriptions public-safe. Do not expose confidential details.

---

## 13. Skills Section

Group skills clearly.

```ts
export const skills = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "C#", "SQL", "HTML", "CSS"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Angular", "Tailwind CSS", "Responsive Design"],
  },
  {
    category: "Backend",
    items: ["ASP.NET Core", "Flask", "REST APIs", "JWT Authentication", "Webhooks"],
  },
  {
    category: "AI / Data / Retrieval",
    items: ["LLM APIs", "RAG", "Embeddings", "Hybrid Search", "Reranking", "Evaluation Sets", "Prompt Engineering"],
  },
  {
    category: "Databases",
    items: ["SQL Server", "MySQL", "SQLite", "PostgreSQL"],
  },
  {
    category: "Tools / Platforms",
    items: ["Git", "GitHub", "Swagger", "IIS", "Docker", "ngrok", "Twilio", "Vercel"],
  },
];
```

Do not describe these as expert-level. Present them as practical tools and technologies.

---

## 14. Leadership & Social Impact Section

Title:

```text
Leadership & Social Impact
```

Description:

```text
Beyond engineering, I have worked on education-focused public engagement and student-led initiatives that translate complex problems into accessible, collaborative action.
```

Main item:

```text
LinkEDU
Co-founded an education advocacy and campus action project focused on education resource inequality, rural student representation, and public engagement.
```

Optional additional item:

```text
Google Developer Student Clubs / Technical Community
Supported student technical learning through workshops, side-project guidance, and community activities.
```

Keep this section concise. It should support Carlin's overall profile without distracting from engineering projects.

---

## 15. Contact Section

Required text:

```text
I am currently looking for 2027 summer internship opportunities in software engineering, AI engineering, backend systems, and ML infrastructure.
```

Optional supporting text:

```text
If you are working on developer tools, AI systems, retrieval infrastructure, backend platforms, or applied AI products, I would be happy to connect.
```

Buttons:

- Email Me
- GitHub
- LinkedIn
- Download Resume

If email is still a placeholder, make it very easy for Carlin to update in `src/data/profile.ts`.

---

## 16. Footer

Footer text:

```text
© 2026 Carlin Hou. Built with Next.js and Tailwind CSS.
```

Optional secondary text:

```text
Designed as a personal portfolio for software engineering internship applications.
```

---

## 17. SEO and Metadata

Add metadata in `src/app/layout.tsx`.

```ts
export const metadata = {
  title: "Carlin Hou | Software Engineer",
  description:
    "Carlin Hou is a software engineer and incoming University of Michigan MSI student interested in AI systems, full-stack engineering, backend systems, retrieval systems, and ML infrastructure.",
};
```

Use semantic HTML:

- `<main>`
- `<section>`
- `<header>`
- `<footer>`
- Proper heading order

---

## 18. Accessibility Requirements

Implement basic accessibility:

- Good color contrast
- Semantic HTML
- Keyboard navigability
- Visible focus states
- Descriptive links
- No tiny text
- No hover-only information
- Avoid motion-heavy UI
- Use `aria-label` where needed

---

## 19. Responsive Design Requirements

The website must work on:

- Mobile phones
- Tablets
- Desktop screens
- Wide screens

Specific requirements:

- Navbar should not break on mobile
- Hero should stack cleanly on mobile
- Project cards should become one column on mobile
- Buttons should wrap cleanly
- No horizontal scrolling
- Text should remain readable
- Cards should not become cramped

---

## 20. Component Requirements

Create reusable components.

### `SectionHeading.tsx`

```ts
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};
```

### `ProjectCard.tsx`

```ts
type ProjectCardProps = {
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
  featured?: boolean;
};
```

### `ButtonLink.tsx`

Suggested props:

```ts
type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
};
```

### `Tag.tsx`

Simple rounded pill used for skills and project tech tags.

---

## 21. Styling Implementation Details

Use Tailwind CSS.

Suggested global style direction:

- Body background: warm off-white
- Cards: soft white/warm surface
- Borders: warm beige
- Text: charcoal
- Secondary text: warm gray
- Accent: muted clay brown

Example Tailwind class direction:

```tsx
className="min-h-screen bg-[#F7F3EA] text-[#23211E]"
```

Example card style:

```tsx
className="rounded-3xl border border-[#DDD3C2] bg-[#FFFDF8] p-6 shadow-sm transition hover:border-[#B99B7A]"
```

Example primary button:

```tsx
className="rounded-full bg-[#23211E] px-5 py-3 text-sm font-medium text-[#FFFDF8] transition hover:bg-[#5F3F2B] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:ring-offset-2"
```

Example secondary button:

```tsx
className="rounded-full border border-[#DDD3C2] bg-[#FFFDF8] px-5 py-3 text-sm font-medium text-[#23211E] transition hover:border-[#8B5E3C] hover:bg-[#EFE8DA] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:ring-offset-2"
```

Keep the UI consistent.

---

## 22. Copywriting Rules

Use strong but honest verbs:

- Built
- Designed
- Implemented
- Explored
- Investigated
- Integrated
- Collaborated
- Optimized
- Prototyped

Avoid overclaiming:

Do not say:

- Expert
- World-class
- Revolutionary
- Enterprise-grade, unless justified
- Productionized, unless actually deployed to production
- Increased X by Y%, unless there is a real metric

Do not invent metrics.

If metrics are unavailable, focus on technical scope, system design, and implementation details.

---

## 23. Confidentiality Rules

Do not include private or confidential information.

Never include:

- API keys
- Internal wiki content
- Merchant IDs
- Customer names
- Phone numbers
- Private support logs
- Internal screenshots
- Proprietary documents
- Private architecture diagrams
- Company secrets

Public-safe descriptions are enough.

---

## 24. Resume Handling

Add a placeholder file path:

```text
public/resume.pdf
```

If no resume PDF exists, create a note in the README telling Carlin to add it manually.

All resume buttons should link to:

```text
/resume.pdf
```

Use:

```tsx
<a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
  Download Resume
</a>
```

---

## 25. README for the Repository

The repository README should include a normal human-facing section:

```md
# Carlin Hou Portfolio

Personal portfolio website for Carlin Hou, built to present software engineering projects, internship experience, technical skills, and leadership work.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Vercel

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This project is intended to be deployed on Vercel.

## Manual Updates Needed

Before publishing, update:

- `src/data/profile.ts` email
- `src/data/profile.ts` GitHub URL
- `src/data/profile.ts` LinkedIn URL
- `public/resume.pdf`
- Optional project demo/GitHub links
```

---

## 26. Commands to Run Before Finishing

Run:

```bash
npm install
npm run lint
npm run build
```

Fix all errors.

Do not leave:

- TypeScript errors
- ESLint errors
- Unused imports
- Broken links, except clearly marked placeholders
- Console logs
- Dead components
- Horizontal overflow

---

## 27. Acceptance Criteria

The project is complete only when all of these are true:

- Homepage loads successfully
- Visual style is polished, warm, clean, and Claude-inspired without copying
- Site is responsive on mobile and desktop
- Navbar anchor links work
- Resume button points to `/resume.pdf`
- Four required projects are shown
- RAG project is visually emphasized
- Experience section includes Universal Processing and Shinda Technology
- Skills are grouped clearly
- Contact section includes 2027 internship search positioning
- No confidential information is exposed
- TypeScript passes
- ESLint passes
- Production build passes
- Code is organized into reusable components and data files
- Content is easy for Carlin to edit later
- No fake metrics or fabricated links
- Final result is ready to deploy to Vercel

---

## 28. Final Response Expected from Codex

After implementation, summarize:

1. Files created or modified
2. How to run locally
3. How to build
4. What Carlin still needs to update manually:
   - Email
   - GitHub URL
   - LinkedIn URL
   - Resume PDF
   - Optional project links

Do not only say “done.” Provide a concise engineering summary.
