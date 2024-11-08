import { z } from "zod";

// User schema
export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(1),
  email: z.string().email(),
  salt: z.string(),
  hash: z.string(),
  login_attempts: z.number().int().nonnegative(),
  lock_until: z.string().optional(), // Timestamptz in ISO format
  role: z.enum(["student", "instructor", "admin"]),
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// Author schema
export const AuthorSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  bio: z.string().optional(),
  is_org: z.boolean(),
  org_name: z.string().optional(),
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// Course schema
export const CourseSchema = z.object({
  id: z.string().uuid(),
  author_id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string(),
  tags: z.array(z.string()).optional(),
  price: z.number().nonnegative(),
  currency: z.string(),
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// CourseCategory schema
export const CourseCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// CourseCategories (Many-to-many) schema
export const CourseCategoriesSchema = z.object({
  course_id: z.string().uuid(),
  category_id: z.string().uuid(),
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// Section schema
export const SectionSchema = z.object({
  id: z.string().uuid(),
  course_id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  order: z.number().int().nonnegative(),
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// Lesson schema
export const LessonSchema = z.object({
  id: z.string().uuid(),
  section_id: z.string().uuid(),
  title: z.string().min(1),
  type: z.enum(["video", "pdf", "article"]),
  duration: z.number().int().nonnegative(),
  content_url: z.string().url(),
  description: z.string().optional(),
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// Enrollment schema
export const EnrollmentSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  course_id: z.string().uuid(),
  enrollment_date: z.string(), // Timestamptz in ISO format
  completed: z.boolean(),
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// LessonProgress schema
export const LessonProgressSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  lesson_id: z.string().uuid(),
  status: z.enum(["not started", "in progress", "completed"]),
  last_accessed: z.string().optional(), // Timestamptz in ISO format
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// Review schema
export const ReviewSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  course_id: z.string().uuid(),
  comment: z.string().optional(),
  rating: z.number().int().min(1).max(5),
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// Discussion schema
export const DiscussionSchema = z.object({
  id: z.string().uuid(),
  course_id: z.string().uuid(),
  user_id: z.string().uuid(),
  content: z.string(),
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// ReplyDiscussion schema
export const ReplyDiscussionSchema = z.object({
  id: z.string().uuid(),
  discussion_id: z.string().uuid(),
  user_id: z.string().uuid(),
  content: z.string(),
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// Forum schema
export const ForumSchema = z.object({
  id: z.string().uuid(),
  course_id: z.string().uuid(),
  user_id: z.string().uuid(),
  content: z.string(),
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// ReplyForum schema
export const ReplyForumSchema = z.object({
  id: z.string().uuid(),
  forum_id: z.string().uuid(),
  user_id: z.string().uuid(),
  content: z.string(),
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// PaymentTransaction schema
export const PaymentTransactionSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  course_id: z.string().uuid(),
  amount: z.number().nonnegative(),
  payment_method: z.string(),
  payment_status: z.string(),
  transaction_id: z.string(),
  currency: z.string(),
  payment_date: z.string(), // Timestamptz in ISO format
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// PaymentMethod schema
export const PaymentMethodSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  is_active: z.boolean(),
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});

// Certificate schema
export const CertificateSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  course_id: z.string().uuid(),
  certificate_url: z.string().url(),
  issue_date: z.string(), // Timestamptz in ISO format
  created_at: z.string(), // Timestamptz in ISO format
  updated_at: z.string(), // Timestamptz in ISO format
});
