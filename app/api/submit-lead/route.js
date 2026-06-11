import { NextResponse } from "next/server";
import IPGeolocationAPI from "ip-geolocation-api-javascript-sdk";
import GeolocationParams from "ip-geolocation-api-javascript-sdk/GeolocationParams.js";
import fs from 'fs';
import path from 'path';
import os from 'os';
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

// Map internal field names -> GoHighLevel custom field keys.
// These must match the Keys shown in GHL Settings -> Custom Fields.
const GHL_FIELD_KEY_MAP = {
  google_click_id: 'google_click_id',
  fbclid: 'fbclid',
  msclkid: 'msclkid',
  utm_source: 'utm_source',
  utm_medium: 'utm_medium',
  utm_campaign: 'utm_campaign',
  utm_content: 'utm_content',
  utm_term: 'utm_term',
  lead_source: 'lead_source',
  event_id: 'event_id',
  high_lpa: 'high_lpa',
  age_50_plus: 'age_50_plus',
  heart_risk_factors: 'heart_risk_factors',
  can_travel: 'can_travel',
  study_name: 'study_name',
  qualification_status: 'qualification_status',
};

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
  if (!token) return null; // allow graceful local fallback
  // In dev, tolerate non-JWT keys to avoid hard failures; prod should use proper v1 key
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

const ANSWER_LABELS = {
  high_lpa: "Has elevated Lp(a) levels",
  age_50_plus: "Age 50 or older",
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

// Function to save lead data locally as a fallback
async function saveLeadLocally(leadData) {
  try {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const fileName = `lpa_lead_${timestamp}.json`;
    const filePath = path.join(process.cwd(), 'leads', fileName);

    // Create leads directory if it doesn't exist
    const leadsDir = path.join(process.cwd(), 'leads');
    if (!fs.existsSync(leadsDir)) {
      try {
        fs.mkdirSync(leadsDir, { recursive: true });
      } catch (dirError) {
        console.error('Error creating leads directory:', dirError);
        return saveInTempDirectory(leadData, fileName);
      }
    }

    // Write lead data to file
    try {
      fs.writeFileSync(filePath, JSON.stringify(leadData, null, 2));
      console.log(`Lead data saved locally to ${filePath}`);
      return true;
    } catch (writeError) {
      console.error('Error writing lead data file:', writeError);
      return saveInTempDirectory(leadData, fileName);
    }
  } catch (error) {
    console.error('Error saving lead locally:', error);
    return false;
  }
}

// Fallback to save in temporary directory if leads directory is not accessible
function saveInTempDirectory(leadData, fileName) {
  try {
    const tempDir = path.join(os.tmpdir(), 'lpa-study-leads');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    const tempPath = path.join(tempDir, fileName);
    fs.writeFileSync(tempPath, JSON.stringify(leadData, null, 2));
    console.log(`Lead data saved to temporary location: ${tempPath}`);
    return true;
  } catch (tempError) {
    console.error('Failed to save to temporary directory:', tempError);
    return false;
  }
}

// Helper: fetch current custom-field IDs from GHL (cached for 5 min).
let _fieldMapCache = null;
let _fieldMapCacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

async function fetchGhlFieldMap(apiKey) {
  const now = Date.now();
  if (_fieldMapCache && (now - _fieldMapCacheTime) < CACHE_TTL_MS) return _fieldMapCache;
  try {
    const res = await fetch(`${GHL_V1_BASE}/custom-fields/`, {
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
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
    console.log('[GHL] Fetched custom field map:', Object.keys(map));
    return map;
  } catch (err) {
    console.error('[GHL] Failed to fetch custom fields:', err.message);
    return _fieldMapCache || {};
  }
}

// Function to create a contact in GoHighLevel with custom fields
// Uses the two-step pattern:
// 1. POST /v1/contacts/  (basic info only)
// 2. PUT  /v1/contacts/{id} with customField: { key: value }
// If that fails, fall back to PUT /contacts/{id}/custom-field with { custom_field_id, value }
async function createGoHighLevelContact(contactData, customFields = []) {
  try {
    const apiKey = process.env.GOHIGHLEVEL_API_KEY || process.env.GHL_API_KEY;
    if (!apiKey) {
      throw new Error('GOHIGHLEVEL_API_KEY is not configured. Set it in .env.local.');
    }

    // Step 1: Create the contact with only standard fields
    const createPayload = { ...contactData };
    delete createPayload.customFields;
    delete createPayload.customField;

    console.log('=== GHL CONTACT CREATE ===');
    console.log('Create payload:', JSON.stringify(createPayload));

    const createResponse = await fetch(`${GHL_V1_BASE}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createPayload),
    });

    const createText = await createResponse.text();
    let createJson = {};
    try { createJson = JSON.parse(createText); } catch { /* ignore */ }

    if (!createResponse.ok) {
      throw new Error(`GHL v1 create contact failed ${createResponse.status}: ${createText}`);
    }

    console.log(`GoHighLevel contact created. Status: ${createResponse.status}`);
    const contactId = extractContactIdV1(createJson);
    console.log('Contact ID:', contactId);

    // Prepare cleaned custom fields
    const fieldsToUpdate = customFields
      .filter((f) => f && (f.name || f.key) && f.value !== undefined && f.value !== null && f.value !== '')
      .map((f) => {
        const ghlKey = GHL_FIELD_KEY_MAP[f.name || f.key] || (f.key || f.name);
        if (!ghlKey || ghlKey.startsWith('REPLACE_ME')) {
          console.warn(`No GHL field key mapped for: ${f.name || f.key}. Skipping.`);
          return null;
        }
        return { key: ghlKey, value: String(f.value) };
      })
      .filter(Boolean);

    if (!contactId || fieldsToUpdate.length === 0) {
      return createJson;
    }

    console.log('=== GHL CUSTOM FIELDS UPDATE ===');
    console.log('Fields to update:', JSON.stringify(fieldsToUpdate));

    // Approach A: GHL v1 uses customField as an OBJECT { key: value }, NOT an array
    try {
      const customFieldObj = fieldsToUpdate.reduce((acc, f) => {
        acc[f.key] = f.value;
        return acc;
      }, {});

      const batchPayload = {
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        email: contactData.email,
        phone: contactData.phone,
        customField: customFieldObj,   // key fix: object format for v1 API
      };
      console.log('Batch update payload:', JSON.stringify(batchPayload));

      const batchRes = await fetch(`${GHL_V1_BASE}/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchPayload),
      });

      const batchText = await batchRes.text();
      console.log(`Batch customField update succeeded. Status: ${batchRes.status}`);

      // Verify after update
      try {
        const verifyRes = await fetch(`${GHL_V1_BASE}/contacts/${contactId}`, {
          headers: { 'Authorization': `Bearer ${apiKey}` },
        });
        const verifyData = await verifyRes.json();
        console.log('Verification customField:', JSON.stringify(verifyData?.contact?.customField));
        console.log('Verification customFields:', JSON.stringify(verifyData?.contact?.customFields));
      } catch (verifyErr) {
        console.warn('Verification fetch failed:', verifyErr.message);
      }
    } catch (batchErr) {
      console.error('Batch customField update failed:', batchErr.message);

      // Approach B: Fallback -- individual UUID-based updates
      console.log('Falling back to individual custom-field updates...');
      const fieldMap = await fetchGhlFieldMap(apiKey);

      for (const field of fieldsToUpdate) {
        const fieldId = fieldMap[field.key];
        if (!fieldId) {
          console.warn(`No GHL field ID found for key: "${field.key}". Available keys:`, Object.keys(fieldMap));
          continue;
        }
        try {
          const singleRes = await fetch(`${GHL_V1_BASE}/contacts/${contactId}/custom-field`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ custom_field_id: fieldId, value: field.value }),
          });
          console.log(`Updated "${field.key}" via individual PUT. Status: ${singleRes.status}`);
        } catch (singleErr) {
          console.error(`Failed to update "${field.key}":`, singleErr.message);
        }
      }
    }

    console.log('=== END GHL CUSTOM FIELDS UPDATE ===');
    return createJson;
  } catch (error) {
    console.error('Error creating GoHighLevel contact:', error.message);
    throw error;
  }
}

