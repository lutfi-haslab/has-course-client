import { CourseSchema } from "@/entities/models";
import { api } from "@/lib/network";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { AddEntityResponse } from "../type";
import { CourseDTO } from "@/application/repositories/courseRepositoryImpl";

type IResponse = AddEntityResponse<z.infer<typeof CourseSchema>>;

export const mutateCourse = () => {
  return {
    addCourse: async (data: CourseDTO) => {
      const response = await api.post<IResponse>(
        "api/v1/course",
        data,
      );
      return response.data;
    },
  };
};

export const useAddCourse = () => {
  return useMutation<IResponse, Error, CourseDTO>({
    mutationFn: async (data) => await mutateCourse().addCourse(data),
  });
};
