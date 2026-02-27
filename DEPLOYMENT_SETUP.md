# 🚨 PRODUCTION DEPLOYMENT - ENVIRONMENT VARIABLES REQUIRED

## Issue Identified

Your form is failing with error: **"Server configuration error: GOHIGHLEVEL_API_KEY missing"**

This means the production environment doesn't have the required environment variables configured.

---

## ✅ Required Action: Add Environment Variables to Your Hosting Platform

### Step 1: Get Your Environment Variables

From your `.env` file, you need to add these to production:

```env
GOHIGHLEVEL_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IlFJalUwNkVsV0xoUUtLWE9WS1pUIiwidmVyc2lvbiI6MSwiaWF0IjoxNzQyMTk2OTYxNzc1LCJzdWIiOiJ3cnpDc082QmUxdzhNVFJmcTRwTiJ9.X3COjVHC9q8RjdrGMzl-ZlBaD2aZHx8Vxt4l5JNtkQE
GOHIGHLEVEL_LOCATION_ID=QIjU06ElWLhQKKXOVKZT
GOHIGHLEVEL_CALENDAR_ID=oCJUF0iOMFKJBd4fpZS6
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=1631727624467487
FACEBOOK_ACCESS_TOKEN=EAAhsvzmE050BP4KQ6rYxRUuY9ZCbQdJb4hUnzPYj1ueSfm4oJAZCnfZAAeG0xySJFwujnAH3ufYjB3QgXc2NEVzBtcX0AAQmETgFkJTTFx9vKoZBbGT6216at1h5nzTkk9l3wTWYhHYyjEYn2PIZA3BLSiNCZClxeMvcE0W3bjKDvm6xXf7qyD1LvC2bF3e72GIgZDZD
IP_GEOLOCATION_API_KEY=1520a61db5f446ba9bdc8aff91875d4e
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbx6jIp1QLxXBconBXBjGHlRDS1lapkPxCDL6Na2FaCo8h64VbhJ0MDOhFLLuKUSbsShzQ/exec
SITE_URL=https://lpaespanol.denali-health.com
```

---

## Step 2: Add to Your Hosting Platform

### If Using **Netlify**:

1. Go to https://app.netlify.com
2. Select your site: **lpaespanol.denali-health.com**
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable** for each one above
5. Add all 8 environment variables
6. Click **Save**
7. Go to **Deploys** → Click **Trigger deploy** → **Deploy site**

#### Quick Netlify CLI Method:
```bash
netlify env:set GOHIGHLEVEL_API_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IlFJalUwNkVsV0xoUUtLWE9WS1pUIiwidmVyc2lvbiI6MSwiaWF0IjoxNzQyMTk2OTYxNzc1LCJzdWIiOiJ3cnpDc082QmUxdzhNVFJmcTRwTiJ9.X3COjVHC9q8RjdrGMzl-ZlBaD2aZHx8Vxt4l5JNtkQE"
netlify env:set GOHIGHLEVEL_LOCATION_ID "QIjU06ElWLhQKKXOVKZT"
netlify env:set GOHIGHLEVEL_CALENDAR_ID "oCJUF0iOMFKJBd4fpZS6"
netlify env:set NEXT_PUBLIC_FACEBOOK_PIXEL_ID "1631727624467487"
netlify env:set FACEBOOK_ACCESS_TOKEN "EAAhsvzmE050BP4KQ6rYxRUuY9ZCbQdJb4hUnzPYj1ueSfm4oJAZCnfZAAeG0xySJFwujnAH3ufYjB3QgXc2NEVzBtcX0AAQmETgFkJTTFx9vKoZBbGT6216at1h5nzTkk9l3wTWYhHYyjEYn2PIZA3BLSiNCZClxeMvcE0W3bjKDvm6xXf7qyD1LvC2bF3e72GIgZDZD"
netlify env:set IP_GEOLOCATION_API_KEY "1520a61db5f446ba9bdc8aff91875d4e"
netlify env:set GOOGLE_SHEETS_WEBHOOK_URL "https://script.google.com/macros/s/AKfycbx6jIp1QLxXBconBXBjGHlRDS1lapkPxCDL6Na2FaCo8h64VbhJ0MDOhFLLuKUSbsShzQ/exec"
netlify env:set SITE_URL "https://lpaespanol.denali-health.com"
```

---

