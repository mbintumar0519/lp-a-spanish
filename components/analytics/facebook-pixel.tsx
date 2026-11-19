"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getFbc, getOrCreateFbp } from "@/lib/facebook/browser-ids";

const createPageViewEventId = () => `pageview_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

export function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const eventId = createPageViewEventId();

    try {
      window.fbq?.(
        "track",
        "PageView",
        { page_path: pathname, page_location: window.location.href, page_title: document.title },
        { eventID: eventId },
      );
    } catch (error) {
      console.error("Meta Pixel PageView tracking error:", error);
    }

    fetch("/api/facebook/conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "PageView",
        event_id: eventId,
        eventData: { value: 0, content_name: "Page View", content_category: "navigation" },
        fbp: getOrCreateFbp(),
        fbc: getFbc(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    }).catch((error) => console.warn("Meta CAPI PageView tracking failed:", error));
  }, [pathname, searchParams]);

  return null;
}
