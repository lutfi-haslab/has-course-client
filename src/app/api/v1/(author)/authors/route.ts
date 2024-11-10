import { AuthorService } from "@/application/services/authorsService";

export async function GET(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("user_id");
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const limit = parseInt(url.searchParams.get("limit") ?? "10");
    const order = url.searchParams.get("order") ?? "asc";

    const service = await AuthorService.create();
    const response = userId
      ? await service.getAuthorsByUserId(userId, page, limit, order)
      : await service.getAuthors(page, limit);

    return Response.json({
      code: 200,
      status: "success",
      message: "Authors fetched successfully",
      ...response,
    });
  } catch (error) {
    return Response.json({
      code: 500,
      status: "error",
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      data: null,
    });
  }
}
