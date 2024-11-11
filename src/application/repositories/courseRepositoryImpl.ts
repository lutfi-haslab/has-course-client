import {
  CourseSchema,
  CourseSchemaWithContent,
  CourseSchemaWithContentFull,
} from "@/entities/models";
import { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

export interface CourseRepository {
  createCourse(data: Course): Promise<Course>;
  getCourse(id: string): Promise<Course>;
  getCourses(): Promise<Course[]>;
  getCoursesByAuthorId(authorId: string): Promise<Course[]>;
  getAllCoursesWithContent(
    id: string,
    fullContent: boolean
  ): Promise<CourseWithContent[] | CourseWithContentFull[]>;
  updateCourse(
    id: string,
    data: Partial<z.infer<typeof CourseSchema>>
  ): Promise<Course>;
}

export type Course = z.infer<typeof CourseSchema>;
export type CourseWithContent = z.infer<typeof CourseSchemaWithContent>;
export type CourseWithContentFull = z.infer<typeof CourseSchemaWithContentFull>;
export type CourseDTO = Omit<
  z.infer<typeof CourseSchema>,
  "id" | "created_at" | "updated_at"
>;

export class CourseRepositoryImpl implements CourseRepository {
  constructor(private client: SupabaseClient) {}

  async createCourse(data: CourseDTO) {
    const response = await this.client.from("Course").insert(data).single();
    if (response.error) throw new Error(response.error.message);
    return response.data;
  }

  async getCourse(id: string) {
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
  ): Promise<CourseWithContent[]> {
    const offset = (page - 1) * limit;
    let response;
    if (fullContent) {
      response = await this.client
        .from("Course")
        .select("*, Section(*, Lesson(*))")
        .eq("id", id)
        .range(offset, offset + limit - 1)
        .order("created_at", { ascending: order === order })
        .single();
    } else {
      response = await this.client
        .from("Course")
        .select(
          "*, Section(id, title, created_at, Lesson(id, title, created_at))"
        )
        .eq("id", id)
        .range(offset, offset + limit - 1)
        .order("created_at", { ascending: order === order })
        .single();
    }
    if (response.error) throw new Error(response.error.message);
    return response.data;
  }

  async updateCourse(id: string, data: Partial<Course>): Promise<any> {
    const response = await this.client
      .from("Course")
      .update(data)
      .eq("id", id)
      .single();
    if (response.error) throw new Error(response.error.message);
    return response.data;
  }
}
