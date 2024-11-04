"use client"
import Link from "next/link";
import React from "react";
import useCoursesPresenter from "./_useCoursesPresenter";

const HomeCourses = () => {
  const { todo } = useCoursesPresenter();
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {todo?.todo}
        <h1 className="text-3xl font-bold text-center mb-8">My Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((course) => (
            <Link
              href={`/courses/${course}`}
              key={course}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={`https://via.placeholder.com/300x200?text=Course+${course}`}
                alt={`Course ${course}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  Course Title {course}
                </h2>
                <p className="text-gray-600 mb-4">
                  This is a brief description of Course {course}. Learn more
                  about this course and improve your skills.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                  Go to Course
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCourses;
