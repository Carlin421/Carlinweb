"use client";

import { useId, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { inputClass, labelClass } from "./styles";

type FieldProps = {
  label: ReactNode;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
};

/** Visible label + control + hint/error line. Every admin input goes through this. */
export function Field({ label, htmlFor, hint, error, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs font-medium text-accent" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-ink-mute">{hint}</p>
      ) : null}
    </div>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string;
  mono?: boolean;
  type?: string;
  placeholder?: string;
};

export function TextInput({
  mono,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { mono?: boolean }) {
  return <input {...props} className={cn(inputClass, mono && "font-mono text-[13px]", className)} />;
}

export function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputClass, "leading-6", className)} />;
}

export function InputField({
  label,
  value,
  onChange,
  hint,
  error,
  mono,
  type = "text",
  placeholder,
}: InputFieldProps) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} hint={hint} error={error}>
      <TextInput
        id={id}
        type={type}
        value={value}
        mono={mono}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
      />
    </Field>
  );
}

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  rows?: number;
  placeholder?: string;
};

export function TextAreaField({
  label,
  value,
  onChange,
  hint,
  rows = 4,
  placeholder,
}: TextAreaFieldProps) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} hint={hint}>
      <TextArea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
}

const parseCommaList = (text: string) =>
  text
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

const sameList = (a: string[], b: string[]) =>
  a.length === b.length && a.every((item, i) => item === b[i]);

type CommaListFieldProps = {
  label: string;
  value: string[];
  onChange: (items: string[]) => void;
  hint?: string;
  placeholder?: string;
};

/** Comma-separated list input with a live chip preview underneath. */
export function CommaListField({ label, value, onChange, hint, placeholder }: CommaListFieldProps) {
  const id = useId();
  const [text, setText] = useState(() => value.join(", "));

  // Re-seed the draft text when the list changes underneath us (move/discard/reset)
  // but never while the user is typing (their parse always matches `value`).
  const canonical = value.join(", ");
  if (!sameList(parseCommaList(text), value) && text !== canonical) {
    setText(canonical);
  }

  return (
    <Field label={label} htmlFor={id} hint={hint ?? "Separate items with commas."}>
      <TextInput
        id={id}
        value={text}
        placeholder={placeholder}
        onChange={(event) => {
          setText(event.target.value);
          onChange(parseCommaList(event.target.value));
        }}
        onBlur={() => setText(parseCommaList(text).join(", "))}
      />
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1" aria-hidden="true">
          {value.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="rounded-full border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-ink-dim"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </Field>
  );
}
