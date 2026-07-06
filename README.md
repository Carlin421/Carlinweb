# Carlin Hou Portfolio

Personal portfolio website for Carlin Hou, built to present software engineering projects, internship experience, technical skills, and leadership work.

The site is intentionally static-first, recruiter-friendly, and easy to maintain. Public copy avoids confidential company data, fake metrics, and invented project links.

## Included Project Sections

- Customer Service RAG Assistant
- AI Tennis Match Analysis
- Zanny Campus Sponsorship Platform
- Voice Support Demo with Twilio
- Merchant Platform Full-Stack Features
- Cybersecurity Escape Room LINE Bot
- Admissions Choice Game LINE Bot
- Web Crawling and Data Analysis Course
- LinkEDU

Project text content is editable in `src/data/projects.ts`. Project **images** are managed without editing code — see below.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel Blob (optional, for image uploads)
- Vercel-ready deployment

## Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

```bash
npm run build       # production build
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
```

## Managing Project Images (no code edits)

Each project has a stable `slug` in `src/data/projects.ts`. Its image is resolved
automatically from, in priority order:

1. **An upload via the `/admin` page** (stored in Vercel Blob as `projects/<slug>`).
2. **A committed file** at `public/projects/<slug>.<ext>` (`.webp`, `.png`, `.jpg`, `.avif`).

So you have two ways to change an image, neither of which touches component code:

- **Upload from the browser (recommended):** go to `/admin`, enter the admin
  password, pick the project, choose an image, and upload. It replaces the old
  image for that project and appears on the site within about a minute. This
  requires the two environment variables below.
- **Drop a file in the repo:** save your image as `public/projects/<slug>.webp`
  (matching the project's slug) and redeploy.

If neither source has an image for a project, its card simply renders without one.

### Environment variables

Copy `.env.example` to `.env.local` (local) or set these in Vercel
(Settings → Environment Variables):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO / Open Graph / JSON-LD. |
| `BLOB_READ_WRITE_TOKEN` | Connects a Vercel Blob store. Auto-injected by Vercel when you create + link a Blob store; copy it locally for local uploads. |
| `ADMIN_UPLOAD_PASSWORD` | Password that gates the `/admin` upload form. |

The upload page and API degrade safely: without a Blob store or password they
return a clear "not configured" message, and the site keeps using committed
images in `public/projects/`.

## Manual Updates Needed Before Publishing

- `src/data/profile.ts` → set your real `email` (currently a placeholder, so the
  "Email Me" button is hidden until you fill it in). GitHub and LinkedIn are set.
- Replace `public/resume.pdf` with the real resume PDF.
- Set `NEXT_PUBLIC_SITE_URL` to your real domain.
- (Optional) Add a Vercel Blob store + `ADMIN_UPLOAD_PASSWORD` to enable `/admin` uploads.
- (Optional) Add project demo or repo links in `src/data/projects.ts`.

## Content Editing

Most editable content lives in:

```text
src/data/profile.ts
src/data/projects.ts
src/data/experience.ts
src/data/skills.ts
src/data/additionalWork.ts
```

The page UI lives in reusable components under `src/components/`.

## Deployment

This project is intended to be deployed on Vercel.

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. (Optional) Create a Blob store (Storage → Blob) and link it to enable `/admin` uploads.
4. Add the environment variables above.
5. Deploy.
