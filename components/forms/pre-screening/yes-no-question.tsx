import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/cn";
import { ANSWER_VALUES, type AnswerValue } from "@/lib/validations/lead";
import type { PreScreeningQuestion } from "@/components/forms/pre-screening/questions";

const OPTION_LABELS: Record<AnswerValue, string> = { Yes: "Sí", No: "No" };

type YesNoQuestionProps = {
  id: string;
  question: PreScreeningQuestion;
  registration: UseFormRegisterReturn;
  value?: AnswerValue;
  error?: string;
};

export function YesNoQuestion({ id, question, registration, value, error }: YesNoQuestionProps) {
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelId}
      className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-100"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? errorId : undefined}
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">
          {question.icon}
        </span>
        <div>
          <h4 id={labelId} className="text-gray-800 font-medium text-[15px] leading-snug">
            {question.question}
          </h4>
          {question.subtext && <p className="text-gray-500 text-sm mt-1">{question.subtext}</p>}
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        {ANSWER_VALUES.map((option) => (
          <label key={option} className="flex-1 cursor-pointer group">
            <input type="radio" value={option} className="sr-only peer" {...registration} />
            <div
              className={cn(
                "w-full h-11 flex items-center justify-center text-center rounded-lg font-semibold transition-all duration-200 border text-[15px] peer-focus-visible:ring-2 peer-focus-visible:ring-red-500/40",
                value === option
                  ? "bg-red-800 text-white border-red-800"
                  : "hover:bg-red-50 hover:border-red-300 hover:text-red-800",
              )}
            >
              {OPTION_LABELS[option]}
            </div>
          </label>
        ))}
      </div>

      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {value === "No" && (
        <div className="mt-3 rounded-lg p-3 text-sm bg-red-50 border border-red-200 text-red-800">
          <span className="font-medium">Nota:</span> {question.guidanceMessage}
        </div>
      )}
    </div>
  );
}
