import {
  NO_RISK_FACTOR,
  type AgeRange,
  type ArteryScanResult,
  type CardiacEventAnswer,
  type PreScreeningAnswers,
  type RiskFactor,
} from "@/lib/validations/lead";

export const SCREENING_FIELD_IDS = {
  ageRange: "bHHI9z9FN5OnwD4eZPbJ",
  riskFactors: "dUPrOACo0ikWpIkGsyDh",
  riskFactorCount: "ZDJY6rhxwAl7kSEKr7N1",
  arteryScan: "DlqEoX0TFsQQS5YhcQLe",
  priorCardiacEvent: "JIJbuHFT2gQ48sg8Uc3H",
  canTravel: "CPeBVzlkIdLH2RdMKvp7",
  contactConsent: "opc0ZJffkxECWNaQiEBP",
  ageOver50: "HelVW4nqMb0Wxy3UwDod",
  canTravelToPlantCity: "Bak7rs2wj9tSidZwCGAF",
} as const;

const CRM_AGE_RANGE: Record<AgeRange, string> = {
  under_50: "Under 50",
  "50_64": "50–64",
  "65_plus": "65 or older",
};

const CRM_RISK_FACTOR: Record<RiskFactor, string> = {
  bp_medication: "High blood pressure medication",
  diabetes_medication: "Diabetes medication",
  smoker: "Current smoker",
  inherited_cholesterol: "Inherited high cholesterol / early family heart disease",
  reduced_kidney_function: "Reduced kidney function (eGFR 30–59)",
  high_hs_crp: "High inflammation (hs-CRP ≥ 2.0 mg/L)",
  none: "None of these / Not sure",
};

const CRM_ARTERY_SCAN: Record<ArteryScanResult, string> = {
  cac_over_300: "Yes – coronary calcium score above 300",
  plaque_or_narrowing: "Yes – plaque buildup or narrowing",
  scan_unsure: "Had a scan – unsure of results",
  no: "No",
  not_sure: "Not sure",
};

const CRM_CARDIAC_EVENT: Record<CardiacEventAnswer, string> = {
  yes: "Yes",
  no: "No",
  not_sure: "Not sure",
};

const ANSWER_LABELS: Record<keyof PreScreeningAnswers, string> = {
  age_range: "Age",
  risk_factors: "Risk factors",
  artery_scan: "Heart/artery scan showing plaque or narrowing",
  prior_cardiac_event: "Prior heart attack, stroke, TIA, stent, or bypass",
  can_travel: "Can travel to Plant City, FL for screening and study visits",
};

export type CrmScreening = Record<keyof PreScreeningAnswers, string> & {
  riskFactorList: string[];
  riskFactorCount: number;
};

export function toCrmScreening(answers: PreScreeningAnswers): CrmScreening {
  const riskFactorList = answers.risk_factors.map((factor) => CRM_RISK_FACTOR[factor]);
  return {
    age_range: CRM_AGE_RANGE[answers.age_range],
    risk_factors: riskFactorList.join("; "),
    artery_scan: CRM_ARTERY_SCAN[answers.artery_scan],
    prior_cardiac_event: CRM_CARDIAC_EVENT[answers.prior_cardiac_event],
    can_travel: answers.can_travel,
    riskFactorList,
    riskFactorCount: answers.risk_factors.filter((factor) => factor !== NO_RISK_FACTOR).length,
  };
}

export function buildScreeningCustomFields(
  answers: PreScreeningAnswers,
  crm: CrmScreening,
  consentedAt: string,
): { id: string; value: string | string[] | number }[] {
  return [
    { id: SCREENING_FIELD_IDS.ageRange, value: crm.age_range },
    { id: SCREENING_FIELD_IDS.riskFactors, value: crm.riskFactorList },
    { id: SCREENING_FIELD_IDS.riskFactorCount, value: crm.riskFactorCount },
    { id: SCREENING_FIELD_IDS.arteryScan, value: crm.artery_scan },
    { id: SCREENING_FIELD_IDS.priorCardiacEvent, value: crm.prior_cardiac_event },
    { id: SCREENING_FIELD_IDS.canTravel, value: answers.can_travel },
    { id: SCREENING_FIELD_IDS.contactConsent, value: `Agreed ${consentedAt}` },
    { id: SCREENING_FIELD_IDS.ageOver50, value: answers.age_range === "under_50" ? "No" : "Yes" },
    { id: SCREENING_FIELD_IDS.canTravelToPlantCity, value: answers.can_travel },
  ];
}

export function buildScreeningTags(answers: PreScreeningAnswers): string[] {
  const tags = [
    `lpa-age:${answers.age_range}`,
    `lpa-scan:${answers.artery_scan}`,
    `lpa-prior-event:${answers.prior_cardiac_event}`,
    ...answers.risk_factors.map((factor) => `lpa-risk:${factor}`),
  ];
  if (answers.can_travel === "No") tags.push("lpa-cannot-travel");
  return tags;
}

export function screeningAnswerLines(crm: CrmScreening): string {
  return [
    ...(Object.keys(ANSWER_LABELS) as (keyof PreScreeningAnswers)[]).map(
      (key) => `- ${ANSWER_LABELS[key]}: ${crm[key]}`,
    ),
    `- Risk factor count: ${crm.riskFactorCount}`,
  ].join("\n");
}
