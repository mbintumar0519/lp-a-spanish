import { NextResponse } from "next/server";
import IPGeolocationAPI from "ip-geolocation-api-javascript-sdk";
import GeolocationParams from "ip-geolocation-api-javascript-sdk/GeolocationParams.js";
import {
  splitAndCapitalizeName,
  capitalizeFullName,
} from "../../utils/nameCapitalization.js";
import { sendToGoogleSheets } from "../../utils/googleSheets.js";

const isDev = process.env.NODE_ENV !== "production";
const ipgeolocationApi = new IPGeolocationAPI(
  process.env.IP_GEOLOCATION_API_KEY,
  false
);
const GHL_V1_BASE = "https://rest.gohighlevel.com/v1";

// ---------- helpers ----------
const mask = (str = "", left = 6, right = 4) => {
  if (!str) return "MISSING";
  if (str.length <= left + right) return `${str[0]}***${str[str.length - 1]}`;
  return `${str.slice(0, left)}...${str.slice(-right)}`;
};

const buildV1Headers = () => {
  const token = (
    process.env.GOHIGHLEVEL_API_KEY ||
    process.env.GHL_API_KEY ||
    ""
  ).trim();
  if (!token) return null;
  if (process.env.NODE_ENV === 'production' && !token.includes('.')) {
    throw new Error(
      "GOHIGHLEVEL_API_KEY must be the v1 Location API key (eyJ…)."
    );
  }
  if (isDev) console.log("[GHL v1] Using key:", mask(token));
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

const extractContactIdV1 = (obj) => {
  if (!obj) return undefined;
  if (obj.contact?.id) return obj.contact.id;
  if (obj.id) return obj.id;
  return undefined;
};

function getGeolocationAsync(params) {
  return new Promise((resolve, reject) => {
    ipgeolocationApi.getGeolocation((json) => {
      if (json.message) reject(new Error(json.message));
      else resolve(json);
    }, params);
  });
}

// ---------- GHL custom fields ----------

const GHL_FIELD_KEY_MAP = {
  google_click_id: "google_click_id",
  fbclid: "fbclid",
  msclkid: "msclkid",
  utm_source: "utm_source",
  utm_medium: "utm_medium",
  utm_campaign: "utm_campaign",
  utm_content: "utm_content",
  utm_term: "utm_term",
  lead_source: "lead_source",
  event_id: "event_id",
  hasElevatedLpa: "hasElevatedLpa",
  ageOver50: "ageOver50",
  takesCholesterolMeds: "takesCholesterolMeds",
  canTravelToPlantCity: "canTravelToPlantCity",
  qualificationStatus: "qualificationStatus",
  studyName: "studyName",
};

function buildChannelTags(formData) {
  const tags = [];
  if (formData.gclid) tags.push("Channel: Google Ads", `gclid:${formData.gclid}`);
  if (formData.fbclid) tags.push("Channel: Meta", `fbclid:${formData.fbclid}`);
  if (formData.msclkid) tags.push("Channel: Microsoft Ads", `msclkid:${formData.msclkid}`);
  if (formData.utm_source) tags.push(`Source: ${formData.utm_source}`);
  if (formData.utm_medium) tags.push(`Medium: ${formData.utm_medium}`);
  if (formData.utm_campaign) tags.push(`Campaign: ${formData.utm_campaign}`);
  if (formData.lead_source) tags.push(`Lead Source: ${formData.lead_source}`);
  return tags;
}

function buildAttributionCustomFields(formData) {
  const fields = [
    { name: "google_click_id", value: formData.gclid || "" },
    { name: "fbclid", value: formData.fbclid || "" },
    { name: "msclkid", value: formData.msclkid || "" },
    { name: "utm_source", value: formData.utm_source || "" },
    { name: "utm_medium", value: formData.utm_medium || "" },
    { name: "utm_campaign", value: formData.utm_campaign || "" },
    { name: "utm_content", value: formData.utm_content || "" },
    { name: "utm_term", value: formData.utm_term || "" },
    { name: "lead_source", value: formData.lead_source || "" },
    { name: "event_id", value: formData.event_id || "" },
  ];
  return fields.filter((f) => f.value);
}

let _fieldMapCache = null;
let _fieldMapCacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

async function fetchGhlFieldMap(apiKey) {
  const now = Date.now();
  if (_fieldMapCache && now - _fieldMapCacheTime < CACHE_TTL_MS) return _fieldMapCache;
  try {
    const res = await fetch(`${GHL_V1_BASE}/custom-fields/`, {
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    });
    const data = await res.json();
    const fields = data?.customFields || [];
    const map = {};
    for (const f of fields) {
      if (!f?.id) continue;
      if (f.fieldKey) map[f.fieldKey] = f.id;
      if (f.key) map[f.key] = f.id;
      if (f.name) map[f.name] = f.id;
    }
    _fieldMapCache = map;
    _fieldMapCacheTime = now;
    if (isDev) console.log("[GHL] Fetched custom field map:", Object.keys(map));
    return map;
  } catch (err) {
    console.error("[GHL] Failed to fetch custom fields:", err.message);
    return _fieldMapCache || {};
  }
}

async function updateGhlCustomFields(apiKey, contactId, customFieldObj, contactData) {
  try {
    const batchPayload = {
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      email: contactData.email,
      phone: contactData.phone,
      customField: customFieldObj,
    };
    const res = await fetch(`${GHL_V1_BASE}/contacts/${contactId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(batchPayload),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Batch update failed ${res.status}: ${errText}`);
    }
    if (isDev) console.log("[GHL] Batch customField update succeeded");
    return true;
  } catch (batchErr) {
    console.error("[GHL] Batch customField update failed:", batchErr.message);
    const fieldMap = await fetchGhlFieldMap(apiKey);
    for (const [key, value] of Object.entries(customFieldObj)) {
      const fieldId = fieldMap[key];
      if (!fieldId) {
        console.warn(`[GHL] No field ID for key: "${key}"`);
        continue;
      }
      try {
        const singleRes = await fetch(`${GHL_V1_BASE}/contacts/${contactId}/custom-field`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({ custom_field_id: fieldId, value }),
        });
        if (!singleRes.ok) {
          console.error(`[GHL] Failed to update "${key}":`, await singleRes.text());
        }
      } catch (singleErr) {
        console.error(`[GHL] Failed to update "${key}":`, singleErr.message);
      }
    }
    return false;
  }
}

