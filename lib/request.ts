import { NextResponse } from "next/server";
import { z, type ZodType } from "zod";

export function getClientIp(request: Request): string | null {
  const { headers } = request;
  const forwardedFor = headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  return (
    headers.get("x-nf-client-connection-ip") ||
    headers.get("cf-connecting-ip") ||
    headers.get("x-real-ip") ||
    forwardedFor ||
    null
  );
}

type ParseResult<T> = { success: true; data: T } | { success: false; response: NextResponse };

export async function parseJsonBody<T>(request: Request, schema: ZodType<T>): Promise<ParseResult<T>> {
  const body: unknown = await request.json().catch(() => null);
  const result = schema.safeParse(body);

  if (result.success) return { success: true, data: result.data };

  const [firstIssue] = result.error.issues;
  return {
    success: false,
    response: NextResponse.json(
      {
        success: false,
        error: "validation_error",
        message: firstIssue?.message ?? "Invalid request body",
        fieldErrors: z.flattenError(result.error).fieldErrors,
      },
      { status: 400 },
    ),
  };
}

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
