"use client";

import { TodoUseCase } from "@/application/use-cases/TodoUseCase";
import { useTodoQuery } from "@/hooks/queries/todoQueries";
import { useUserSessionQuery } from "@/hooks/queries/userQueries";
import { getUserSession } from "@/lib/getUserSession";
import { Session } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import useRootPresenter from "../_useRootPresenter";

export default function useCoursesPresenter() {
  const { data } = useUserSessionQuery();

  const id = 2;
  const { data: todo } = useTodoQuery(id);

  return {
    state: { session: data?.session as Session, todo },
  };
}
