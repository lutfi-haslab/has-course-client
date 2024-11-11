"use client";
import Link from "next/link";
import React from "react";
import { useCourse } from "./(context)/_useCourse";
const HomeCourses = () => {
  const { state, actions } = useCourse();

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">My Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.courses?.map((course) => (
            <Link
              href={`/courses/${course.id}`}
              key={course.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {course.banner_img
                ? (
                  <img
                    src={course.banner_img}
                    alt={`Course ${course.title}`}
                    className="w-full h-48 object-cover"
                  />
                )
                : (
                  <img
                    src="https://dummyimage.com/600x400/000/686db3"
                    alt={`Course ${course.title}`}
                    className="w-full h-48 object-cover"
                  />
                )}

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {course.description}
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
