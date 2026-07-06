"use client";

import type { ExperienceItem } from "@/lib/siteContent";

import { moveItem, removeItem, updateItem } from "./arrayUtils";
import { InputField, TextAreaField } from "./fields";
import { MoveButtons } from "./MoveButtons";
import { SectionCard } from "./SectionCard";
import { StringListEditor } from "./StringListEditor";
import { addButtonClass, iconButtonClass } from "./styles";

const emptyExperience = (): ExperienceItem => ({
  role: "",
  company: "",
  location: "",
  date: "",
  description: "",
  bullets: [],
});

type ExperienceEditorProps = {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
};

export function ExperienceEditor({ items, onChange }: ExperienceEditorProps) {
  return (
    <div className="space-y-6">
      {items.length === 0 && (
        <p className="text-sm italic text-ink-mute">No experience entries yet.</p>
      )}
      {items.map((item, i) => (
        <SectionCard
          key={i}
          title={item.role || `Experience ${i + 1}`}
          description={[item.company, item.date].filter(Boolean).join(" · ") || undefined}
          actions={
            <div className="flex gap-1">
              <MoveButtons
                index={i}
                count={items.length}
                onMove={(index, dir) => onChange(moveItem(items, index, dir))}
                label={item.role || `experience entry ${i + 1}`}
              />
              <button
                type="button"
                aria-label={`Remove ${item.role || `experience entry ${i + 1}`}`}
                onClick={() => onChange(removeItem(items, i))}
                className={iconButtonClass}
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              label="Role"
              value={item.role}
              onChange={(v) => onChange(updateItem(items, i, { role: v }))}
            />
            <InputField
              label="Company"
              value={item.company}
              onChange={(v) => onChange(updateItem(items, i, { company: v }))}
            />
            <InputField
              label="Location"
              value={item.location}
              onChange={(v) => onChange(updateItem(items, i, { location: v }))}
            />
            <InputField
              label="Date"
              value={item.date}
              onChange={(v) => onChange(updateItem(items, i, { date: v }))}
              hint='Free text, e.g. "Summer 2026".'
            />
          </div>
          <TextAreaField
            label="Description"
            value={item.description}
            onChange={(v) => onChange(updateItem(items, i, { description: v }))}
            rows={3}
          />
          <StringListEditor
            label="Bullets"
            items={item.bullets}
            onChange={(bullets) => onChange(updateItem(items, i, { bullets }))}
            addLabel="Add bullet"
            multiline
            rows={2}
          />
        </SectionCard>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, emptyExperience()])}
        className={addButtonClass}
      >
        + Add experience
      </button>
    </div>
  );
}
