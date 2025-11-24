import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Ribbon from "./components/Ribbon";
import Script from 'next/script';
import Image from 'next/image';
import { Suspense } from 'react';
import BrowserExtensionCleanup from './components/BrowserExtensionCleanup';
import ClarityTracking from './components/ClarityTracking';
import FacebookPixel from './components/FacebookPixel';
import MetaProvider from './components/MetaProvider';
import AccessibilityAxe from './components/AccessibilityAxe';

const SITE_URL = process.env.SITE_URL || 'https://amariuc.netlify.app';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "lp(a) Heart Health Research Study | Plant City, FL",
  description: "A cardiovascular research study for people with elevated lp(a). Compensation provided for visits and travel expenses reimbursed. Help advance heart disease prevention research.",
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png'
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "lp(a) Heart Health Research Study | Plant City, FL",
    description: "A cardiovascular study for people with elevated lp(a). Compensation provided and travel expenses reimbursed.",
    url: '/',
    siteName: 'Plant City Heart Health Research',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'A doctor and patient discussing heart health research study options.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "lp(a) Heart Health Research Study | Plant City, FL",
    description: "Compensation provided and travel reimbursed. A study for elevated lp(a) and cardiovascular risk.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "lp(a) Heart Health Research Study | Plant City, FL",
    "description": "A cardiovascular research study for people with elevated lp(a). Compensation provided and travel expenses reimbursed.",
    "url": SITE_URL,
    "publisher": {
      "@type": "Organization",
      "name": "Plant City Heart Health Research",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preload" as="image" href="/hero.png" fetchPriority="high" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(
              function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              }
            )(window,document,'script','dataLayer','GTM-MXW78KVC');`
          }}
        />
        <link rel="icon" href="/icon.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/icon.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png?v=2" />
        <link
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        
        {/* Facebook Pixel */}
        {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
                `
              }}
            />
          </>
        )}
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "Plant City Heart Health Research",
                  "url": SITE_URL,
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "1601 W Reynolds St STE 203",
                    "addressLocality": "Plant City",
                    "addressRegion": "FL",
                    "postalCode": "33563",
                    "addressCountry": "US"
                  },
                  "telephone": "+1-813-796-6716"
                },
                {
                  "@type": "MedicalWebPage",
                  "@id": SITE_URL,
                  "url": SITE_URL,
                  "name": "lp(a) Heart Health Research Study | Plant City, FL",
                  "description": "A cardiovascular research study for people with elevated lp(a). Compensation provided and travel expenses reimbursed.",
                  "publisher": {
                    "@type": "Organization",
                    "name": "Plant City Heart Health Research"
                  },
                  "inLanguage": "en-US"
                }
              ]
            }),
          }}
        />
      </head>
      <body className="antialiased bg-white-soft text-text-main font-body scroll-smooth" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MXW78KVC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <a href="#main" className="skip-link">Skip to main content</a>
        <BrowserExtensionCleanup />
        <ClarityTracking />
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <MetaProvider>
          <Ribbon />
          <Navbar />
          <main id="main" tabIndex="-1">
            {children}
          </main>
        </MetaProvider>
        <AccessibilityAxe />
      </body>
    </html>
  );
}
