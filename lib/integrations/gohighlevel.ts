import "server-only";
import { normalizePhoneToE164 } from "@/lib/phone";

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "v3";

export type GhlCustomField = { id: string; value: string | string[] | number };

export const hasFieldValue = ({ value }: GhlCustomField) => typeof value === "number" || value.length > 0;

export type GhlContactPayload = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  source?: string;
  tags?: string[];
  companyName?: string;
  customFields?: GhlCustomField[];
};

type GhlUpsertResponse = { contact?: { id?: string }; id?: string } | null;

export function getGhlConfig() {
  const apiKey = (process.env.GOHIGHLEVEL_API_KEY || process.env.GHL_API_KEY || "").trim();
  const locationId = (process.env.GOHIGHLEVEL_LOCATION_ID || process.env.GHL_LOCATION_ID || "").trim();

  return { apiKey, locationId, isConfigured: Boolean(apiKey && locationId) };
}

const headers = (apiKey: string) => ({
  Authorization: `Bearer ${apiKey}`,
  Version: GHL_API_VERSION,
  "Content-Type": "application/json",
  Accept: "application/json",
});

function compact<T extends Record<string, unknown>>(record: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(record).filter(
      ([, value]) => value !== undefined && value !== "" && !(Array.isArray(value) && !value.length),
    ),
  ) as Partial<T>;
}

async function upsertContact(apiKey: string, body: Record<string, unknown>): Promise<GhlUpsertResponse> {
  const response = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
    method: "POST",
    headers: headers(apiKey),
    body: JSON.stringify(body),
  });
  const text = await response.text();

  if (!response.ok) throw new Error(`GHL upsert failed (${response.status}): ${text}`);

  try {
    return text ? (JSON.parse(text) as GhlUpsertResponse) : null;
  } catch {
    return null;
  }
}

export async function upsertGhlContact(payload: GhlContactPayload) {
  const { apiKey, locationId, isConfigured } = getGhlConfig();
  if (!isConfigured) throw new Error("GoHighLevel is not configured (API key or location ID missing).");

  const firstName = payload.firstName.trim();
  const lastName = payload.lastName.trim();
  const customFields = payload.customFields?.filter(hasFieldValue) ?? [];

  const baseBody = compact({
    locationId,
    firstName,
    lastName,
    name: `${firstName} ${lastName}`.trim(),
    email: payload.email,
    phone: normalizePhoneToE164(payload.phone),
    postalCode: payload.postalCode,
    city: payload.city,
    state: payload.state,
    country: payload.country,
    tags: payload.tags,
    source: payload.source || "Website Form",
    companyName: payload.companyName,
  });
  const body = customFields.length ? { ...baseBody, customFields } : baseBody;

  let response: GhlUpsertResponse;
  try {
    response = await upsertContact(apiKey, body);
  } catch (error) {
    if (body === baseBody) throw error;
    console.warn("[GHL] Retrying upsert without custom fields:", error);
    response = await upsertContact(apiKey, baseBody);
  }

  return { contactId: response?.contact?.id ?? response?.id, locationId };
}

export async function addGhlNote(contactId: string, note: string) {
  const { apiKey } = getGhlConfig();
  if (!apiKey || !note.trim()) return;

  try {
    const response = await fetch(`${GHL_API_BASE}/contacts/${contactId}/notes`, {
      method: "POST",
      headers: headers(apiKey),
      body: JSON.stringify({ body: note }),
    });
    if (!response.ok) console.warn("[GHL] Note failed:", response.status, await response.text());
  } catch (error) {
    console.warn("[GHL] Note error:", error);
  }
}
