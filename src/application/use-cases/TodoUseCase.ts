import { Todo } from "@/entities/models/todo";

import { todoRepositoryImpl } from "../repositories/todoRepositoryImpl";

export class TodoUseCase {
  private todoRepository: todoRepositoryImpl;

  constructor() {
    this.todoRepository = new todoRepositoryImpl();
  }

  //   async getAll(): Promise<Todo[]> {
  //     return this.todoRepository.getAllTodos();
  //   }

  async getById(id: number): Promise<Todo> {
    return this.todoRepository.getTodoById(id);
  }

  //   async create(todo: Todo): Promise<Todo> {
  //     return this.todoRepository.createTodo(todo);
  //   }

  //   async update(id: string, todo: Partial<Todo>): Promise<Todo> {
  //     return this.todoRepository.updateTodo(id, todo);
  //   }

  //   async delete(id: string): Promise<void> {
  //     return this.todoRepository.deleteTodo(id);
  //   }
}
