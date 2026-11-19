import "server-only";
import { createHash } from "node:crypto";
import { CustomData, EventRequest, FacebookAdsApi, ServerEvent, UserData } from "facebook-nodejs-business-sdk";
import type { FacebookBrowserContext, FacebookUserData } from "@/lib/validations/facebook";
import { getClientIp } from "@/lib/request";

const DEFAULT_EVENT_SOURCE_URL = "https://ari-uc-study.netlify.app";

type ServerEventOptions = {
  request: Request;
  eventName: string;
  eventId?: string | null;
  context: FacebookBrowserContext;
  userData?: FacebookUserData | null;
  customData?: CustomData;
  defaultCountry?: string;
  externalIdFallbackToIp?: boolean;
};

export function getFacebookCredentials() {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  return accessToken && pixelId ? { accessToken, pixelId } : null;
}

const hash = (value: string) => createHash("sha256").update(value.toLowerCase().trim()).digest("hex");

function buildUserData(
  clientIp: string | null,
  context: FacebookBrowserContext,
  data: FacebookUserData,
  defaultCountry?: string,
  externalIdFallbackToIp?: boolean,
) {
  const userData = new UserData();

  if (clientIp) userData.setClientIpAddress(clientIp);
  if (context.userAgent) userData.setClientUserAgent(context.userAgent);
  if (context.fbp) userData.setFbp(context.fbp);
  if (context.fbc) userData.setFbc(context.fbc);

  if (data.email) userData.setEmail(hash(data.email));
  if (data.phone) userData.setPhone(hash(data.phone.replace(/\D/g, "")));
  if (data.firstName) userData.setFirstName(hash(data.firstName));
  if (data.lastName) userData.setLastName(hash(data.lastName));
  if (data.city) userData.setCity(hash(data.city));
  if (data.state) userData.setState(hash(data.state));
  if (data.zipCode) userData.setZip(hash(data.zipCode));
  if (data.dateOfBirth) userData.setDateOfBirth(hash(data.dateOfBirth));

  const country = data.country || defaultCountry;
  if (country) userData.setCountry(hash(country));

  const externalIdSource = data.email || (externalIdFallbackToIp ? clientIp : null);
  if (externalIdSource) userData.setExternalId(hash(externalIdSource));

  return userData;
}

export async function sendServerEvent({
  request,
  eventName,
  eventId,
  context,
  userData,
  customData,
  defaultCountry,
  externalIdFallbackToIp,
}: ServerEventOptions) {
  const credentials = getFacebookCredentials();
  if (!credentials) return null;

  FacebookAdsApi.init(credentials.accessToken);

  const event = new ServerEvent()
    .setEventName(eventName)
    .setEventTime(Math.floor(Date.now() / 1000))
    .setUserData(buildUserData(getClientIp(request), context, userData ?? {}, defaultCountry, externalIdFallbackToIp))
    .setEventSourceUrl(context.url || DEFAULT_EVENT_SOURCE_URL)
    .setActionSource("website");

  if (customData) event.setCustomData(customData);
  if (eventId) event.setEventId(eventId);

  const eventRequest = new EventRequest(credentials.accessToken, credentials.pixelId).setEvents([event]);
  if (process.env.FACEBOOK_TEST_EVENT_CODE) eventRequest.setTestEventCode(process.env.FACEBOOK_TEST_EVENT_CODE);

  return eventRequest.execute();
}

export { CustomData };
