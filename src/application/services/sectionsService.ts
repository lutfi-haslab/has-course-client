import { SectionSchema } from "@/entities/models";
import { getSupabaseClient, withSentrySpan } from "@/utils/withSentry";
import { z } from "zod";
import {
  SectionRepository,
  SectionRepositoryImpl,
} from "../repositories/sectionRepositoryImpl";

export class SectionService {
  private constructor(private repository: SectionRepository) {}

  static async create(): Promise<SectionService> {
    const client = await getSupabaseClient();
    return new SectionService(new SectionRepositoryImpl(client));
  }

  async createSection(data: z.infer<typeof SectionSchema>) {
    return withSentrySpan("SectionsService > createSection", async () =>
      this.repository.createSection(data)
    );
  }

  async getSection(id: string) {
    return withSentrySpan("SectionsService > getSection", async () =>
      this.repository.getSection(id)
    );
  }

  async getSections(courseId?: string) {
    if (!courseId)
      return withSentrySpan("SectionsService > getSections", async () =>
        this.repository.getAllSections()
      );
    return withSentrySpan("SectionsService > getSectionsByCourseId", async () =>
      this.repository.getSectionsByCourseId(courseId)
    );
  }

  async updateSection(
    id: string,
    data: Partial<z.infer<typeof SectionSchema>>
  ) {
    return withSentrySpan("SectionsService > updateSection", async () =>
      this.repository.updateSection(id, data)
    );
  }
}
