import { SupabaseClient } from "@supabase/supabase-js";
import { LessonSchema } from "@/entities/models";
import { z } from "zod";

export interface LessonRepository {
  createLesson(data: LessonDTO): Promise<Lesson>;
  getLesson(id: string): Promise<Lesson>;
  updateLesson(id: string, data: Partial<Lesson>): Promise<Lesson>;
  getAllLessons(): Promise<Lesson[]>;
  getLessonsByCourseId(sectionId: string): Promise<Lesson[]>;
}

export type Lesson = z.infer<typeof LessonSchema>;
export type LessonDTO = Omit<Lesson, "id" | "created_at" | "updated_at">;

export class LessonRepositoryImpl implements LessonRepository {
  constructor(private client: SupabaseClient) {}

  async getAllLessons(): Promise<Lesson[]> {
    const response = await this.client.from("Lesson").select("*");
    if (response.error)
      throw new Error(
        JSON.stringify({
          msg: [response.error.message, response.error.details],
          status: response.status,
        })
      );
    return response.data;
  }
  async getLessonsByCourseId(sectionId: string): Promise<Lesson[]> {
    const response = await this.client
      .from("Lesson")
      .select("*")
      .eq("section_id", sectionId);
    if (response.error)
      throw new Error(
        JSON.stringify({
          msg: [response.error.message, response.error.details],
          status: response.status,
        })
      );
    return response.data;
  }

  async createLesson(data: LessonDTO): Promise<any> {
    const response = await this.client.from("Lesson").insert(data).single();
    if (response.error)
      throw new Error(
        JSON.stringify({
          msg: [response.error.message, response.error.details],
          status: response.status,
        })
      );
    return response.data;
  }

  async getLesson(id: string): Promise<any> {
    const response = await this.client
      .from("Lesson")
      .select("*")
      .eq("id", id)
      .single();
    if (response.error)
      throw new Error(
        JSON.stringify({
          msg: [response.error.message, response.error.details],
          status: response.status,
        })
      );
    return response.data;
  }

  async updateLesson(
    id: string,
    data: Partial<Lesson>
  ): Promise<any> {
    const response = await this.client
      .from("Lesson")
      .update(data)
      .eq("id", id)
      .single();
    if (response.error)
      throw new Error(
        JSON.stringify({
          msg: [response.error.message, response.error.details],
          status: response.status,
        })
      );
    return response.data;
  }
}
