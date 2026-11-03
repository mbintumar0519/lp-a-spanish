import { NextResponse } from "next/server";
import IPGeolocationAPI from "ip-geolocation-api-javascript-sdk";
import GeolocationParams from "ip-geolocation-api-javascript-sdk/GeolocationParams.js";
import {
  splitAndCapitalizeName,
  capitalizeFullName,
} from "../../utils/nameCapitalization.js";
import { sendToGoogleSheets } from "../../utils/googleSheets.js";
import {
  addGhlNote,
  createOrUpsertGhlContact,
  getGhlConfig,
} from "../../lib/ghl.js";

const isDev = process.env.NODE_ENV !== "production";
const ipgeolocationApi = new IPGeolocationAPI(
  process.env.IP_GEOLOCATION_API_KEY,
  false
);

// ---------- helpers ----------
const mask = (str = "", left = 6, right = 4) => {
  if (!str) return "MISSING";
  if (str.length <= left + right) return `${str[0]}***${str[str.length - 1]}`;
  return `${str.slice(0, left)}...${str.slice(-right)}`;
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
  hasElevatedLpa: "L3MIhXPd3qfgRm4lccex",
  ageOver50: "HelVW4nqMb0Wxy3UwDod",
  takesCholesterolMeds: "eZMqJYmjI3QIH99HWMIJ",
  canTravelToPlantCity: "Bak7rs2wj9tSidZwCGAF",
  qualificationStatus: "bsduyvTkR2QuZVaVpjpz",
  studyName: "Yn32DdtZIAZqELj1Ca1b",
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

    const { isConfigured } = getGhlConfig();

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
    const baseTags = ["website-lead", "lp(a)", "qualified", "lp-a-spanish"];
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

    const apiKey = (
      process.env.GOHIGHLEVEL_API_KEY ||
      process.env.GHL_API_KEY ||
      ""
    ).trim();

    if (isDev) {
      console.log("[GHL] Creating contact:", {
        engine: apiKey.startsWith("pit-") || apiKey.startsWith("pit_") ? "v2" : "v1",
        apiKeyPreview: mask(apiKey),
        contactData,
        customFieldCount: Object.keys(customFieldObj).length,
      });
    }

    if (isConfigured) {
      try {
        const result = await createOrUpsertGhlContact({
          firstName,
          lastName,
          email,
          phone,
          city: locationData.city,
          state: locationData.state,
          postalCode: locationData.postalCode,
          country: locationData.country,
          source: contactData.source,
          tags,
          companyName: contactData.companyName,
          customField: customFieldObj,
        });

        if (!result.contactId)
          throw new Error("GHL returned success but contact id was not found.");

        // Add the qualification + full assessment notes using the active engine.
        await addGhlNote(result.contactId, qualificationNote);
        await addGhlNote(result.contactId, fullAssessmentNote);

        return NextResponse.json({
          success: true,
          message: `Qualified lead created successfully (GoHighLevel ${result.engine})`,
          contactId: result.contactId,
          tagsApplied: tags,
          customFieldsApplied: Object.keys(customFieldObj),
          locationData,
        });
      } catch (e) {
        console.warn("[GHL] CRM integration failed:", e.message);
        return NextResponse.json({
          success: true,
          message: "Lead received (CRM integration temporarily unavailable)",
          tagsApplied: tags,
          locationData,
        });
      }
    }

    console.warn("[submit-lead] GOHIGHLEVEL_API_KEY or GOHIGHLEVEL_LOCATION_ID not set. Accepting lead without CRM integration.");
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
