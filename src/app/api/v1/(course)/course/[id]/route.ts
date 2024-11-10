import { CourseService } from "@/application/services/coursesServices";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  const url = new URL(req.url);
  const withContent = url.searchParams.get("with_content");
  const fullContent = url.searchParams.get("full_content");
  let data;
  const service = await CourseService.create();

  if (withContent === "true") {
    if (fullContent === "true") {
      data = await service.getAllCoursesWithContent(id, true);
    } else {
      data = await service.getAllCoursesWithContent(id, false);
    }
  } else {
    data = await service.getCourse(id);
  }

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
  const service = await CourseService.create();
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
