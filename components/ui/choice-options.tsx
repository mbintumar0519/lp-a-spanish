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

const buttonClass = (selected: boolean, invalid: boolean | undefined, inline: boolean) =>
  cx(
    "flex w-full min-h-11 items-center rounded-lg border transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-red-500/40",
    inline
      ? "justify-center px-2 py-2 text-center text-[15px] leading-tight font-semibold"
      : "gap-3 px-3.5 py-2.5 text-left text-[14px] leading-snug",
    selected
      ? "border-red-800 bg-red-800 text-white shadow-sm"
      : cx(
          "bg-white text-gray-800 hover:border-red-300 hover:bg-red-50 hover:text-red-800",
          invalid ? "border-red-300" : "border-gray-200",
        ),
    selected && !inline && "font-semibold",
  );

function RadioMark({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
        selected ? "border-white" : "border-gray-300 bg-white",
      )}
    >
      {selected && <span className="size-2 rounded-full bg-white" />}
    </span>
  );
}

function CheckMark({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "flex size-[18px] shrink-0 items-center justify-center rounded border-2 transition-colors",
        selected ? "border-white bg-white text-red-800" : "border-gray-300 bg-white",
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

function OptionButton({
  selected,
  invalid,
  inline,
  marker,
  children,
}: {
  selected: boolean;
  invalid?: boolean;
  inline: boolean;
  marker?: ReactNode;
  children: ReactNode;
}) {
  return (
    <span className={buttonClass(selected, invalid, inline)}>
      {!inline && marker}
      <span className={inline ? undefined : "flex-1"}>{children}</span>
    </span>
  );
}

const GRID_COLUMNS = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3" } as const;

type RadioOptionsProps<T extends string> = SharedProps<T> & {
  value?: T;
  onChange: (value: T) => void;
  columns?: keyof typeof GRID_COLUMNS;
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
  columns = 1,
}: RadioOptionsProps<T>) {
  const generatedId = useId();
  const groupId = id ?? generatedId;
  const inline = columns > 1;

  return (
    <div
      id={groupId}
      role="radiogroup"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      aria-required
      className={cx("grid", inline ? "gap-2.5" : "gap-2", GRID_COLUMNS[columns])}
    >
      {options.map((option, index) => {
        const selected = value === option.value;
        return (
          <label key={option.value} className="flex cursor-pointer">
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
            <OptionButton
              selected={selected}
              invalid={invalid}
              inline={inline}
              marker={<RadioMark selected={selected} />}
            >
              {option.label}
            </OptionButton>
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
        return (
          <label key={option.value} className="flex cursor-pointer">
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
            <OptionButton
              selected={selected}
              invalid={invalid}
              inline={false}
              marker={<CheckMark selected={selected} />}
            >
              {option.label}
            </OptionButton>
          </label>
        );
      })}
    </div>
  );
}
