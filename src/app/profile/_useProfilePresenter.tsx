"use client";
import { Author } from "@/application/repositories/authorRepositoryImpl";
import { AuthorSchema, CourseSchema } from "@/entities/models";
import { Course } from "@/entities/models/course";
import { AuthorDTO, CourseDTO, useAddAuthor, useAddCourse } from "@/hooks/mutations/authorMutations";
import { useGetAllAuthorsByUserId } from "@/hooks/queries/authorQueries";
import {
  fetchAllCoursesByAuthorId,
  useGetAllCoursesByAuthorId,
} from "@/hooks/queries/courseQueries";
import { useUserQuery } from "@/hooks/queries/userQueries";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { set, z } from "zod";


export default function useProfilePresenter() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(
    "4c823d8f-4f76-44fd-96bd-ce9b4b57c194",
  );
  const [showAddAuthor, setShowAddAuthor] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [authorDTO, setAuthorData] = useState<AuthorDTO>({
    name: "",
    org_name: "",
    is_org: false,
    bio: "",
  });
  const [courseDTO, setCourseData] = useState<CourseDTO>(
    {
      title: "",
      description: "",
      tags: [""],
      checklist: [""],
      price: 0,
      currency: "",
      banner_img: "",
    },
  );
  const { data: userInfo } = useUserQuery();

  // Mutations
  const addAuthorMutation = useAddAuthor();
  const addCourseMutation = useAddCourse();

  // Query for authors
  const {
    data: authors,
    isLoading: authorsLoading,
    error: authorsError,
    isFetching: authorsFetching,
  } = useGetAllAuthorsByUserId({
    user_id: "83a504a2-c247-4d68-b4fa-91e2d943ac98",
    page,
    limit: 20,
  });

  // Query for courses based on selected author
  const {
    data: courses,
    isLoading: coursesLoading,
    error: coursesError,
    isFetching: coursesFetching,
  } = useGetAllCoursesByAuthorId({
    author_id: String(selectedAuthorId),
    page,
    limit: 10,
  });

  // Handler for selecting an author
  const handleAuthorSelect = (authorId: string) => {
    setSelectedAuthorId(authorId);
    // Prefetch next page of courses
    // The prefetch might not work because the queryKey is not unique enough.
    // It should include the authorId and page to differentiate between different queries.
    queryClient.prefetchQuery({
      queryKey: ["coursesByAuthorId", authorId],
      queryFn: async () =>
        await fetchAllCoursesByAuthorId({ author_id: authorId, order: "asc", page: page + 1, limit: 20 }),
    });
  };

  // Handler for adding a new course
  const handleAddCourse = async () => {
    try {
      const inputObj = {
        ...courseDTO,
        author_id: selectedAuthorId,
      };

      await addCourseMutation.mutateAsync(inputObj as CourseDTO);

      // Invalidate and refetch courses for the current author
      await queryClient.invalidateQueries({
        queryKey: ["coursesByAuthorId", selectedAuthorId],
      });

      setShowAddCourse(false);

      return true;
    } catch (error) {
      console.error("Error adding course:", error);
      throw error;
    }
  };

  // Handler for adding a new author
  const handleAddAuthor = async () => {
    try {
      const inputObj = {
        ...authorDTO,
        user_id: userInfo?.user?.id,
      };
      await addAuthorMutation.mutateAsync(inputObj as AuthorDTO);

      // Invalidate and refetch authors list
      await queryClient.invalidateQueries({
        queryKey: ["authorsByUserId"],
      });

      setShowAddAuthor(false);

      return true;
    } catch (error) {
      console.error("Error adding author:", error);
      throw error;
    }
  };

  // Handler for pagination
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    state: {
      authors,
      courses,
      selectedAuthorId,
      page,
      showAddAuthor,
      showAddCourse,
      authorDTO,
      courseDTO,
      loader: {
        authors: authorsLoading,
        courses: coursesLoading,
        addingAuthor: addAuthorMutation.isPending,
        addingCourse: addCourseMutation.isPending,
      },
      fetching: {
        authors: authorsFetching,
        courses: coursesFetching,
      },
      errors: {
        authors: authorsError,
        courses: coursesError,
        addAuthor: addAuthorMutation.error,
        addCourse: addCourseMutation.error,
      },
    },
    actions: {
      selectAuthor: handleAuthorSelect,
      addCourse: handleAddCourse,
      addAuthor: handleAddAuthor,
      changePage: handlePageChange,
      setCourseData,
      setAuthorData,
      setShowAddAuthor: setShowAddAuthor,
      setShowAddCourse: setShowAddCourse,
    },
  };
}
