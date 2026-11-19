import { NextResponse } from "next/server";
import { getFacebookCredentials, sendServerEvent } from "@/lib/facebook/conversions-api";
import { errorMessage, parseJsonBody } from "@/lib/request";
import { facebookPageViewSchema } from "@/lib/validations/facebook";

export async function POST(request: Request) {
  if (!getFacebookCredentials()) {
    return NextResponse.json({ success: true, message: "Facebook tracking not configured" });
  }

  const parsed = await parseJsonBody(request, facebookPageViewSchema);
  if (!parsed.success) return parsed.response;

  const { fbp, fbc, url, userAgent, referrer, ...userData } = parsed.data;

  try {
    await sendServerEvent({
      request,
      eventName: "PageView",
      context: { fbp, fbc, url, userAgent, referrer },
      userData,
      externalIdFallbackToIp: true,
    });

    return NextResponse.json({ success: true, message: "PageView tracked successfully" });
  } catch (error) {
    console.error("Facebook PageView API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to track PageView", error: errorMessage(error) },
      { status: 500 },
    );
  }
}
