"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, User } from "lucide-react";
import useProfilePresenter from "../_useProfilePresenter";

const AuthorCourseManagement = () => {
  const { state, actions } = useProfilePresenter();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Author Management</h1>
        <Button
          onClick={() => actions.setShowAddAuthor(true)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Add Author
        </Button>
      </div>

      {/* Author List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {state.authors?.data.map((author) => (
          <Card
            key={author.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={(e) => {
              e.preventDefault();
              actions.selectAuthor(author.id)
            }}
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

      {/* Course List for Selected Author */}
      {state.selectedAuthorId && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Courses</h2>
            <Button
              onClick={() => actions.setShowAddCourse(true)}
              className="flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Add Course
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.courses?.data?.map((course) => (
              <Card key={course.id}>
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
                      <Badge key={tag} variant="secondary">{tag}</Badge>
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

      {/* Add Author Modal */}
      {state.showAddAuthor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <h2 className="text-xl font-bold">Add New Author</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Name"
                    value={state.authorDTO?.name}
                    onChange={(e) =>
                      actions.setAuthorData({
                        ...state.authorDTO,
                        name: e.target.value,
                      })}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Bio"
                    value={state.authorDTO?.bio}
                    onChange={(e) =>
                      actions.setAuthorData({
                        ...state.authorDTO,
                        bio: e.target.value,
                      })}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Organization Name"
                    value={state.authorDTO?.org_name}
                    onChange={(e) =>
                      actions.setAuthorData({
                        ...state.authorDTO,
                        org_name: e.target.value,
                      })}
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <select
                      value={state.authorDTO?.is_org ? "true" : "false"}
                      onChange={(e) =>
                        actions.setAuthorData({
                          ...state.authorDTO,
                          is_org: e.target.value === "true",
                        })}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                    <span className="ml-2">Is Organization</span>
                  </label>
                </div>
                <div className="flex gap-2">
                  <Button onClick={actions.addAuthor}>Add Author</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => actions.setShowAddAuthor(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Course Modal */}
      {state.showAddCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <h2 className="text-xl font-bold">Add New Course</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Title"
                    value={state.courseDTO?.title}
                    onChange={(e) =>
                      actions.setCourseData({
                        ...state.courseDTO,
                        title: e.target.value,
                      })}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Image URL"
                    value={state.courseDTO?.banner_img}
                    onChange={(e) =>
                      actions.setCourseData({
                        ...state.courseDTO,
                        banner_img: e.target.value,
                      })}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Description"
                    value={state.courseDTO?.description}
                    onChange={(e) =>
                      actions.setCourseData({
                        ...state.courseDTO,
                        description: e.target.value,
                      })}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Tags (comma-separated)"
                    value={state.courseDTO?.tags}
                    onChange={(e) => {
                      const tagsArray = e.target.value.split(",").map((tag) =>
                        tag.trim()
                      );
                      actions.setCourseData({
                        ...state.courseDTO,
                        tags: tagsArray,
                      });
                    }}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Checklist (one item per line)"
                    value={state.courseDTO?.checklist}
                    onChange={(e) => {
                      const checklistArray = e.target.value.split(",").map((checklist) =>
                        checklist.trim()
                      );
                      actions.setCourseData({
                        ...state.courseDTO,
                        checklist: checklistArray,
                      });
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={actions.addCourse}>Add Course</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => actions.setShowAddCourse(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AuthorCourseManagement;
