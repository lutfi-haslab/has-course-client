import { CoursesService } from "@/services/coursesServices";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const authorId = url.searchParams.get("author_id");
  const service = await CoursesService();
  let data;

  if (authorId) {
    data = await service.getCoursesByAuthorId(authorId);
  } else {
    data = await service.getCourses();
  }

  console.log("data", data);

  return Response.json({
    code: 200,
    status: "success",
    data,
    messages: "Courses fetched successfully",
  });
}
