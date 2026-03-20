import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES: string[] = ["/dashboard", "/riwayat"];
const AUTH_ROUTES = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect ke login jika akses protected route tanpa session
  if (
    PROTECTED_ROUTES.some((r) => pathname.startsWith(r)) &&
    !session
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect ke dashboard jika sudah login akses auth routes
  if (AUTH_ROUTES.includes(pathname) && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

