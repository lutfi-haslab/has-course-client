import { AuthorsService } from "@/services/authorsService";

export async function GET(req: Request) {
  const service = await AuthorsService();
  const data = await service.getAuthors();

  return Response.json({
    code: 200,
    status: "success",
    data,
    messages: "Auhtors fetched successfully",
  });
}
