"use client";

import { useEffect, useState, type RefObject } from "react";

const URL_POLL_INTERVAL_MS = 2000;

const MESSAGE_PATTERNS = [
  "booking_success",
  "appointment_booked",
  "calendar_booked",
  "meeting_scheduled",
  "booking success",
  "appointment scheduled",
  "event_scheduled",
  "confirmed",
  "thank you",
  "thanks",
  "booked",
  "scheduled",
  "complete",
  "success",
  "appointment_confirmed",
  "meeting_confirmed",
  "leadconnector",
  "ghl",
  "calendar_event",
  "slot_booked",
  "appointment_created",
  "booking_confirmed",
];

const URL_PATTERNS = [
  "success",
  "confirmation",
  "booked",
  "scheduled",
  "thank",
  "complete",
  "confirmed",
  "appointment",
  "meeting",
  "booking",
];

const CONTENT_PATTERNS = [
  "thank you",
  "thanks",
  "booked",
  "scheduled",
  "confirmed",
  "appointment confirmed",
  "meeting scheduled",
  "success",
  "we will be in touch",
  "appointment has been scheduled",
];

const containsAny = (value: string, patterns: string[]) => {
  const normalized = value.toLowerCase();
  return patterns.some((pattern) => normalized.includes(pattern));
};

function serializeMessage(data: unknown): string {
  if (typeof data === "string") return data;
  if (Array.isArray(data)) return data.join(" ");
  if (data && typeof data === "object") return JSON.stringify(data);
  return "";
}

function markBookingCompleted() {
  const url = new URL(window.location.href);
  url.searchParams.set("funnel_step", "4");
  url.searchParams.set("event_id", `booking_${Date.now()}_${Math.random().toString(36).substring(2)}`);
  url.searchParams.set("timestamp", Date.now().toString());
  url.searchParams.set("interaction_completed", "true");
  window.history.pushState({}, "", url);
}

function readIframeDocument(iframe: HTMLIFrameElement): Document | null {
  try {
    return iframe.contentDocument ?? iframe.contentWindow?.document ?? null;
  } catch {
    return null;
  }
}

function readIframeUrl(iframe: HTMLIFrameElement): string {
  try {
    return iframe.contentWindow?.location.href ?? "";
  } catch {
    return "";
  }
}

export function useBookingDetection(iframeRef: RefObject<HTMLIFrameElement | null>) {
  const [isBooked, setIsBooked] = useState(
    () =>
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("interaction_completed") === "true",
  );

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || isBooked) return;

    const detect = () => {
      setIsBooked(true);
      markBookingCompleted();
    };

    const handleMessage = (event: MessageEvent) => {
      if (containsAny(serializeMessage(event.data), MESSAGE_PATTERNS)) detect();
    };

    const urlInterval = window.setInterval(() => {
      if (containsAny(readIframeUrl(iframe), URL_PATTERNS)) detect();
    }, URL_POLL_INTERVAL_MS);

    const observer = new MutationObserver(() => {
      const body = readIframeDocument(iframe)?.body;
      if (body && containsAny(body.innerText, CONTENT_PATTERNS)) detect();
    });
    const iframeBody = readIframeDocument(iframe)?.body;
    if (iframeBody) observer.observe(iframeBody, { childList: true, subtree: true });

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.clearInterval(urlInterval);
      observer.disconnect();
    };
  }, [iframeRef, isBooked]);

  return isBooked;
}
