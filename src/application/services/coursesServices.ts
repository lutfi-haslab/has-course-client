import { getSupabaseClient, withSentrySpan } from "@/utils/withSentry";
import { CourseRepository, CourseRepositoryImpl } from "../repositories/courseRepositoryImpl";
import { z } from "zod";
import { CourseSchema } from "@/entities/models";

export class CourseService {
  private constructor(private repository: CourseRepository) {}

  static async create(): Promise<CourseService> {
    const client = await getSupabaseClient();
    return new CourseService(new CourseRepositoryImpl(client));
  }

  createCourse(data: z.infer<typeof CourseSchema>) {
    return withSentrySpan("CourseService > createCourse", () => this.repository.createCourse(data));
  }

  getCourses() {
    return withSentrySpan("CourseService > getCourses", () => this.repository.getCourses());
  }

  getCourse(id: string) {
    return withSentrySpan("CourseService > getCourse", () => this.repository.getCourse(id));
  }

  getCoursesByAuthorId(authorId: string) {
    return withSentrySpan("CourseService > getCoursesByAuthorId", () => this.repository.getCoursesByAuthorId(authorId));
  }

  getAllCoursesWithContent(id: string, fullContent: boolean) {
    return withSentrySpan("CourseService > getAllCoursesWithContent", () => this.repository.getAllCoursesWithContent(id, fullContent));
  }

  updateCourse(id: string, data: Partial<z.infer<typeof CourseSchema>>) {
    return withSentrySpan("CourseService > updateCourse", () => this.repository.updateCourse(id, data));
  }
}
