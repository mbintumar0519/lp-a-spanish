"use client";

import { useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HERO_FORM_ID, siteConfig } from "@/config/site";
import { persistAttribution } from "@/lib/attribution";
import { cn } from "@/lib/cn";
import { formatUsPhone } from "@/lib/phone";
import { preScreeningSchema, type PreScreeningFormInput, type PreScreeningFormValues } from "@/lib/validations/lead";
import { PhoneField } from "@/components/ui/phone-field";
import { TextField } from "@/components/ui/text-field";
import { PRE_SCREENING_QUESTIONS } from "@/components/forms/pre-screening/questions";
import { submitLead } from "@/components/forms/pre-screening/submit-lead";
import { YesNoQuestion } from "@/components/forms/pre-screening/yes-no-question";

type PreScreeningFormProps = {
  layout?: "vertical" | "horizontal";
};

const SUBMIT_ERROR_MESSAGE = "Algo salió mal. Por favor intente de nuevo.";

const defaultValues: DefaultValues<PreScreeningFormInput> = {
  name: "",
  phone: "",
  email: "",
};

function StepHeading({ step, title }: { step: number; title: string }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold text-white bg-red-800">
          {step}
        </div>
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{title}</h3>
      </div>
      <div className="h-px bg-gray-200 mb-5 ml-7" />
    </>
  );
}

export function PreScreeningForm({ layout = "vertical" }: PreScreeningFormProps) {
  const fieldId = useId();
  const router = useRouter();
  const isHorizontal = layout === "horizontal";

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<PreScreeningFormInput, unknown, PreScreeningFormValues>({
    resolver: zodResolver(preScreeningSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const answers = useWatch({ control, name: "answers" });

  useEffect(() => {
    persistAttribution();
    fetch(siteConfig.crio.impressionUrl, { method: "GET", mode: "no-cors" }).catch((error) =>
      console.warn("CRIO impression error:", error),
    );
  }, []);

  const onSubmit = async (values: PreScreeningFormValues) => {
    try {
      await submitLead(values);
      router.push("/thank-you");
    } catch (error) {
      console.error("Submission error:", error);
      setError("root.server", { message: SUBMIT_ERROR_MESSAGE });
    }
  };

  const isBusy = isSubmitting || isSubmitSuccessful;

  return (
    <div
      id={HERO_FORM_ID}
      className={cn(
        "bg-white rounded-xl shadow-2xl mx-auto overflow-hidden border border-gray-200",
        isHorizontal ? "max-w-[520px] lg:max-w-[880px]" : "max-w-[520px]",
      )}
    >
      <div className="h-1.5 bg-red-800" />

      <div className="px-6 pt-7 pb-6 sm:px-8 sm:pt-8 sm:pb-7 text-center">
        <h2 className="text-gray-900 text-xl sm:text-2xl font-bold tracking-tight">
          Evaluación Gratis de Riesgo de Infarto
        </h2>
        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
          Complete este formulario para ver si puede calificar para el estudio.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="px-6 pb-7 sm:px-8 sm:pb-8">
        <div className={cn(isHorizontal && "lg:grid lg:grid-cols-2 lg:gap-8")}>
          <div className={cn("mb-8", isHorizontal && "lg:mb-0")}>
            <StepHeading step={1} title="Preguntas Rápidas" />
            <div className="space-y-5">
              {PRE_SCREENING_QUESTIONS.map((question) => (
                <YesNoQuestion
                  key={question.id}
                  id={`${fieldId}-${question.id}`}
                  question={question}
                  registration={register(`answers.${question.id}`)}
                  value={answers?.[question.id]}
                  error={errors.answers?.[question.id]?.message}
                />
              ))}
            </div>
          </div>

          <div className={cn("mb-6", isHorizontal && "lg:mb-0")}>
            <StepHeading step={2} title="Su Información de Contacto" />
            <div className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-100 space-y-4">
              <TextField
                id={`${fieldId}-name`}
                type="text"
                label="Nombre Completo"
                autoComplete="name"
                placeholder="Juan Pérez"
                error={errors.name?.message}
                {...register("name")}
              />

              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, ...field }, fieldState }) => (
                  <PhoneField
                    id={`${fieldId}-phone`}
                    label={
                      <>
                        Número de Teléfono <span className="text-red-600">*</span>
                      </>
                    }
                    placeholder="(813) 555-0123"
                    error={fieldState.error?.message}
                    onChange={(event) => onChange(formatUsPhone(event.target.value))}
                    {...field}
                  />
                )}
              />

              <TextField
                id={`${fieldId}-email`}
                type="email"
                label="Correo Electrónico"
                autoComplete="email"
                inputMode="email"
                placeholder="juan@ejemplo.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isBusy}
          className={cn(
            "w-full text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] hover:shadow-lg hover:-translate-y-0.5 h-[56px] text-lg flex items-center justify-center gap-2",
            isBusy ? "bg-gray-500" : "bg-red-600 hover:bg-red-700",
          )}
        >
          {isBusy ? "Enviando..." : "Enviar información"}
        </button>

        {errors.root?.server && (
          <p role="alert" className="text-red-600 text-center mt-3 text-sm">
            {errors.root.server.message}
          </p>
        )}

        <p className="text-gray-600 text-center mt-4 text-xs">Su información es segura y nunca será compartida.</p>
      </form>
    </div>
  );
}
