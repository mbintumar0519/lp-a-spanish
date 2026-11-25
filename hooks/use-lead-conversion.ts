"use client";

import { useEffect } from "react";
import { getFacebookBrowserContext } from "@/lib/facebook/browser-ids";
import { clearLeadSession, readLeadSession } from "@/lib/lead-session";

const TEST_LEAD_DOMAIN = "@denali-example.com";

const createLeadEventId = () => `lead-${Date.now()}-${Math.random().toString(36).substring(2)}`;

export function useLeadConversion() {
  useEffect(() => {
    const eventId = createLeadEventId();
    const lead = readLeadSession();

    if (process.env.NODE_ENV !== "production" && lead.email?.endsWith(TEST_LEAD_DOMAIN)) return;

    window.fbq?.(
      "track",
      "Lead",
      { content_name: "Lp(a) Study Lead", content_category: "clinical_trial", value: 100, currency: "USD" },
      { eventID: eventId },
    );

    fetch("/api/facebook/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId,
        email: lead.email ?? "",
        phone: lead.phone ?? "",
        firstName: lead.firstName ?? "",
        lastName: lead.lastName ?? "",
        city: lead.city ?? "",
        state: lead.state ?? "",
        zipCode: lead.zipCode ?? "",
        ...getFacebookBrowserContext(),
      }),
    })
      .then(clearLeadSession)
      .catch((error) => console.error("Server-side Lead tracking failed:", error));
  }, []);
}
