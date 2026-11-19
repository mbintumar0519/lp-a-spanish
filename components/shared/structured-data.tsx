import { siteConfig } from "@/config/site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.country,
      },
      telephone: siteConfig.phone.schema,
    },
    {
      "@type": "MedicalWebPage",
      "@id": siteConfig.url,
      url: siteConfig.url,
      name: siteConfig.title,
      description:
        "A cardiovascular research study for people with elevated Lp(a). Compensation provided and travel expenses reimbursed.",
      publisher: { "@type": "Organization", name: siteConfig.name },
      inLanguage: "en-US",
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
    />
  );
}
