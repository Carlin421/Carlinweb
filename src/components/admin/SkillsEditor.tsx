"use client";

import type { SkillGroup } from "@/lib/siteContent";

import { moveItem, removeItem, updateItem } from "./arrayUtils";
import { CommaListField, InputField } from "./fields";
import { MoveButtons } from "./MoveButtons";
import { SectionCard } from "./SectionCard";
import { addButtonClass, iconButtonClass } from "./styles";

const emptyGroup = (): SkillGroup => ({ category: "", items: [] });

type SkillsEditorProps = {
  groups: SkillGroup[];
  onChange: (groups: SkillGroup[]) => void;
};

export function SkillsEditor({ groups, onChange }: SkillsEditorProps) {
  return (
    <div className="space-y-6">
      {groups.length === 0 && <p className="text-sm italic text-ink-mute">No skill groups yet.</p>}
      {groups.map((group, i) => (
        <SectionCard
          key={i}
          title={group.category || `Skill group ${i + 1}`}
          actions={
            <div className="flex gap-1">
              <MoveButtons
                index={i}
                count={groups.length}
                onMove={(index, dir) => onChange(moveItem(groups, index, dir))}
                label={group.category || `skill group ${i + 1}`}
              />
              <button
                type="button"
                aria-label={`Remove ${group.category || `skill group ${i + 1}`}`}
                onClick={() => onChange(removeItem(groups, i))}
                className={iconButtonClass}
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>
          }
        >
          <InputField
            label="Category"
            value={group.category}
            onChange={(v) => onChange(updateItem(groups, i, { category: v }))}
          />
          <CommaListField
            label="Skills"
            value={group.items}
            onChange={(items) => onChange(updateItem(groups, i, { items }))}
            placeholder="TypeScript, Python, SQL"
          />
        </SectionCard>
      ))}
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
