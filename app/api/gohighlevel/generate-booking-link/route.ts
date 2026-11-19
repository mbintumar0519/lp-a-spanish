import { NextResponse } from "next/server";
import { z } from "zod";
import { parseJsonBody } from "@/lib/request";

const bookingLinkSchema = z.object({
  firstName: z.string().trim().max(100).optional(),
  lastName: z.string().trim().max(100).optional(),
  email: z.email().trim().optional(),
  phone: z.string().trim().max(30).optional(),
});

export async function POST(request: Request) {
  const apiKey = process.env.GOHIGHLEVEL_API_KEY || process.env.GHL_API_KEY;
  const calendarId = process.env.GOHIGHLEVEL_CALENDAR_ID;

  if (!apiKey || !calendarId) {
    const message = !apiKey ? "GoHighLevel API key not configured" : "GoHighLevel Calendar ID not configured";
    console.error("Error generating booking link:", message);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }

  const parsed = await parseJsonBody(request, bookingLinkSchema);
  if (!parsed.success) return parsed.response;

  const { firstName, lastName, email, phone } = parsed.data;
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const params = new URLSearchParams();

  if (firstName) {
    params.append("firstName", firstName);
    params.append("firstname", firstName);
  }
  if (lastName) {
    params.append("lastName", lastName);
    params.append("lastname", lastName);
  }
  if (fullName) params.append("name", fullName);
  if (email) params.append("email", email);
  if (phone) params.append("phone", phone);
  params.append("embed", "1");
  params.append("skipForm", "1");

  return NextResponse.json({
    success: true,
    bookingLink: `https://api.leadconnectorhq.com/widget/booking/${calendarId}?${params}`,
    data: { calendarId, contactInfo: { firstName, lastName, email, phone } },
    method: "widget",
  });
}
