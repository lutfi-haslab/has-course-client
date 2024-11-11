import { Section } from "@/application/repositories/sectionRepositoryImpl";
import { BaseResponse } from "@/entities/types/response";
import { api } from "@/lib/network";
import { useQuery } from "@tanstack/react-query";

interface BaseQueryParams {
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}
interface QueryParams extends BaseQueryParams {
  section_id: string;
  course_id: string;
}

export const fetchSection = () => {
  return {
    byId: async (
      { section_id, order = "asc", page = 1, limit = 10 }: QueryParams,
    ) => {
      const { data } = await api.get<BaseResponse<Section[]>>(
        `api/v1/section/${section_id}`,
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
      const { data } = await api.get<BaseResponse<Section[]>>(
        "api/v1/sections",
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
    byCourseId: async (
      { course_id, order = "asc", page = 1, limit = 10 }: Omit<
        QueryParams,
        "section_id"
      >,
    ) => {
      const { data } = await api.get<BaseResponse<Section[]>>(
        "api/v1/sections",
        {
          params: {
            course_id,
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

export const useGetAllSectionsByCourseId = ({
  course_id,
  order = "asc",
  page = 1,
  limit = 10,
}: Omit<QueryParams, "section_id">) => {
  return useQuery<BaseResponse<Section[]>>({
    queryKey: ["sectionsByCourseId", course_id],
    queryFn: async () =>
      await fetchSection().byCourseId({ course_id, order, page, limit }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

export const useGetAllSections = ({
  order = "asc",
  page = 1,
  limit = 10,
}: Omit<QueryParams, "course_id">) => {
  return useQuery<BaseResponse<Section[]>>({
    queryKey: ["sections"],
    queryFn: async () => await fetchSection().all({ order, page, limit }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};
