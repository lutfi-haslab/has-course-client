import { SectionService } from "@/application/services/sectionsService";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const courseId = url.searchParams.get("course_id");
  const service = await SectionService.create();
  let data;

  if (courseId) {
    data = await service.getSections(courseId);
  } else {
    data = await service.getSections();
  }

  return Response.json({
    code: 200,
    status: "success",
    data,
    messages: "Sections fetched successfully",
  });
}
