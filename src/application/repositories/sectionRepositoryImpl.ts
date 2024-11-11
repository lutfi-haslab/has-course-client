import { SupabaseClient } from "@supabase/supabase-js";
import { SectionSchema } from "@/entities/models";
import { z } from "zod";

export interface SectionRepository {
  createSection(data: z.infer<typeof SectionSchema>): Promise<Section>;
  getSection(id: string): Promise<Section>;
  updateSection(
    id: string,
    data: Partial<z.infer<typeof SectionSchema>>
  ): Promise<Section>;
  getAllSections(): Promise<Section[]>;
  getSectionsByCourseId(courseId: string): Promise<Section[]>;
}

export type Section = z.infer<typeof SectionSchema>;
export type CreateSectionDTO = Omit<Section, "id">;

export class SectionRepositoryImpl implements SectionRepository {
  constructor(private client: SupabaseClient) {}
  async getAllSections(): Promise<Section[]> {
    const response = await this.client.from("Section").select("*");
    if (response.error)
      throw new Error(
        JSON.stringify({
          msg: [response.error.message, response.error.details],
          status: response.status,
        })
      );
    return response.data;
  }
  async getSectionsByCourseId(courseId: string): Promise<Section[]> {
    const response = await this.client
      .from("Section")
      .select("*")
      .eq("course_id", courseId);
    if (response.error)
      throw new Error(
        JSON.stringify({
          msg: [response.error.message, response.error.details],
          status: response.status,
        })
      );
    return response.data;
  }

  async createSection(data: CreateSectionDTO) {
    const response = await this.client.from("Section").insert(data).single();
    if (response.error)
      throw new Error(
        JSON.stringify({
          msg: [response.error.message, response.error.details],
          status: response.status,
        })
      );
    return response.data;
  }

  async getSection(id: string): Promise<any> {
    const response = await this.client
      .from("Section")
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

  async updateSection(
    id: string,
    data: Partial<z.infer<typeof SectionSchema>>
  ): Promise<any> {
    const response = await this.client
      .from("Section")
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
