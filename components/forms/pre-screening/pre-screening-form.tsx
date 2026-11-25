"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HERO_FORM_ID, siteConfig } from "@/config/site";
import { persistAttribution } from "@/lib/attribution";
import { cn } from "@/lib/cn";
import { formatUsPhone } from "@/lib/phone";
import {
  NO_RISK_FACTOR,
  preScreeningSchema,
  type PreScreeningFormInput,
  type PreScreeningFormValues,
} from "@/lib/validations/lead";
import { CheckboxOptions, RadioOptions } from "@/components/ui/choice-options";
import { PhoneField } from "@/components/ui/phone-field";
import { TextField } from "@/components/ui/text-field";
import {
  AGE_OPTIONS,
  ARTERY_SCAN_OPTIONS,
  CARDIAC_EVENT_OPTIONS,
  RISK_FACTOR_OPTIONS,
  TRAVEL_OPTIONS,
} from "@/components/forms/pre-screening/questions";
import { ConsentCheckbox, QuestionField } from "@/components/forms/pre-screening/question-field";
import { submitLead } from "@/components/forms/pre-screening/submit-lead";

type PreScreeningFormProps = {
  layout?: "vertical" | "horizontal";
};

type Step = 1 | 2 | 3;

const TOTAL_STEPS = 3;
const SUBMIT_ERROR_MESSAGE = "Algo salió mal. Por favor intente de nuevo.";
const STEP_TITLES: Record<Step, string> = {
  1: "Sobre Usted",
  2: "Historial Cardíaco y Viaje",
  3: "Su Información de Contacto",
};

const STEP_NUMBERS: Step[] = [1, 2, 3];

const STEP_LABELS: Record<Step, string> = {
  1: "Sobre Usted",
  2: "Corazón y Viaje",
  3: "Contacto",
};

const STEP_FIELDS = {
  1: ["answers.age_range", "answers.risk_factors"],
  2: ["answers.artery_scan", "answers.prior_cardiac_event", "answers.can_travel"],
} as const;

const defaultValues: DefaultValues<PreScreeningFormInput> = {
  name: "",
  phone: "",
  email: "",
  answers: { risk_factors: [] },
};

