# Lp(a) Heart Health Study — Spanish Landing Page

Spanish-language recruitment landing page for the Lp(a) cardiovascular research study in Plant City, FL.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS 4
- React Hook Form + Zod (shared client/server validation)
- Integrations: GoHighLevel CRM, CRIO, Google Sheets, Meta Pixel + Conversions API, GTM, Microsoft Clarity

## Getting started

```bash
npm install
npm run dev
```

| Script              | Purpose                    |
| ------------------- | -------------------------- |
| `npm run dev`       | Start the dev server       |
| `npm run build`     | Production build           |
| `npm run start`     | Serve the production build |
| `npm run lint`      | ESLint                     |
| `npm run typecheck` | TypeScript type check      |

## Project structure

```
app/                     Routes, layouts and API route handlers
  api/                   submit-lead, facebook/*, get-location, gohighlevel/*, leads
components/
  analytics/             Pixel, GTM, Clarity and dev-only tooling
  forms/pre-screening/   Pre-screening form, questions and submit service
  layout/                navbar, sidebar-menu, footer, ribbon, floating-cta
  sections/              Home page sections
  shared/                Components reused across pages
  ui/                    Primitive UI building blocks
config/                  Site-wide constants
hooks/                   Client hooks
lib/
  validations/           Zod schemas shared by the client and API routes
  integrations/          GoHighLevel, CRIO, Google Sheets clients
  facebook/              Conversions API + browser id helpers
types/                   Global and third-party type declarations
```

## Environment variables

See `.env.example` for the full list.

| Variable                                         | Description                                       |
| ------------------------------------------------ | ------------------------------------------------- |
| `SITE_URL`                                       | Canonical site URL (sitemap, robots, metadata)    |
| `GOHIGHLEVEL_API_KEY` / `GOHIGHLEVEL_LOCATION_ID` | GoHighLevel private integration token + location |
| `GOHIGHLEVEL_CALENDAR_ID`                        | Calendar used for booking links                   |
| `NEXT_PUBLIC_GOHIGHLEVEL_CALENDAR_ID`            | Calendar embedded on `/schedule`                  |
| `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`                  | Meta Pixel id                                     |
| `FACEBOOK_ACCESS_TOKEN`                          | Meta Conversions API token                        |
| `FACEBOOK_TEST_EVENT_CODE`                       | Optional Meta test event code                     |
| `IP_GEOLOCATION_API_KEY` / `IPINFO_TOKEN`        | IP geolocation providers                          |
| `GOOGLE_SHEETS_WEBHOOK_URL`                      | Google Apps Script webhook for lead backup        |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID`                 | Microsoft Clarity project                         |
| `LEADS_API_TOKEN`                                | Bearer token for `POST /api/leads`                |
