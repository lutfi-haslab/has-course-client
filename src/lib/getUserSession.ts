"use server";

import createSupabaseServerClient from "@/utils/supabase/server";

export async function getUserSession() {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getSession();
}

export async function getUser() {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getUser();
}
