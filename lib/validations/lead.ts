import { z } from "zod";
import { isValidUsPhone } from "@/lib/phone";

const NAME_PATTERN = /^[\p{L}\s'.-]+$/u;

export const ANSWER_VALUES = ["Yes", "No"] as const;

export const answerSchema = z.enum(ANSWER_VALUES, { error: "Por favor elija Sí o No." });

export const answersSchema = z.object({
  age_50_plus: answerSchema,
  can_travel: answerSchema,
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

export const preScreeningSchema = z.object({
  answers: answersSchema,
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
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

export type AnswerValue = z.infer<typeof answerSchema>;
export type PreScreeningAnswers = z.infer<typeof answersSchema>;
export type PreScreeningFormInput = z.input<typeof preScreeningSchema>;
export type PreScreeningFormValues = z.output<typeof preScreeningSchema>;
export type LeadSubmission = z.output<typeof leadSubmissionSchema>;
export type LeadSubmissionInput = z.input<typeof leadSubmissionSchema>;
