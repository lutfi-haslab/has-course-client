"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, Menu, Plus, PlusCircle, User, X } from "lucide-react";
import { useProfile } from "../(context)/_useProfile";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import MiniHeaderClient from "@/components/layout/MiniHeaderClient";
import Link from "next/link";
import { Course } from "@/application/repositories/courseRepositoryImpl";
import { useState } from "react";

const AuthorCourseManagement = () => {
  const { state, actions } = useProfile();
  const [activeView, setActiveView] = useState("authors");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isSelected = (id: string, selectedId: string) => id === selectedId;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const CourseCard = ({ course }: {
    course: Course
  }) => (
    <Card
      key={course.id}
      className={`cursor-pointer hover:shadow-lg transition-all duration-200 flex flex-col md:flex-row h-full ${
        isSelected(course.id, state.selectedCourseId)
          ? "border-2 border-primary"
          : "border-gray-200"
      }`}
      onClick={() => {
        actions.selectCourse(course.id);
        setActiveView("sections");
      }}
    >
      {course.banner_img && (
        <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
          <img
            src={course.banner_img}
            alt={course.title}
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
      )}
      <div className="flex-1 p-6">
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {course.description}
        </p>
        <div className="flex gap-2 flex-wrap mb-4">
          {course.tags?.map((tag: any) => (
            <Badge key={tag?.toString()} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="space-y-2">
          {course?.checklist?.slice(0, 3).map((item: any, index: any) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-primary" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );

  const ContentCard = ({ item, type, onClick }: any) => (
    <Card
      className={`w-full cursor-pointer hover:shadow-lg transition-all duration-200 ${
        isSelected(item.id, type)
          ? "border-2 border-primary"
          : "border-gray-200"
      }`}
      onClick={onClick}
    >
      <CardHeader>
        <h3 className="text-lg font-semibold">{item.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
          {item.description}
        </p>
      </CardContent>
    </Card>
  );

  const renderSectionList = () => (
    <div className="space-y-4">
      {state.sections?.data?.map((section) => (
        <ContentCard
          key={section.id}
          item={section}
          type={state.selectedSectionId}
          onClick={() => {
            actions.selectSection(section.id);
            setActiveView("lessons");
          }}
        />
      ))}
    </div>
  );

  const renderLessonList = () => (
    <div className="space-y-4">
      {state.lessons?.data?.map((lesson) => (
        <ContentCard
          key={lesson.id}
          item={lesson}
          type={state.selectedLessonId}
          onClick={() => actions.selectLesson(lesson.id)}
        />
      ))}
    </div>
  );

  const renderAddDialog = (type: any) => {
    const config = {
      author: {
        title: "Add New Author",
        fields: [
          { name: "name", label: "Name", type: "input" },
          { name: "org_name", label: "Organization Name", type: "input" },
          { name: "bio", label: "Bio", type: "textarea" },
        ],
        action: actions.addAuthor,
        appState: state.authorDTO,
        setState: actions.setAuthorData,
      },
      course: {
        title: "Add New Course",
        fields: [
          { name: "title", label: "Title", type: "input" },
          { name: "banner_img", label: "Image URL", type: "input" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "tags", label: "Tags (comma-separated)", type: "input" },
          {
            name: "checklist",
            label: "Checklist (one item per line)",
            type: "textarea",
          },
        ],
        action: actions.addCourse,
        appState: state.courseDTO,
        setState: actions.setCourseData,
      },
      section: {
        title: "Add New Section",
        fields: [
          { name: "title", label: "Section Title", type: "input" },
          {
            name: "description",
            label: "Section Description",
            type: "textarea",
          },
        ],
        action: actions.addSection,
        appState: state.sectionDTO,
        setState: actions.setSectionData,
      },
      lesson: {
        title: "Add New Lesson",
        fields: [
          { name: "title", label: "Lesson Title", type: "input" },
          { name: "content_url", label: "Content URL", type: "input" },
          {
            name: "description",
            label: "Lesson Description",
            type: "textarea",
          },
        ],
        action: actions.addLesson,
        appState: state.lessonDTO,
        setState: actions.setLessonData,
      },
    };

    const { title, fields, action, appState, setState } = config[type as "author" | "course" | "section" | "lesson"];

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" /> Add {type}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-2">
            {fields.map((field) => (
              field.type === "input"
                ? (
                  <Input
                    key={field.name}
                    placeholder={field.label}
                    // @ts-ignore
                    value={appState?.[field?.name] || ""}
                    onChange={(e) =>
                      // @ts-ignore
                      setState({ ...state, [field.name]: e.target.value })}
                  />
                )
                : (
                  <Textarea
                    key={field.name}
                    placeholder={field.label}
                    // @ts-ignore
                    value={appState?.[field.name] || ""}
                    onChange={(e) =>
                      // @ts-ignore
                      setState({ ...state, [field?.name]: e.target.value })}
                  />
                )
            ))}
          </div>
          <DialogFooter>
            <Button onClick={action}>Add {type}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const renderContent = () => {
    switch (activeView) {
      case "courses":
        return (
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Courses</h2>
              {renderAddDialog("course")}
            </div>
            <div className="space-y-6">
              {state.courses?.data?.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        );
      case "sections":
        return (
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sections</h2>
              {renderAddDialog("section")}
            </div>
            {renderSectionList()}
          </div>
        );
      case "lessons":
        return (
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Lessons</h2>
              {renderAddDialog("lesson")}
            </div>
            {renderLessonList()}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-1 max-w-full dark:bg-gray-900">
      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-lg"
        onClick={toggleSidebar}
      >
        {isSidebarOpen
          ? <X className="h-6 w-6" />
          : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative w-64 h-screen transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar variant="sidebar" className="w-[16vw] h-full border-r">
          <SidebarHeader className="p-4">
            <Link className="flex items-center space-x-2" href="/">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">LearnHub</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {state.authors?.data?.map((author) => (
                <SidebarMenuItem key={author.id}>
                  <SidebarMenuButton
                    isActive={isSelected(author.id, state.selectedAuthorId)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      actions.selectAuthor(author.id);
                      setActiveView("courses");
                      setIsSidebarOpen(false);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{author.name}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <div className="p-4">
            <Button
              className="w-full"
              onClick={() => renderAddDialog("author")}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Author
            </Button>
          </div>
        </Sidebar>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <MiniHeaderClient />
        <div className="w-[84vw] h-screen overflow-y-auto">
          <div className="p-6 mt-16 ">
            <div className="mb-6 flex space-x-2  pb-2">
              <Button
                variant={activeView === "courses" ? "default" : "outline"}
                onClick={() => setActiveView("courses")}
                disabled={!state.selectedAuthorId}
              >
                Courses
              </Button>
              <Button
                variant={activeView === "sections" ? "default" : "outline"}
                onClick={() => setActiveView("sections")}
                disabled={!state.selectedCourseId}
              >
                Sections
              </Button>
              <Button
                variant={activeView === "lessons" ? "default" : "outline"}
                onClick={() => setActiveView("lessons")}
                disabled={!state.selectedSectionId}
              >
                Lessons
              </Button>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCourseManagement;
