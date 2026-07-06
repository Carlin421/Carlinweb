"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Profile, SiteContent } from "@/lib/siteContent";
import { cn } from "@/lib/utils";

import { ActivitiesEditor } from "./ActivitiesEditor";
import { ExperienceEditor } from "./ExperienceEditor";
import { ProfileEditor } from "./ProfileEditor";
import { ProjectsEditor } from "./ProjectsEditor";
import { ResumeEditor } from "./ResumeEditor";
import { SkillsEditor } from "./SkillsEditor";
import { ToastProvider, useToast } from "./Toast";
import { linkClass, primaryButtonClass, secondaryButtonClass } from "./styles";

const TABS = [
  { id: "profile", label: "Profile" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "activities", label: "Activities" },
  { id: "resume", label: "Résumé" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type AdminDashboardProps = {
  initialContent: SiteContent;
  imageMap: Record<string, string>;
};

export function AdminDashboard({ initialContent, imageMap }: AdminDashboardProps) {
  return (
    <ToastProvider>
      <DashboardShell initialContent={initialContent} imageMap={imageMap} />
    </ToastProvider>
  );
}

function DashboardShell({ initialContent, imageMap }: AdminDashboardProps) {
  const toast = useToast();
  const [content, setContent] = useState(initialContent);
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(initialContent));
  const [tab, setTab] = useState<TabId>("profile");
  const [saving, setSaving] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  // Bumped on discard/reset so editors drop any local draft state (remount via key).
  const [revision, setRevision] = useState(0);

  const dirty = useMemo(() => JSON.stringify(content) !== savedJson, [content, savedJson]);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.status === 401) {
        setSessionExpired(true);
        return;
      }
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { errors?: string[]; error?: string }
          | null;
        const first = data?.errors?.[0] ?? data?.error ?? "Save failed. Try again.";
        const extra = data?.errors && data.errors.length > 1 ? ` (+${data.errors.length - 1} more)` : "";
        toast(`Not saved: ${first}${extra}`, "error");
        return;
      }
      setSavedJson(JSON.stringify(content));
      toast("Saved — live on the site now");
    } catch {
      toast("Save failed — check your connection.", "error");
    } finally {
      setSaving(false);
    }
  }, [content, toast]);

  // Keep latest values reachable from the mount-once key handler.
  const saveRef = useRef(save);
  saveRef.current = save;
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;
  const savingRef = useRef(saving);
  savingRef.current = saving;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (dirtyRef.current && !savingRef.current) void saveRef.current();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  // Session-expired modal: focus the action and trap Tab within the panel.
  const sessionPanelRef = useRef<HTMLDivElement>(null);
  const sessionButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!sessionExpired) return;
    sessionButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !sessionPanelRef.current) return;
      const focusable = sessionPanelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [sessionExpired]);

  const discard = () => {
    setContent(JSON.parse(savedJson) as SiteContent);
    setRevision((r) => r + 1);
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => undefined);
    window.location.reload();
  };

  const resetAll = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content", { method: "DELETE" });
      if (res.status === 401) {
        setSessionExpired(true);
        return;
      }
      if (!res.ok) {
        toast("Reset failed. Try again.", "error");
        return;
      }
      const fresh = await fetch("/api/admin/content")
        .then((r) => (r.ok ? (r.json() as Promise<SiteContent>) : null))
        .catch(() => null);
      if (fresh) {
        setContent(fresh);
        setSavedJson(JSON.stringify(fresh));
        setRevision((r) => r + 1);
      }
      toast("All content reset to code defaults");
    } catch {
      toast("Reset failed — check your connection.", "error");
    }
  }, [toast]);

  const onUnauthorized = useCallback(() => setSessionExpired(true), []);

  const updateProfile = (patch: Partial<Profile>) =>
    setContent((c) => ({ ...c, profile: { ...c.profile, ...patch } }));

  const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <div className="min-h-screen bg-base text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-base/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="truncate font-display text-lg text-ink">{content.profile.name}</span>
            <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
              Admin
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            <a href="/" className={cn(linkClass, "text-sm")}>
              View site <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              onClick={logout}
              className={cn(secondaryButtonClass, "px-3 py-1.5")}
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-36 pt-6 md:flex-row md:gap-10 md:px-6 md:pt-10">
        <nav aria-label="Admin sections" className="md:w-40 md:shrink-0">
          <ul className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 md:sticky md:top-24 md:mx-0 md:flex-col md:px-0 md:pb-0">
            {TABS.map((item) => (
              <li key={item.id} className="shrink-0 md:shrink">
                <button
                  type="button"
                  onClick={() => setTab(item.id)}
                  aria-current={tab === item.id ? "true" : undefined}
                  className={cn(
                    "w-full whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    tab === item.id
                      ? "bg-accent/10 font-medium text-accent"
                      : "text-ink-dim hover:bg-surface hover:text-ink"
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="min-w-0 max-w-4xl flex-1">
          <h1 className="font-display text-2xl text-ink">{activeTab.label}</h1>
          <div key={revision} className="mt-5 animate-fade-in">
            {tab === "profile" && (
              <ProfileEditor
                profile={content.profile}
                onChange={updateProfile}
                onResetAll={resetAll}
                onUnauthorized={onUnauthorized}
              />
            )}
            {tab === "projects" && (
              <ProjectsEditor
                projects={content.projects}
                onChange={(projects) => setContent((c) => ({ ...c, projects }))}
                imageMap={imageMap}
                onUnauthorized={onUnauthorized}
              />
            )}
            {tab === "experience" && (
              <ExperienceEditor
                items={content.experience}
                onChange={(experience) => setContent((c) => ({ ...c, experience }))}
              />
            )}
            {tab === "skills" && (
              <SkillsEditor
                groups={content.skills}
                onChange={(skills) => setContent((c) => ({ ...c, skills }))}
              />
            )}
            {tab === "activities" && (
              <ActivitiesEditor
                items={content.additionalWork}
                onChange={(additionalWork) => setContent((c) => ({ ...c, additionalWork }))}
              />
            )}
            {tab === "resume" && (
              <ResumeEditor
                resume={content.profile.resume}
                onChange={(resume) => updateProfile({ resume })}
                onUnauthorized={onUnauthorized}
              />
            )}
          </div>
        </main>
      </div>

      {dirty && (
        <div className="fixed inset-x-0 bottom-0 z-40 animate-fade-up border-t border-line bg-base/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
            <p className="text-sm text-ink-dim" role="status" aria-live="polite">
              Unsaved changes
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={discard} className={secondaryButtonClass}>
                Discard
              </button>
              <button
                type="button"
                onClick={() => void save()}
                disabled={saving}
                className={primaryButtonClass}
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {sessionExpired && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 animate-fade-in bg-base/80 backdrop-blur-sm" aria-hidden="true" />
          <div
            ref={sessionPanelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="session-expired-title"
            className="relative w-full max-w-sm animate-pop-in rounded-2xl border border-line bg-surface p-6 text-center shadow-lift"
          >
            <h2 id="session-expired-title" className="text-base font-semibold text-ink">
              Session expired
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-dim">
              Your admin session has expired. Log in again to keep editing — unsaved changes will
              be lost.
            </p>
            <button
              ref={sessionButtonRef}
              type="button"
              onClick={() => window.location.reload()}
              className={cn(primaryButtonClass, "mt-5")}
            >
              Log in again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
