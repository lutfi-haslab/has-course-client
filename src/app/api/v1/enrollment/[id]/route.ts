// import { CourseEnrollment, Section } from "@/entities/models/course";
// import { CourseEnrollmentsService } from "@/services/courseEnrollmentServices";
// import { SectionsService } from "@/services/sectionService";

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;
//   const service = await CourseEnrollmentsService();

//   try {
//     const getData = await service.getCourseEnrollment(id);

//     return Response.json({
//       code: 200,
//       status: "success",
//       data: getData,
//       messages: "Course Enrollment fetched successfully",
//     });
//   } catch (error) {
//     return Response.json({
//       code: 500,
//       status: "error",
//       messages: "Internal server error",
//     });
//   }
// }

// export async function PUT(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;
//   const service = await CourseEnrollmentsService();
//   const body = (await req.json()) as Partial<CourseEnrollment>;

//   try {
//     const getData = await service.updateCourseEnrollment(id, body);

//     return Response.json({
//       code: 201,
//       status: "success",
//       data: getData,
//       messages: "Course Enrollment updated successfully",
//     });
//   } catch (error) {
//     return Response.json({
//       code: 500,
//       status: "error",
//       messages: "Internal server error",
//     });
//   }
// }

export async function GET(req: Request) {
  // Dummy response for GET request
  return Response.json({
    code: 200,
    status: "success",
    data: { id: 1, message: "This is a dummy GET response" },
    messages: "Dummy data fetched successfully",
  });
}
