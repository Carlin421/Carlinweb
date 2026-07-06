import type { Metadata } from "next";

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { LoginScreen } from "@/components/admin/LoginScreen";
import { isAdminConfigured, isAdminSession } from "@/lib/adminAuth";
import { getSiteContent } from "@/lib/contentStore";
import { getProjectImageMap } from "@/lib/projectImages";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function CenteredCard({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-base px-4 py-16 text-ink">
      {children}
    </main>
  );
}

export default async function AdminPage() {
  // Setup state: the admin password isn't configured yet.
  if (!isAdminConfigured()) {
    return (
      <CenteredCard>
        <div className="w-full max-w-md animate-fade-up rounded-2xl border border-line bg-surface p-8 shadow-card">
          <span className="inline-flex rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
            Setup needed
          </span>
          <h1 className="mt-4 font-display text-2xl text-ink">Finish setting up the admin</h1>
          <p className="mt-3 text-sm leading-6 text-ink-dim">
            The content editor is ready — it just needs a password and (for production) a place to
            store your edits.
          </p>
          <ol className="mt-5 space-y-3 text-sm leading-6 text-ink-dim">
            <li className="flex gap-3">
              <span className="font-mono text-accent">1</span>
              <span>
                Set <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">ADMIN_PASSWORD</code>{" "}
                in your Vercel project (Settings → Environment Variables), or in a local{" "}
                <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">.env.local</code>.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-accent">2</span>
              <span>
                Create a Vercel Blob store (Storage → Create → Blob) and connect it. This injects{" "}
                <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">BLOB_READ_WRITE_TOKEN</code>{" "}
                so your edits persist across deploys.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-accent">3</span>
              <span>Redeploy, then reload this page to sign in.</span>
            </li>
          </ol>
          <a
            href="/"
            className="mt-6 inline-block text-sm text-accent underline-offset-4 hover:underline"
          >
            ← Back to site
          </a>
        </div>
      </CenteredCard>
    );
  }

  // Not signed in: show the login screen.
  if (!isAdminSession()) {
    return (
      <CenteredCard>
        <LoginScreen />
      </CenteredCard>
    );
  }

  // Signed in: full dashboard.
  const [content, imageMap] = await Promise.all([getSiteContent(), getProjectImageMap()]);
  return <AdminDashboard initialContent={content} imageMap={imageMap} />;
}
