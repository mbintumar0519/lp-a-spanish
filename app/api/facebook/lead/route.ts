import { NextResponse } from "next/server";
import { getFacebookCredentials, sendServerEvent } from "@/lib/facebook/conversions-api";
import { errorMessage, parseJsonBody } from "@/lib/request";
import { facebookLeadSchema } from "@/lib/validations/facebook";

export async function POST(request: Request) {
  if (!getFacebookCredentials()) {
    return NextResponse.json({ success: true, message: "Facebook tracking not configured" });
  }

  const parsed = await parseJsonBody(request, facebookLeadSchema);
  if (!parsed.success) return parsed.response;

  const { eventId, fbp, fbc, url, userAgent, ...userData } = parsed.data;

  try {
    await sendServerEvent({
      request,
      eventName: "Lead",
      eventId,
      context: { fbp, fbc, url, userAgent },
      userData,
      defaultCountry: "us",
    });

    return NextResponse.json({ success: true, message: "Lead tracked successfully with enhanced match quality" });
  } catch (error) {
    console.error("Facebook Lead API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to track Lead", error: errorMessage(error) },
      { status: 500 },
    );
  }
}
