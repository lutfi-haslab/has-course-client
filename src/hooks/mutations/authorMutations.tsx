import { AuthorSchema } from "@/entities/models";
import { api } from "@/lib/network";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AddEntityResponse } from "../type";
import { Author, AuthorDTO } from "@/application/repositories/authorRepositoryImpl";

type IResponse = AddEntityResponse<Author>;

export const mutateAuthor = () => {
  return {
    addAuthor: async (data: AuthorDTO) => {
      const response = await api.post<IResponse>(
        "api/v1/author",
        data,
      );

      return response.data;
    },
  };
};

export const useAddAuthor = () => {
  const queryClient = useQueryClient();
  return useMutation<IResponse, Error, AuthorDTO>({
    mutationFn: async (data) => await mutateAuthor().addAuthor(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["authorsByUserId", data.data.user_id],
      });
    },
  });
};
