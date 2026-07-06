"use client";

import type { AdditionalWorkItem } from "@/lib/siteContent";

import { moveItem, removeItem, updateItem } from "./arrayUtils";
import { CommaListField, InputField, TextAreaField } from "./fields";
import { MoveButtons } from "./MoveButtons";
import { SectionCard } from "./SectionCard";
import { StringListEditor } from "./StringListEditor";
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
};

export function ActivitiesEditor({ items, onChange }: ActivitiesEditorProps) {
  return (
    <div className="space-y-6">
      {items.length === 0 && <p className="text-sm italic text-ink-mute">No activities yet.</p>}
      {items.map((item, i) => (
        <SectionCard
          key={i}
          title={item.title || `Activity ${i + 1}`}
          description={item.category || undefined}
          actions={
            <div className="flex gap-1">
              <MoveButtons
                index={i}
                count={items.length}
                onMove={(index, dir) => onChange(moveItem(items, index, dir))}
                label={item.title || `activity ${i + 1}`}
              />
              <button
                type="button"
                aria-label={`Remove ${item.title || `activity ${i + 1}`}`}
                onClick={() => onChange(removeItem(items, i))}
                className={iconButtonClass}
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>
          }
        >
          <InputField
            label="Title"
            value={item.title}
            onChange={(v) => onChange(updateItem(items, i, { title: v }))}
          />
          <InputField
            label="Category"
            value={item.category}
            onChange={(v) => onChange(updateItem(items, i, { category: v }))}
          />
          <TextAreaField
            label="Description"
            value={item.description}
            onChange={(v) => onChange(updateItem(items, i, { description: v }))}
            rows={3}
          />
          <StringListEditor
            label="Evidence"
            items={item.evidence}
            onChange={(evidence) => onChange(updateItem(items, i, { evidence }))}
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
      ))}
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
