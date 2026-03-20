import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const ip = (body?.ip as string | undefined) ?? req.headers.get("x-forwarded-for") ?? "unknown";

  const res = await checkRateLimit(ip);
  return Response.json({
    ip,
    ...res,
  });
}

