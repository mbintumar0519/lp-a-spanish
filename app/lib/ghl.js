/**
 * GoHighLevel (HighLevel) CRM client - JavaScript build.
 *
 * Exclusively uses HighLevel API v3 (services.leadconnectorhq.com) with
 * Private Integration Token (PIT) authentication.
 */

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "v3";

export function getGhlConfig() {
  const apiKey = (
    process.env.GOHIGHLEVEL_API_KEY ||
    process.env.GHL_API_KEY ||
    ""
  ).trim();
  const locationId = (
    process.env.GOHIGHLEVEL_LOCATION_ID ||
    process.env.GHL_LOCATION_ID ||
    ""
  ).trim();

  return {
    apiKey,
    locationId,
    isConfigured: Boolean(apiKey) && Boolean(locationId),
  };
}

/** Normalise US phone numbers to E.164, which v3 requires. */
export function normalizeGhlPhone(raw) {
  const value = String(raw || "").trim();
  if (!value) return "";
  if (value.startsWith("+")) return `+${value.slice(1).replace(/\D/g, "")}`;
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return digits ? `+${digits}` : value;
}

const FIELD_MAP_TTL_MS = 5 * 60 * 1000;
let fieldMapCache = null;
let fieldMapCacheKey = "";
let fieldMapCacheTime = 0;

async function fetchFieldMap(apiKey, locationId) {
  const now = Date.now();
  const cacheKey = `${locationId}:${apiKey.slice(-8)}`;
  if (
    fieldMapCache &&
    fieldMapCacheKey === cacheKey &&
    now - fieldMapCacheTime < FIELD_MAP_TTL_MS
  ) {
    return fieldMapCache;
  }

  try {
    const res = await fetch(
      `${GHL_API_BASE}/locations/${locationId}/customFields?model=contact`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Version: GHL_API_VERSION,
          Accept: "application/json",
        },
      },
    );
    if (!res.ok) {
      console.warn(
        "[GHL v3] Could not load custom fields:",
        res.status,
        await res.text(),
      );
      return fieldMapCache && fieldMapCacheKey === cacheKey ? fieldMapCache : {};
    }
    const data = await res.json();
    const map = {};
    for (const field of data?.customFields || []) {
      if (!field?.id) continue;
      if (field.fieldKey) map[field.fieldKey] = field.id;
      if (
        typeof field.fieldKey === "string" &&
        field.fieldKey.startsWith("contact.")
      ) {
        map[field.fieldKey.slice(8)] = field.id;
      }
      if (field.key) map[field.key] = field.id;
      if (field.name) {
        map[field.name] = field.id;
        map[field.name.toLowerCase().replace(/\s+/g, "_")] = field.id;
      }
    }
    fieldMapCache = map;
    fieldMapCacheKey = cacheKey;
    fieldMapCacheTime = now;
    console.log(`[GHL v3] Custom field map loaded: ${Object.keys(map).length}`);
    return map;
  } catch (error) {
    console.warn("[GHL v3] Could not load custom fields:", error);
    return fieldMapCache && fieldMapCacheKey === cacheKey ? fieldMapCache : {};
  }
}

