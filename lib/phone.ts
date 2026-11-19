const NON_DIGITS = /\D/g;
const NANP_NUMBER = /^[2-9]\d{2}[2-9]\d{6}$/;
const REPEATED_DIGIT = /^(\d)\1{9}$/;

export function usPhoneDigits(raw: unknown): string {
  const digits = String(raw ?? "").replace(NON_DIGITS, "");
  return digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
}

export function formatUsPhone(raw: unknown): string {
  let digits = String(raw ?? "").replace(NON_DIGITS, "");
  if (digits.startsWith("1")) digits = digits.slice(1);
  digits = digits.slice(0, 10);

  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function isValidUsPhone(raw: unknown): boolean {
  const digits = usPhoneDigits(raw);
  if (!NANP_NUMBER.test(digits)) return false;
  if (digits.slice(1, 3) === "11" || digits.slice(4, 6) === "11") return false;
  return !REPEATED_DIGIT.test(digits);
}

export function toUsE164(raw: unknown): string {
  return isValidUsPhone(raw) ? `+1${usPhoneDigits(raw)}` : "";
}

export function normalizePhoneToE164(raw: unknown): string {
  const value = String(raw ?? "").trim();
  if (!value) return "";
  if (value.startsWith("+")) return `+${value.slice(1).replace(NON_DIGITS, "")}`;

  const digits = value.replace(NON_DIGITS, "");
  if (digits.length === 10) return `+1${digits}`;
  return digits ? `+${digits}` : "";
}
