import { Course } from "@/application/repositories/courseRepositoryImpl";
import { CourseService } from "@/application/services/coursesServices";

export async function POST(req: Request) {
  const service = await CourseService.create();
  const body = (await req.json()) as Course;

  try {
    const data = await service.createCourse(body);
    return Response.json({
      code: 201,
      status: "success",
      data,
      message: "Course created successfully",
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