const STATIC_FIELD_MAP_BY_LOCATION = {
  QIjU06ElWLhQKKXOVKZT: {
    google_click_id: "7kd30EtE3UzXz8tdNeVL",
    gclid: "7kd30EtE3UzXz8tdNeVL",
    fbclid: "yMrgtotc23za7sCdC8TQ",
    msclkid: "XtXcaLuIRAoYzek5MsMZ",
    utm_source: "NKhJ8fiKR1OxgqywLIwq",
    utm_medium: "8DiVqOWzm6BJGTcpC9bw",
    utm_campaign: "bKJgWP4TJhiVRtOG2uGQ",
    utm_content: "zX6NRCDM2CuxE9zOOqMf",
    utm_term: "1dL5BJCnBNEujF493fEM",
    lead_source: "J3Xpbq929Fc6e786G5fp",
    event_id: "Di3qpWTZ6EyQZtb2F6qa",
    study_name: "Yn32DdtZIAZqELj1Ca1b",
    studyName: "Yn32DdtZIAZqELj1Ca1b",
    study_id: "Yn32DdtZIAZqELj1Ca1b",
    study_interest: "Yn32DdtZIAZqELj1Ca1b",
    qualification_status: "bsduyvTkR2QuZVaVpjpz",
    qualificationStatus: "bsduyvTkR2QuZVaVpjpz",
    prescreen_status: "bsduyvTkR2QuZVaVpjpz",
    high_lpa: "L3MIhXPd3qfgRm4lccex",
    hasElevatedLpa: "L3MIhXPd3qfgRm4lccex",
    age_50_plus: "HelVW4nqMb0Wxy3UwDod",
    ageOver50: "HelVW4nqMb0Wxy3UwDod",
    takesCholesterolMeds: "eZMqJYmjI3QIH99HWMIJ",
    can_travel: "Bak7rs2wj9tSidZwCGAF",
    canTravelToPlantCity: "Bak7rs2wj9tSidZwCGAF",
    can_travel_plant_city: "lCb5h59TIF8TNjVVXfU8",
    age_65_plus: "zYhfnhwtQNmju4OJKyHH",
    age_75_plus: "zYhfnhwtQNmju4OJKyHH",
    flu_shot_last_6_months: "ZxXGocvJlKBVBPONnvGY",
    bmi: "sp2eBF0XDbYdqg50W77N",
    contactbmi: "sp2eBF0XDbYdqg50W77N",
    height: "5VmNVybf3mGc8Ij8ZC33",
    height_display: "5VmNVybf3mGc8Ij8ZC33",
    weight: "homFw1uXUppOlcXLj9JI",
    weight_lbs: "homFw1uXUppOlcXLj9JI",
    type_2_diabetes: "2hxqmCUCsrHmKS3BDfOq",
    a1c_band: "soXS7KhMr46H6kvNuxko",
    stable_dual_therapy: "4amxUHtqJFadpuas3Drs",
    diagnosed_mdd: "LXRhghKvoE9KxnpPzsOj",
    still_symptoms: "jNJhZQOPzkqF9WOqx7jv",
    age_18_75: "QWhlKGXekJHBurQqnDjW",
    age_18_70: "QWhlKGXekJHBurQqnDjW",
    age_range_22_65: "QWhlKGXekJHBurQqnDjW",
    age_range: "QWhlKGXekJHBurQqnDjW",
    taking_antidepressant: "E9xvTObNg1bCZxwPbFdQ",
    antidepressant_6_weeks: "5xp9bYEyS4sux53gEwvR",
    contact_preference: "HQsg95wvRxzTvh4dEr7n",
    preferred_contact: "HQsg95wvRxzTvh4dEr7n",
    bestTimeToCall: "TyrvNj6ok9CZNnkb1uFD",
    canVisitClinic: "Bak7rs2wj9tSidZwCGAF",
    hasUlcer: "D8YDOPoyeBv8rS4mnbet",
    hasOpenWound: "D8YDOPoyeBv8rS4mnbet",
    ulcerDuration: "eScvXbs0ApWOzDeKStPO",
    hasDisqualifyingCondition: "KWEXQJBm5fT3Y1jbaRlY",
    didPrescreen: "D9KC65upaubOqBuJ6ckE",
    questions: "PxMgiMuAB0FF8tJvIsh5",
    message: "PxMgiMuAB0FF8tJvIsh5",
    teen_age: "QWhlKGXekJHBurQqnDjW",
    child_age: "QWhlKGXekJHBurQqnDjW",
    childAge: "QWhlKGXekJHBurQqnDjW",
    has_symptoms: "jNJhZQOPzkqF9WOqx7jv",
    current_medications: "x977u2piJanMNuUN0Yrn",
    currentMedications: "x977u2piJanMNuUN0Yrn",
    concerns: "hTa4iLtt8sbDr7RR4S6c",
    guardianAvailability: "TyrvNj6ok9CZNnkb1uFD",
    bipolar_diagnosis: "CtGwP2fG79gy5bdEutc7",
    diagnosis_type: "0JNseKqNDFgQ4LEdqkZy",
    on_medication: "AUMIT8PvA1U5UeTnDmF6",
    consent_to_contact: "GCVzLJrgmHeoQgHRs6Lj",
    autism_diagnosed: "0JNseKqNDFgQ4LEdqkZy",
    irritability_symptoms: "hTa4iLtt8sbDr7RR4S6c",
  },
  I4ssFJs4KWSJJAYXITaE: {
    google_click_id: "bkr5FXecAgcSaZ87e66U",
    gclid: "bkr5FXecAgcSaZ87e66U",
    fbclid: "huM4yXWtz6GU3FbS2Zhd",
    msclkid: "vDDmfdSWkt6JFbC7Rqd9",
    utm_source: "m6XWgFIcdzE4NgD9Fpda",
    utm_medium: "BaW0vTl7WdYCwQRlc2Wo",
    utm_campaign: "5Ds59KSp49dmzM39Tign",
    utm_content: "fzDV8BhMcctmbyqi3EBD",
    utm_term: "j2vfa6rjf6cBo5R7eqY2",
    lead_source: "yqhiaX4oOs799SmOOdCl",
    event_id: "QnqKJVmNlPZ2kZaTXWrJ",
    study_name: "JKQzYjFqC4YHmq6X5yN6",
    studyName: "JKQzYjFqC4YHmq6X5yN6",
    study_id: "JKQzYjFqC4YHmq6X5yN6",
    study_interest: "2PRH38br8fp7EVyqmol0",
    qualification_status: "HIsbEFK67BIdQDzf2UU1",
    prescreen_status: "HIsbEFK67BIdQDzf2UU1",
    teen_age: "5xoYWkEGQ4B5AaExZjWe",
    child_age: "5xoYWkEGQ4B5AaExZjWe",
    childAge: "5xoYWkEGQ4B5AaExZjWe",
    can_travel: "C4PDttrUJcVYz5ZeKQID",
    has_symptoms: "NtJQ8KqumYrCMsALFbLa",
    current_medications: "zJ9uu9f6Uy6s6Lk6mLtd",
    currentMedications: "zJ9uu9f6Uy6s6Lk6mLtd",
    concerns: "yN46thmqXqiQoCgT954y",
    bmi: "1JTYYuWLhsjLYRt2mckl",
    contactbmi: "1JTYYuWLhsjLYRt2mckl",
    height: "DC44BuqFqR0Xw2ak5ToY",
    height_display: "DC44BuqFqR0Xw2ak5ToY",
    weight: "hGIED71xId4tkdDgjvhA",
    weight_lbs: "hGIED71xId4tkdDgjvhA",
    type_2_diabetes: "YJlNQPEmJrA4zJll7TEo",
    a1c_band: "vteMAP3Sg0FdY3Yq2tqb",
    stable_dual_therapy: "D62ehVXBkApsAuZUnUYO",
    age_range: "HLnY0SiCNcse96hDcvhi",
    age_range_22_65: "HLnY0SiCNcse96hDcvhi",
    age_18_70: "HLnY0SiCNcse96hDcvhi",
    bipolar_diagnosis: "e97LofwXctXrRc3vFPnB",
    diagnosis_type: "srAQ44Trk2M1nN6xvFXc",
    on_medication: "YJYhHsf0JmD16ScUcq82",
    preferred_contact: "e3yRdxZxQGSMSRTEqogz",
    contact_preference: "e3yRdxZxQGSMSRTEqogz",
    guardianAvailability: "e3yRdxZxQGSMSRTEqogz",
    bestTimeToCall: "e3yRdxZxQGSMSRTEqogz",
    consent_to_contact: "jf0iRhJ445H2aPGAX6nj",
    autism_diagnosed: "qUhRITsZTZEkoth9s7OX",
    irritability_symptoms: "Ot7Z5v3IRnq6ApsRwvSx",
    taking_antidepressant: "3v7WncFiEqMiWTCs6Hx2",
    still_symptoms: "Ddz6TKHUxuEdZksmX8qn",
    diagnosed_mdd: "qUhRITsZTZEkoth9s7OX",
    canVisitClinic: "C4PDttrUJcVYz5ZeKQID",
    hasUlcer: "j9uinTqEESQt2ECdiVAm",
    hasOpenWound: "j9uinTqEESQt2ECdiVAm",
    didPrescreen: "KCbDxYQAKoh2y54ME8J4",
    questions: "QUrrUGVTPvwuHRxtnqa1",
    message: "QUrrUGVTPvwuHRxtnqa1",
    antidepressant_6_weeks: "KbRXzvPGzNE5rEe1yQGr",
    ulcerDuration: "0Up3gmsbfXIH1Oerwkrl",
    hasDisqualifyingCondition: "kReysruIGnEtyn16jezW",
  },
};

