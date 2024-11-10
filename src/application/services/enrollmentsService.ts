import { EnrollmentSchema } from "@/entities/models";
import { getSupabaseClient, withSentrySpan } from "@/utils/withSentry";
import { z } from "zod";

export const EnrollmentsService = async () => {
  const client = await getSupabaseClient();

  const createEnrollment = async (data: z.infer<typeof EnrollmentSchema>) => {
    return withSentrySpan("EnrollmentsService > createEnrollment", async () => {
      const response = await client.from("enrollments").insert(data).single();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    });
  };

  const getEnrollment = async (id: string) => {
    return withSentrySpan("EnrollmentsService > getEnrollment", async () => {
      const response = await client
        .from("enrollments")
        .select("*")
        .eq("id", id)
        .single();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    });
  };

  const updateEnrollment = async (
    id: string,
    data: Partial<z.infer<typeof EnrollmentSchema>>
  ) => {
    return withSentrySpan("EnrollmentsService > updateEnrollment", async () => {
      const response = await client
        .from("enrollments")
        .update(data)
        .eq("id", id)
        .single();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    });
  };

  return { createEnrollment, getEnrollment, updateEnrollment };
};
