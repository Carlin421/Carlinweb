"use client";

import { useState } from "react";

import type { Profile } from "@/lib/siteContent";

import { moveItem, removeItem, updateItem } from "./arrayUtils";
import { ConfirmDialog } from "./ConfirmDialog";
import { InputField, TextAreaField } from "./fields";
import { MoveButtons } from "./MoveButtons";
import { SectionCard } from "./SectionCard";
import { StringListEditor } from "./StringListEditor";
import { addButtonClass, dangerButtonClass, iconButtonClass } from "./styles";

type ProfileEditorProps = {
  profile: Profile;
  onChange: (patch: Partial<Profile>) => void;
  onResetAll: () => void;
};

export function ProfileEditor({ profile, onChange, onResetAll }: ProfileEditorProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  const addEducation = () =>
    onChange({ education: [...profile.education, { school: "", degree: "", detail: "" }] });

  return (
    <div className="space-y-6">
      <SectionCard title="Identity" description="Name and headline shown in the hero.">
        <InputField label="Name" value={profile.name} onChange={(v) => onChange({ name: v })} />
        <InputField label="Title" value={profile.title} onChange={(v) => onChange({ title: v })} />
        <div className="grid gap-4 md:grid-cols-2">
          <InputField
            label="Availability badge"
            value={profile.availability}
            onChange={(v) => onChange({ availability: v })}
            hint="Short text shown in the availability badge."
          />
          <InputField
            label="Location"
            value={profile.location}
            onChange={(v) => onChange({ location: v })}
          />
        </div>
      </SectionCard>

      <SectionCard title="Contact & links">
        <InputField
          label="Email"
          value={profile.email}
          onChange={(v) => onChange({ email: v })}
          hint="Leave as YOUR_EMAIL_HERE to hide the email button on the site."
        />
        <InputField
          label="GitHub URL"
          mono
          value={profile.github}
          onChange={(v) => onChange({ github: v })}
        />
        <InputField
          label="LinkedIn URL"
          mono
          value={profile.linkedin}
          onChange={(v) => onChange({ linkedin: v })}
        />
      </SectionCard>

      <SectionCard title="Intro">
        <TextAreaField
          label="Short intro"
          value={profile.shortIntro}
          onChange={(v) => onChange({ shortIntro: v })}
          rows={4}
        />
        <TextAreaField
          label="Search status"
          value={profile.searchStatus}
          onChange={(v) => onChange({ searchStatus: v })}
          rows={3}
        />
      </SectionCard>

      <SectionCard title="About">
        <StringListEditor
          label="About paragraphs"
          items={profile.about}
          onChange={(about) => onChange({ about })}
          addLabel="Add paragraph"
          multiline
          rows={3}
        />
      </SectionCard>

      <SectionCard title="Education">
        {profile.education.length === 0 && (
          <p className="text-xs italic text-ink-mute">No education entries yet.</p>
        )}
        {profile.education.map((entry, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-line bg-base-2 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                Entry {i + 1}
              </span>
              <div className="flex gap-1">
                <MoveButtons
                  index={i}
                  count={profile.education.length}
                  onMove={(index, dir) =>
                    onChange({ education: moveItem(profile.education, index, dir) })
                  }
                  label={`education entry ${i + 1}`}
                />
                <button
                  type="button"
                  aria-label={`Remove education entry ${i + 1}`}
                  onClick={() => onChange({ education: removeItem(profile.education, i) })}
                  className={iconButtonClass}
                >
                  <span aria-hidden="true">✕</span>
                </button>
              </div>
            </div>
            <InputField
              label="School"
              value={entry.school}
              onChange={(v) => onChange({ education: updateItem(profile.education, i, { school: v }) })}
            />
            <InputField
              label="Degree"
              value={entry.degree}
              onChange={(v) => onChange({ education: updateItem(profile.education, i, { degree: v }) })}
            />
            <InputField
              label="Detail"
              value={entry.detail}
              onChange={(v) => onChange({ education: updateItem(profile.education, i, { detail: v }) })}
            />
          </div>
        ))}
        <button type="button" onClick={addEducation} className={addButtonClass}>
          + Add education
        </button>
      </SectionCard>

      <SectionCard title="Focus areas">
        <StringListEditor
          label="Focus areas"
          items={profile.focusAreas}
          onChange={(focusAreas) => onChange({ focusAreas })}
          addLabel="Add focus area"
        />
      </SectionCard>

      <SectionCard
        title="Danger zone"
        description="Resets apply to the live site immediately and cannot be undone."
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-md text-sm leading-6 text-ink-dim">
            Reset all content to the defaults committed in code. Every saved change — profile,
            projects, experience, skills, and activities — will be deleted.
          </p>
          <button type="button" onClick={() => setConfirmReset(true)} className={dangerButtonClass}>
            Reset all content
          </button>
        </div>
      </SectionCard>

      <ConfirmDialog
        open={confirmReset}
        title="Reset all content?"
        description="Every saved change will be deleted and the site will go back to the defaults in code. This cannot be undone."
        confirmLabel="Reset everything"
        destructive
        onConfirm={() => {
          setConfirmReset(false);
          onResetAll();
        }}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
}
