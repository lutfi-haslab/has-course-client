import { AuthorSchema } from "@/entities/models";
import { getSupabaseClient, withSentrySpan } from "@/utils/withSentry";
import { z } from "zod";

export const AuthorsService = async () => {
  const client = await getSupabaseClient();

  const createAuthor = async (data: z.infer<typeof AuthorSchema>) => {
    return withSentrySpan("AuthorsService > createAuthor", async () => {
      const response = await client.from("Author").insert(data).single();
      console.log("response", response);
      if (response.error) throw new Error(response.error.message);
      return response.data;
    });
  };

  const getAuthor = async (id: string) => {
    return withSentrySpan("AuthorsService > getAuthor", async () => {
      const response = await client
        .from("Author")
        .select("*")
        .eq("id", id)
        .single();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    });
  };

  const getAuthors = async () => {
    return withSentrySpan("AuthorsService > getAuthor", async () => {
      const response = await client.from("Author").select("*");
      if (response.error) throw new Error(response.error.message);
      return response.data;
    });
  };

  const updateAuthor = async (
    id: string,
    data: Partial<z.infer<typeof AuthorSchema>>
  ) => {
    return withSentrySpan("AuthorsService > updateAuthor", async () => {
      const response = await client
        .from("Author")
        .update(data)
        .eq("id", id)
        .single();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    });
  };

  return { createAuthor, getAuthor, getAuthors, updateAuthor };
};
