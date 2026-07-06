"use client";

import { pick, type Locale } from "@/lib/i18n";
import type { ExperienceItem } from "@/lib/siteContent";

import { moveItem, removeItem, updateItem } from "./arrayUtils";
import { InputField } from "./fields";
import { LocalizedInput, LocalizedListEditor, LocalizedTextArea } from "./LocalizedField";
import { MoveButtons } from "./MoveButtons";
import { SectionCard } from "./SectionCard";
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
  locale: Locale;
};

export function ExperienceEditor({ items, onChange, locale }: ExperienceEditorProps) {
  return (
    <div className="space-y-6">
      {items.length === 0 && (
        <p className="text-sm italic text-ink-mute">No experience entries yet.</p>
      )}
      {items.map((item, i) => {
        const roleText = pick(item.role, locale);
        const dateText = pick(item.date, locale);
        return (
        <SectionCard
          key={i}
          title={roleText || `Experience ${i + 1}`}
          description={[item.company, dateText].filter(Boolean).join(" · ") || undefined}
          actions={
            <div className="flex gap-1">
              <MoveButtons
                index={i}
                count={items.length}
                onMove={(index, dir) => onChange(moveItem(items, index, dir))}
                label={roleText || `experience entry ${i + 1}`}
              />
              <button
                type="button"
                aria-label={`Remove ${roleText || `experience entry ${i + 1}`}`}
                onClick={() => onChange(removeItem(items, i))}
                className={iconButtonClass}
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            <LocalizedInput
              label="Role"
              value={item.role}
              onChange={(role) => onChange(updateItem(items, i, { role }))}
              locale={locale}
            />
            <InputField
              label="Company"
              value={item.company}
              onChange={(v) => onChange(updateItem(items, i, { company: v }))}
            />
            <LocalizedInput
              label="Location"
              value={item.location}
              onChange={(location) => onChange(updateItem(items, i, { location }))}
              locale={locale}
            />
            <LocalizedInput
              label="Date"
              value={item.date}
              onChange={(date) => onChange(updateItem(items, i, { date }))}
              locale={locale}
              hint='Free text, e.g. "Summer 2026".'
            />
          </div>
          <LocalizedTextArea
            label="Description"
            value={item.description}
            onChange={(description) => onChange(updateItem(items, i, { description }))}
            locale={locale}
            rows={3}
          />
          <LocalizedListEditor
            label="Bullets"
            items={item.bullets}
            onChange={(bullets) => onChange(updateItem(items, i, { bullets }))}
            locale={locale}
            addLabel="Add bullet"
            multiline
            rows={2}
          />
        </SectionCard>
        );
      })}
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
