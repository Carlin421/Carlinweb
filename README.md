# Carlin Hou Portfolio

Personal portfolio website for Carlin Hou, built to present software engineering projects, internship experience, technical skills, and leadership work.

The site is intentionally static-first, recruiter-friendly, and easy to maintain. Public copy avoids confidential company data, fake metrics, and invented project links.

This version also includes a compact `Leadership & Activities` section for older portfolio items and student leadership work, so the homepage can show breadth without weakening the main engineering project story.


## Included Project Sections

The portfolio now includes the original engineering/internship projects plus additional work imported from Carlin's Canva portfolio screenshots:

- Customer Service RAG Assistant
- AI Tennis Match Analysis
- Zanny Campus Sponsorship Platform
- Voice Support Demo with Twilio
- Merchant Platform Full-Stack Features
- Cybersecurity Escape Room LINE Bot
- Admissions Choice Game LINE Bot
- Web Crawling and Data Analysis Course
- LinkEDU

Project content is editable in `src/data/projects.ts`. Screenshot assets are stored in `public/projects/`.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel-ready deployment

## Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Manual Updates Needed Before Publishing

Update these values before sending the website to recruiters:

- `src/data/profile.ts` email
- `src/data/profile.ts` GitHub URL
- `src/data/profile.ts` LinkedIn URL
- `public/resume.pdf` with the real resume PDF
- Optional project demo or GitHub links in `src/data/projects.ts`
- Review `src/data/additionalWork.ts` and adjust any older portfolio items after exporting the Canva portfolio as PDF/text

## Content Editing

Most editable content lives in:

```text
src/data/profile.ts
src/data/projects.ts
src/data/experience.ts
src/data/skills.ts
src/data/additionalWork.ts
```

The page UI lives in reusable components under:

```text
src/components/
```

## Deployment

This project is intended to be deployed on Vercel.

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Confirm the build command is `npm run build`.
4. Confirm the output framework is detected as Next.js.
5. Deploy.
