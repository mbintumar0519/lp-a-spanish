"use client";

import {
  useEffect,
  useEffectEvent,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
  type RefObject,
} from "react";

export type SelectOption<T extends string> = { value: T; label: string; shortLabel?: string };

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

const PANEL_HEIGHT = 320;

type Dropdown = ReturnType<typeof useDropdown>;

function useDropdown(
  optionCount: number,
  rootRef: RefObject<HTMLDivElement | null>,
  listRef: RefObject<HTMLUListElement | null>,
  onDismiss?: () => void,
) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [placement, setPlacement] = useState<"top" | "bottom">("bottom");
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex, listRef]);

  const dismiss = () => {
    setOpen(false);
    onDismiss?.();
  };

  const onOutsidePointer = useEffectEvent((event: PointerEvent) => {
    if (!rootRef.current?.contains(event.target as Node)) dismiss();
  });

  useEffect(() => {
    if (!open) return;
    document.addEventListener("pointerdown", onOutsidePointer, true);
    return () => document.removeEventListener("pointerdown", onOutsidePointer, true);
  }, [open]);

  const openAt = (index: number) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (rect) {
      const spaceBelow = window.innerHeight - rect.bottom;
      setPlacement(spaceBelow < PANEL_HEIGHT && rect.top > spaceBelow ? "top" : "bottom");
    }
    setActiveIndex(Math.min(Math.max(index, 0), optionCount - 1));
    setOpen(true);
  };

  const close = () => setOpen(false);

  const onKeyDown = (event: KeyboardEvent, initialIndex: number, choose: (index: number) => void) => {
    const last = optionCount - 1;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (open) setActiveIndex((index) => Math.min(index + 1, last));
        else openAt(initialIndex);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (open) setActiveIndex((index) => Math.max(index - 1, 0));
        else openAt(initialIndex);
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActiveIndex(last);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open && activeIndex >= 0) choose(activeIndex);
        else openAt(initialIndex);
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          dismiss();
        }
        break;
      case "Tab":
        if (open) dismiss();
        break;
    }
  };

  return { open, activeIndex, setActiveIndex, placement, openAt, close, dismiss, onKeyDown };
}

type TriggerProps = {
  id: string;
  dropdown: Dropdown;
  listId: string;
  labelledBy?: string;
  describedBy?: string;
  invalid?: boolean;
  buttonRef?: Ref<HTMLButtonElement>;
  onToggle: () => void;
  onKeyDown: (event: KeyboardEvent) => void;
  onBlur?: () => void;
  children: ReactNode;
};

