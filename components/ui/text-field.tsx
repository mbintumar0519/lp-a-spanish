import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { FieldError } from "@/components/ui/field-error";

type TextFieldProps = Omit<ComponentProps<"input">, "id"> & {
  id: string;
  label: ReactNode;
  hint?: string;
  error?: string;
};

export function TextField({ id, label, hint, error, className, ...inputProps }: TextFieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-1.5">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          "w-full px-3.5 py-2.5 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:ring-offset-0 focus:border-red-500 hover:border-red-300",
          error ? "border-red-400 bg-red-50" : "border-gray-300 bg-white",
          className,
        )}
        {...inputProps}
      />
      {hint && (
        <p id={hintId} className="mt-1 text-xs text-gray-500">
          {hint}
        </p>
      )}
      <FieldError id={errorId} message={error} />
    </div>
  );
}
