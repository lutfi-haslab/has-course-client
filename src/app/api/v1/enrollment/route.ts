import { EnrollmentSchema } from "@/entities/models";
import { EnrollmentsService } from "@/services/enrollmentsService";
import { TypeOf } from "zod";

export async function POST(req: Request) {
  const service = await EnrollmentsService();
  const body = (await req.json()) as TypeOf<typeof EnrollmentSchema>;

  try {
    const data = await service.createEnrollment(body);

    return Response.json({
      code: 201,
      status: "success",
      data,
      message: "Course enroll successfully",
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return Response.json({
      code: 500,
      status: "error",
      message: "An unexpected error occurred while processing your request. Please try again later.",
    });
  }
}