function Trigger({
  id,
  dropdown,
  listId,
  labelledBy,
  describedBy,
  invalid,
  buttonRef,
  onToggle,
  onKeyDown,
  onBlur,
  children,
}: TriggerProps) {
  const { open, activeIndex } = dropdown;
  return (
    <button
      ref={buttonRef}
      id={id}
      type="button"
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listId}
      aria-activedescendant={open && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
      aria-labelledby={cx(labelledBy, `${id}-value`)}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      onBlur={() => {
        dropdown.close();
        onBlur?.();
      }}
      className={cx(
        "flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-left text-sm transition-all duration-200 focus:outline-none focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20",
        invalid ? "border-red-400 bg-red-50" : "border-gray-300 bg-white hover:border-red-300",
        open && "border-red-500 ring-2 ring-red-500/20",
      )}
    >
      <span id={`${id}-value`} className="min-w-0 flex-1">
        {children}
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={cx("size-5 shrink-0 text-gray-500 transition-transform duration-200", open && "rotate-180")}
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type OptionListProps<T extends string> = {
  dropdown: Dropdown;
  listRef: RefObject<HTMLUListElement | null>;
  listId: string;
  labelledBy?: string;
  options: SelectOption<T>[];
  isSelected: (value: T) => boolean;
  multiple?: boolean;
  onChoose: (index: number) => void;
  footer?: ReactNode;
};

function OptionList<T extends string>({
  dropdown,
  listRef,
  listId,
  labelledBy,
  options,
  isSelected,
  multiple,
  onChoose,
  footer,
}: OptionListProps<T>) {
  if (!dropdown.open) return null;

  return (
    <div
      onMouseDown={(event) => event.preventDefault()}
      className={cx(
        "absolute inset-x-0 z-30 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl ring-1 ring-black/5",
        dropdown.placement === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5",
      )}
    >
      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={labelledBy}
        aria-multiselectable={multiple || undefined}
        tabIndex={-1}
        className="max-h-72 overflow-y-auto overscroll-contain p-1"
      >
        {options.map((option, index) => {
          const selected = isSelected(option.value);
          const active = index === dropdown.activeIndex;
          return (
            <li
              key={option.value}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={selected}
              onMouseEnter={() => dropdown.setActiveIndex(index)}
              onClick={() => onChoose(index)}
              className={cx(
                "flex cursor-pointer items-start gap-3 rounded-md px-3 py-2.5 text-sm leading-snug transition-colors",
                active ? "bg-red-50" : "bg-white",
                selected ? "font-semibold text-red-900" : "text-gray-800",
              )}
            >
              {multiple && (
                <span
                  aria-hidden="true"
                  className={cx(
                    "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
                    selected ? "border-red-700 bg-red-700 text-white" : "border-gray-300 bg-white",
                  )}
                >
                  {selected && <CheckIcon className="size-3" />}
                </span>
              )}
              <span className="flex-1">{option.label}</span>
              {!multiple && selected && <CheckIcon className="mt-0.5 size-4 shrink-0 text-red-700" />}
            </li>
          );
        })}
      </ul>
      {footer}
    </div>
  );
}

type SharedProps<T extends string> = {
  id?: string;
  options: SelectOption<T>[];
  placeholder: string;
  labelledBy?: string;
  describedBy?: string;
  invalid?: boolean;
  onBlur?: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
};

type DropdownSelectProps<T extends string> = SharedProps<T> & {
  value?: T;
  onChange: (value: T) => void;
};

export function DropdownSelect<T extends string>({
  id,
  options,
  placeholder,
  value,
  onChange,
  ...rest
}: DropdownSelectProps<T>) {
  const generatedId = useId();
  const triggerId = id ?? generatedId;
  const listId = `${triggerId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dropdown = useDropdown(options.length, rootRef, listRef, rest.onBlur);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = options[selectedIndex];

  const choose = (index: number) => {
    onChange(options[index].value);
    rest.onBlur?.();
    dropdown.close();
  };

  return (
    <div ref={rootRef} className="relative">
      <Trigger
        id={triggerId}
        dropdown={dropdown}
        listId={listId}
        labelledBy={rest.labelledBy}
        describedBy={rest.describedBy}
        invalid={rest.invalid}
        buttonRef={rest.buttonRef}
        onBlur={rest.onBlur}
        onToggle={() => (dropdown.open ? dropdown.dismiss() : dropdown.openAt(selectedIndex))}
        onKeyDown={(event) => dropdown.onKeyDown(event, selectedIndex, choose)}
      >
        {selected ? (
          <span className="block font-medium text-gray-900">{selected.label}</span>
        ) : (
          <span className="block text-gray-500">{placeholder}</span>
        )}
      </Trigger>
      <OptionList
        dropdown={dropdown}
        listRef={listRef}
        listId={listId}
        labelledBy={rest.labelledBy}
        options={options}
        isSelected={(optionValue) => optionValue === value}
        onChoose={choose}
      />
    </div>
  );
}

type MultiSelectLabels = {
  selectedCount: (count: number) => string;
  done: string;
  remove: string;
};

type DropdownMultiSelectProps<T extends string> = SharedProps<T> & {
  value: T[];
  onChange: (value: T[]) => void;
  exclusiveValue?: T;
  labels: MultiSelectLabels;
};

export function DropdownMultiSelect<T extends string>({
  id,
  options,
  placeholder,
  value,
  onChange,
  exclusiveValue,
  labels,
  ...rest
}: DropdownMultiSelectProps<T>) {
  const generatedId = useId();
  const triggerId = id ?? generatedId;
  const listId = `${triggerId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dropdown = useDropdown(options.length, rootRef, listRef, rest.onBlur);
  const selectedOptions = options.filter((option) => value.includes(option.value));

  const toggle = (option: T) => {
    if (value.includes(option)) onChange(value.filter((item) => item !== option));
    else if (option === exclusiveValue) onChange([option]);
    else onChange([...value.filter((item) => item !== exclusiveValue), option]);
    rest.onBlur?.();
  };

  const firstSelectedIndex = options.findIndex((option) => value.includes(option.value));

  return (
    <div>
      <div ref={rootRef} className="relative">
        <Trigger
          id={triggerId}
          dropdown={dropdown}
          listId={listId}
          labelledBy={rest.labelledBy}
          describedBy={rest.describedBy}
          invalid={rest.invalid}
          buttonRef={rest.buttonRef}
          onBlur={rest.onBlur}
          onToggle={() => (dropdown.open ? dropdown.dismiss() : dropdown.openAt(firstSelectedIndex))}
          onKeyDown={(event) => dropdown.onKeyDown(event, firstSelectedIndex, (index) => toggle(options[index].value))}
        >
          {selectedOptions.length ? (
            <span className="block font-medium text-gray-900">{labels.selectedCount(selectedOptions.length)}</span>
          ) : (
            <span className="block text-gray-500">{placeholder}</span>
          )}
        </Trigger>
        <OptionList
          dropdown={dropdown}
          listRef={listRef}
          listId={listId}
          labelledBy={rest.labelledBy}
          options={options}
          multiple
          isSelected={(optionValue) => value.includes(optionValue)}
          onChoose={(index) => toggle(options[index].value)}
          footer={
            <div className="flex items-center justify-between gap-3 border-t border-gray-100 bg-gray-50 px-3 py-2">
              <span className="text-xs text-gray-500">{labels.selectedCount(selectedOptions.length)}</span>
              <button
                type="button"
                tabIndex={-1}
                onClick={dropdown.dismiss}
                className="rounded-md bg-red-700 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-800"
              >
                {labels.done}
              </button>
            </div>
          }
        />
      </div>

      {selectedOptions.length > 0 && (
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {selectedOptions.map((option) => {
            const text = option.shortLabel ?? option.label;
            return (
              <li
                key={option.value}
                className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 py-1 pr-1 pl-3 text-xs font-medium text-red-900"
              >
                {text}
                <button
                  type="button"
                  aria-label={`${labels.remove}: ${text}`}
                  onClick={() => toggle(option.value)}
                  className="flex size-5 items-center justify-center rounded-full text-red-700 transition-colors hover:bg-red-200"
                >
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-3">
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
