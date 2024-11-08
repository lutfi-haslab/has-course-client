CREATE TABLE "User" (
  "id" uuid UNIQUE PRIMARY KEY,
  "username" varchar,
  "email" varchar UNIQUE,
  "salt" varchar,
  "hash" varchar,
  "login_attempts" int,
  "lock_until" timestamptz,
  "role" varchar,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "Author" (
  "id" uuid UNIQUE PRIMARY KEY,
  "user_id" uuid,
  "bio" text,
  "is_org" bool,
  "org_name" varchar,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "Course" (
  "id" uuid UNIQUE PRIMARY KEY,
  "author_id" uuid,
  "title" varchar,
  "description" text,
  "tags" text[],
  "price" decimal,
  "currency" varchar,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "CourseCategory" (
  "id" uuid UNIQUE PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "CourseCategories" (
  "course_id" uuid,
  "category_id" uuid,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "Section" (
  "id" uuid UNIQUE PRIMARY KEY,
  "course_id" uuid,
  "title" varchar,
  "description" varchar,
  "order" int,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "Lesson" (
  "id" uuid UNIQUE PRIMARY KEY,
  "section_id" uuid,
  "title" varchar,
  "type" varchar,
  "duration" int,
  "content_url" varchar,
  "description" text,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "Enrollment" (
  "id" uuid UNIQUE PRIMARY KEY,
  "user_id" uuid,
  "course_id" uuid,
  "enrollment_date" timestamptz,
  "completed" bool,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "LessonProgress" (
  "id" uuid UNIQUE PRIMARY KEY,
  "user_id" uuid,
  "lesson_id" uuid,
  "status" varchar,
  "last_accessed" timestamptz,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "Review" (
  "id" uuid UNIQUE PRIMARY KEY,
  "user_id" uuid,
  "course_id" uuid,
  "comment" text,
  "rating" int,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "Discussion" (
  "id" uuid UNIQUE PRIMARY KEY,
  "course_id" uuid,
  "user_id" uuid,
  "content" text,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "ReplyDiscussion" (
  "id" uuid UNIQUE PRIMARY KEY,
  "discussion_id" uuid,
  "user_id" uuid,
  "content" text,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "Forum" (
  "id" uuid UNIQUE PRIMARY KEY,
  "course_id" uuid,
  "user_id" uuid,
  "content" text,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "ReplyForum" (
  "id" uuid UNIQUE PRIMARY KEY,
  "forum_id" uuid,
  "user_id" uuid,
  "content" text,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "PaymentTransaction" (
  "id" uuid UNIQUE PRIMARY KEY,
  "user_id" uuid,
  "course_id" uuid,
  "amount" decimal,
  "payment_method" varchar,
  "payment_status" varchar,
  "transaction_id" varchar,
  "currency" varchar,
  "payment_date" timestamptz,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "PaymentMethod" (
  "id" uuid UNIQUE PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "is_active" bool,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

CREATE TABLE "Certificate" (
  "id" uuid UNIQUE PRIMARY KEY,
  "user_id" uuid,
  "course_id" uuid,
  "certificate_url" varchar,
  "issue_date" timestamptz,
  "created_at" timestamptz,
  "updated_at" timestamptz
);

ALTER TABLE "Author" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "Course" ADD FOREIGN KEY ("author_id") REFERENCES "Author" ("id");

ALTER TABLE "CourseCategories" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");

ALTER TABLE "CourseCategories" ADD FOREIGN KEY ("category_id") REFERENCES "CourseCategory" ("id");

ALTER TABLE "Section" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");

ALTER TABLE "Lesson" ADD FOREIGN KEY ("section_id") REFERENCES "Section" ("id");

ALTER TABLE "Enrollment" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "Enrollment" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");

ALTER TABLE "LessonProgress" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "LessonProgress" ADD FOREIGN KEY ("lesson_id") REFERENCES "Lesson" ("id");

ALTER TABLE "Review" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "Review" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");

ALTER TABLE "Discussion" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");

ALTER TABLE "Discussion" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "ReplyDiscussion" ADD FOREIGN KEY ("discussion_id") REFERENCES "Discussion" ("id");

ALTER TABLE "ReplyDiscussion" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "Forum" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");

ALTER TABLE "Forum" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "ReplyForum" ADD FOREIGN KEY ("forum_id") REFERENCES "Forum" ("id");

ALTER TABLE "ReplyForum" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "PaymentTransaction" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "PaymentTransaction" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");

ALTER TABLE "Certificate" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "Certificate" ADD FOREIGN KEY ("course_id") REFERENCES "Course" ("id");
