"use client";

import { useUserQuery, useUserSessionQuery } from "@/hooks/queries/userQueries";
import useSupabaseClient from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function useRootPresenter() {
  const supabase = useSupabaseClient();
  const {
    data: dataSession,
    isError: sessionError,
    isLoading: sessionLoading,
  } = useUserSessionQuery();
  const {
    data: dataUser,
    isError: userError,
    isLoading: userLoading,
  } = useUserQuery();
  const router = useRouter();

  const logOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error", error);
    } else {
      console.log("Logged out successfully");
      router.push("/");
    }
  };

  return {
    state: {
      user: userError ? null : dataUser?.user,
      session: sessionError ? null : (dataSession?.session as Session),
      loader: {
        user: userLoading,
        session: sessionLoading,
      },
    },
    actions: {
      logOut: logOutHandler,
    },
  };
}