const ANSWER_LABELS = {
  high_lpa: "Has elevated Lp(a) levels",
  heart_risk_factors: "Has cardiovascular risk factors",
  can_travel: "Can travel to Plant City, FL for study visits",
};

const CONDITION_NAMES = {
  crohns_disease: "Current diagnosis of Crohn's disease",
  isolated_proctitis: "Isolated proctitis (UC limited to rectum only)",
  ileostomy_colostomy: "Permanent ileostomy or colostomy",
  bowel_surgery_recent: "Major bowel surgery within past 6 months",
  cancer_history: "Cancer history in past 5 years or current treatment",
  serious_infection: "Serious/opportunistic infection within past 6 months",
  hepatitis_infection: "Active hepatitis B or hepatitis C infection",
  tuberculosis_history: "History of tuberculosis or current TB treatment",
  immunodeficiency: "Known immunodeficiency disorder",
  biologics_monoclonal_antibodies:
    "Current treatment with biologics/monoclonal antibodies for UC",
};

const submitToCrio = async ({ firstName, lastName, email, phone }) => {
  try {
    const formData = new URLSearchParams();
    formData.append('id', '14681');
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('mobile_phone', phone);

    const response = await fetch('https://app.clinicalresearch.io/web-form-save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`CRIO submission failed: ${response.status} ${text}`);
    }

    if (isDev) console.log('[CRIO] Lead submitted successfully');
    return true;
  } catch (error) {
    console.error('[CRIO] Error submitting lead:', error);
    throw error;
  }
};

