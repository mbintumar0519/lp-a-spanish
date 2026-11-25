import type { ChoiceOption } from "@/components/ui/choice-options";
import type { AgeRange, AnswerValue, ArteryScanResult, CardiacEventAnswer, RiskFactor } from "@/lib/validations/lead";

export const AGE_OPTIONS: ChoiceOption<AgeRange>[] = [
  { value: "under_50", label: "Menos de 50" },
  { value: "50_64", label: "50–64" },
  { value: "65_plus", label: "65 o más" },
];

export const RISK_FACTOR_OPTIONS: ChoiceOption<RiskFactor>[] = [
  {
    value: "bp_medication",
    label: "Tomo medicamentos para la presión arterial alta.",
  },
  {
    value: "diabetes_medication",
    label: "Tomo medicamentos para la diabetes.",
  },
  { value: "smoker", label: "Actualmente fumo cigarrillos." },
  {
    value: "inherited_cholesterol",
    label:
      "Tengo colesterol alto hereditario o un familiar cercano que desarrolló enfermedad del corazón o de las arterias a una edad temprana.",
  },
  {
    value: "reduced_kidney_function",
    label: "Me han dicho que mi función renal está reducida (eGFR entre 30 y 59).",
  },
  {
    value: "high_hs_crp",
    label: "He tenido un análisis de sangre con inflamación alta (hs-CRP de 2.0 mg/L o más).",
  },
  { value: "none", label: "Ninguna de estas / No estoy seguro(a)." },
];

export const ARTERY_SCAN_OPTIONS: ChoiceOption<ArteryScanResult>[] = [
  { value: "cac_over_300", label: "Sí, mi puntaje de calcio coronario fue mayor de 300." },
  { value: "plaque_or_narrowing", label: "Sí, un estudio mostró acumulación de placa o estrechamiento." },
  { value: "scan_unsure", label: "Me hicieron un estudio, pero no estoy seguro(a) de los resultados." },
  { value: "no", label: "No." },
  { value: "not_sure", label: "No estoy seguro(a)." },
];

export const CARDIAC_EVENT_OPTIONS: ChoiceOption<CardiacEventAnswer>[] = [
  { value: "yes", label: "Sí" },
  { value: "no", label: "No" },
  { value: "not_sure", label: "No estoy seguro(a)" },
];

export const TRAVEL_OPTIONS: ChoiceOption<AnswerValue>[] = [
  { value: "Yes", label: "Sí" },
  { value: "No", label: "No" },
];
