"use client";
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { CheckCircle, Video, FileText, BookOpen, GraduationCap, Search, Link } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';
import { Progress } from '@radix-ui/react-progress';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Input } from '@/components/ui/input';



const courseContent = [
  {
    section: "Introduction to React",
    completed: true,
    lessons: [
      { title: "What is React?", type: "video", completed: true },
      { title: "Setting up your development environment", type: "pdf", completed: true },
      { title: "Your first React component", type: "markdown", completed: true },
    ]
  },
  {
    section: "React Fundamentals",
    completed: false,
    lessons: [
      { title: "JSX syntax", type: "video", completed: true },
      { title: "Props and State", type: "markdown", completed: false },
      { title: "Handling events", type: "pdf", completed: false },
    ]
  },
  {
    section: "Advanced React Concepts",
    completed: false,
    lessons: [
      { title: "Hooks in-depth", type: "video", completed: false },
      { title: "Context API", type: "markdown", completed: false },
      { title: "Performance optimization", type: "pdf", completed: false },
    ]
  }
];

const markdownContent = `
# Props and State in React

React components use props and state to manage data.

## Props

Props are read-only and are passed from parent to child components.

Example:
\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

## State

State is mutable and is managed within a component.

Example:
\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`
`;

export default function OpenCourse() {
  const [activeLesson, setActiveLesson] = useState(courseContent[0].lessons[0]);
  const totalLessons = courseContent.reduce((acc, section) => acc + section.lessons.length, 0);
  const completedLessons = courseContent.reduce((acc, section) =>
    acc + section.lessons.filter(lesson => lesson.completed).length, 0);
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link className="flex items-center space-x-2" to="/">
              <GraduationCap className="h-8 w-8 " />
              <span className="text-xl font-bold text-gray-900">LearnHub</span>
            </Link>
            <div className="hidden md:block flex-1 px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-black focus:ring-black"
                  placeholder="Search for anything"
                  type="search"
                />
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <Link className="text-sm font-medium text-gray-700 hover:text-black" to="#">
                Courses
              </Link>
              <Link className="text-sm font-medium text-gray-700 hover:text-black" to="#">
                Pricing
              </Link>
              <Link className="text-sm font-medium text-gray-700 hover:text-black" to="#">
                About
              </Link>
              <Button variant="outline" className="ml-4">Log in</Button>
              <Button className="">Sign up</Button>
            </nav>
            <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Course Sidebar */}
          <div className="lg:w-1/3">
            <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="bg-black text-white p-4">
                <CardTitle className="text-xl font-bold">Course Content</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-4">
                  <Progress value={progressPercentage} className="w-full h-2 bg-gray-200" />
                  <p className="text-sm text-gray-600 mt-2">{progressPercentage}% Complete</p>
                </div>
                <ScrollArea className="h-[60vh]">
                  <Accordion type="single" collapsible className="w-full">
                    {courseContent.map((section, sectionIndex) => (
                      <AccordionItem value={`section-${sectionIndex}`} key={sectionIndex}>
                        <AccordionTrigger className="py-4 px-2 hover:bg-gray-50">
                          <div className="flex items-center">
                            {section.completed && <CheckCircle className="w-4 h-4 mr-2 text-green-500" />}
                            <span className="font-medium">{section.section}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 pl-4">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <li key={lessonIndex}
                                className={`flex items-center cursor-pointer p-2 rounded ${activeLesson.title === lesson.title ? 'bg-purple-100' : 'hover:bg-gray-50'}`}
                                onClick={() => setActiveLesson(lesson)}>
                                {lesson.type === 'video' && <Video className="w-4 h-4 mr-2 text-blue-500" />}
                                {lesson.type === 'pdf' && <FileText className="w-4 h-4 mr-2 text-red-500" />}
                                {lesson.type === 'markdown' && <BookOpen className="w-4 h-4 mr-2 text-green-500" />}
                                <span className={`text-sm ${lesson.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>{lesson.title}</span>
                                {lesson.completed && <CheckCircle className="w-4 h-4 ml-2 text-green-500" />}
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
                <CardTitle className="text-xl font-bold">{activeLesson.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs defaultValue={activeLesson.type} className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="video" className="px-4 py-2 rounded-md">Video</TabsTrigger>
                    <TabsTrigger value="pdf" className="px-4 py-2 rounded-md">PDF</TabsTrigger>
                    <TabsTrigger value="markdown" className="px-4 py-2 rounded-md">Reading</TabsTrigger>
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
                      <p className="text-gray-700">PDF viewer would be embedded here. For this example, we're using a placeholder.</p>
                      <Button className="mt-4 ">Download PDF</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="markdown">
                    <ScrollArea className="h-[60vh] p-4 bg-gray-50 rounded-lg">
                      <ReactMarkdown className="prose max-w-none">{markdownContent}</ReactMarkdown>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <div className="mt-4 flex justify-between">
              <Button variant="outline" className="text-black border-black hover:bg-gray-50">Previous Lesson</Button>
              <Button className="">Next Lesson</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}