import { readCookie, writeCookie } from "@/lib/cookies";

const CLICK_IDS = ["gclid", "msclkid", "fbclid", "yclid", "ttclid", "epik", "li_fat_id"] as const;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const TRACKED_KEYS = [...CLICK_IDS, ...UTM_KEYS];

const COOKIE_NAME = "lpa_attr";
const STORAGE_KEY = "lpa_attribution";
const RETENTION_DAYS = 90;

type TrackedKey = (typeof TRACKED_KEYS)[number];
export type Attribution = Partial<Record<TrackedKey, string>>;

const isBrowser = () => typeof window !== "undefined";

function parseJson(raw: string | null): Attribution {
  if (!raw) return {};
  try {
    return (JSON.parse(raw) as Attribution) ?? {};
  } catch {
    return {};
  }
}

function readQueryParams(): Attribution {
  const params = new URLSearchParams(window.location.search);
  return TRACKED_KEYS.reduce<Attribution>((acc, key) => {
    const value = params.get(key);
    if (value) acc[key] = value;
    return acc;
  }, {});
}

function readStorage(): Attribution {
  try {
    return parseJson(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return {};
  }
}

function readAttributionCookie(): Attribution {
  const raw = readCookie(COOKIE_NAME);
  return raw ? parseJson(decodeURIComponent(raw)) : {};
}

export function getAttribution(): Attribution {
  if (!isBrowser()) return {};
  return { ...readAttributionCookie(), ...readStorage(), ...readQueryParams() };
}

export function persistAttribution(): Attribution {
  if (!isBrowser()) return {};
  const attribution = getAttribution();
  const serialized = JSON.stringify(attribution);

  try {
    window.localStorage.setItem(STORAGE_KEY, serialized);
  } catch {}

  writeCookie(COOKIE_NAME, encodeURIComponent(serialized), RETENTION_DAYS);
  return attribution;
}

export function deriveLeadSource(attribution: Attribution): string {
  if (attribution.gclid) return "Google Ads";
  if (attribution.fbclid) return "Meta";
  if (attribution.msclkid) return "Microsoft Ads";
  return attribution.utm_source ?? "Direct / Unknown";
}

export function generateEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
