import { Section } from "@/entities/models/course";
import { SectionsService } from "@/services/sectionService";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const service = await SectionsService();
  const body = (await req.json()) as Section;

  try {
    const getData = await service.getSection(id);

    return Response.json({
      code: 200,
      status: "success",
      data: getData,
      messages: "Section Course fetched successfully",
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
  const service = await SectionsService();
  const body = (await req.json()) as Partial<Section>;

  try {
    const getData = await service.updateSection(id, body);

    return Response.json({
      code: 201,
      status: "success",
      data: getData,
      messages: "Section Course updated successfully",
    });
  } catch (error) {
    return Response.json({
      code: 500,
      status: "error",
      messages: "Internal server error",
    });
  }
}
