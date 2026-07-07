"use client";

import { pick, type Locale } from "@/lib/i18n";
import type { Honor } from "@/lib/siteContent";

import { moveItem, removeItem, updateItem } from "./arrayUtils";
import { InputField } from "./fields";
import { LocalizedInput } from "./LocalizedField";
import { MoveButtons } from "./MoveButtons";
import { SectionCard } from "./SectionCard";
import { addButtonClass, iconButtonClass } from "./styles";

const emptyHonor = (): Honor => ({ title: {}, detail: {}, year: "" });

type HonorsEditorProps = {
  honors: Honor[];
  onChange: (honors: Honor[]) => void;
  locale: Locale;
};

export function HonorsEditor({ honors, onChange, locale }: HonorsEditorProps) {
  return (
    <div className="space-y-6">
      {honors.length === 0 && <p className="text-sm italic text-ink-mute">No awards yet.</p>}
      {honors.map((honor, i) => {
        const titleText = pick(honor.title, locale);
        return (
          <SectionCard
            key={i}
            title={titleText || `Award ${i + 1}`}
            description={[pick(honor.detail, locale), honor.year].filter(Boolean).join(" · ") || undefined}
            actions={
              <div className="flex gap-1">
                <MoveButtons
                  index={i}
                  count={honors.length}
                  onMove={(index, dir) => onChange(moveItem(honors, index, dir))}
                  label={titleText || `award ${i + 1}`}
                />
                <button
                  type="button"
                  aria-label={`Remove ${titleText || `award ${i + 1}`}`}
                  onClick={() => onChange(removeItem(honors, i))}
                  className={iconButtonClass}
                >
                  <span aria-hidden="true">✕</span>
                </button>
              </div>
            }
          >
            <LocalizedInput
              label="Title"
              value={honor.title}
              onChange={(title) => onChange(updateItem(honors, i, { title }))}
              locale={locale}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <LocalizedInput
                label="Detail"
                value={honor.detail}
                onChange={(detail) => onChange(updateItem(honors, i, { detail }))}
                locale={locale}
                hint='Placement or distinction, e.g. "1st Place".'
              />
              <InputField
                label="Year"
                mono
                value={honor.year}
                onChange={(year) => onChange(updateItem(honors, i, { year }))}
                placeholder="2024"
              />
            </div>
          </SectionCard>
        );
      })}
      <button
        type="button"
        onClick={() => onChange([...honors, emptyHonor()])}
        className={addButtonClass}
      >
        + Add award
      </button>
    </div>
  );
}
