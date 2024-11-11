import { LessonSchema } from "@/entities/models";
import { api } from "@/lib/network";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AddEntityResponse } from "../type";
import {
  Lesson,
  LessonDTO,
} from "@/application/repositories/lessonRepositoryImpl";

type IResponse = AddEntityResponse<Lesson>;

export const mutateLesson = () => {
  return {
    addLesson: async (data: LessonDTO) => {
      const response = await api.post<IResponse>(
        "api/v1/lesson",
        data,
      );
      return response.data;
    },
  };
};

export const useAddLesson = (section_id: string) => {
  const queryClient = useQueryClient();
  return useMutation<IResponse, Error, LessonDTO>({
    mutationFn: async (data) => await mutateLesson().addLesson(data),
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ["lessonsBySectionId", section_id],
      });
    },
  });
};