### If Using **Vercel**:

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Key: `GOHIGHLEVEL_API_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IlFJalUwNkVsV0xoUUtLWE9WS1pUIiwidmVyc2lvbiI6MSwiaWF0IjoxNzQyMTk2OTYxNzc1LCJzdWIiOiJ3cnpDc082QmUxdzhNVFJmcTRwTiJ9.X3COjVHC9q8RjdrGMzl-ZlBaD2aZHx8Vxt4l5JNtkQE`
   - Environment: **Production**, **Preview**, **Development** (check all 3)
5. Repeat for all 8 variables
6. Go to **Deployments** tab
7. Click **...** on latest deployment → **Redeploy**

#### Quick Vercel CLI Method:
```bash
vercel env add GOHIGHLEVEL_API_KEY production
# Then paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IlFJalUwNkVsV0xoUUtLWE9WS1pUIiwidmVyc2lvbiI6MSwiaWF0IjoxNzQyMTk2OTYxNzc1LCJzdWIiOiJ3cnpDc082QmUxdzhNVFJmcTRwTiJ9.X3COjVHC9q8RjdrGMzl-ZlBaD2aZHx8Vxt4l5JNtkQE

# Repeat for each variable, then redeploy:
vercel --prod
```

---

## Step 3: Verify the Fix

After adding environment variables and redeploying:

### Test 1: API Endpoint
```bash
curl -X POST https://lpaespanol.denali-health.com/api/submit-lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","phone":"8135551234","email":"test@example.com","source":"pre-screening-form","answers":{"high_lpa":"yes","heart_risk_factors":"yes","can_travel":"yes"}}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Qualified lead created successfully",
  "contactId": "...",
  "tagsApplied": ["website-lead", "Lp(a)", "qualified"]
}
```

### Test 2: Submit Form on Website
1. Go to https://lpaespanol.denali-health.com
2. Fill out the form with test data
3. Click "Programe Su Cita Hoy!"
4. Should redirect to `/thank-you` page
5. Check GoHighLevel for the new contact

---

## Troubleshooting

### Still Getting "Server configuration error"?
- ✅ Check all environment variables are added
- ✅ Verify no typos in variable names (case-sensitive)
- ✅ Make sure you triggered a new deployment
- ✅ Clear your browser cache
- ✅ Check hosting platform build logs for errors

### "Algo salió mal" Error?
This generic error can be caused by:
1. **Missing environment variables** (most common - see above)
2. **Network issues** - Check your internet connection
3. **GoHighLevel API issues** - Verify API key is still valid
4. **Facebook Pixel errors** - Check FACEBOOK_ACCESS_TOKEN

### Check Build Logs:
- **Netlify**: Site → Deploys → Click on latest deploy → View logs
- **Vercel**: Project → Deployments → Click on deployment → View logs

Look for error messages like:
- ❌ "GOHIGHLEVEL_API_KEY missing"
- ❌ "Cannot read environment variable"
- ❌ "API request failed"

---

## Environment Variables Checklist

Before deploying, ensure ALL these are set in production:

- [ ] `GOHIGHLEVEL_API_KEY` (Required for form submission)
- [ ] `GOHIGHLEVEL_LOCATION_ID` (Required for form submission)
- [ ] `GOHIGHLEVEL_CALENDAR_ID` (Required for booking links)
- [ ] `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` (Required for Facebook tracking)
- [ ] `FACEBOOK_ACCESS_TOKEN` (Required for Facebook Conversions API)
- [ ] `IP_GEOLOCATION_API_KEY` (Required for location tracking)
- [ ] `GOOGLE_SHEETS_WEBHOOK_URL` (Optional - for backup)
- [ ] `SITE_URL` (Optional - for redirects)

---

## Quick Fix Summary

**What's Wrong:** Production site is missing environment variables

**How to Fix:**
1. Go to your hosting dashboard (Netlify/Vercel)
2. Add all 8 environment variables from your `.env` file
3. Trigger a new deployment
4. Test the form again

**Expected Time:** 5-10 minutes

---

## After Deployment

Once environment variables are added and the site is redeployed:

✅ Form submissions will create contacts in GoHighLevel  
✅ Leads will be tagged with `website-lead`, `Lp(a)`, `qualified`  
✅ Facebook Pixel will track conversions  
✅ Google Sheets will receive backup data  
✅ Users will be redirected to thank-you page  

---

**Need Help?** Check your hosting platform's documentation:
- Netlify: https://docs.netlify.com/environment-variables/overview/
- Vercel: https://vercel.com/docs/environment-variables
