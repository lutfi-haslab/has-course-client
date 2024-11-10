import { CourseService } from "@/application/services/coursesServices";
import { CourseSchemaWithContent } from "@/entities/models";
import { TypeOf } from "zod";

const page = async ({ params }: { params: { id: string } }) => {
  console.log("params", params);
  const id = params.id;
  const service = await CourseService.create();
  let data = await service.getAllCoursesWithContent(id, false);

  const testInterval = () => {
    const intervalId = setInterval(() => {
      console.log("This is a dummy interval");
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      console.log("Interval cleared");
    }, 5000);
  };
  testInterval();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {data.map((item: TypeOf<typeof CourseSchemaWithContent>) => (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
            <p className="text-gray-700 mb-4">{item.description}</p>
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-600">
                Tags:{" "}
              </span>
              <span className="text-sm text-gray-600">
                {item.tags?.map((tag) => tag)}
              </span>
            </div>
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-600">
                Price:{" "}
              </span>
              <span className="text-sm text-gray-600">{item.price} IDR</span>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Checklist</h2>
              <ul className="list-disc list-inside text-gray-700">
                {item.checklist?.map((list) => <li>{list}</li>)}
              </ul>
            </div>
            {item.Section.map((section) => (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Sections</h2>
                <div className="mb-2">
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {section.Lesson.map((lesson) => <li>{lesson.title}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
