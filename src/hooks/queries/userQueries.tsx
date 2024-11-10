import { getUser, getUserSession } from "@/lib/getUserSession";
import useSupabaseClient from "@/utils/supabase/client";
import { Session, UserResponse } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

type UserSessionData = {
  session: Session | null;
};
export const useUserSessionQuery = () => {
  return useQuery<UserSessionData>({
    queryKey: ["userSession"],
    queryFn: async () => await getUserSession(),
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
};

export const useUserQuery = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => await getUser(),
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
};
