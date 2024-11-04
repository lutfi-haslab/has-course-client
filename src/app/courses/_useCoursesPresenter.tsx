"use client";

import { TodoUseCase } from "@/application/use-cases/TodoUseCase";
import { getUserSession } from "@/lib/getUserSession";
import { Session } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export default function useCoursesPresenter() {
  const { data } = useQuery({
    queryKey: ["userSession"],
    queryFn: async () => getUserSession(),
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  const useCase = new TodoUseCase();
  const id = 2;
  const { data: todo } = useQuery({
    queryKey: ["todo-id", id],
    queryFn: async () => {
      const todo = await useCase.getById(id);
      return todo;
    },
  });

  return {
    session: data?.session as Session,
    todo,
  };
}
