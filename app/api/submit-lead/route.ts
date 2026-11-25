import { NextResponse } from "next/server";
import { EMPTY_LOCATION, lookupLeadLocation, type GeoLocation } from "@/lib/geolocation";
import { submitToCrio } from "@/lib/integrations/crio";
import {
  addGhlNote,
  getGhlConfig,
  hasFieldValue,
  upsertGhlContact,
  type GhlCustomField,
} from "@/lib/integrations/gohighlevel";
import {
  buildScreeningCustomFields,
  buildScreeningTags,
  screeningAnswerLines,
  toCrmScreening,
  type CrmScreening,
} from "@/lib/integrations/lpa-screening";
import { sendToGoogleSheets } from "@/lib/integrations/google-sheets";
import { capitalizeFullName, splitFullName } from "@/lib/name";
import { toUsE164 } from "@/lib/phone";
import { errorMessage, getClientIp, parseJsonBody } from "@/lib/request";
import { leadSubmissionSchema, type LeadSubmission } from "@/lib/validations/lead";

const STUDY_NAME = "Lp(a) Cardiovascular Study - Spanish";
const SHEET_NAME = "Lp(a) Leads";
const TEST_LEAD_DOMAIN = "@denali-example.com";
const BASE_TAGS = ["website-lead", "lp(a)", "qualified", "lp-a-spanish"];

const GHL_FIELD_IDS = {
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
  qualificationStatus: "bsduyvTkR2QuZVaVpjpz",
  studyName: "Yn32DdtZIAZqELj1Ca1b",
} as const;

const QUALIFICATION_NEEDS_REVIEW = "Needs Review";

const ATTRIBUTION_KEYS = [
  "gclid",
  "fbclid",
  "msclkid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "lead_source",
  "event_id",
] as const;

function buildTags(lead: LeadSubmission): string[] {
  const tags = [...BASE_TAGS, ...buildScreeningTags(lead.answers)];
  if (lead.gclid) tags.push("Channel: Google Ads", `gclid:${lead.gclid}`);
  if (lead.fbclid) tags.push("Channel: Meta", `fbclid:${lead.fbclid}`);
  if (lead.msclkid) tags.push("Channel: Microsoft Ads", `msclkid:${lead.msclkid}`);
  if (lead.utm_source) tags.push(`Source: ${lead.utm_source}`);
  if (lead.utm_medium) tags.push(`Medium: ${lead.utm_medium}`);
  if (lead.utm_campaign) tags.push(`Campaign: ${lead.utm_campaign}`);
  if (lead.lead_source) tags.push(`Lead Source: ${lead.lead_source}`);
  return tags;
}

function buildCustomFields(lead: LeadSubmission, crm: CrmScreening, consentedAt: string): GhlCustomField[] {
  const attributionFields = ATTRIBUTION_KEYS.map((key) => ({ id: GHL_FIELD_IDS[key], value: lead[key] ?? "" }));

  return [
    ...buildScreeningCustomFields(lead.answers, crm, consentedAt),
    { id: GHL_FIELD_IDS.qualificationStatus, value: [QUALIFICATION_NEEDS_REVIEW] },
    { id: GHL_FIELD_IDS.studyName, value: STUDY_NAME },
    ...attributionFields,
  ].filter(hasFieldValue);
}

const qualificationNote = `=== QUALIFICATION STATUS ===
Status: NEEDS REVIEW
Study: Lp(a) Cardiovascular Research
Location: Plant City, FL
`;

function buildAssessmentNote(
  displayName: string,
  crm: CrmScreening,
  location: GeoLocation,
  consentedAt: string,
): string {
  const locationLine =
    [location.city, location.state, location.zipCode, location.country].filter(Boolean).join(", ") || "N/A";

  return `=== LP(A) CARDIOVASCULAR STUDY FULL ASSESSMENT ===
=== PATIENT INFO ===
Name: ${displayName}
Age: ${crm.age_range}
Location: ${locationLine}
Language: Spanish

=== ALL QUESTION RESPONSES ===
${screeningAnswerLines(crm)}

=== CONSENT ===
Agreed to be contacted by the research team: Yes (${consentedAt})
`;
}

async function resolveLocation(request: Request): Promise<GeoLocation> {
  const ip = getClientIp(request);
  if (!ip) return EMPTY_LOCATION;

  try {
    return await lookupLeadLocation(ip);
  } catch (error) {
    console.warn("IP geolocation failed:", errorMessage(error));
    return EMPTY_LOCATION;
  }
}

export async function POST(request: Request) {
  const parsed = await parseJsonBody(request, leadSubmissionSchema);
  if (!parsed.success) return parsed.response;

  const lead = parsed.data;

  try {
    const location = await resolveLocation(request);
    const locationData = {
      city: location.city,
      state: location.state,
      postalCode: location.zipCode,
      country: location.country,
    };

    const displayName = capitalizeFullName(lead.name);
    const { firstName, lastName } = splitFullName(lead.name);
    const phone = toUsE164(lead.phone);
    const tags = buildTags(lead);
    const consentedAt = new Date().toISOString();
    const crm = toCrmScreening(lead.answers);
    const source =
      lead.source === "pre-screening-form"
        ? "Pre-Screening Form - Spanish Website"
        : "Spanish Website Eligibility Form";

    const isTestLead = process.env.NODE_ENV !== "production" && lead.email.endsWith(TEST_LEAD_DOMAIN);

    if (isTestLead) {
      console.log("[submit-lead] Test lead: skipping Google Sheets and CRIO");
    } else {
      sendToGoogleSheets(
        { name: displayName, phone: lead.phone, email: lead.email, status: "Qualified - Lp(a) Study" },
        SHEET_NAME,
      ).catch((error) => console.warn("[Google Sheets] Failed to send lead:", errorMessage(error)));

      submitToCrio({ firstName, lastName, email: lead.email, phone }).catch((error) =>
        console.warn("[CRIO] Failed to send lead:", errorMessage(error)),
      );
    }

    if (!getGhlConfig().isConfigured) {
      console.warn("[submit-lead] GoHighLevel is not configured. Accepting lead without CRM integration.");
      return NextResponse.json({
        success: true,
        message: "Lead received (CRM not configured)",
        tagsApplied: tags,
        locationData,
      });
    }

    try {
      const customFields = buildCustomFields(lead, crm, consentedAt);
      const { contactId } = await upsertGhlContact({
        firstName,
        lastName,
        email: lead.email,
        phone,
        city: location.city,
        state: location.state,
        postalCode: location.zipCode,
        country: location.country,
        source,
        tags,
        companyName: "Lp(a) - Spanish Website Lead",
        customFields,
      });

      if (!contactId) throw new Error("GHL returned success but contact id was not found.");

      await addGhlNote(contactId, qualificationNote);
      await addGhlNote(contactId, buildAssessmentNote(displayName, crm, location, consentedAt));

      return NextResponse.json({
        success: true,
        message: "Qualified lead created successfully (GoHighLevel v3)",
        contactId,
        tagsApplied: tags,
        customFieldsApplied: customFields.map((field) => field.id),
        locationData,
      });
    } catch (error) {
      console.warn("[GHL] CRM integration failed:", errorMessage(error));
      return NextResponse.json({
        success: true,
        message: "Lead received (CRM integration temporarily unavailable)",
        tagsApplied: tags,
        locationData,
      });
    }
  } catch (error) {
    console.error("submit-lead error:", error);
    const message = errorMessage(error);
    return NextResponse.json({ success: false, error: message, message }, { status: 500 });
  }
}
