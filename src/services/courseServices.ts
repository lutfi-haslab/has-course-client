import { Course } from "@/entities/models/course";
import createSupabaseServerClient from "@/utils/supabase/server";
import * as Sentry from "@sentry/nextjs";

export const CoursesService = async () => {
  const client = await createSupabaseServerClient();

  const createCourse = async (data: Course) => {
    return await Sentry.startSpan(
      {
        op: "db.query",
        name: "CoursesService > createCourse",
      },
      async () => {
        const response = await client.from("courses").insert(data).single();
        console.log("response", response);
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response;
      }
    );
  };

  const getCourses = async (
    page: number = 1,
    limit: number = 3
  ): Promise<{
    data: Course[];
    count: number | null;
  }> => {
    return await Sentry.startSpan(
      {
        op: "db.query",
        name: "CoursesService > getCourse",
      },
      async () => {
        const offset = (page - 1) * limit;
        const to = offset + limit - 1;
        console.log("offset", offset);
        console.log("to", to);

        const response = await client
          ?.from("courses")
          .select("*", { count: "exact" })
          .range(offset, to);

        if (response?.error) {
          // Handle the error, e.g., throw it or log it
          throw new Error(response.error.message);
        }
        // Ensure that `data` is present and is of the expected type
        return {
          data: response.data,
          count: response.count,
        };
      }
    );
  };

  const getCourse = async (id: string) => {
    return await Sentry.startSpan(
      {
        op: "db.query",
        name: "CoursesService > getCourse",
      },
      async () => {
        const response = await client
          .from("courses")
          .select("*")
          .eq("id", id)
          .single();
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response.data;
      }
    );
  };

  const updateCourse = async (id: string, data: Partial<Course>) => {
    return await Sentry.startSpan(
      {
        op: "db.query",
        name: "CoursesService > updateCourse",
      },
      async () => {
        const response = await client
          .from("courses")
          .update(data)
          .eq("id", id)
          .single();
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response.data;
      }
    );
  };

  return {
    createCourse,
    getCourse,
    getCourses,
    updateCourse,
  };
};
