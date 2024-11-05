import { CoursesService } from "@/services/courseServices";

export async function POST(req: Request) {
  const service = await CoursesService();
  const body = await req.json();

  try {
    const createdData = await service.createCourse(body);

    return Response.json({
      code: 201,
      status: "success",
      data: createdData,
      messages: "Course created successfully",
    });
  } catch (error) {
    return Response.json({
      code: 500,
      status: "error",
      messages: "Internal server error",
    });
  }
}
