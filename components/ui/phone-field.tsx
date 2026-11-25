import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { FieldError } from "@/components/ui/field-error";
import { ChevronDownIcon, UsFlagIcon } from "@/components/ui/icons";

type PhoneFieldProps = Omit<ComponentProps<"input">, "id" | "type"> & {
  id: string;
  label: ReactNode;
  hint?: string;
  error?: string;
};

export function PhoneField({ id, label, hint, error, ...inputProps }: PhoneFieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[15px] font-semibold text-gray-900">
        {label}
      </label>
      <div
        className={cn(
          "flex w-full items-center rounded-lg border transition-all duration-200 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500",
          error ? "border-red-400 bg-red-50/20" : "border-gray-300 bg-white hover:border-gray-400",
        )}
      >
        <div
          className="flex shrink-0 select-none items-center gap-2 border-r border-gray-300 px-3 py-2.5 text-sm font-semibold text-gray-700"
          aria-hidden="true"
        >
          <UsFlagIcon className="h-4 w-6 shrink-0 rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
          <span className="font-bold">+1</span>
          <ChevronDownIcon className="size-3.5 text-gray-500" />
        </div>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="w-full flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-gray-400"
          {...inputProps}
        />
      </div>
      {hint && (
        <p id={hintId} className="mt-1 text-xs text-gray-500">
          {hint}
        </p>
      )}
      <FieldError id={errorId} message={error} />
    </div>
  );
}
