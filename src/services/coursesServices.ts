import { CourseSchema } from "@/entities/models";
import { getSupabaseClient, withSentrySpan } from "@/utils/withSentry";
import { z } from "zod";

export const CoursesService = async () => {
  const client = await getSupabaseClient();

  const createCourse = async (data: z.infer<typeof CourseSchema>) => {
    return withSentrySpan("CoursesService > createCourse", async () => {
      const response = await client.from("Course").insert(data).single();
      console.log("Service response", response);
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

  const getCourses = async () => {
    return withSentrySpan("CoursesService > getCourses", async () => {
      const response = await client.from("Course").select("*");

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

  const getCourse = async (id: string) => {
    return withSentrySpan("CoursesService > getCourse", async () => {
      const response = await client
        .from("Course")
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

  const getCoursesByAuthorId = async (authorId: string) => {
    return withSentrySpan("CoursesService > getCoursesByAuthorId", async () => {
      const response = await client
        .from("Course")
        .select("*")
        .eq("author_id", authorId);

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

  const getAllCoursesWithContent = async (id: string, fullContent: boolean) => {
    return withSentrySpan(
      "CoursesService > getAllCoursesWithContent",
      async () => {
        let response;
        if (fullContent) {
          response = await client
            .from("Course")
            .select(
              `
          *,
          Section(*, Lesson(*))
        `
            )
            .eq("id", id);
        } else {
          response = await client
            .from("Course")
            .select(
              `
          *,
          Section(id, title, created_at, Lesson(id, title, created_at))
        `
            )
            .eq("id", id);
        }

        if (response.error)
          throw new Error(
            JSON.stringify({
              msg: [response.error.message, response.error.details],
              status: response.status,
            })
          );
        return response.data;
      }
    );
  };

  const updateCourse = async (
    id: string,
    data: Partial<z.infer<typeof CourseSchema>>
  ) => {
    return withSentrySpan("CoursesService > updateCourse", async () => {
      const response = await client
        .from("Course")
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

  return {
    createCourse,
    getCourse,
    getCourses,
    getCoursesByAuthorId,
    getAllCoursesWithContent,
    updateCourse,
  };
};
