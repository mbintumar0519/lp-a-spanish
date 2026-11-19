import "server-only";

export type GeoLocation = {
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export const EMPTY_LOCATION: GeoLocation = { city: "", state: "", zipCode: "", country: "US" };

type IpInfoResponse = { city?: string; region?: string; postal?: string; country?: string };
type IpGeolocationResponse = { city?: string; state_prov?: string; zipcode?: string; country_code2?: string };
type FreeIpApiResponse = { cityName?: string; regionName?: string; zipCode?: string; countryCode?: string };

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    return response.ok ? ((await response.json()) as T) : null;
  } catch (error) {
    console.error(`Geolocation request failed: ${new URL(url).hostname}`, error);
    return null;
  }
}

export async function fromIpInfo(ip: string): Promise<GeoLocation | null> {
  const token = process.env.IPINFO_TOKEN;
  if (!token) return null;

  const data = await fetchJson<IpInfoResponse>(`https://ipinfo.io/${ip}?token=${token}`);
  if (!data?.city || !data.region) return null;

  return { city: data.city, state: data.region, zipCode: data.postal ?? "", country: data.country ?? "US" };
}

async function fetchIpGeolocation(ip: string) {
  const apiKey = process.env.IP_GEOLOCATION_API_KEY;
  if (!apiKey) return null;

  const params = new URLSearchParams({ apiKey, ip, fields: "geo,zipcode" });
  return fetchJson<IpGeolocationResponse>(`https://api.ipgeolocation.io/ipgeo?${params}`);
}

export async function fromIpGeolocation(ip: string): Promise<GeoLocation | null> {
  const data = await fetchIpGeolocation(ip);
  if (!data?.city || !data.state_prov) return null;

  return { city: data.city, state: data.state_prov, zipCode: data.zipcode ?? "", country: data.country_code2 ?? "US" };
}

export async function fromFreeIpApi(ip: string): Promise<GeoLocation | null> {
  const data = await fetchJson<FreeIpApiResponse>(`https://freeipapi.com/api/json/${ip}`);
  if (!data?.cityName || !data.regionName) return null;

  return {
    city: data.cityName,
    state: data.regionName,
    zipCode: data.zipCode ?? "",
    country: data.countryCode ?? "US",
  };
}

export async function lookupLeadLocation(ip: string): Promise<GeoLocation> {
  const data = await fetchIpGeolocation(ip);
  if (!data) return EMPTY_LOCATION;

  return {
    city: data.city ?? "",
    state: data.state_prov ?? "",
    zipCode: data.zipcode ?? "",
    country: data.country_code2 ?? "US",
  };
}

export function isPrivateIp(ip: string): boolean {
  return ip === "127.0.0.1" || ip === "::1" || /^(10\.|192\.168\.|172\.)/.test(ip);
}
