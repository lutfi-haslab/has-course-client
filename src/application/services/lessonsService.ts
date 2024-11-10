import { LessonSchema } from "@/entities/models";
import { getSupabaseClient, withSentrySpan } from "@/utils/withSentry";
import { z } from "zod";

export const LessonsService = async () => {
  const client = await getSupabaseClient();

  const createLesson = async (data: z.infer<typeof LessonSchema>) => {
    return withSentrySpan("LessonsService > createLesson", async () => {
      const response = await client.from("Lesson").insert(data).single();
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

  const getLesson = async (id: string) => {
    return withSentrySpan("LessonsService > getLesson", async () => {
      const response = await client
        .from("Lesson")
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

  const updateLesson = async (
    id: string,
    data: Partial<z.infer<typeof LessonSchema>>
  ) => {
    return withSentrySpan("LessonsService > updateLesson", async () => {
      const response = await client
        .from("Lesson")
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

  return { createLesson, getLesson, updateLesson };
};
