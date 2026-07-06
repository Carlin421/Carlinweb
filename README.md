# Carlin Hou — Portfolio

Personal portfolio website for Carlin Hou: software engineering projects, internship experience, technical skills, and leadership work.

Dark-first editorial design (with a light theme toggle), a ⌘K command palette, and a full **admin panel at `/admin`** for editing every piece of site content from the browser — no code changes or redeploys needed. Public copy avoids confidential company data, fake metrics, and invented project links.

## Tech Stack

- Next.js 14 (App Router) · React 18 · TypeScript
- Tailwind CSS (semantic CSS-variable tokens, dark/light theming)
- Fonts: Fraunces (display) · Inter (body) · JetBrains Mono (code/labels)
- Vercel Blob — stores admin content edits, project images, and the resume
- Deployed on Vercel

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

For the admin panel locally, copy `.env.example` to `.env.local` and set
`ADMIN_PASSWORD`. Without a `BLOB_READ_WRITE_TOKEN`, content edits save to a
gitignored `.content/site.json` file and image uploads go straight into
`public/projects/` — handy for testing.

## Editing the Site (no code, no redeploy)

Go to **`/admin`**, sign in with the admin password, and edit:

- **Profile** — name, title, intro, availability badge, location, email,
  GitHub/LinkedIn, about paragraphs, education, focus areas
- **Projects** — add/edit/delete/reorder projects, tags, links, featured flag,
  and upload a screenshot per project
- **Experience / Skills / Activities** — full add/edit/delete/reorder
- **Résumé** — upload a new PDF

Saves go live on the site within seconds (Vercel cache is revalidated on save).
"Reset to defaults" restores the content committed in `src/data/*.ts`.

### How content works under the hood

Committed defaults live in `src/data/*.ts`. The admin panel saves overrides as
JSON to Vercel Blob via `src/lib/contentStore.ts`; the site merges overrides on
top of defaults at render time. If the Blob store is ever unreachable, the site
falls back to the committed defaults — it can't break.

Project images resolve by slug, in priority order:

1. an upload from `/admin` (Vercel Blob `projects/<slug>`)
2. a committed file at `public/projects/<slug>.<ext>` (`.webp`, `.png`, `.jpg`, `.avif`)

Projects without an image get a designed typographic placeholder.

## Environment Variables

Copy `.env.example` to `.env.local` (local) or set these in Vercel
(Settings → Environment Variables):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO / Open Graph / JSON-LD / sitemap. |
| `ADMIN_PASSWORD` | Password for the `/admin` panel. (`ADMIN_UPLOAD_PASSWORD` still works as a legacy fallback.) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob store token. Auto-injected by Vercel when you create + link a Blob store. Needed in production for admin edits to persist. |

Everything degrades safely: without a password the admin panel shows setup
instructions; without a Blob token the site serves the committed defaults.

## Deployment (Vercel)

1. Push the repository to GitHub and import it into Vercel.
2. Create a Blob store (Storage → Create → Blob) and connect it to the project
   — this auto-injects `BLOB_READ_WRITE_TOKEN`.
3. Add `ADMIN_PASSWORD` and `NEXT_PUBLIC_SITE_URL` env vars.
4. Deploy, then visit `/admin` to fill in your email and upload your real
   resume — both ship as placeholders.

## Before Publishing Checklist

- [ ] Set your real **email** in `/admin` → Profile (hidden on the site until set)
- [ ] Upload your real **resume PDF** in `/admin` → Résumé
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain
- [ ] Add project demo/repo **links** in `/admin` → Projects where available