export function PreScreeningForm({ layout = "vertical" }: PreScreeningFormProps) {
  const fieldId = useId();
  const router = useRouter();
  const isHorizontal = layout === "horizontal";
  const [step, setStep] = useState<Step>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepTitleRef = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);
  const stepTitleId = `${fieldId}-step-title`;

  const {
    control,
    register,
    handleSubmit,
    trigger,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<PreScreeningFormInput, unknown, PreScreeningFormValues>({
    resolver: zodResolver(preScreeningSchema),
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    persistAttribution();
    fetch(siteConfig.crio.impressionUrl, { method: "GET", mode: "no-cors" }).catch((error) =>
      console.warn("CRIO impression error:", error),
    );
  }, []);

  useEffect(() => {
    if (!hasNavigated.current) return;
    const container = containerRef.current;
    if (container && container.getBoundingClientRect().top < 0) {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    stepTitleRef.current?.focus({ preventScroll: true });
  }, [step]);

  const goToStep = (next: Step) => {
    hasNavigated.current = true;
    setStep(next);
  };

  const handleContinue = async () => {
    if (step === TOTAL_STEPS) return;
    const valid = await trigger([...STEP_FIELDS[step]], { shouldFocus: true });
    if (valid) goToStep((step + 1) as Step);
  };

  const onSubmit = async (values: PreScreeningFormValues) => {
    clearErrors("root");
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
      ref={containerRef}
      className={cn(
        "mx-auto scroll-mt-24 rounded-xl border border-gray-200 bg-white shadow-2xl",
        isHorizontal ? "max-w-[520px] lg:max-w-[880px]" : "max-w-[520px]",
      )}
    >
      <div className="px-5 pt-7 pb-5 text-center sm:px-8 sm:pt-8">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          Evaluación Gratis de Riesgo de Infarto
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Complete este formulario para ver si puede calificar para el estudio.
        </p>
      </div>

      <form
        noValidate
        onSubmit={step === TOTAL_STEPS ? handleSubmit(onSubmit) : (event) => event.preventDefault()}
        className="px-4 pb-6 sm:px-8 sm:pb-8"
      >
        <div className="mb-6">
          <ol className="grid grid-cols-3 gap-2 sm:gap-3" aria-label={`Paso ${step} de ${TOTAL_STEPS}`}>
            {STEP_NUMBERS.map((number) => (
              <li key={number} aria-current={number === step ? "step" : undefined}>
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-1.5 rounded-full transition-colors duration-300",
                    number <= step ? "bg-red-800" : "bg-gray-200",
                  )}
                />
                <span className="sr-only">{STEP_LABELS[number]}</span>
              </li>
            ))}
          </ol>
        </div>

        <h3 id={stepTitleId} ref={stepTitleRef} tabIndex={-1} className="sr-only">
          {STEP_TITLES[step]}
        </h3>

        {step < TOTAL_STEPS ? (
          <div role="group" aria-labelledby={stepTitleId}>
            <div className={cn("grid gap-5", isHorizontal && "lg:grid-cols-2")}>
              {step === 1 && (
                <>
                  <Controller
                    control={control}
                    name="answers.age_range"
                    render={({ field, fieldState }) => (
                      <QuestionField
                        number={1}
                        prompt="¿Cuántos años tiene?"
                        hint="Seleccione una opción."
                        error={fieldState.error?.message}
                      >
                        {(a11y) => (
                          <RadioOptions
                            {...a11y}
                            options={AGE_OPTIONS}
                            columns={3}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            inputRef={field.ref}
                          />
                        )}
                      </QuestionField>
                    )}
                  />

                  <Controller
                    control={control}
                    name="answers.risk_factors"
                    render={({ field, fieldState }) => (
                      <QuestionField
                        number={2}
                        prompt="¿Cuáles de las siguientes situaciones aplican a usted?"
                        hint="Seleccione todas las que apliquen."
                        error={fieldState.error?.message}
                      >
                        {(a11y) => (
                          <CheckboxOptions
                            {...a11y}
                            options={RISK_FACTOR_OPTIONS}
                            exclusiveValue={NO_RISK_FACTOR}
                            value={field.value ?? []}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            inputRef={field.ref}
                          />
                        )}
                      </QuestionField>
                    )}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <Controller
                    control={control}
                    name="answers.artery_scan"
                    render={({ field, fieldState }) => (
                      <QuestionField
                        number={3}
                        prompt="¿Alguna vez le han hecho un estudio del corazón o de las arterias que mostró acumulación de placa o arterias estrechas?"
                        hint="Seleccione una opción."
                        error={fieldState.error?.message}
                      >
                        {(a11y) => (
                          <RadioOptions
                            {...a11y}
                            options={ARTERY_SCAN_OPTIONS}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            inputRef={field.ref}
                          />
                        )}
                      </QuestionField>
                    )}
                  />

                  <Controller
                    control={control}
                    name="answers.prior_cardiac_event"
                    render={({ field, fieldState }) => (
                      <QuestionField
                        number={4}
                        prompt="¿Alguna vez ha tenido un ataque al corazón, derrame cerebral, mini derrame (AIT), stent o cirugía de bypass?"
                        hint="Seleccione una opción."
                        error={fieldState.error?.message}
                      >
                        {(a11y) => (
                          <RadioOptions
                            {...a11y}
                            options={CARDIAC_EVENT_OPTIONS}
                            columns={3}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            inputRef={field.ref}
                          />
                        )}
                      </QuestionField>
                    )}
                  />

                  <Controller
                    control={control}
                    name="answers.can_travel"
                    render={({ field, fieldState }) => (
                      <QuestionField
                        number={5}
                        prompt={
                          <>
                            ¿Puede viajar a <span className="key-term">Plant City, FL</span>, para la evaluación y las
                            visitas regulares del estudio?
                          </>
                        }
                        hint="Es posible que haya asistencia de transporte disponible."
                        error={fieldState.error?.message}
                        className={cn(isHorizontal && "lg:col-span-2")}
                        note={
                          field.value === "No"
                            ? "Es posible que haya asistencia de transporte disponible. Si viajar es difícil, déjenos saber — nuestro equipo puede ayudar."
                            : undefined
                        }
                      >
                        {(a11y) => (
                          <RadioOptions
                            {...a11y}
                            options={TRAVEL_OPTIONS}
                            columns={2}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            inputRef={field.ref}
                          />
                        )}
                      </QuestionField>
                    )}
                  />
                </>
              )}
            </div>

            <button
              type="button"
              onClick={handleContinue}
              className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-red-600 text-lg font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg active:scale-[0.97]"
            >
              Continuar
              <span aria-hidden="true">→</span>
            </button>

            {step > 1 && (
              <button
                type="button"
                onClick={() => goToStep((step - 1) as Step)}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white text-base font-semibold text-gray-700 transition-colors duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-800"
              >
                <span aria-hidden="true">←</span> Atrás
              </button>
            )}
          </div>
        ) : (
          <div role="group" aria-labelledby={stepTitleId}>
            <div className="space-y-5 rounded-lg border border-gray-100 bg-gray-50 p-4 sm:p-5">
              <TextField
                id={`${fieldId}-name`}
                type="text"
                label={
                  <>
                    Nombre Completo <span className="text-red-600">*</span>
                  </>
                }
                hint="Ingrese su nombre completo."
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
                    hint="Ingrese su mejor número de contacto."
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
                label={
                  <>
                    Correo Electrónico <span className="text-red-600">*</span>
                  </>
                }
                hint="Ingrese su correo electrónico."
                autoComplete="email"
                inputMode="email"
                placeholder="juan@ejemplo.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            <ConsentCheckbox
              id={`${fieldId}-consent`}
              label="Acepto que el equipo de investigación me contacte sobre mi elegibilidad y entiendo que enviar este formulario no garantiza pruebas ni participación en el estudio."
              error={errors.consent?.message}
              registration={register("consent")}
            />

            <button
              type="submit"
              disabled={isBusy}
              aria-busy={isBusy}
              className={cn(
                "mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl text-lg font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50",
                isBusy ? "bg-gray-500" : "bg-red-600 hover:bg-red-700",
              )}
            >
              {isBusy ? "Enviando..." : "Verificar Mi Elegibilidad"}
            </button>

            {errors.root?.server && (
              <p role="alert" className="mt-3 text-center text-sm text-red-600">
                {errors.root.server.message}
              </p>
            )}

            <button
              type="button"
              onClick={() => goToStep(2)}
              disabled={isBusy}
              className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white text-base font-semibold text-gray-700 transition-colors duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-800 disabled:opacity-50"
            >
              <span aria-hidden="true">←</span> Atrás
            </button>

            <p className="mt-4 text-center text-xs leading-relaxed text-gray-600">
              La elegibilidad está sujeta a una revisión médica adicional y a la evaluación del estudio.
            </p>

            <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-gray-500">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-3.5 shrink-0 text-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                  clipRule="evenodd"
                />
              </svg>
              Su información es segura y nunca será compartida.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