function buildChannelTags(formData) {
  const tags = [];
  if (formData.gclid)   tags.push('Channel: Google Ads',  `gclid:${formData.gclid}`);
  if (formData.fbclid)  tags.push('Channel: Meta',         `fbclid:${formData.fbclid}`);
  if (formData.msclkid) tags.push('Channel: Microsoft Ads', `msclkid:${formData.msclkid}`);
  if (formData.utm_source)   tags.push(`Source: ${formData.utm_source}`);
  if (formData.utm_medium)   tags.push(`Medium: ${formData.utm_medium}`);
  if (formData.utm_campaign) tags.push(`Campaign: ${formData.utm_campaign}`);
  if (formData.lead_source)  tags.push(`Lead Source: ${formData.lead_source}`);
  return tags;
}

function buildAttributionCustomFields(formData) {
  const fields = [
    { name: 'google_click_id', value: formData.gclid || '' },
    { name: 'fbclid',        value: formData.fbclid || '' },
    { name: 'msclkid',       value: formData.msclkid || '' },
    { name: 'utm_source',    value: formData.utm_source || '' },
    { name: 'utm_medium',    value: formData.utm_medium || '' },
    { name: 'utm_campaign',  value: formData.utm_campaign || '' },
    { name: 'utm_content',   value: formData.utm_content || '' },
    { name: 'utm_term',      value: formData.utm_term || '' },
    { name: 'lead_source',   value: formData.lead_source || '' },
    { name: 'event_id',      value: formData.event_id || '' },
  ];
  return fields.filter((f) => f.value);
}

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

    // --- Build contact tags - all leads are qualified ---
    const tags = ["website-lead", "Lp(a)", "qualified", "lp-a-spanish"];

    // Apply proper name capitalization
    const { firstName, lastName } = splitAndCapitalizeName(formData.name || "");

    // Normalize contact fields
    const rawPhone = String(formData.phone || '').trim();
    let phone = rawPhone;
    if (rawPhone) {
      if (rawPhone.startsWith('+')) {
        phone = rawPhone;
      } else {
        const digits = rawPhone.replace(/\D/g, '');
        if (digits.length === 10) phone = `+1${digits}`; // assume US
        else if (digits.length === 11 && digits.startsWith('1')) phone = `+${digits}`;
        else phone = `+${digits}`;
      }
    }
    const email = (formData.email || '').trim().toLowerCase();

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
      tags, // ONLY these tags
      companyName: "Lp(a) - Spanish Website Lead",
    };

    // Build custom fields for Lp(a) study
    let customFields = [];

    // Add study-specific custom fields from answers
    if (formData.answers && typeof formData.answers === "object") {
      Object.entries(formData.answers).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          customFields.push({
            name: key,
            value: Array.isArray(val) ? val.join('; ') : String(val)
          });
        }
      });
    }

    // Add study metadata
    customFields.push({ name: 'study_name', value: 'Lp(a) Cardiovascular Research - Spanish' });
    customFields.push({ name: 'qualification_status', value: 'Pending Review' });

    // Add attribution/tracking custom fields
    customFields = [...customFields, ...buildAttributionCustomFields(formData)];

    // Apply channel tags for every form type
    contactData.tags = [...(contactData.tags || []), ...buildChannelTags(formData)];

    // --- Send to Google Sheets (non-blocking) ---
    // Fire and forget - don't let Google Sheets failures block the main flow
    sendToGoogleSheets({
      name: displayName,
      phone: rawPhone,
      email: email,
      status: 'Qualified - Lp(a) Study (Spanish)'
    }, 'Lp(a) Leads Spanish').catch(err => {
      console.warn('[Google Sheets] Failed to send lead:', err.message);
    });

    // --- Send to CRIO (non-blocking) ---
    // Fire and forget
    submitToCrio({
      firstName,
      lastName,
      email,
      phone,
    }).catch(err => {
      console.warn('[CRIO] Failed to send lead:', err.message);
    });

    if (isDev) {
      console.log("[GHL v1] Creating contact:", {
        endpoint: `${GHL_V1_BASE}/contacts/`,
        apiKeyPreview: mask(
          process.env.GOHIGHLEVEL_API_KEY || process.env.GHL_API_KEY
        ),
        contactData,
      });
    }
    if (v1Headers) {
      try {
        // --- Create contact with custom fields ---
        const createJson = await createGoHighLevelContact(contactData, customFields);
        const contactId = extractContactIdV1(createJson);
        if (!contactId)
          throw new Error("GHL v1 returned success but contact id was not found.");

        // --- Add the two notes (v1) ---
        const note1 = await fetch(`${GHL_V1_BASE}/contacts/${contactId}/notes/`, {
          method: "POST",
          headers: v1Headers,
          body: JSON.stringify({ body: qualificationNote }),
        });
        if (!note1.ok)
          console.warn("[GHL v1] Qualification note failed:", await note1.text());

        const note2 = await fetch(`${GHL_V1_BASE}/contacts/${contactId}/notes/`, {
          method: "POST",
          headers: v1Headers,
          body: JSON.stringify({ body: fullAssessmentNote }),
        });
        if (!note2.ok)
          console.warn("[GHL v1] Full assessment note failed:", await note2.text());

        return NextResponse.json({
          success: true,
          message: "Qualified lead created successfully",
          contactId,
          tagsApplied: tags,
          locationData: locationData,
        });
      } catch (e) {
        console.warn("[GHL v1] CRM integration failed:", e.message);
        // Always accept the lead - Google Sheets and CRIO already have it
        return NextResponse.json({
          success: true,
          message: "Lead received (CRM integration failed; saved to backup systems)",
          tagsApplied: tags,
          locationData,
        });
      }
    }

    // No GHL key configured -- still accept the lead (Google Sheets + CRIO have it)
    console.warn("[submit-lead] GOHIGHLEVEL_API_KEY not set. Lead saved to backup systems only.");
    return NextResponse.json({
      success: true,
      message: "Lead received (no CRM configured; saved to backup systems)",
      tagsApplied: tags,
      locationData,
    });
  } catch (error) {
    console.error("submit-lead error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
