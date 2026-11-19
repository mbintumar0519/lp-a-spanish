export const siteConfig = {
  url: process.env.SITE_URL || "https://amariuc.netlify.app",
  name: "Plant City Heart Health Research",
  title: "Lp(a) Heart Health Research Study | Plant City, FL",
  phone: {
    href: "tel:+18137966716",
    display: "+1(813) 796-6716",
    schema: "+1-813-796-6716",
  },
  address: {
    street: "1601 W Reynolds St STE 203",
    city: "Plant City",
    region: "FL",
    postalCode: "33563",
    country: "US",
  },
  gtmId: "GTM-PWC5KMWV",
  referralUrl: "https://denali-forms.netlify.app/referral.html",
  crio: {
    formId: "14681",
    impressionUrl: "https://app.clinicalresearch.io/web-form-impression?id=14681",
    saveUrl: "https://app.clinicalresearch.io/web-form-save",
    stylesheetUrl: "https://app.clinicalresearch.io/css/web-form.css",
    scriptUrl: "https://app.clinicalresearch.io/js/web-form.js",
  },
} as const;

export const HERO_FORM_ID = "hero-form";
