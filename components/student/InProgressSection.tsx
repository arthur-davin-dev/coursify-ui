"use client";

import Link from "next/link";
import { Loader2, PlayCircle, ChevronRight } from "lucide-react";
import { useGetMyEnrolledCoursesQuery } from "@/store/services/enrollmentApi";


export default function InProgressCourses() {
  const { data: enrolled, isLoading } = useGetMyEnrolledCoursesQuery();

  const courses = (
    Array.isArray(enrolled) ? enrolled : (enrolled as any)?.content ?? []
  ).filter((c: any) => c.progress !== 100 && !c.completed);

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">In Progress</h2>
          <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {courses.length}
          </span>
        </div>
        <Link
          href="/dashboard/student/courses"
          className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          View all <ChevronRight size={14} />
        </Link>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-gray-100 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 py-12 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
          <PlayCircle size={36} strokeWidth={1.2} />
          <p className="text-sm">No courses in progress. Start learning!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {courses.map((course: any) => {
            const progress = course.progress ?? 0;
            return (
              <Link
                key={course.id}
                href={`/dashboard/student/courses/${course.id}`}
                className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 hover:-translate-y-0.5 transition-all group"
              >
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-indigo-100 dark:bg-indigo-950">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-indigo-900">
                      <PlayCircle size={22} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {course.title}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {course.instructorName ?? course.instructor ?? "Instructor"}
                  </p>
                  {/* Progress bar */}
                  <div className="h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Badge */}
                <span
                  className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg border ${
                    progress === 0
                      ? "text-gray-400 bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700"
                      : "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800"
                  }`}
                >
                  {progress}%
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}