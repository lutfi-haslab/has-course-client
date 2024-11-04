"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Progress } from "@radix-ui/react-progress";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { BookOpen, CheckCircle, FileText, Video } from "lucide-react";
import ReactMarkdown from "react-markdown";
import useOpenCoursePresenter from "./_learningCoursePresenter";

export default function OpenCourse() {
  const {
    courseContent,
    markdownContent,
    activeLesson,
    setActiveLesson,
    totalLessons,
    completedLessons,
    progressPercentage
  } = useOpenCoursePresenter();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Course Sidebar */}
          <div className="lg:w-1/3">
            <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="bg-black text-white p-4">
                <CardTitle className="text-xl font-bold">
                  Course Content
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-4">
                  <Progress
                    value={progressPercentage}
                    className="w-full h-2 bg-gray-200"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    {progressPercentage}% Complete
                  </p>
                </div>
                <ScrollArea className="h-[60vh]">
                  <Accordion type="single" collapsible className="w-full">
                    {courseContent.map((section, sectionIndex) => (
                      <AccordionItem
                        value={`section-${sectionIndex}`}
                        key={sectionIndex}
                      >
                        <AccordionTrigger className="py-4 px-2 hover:bg-gray-50">
                          <div className="flex items-center">
                            {section.completed && (
                              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            )}
                            <span className="font-medium">
                              {section.section}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 pl-4">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <li
                                key={lessonIndex}
                                className={`flex items-center cursor-pointer p-2 rounded ${activeLesson.title === lesson.title ? "bg-purple-100" : "hover:bg-gray-50"}`}
                                onClick={() => setActiveLesson(lesson)}
                              >
                                {lesson.type === "video" && (
                                  <Video className="w-4 h-4 mr-2 text-blue-500" />
                                )}
                                {lesson.type === "pdf" && (
                                  <FileText className="w-4 h-4 mr-2 text-red-500" />
                                )}
                                {lesson.type === "markdown" && (
                                  <BookOpen className="w-4 h-4 mr-2 text-green-500" />
                                )}
                                <span
                                  className={`text-sm ${lesson.completed ? "line-through text-gray-400" : "text-gray-700"}`}
                                >
                                  {lesson.title}
                                </span>
                                {lesson.completed && (
                                  <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                                )}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Lesson Content */}
          <div className="lg:w-2/3">
            <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="bg-black text-white p-4">
                <CardTitle className="text-xl font-bold">
                  {activeLesson.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs defaultValue={activeLesson.type} className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="video" className="px-4 py-2 rounded-md">
                      Video
                    </TabsTrigger>
                    <TabsTrigger value="pdf" className="px-4 py-2 rounded-md">
                      PDF
                    </TabsTrigger>
                    <TabsTrigger
                      value="markdown"
                      className="px-4 py-2 rounded-md"
                    >
                      Reading
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="video">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                      <iframe
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </TabsContent>
                  <TabsContent value="pdf">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="text-gray-700">
                        PDF viewer would be embedded here. For this example,
                        we're using a placeholder.
                      </p>
                      <Button className="mt-4 ">Download PDF</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="markdown">
                    <ScrollArea className="h-[60vh] p-4 bg-gray-50 rounded-lg">
                      <ReactMarkdown className="prose max-w-none">
                        {markdownContent}
                      </ReactMarkdown>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <div className="mt-4 flex justify-between">
              <Button
                variant="outline"
                className="text-black border-black hover:bg-gray-50"
              >
                Previous Lesson
              </Button>
              <Button className="">Next Lesson</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
