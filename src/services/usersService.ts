import { UserSchema } from "@/entities/models";
import { getSupabaseClient, withSentrySpan } from "@/utils/withSentry";
import { z } from "zod";


export const UsersService = async () => {
  const client = await getSupabaseClient();

  const createUser = async (data: z.infer<typeof UserSchema>) => {
    return withSentrySpan("UsersService > createUser", async () => {
      const response = await client.from("users").insert(data).single();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    });
  };

  const getUser = async (id: string) => {
    return withSentrySpan("UsersService > getUser", async () => {
      const response = await client.from("users").select("*").eq("id", id).single();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    });
  };

  const updateUser = async (id: string, data: Partial<z.infer<typeof UserSchema>>) => {
    return withSentrySpan("UsersService > updateUser", async () => {
      const response = await client.from("users").update(data).eq("id", id).single();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    });
  };

  return { createUser, getUser, updateUser };
};
