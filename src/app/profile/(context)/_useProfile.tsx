"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { useAddAuthor } from "@/hooks/mutations/authorMutations";
import { useAddCourse } from "@/hooks/mutations/courseMutations";
import { useGetAllAuthorsByUserId } from "@/hooks/queries/authorQueries";
import {
  fetchCourse,
  useGetAllCoursesByAuthorId,
} from "@/hooks/queries/courseQueries";
import { useUserQuery } from "@/hooks/queries/userQueries";
import { useQueryClient } from "@tanstack/react-query";
import { CourseDTO } from "@/application/repositories/courseRepositoryImpl";
import { AuthorDTO } from "@/application/repositories/authorRepositoryImpl";
import { SectionDTO, useAddSection } from "@/hooks/mutations/sectionMutations";
import { useAddLesson } from "@/hooks/mutations/lessonMutations";
import { LessonDTO } from "@/application/repositories/lessonRepositoryImpl";
import {
  fetchLesson,
  useGetAllLessonsBySectionId,
} from "@/hooks/queries/lessonQueries";
import {
  fetchSection,
  useGetAllSectionsByCourseId,
} from "@/hooks/queries/sectionQueries";

interface ProfileProviderProps {
  children: ReactNode;
}

const ProfileContext = createContext<
  ReturnType<typeof useProfilePresenter> | undefined
>(undefined);

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const profile = useProfilePresenter();

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

function useProfilePresenter() {
  const queryClient = useQueryClient();

  // State management
  const [page, setPage] = useState(1);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>("");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");

  const [authorDTO, setAuthorData] = useState<Omit<AuthorDTO, "user_id">>({
    name: "",
    org_name: "",
    is_org: false,
    bio: "",
  });

  const [courseDTO, setCourseData] = useState<Omit<CourseDTO, "author_id">>({
    title: "",
    description: "",
    tags: [""],
    checklist: [""],
    price: 0,
    currency: "",
    banner_img: "",
  });

  const [sectionDTO, setSectionData] = useState<Omit<SectionDTO, "course_id">>({
    title: "",
    description: "",
  });

  const [lessonDTO, setLessonData] = useState<Omit<LessonDTO, "section_id">>({
    title: "",
    type: "video",
    duration: 0,
    content_url: "",
    description: "",
  });

  // Query & Mutation
  const { data: userInfo } = useUserQuery();
  const addAuthorMutation = useAddAuthor();
  const addCourseMutation = useAddCourse();
  const addSectionMutation = useAddSection(selectedCourseId || "");
  const addLessonMutation = useAddLesson(selectedSectionId || "");

  const { data: authors } = useGetAllAuthorsByUserId({
    user_id: userInfo?.user?.id || "",
    page,
    limit: 20,
  });

  const { data: courses } = useGetAllCoursesByAuthorId({
    author_id: selectedAuthorId || "",
    page,
    limit: 10,
  });

  const { data: sections } = useGetAllSectionsByCourseId({
    course_id: selectedCourseId || "",
    page,
    limit: 10,
  });

  const { data: lessons } = useGetAllLessonsBySectionId({
    section_id: selectedSectionId || "",
    page,
    limit: 10,
  });

  const handleAuthorSelect = (authorId: string) => {
    setSelectedAuthorId(authorId);
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSectionId(sectionId);
  };

  const handleLessonSelect = (sectionId: string) => {
    setSelectedLessonId(sectionId);
  };

  const handleAddAuthor = async () => {
    const inputObj: AuthorDTO = { ...authorDTO, user_id: userInfo?.user?.id };
    addAuthorMutation.mutate(inputObj);
  };

  const handleAddCourse = async () => {
    if (!selectedAuthorId) {
      console.error("Error adding course: author_id is null or undefined");
      return;
    }
    const inputObj: CourseDTO = { ...courseDTO, author_id: selectedAuthorId };
    addCourseMutation.mutate(inputObj);
  };

  const handleAddSection = async () => {
    if (!selectedCourseId) {
      console.error("Error adding section: course_id is null or undefined");
      return;
    }
    const inputObj: SectionDTO = {
      ...sectionDTO,
      course_id: selectedCourseId,
    };
    addSectionMutation.mutate(inputObj);
  };

  const handleAddLesson = async () => {
    if (!selectedSectionId) {
      console.error("Error adding lesson: section_id is null or undefined");
      return;
    }

    const inputObj: LessonDTO = {
      ...lessonDTO,
      section_id: selectedSectionId,
    };

    addLessonMutation.mutate(inputObj);
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  return {
    state: {
      authors,
      courses,
      sections,
      lessons,
      selectedAuthorId,
      selectedCourseId,
      selectedSectionId,
      selectedLessonId,
      page,
      authorDTO,
      courseDTO,
      sectionDTO,
      lessonDTO,
    },
    actions: {
      selectAuthor: handleAuthorSelect,
      selectCourse: handleCourseSelect,
      selectSection: handleSectionSelect,
      selectLesson: handleLessonSelect,
      addAuthor: handleAddAuthor,
      addCourse: handleAddCourse,
      addSection: handleAddSection,
      addLesson: handleAddLesson,
      changePage: handlePageChange,
      setAuthorData,
      setCourseData,
      setSectionData,
      setLessonData,
    },
  };
}
