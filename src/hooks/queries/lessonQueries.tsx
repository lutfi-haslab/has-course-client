import { Lesson } from "@/application/repositories/lessonRepositoryImpl";
import { LessonSchema } from "@/entities/models";
import { BaseResponse } from "@/entities/types/response";
import { api } from "@/lib/network";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

interface BaseQueryParams {
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}
interface QueryParams extends BaseQueryParams {
  section_id?: string;
  course_id?: string;
}

export const fetchLesson = () => {
  return {
    byId: async (
      { section_id, order = "asc", page = 1, limit = 10 }: QueryParams,
    ) => {
      const { data } = await api.get<BaseResponse<Lesson[]>>(
        `api/v1/lesson/${section_id}`,
        {
          params: {
            order,
            page,
            limit,
          },
        },
      );
      console.log(data);
      return data;
    },
    all: async (
      { order = "asc", page = 1, limit = 10 }: BaseQueryParams,
    ) => {
      const { data } = await api.get<BaseResponse<Lesson[]>>(
        "api/v1/lessons",
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
    bySectionId: async (
      { section_id, order = "asc", page = 1, limit = 10 }: QueryParams,
    ) => {
      const { data } = await api.get<BaseResponse<Lesson[]>>(
        "api/v1/lessons",
        {
          params: {
            section_id,
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

export const useGetAllLessonsBySectionId = ({
  section_id,
  order = "asc",
  page = 1,
  limit = 10,
}: QueryParams) => {
  return useQuery<BaseResponse<Lesson[]>>({
    queryKey: ["lessonsBySectionId", section_id],
    queryFn: async () =>
      await fetchLesson().bySectionId({ section_id, order, page, limit }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

export const useGetAllLessons = ({
  order = "asc",
  page = 1,
  limit = 10,
}: Omit<QueryParams, "course_id">) => {
  return useQuery<BaseResponse<Lesson[]>>({
    queryKey: ["lessons"],
    queryFn: async () => await fetchLesson().all({ order, page, limit }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};
