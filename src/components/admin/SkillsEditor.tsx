"use client";

import { pick, type Locale } from "@/lib/i18n";
import type { SkillGroup } from "@/lib/siteContent";

import { moveItem, removeItem, updateItem } from "./arrayUtils";
import { CommaListField } from "./fields";
import { LocalizedInput } from "./LocalizedField";
import { MoveButtons } from "./MoveButtons";
import { SectionCard } from "./SectionCard";
import { addButtonClass, iconButtonClass } from "./styles";

const emptyGroup = (): SkillGroup => ({ category: "", items: [] });

type SkillsEditorProps = {
  groups: SkillGroup[];
  onChange: (groups: SkillGroup[]) => void;
  locale: Locale;
};

export function SkillsEditor({ groups, onChange, locale }: SkillsEditorProps) {
  return (
    <div className="space-y-6">
      {groups.length === 0 && <p className="text-sm italic text-ink-mute">No skill groups yet.</p>}
      {groups.map((group, i) => {
        const categoryText = pick(group.category, locale);
        return (
        <SectionCard
          key={i}
          title={categoryText || `Skill group ${i + 1}`}
          actions={
            <div className="flex gap-1">
              <MoveButtons
                index={i}
                count={groups.length}
                onMove={(index, dir) => onChange(moveItem(groups, index, dir))}
                label={categoryText || `skill group ${i + 1}`}
              />
              <button
                type="button"
                aria-label={`Remove ${categoryText || `skill group ${i + 1}`}`}
                onClick={() => onChange(removeItem(groups, i))}
                className={iconButtonClass}
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>
          }
        >
          <LocalizedInput
            label="Category"
            value={group.category}
            onChange={(category) => onChange(updateItem(groups, i, { category }))}
            locale={locale}
          />
          <CommaListField
            label="Skills"
            value={group.items}
            onChange={(items) => onChange(updateItem(groups, i, { items }))}
            placeholder="TypeScript, Python, SQL"
          />
        </SectionCard>
        );
      })}
      <button
        type="button"
        onClick={() => onChange([...groups, emptyGroup()])}
        className={addButtonClass}
      >
        + Add skill group
      </button>
    </div>
  );
}
