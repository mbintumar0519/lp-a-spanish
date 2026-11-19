import { NextResponse } from "next/server";
import { CustomData, getFacebookCredentials, sendServerEvent } from "@/lib/facebook/conversions-api";
import { errorMessage, parseJsonBody } from "@/lib/request";
import { facebookConversionSchema } from "@/lib/validations/facebook";

export async function POST(request: Request) {
  if (!getFacebookCredentials()) {
    return NextResponse.json({ success: true, message: "Facebook tracking not configured" });
  }

  const parsed = await parseJsonBody(request, facebookConversionSchema);
  if (!parsed.success) return parsed.response;

  const { eventName, event_id, eventData, userData, ...context } = parsed.data;

  try {
    const customData = new CustomData();
    if (eventData?.value) customData.setValue(eventData.value);
    if (eventData?.currency) customData.setCurrency(eventData.currency);
    if (eventData?.content_category) customData.setContentCategory(eventData.content_category);
    if (eventData?.content_name) customData.setContentName(eventData.content_name);

    const fbResponse = await sendServerEvent({
      request,
      eventName,
      eventId: event_id,
      context: { ...context, referrer: null },
      userData,
      customData,
    });

    return NextResponse.json({ success: true, message: `${eventName} tracked successfully`, fbResponse });
  } catch (error) {
    console.error(`Facebook ${eventName} API error:`, error);
    return NextResponse.json(
      { success: false, message: `Failed to track ${eventName}`, error: errorMessage(error) },
      { status: 500 },
    );
  }
}
