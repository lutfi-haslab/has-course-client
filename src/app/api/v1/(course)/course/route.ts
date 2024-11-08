import { CourseSchema } from "@/entities/models";
import { CoursesService } from "@/services/coursesServices";
import { PostgrestError } from "@supabase/supabase-js";
import { TypeOf } from "zod";

export async function POST(req: Request) {
  const service = await CoursesService();
  const body = (await req.json()) as TypeOf<typeof CourseSchema>;

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
