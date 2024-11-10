import { SupabaseClient } from "@supabase/supabase-js";
import { CourseSchema } from "@/entities/models";
import { z } from "zod";

export interface CourseRepository {
  createCourse(data: z.infer<typeof CourseSchema>): Promise<any>;
  getCourse(id: string): Promise<any>;
  getCourses(): Promise<any>;
  getCoursesByAuthorId(authorId: string): Promise<any>;
  getAllCoursesWithContent(id: string, fullContent: boolean): Promise<any>;
  updateCourse(
    id: string,
    data: Partial<z.infer<typeof CourseSchema>>
  ): Promise<any>;
}

export class CourseRepositoryImpl implements CourseRepository {
  constructor(private client: SupabaseClient) {}

  async createCourse(data: z.infer<typeof CourseSchema>): Promise<any> {
    const response = await this.client.from("Course").insert(data).single();
    if (response.error) throw new Error(response.error.message);
    return response.data;
  }

  async getCourse(id: string): Promise<any> {
    const response = await this.client
      .from("Course")
      .select("*")
      .eq("id", id)
      .single();
    if (response.error) throw new Error(response.error.message);
    return response.data;
  }

  async getCourses(): Promise<any> {
    const response = await this.client.from("Course").select("*");
    if (response.error) throw new Error(response.error.message);
    return response.data;
  }

  async getCoursesByAuthorId(
    authorId: string,
    page = 1,
    limit = 10,
    order = "asc"
  ): Promise<any> {
    const offset = (page - 1) * limit;
    const response = await this.client
      .from("Course")
      .select("*")
      .eq("author_id", authorId)
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: order === order });
    if (response.error) throw new Error(response.error.message);
    return response.data;
  }

  async getAllCoursesWithContent(
    id: string,
    fullContent: boolean,
    page = 1,
    limit = 10,
    order = "asc"
  ): Promise<any> {
    const offset = (page - 1) * limit;
    let response;
    if (fullContent) {
      response = await this.client
        .from("Course")
        .select("*, Section(*, Lesson(*))")
        .eq("id", id)
        .range(offset, offset + limit - 1)
        .order("created_at", { ascending: order === order });
    } else {
      response = await this.client
        .from("Course")
        .select(
          "*, Section(id, title, created_at, Lesson(id, title, created_at))"
        )
        .eq("id", id)
        .range(offset, offset + limit - 1)
        .order("created_at", { ascending: order === order });
    }
    if (response.error) throw new Error(response.error.message);
    return response.data;
  }

  async updateCourse(
    id: string,
    data: Partial<z.infer<typeof CourseSchema>>
  ): Promise<any> {
    const response = await this.client
      .from("Course")
      .update(data)
      .eq("id", id)
      .single();
    if (response.error) throw new Error(response.error.message);
    return response.data;
  }
}
