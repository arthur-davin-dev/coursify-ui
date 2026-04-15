"use client";

import Link from "next/link";
import { Trophy, ChevronRight } from "lucide-react";
import { useGetMyEnrolledCoursesQuery } from "@/store/services/enrollmentApi";
import { useGetMyProgressQuery } from "@/store/services/progressApi";

export default function CompletedCourses() {
  const { data: enrolled, isLoading: enrollLoading } = useGetMyEnrolledCoursesQuery();
  const { data: allProgress = [], isLoading: progressLoading } = useGetMyProgressQuery();

  const isLoading = enrollLoading || progressLoading;

  const progressMap = new Map<number, number>(
    allProgress.map((p: any) => [Number(p.courseId), p.progressPercent ?? 0])
  );

  const courses = (
    Array.isArray(enrolled) ? enrolled : (enrolled as any)?.content ?? []
  ).filter((c: any) => {
    const realProgress = progressMap.get(Number(c.id)) ?? c.progress ?? 0;
    return c.completed || realProgress >= 100;
  });

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Completed</h2>
          <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {courses.length}
          </span>
        </div>
        <Link
          href="/dashboard/student/completed"
          className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          View all <ChevronRight size={14} />
        </Link>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="h-48 rounded-2xl bg-gray-100 dark:bg-slate-800 animate-pulse" />
      ) : courses.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 py-12 flex flex-col items-center gap-2 text-gray-300 dark:text-slate-600">
          <Trophy size={36} strokeWidth={1.2} />
          <p className="text-sm text-gray-400 dark:text-gray-500">
            No completed courses yet. Keep going!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {courses.map((course: any) => (
            <div
              key={course.id}
              className="flex items-center gap-3 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-emerald-100 dark:border-emerald-900 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-emerald-50 dark:bg-emerald-950">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Trophy size={18} className="text-emerald-500" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{course.title}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">✓ Completed</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}