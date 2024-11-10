import { CourseService } from "@/application/services/coursesServices";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const authorId = url.searchParams.get("author_id");
  const service = await CourseService.create();
  let data;

  if (authorId) {
    data = await service.getCoursesByAuthorId(authorId);
  } else {
    data = await service.getCourses();
  }

  return Response.json({
    code: 200,
    status: "success",
    data,
    messages: "Courses fetched successfully",
  });
}
