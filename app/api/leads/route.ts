import { NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp } from "@/lib/request";

export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;
const requestLog = new Map<string, number[]>();

const leadPayloadSchema = z.record(z.string(), z.unknown());

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((timestamp) => timestamp > now - RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function isAuthorized(request: Request): boolean {
  const expected = process.env.LEADS_API_TOKEN;
  const authorization = request.headers.get("authorization") ?? "";
  if (!expected || !authorization.toLowerCase().startsWith("bearer ")) return false;
  return authorization.slice(7).trim() === expected;
}

const error = (message: string, status: number) => NextResponse.json({ error: message }, { status });

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request) ?? "unknown")) return error("Too many requests", 429);
  if (!isAuthorized(request)) return error("Unauthorized", 401);
  if (!request.headers.get("content-type")?.includes("application/json")) return error("Invalid content type", 415);

  const result = leadPayloadSchema.safeParse(await request.json().catch(() => null));
  if (!result.success) return error("Invalid JSON body", 400);

  return NextResponse.json({ ok: true, received: result.data, message: "Lead accepted" });
}