// ---------- handler ----------
export async function POST(request) {
  try {
    const body = await request.json();
    const { eventId, fbp, fbc, ...formData } = body;

    // Live CRM test requested: remove dev short-circuit so requests hit GHL

    // --- Geo-IP (best effort) ---
    const headersList = request.headers;
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip =
      headersList.get("x-nf-client-connection-ip") ||
      (forwardedFor ? forwardedFor.split(",")[0].trim() : null) ||
      "8.8.8.8";
    const userAgent = headersList.get("user-agent");
    const referer = headersList.get("referer");

    let locationData = { city: "", state: "", postalCode: "", country: "US" };
    try {
      const geolocationParams = new GeolocationParams();
      geolocationParams.setIPAddress(ip);
      geolocationParams.setFields("geo,zipcode");
      const geo = await getGeolocationAsync(geolocationParams);
      locationData = {
        city: geo.city || "",
        state: geo.state_prov || "",
        postalCode: geo.zipcode || "",
        country: geo.country_code2 || "US",
      };
    } catch (e) {
      console.warn("IP Geolocation failed:", e.message);
    }

    const v1Headers = buildV1Headers();

    // --- Only accept qualified leads from pre-screening form ---
    const isPreScreening = formData.source === "pre-screening-form";

    // Accept all leads for Lp(a) study (non-conditional form)
    // No qualification validation needed

    // --- Build the qualification note ---
    const qualificationNote = `=== QUALIFICATION STATUS ===
Status: PENDING REVIEW
Study: Lp(a) Cardiovascular Research
Location: Plant City, FL
`;

    const answerLines = [];
    if (formData.answers && typeof formData.answers === "object") {
      Object.entries(formData.answers).forEach(([key, val]) => {
        const label =
          ANSWER_LABELS[key] ||
          key.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
        const rendered = Array.isArray(val) ? val.join("; ") : val ?? "";
        answerLines.push(`- ${label}: ${rendered || "Not answered"}`);
      });
    }

    // Build minimal Full Assessment note (no title line, no extras)
    const locationLine =
      [
        locationData.city,
        locationData.state,
        locationData.postalCode,
        locationData.country,
      ]
        .filter(Boolean)
        .join(", ") || "N/A";

    // Get properly capitalized name for display
    const displayName = formData.name
      ? capitalizeFullName(formData.name)
      : "N/A";

    const fullAssessmentNote = `=== LP(A) CARDIOVASCULAR STUDY FULL ASSESSMENT ===
=== PATIENT INFO ===
Name: ${displayName}
Age: ${formData.age || "Not provided"}
Location: ${locationLine}

=== ALL QUESTION RESPONSES ===
${answerLines.join("\n") || "- None"}
`;

    const { firstName, lastName } = splitAndCapitalizeName(formData.name || "");

    const rawPhone = String(formData.phone || "").trim();
    let phone = rawPhone;
    if (rawPhone) {
      if (rawPhone.startsWith("+")) {
        phone = rawPhone;
      } else {
        const digits = rawPhone.replace(/\D/g, "");
        if (digits.length === 10) phone = `+1${digits}`;
        else if (digits.length === 11 && digits.startsWith("1")) phone = `+${digits}`;
        else phone = `+${digits}`;
      }
    }
    const email = (formData.email || "").trim().toLowerCase();

    // --- Build tags ---
    const baseTags = ["website-lead", "Lp(a)", "qualified", "lp-a-spanish"];
    const attributionTags = buildChannelTags(formData);
    const tags = [...baseTags, ...attributionTags];

    // --- Build custom fields ---
    const baseCustomFields = [
      { name: "hasElevatedLpa", value: formData.answers?.high_lpa || "" },
      { name: "ageOver50", value: formData.answers?.age_50_plus || "" },
      { name: "takesCholesterolMeds", value: formData.answers?.heart_risk_factors || "" },
      { name: "canTravelToPlantCity", value: formData.answers?.can_travel || "" },
      { name: "qualificationStatus", value: "pending" },
      { name: "studyName", value: "Lp(a) Cardiovascular Study - Spanish" },
    ];
    const attributionCustomFields = buildAttributionCustomFields(formData);
    const allCustomFields = [...baseCustomFields, ...attributionCustomFields];

    // Build customField object for GHL v1 API
    const customFieldObj = allCustomFields.reduce((acc, f) => {
      if (f.value !== undefined && f.value !== null && f.value !== "") {
        const ghlKey = GHL_FIELD_KEY_MAP[f.name] || f.name;
        acc[ghlKey] = String(f.value);
      }
      return acc;
    }, {});

    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      city: locationData.city,
      state: locationData.state,
      postalCode: locationData.postalCode,
      country: locationData.country,
      source: isPreScreening
        ? "Pre-Screening Form - Spanish Website"
        : "Spanish Website Eligibility Form",
      tags,
      companyName: "Lp(a) - Spanish Website Lead",
    };

    // --- Send to Google Sheets (non-blocking) ---
    sendToGoogleSheets(
      {
        name: displayName,
        phone: rawPhone,
        email,
        status: "Qualified - Lp(a) Study",
      },
      "Lp(a) Leads"
    ).catch((err) => {
      console.warn("[Google Sheets] Failed to send lead:", err.message);
    });

    // --- Send to CRIO (non-blocking) ---
    submitToCrio({ firstName, lastName, email, phone }).catch((err) => {
      console.warn("[CRIO] Failed to send lead:", err.message);
    });

    if (isDev) {
      console.log("[GHL v1] Creating contact:", {
        endpoint: `${GHL_V1_BASE}/contacts/`,
        apiKeyPreview: mask(process.env.GOHIGHLEVEL_API_KEY || process.env.GHL_API_KEY),
        contactData,
        customFieldCount: Object.keys(customFieldObj).length,
      });
    }

    if (v1Headers) {
      try {
        // Step 1: Create contact with standard fields
        const createRes = await fetch(`${GHL_V1_BASE}/contacts/`, {
          method: "POST",
          headers: v1Headers,
          body: JSON.stringify(contactData),
        });
        const createText = await createRes.text();
        if (!createRes.ok)
          throw new Error(`GHL v1 create contact failed ${createRes.status}: ${createText}`);
        let createJson = {};
        try {
          createJson = JSON.parse(createText);
        } catch {
          /* ignore */
        }
        const contactId = extractContactIdV1(createJson);
        if (!contactId)
          throw new Error("GHL v1 returned success but contact id was not found.");

        // Step 2: Update custom fields via batch PUT or individual fallback
        if (Object.keys(customFieldObj).length > 0) {
          await updateGhlCustomFields(
            process.env.GOHIGHLEVEL_API_KEY || process.env.GHL_API_KEY,
            contactId,
            customFieldObj,
            contactData
          );
        }

        // Add notes
        const note1 = await fetch(`${GHL_V1_BASE}/contacts/${contactId}/notes/`, {
          method: "POST",
          headers: v1Headers,
          body: JSON.stringify({ body: qualificationNote }),
        });
        if (!note1.ok) console.warn("[GHL v1] Qualification note failed:", await note1.text());

        const note2 = await fetch(`${GHL_V1_BASE}/contacts/${contactId}/notes/`, {
          method: "POST",
          headers: v1Headers,
          body: JSON.stringify({ body: fullAssessmentNote }),
        });
        if (!note2.ok) console.warn("[GHL v1] Full assessment note failed:", await note2.text());

        return NextResponse.json({
          success: true,
          message: "Qualified lead created successfully",
          contactId,
          tagsApplied: tags,
          customFieldsApplied: Object.keys(customFieldObj),
          locationData,
        });
      } catch (e) {
        console.warn("[GHL v1] CRM integration failed:", e.message);
        return NextResponse.json({
          success: true,
          message: "Lead received (CRM integration temporarily unavailable)",
          tagsApplied: tags,
          locationData,
        });
      }
    }

    console.warn("[submit-lead] GOHIGHLEVEL_API_KEY not set. Accepting lead without CRM integration.");
    return NextResponse.json({
      success: true,
      message: "Lead received (CRM not configured)",
      tagsApplied: tags,
      locationData,
    });
  } catch (error) {
    console.error("submit-lead error:", error);
    return NextResponse.json(
      { success: false, error: error.message, message: error.message },
      { status: 500 }
    );
  }
}
