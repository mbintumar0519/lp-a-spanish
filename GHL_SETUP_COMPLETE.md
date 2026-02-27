# GoHighLevel Integration - Quick Start Guide

## ✅ Setup Complete!

Your GoHighLevel integration has been successfully configured and tested. All form submissions will now automatically create leads in your GoHighLevel CRM.

---

## 🎯 What Was Done

### 1. Environment Configuration
- ✅ Created `.env` file with your GoHighLevel API credentials
- ✅ Set API Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- ✅ Set Location ID: `QIjU06ElWLhQKKXOVKZT`
- ✅ Updated `.env.example` for future reference

### 2. Integration Testing
- ✅ Created test script: `test-ghl-connection.js`
- ✅ Tested API connection - **WORKING**
- ✅ Tested contact creation - **WORKING**
- ✅ Tested note attachment - **WORKING**

### 3. Form Integration
- ✅ Form already connected to GoHighLevel API
- ✅ All CTAs on landing page submit to GHL
- ✅ Automatic tagging: `website-lead`, `Lp(a)`, `qualified`, `lp-a-spanish`
- ✅ Location tracking via IP geolocation
- ✅ Google Sheets backup (parallel, non-blocking)
- ✅ CRIO integration (parallel, non-blocking)

---

## 🧪 Testing Commands

### Test #1: API Connection
```bash
npm run ghl:test
```
Tests basic GoHighLevel API connectivity and creates a test contact.

**Expected Output:**
```
✅ Contact created successfully!
✅ Note added successfully!
🎉 Your GoHighLevel integration is working correctly!
```

### Test #2: Form Submission (Optional)
```bash
# First, start the dev server in another terminal
npm run dev

# Then run the form test
npm run ghl:test-form
```
Simulates a real form submission from your landing page.

---

## 📋 How It Works

### When a User Submits the Form:

1. **User fills out the pre-screening form** on your landing page
2. **Form submits to** `/api/submit-lead`
3. **API creates contact in GoHighLevel** with:
   - Name (properly capitalized)
   - Phone (E.164 format: +1...)
   - Email (lowercase, trimmed)
   - Location (city, state, postal code from IP)
   - Tags: `website-lead`, `Lp(a)`, `qualified`, `lp-a-spanish`
   - Source: "Pre-Screening Form - Spanish Website"

4. **Two notes are added to the contact:**
   - Qualification Status
   - Full Assessment with all answers

5. **Parallel backups** (non-blocking):
   - Google Sheets
   - CRIO integration

6. **User sees success message** and gets booking link

---

## 🎯 Components Connected to GoHighLevel

All these components submit leads to your GHL account:

| Component | Location | Button Text |
|-----------|----------|-------------|
| PreScreenForm | Main form | "Programe Su Cita Hoy!" |
| HeroSection | Top of page | "Programe Su Cita Hoy!" |
| AboutSection | About section | "Programe Su Cita Hoy!" |
| BenefitsSection | Benefits | "Programe Su Cita Hoy!" |
| FAQSection | FAQ section | "Programe Su Cita Hoy!" |
| FloatingCTA | Bottom sticky bar | "Programe Su Cita Hoy!" |

---

## 📊 Lead Data Structure

### What Gets Sent to GoHighLevel:

```javascript
{
  firstName: "Carlos",
  lastName: "Rodríguez",
  email: "carlos@example.com",
  phone: "+15551234567",
  city: "Plant City",
  state: "FL",
  postalCode: "33563",
  country: "US",
  source: "Pre-Screening Form - Website",
  tags: ["website-lead", "Lp(a)", "qualified", "lp-a-spanish"],
  companyName: "Lp(a) - Website Lead"
}
```

### Notes Attached:

**Note 1 - Qualification Status:**
```
=== QUALIFICATION STATUS ===
Status: PENDING REVIEW
Study: Lp(a) Cardiovascular Research
Location: Plant City, FL
```

**Note 2 - Full Assessment:**
```
=== LP(A) CARDIOVASCULAR STUDY FULL ASSESSMENT ===
=== PATIENT INFO ===
Name: Carlos Rodríguez
Age: 45
Location: Plant City, FL, 33563, US

=== ALL QUESTION RESPONSES ===
- Has elevated Lp(a) levels: Yes
- Has cardiovascular risk factors: Yes
- Can travel to Plant City, FL for study visits: Yes
```

---

## 🔍 Viewing Leads in GoHighLevel

1. Log into your GoHighLevel account
2. Go to **Contacts**
3. Filter by tags: `website-lead`, `Lp(a)`, `qualified`, or `lp-a-spanish`
4. Each lead will have:
   - Complete contact information
   - Geographic location
   - Two detailed notes
   - Proper tags for segmentation

---

## 🚀 Going to Production

### Everything is ready! No additional steps needed.

Your landing page is configured to:
- ✅ Capture leads from the Spanish form
- ✅ Send to GoHighLevel automatically
- ✅ Tag and organize leads properly
- ✅ Backup to Google Sheets
- ✅ Integrate with CRIO

### Environment Variables Required:

Make sure these are set in production (Netlify/Vercel):

```env
GOHIGHLEVEL_API_KEY=your_api_key
GOHIGHLEVEL_LOCATION_ID=QIjU06ElWLhQKKXOVKZT
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=1631727624467487
FACEBOOK_ACCESS_TOKEN=your_facebook_token
IP_GEOLOCATION_API_KEY=1520a61db5f446ba9bdc8aff91875d4e
GOOGLE_SHEETS_WEBHOOK_URL=your_webhook_url
```

---

## 🛠️ Troubleshooting

### Leads not showing up in GoHighLevel?

1. **Run the test**: `npm run ghl:test`
2. **Check API key**: Verify in `.env` file
3. **Check Location ID**: Should be `QIjU06ElWLhQKKXOVKZT`
4. **Check GHL dashboard**: Look for test leads

### Common Error Messages:

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid API key | Check GOHIGHLEVEL_API_KEY in .env |
| 403 Forbidden | Missing permissions | Verify API key has contact permissions |
| 404 Not Found | Wrong Location ID | Verify GOHIGHLEVEL_LOCATION_ID |
| Network Error | Connection issue | Check internet or GHL status |

### Development Mode:

In development, the form will work even if GHL integration fails. This allows you to develop and test without breaking the form experience.

---

## 📚 Documentation

- **Full Integration Guide**: See `GOHIGHLEVEL_INTEGRATION.md`
- **API Route Code**: `/app/api/submit-lead/route.js`
- **Form Component**: `/app/components/PreScreenForm.jsx`
- **Test Scripts**: 
  - `test-ghl-connection.js` - API connection test
  - `test-form-submission.js` - Form submission test

---

## ✨ Next Steps

1. ✅ **Test the integration** - Run `npm run ghl:test`
2. ✅ **Submit a test lead** - Use the form on your site
3. ✅ **Check GoHighLevel** - Verify the lead appears
4. 🎯 **Set up GHL workflows** - Configure lead nurturing
5. 🎯 **Monitor conversions** - Track form submissions
6. 🎯 **Optimize** - Review and improve based on data

---

## 🎉 You're All Set!

Your Spanish landing page is now fully integrated with GoHighLevel. Every form submission will automatically create a lead with proper tags, notes, and location data.

**Need help?** Check the troubleshooting section or review the full documentation in `GOHIGHLEVEL_INTEGRATION.md`.

---

**Status**: ✅ PRODUCTION READY

Last Updated: February 26, 2026
