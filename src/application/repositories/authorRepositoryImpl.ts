// types.ts
import { z } from "zod";
import { SupabaseClient } from "@supabase/supabase-js";
import { BaseResponse } from "@/entities/types/response";
import { AuthorSchema } from "@/entities/models";

// Repository interface
export interface AuthorRepository {
  getAuthorsByUserId(
    userId: string,
    page?: number,
    limit?: number,
    order?: string
  ): Promise<BaseResponse<Author[]>>;
  getAuthor(id: string): Promise<Author>;
  getAuthors(
    page?: number,
    limit?: number,
    order?: string
  ): Promise<BaseResponse<Author[]>>;
  createAuthor(data: CreateAuthorDTO): Promise<Author>;
  updateAuthor(id: string, data: Partial<CreateAuthorDTO>): Promise<Author>;
}

export type Author = z.infer<typeof AuthorSchema>;
export type CreateAuthorDTO = Omit<Author, "id">;

// Repository implementation
export class AuthorRepositoryImpl implements AuthorRepository {
  constructor(private client: SupabaseClient) {}

  async getAuthorsByUserId(
    userId: string,
    page = 1,
    limit = 10,
    order = "asc"
  ): Promise<BaseResponse<Author[]>> {
    const offset = (page - 1) * limit;
    const response = await this.client
      .from("Author")
      .select("*")
      .eq("user_id", userId)
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: order === "asc" ? true : false });

    if (response.error) throw new Error(response.error.message);

    return {
      data: response.data,
      pagination: { page, limit, size: response.data.length, order },
    };
  }

  async getAuthor(id: string): Promise<Author> {
    const response = await this.client
      .from("Author")
      .select("*")
      .eq("id", id)
      .single();

    if (response.error) throw new Error(response.error.message);
    return response.data;
  }

  async getAuthors(
    page = 1,
    limit = 10,
    order = "asc"
  ): Promise<BaseResponse<Author[]>> {
    const offset = (page - 1) * limit;
    const response = await this.client
      .from("Author")
      .select("*")
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: order === order });

    if (response.error) throw new Error(response.error.message);

    return {
      data: response.data,
      pagination: { page, limit, size: response.data.length, order },
    };
  }

  async createAuthor(data: CreateAuthorDTO): Promise<Author> {
    const response = await this.client.from("Author").insert(data).single();

    if (response.error) throw new Error(response.error.message);
    return response.data;
  }

  async updateAuthor(
    id: string,
    data: Partial<CreateAuthorDTO>
  ): Promise<Author> {
    const response = await this.client
      .from("Author")
      .update(data)
      .eq("id", id)
      .single();

    if (response.error) throw new Error(response.error.message);
    return response.data;
  }
}
