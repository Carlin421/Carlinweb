"use client";

import { useId } from "react";

import { pick, setLocalized, type Locale, type Localized } from "@/lib/i18n";

import { moveItem, removeItem } from "./arrayUtils";
import { Field, TextArea, TextInput } from "./fields";
import { MoveButtons } from "./MoveButtons";
import { addButtonClass, iconButtonClass, labelClass } from "./styles";

/** Tiny EN / 中 pill on a label so it's always clear which language is being edited. */
function LocaleBadge({ locale }: { locale: Locale }) {
  return (
    <span
      aria-hidden="true"
      className="ml-2 rounded-full border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-dim"
    >
      {locale === "zh" ? "中" : "EN"}
    </span>
  );
}

/** Screen-reader-only suffix so the accessible label names the current language too. */
const localeLabel = (locale: Locale) => (locale === "zh" ? "Chinese" : "English");

type LocalizedInputProps = {
  label: string;
  value: Localized | undefined;
  onChange: (value: Localized) => void;
  locale: Locale;
  mono?: boolean;
  hint?: string;
  error?: string;
  placeholder?: string;
};

/** Single-line input bound to one language of a `Localized` value. */
export function LocalizedInput({
  label,
  value,
  onChange,
  locale,
  mono,
  hint,
  error,
  placeholder,
}: LocalizedInputProps) {
  const id = useId();
  return (
    <Field
      label={
        <>
          {label}
          <LocaleBadge locale={locale} />
        </>
      }
      htmlFor={id}
      hint={hint}
      error={error}
    >
      <TextInput
        id={id}
        value={pick(value, locale)}
        mono={mono}
        placeholder={placeholder}
        aria-label={`${label} (${localeLabel(locale)})`}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange(setLocalized(value, locale, event.target.value))}
      />
    </Field>
  );
}

type LocalizedTextAreaProps = {
  label: string;
  value: Localized | undefined;
  onChange: (value: Localized) => void;
  locale: Locale;
  rows?: number;
  hint?: string;
  error?: string;
  placeholder?: string;
};

/** Multi-line textarea bound to one language of a `Localized` value. */
export function LocalizedTextArea({
  label,
  value,
  onChange,
  locale,
  rows = 4,
  hint,
  error,
  placeholder,
}: LocalizedTextAreaProps) {
  const id = useId();
  return (
    <Field
      label={
        <>
          {label}
          <LocaleBadge locale={locale} />
        </>
      }
      htmlFor={id}
      hint={hint}
      error={error}
    >
      <TextArea
        id={id}
        rows={rows}
        value={pick(value, locale)}
        placeholder={placeholder}
        aria-label={`${label} (${localeLabel(locale)})`}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange(setLocalized(value, locale, event.target.value))}
      />
    </Field>
  );
}

type LocalizedListEditorProps = {
  label: string;
  items: Localized[];
  onChange: (items: Localized[]) => void;
  locale: Locale;
  addLabel?: string;
  /** Render textareas instead of single-line inputs. */
  multiline?: boolean;
  rows?: number;
  hint?: string;
  placeholder?: string;
};

/**
 * Ordered list of `Localized` values with add / remove / move. Each row edits
 * only the current `locale`; the other language is preserved via `setLocalized`.
 */
export function LocalizedListEditor({
  label,
  items,
  onChange,
  locale,
  addLabel = "Add item",
  multiline = false,
  rows = 3,
  hint,
  placeholder,
}: LocalizedListEditorProps) {
  const update = (index: number, next: string) =>
    onChange(items.map((item, i) => (i === index ? setLocalized(item, locale, next) : item)));

  return (
    <fieldset className="space-y-2">
      <legend className={labelClass}>
        {label}
        <LocaleBadge locale={locale} />
      </legend>
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
                aria-label={`${label} ${i + 1} (${localeLabel(locale)})`}
                value={pick(item, locale)}
                rows={rows}
                placeholder={placeholder}
                onChange={(event) => update(i, event.target.value)}
              />
            ) : (
              <TextInput
                aria-label={`${label} ${i + 1} (${localeLabel(locale)})`}
                value={pick(item, locale)}
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
      <button type="button" onClick={() => onChange([...items, {}])} className={addButtonClass}>
        + {addLabel}
      </button>
    </fieldset>
  );
}
