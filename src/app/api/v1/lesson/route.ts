import { LessonSchema } from "@/entities/models";
import { LessonsService } from "@/services/lessonsService";
import { TypeOf } from "zod";

export async function POST(req: Request) {
  const service = await LessonsService();
  const body = (await req.json()) as TypeOf<typeof LessonSchema>;

  try {
    const data = await service.createLesson(body);

    return Response.json({
      code: 201,
      status: "success",
      data,
      message: "Lesson created successfully",
    });
  } catch (error: any) {
    const errorMessage = JSON.parse(error?.message);
    return Response.json({
      code: errorMessage.status || 500,
      status: "error",
      message:
        errorMessage.msg ||
        "An unexpected error occurred while processing your request. Please try again later.",
    });
  }
}
