import { UserSchema } from "@/entities/models";
import { UsersService } from "@/application/services/usersService";
import { TypeOf } from "zod";

export async function POST(req: Request) {
  const service = await UsersService();
  const body = (await req.json()) as TypeOf<typeof UserSchema>;

  try {
    const data = await service.createUser(body);

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
      message: "An unexpected error occurred while processing your request. Please try again later.",
    });
  }
}
