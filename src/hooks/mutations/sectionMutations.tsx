import { SectionSchema } from "@/entities/models";
import { api } from "@/lib/network";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AddEntityResponse } from "../type";

export type SectionDTO = Omit<
  z.infer<typeof SectionSchema>,
  "id" | "created_at" | "updated_at"
>;

type IResponse = AddEntityResponse<z.infer<typeof SectionSchema>>;

export const mutateSection = () => {
  return {
    addSection: async (data: SectionDTO) => {
      const response = await api.post<IResponse>(
        "api/v1/section",
        data,
      );
      return response.data;
    },
  };
};

export const useAddSection = (course_id: string) => {
  const queryClient = useQueryClient();
  return useMutation<IResponse, Error, SectionDTO>({
    mutationFn: async (data) => await mutateSection().addSection(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["sectionsByCourseId", course_id],
      });
    },
  });
};
