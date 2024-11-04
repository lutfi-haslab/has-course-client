import { Todo } from "@/entities/models/todo";


export class todoRepositoryImpl {
  async getTodoById(id: number): Promise<Todo> {
    const response = await fetch(`https://dummyjson.com/todos/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch todo");
    }
    return response.json();
  }
}
