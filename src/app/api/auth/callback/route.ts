import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = process.env.BASE_URL;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/courses";

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data?.session) {
      const { access_token, refresh_token, expires_at } = data.session;
      console.log("access_token", access_token);
      console.log("refresh_token", refresh_token);

      cookieStore.set({
        name: "access_token",
        value: access_token,
        httpOnly: true,
        path: "/",
        secure: true,
        ...(expires_at && { expires: new Date(expires_at) }),
      });

      cookieStore.set({
        name: "refresh_token",
        value: refresh_token,
        httpOnly: true,
        path: "/",
        secure: true,
        ...(expires_at && { expires: new Date(expires_at) }),
      });

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
