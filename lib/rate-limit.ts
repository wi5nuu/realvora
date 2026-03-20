import { createAdminClient } from "@/lib/supabase/server";

export async function checkRateLimit(ip: string) {
  try {
    const supabase = createAdminClient();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { data: existing } = await supabase
      .from("rate_limits")
      .select("count, reset_at")
      .eq("ip_address", ip)
      .gte("reset_at", today.toISOString())
      .single();

    if (!existing) {
      await supabase.from("rate_limits").upsert({
        ip_address: ip,
        count: 1,
        reset_at: tomorrow.toISOString(),
      });
      return { allowed: true, remaining: 4, resetAt: tomorrow };
    }

    if (existing.count >= 5) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: new Date(existing.reset_at),
      };
    }

    await supabase
      .from("rate_limits")
      .update({ count: existing.count + 1 })
      .eq("ip_address", ip);

    return {
      allowed: true,
      remaining: 5 - existing.count - 1,
      resetAt: new Date(existing.reset_at),
    };
  } catch (error) {
    // Bypass rate limit for local development if SUPABASE_SERVICE_ROLE_KEY is missing
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return { allowed: true, remaining: 5, resetAt: tomorrow };
  }
}

