import { useId, type ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/cn";

export type QuestionA11y = { id: string; labelledBy: string; describedBy?: string; invalid: boolean };

type QuestionFieldProps = {
  number: number;
  prompt: ReactNode;
  hint?: string;
  error?: string;
  note?: string;
  className?: string;
  children: (a11y: QuestionA11y) => ReactNode;
};

export function QuestionField({ number, prompt, hint, error, note, className, children }: QuestionFieldProps) {
  const baseId = useId();
  const ids = {
    control: `${baseId}-control`,
    label: `${baseId}-label`,
    hint: `${baseId}-hint`,
    error: `${baseId}-error`,
  };
  const describedBy = [hint && ids.hint, error && ids.error].filter(Boolean).join(" ") || undefined;

  return (
    <div
      className={cn(
        "rounded-lg border bg-gray-50 p-4 transition-colors sm:p-5",
        error ? "border-red-300" : "border-gray-100",
        className,
      )}
    >
      <div className="mb-3 flex items-start gap-3">
        <span
          aria-hidden="true"
          className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-800"
        >
          {number}
        </span>
        <div>
          <label
            id={ids.label}
            htmlFor={ids.control}
            className="block text-[15px] leading-snug font-medium text-gray-800"
          >
            {prompt}
          </label>
          {hint && (
            <p id={ids.hint} className="mt-1 text-sm text-gray-500">
              {hint}
            </p>
          )}
        </div>
      </div>
      {children({ id: ids.control, labelledBy: ids.label, describedBy, invalid: Boolean(error) })}
      {error && (
        <p id={ids.error} role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
      {note && (
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <span className="font-medium">Nota:</span> {note}
        </div>
      )}
    </div>
  );
}

type ConsentCheckboxProps = {
  id: string;
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
};

export function ConsentCheckbox({ id, label, error, registration }: ConsentCheckboxProps) {
  const errorId = `${id}-error`;
  return (
    <div className="mt-5">
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
          error ? "border-red-300 bg-red-50/40" : "border-gray-200 bg-white hover:border-red-200",
        )}
      >
        <input
          id={id}
          type="checkbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-red-700"
          {...registration}
        />
        <span className="text-sm leading-relaxed text-gray-700">{label}</span>
      </label>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
