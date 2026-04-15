import { createServerClient } from "@supabase/ssr";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseAuthConfigured } from "@/lib/supabase";

function getAuthEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

function sanitizeNextPath(value: string | null) {
  if (!value || !value.startsWith("/")) {
    return "/account";
  }

  if (value.startsWith("//")) {
    return "/account";
  }

  return value;
}

export async function GET(request: NextRequest) {
  const env = getAuthEnv();
  const next = sanitizeNextPath(request.nextUrl.searchParams.get("next"));

  if (!env || !isSupabaseAuthConfigured()) {
    return NextResponse.redirect(new URL(`/auth?error=auth_not_configured`, request.url));
  }

  const redirectUrl = new URL(next, request.url);
  const response = NextResponse.redirect(redirectUrl);

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const code = request.nextUrl.searchParams.get("code");
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type") as EmailOtpType | null;

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(new URL(`/auth?error=${encodeURIComponent(error.message)}`, request.url));
    }

    return response;
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });

    if (error) {
      return NextResponse.redirect(new URL(`/auth?error=${encodeURIComponent(error.message)}`, request.url));
    }

    return response;
  }

  return NextResponse.redirect(new URL("/auth", request.url));
}
