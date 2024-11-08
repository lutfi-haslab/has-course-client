import { Lesson } from "@/entities/models/course";
import { LessonsService } from "@/services/courseLessonServices";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const service = await LessonsService();

  try {
    const getData = await service.getLesson(id);

    return Response.json({
      code: 200,
      status: "success",
      data: getData,
      messages: "Lesson Section fetched successfully",
    });
  } catch (error) {
    return Response.json({
      code: 500,
      status: "error",
      messages: "Internal server error",
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const service = await LessonsService();
  const body = (await req.json()) as Partial<Lesson>;

  try {
    const getData = await service.updateLesson(id, body);

    return Response.json({
      code: 201,
      status: "success",
      data: getData,
      messages: "Lesson Section updated successfully",
    });
  } catch (error) {
    return Response.json({
      code: 500,
      status: "error",
      messages: "Internal server error",
    });
  }
}
