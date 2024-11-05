import { CoursesService } from "@/services/courseServices";

export async function GET() {
  const service = await CoursesService();
  const data = await service.getCourses();
  console.log("data", data);  

  return Response.json({
    code: 200,
    status: "success",
    data,
    messages: "User registered successfully",
  });
}
