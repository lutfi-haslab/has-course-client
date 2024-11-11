"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, User } from "lucide-react";
import { useProfile } from "../(context)/_useProfile";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AuthorCourseManagement = () => {
  const { state, actions } = useProfile();

  // Helper function to determine if an item is selected
  const isSelected = (id, selectedId) => id === selectedId;

  return (
    <div className="p-6 max-w-7xl mx-auto flex">
      {/* Sidebar for Authors */}
      <div className="w-1/4 pr-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Authors</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Author</DialogTitle>
              </DialogHeader>
              <div className="space-y-2 mt-2">
                <Input
                  placeholder="Name"
                  value={state.authorDTO?.name}
                  onChange={(e) =>
                    actions.setAuthorData({ ...state.authorDTO, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Organization Name"
                  value={state.authorDTO?.org_name}
                  onChange={(e) =>
                    actions.setAuthorData({ ...state.authorDTO, org_name: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Bio"
                  value={state.authorDTO?.bio}
                  onChange={(e) =>
                    actions.setAuthorData({ ...state.authorDTO, bio: e.target.value })
                  }
                />
              </div>
              <DialogFooter>
                <Button onClick={actions.addAuthor}>Add Author</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Author List */}
        <div className="space-y-4">
          {state.authors?.data.map((author) => (
            <Card
              key={author.id}
              className={`cursor-pointer hover:shadow-lg transition-shadow ${isSelected(author.id, state.selectedAuthorId) ? 'border-2 border-blue-500' : ''}`}
              onClick={() => actions.selectAuthor(author.id)}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <User className="w-8 h-8" />
                <div>
                  <h2 className="text-xl font-semibold">{author.name}</h2>
                  {author.is_org && <Badge>{author.org_name}</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{author.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content for Courses */}
      <div className="w-3/4">
        {state.selectedAuthorId && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Courses</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2 mt-2">
                    <Input
                      placeholder="Title"
                      value={state.courseDTO?.title}
                      onChange={(e) =>
                        actions.setCourseData({ ...state.courseDTO, title: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Image URL"
                      value={state.courseDTO?.banner_img}
                      onChange={(e) =>
                        actions.setCourseData({ ...state.courseDTO, banner_img: e.target.value })
                      }
                    />
                    <Textarea
                      placeholder="Description"
                      value={state.courseDTO?.description}
                      onChange={(e) =>
                        actions.setCourseData({ ...state.courseDTO, description: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Tags (comma-separated)"
                      value={state.courseDTO?.tags?.join(", ")}
                      onChange={(e) => {
                        const tagsArray = e.target.value.split(",").map((tag) => tag.trim());
                        actions.setCourseData({ ...state.courseDTO, tags: tagsArray });
                      }}
                    />
                    <Textarea
                      placeholder="Checklist (one item per line)"
                      value={state.courseDTO?.checklist?.join(", ")}
                      onChange={(e) => {
                        const checklistArray = e.target.value.split(",").map((item) => item.trim());
                        actions.setCourseData({ ...state.courseDTO, checklist: checklistArray });
                      }}
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={actions.addCourse}>Add Course</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Course List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.courses?.data?.map((course) => (
                <Card
                  key={course.id}
                  className={`cursor-pointer hover:shadow-lg transition-shadow ${isSelected(course.id, state.selectedCourseId) ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => actions.selectCourse(course.id)}
                >
                  {course.banner_img && (
                    <img
                      src={course.banner_img}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <CardHeader>
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <div className="flex gap-2 flex-wrap">
                      {course.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <ul className="list-disc list-inside">
                      {course?.checklist?.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Sections and Lessons */}
        {state.selectedCourseId && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Sections</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Section</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2 mt-2">
                    <Input
                      placeholder="Section Title"
                      value={state.sectionDTO?.title}
                      onChange={(e) =>
                        actions.setSectionData({ ...state.sectionDTO, title: e.target.value })
                      }
                    />
                    <Textarea
                      placeholder="Section Description"
                      value={state.sectionDTO?.description}
                      onChange={(e) =>
                        actions.setSectionData({ ...state.sectionDTO, description: e.target.value })
                      }
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={actions.addSection}>Add Section</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Section List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.sections?.data?.map((section) => (
                <Card
                  key={section.id}
                  className={`cursor-pointer hover:shadow-lg transition-shadow ${isSelected(section.id, state.selectedSectionId) ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => actions.selectSection(section.id)}
                >
                  <CardHeader>
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{section.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {state.selectedSectionId && (
              <div className="mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Lessons</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <PlusCircle className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Lesson</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 mt-2">
                        <Input
                          placeholder="Lesson Title"
                          value={state.lessonDTO?.title}
                          onChange={(e) =>
                            actions.setLessonData({ ...state.lessonDTO, title: e.target.value })
                          }
                        />
                        <Input
                          placeholder="Content URL"
                          value={state.lessonDTO?.content_url}
                          onChange={(e) =>
                            actions.setLessonData({ ...state.lessonDTO, content_url: e.target.value })
                          }
                        />
                        <Textarea
                          placeholder="Lesson Description"
                          value={state.lessonDTO?.description}
                          onChange={(e) =>
                            actions.setLessonData({ ...state.lessonDTO, description: e.target.value })
                          }
                        />
                      </div>
                      <DialogFooter>
                        <Button onClick={actions.addLesson}>Add Lesson</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Lesson List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {state.lessons?.data?.map((lesson) => (
                    <Card
                      key={lesson.id}
                      className={`cursor-pointer hover:shadow-lg transition-shadow ${isSelected(lesson.id, state.selectedLessonId) ? 'border-2 border-blue-500' : ''}`}
                      onClick={() => actions.selectLesson(lesson.id)}
                    >
                      <CardHeader>
                        <h3 className="text-lg font-semibold">{lesson.title}</h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{lesson.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorCourseManagement;
