"use client";

import { useId, type ReactNode, type Ref } from "react";

export type ChoiceOption<T extends string> = { value: T; label: string };

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

type SharedProps<T extends string> = {
  id?: string;
  options: ChoiceOption<T>[];
  onBlur?: () => void;
  inputRef?: Ref<HTMLInputElement>;
  labelledBy?: string;
  describedBy?: string;
  invalid?: boolean;
};

const rowClass = (selected: boolean, invalid?: boolean) =>
  cx(
    "flex min-h-12 items-center gap-3 rounded-lg border px-3.5 py-2.5 text-[15px] leading-snug transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-red-500/30",
    selected
      ? "border-red-700 bg-red-50/70 font-semibold text-gray-900"
      : invalid
        ? "border-red-300 bg-white text-gray-800 hover:border-red-400"
        : "border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50",
  );

function OptionRow({
  selected,
  invalid,
  marker,
  children,
}: {
  selected: boolean;
  invalid?: boolean;
  marker: ReactNode;
  children: ReactNode;
}) {
  return (
    <span className={rowClass(selected, invalid)}>
      {marker}
      <span className="flex-1">{children}</span>
    </span>
  );
}

function RadioMark({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "flex size-5 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-colors",
        selected ? "border-red-700" : "border-gray-300",
      )}
    >
      {selected && <span className="size-2.5 rounded-full bg-red-700" />}
    </span>
  );
}

function CheckMark({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
        selected ? "border-red-700 bg-red-700 text-white" : "border-gray-300 bg-white",
      )}
    >
      {selected && (
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
          <path
            fillRule="evenodd"
            d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </span>
  );
}

type RadioOptionsProps<T extends string> = SharedProps<T> & {
  value?: T;
  onChange: (value: T) => void;
};

export function RadioOptions<T extends string>({
  id,
  options,
  value,
  onChange,
  onBlur,
  inputRef,
  labelledBy,
  describedBy,
  invalid,
}: RadioOptionsProps<T>) {
  const generatedId = useId();
  const groupId = id ?? generatedId;

  return (
    <div
      id={groupId}
      role="radiogroup"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      aria-required
      className="grid gap-2"
    >
      {options.map((option, index) => {
        const selected = value === option.value;
        return (
          <label key={option.value} className="block cursor-pointer">
            <input
              ref={index === 0 ? inputRef : undefined}
              type="radio"
              name={groupId}
              value={option.value}
              checked={selected}
              onChange={() => {
                onChange(option.value);
                onBlur?.();
              }}
              onBlur={onBlur}
              className="peer sr-only"
            />
            <OptionRow selected={selected} invalid={invalid} marker={<RadioMark selected={selected} />}>
              {option.label}
            </OptionRow>
          </label>
        );
      })}
    </div>
  );
}

type CheckboxOptionsProps<T extends string> = SharedProps<T> & {
  value: T[];
  onChange: (value: T[]) => void;
  exclusiveValue?: T;
};

export function CheckboxOptions<T extends string>({
  id,
  options,
  value,
  onChange,
  onBlur,
  inputRef,
  labelledBy,
  describedBy,
  invalid,
  exclusiveValue,
}: CheckboxOptionsProps<T>) {
  const generatedId = useId();
  const groupId = id ?? generatedId;

  const toggle = (option: T) => {
    if (value.includes(option)) onChange(value.filter((item) => item !== option));
    else if (option === exclusiveValue) onChange([option]);
    else onChange([...value.filter((item) => item !== exclusiveValue), option]);
    onBlur?.();
  };

  return (
    <div id={groupId} role="group" aria-labelledby={labelledBy} aria-describedby={describedBy} className="grid gap-2">
      {options.map((option, index) => {
        const selected = value.includes(option.value);
        const isExclusive = option.value === exclusiveValue;
        return (
          <label key={option.value} className={cx("block cursor-pointer", isExclusive && "mt-1")}>
            <input
              ref={index === 0 ? inputRef : undefined}
              type="checkbox"
              name={groupId}
              value={option.value}
              checked={selected}
              aria-invalid={invalid || undefined}
              onChange={() => toggle(option.value)}
              onBlur={onBlur}
              className="peer sr-only"
            />
            <OptionRow selected={selected} invalid={invalid} marker={<CheckMark selected={selected} />}>
              {option.label}
            </OptionRow>
          </label>
        );
      })}
    </div>
  );
}
