import type { SelectOption } from "@/components/ui/dropdown-select";
import type { AgeRange, AnswerValue, ArteryScanResult, CardiacEventAnswer, RiskFactor } from "@/lib/validations/lead";

export const AGE_OPTIONS: SelectOption<AgeRange>[] = [
  { value: "under_50", label: "Menos de 50" },
  { value: "50_64", label: "50–64" },
  { value: "65_plus", label: "65 o más" },
];

export const RISK_FACTOR_OPTIONS: SelectOption<RiskFactor>[] = [
  {
    value: "bp_medication",
    label: "Tomo medicamentos para la presión arterial alta.",
    shortLabel: "Medicamento para presión alta",
  },
  {
    value: "diabetes_medication",
    label: "Tomo medicamentos para la diabetes.",
    shortLabel: "Medicamento para diabetes",
  },
  { value: "smoker", label: "Actualmente fumo cigarrillos.", shortLabel: "Fumador(a) actual" },
  {
    value: "inherited_cholesterol",
    label:
      "Tengo colesterol alto hereditario o un familiar cercano que desarrolló enfermedad del corazón o de las arterias a una edad temprana.",
    shortLabel: "Colesterol hereditario / antecedentes familiares",
  },
  {
    value: "reduced_kidney_function",
    label: "Me han dicho que mi función renal está reducida (eGFR entre 30 y 59).",
    shortLabel: "Función renal reducida",
  },
  {
    value: "high_hs_crp",
    label: "He tenido un análisis de sangre con inflamación alta (hs-CRP de 2.0 mg/L o más).",
    shortLabel: "hs-CRP alto",
  },
  { value: "none", label: "Ninguna de estas / No estoy seguro(a).", shortLabel: "Ninguna / No estoy seguro(a)" },
];

export const ARTERY_SCAN_OPTIONS: SelectOption<ArteryScanResult>[] = [
  { value: "cac_over_300", label: "Sí, mi puntaje de calcio coronario fue mayor de 300." },
  { value: "plaque_or_narrowing", label: "Sí, un estudio mostró acumulación de placa o estrechamiento." },
  { value: "scan_unsure", label: "Me hicieron un estudio, pero no estoy seguro(a) de los resultados." },
  { value: "no", label: "No." },
  { value: "not_sure", label: "No estoy seguro(a)." },
];

export const CARDIAC_EVENT_OPTIONS: SelectOption<CardiacEventAnswer>[] = [
  { value: "yes", label: "Sí" },
  { value: "no", label: "No" },
  { value: "not_sure", label: "No estoy seguro(a)" },
];

export const TRAVEL_OPTIONS: SelectOption<AnswerValue>[] = [
  { value: "Yes", label: "Sí" },
  { value: "No", label: "No" },
];

export const MULTI_SELECT_LABELS = {
  selectedCount: (count: number) => (count === 1 ? "1 opción seleccionada" : `${count} opciones seleccionadas`),
  done: "Listo",
  remove: "Quitar",
};
