# GoHighLevel Custom Fields Setup for Lp(a) Study — Spanish Landing Page

## Overview

This guide explains how to set up GoHighLevel custom fields for the Lp(a) Cardiovascular Study Spanish landing page. Custom fields allow us to capture study-specific qualification data (e.g., high Lp(a) status, age, travel ability) and attribution data (UTM parameters, click IDs) directly on the contact record in GoHighLevel.

## Why Custom Fields?

The Lp(a) study pre-screening form collects:
- **high_lpa**: Whether the user has been told they have high Lp(a) levels
- **age_50_plus**: Whether the user is 50 years of age or older
- **heart_risk_factors**: Whether the user is taking cholesterol medication
- **can_travel**: Whether the user can travel to Plant City, FL for study visits

Additionally, we capture marketing attribution data:
- **google_click_id** (gclid)
- **fbclid**
- **msclkid**
- **utm_source**, **utm_medium**, **utm_campaign**, **utm_content**, **utm_term**
- **lead_source**
- **event_id**

By storing these in GHL custom fields, your team can:
- Filter contacts by qualification criteria
- Segment audiences by traffic source
- Measure campaign performance inside GHL
- Trigger workflows based on specific answers

---

## Step 1: Create Custom Fields in GoHighLevel

1. **Go to**: GoHighLevel Dashboard -> **Settings** -> **Custom Fields**
2. **Click**: **Add Field** for each field below

### Study-Specific Fields

| Field Name | API Key / Field Key | Type | Description |
|------------|---------------------|------|-------------|
| High Lp(a) | `high_lpa` | Text | Has elevated Lp(a) levels (Yes/No) |
| Age 50+ | `age_50_plus` | Text | Age 50 or older (Yes/No) |
| Heart Risk Factors | `heart_risk_factors` | Text | Taking cholesterol medication (Yes/No) |
| Can Travel | `can_travel` | Text | Can travel to Plant City, FL (Yes/No) |
| Study Name | `study_name` | Text | Name of the clinical study |
| Qualification Status | `qualification_status` | Text | Current qualification review status |

### Attribution / Tracking Fields

| Field Name | API Key / Field Key | Type | Description |
|------------|---------------------|------|-------------|
| Google Click ID | `google_click_id` | Text | gclid from Google Ads |
| FBCLID | `fbclid` | Text | fbclid from Meta/Facebook |
| MSCLKID | `msclkid` | Text | msclkid from Microsoft Ads |
| UTM Source | `utm_source` | Text | Traffic source |
| UTM Medium | `utm_medium` | Text | Traffic medium |
| UTM Campaign | `utm_campaign` | Text | Campaign name |
| UTM Content | `utm_content` | Text | Ad content identifier |
| UTM Term | `utm_term` | Text | Keyword / search term |
| Lead Source | `lead_source` | Text | Derived lead source |
| Event ID | `event_id` | Text | Meta CAPI deduplication event ID |

> **Important**: The **API Key / Field Key** must match exactly (case-sensitive). The code in `app/api/submit-lead/route.js` maps internal names to these keys via `GHL_FIELD_KEY_MAP`.

---

## Step 2: Verify the API Route

The custom fields logic lives in:

```
app/api/submit-lead/route.js
```

### How It Works

1. **Contact Creation (Step 1)**
   - POST `/v1/contacts/` with standard fields only (firstName, lastName, email, phone, tags, source, city, state, etc.)
   - GHL v1 silently ignores embedded `customFields` arrays on create, so we do NOT send them here.

2. **Custom Field Update (Step 2)**
   - PUT `/v1/contacts/{id}` with `customField: { key: value, ... }` (object format)
   - This is the correct v1 API shape.

3. **Fallback (Step 3)**
   - If the batch update fails, the code falls back to individual PUT `/v1/contacts/{id}/custom-field` requests using field UUIDs fetched from `/v1/custom-fields/`.

### Field Mapping Code

```javascript
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
```

If you rename a custom field in GHL, update the corresponding value in this map.

---

## Step 3: Test the Integration

