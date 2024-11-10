// hooks/mutations/authorMutations.ts
import { AuthorSchema, CourseSchema } from "@/entities/models";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

interface Author {
  id: string;
  user_id: string;
  bio: string;
  is_org: boolean;
  org_name: string;
  name: string;
}

interface Course {
  id: string;
  author_id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  currency: string;
  checklist: string[];
}

interface AddAuthorResponse {
  code: number;
  status: string;
  message: string;
  data: Author;
}

interface AddCourseResponse {
  code: number;
  status: string;
  message: string;
  data: Course;
}

export type AuthorDTO = Omit<
  z.infer<typeof AuthorSchema>,
  "id" | "user_id" | "created_at" | "updated_at"
>;
export type CourseDTO = Omit<
  z.infer<typeof CourseSchema>,
  "id" | "author_id" | "created_at" | "updated_at"
>;

export const useAddAuthor = () => {
  return useMutation<AddAuthorResponse, Error, AuthorDTO>({
    mutationFn: async (data) => {
      const response = await fetch('http://localhost:3000/api/v1/author', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add author');
      }
      
      return response.json();
    },
  });
};

export const useAddCourse = () => {
  return useMutation<AddCourseResponse, Error, CourseDTO>({
    mutationFn: async (data) => {
      const response = await fetch('http://localhost:3000/api/v1/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add course');
      }
      
      return response.json();
    },
  });
};