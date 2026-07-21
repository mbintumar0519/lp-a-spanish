export const CLICK_IDS = ['gclid', 'msclkid', 'fbclid', 'yclid', 'ttclid', 'epik', 'li_fat_id'];
export const UTMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

const COOKIE_NAME = 'lpa_attr';
const LS_KEY = 'lpa_attribution';
const COOKIE_DAYS = 90;

function readParams() {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  const out = {};
  for (const k of [...CLICK_IDS, ...UTMS]) {
    const v = p.get(k);
    if (v) out[k] = v;
  }
  return out;
}

function readStorage() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function readCookie() {
  if (typeof document === 'undefined') return {};
  try {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    if (!match) return {};
    return JSON.parse(decodeURIComponent(match.split('=')[1] || '{}')) || {};
  } catch {
    return {};
  }
}

function writeCookie(value) {
  if (typeof document === 'undefined') return;
  const exp = new Date(Date.now() + COOKIE_DAYS * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; expires=${exp}; path=/; SameSite=Lax`;
}

export function persistAttribution() {
  if (typeof window === 'undefined') return {};
  const fresh = readParams();
  const stored = { ...readCookie(), ...readStorage(), ...fresh };
  const str = JSON.stringify(stored);
  try {
    window.localStorage.setItem(LS_KEY, str);
  } catch {}
  writeCookie(str);
  return stored;
}

export function getAttribution() {
  if (typeof window === 'undefined') return {};
  return { ...readCookie(), ...readStorage(), ...readParams() };
}

export function deriveLeadSource(attr = {}) {
  if (attr.gclid) return 'Google Ads';
  if (attr.fbclid) return 'Meta';
  if (attr.msclkid) return 'Microsoft Ads';
  if (attr.utm_source) return attr.utm_source;
  return 'Direct / Unknown';
}

export function generateEventId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
