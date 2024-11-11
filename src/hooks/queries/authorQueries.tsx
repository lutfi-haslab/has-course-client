import { AuthorSchema } from "@/entities/models";
import { BaseResponse } from "@/entities/types/response";
import { api } from "@/lib/network";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

interface GetAuthorsParams {
  user_id: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

type IAuthorSchema = z.infer<typeof AuthorSchema>;

export const fetchAuthor = () => {
  return {
    byUserId: async (
      user_id: string,
      order?: string,
      page?: number,
      limit?: number,
    ) => {
      const { data } = await api.get<BaseResponse<IAuthorSchema[]>>(
        "api/v1/authors",
        {
          params: {
            user_id,
            order,
            page,
            limit,
          },
        },
      );
      return data;
    },
    all: async (order?: string, page?: number, limit?: number) => {
      const { data } = await api.get<BaseResponse<IAuthorSchema[]>>(
        "api/v1/authors",
        {
          params: {
            order,
            page,
            limit,
          },
        },
      );
      return data;
    },
  };
};

export const useGetAllAuthorsByUserId = ({
  user_id,
  order = "asc",
  page = 1,
  limit = 10,
}: GetAuthorsParams) => {
  return useQuery<BaseResponse<IAuthorSchema[]>>({
    queryKey: ["authorsByUserId", user_id],
    queryFn: async () =>
      await fetchAuthor().byUserId(user_id, order, page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

export const useGetAllAuthors = ({
  order = "asc",
  page = 1,
  limit = 10,
}: Omit<GetAuthorsParams, "user_id">) => {
  return useQuery<BaseResponse<IAuthorSchema[]>>({
    queryKey: ["authors", { order, page, limit }],
    queryFn: async () => await fetchAuthor().all(order, page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};
