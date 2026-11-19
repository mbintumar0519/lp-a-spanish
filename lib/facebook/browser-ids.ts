import { readCookie, writeCookie } from "@/lib/cookies";

const RETENTION_DAYS = 90;

export function getOrCreateFbp(): string {
  const existing = readCookie("_fbp");
  if (existing) return existing;

  const fbp = `fb.1.${Date.now()}.${Math.random().toString(36).substring(2)}`;
  writeCookie("_fbp", fbp, RETENTION_DAYS);
  return fbp;
}

export function getFbc(): string | null {
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (!fbclid) return readCookie("_fbc");

  const fbc = `fb.1.${Date.now()}.${fbclid}`;
  writeCookie("_fbc", fbc, RETENTION_DAYS);
  return fbc;
}

export function getFacebookBrowserContext() {
  return {
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
    url: window.location.href,
    userAgent: navigator.userAgent,
  };
}
