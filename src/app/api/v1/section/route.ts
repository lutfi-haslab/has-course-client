import { SectionSchema } from "@/entities/models";
import { SectionsService } from "@/application/services/sectionsService";
import { TypeOf } from "zod";

export async function POST(req: Request) {
  const service = await SectionsService();
  const body = (await req.json()) as TypeOf<typeof SectionSchema>;

  try {
    const data = await service.createSection(body);

    return Response.json({
      code: 201,
      status: "success",
      data,
      message: "Section created successfully",
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
