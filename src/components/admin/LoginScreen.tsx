"use client";

import { useState, type FormEvent } from "react";

import { Field, TextInput } from "./fields";
import { primaryButtonClass } from "./styles";

export function LoginScreen() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        // The server now sees the session cookie and renders the dashboard.
        window.location.reload();
        return;
      }
      setError(
        res.status === 429
          ? "Too many attempts — try again in a few minutes"
          : res.status === 401
            ? "Wrong password"
            : "Something went wrong — try again"
      );
    } catch {
      setError("Something went wrong — try again");
    }
    setBusy(false);
  };

  return (
    <div className="w-full max-w-sm animate-fade-up rounded-2xl border border-line bg-surface p-8 shadow-card">
      <h1 className="font-display text-2xl text-ink">Admin</h1>
      <p className="mt-2 text-sm text-ink-dim">Sign in to edit what the site says.</p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <Field label="Password" htmlFor="admin-password">
          <div className="relative">
            <TextInput
              id="admin-password"
              type={visible ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              autoFocus
              required
              className="pr-16"
            />
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? "Hide password" : "Show password"}
              aria-pressed={visible}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-ink-dim transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {visible ? "Hide" : "Show"}
            </button>
          </div>
        </Field>

        <p aria-live="polite" className="min-h-5 text-sm font-medium text-accent" role="status">
          {error}
        </p>

        <button type="submit" disabled={busy} className={`${primaryButtonClass} w-full`}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
