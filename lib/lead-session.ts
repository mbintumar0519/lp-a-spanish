const STORAGE_KEY = "leadData";

export type StoredLead = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zipCode: string;
};

export function saveLeadSession(lead: StoredLead) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lead));
  } catch {}
}

export function readLeadSession(): Partial<StoredLead> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<StoredLead>) : {};
  } catch {
    return {};
  }
}

export function clearLeadSession() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
}
