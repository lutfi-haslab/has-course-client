import { CoursesService } from "@/services/courseServices";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  const service = await CoursesService();
  const data = await service.getCourse(id);

  return Response.json({
    code: 200,
    status: "success",
    data,
    messages: "Course fetched successfully",
  });
}

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  const service = await CoursesService();
  const body = await req.json();

  try {
    const updatedData = await service.updateCourse(id, body);

    return Response.json({
      code: 201,
      status: "success",
      data: updatedData,
      messages: "Course updated successfully",
    });
  } catch (error) {
    return Response.json({
      code: 500,
      status: "error",
      messages: "Internal server error",
    });
  }
}
