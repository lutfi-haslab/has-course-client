import { ReviewSchema } from "@/entities/models";
import { getSupabaseClient, withSentrySpan } from "@/utils/withSentry";
import { z } from "zod";

export const ReviewsService = async () => {
  const client = await getSupabaseClient();

  const createReview = async (data: z.infer<typeof ReviewSchema>) => {
    return withSentrySpan("ReviewsService > createReview", async () => {
      const response = await client.from("reviews").insert(data).single();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    });
  };

  const getReview = async (id: string) => {
    return withSentrySpan("ReviewsService > getReview", async () => {
      const response = await client
        .from("reviews")
        .select("*")
        .eq("id", id)
        .single();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    });
  };

  const updateReview = async (
    id: string,
    data: Partial<z.infer<typeof ReviewSchema>>
  ) => {
    return withSentrySpan("ReviewsService > updateReview", async () => {
      const response = await client
        .from("reviews")
        .update(data)
        .eq("id", id)
        .single();
      if (response.error) throw new Error(response.error.message);
      return response.data;
    });
  };

  return { createReview, getReview, updateReview };
};
