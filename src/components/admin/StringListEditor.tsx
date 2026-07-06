"use client";

import { moveItem, removeItem } from "./arrayUtils";
import { TextArea, TextInput } from "./fields";
import { MoveButtons } from "./MoveButtons";
import { addButtonClass, iconButtonClass, labelClass } from "./styles";

type StringListEditorProps = {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  addLabel?: string;
  /** Render textareas instead of single-line inputs. */
  multiline?: boolean;
  rows?: number;
  hint?: string;
  placeholder?: string;
};

/** Ordered list of strings with add / remove / move up / move down. */
export function StringListEditor({
  label,
  items,
  onChange,
  addLabel = "Add item",
  multiline = false,
  rows = 3,
  hint,
  placeholder,
}: StringListEditorProps) {
  const update = (index: number, value: string) =>
    onChange(items.map((item, i) => (i === index ? value : item)));

  return (
    <fieldset className="space-y-2">
      <legend className={labelClass}>{label}</legend>
      {hint && <p className="text-xs text-ink-mute">{hint}</p>}
      {items.length === 0 && <p className="text-xs italic text-ink-mute">Nothing here yet.</p>}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              className="w-5 shrink-0 pt-2.5 text-right font-mono text-[11px] text-ink-mute"
              aria-hidden="true"
            >
              {i + 1}.
            </span>
            {multiline ? (
              <TextArea
                aria-label={`${label} ${i + 1}`}
                value={item}
                rows={rows}
                placeholder={placeholder}
                onChange={(event) => update(i, event.target.value)}
              />
            ) : (
              <TextInput
                aria-label={`${label} ${i + 1}`}
                value={item}
                placeholder={placeholder}
                onChange={(event) => update(i, event.target.value)}
              />
            )}
            <MoveButtons
              index={i}
              count={items.length}
              onMove={(index, dir) => onChange(moveItem(items, index, dir))}
              label={`${label} ${i + 1}`}
            />
            <button
              type="button"
              aria-label={`Remove ${label} ${i + 1}`}
              onClick={() => onChange(removeItem(items, i))}
              className={iconButtonClass}
            >
              <span aria-hidden="true">✕</span>
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => onChange([...items, ""])} className={addButtonClass}>
        + {addLabel}
      </button>
    </fieldset>
  );
}
