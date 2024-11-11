"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { SectionDTO, useAddSection } from "@/hooks/mutations/sectionMutations";
import { useGetAllSectionsByCourseId } from "@/hooks/queries/sectionQueries";
import {
  useGetAllCourses,
  useGetCourseById,
} from "@/hooks/queries/courseQueries";

interface CourseProviderProps {
  children: ReactNode;
}

const CourseContext = createContext<
  ReturnType<typeof useCoursePresenter> | undefined
>(undefined);

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const course = useCoursePresenter();

  return (
    <CourseContext.Provider value={course}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};

function useCoursePresenter() {
  const [courseId, setCourseId] = useState("");
  const { data: courses } = useGetAllCourses({
    order: "asc",
    page: 1,
    limit: 10,
  });

  const { data: courseById, isLoading: isLoadingCourse } = useGetCourseById({ course_id: courseId });

  return {
    state: {
      courses: courses?.data,
      courseById: courseById?.data,
      isLoading: {
        courses: isLoadingCourse
      }
    },
    actions: {
        setCourseId
    },
  };
}
