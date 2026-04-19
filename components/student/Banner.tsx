"use client";

import { BookOpen, CheckCircle, Clock, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useGetUserInfoQuery } from "@/store/features/users/userSlice";
import { useGetMyEnrolledCoursesQuery } from "@/store/services/enrollmentApi";
import { useGetMyProgressQuery } from "@/store/services/progressApi";

export default function Banner() {
  const token = useSelector((s: RootState) => s.auth.token);
  const { data: user } = useGetUserInfoQuery(undefined, { skip: !token });

  const { data: enrolled, isLoading: loadingEnrolled } = useGetMyEnrolledCoursesQuery();
  const { data: allProgress = [], isLoading: loadingProgress } = useGetMyProgressQuery();

  // ── Logic ────────────────────────────────────────────────────────────────
  const enrolledList = Array.isArray(enrolled)
    ? enrolled
    : (enrolled as any)?.content ?? [];

  const progressMap = new Map<number, number>(
    allProgress.map((p: any) => [Number(p.courseId), p.progressPercent ?? 0])
  );

  const totalEnrolled = enrolledList.length;
  const totalCompleted = enrolledList.filter((c: any) => {
    const realProgress = progressMap.get(Number(c.id)) ?? c.progress ?? 0;
    return c.completed || realProgress >= 100;
  }).length;
  const totalInProgress = totalEnrolled - totalCompleted;

  const isLoading = loadingEnrolled || loadingProgress;

  const displayName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : "Student";

  const stats = [
    {
      label: "Enrolled",
      value: totalEnrolled,
      loading: isLoading,
      icon: BookOpen,
      bg: "bg-indigo-50/50 dark:bg-indigo-950/30",
      iconBg: "bg-indigo-500",
      text: "text-indigo-600 dark:text-indigo-400",
    },
    {
      label: "In Progress",
      value: totalInProgress,
      loading: isLoading,
      icon: Clock,
      bg: "bg-amber-50/50 dark:bg-amber-950/30",
      iconBg: "bg-amber-500",
      text: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Completed",
      value: totalCompleted,
      loading: isLoading,
      icon: CheckCircle,
      bg: "bg-emerald-50/50 dark:bg-emerald-950/30",
      iconBg: "bg-emerald-500",
      text: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="mb-8 px-4 sm:px-0">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
          Welcome back,{" "}
          <span className="text-indigo-600 dark:text-indigo-400">{displayName}</span>!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mt-1">
          Here&apos;s what&apos;s happening with your courses today.
        </p>
      </div>

      {/* Responsive Grid: 1 column on mobile, 3 on medium screens and up */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {stats.map(({ label, value, loading, icon: Icon, bg, iconBg, text }) => (
          <div
            key={label}
            className={`${bg} border border-transparent dark:border-gray-800 rounded-2xl p-5 md:p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-200`}
          >
            <div className={`${iconBg} shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-black/5`}>
              <Icon size={24} className="text-white" />
            </div>
            <div className="flex flex-col">
              {loading ? (
                <Loader2 size={24} className={`animate-spin ${text} mb-1`} />
              ) : (
                <span className={`text-2xl font-bold leading-none ${text}`}>
                  {Number(value).toLocaleString()}
                </span>
              )}
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}