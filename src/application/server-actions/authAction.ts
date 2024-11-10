"use server";

import createSupabaseServerClient from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const logoutAction = async () => {
  "use server";
  const supabase = await createSupabaseServerClient();
  const logOut = await supabase.auth.signOut();
  if (logOut.error) {
    console.log("Error", logOut.error);
  } else {
    console.log("Logged out successfully");
    revalidatePath("/");
    return redirect("/");
  }
};
