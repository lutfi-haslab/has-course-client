import { SectionSchema } from "@/entities/models";
import { getSupabaseClient, withSentrySpan } from "@/utils/withSentry";
import { z } from "zod";

export const SectionsService = async () => {
  const client = await getSupabaseClient();

  const createSection = async (data: z.infer<typeof SectionSchema>) => {
    return withSentrySpan("SectionsService > createSection", async () => {
      const response = await client.from("Section").insert(data).single();
      if (response.error)
        throw new Error(
          JSON.stringify({
            msg: [response.error.message, response.error.details],
            status: response.status,
          })
        );
      return response.data;
    });
  };

  const getSection = async (id: string) => {
    return withSentrySpan("SectionsService > getSection", async () => {
      const response = await client
        .from("Section")
        .select("*")
        .eq("id", id)
        .single();
      if (response.error)
        throw new Error(
          JSON.stringify({
            msg: [response.error.message, response.error.details],
            status: response.status,
          })
        );
      return response.data;
    });
  };

  const updateSection = async (
    id: string,
    data: Partial<z.infer<typeof SectionSchema>>
  ) => {
    return withSentrySpan("SectionsService > updateSection", async () => {
      const response = await client
        .from("Section")
        .update(data)
        .eq("id", id)
        .single();
      if (response.error)
        throw new Error(
          JSON.stringify({
            msg: [response.error.message, response.error.details],
            status: response.status,
          })
        );
      return response.data;
    });
  };

  return { createSection, getSection, updateSection };
};
