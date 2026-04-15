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

  // ── Counts ────────────────────────────────────────────────────────────────
  const enrolledList = Array.isArray(enrolled)
    ? enrolled
    : (enrolled as any)?.content ?? [];

  const progressMap = new Map<number, number>(
    allProgress.map((p: any) => [Number(p.courseId), p.progressPercent ?? 0])
  );

  const totalEnrolled   = enrolledList.length;
  const totalCompleted  = enrolledList.filter((c: any) => {
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
      label:   "Enrolled",
      value:   totalEnrolled,
      loading: isLoading,
      icon:    BookOpen,
      bg:      "bg-indigo-50 dark:bg-indigo-950",
      iconBg:  "bg-indigo-500 dark:bg-indigo-600",
      text:    "text-indigo-600 dark:text-indigo-400",
    },
    {
      label:   "In Progress",
      value:   totalInProgress,
      loading: isLoading,
      icon:    Clock,
      bg:      "bg-amber-50 dark:bg-amber-950",
      iconBg:  "bg-amber-400 dark:bg-amber-500",
      text:    "text-amber-500 dark:text-amber-400",
    },
    {
      label:   "Completed",
      value:   totalCompleted,
      loading: isLoading,
      icon:    CheckCircle,
      bg:      "bg-emerald-50 dark:bg-emerald-950",
      iconBg:  "bg-emerald-400 dark:bg-emerald-500",
      text:    "text-emerald-500 dark:text-emerald-400",
    },
  ];

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Welcome,{" "}
          <span className="text-indigo-700 dark:text-indigo-400">{displayName}</span>!
        </h1>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Student Dashboard</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, loading, icon: Icon, bg, iconBg, text }) => (
          <div
            key={label}
            className={`${bg} rounded-2xl px-6 py-5 flex items-center gap-4 shadow-sm transition-colors duration-300`}
          >
            <div className={`${iconBg} w-11 h-11 rounded-xl flex items-center justify-center shadow`}>
              <Icon size={20} className="text-white" />
            </div>
            <div>
              {loading ? (
                <Loader2 size={20} className={`animate-spin ${text} mb-0.5`} />
              ) : (
                <p className={`text-2xl font-extrabold ${text}`}>
                  {Number(value).toLocaleString()}
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}