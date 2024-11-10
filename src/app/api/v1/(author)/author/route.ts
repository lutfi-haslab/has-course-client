import { AuthorService } from "@/application/services/authorsService";
import { AuthorSchema } from "@/entities/models";
import { TypeOf } from "zod";

export async function POST(req: Request) {
  const service = await AuthorService.create();
  const body = (await req.json()) as TypeOf<typeof AuthorSchema>;

  try {
    const data = await service.createAuthor(body);

    return Response.json({
      code: 201,
      status: "success",
      data,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({
      code: 500,
      status: "error",
      message:
        error === null || undefined
          ? "An unexpected error occurred while processing your request. Please try again later."
          : error,
    });
  }
}
