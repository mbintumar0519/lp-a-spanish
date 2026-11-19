import "server-only";

type SheetLead = {
  name: string;
  phone: string;
  email: string;
  status?: string;
};

type SheetResponse = { success?: boolean; ok?: boolean; message?: string; sheet?: string };

export type SheetResult = { success: boolean; message: string };

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" });

export async function sendToGoogleSheets(lead: SheetLead, sheetName?: string): Promise<SheetResult> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return { success: false, message: "Google Sheets webhook URL not configured" };

  const payload = {
    Name: lead.name,
    Number: lead.phone,
    Email: lead.email,
    "Date Initiated": formatDate(new Date()),
    Status: lead.status ?? "New Lead",
    ...(sheetName ? { SheetName: sheetName } : {}),
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await response.text();

  let result: SheetResponse;
  try {
    result = JSON.parse(text) as SheetResponse;
  } catch {
    throw new Error(`Invalid JSON response: ${text.slice(0, 100)}`);
  }

  const success = result.success === true || result.ok === true;
  const message = result.message ?? `Lead added to sheet: ${result.sheet ?? "Default"}`;
  if (!success) throw new Error(message);

  return { success, message };
}
