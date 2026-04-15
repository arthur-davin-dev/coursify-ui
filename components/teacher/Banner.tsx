"use client";

import { BookOpen, Users, BookMarked, Loader2 } from "lucide-react";
import { useGetMyCoursesQuery } from "@/store/services/courseApi";
import { useGetMyBooksQuery } from "@/store/services/bookApi"; // ← changed
import { useGetUserInfoQuery } from "@/store/features/users/userSlice";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { Course } from "@/store/services/courseApi";
import { useGetTeacherStatsQuery } from "@/store/services/enrollmentApi";

export default function Banner() {
  const token = useSelector((s: RootState) => s.auth.token);
  const { data: user } = useGetUserInfoQuery(undefined, { skip: !token });

  const { data: courses, isLoading: loadingCourses } = useGetMyCoursesQuery();
  const { data: books, isLoading: loadingBooks } = useGetMyBooksQuery(); // ← changed

  // ── Counts ────────────────────────────────────────────────────────────────
  const courseList: Course[] = Array.isArray(courses)
    ? courses
    : ((courses as any)?.content ?? []);

  const totalCourses = courseList.length;

  const totalBooks = Array.isArray(books)
    ? books.length
    : ((books as any)?.totalElements ?? (books as any)?.content?.length ?? 0);

  // ── Total students = sum of enrollmentCount across all teacher's courses ──
  // const totalStudents = courseList.reduce((sum, c) => {
  //   return (
  //     sum +
  //     ((c as any).enrollmentCount ??
  //       (c as any).studentCount ??
  //       (c as any).totalStudents ??
  //       (c as any).enrolledStudents ??
  //       (c as any).totalEnrollments ??
  //       0)
  //   );
  // }, 0);

  const displayName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : "Teacher";

  const { data: teacherStats, isLoading: loadingStats } =
    useGetTeacherStatsQuery();
  const totalStudents = teacherStats?.totalEnrollments ?? 0;
  const stats = [
    {
      label: "Total Courses",
      value: totalCourses,
      loading: loadingCourses,
      icon: BookOpen,
      bg: "bg-rose-50 dark:bg-rose-950",
      iconBg: "bg-rose-400 dark:bg-rose-500",
      text: "text-rose-500 dark:text-rose-400",
    },
    {
      label: "Total Students",
      value: totalStudents,
      loading: loadingStats,
      icon: Users,
      bg: "bg-amber-50 dark:bg-amber-950",
      iconBg: "bg-amber-400 dark:bg-amber-500",
      text: "text-amber-500 dark:text-amber-400",
    },
    {
      label: "Total Books",
      value: totalBooks,
      loading: loadingBooks,
      icon: BookMarked,
      bg: "bg-violet-50 dark:bg-violet-950",
      iconBg: "bg-violet-400 dark:bg-violet-500",
      text: "text-violet-500 dark:text-violet-400",
    },
  ];

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Welcome,{" "}
          <span className="text-indigo-700 dark:text-indigo-400">
            {displayName}
          </span>{" "}
          !
        </h1>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
          Dashboard
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map(
          ({ label, value, loading, icon: Icon, bg, iconBg, text }) => (
            <div
              key={label}
              className={`${bg} rounded-2xl px-6 py-5 flex items-center gap-4 shadow-sm transition-colors duration-300`}
            >
              <div
                className={`${iconBg} w-11 h-11 rounded-xl flex items-center justify-center shadow`}
              >
                <Icon size={20} className="text-white" />
              </div>
              <div>
                {loading ? (
                  <Loader2
                    size={20}
                    className={`animate-spin ${text} mb-0.5`}
                  />
                ) : (
                  <p className={`text-2xl font-extrabold ${text}`}>
                    {Number(value).toLocaleString()}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {label}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
