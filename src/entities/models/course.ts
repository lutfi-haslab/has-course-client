import { z } from "zod";

export const CourseSchema = z.object({
  id: z.string().optional(), // UUID
  user_uuid: z.string(),
  title: z.string().max(255),
  description: z.string().nullable(),
  rating: z.number().nullable(),
  total_reviews: z.number().default(0),
  total_enrolled: z.number().default(0),
  tags: z.array(z.string()).nullable(),
  checklist: z.array(z.string()).nullable(),
  created_at: z.string().default("2024-09-25T18:23:27.906+00:00"),
  updated_at: z.string().default("2024-09-25T18:23:27.906+00:00"),
});

export type Course = z.infer<typeof CourseSchema>;

export const SectionSchema = z.object({
  id: z.string().optional(), // UUID
  course_id: z.string(),
  title: z.string().max(255),
  order_num: z.number(),
  created_at: z.string().default("2024-09-25T18:23:27.906+00:00"),
  updated_at: z.string().default("2024-09-25T18:23:27.906+00:00"),
});

export type Section = z.infer<typeof SectionSchema>;

export const LessonSchema = z.object({
  id: z.string().optional(), // UUID
  section_id: z.string(),
  title: z.string().max(255),
  type: z.enum(["video", "pdf", "blog"]),
  minutes: z.number().nullable(),
  url_doc: z.string().nullable(),
  url_video: z.string().nullable(),
  url_youtube: z.string().nullable(),
  is_done: z.boolean().default(false),
  description: z.string().nullable(),
  order_num: z.number(),
  created_at: z.string().default("2024-09-25T18:23:27.906+00:00"),
  updated_at: z.string().default("2024-09-25T18:23:27.906+00:00"),
});

export type Lesson = z.infer<typeof LessonSchema>;

export const CourseEnrollmentSchema = z.object({
  id: z.string().optional(), // UUID
  course_id: z.string(),
  user_uuid: z.string(),
  enrolled_at: z.string().default("2024-09-25T18:23:27.906+00:00"),
  completed_at: z.string().nullable(),
});

export type CourseEnrollment = z.infer<typeof CourseEnrollmentSchema>;