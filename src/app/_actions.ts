"use server";

import { CreateUserInput, LoginUserInput } from "@/lib/user-schema";
import createSupabaseServerClient from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function signUpWithEmailAndPassword({
  data,
  emailRedirectTo,
}: {
  data: CreateUserInput;
  emailRedirectTo?: string;
}) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo,
    },
  });
  return JSON.stringify(result);
}

export async function signInWithEmailAndPassword(input: LoginUserInput) {
  const supabase = await createSupabaseServerClient();
  const cookieStore = await cookies();
  const { error, data } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  if (!error && data?.session) {
    const { access_token, refresh_token, expires_at } = data.session;

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
  }

  return JSON.stringify({
    data,
    error,
  });
}

export const loginWithGoogle = async () => {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/api/auth/callback`,
    },
  });
};
