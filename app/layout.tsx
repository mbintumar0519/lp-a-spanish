import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { AccessibilityAxe } from "@/components/analytics/accessibility-axe";
import { BrowserExtensionCleanup } from "@/components/analytics/browser-extension-cleanup";
import { ClarityTracking } from "@/components/analytics/clarity-tracking";
import { FacebookPixel } from "@/components/analytics/facebook-pixel";
import { FacebookPixelScript, GoogleTagManager } from "@/components/analytics/tracking-scripts";
import { FloatingCta } from "@/components/layout/floating-cta";
import { Navbar } from "@/components/layout/navbar";
import { Ribbon } from "@/components/layout/ribbon";
import { StructuredData } from "@/components/shared/structured-data";
import "./globals.css";

const description =
  "A cardiovascular research study for people with elevated Lp(a). Compensation provided for visits and travel expenses reimbursed. Help advance heart disease prevention research.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description,
  icons: {
    icon: "/icon.png?v=2",
    shortcut: "/icon.png?v=2",
    apple: "/icon.png?v=2",
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description:
      "A cardiovascular study for people with elevated Lp(a). Compensation provided and travel expenses reimbursed.",
    url: "/",
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "A doctor and patient discussing heart health research study options.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: "Compensation provided and travel reimbursed. A study for elevated Lp(a) and cardiovascular risk.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body className="antialiased bg-white-soft text-text-main font-body scroll-smooth" suppressHydrationWarning>
        <GoogleTagManager />
        <FacebookPixelScript />
        <StructuredData />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <BrowserExtensionCleanup />
        <ClarityTracking />
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <Ribbon />
        <Navbar />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <AccessibilityAxe />
        <FloatingCta />
      </body>
    </html>
  );
}
