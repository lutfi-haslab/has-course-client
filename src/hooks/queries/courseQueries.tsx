import { Course, CourseWithContent } from "@/application/repositories/courseRepositoryImpl";
import { CourseSchema } from "@/entities/models";
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
  course_id?: string;
  author_id?: string;
}

type ICourseSchema = z.infer<typeof CourseSchema>;

export const fetchCourse = () => {
  return {
    byId: async (
      { course_id }: { course_id: string },
    ) => {
      const { data } = await api.get<BaseResponse<CourseWithContent>>(
        `api/v1/course/${course_id}`,
        {
          params: {
            with_content: true,
            full_content: false,
          },
        },
      );
      console.log(data);
      return data;
    },
    all: async (
      { order = "asc", page = 1, limit = 10 }: BaseQueryParams,
    ) => {
      const { data } = await api.get<BaseResponse<ICourseSchema[]>>(
        "api/v1/courses",
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
    byAuthorId: async (
      { author_id, order = "asc", page = 1, limit = 10 }: Omit<
        QueryParams,
        "course_id"
      >,
    ) => {
      const { data } = await api.get<BaseResponse<ICourseSchema[]>>(
        "api/v1/courses",
        {
          params: {
            author_id,
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

export const useGetCourseById = ({ course_id }: { course_id: string }) => {
  return useQuery<BaseResponse<CourseWithContent>>({
    queryKey: ["courseById", course_id],
    queryFn: async () => await fetchCourse().byId({ course_id }),
  });
};

export const useGetAllCoursesByAuthorId = ({
  author_id,
  order = "asc",
  page = 1,
  limit = 10,
}: Omit<QueryParams, "course_id">) => {
  return useQuery<BaseResponse<ICourseSchema[]>>({
    queryKey: ["coursesByAuthorId", author_id],
    queryFn: async () =>
      await fetchCourse().byAuthorId({ author_id, order, page, limit }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

export const useGetAllCourses = ({
  order = "asc",
  page = 1,
  limit = 10,
}: Omit<QueryParams, "author_id">) => {
  return useQuery<BaseResponse<ICourseSchema[]>>({
    queryKey: ["courses"],
    queryFn: async () => await fetchCourse().all({ order, page, limit }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};