### Option A: Submit a Real Form
1. Fill out the pre-screening form on the Spanish site.
2. Go to GoHighLevel -> Contacts -> find the new contact.
3. Open the contact and check the **Custom Fields** tab.
4. Verify:
   - `high_lpa` shows "Yes" or "No"
   - `age_50_plus` shows "Yes" or "No"
   - `heart_risk_factors` shows "Yes" or "No"
   - `can_travel` shows "Yes" or "No"
   - `study_name` shows "Lp(a) Cardiovascular Research - Spanish"
   - `qualification_status` shows "Pending Review"
   - Attribution fields are populated (if UTM params or click IDs were present)

### Option B: Run the Local Test Script

Create a test file `test-ghl-custom-fields.mjs` (optional):

```javascript
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const apiKey = process.env.GOHIGHLEVEL_API_KEY;

async function getCustomFields() {
  const res = await fetch('https://rest.gohighlevel.com/v1/custom-fields/', {
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  console.log('Custom fields:', JSON.stringify(data, null, 2));
}

getCustomFields();
```

Run:

```bash
node test-ghl-custom-fields.mjs
```

This lists all custom fields in your GHL location so you can confirm the keys exist.

---

## Step 4: Build Workflows Using Custom Fields

Now that the fields exist, you can create GHL workflows:

### Example 1: Auto-Tag by Lp(a) Status
- **Trigger**: Contact Created
- **Filter**: `custom_fields.high_lpa` equals "Yes"
- **Action**: Add Tag "High Lp(a) Confirmed"

### Example 2: Route by Travel Ability
- **Trigger**: Contact Created
- **Filter**: `custom_fields.can_travel` equals "No"
- **Action**: Send SMS offering telehealth or transportation assistance

### Example 3: Source-Based Follow-Up
- **Trigger**: Contact Created
- **Filter**: `custom_fields.utm_source` equals "google"
- **Action**: Add Tag "Google Ads Lead" and send specific email sequence

### Example 4: Spanish Language Follow-Up
- **Trigger**: Contact Created
- **Filter**: `contact.tags` contains "lp-a-spanish"
- **Action**: Add Tag "Spanish Speaker" and assign to Spanish-speaking team member

---

## Troubleshooting

### Custom Fields Not Appearing on Contact
1. **Check Field Keys**: Ensure the GHL custom field key exactly matches the value in `GHL_FIELD_KEY_MAP`.
2. **Check API Key**: Make sure `GOHIGHLEVEL_API_KEY` is the v1 Location API key (JWT starting with `eyJ`).
3. **Check Logs**: Look at server logs for `[GHL CUSTOM FIELDS UPDATE]` messages.
4. **Verify v1 Shape**: The code uses `customField` as an **object** `{ key: value }`, not an array. This is the correct v1 format.

### "No GHL field ID found for key" in Fallback Logs
- This means the field key doesn't exist in GHL yet.
- Go back to **Step 1** and create the missing custom field.
- Wait a minute for GHL to propagate the field, then retry.

### Batch Update Failed, But Individual Updates Work
- This is normal fallback behavior.
- The code automatically tries individual UUID-based updates if the batch PUT fails.
- As long as the contact has the custom fields, the system is working.

---

## Environment Variables

Make sure these are set in your `.env.local` or deployment platform:

```bash
GOHIGHLEVEL_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GOHIGHLEVEL_LOCATION_ID=your_location_id
GOHIGHLEVEL_CALENDAR_ID=your_calendar_id
```

See `.env.example` in the project root for the full list.

---

## Security Notes

- **Never commit `.env.local`** to git. It's already in `.gitignore`.
- **Rotate keys** regularly if they might have been exposed.
- **Use v1 Location API key** only — it has limited scope compared to Agency keys.
- Custom field values are stored as **Text** in GHL. Booleans are sent as "Yes" / "No" strings.

---

## Summary Checklist

- [ ] Created all study-specific custom fields in GHL (`high_lpa`, `age_50_plus`, `heart_risk_factors`, `can_travel`, `study_name`, `qualification_status`)
- [ ] Created all attribution custom fields in GHL (`google_click_id`, `fbclid`, `msclkid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `lead_source`, `event_id`)
- [ ] Verified API keys match `GHL_FIELD_KEY_MAP` in `app/api/submit-lead/route.js`
- [ ] Submitted a test form and confirmed custom fields appear on the contact record
- [ ] Built at least one workflow using a custom field
- [ ] Verified `.env.local` is not committed to git

---

*Last Updated: June 2026*