function toCustomFields(customField, fieldMap) {
  const out = [];
  for (const [key, value] of Object.entries(customField || {})) {
    if (value === undefined || value === null || String(value) === "") continue;
    const normalized = key.toLowerCase().replace(/\s+/g, "_");
    const id =
      fieldMap[key] ||
      fieldMap[normalized] ||
      fieldMap[key.replace(/^contact\./, "")] ||
      (/^[a-zA-Z0-9]{20,}$/.test(key) ? key : "");
    if (!id) {
      console.warn(`[GHL v3] Custom field missing, skipping: "${key}"`);
      continue;
    }
    out.push({ id, value: String(value) });
  }
  return out;
}

function contactIdFrom(raw) {
  return raw?.contact?.id || raw?.id;
}

async function postContact(apiKey, body) {
  const res = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: GHL_API_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let raw = text;
  try {
    raw = text ? JSON.parse(text) : null;
  } catch {
    /* keep text */
  }
  if (!res.ok) {
    throw new Error(`GHL v3 upsert failed (${res.status}): ${text}`);
  }
  return raw;
}

export async function createOrUpsertGhlContact(payload) {
  const { apiKey, locationId, isConfigured } = getGhlConfig();
  if (!isConfigured) {
    throw new Error(
      "GoHighLevel is not configured (API key or location ID missing).",
    );
  }

  const firstName = String(payload.firstName || "").trim();
  const lastName = String(payload.lastName || "").trim();
  const phone = normalizeGhlPhone(payload.phone || "");
  const name = `${firstName} ${lastName}`.trim();

  const baseFieldMap = STATIC_FIELD_MAP_BY_LOCATION[locationId] || STATIC_FIELD_MAP_BY_LOCATION.I4ssFJs4dGWefTWWITaE || {};
  const liveFieldMap = payload.customField ? await fetchFieldMap(apiKey, locationId) : {};
  const fieldMap = { ...baseFieldMap, ...liveFieldMap };
  const customFields = toCustomFields(payload.customField, fieldMap);

  const body = {
    locationId,
    firstName,
    lastName,
    name,
    ...(payload.email ? { email: payload.email } : {}),
    ...(phone ? { phone } : {}),
    ...(payload.postalCode ? { postalCode: payload.postalCode } : {}),
    ...(payload.city ? { city: payload.city } : {}),
    ...(payload.state ? { state: payload.state } : {}),
    ...(payload.country ? { country: payload.country } : {}),
    ...(payload.tags?.length ? { tags: payload.tags } : {}),
    source: payload.source || "Website Form",
    ...(payload.companyName ? { companyName: payload.companyName } : {}),
    ...(customFields.length ? { customFields } : {}),
  };

  let raw;
  try {
    raw = await postContact(apiKey, body);
  } catch (error) {
    if (body.customFields) {
      console.warn("[GHL v3] Retrying without custom fields:", error);
      const { customFields: _dropped, ...bare } = body;
      void _dropped;
      raw = await postContact(apiKey, bare);
    } else {
      throw error;
    }
  }
  const contactId = contactIdFrom(raw);
  console.log("[GHL v3] Contact upserted", { contactId, locationId });
  return { ok: true, contactId, locationId, engine: "v3", raw };
}

export async function addGhlNote(contactId, body) {
  if (!contactId || !body?.trim()) return;
  const { apiKey } = getGhlConfig();
  if (!apiKey) return;

  const url = `${GHL_API_BASE}/contacts/${contactId}/notes`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Version: GHL_API_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ body }),
    });
    if (!res.ok) {
      console.warn(
        "[GHL v3] Note failed:",
        res.status,
        await res.text(),
      );
    }
  } catch (error) {
    console.warn("[GHL v3] Note error:", error);
  }
}
