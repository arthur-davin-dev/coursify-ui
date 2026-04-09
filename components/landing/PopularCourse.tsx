"use client";
import React, { useMemo } from 'react';
import { useGetCoursesQuery } from "@/store/services/courseApi";
import CourseCard from "@/components/course/CourseCard";
import { Loader2 } from "lucide-react";

export default function PopularCourse() {
  // 1. Fetch data using your RTK Query hook
  const { data, isLoading, isError } = useGetCoursesQuery();

  // 2. Format and slice the data for the landing page grid (showing only 8)
  const popularCourses = useMemo(() => {
    if (!data) return [];
    const coursesArray = Array.isArray(data) ? data : data.content ?? [];
    return coursesArray.slice(0, 8); // Display only the top 8 for the landing page
  }, [data]);

  return (
    <section className="bg-white py-20 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header matching the reference style */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Popular Courses
            </h2>
            <div className="mt-2 h-1.5 w-16 rounded-full bg-blue-600" />
          </div>
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
            See All Courses
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex h-60 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="rounded-[2rem] border-2 border-dashed border-slate-100 py-16 text-center dark:border-slate-800">
            <p className="text-slate-500">Could not load popular courses at this time.</p>
          </div>
        )}

        {/* Results Grid - Responsive 4-column layout */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}