import { LessonsService } from "@/application/services/lessonsService";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sectionId = url.searchParams.get("section_id");
  const service = await LessonsService.create();
  let data;

  if (sectionId) {
    data = await service.getLessons(sectionId);
  } else {
    data = await service.getLessons();
  }

  return Response.json({
    code: 200,
    status: "success",
    data,
    messages: "Lessons fetched successfully",
  });
}
