import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient as createSupabaseAdminClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables for server.");
}

export async function createClient() {
  const cookieStore = (await cookies()) as any;

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet: any[]) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          if (value) cookieStore.set(name, value, options);
          else cookieStore.delete(name);
        });
      },
    },
  });
}

export function createAdminClient() {
  if (!supabaseServiceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY (server only).");
  }

  // Admin client untuk operasi tanpa RLS user context (mis. rate-limit).
  return createSupabaseAdminClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });
}

