import { LessonSchema } from "@/entities/models";
import { getSupabaseClient, withSentrySpan } from "@/utils/withSentry";
import { z } from "zod";
import {
  LessonRepository,
  LessonRepositoryImpl,
} from "../repositories/lessonRepositoryImpl";

export class LessonsService {
  private constructor(private repository: LessonRepository) {}

  static async create(): Promise<LessonsService> {
    const client = await getSupabaseClient();
    return new LessonsService(new LessonRepositoryImpl(client));
  }

  async createLesson(data: z.infer<typeof LessonSchema>) {
    return withSentrySpan("LessonsService > createLesson", () =>
      this.repository.createLesson(data)
    );
  }

  async getLesson(id: string) {
    return withSentrySpan("LessonsService > getLesson", () =>
      this.repository.getLesson(id)
    );
  }

  async getLessons(sectionId?: string) {
    if (!sectionId)
      return withSentrySpan("LessonsService > getLessons", async () =>
        this.repository.getAllLessons()
      );
    return withSentrySpan("LessonsService > getLessonsBySectionId", async () =>
      this.repository.getLessonsByCourseId(sectionId)
    );
  }

  async updateLesson(id: string, data: Partial<z.infer<typeof LessonSchema>>) {
    return withSentrySpan("LessonsService > updateLesson", () =>
      this.repository.updateLesson(id, data)
    );
  }
}
