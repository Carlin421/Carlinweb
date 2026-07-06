"use client";

import { pick, type Locale } from "@/lib/i18n";
import type { AdditionalWorkItem } from "@/lib/siteContent";

import { moveItem, removeItem, updateItem } from "./arrayUtils";
import { CommaListField } from "./fields";
import { LocalizedInput, LocalizedListEditor, LocalizedTextArea } from "./LocalizedField";
import { MoveButtons } from "./MoveButtons";
import { SectionCard } from "./SectionCard";
import { addButtonClass, iconButtonClass } from "./styles";

const emptyActivity = (): AdditionalWorkItem => ({
  title: "",
  category: "",
  description: "",
  evidence: [],
  tags: [],
});

type ActivitiesEditorProps = {
  items: AdditionalWorkItem[];
  onChange: (items: AdditionalWorkItem[]) => void;
  locale: Locale;
};

export function ActivitiesEditor({ items, onChange, locale }: ActivitiesEditorProps) {
  return (
    <div className="space-y-6">
      {items.length === 0 && <p className="text-sm italic text-ink-mute">No activities yet.</p>}
      {items.map((item, i) => {
        const titleText = pick(item.title, locale);
        const categoryText = pick(item.category, locale);
        return (
        <SectionCard
          key={i}
          title={titleText || `Activity ${i + 1}`}
          description={categoryText || undefined}
          actions={
            <div className="flex gap-1">
              <MoveButtons
                index={i}
                count={items.length}
                onMove={(index, dir) => onChange(moveItem(items, index, dir))}
                label={titleText || `activity ${i + 1}`}
              />
              <button
                type="button"
                aria-label={`Remove ${titleText || `activity ${i + 1}`}`}
                onClick={() => onChange(removeItem(items, i))}
                className={iconButtonClass}
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>
          }
        >
          <LocalizedInput
            label="Title"
            value={item.title}
            onChange={(title) => onChange(updateItem(items, i, { title }))}
            locale={locale}
          />
          <LocalizedInput
            label="Category"
            value={item.category}
            onChange={(category) => onChange(updateItem(items, i, { category }))}
            locale={locale}
          />
          <LocalizedTextArea
            label="Description"
            value={item.description}
            onChange={(description) => onChange(updateItem(items, i, { description }))}
            locale={locale}
            rows={3}
          />
          <LocalizedListEditor
            label="Evidence"
            items={item.evidence}
            onChange={(evidence) => onChange(updateItem(items, i, { evidence }))}
            locale={locale}
            addLabel="Add evidence"
            multiline
            rows={2}
          />
          <CommaListField
            label="Tags"
            value={item.tags}
            onChange={(tags) => onChange(updateItem(items, i, { tags }))}
          />
        </SectionCard>
        );
      })}
      <button
        type="button"
        onClick={() => onChange([...items, emptyActivity()])}
        className={addButtonClass}
      >
        + Add activity
      </button>
    </div>
  );
}
