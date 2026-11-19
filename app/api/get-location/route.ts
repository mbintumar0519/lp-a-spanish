import { NextResponse } from "next/server";
import { z } from "zod";
import { EMPTY_LOCATION, fromFreeIpApi, fromIpGeolocation, fromIpInfo, isPrivateIp } from "@/lib/geolocation";
import { errorMessage, getClientIp, parseJsonBody } from "@/lib/request";

const FALLBACK_IP = "8.8.8.8";

const healthCheckSchema = z.object({
  ip: z.union([z.ipv4(), z.ipv6()]).default(FALLBACK_IP),
});

export async function GET(request: Request) {
  const ip = getClientIp(request) ?? FALLBACK_IP;

  if (isPrivateIp(ip)) {
    return NextResponse.json({ success: false, message: "Cannot geolocate private IP", ...EMPTY_LOCATION });
  }

  try {
    const location = (await fromIpInfo(ip)) ?? (await fromIpGeolocation(ip)) ?? (await fromFreeIpApi(ip));

    if (location) return NextResponse.json({ success: true, ...location, ip });

    return NextResponse.json({ success: false, message: "Location data unavailable", ...EMPTY_LOCATION, ip });
  } catch (error) {
    console.error("Location API error:", error);
    return NextResponse.json({ success: false, ...EMPTY_LOCATION, error: errorMessage(error) });
  }
}

export async function POST(request: Request) {
  const parsed = await parseJsonBody(request, healthCheckSchema);
  if (!parsed.success) return parsed.response;

  const { ip } = parsed.data;
  const [ipinfo, ipgeolocation, freegeoip] = await Promise.all([
    fromIpInfo(ip),
    fromIpGeolocation(ip),
    fromFreeIpApi(ip),
  ]);
  const services = { ipinfo, ipgeolocation, freegeoip };

  return NextResponse.json({
    test_ip: ip,
    services,
    working_services: Object.entries(services)
      .filter(([, data]) => data !== null)
      .map(([name]) => name),
    environment_variables: {
      ipinfo_configured: Boolean(process.env.IPINFO_TOKEN),
      ipgeolocation_configured: Boolean(process.env.IP_GEOLOCATION_API_KEY),
    },
  });
}
