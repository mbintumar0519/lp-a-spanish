import { deriveLeadSource, generateEventId, getAttribution } from "@/lib/attribution";
import { saveLeadSession } from "@/lib/lead-session";
import { splitFullName } from "@/lib/name";
import type { LeadSubmissionInput, PreScreeningFormValues } from "@/lib/validations/lead";

type SubmitLeadResponse = {
  success: boolean;
  message?: string;
  error?: string;
  locationData?: { city?: string; state?: string; postalCode?: string; zipCode?: string };
};

export async function submitLead(values: PreScreeningFormValues): Promise<void> {
  const attribution = getAttribution();

  const payload: LeadSubmissionInput = {
    ...values,
    source: "pre-screening-form",
    qualificationStatus: "pending",
    event_id: generateEventId(),
    lead_source: deriveLeadSource(attribution),
    gclid: attribution.gclid ?? null,
    fbclid: attribution.fbclid ?? null,
    msclkid: attribution.msclkid ?? null,
    utm_source: attribution.utm_source ?? null,
    utm_medium: attribution.utm_medium ?? null,
    utm_campaign: attribution.utm_campaign ?? null,
    utm_content: attribution.utm_content ?? null,
    utm_term: attribution.utm_term ?? null,
    page_url: window.location.href,
    referrer: document.referrer || null,
  };

  const response = await fetch("/api/submit-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json()) as SubmitLeadResponse;

  if (!response.ok) throw new Error(data.message ?? data.error ?? "Error al enviar el formulario");

  const { firstName, lastName } = splitFullName(values.name);
  const location = data.locationData;

  saveLeadSession({
    email: values.email,
    phone: values.phone,
    firstName,
    lastName,
    city: location?.city ?? "",
    state: location?.state ?? "",
    zipCode: location?.postalCode || location?.zipCode || "",
  });
}
