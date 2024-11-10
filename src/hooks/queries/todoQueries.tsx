import { TodoUseCase } from "@/application/use-cases/TodoUseCase";
import { useQuery } from "@tanstack/react-query";

const useCase = new TodoUseCase();

export const useTodoQuery = (id: number) => {
  return useQuery({
    queryKey: ["todo-id", id],
    queryFn: async () => {
      const todo = await useCase.getById(id);
      return todo;
    },
  });
};
