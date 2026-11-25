import { z } from "zod";
import { isValidUsPhone } from "@/lib/phone";

const NAME_PATTERN = /^[\p{L}\s'.-]+$/u;

export const AGE_RANGES = ["under_50", "50_64", "65_plus"] as const;

export const RISK_FACTORS = [
  "bp_medication",
  "diabetes_medication",
  "smoker",
  "inherited_cholesterol",
  "reduced_kidney_function",
  "high_hs_crp",
  "none",
] as const;

export const NO_RISK_FACTOR = "none" satisfies (typeof RISK_FACTORS)[number];

export const ARTERY_SCAN_RESULTS = ["cac_over_300", "plaque_or_narrowing", "scan_unsure", "no", "not_sure"] as const;

export const CARDIAC_EVENT_ANSWERS = ["yes", "no", "not_sure"] as const;

export const ANSWER_VALUES = ["Yes", "No"] as const;

const SELECT_ONE = "Por favor seleccione una respuesta.";
const SELECT_AT_LEAST_ONE = "Por favor seleccione al menos una opción.";

export const answersSchema = z.object({
  age_range: z.enum(AGE_RANGES, { error: SELECT_ONE }),
  risk_factors: z
    .array(z.enum(RISK_FACTORS), { error: SELECT_AT_LEAST_ONE })
    .min(1, SELECT_AT_LEAST_ONE)
    .refine(
      (values) => !values.includes(NO_RISK_FACTOR) || values.length === 1,
      "“Ninguna de estas / No estoy seguro(a)” no se puede combinar con otras opciones.",
    ),
  artery_scan: z.enum(ARTERY_SCAN_RESULTS, { error: SELECT_ONE }),
  prior_cardiac_event: z.enum(CARDIAC_EVENT_ANSWERS, { error: SELECT_ONE }),
  can_travel: z.enum(ANSWER_VALUES, { error: "Por favor elija Sí o No." }),
});

export const nameSchema = z
  .string()
  .trim()
  .min(1, "El nombre completo es requerido")
  .min(2, "El nombre debe tener al menos 2 caracteres")
  .max(100, "El nombre no puede exceder 100 caracteres")
  .regex(NAME_PATTERN, "El nombre solo puede contener letras, espacios, guiones y apóstrofes");

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "El número de teléfono es requerido")
  .refine(isValidUsPhone, "Por favor ingrese un número de teléfono válido de EE. UU. (10 dígitos)");

export const emailSchema = z
  .string()
  .trim()
  .min(1, "La dirección de correo electrónico es requerida")
  .max(254, "La dirección de correo electrónico es demasiado larga")
  .pipe(z.email("Por favor ingrese una dirección de correo electrónico válida"))
  .transform((email) => email.toLowerCase());

export const consentSchema = z.literal(true, {
  error: "Por favor acepte ser contactado para que podamos revisar su elegibilidad.",
});

export const preScreeningSchema = z.object({
  answers: answersSchema,
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  consent: consentSchema,
});

const optionalText = z.string().trim().max(2048).nullish();

export const leadSubmissionSchema = preScreeningSchema.extend({
  source: z.string().trim().max(100).default("pre-screening-form"),
  qualificationStatus: z.string().trim().max(50).default("pending"),
  event_id: optionalText,
  lead_source: optionalText,
  gclid: optionalText,
  fbclid: optionalText,
  msclkid: optionalText,
  utm_source: optionalText,
  utm_medium: optionalText,
  utm_campaign: optionalText,
  utm_content: optionalText,
  utm_term: optionalText,
  page_url: optionalText,
  referrer: optionalText,
});

export type AgeRange = (typeof AGE_RANGES)[number];
export type RiskFactor = (typeof RISK_FACTORS)[number];
export type ArteryScanResult = (typeof ARTERY_SCAN_RESULTS)[number];
export type CardiacEventAnswer = (typeof CARDIAC_EVENT_ANSWERS)[number];
export type AnswerValue = (typeof ANSWER_VALUES)[number];
export type PreScreeningAnswers = z.infer<typeof answersSchema>;
export type PreScreeningFormInput = z.input<typeof preScreeningSchema>;
export type PreScreeningFormValues = z.output<typeof preScreeningSchema>;
export type LeadSubmission = z.output<typeof leadSubmissionSchema>;
export type LeadSubmissionInput = z.input<typeof leadSubmissionSchema>;
