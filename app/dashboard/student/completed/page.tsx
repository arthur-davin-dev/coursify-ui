"use client";

import { useState } from "react";
import { Search, CheckCircle2, BookOpen, Star, Clock, Trophy, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useGetMyEnrolledCoursesQuery } from "@/store/services/enrollmentApi";
import { useGetMyProgressQuery } from "@/store/services/progressApi";

const FALLBACK_THUMBNAIL =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=220&fit=crop";

// ── Completed Course Card ─────────────────────────────────────────────────
function CompletedCourseCard({ course }: { course: any }) {
  const [hovered, setHovered] = useState(false);
  const thumbnail = course.thumbnail || FALLBACK_THUMBNAIL;

  return (
    <Link
      href={`/dashboard/student/courses/${course.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group block bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm transition-all duration-300 ${
        hovered ? "shadow-xl -translate-y-1" : ""
      }`}
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img
          src={thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_THUMBNAIL; }}
        />

        {/* Green overlay on hover */}
        <div className={`absolute inset-0 bg-emerald-900/60 flex items-center justify-center transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <CheckCircle2 size={22} className="text-white fill-white/20" />
          </div>
        </div>

        {/* Completed ribbon */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
          <CheckCircle2 size={11} />
          Completed
        </div>

        {/* 100% badge */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-black px-2 py-1 rounded-lg">
          100%
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {course.title}
        </h3>

        <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-[9px] font-bold text-emerald-600 shrink-0">
            {course.instructorName?.[0]?.toUpperCase() ?? "I"}
          </span>
          {course.instructorName}
        </p>

        {/* Full progress bar */}
        <div className="space-y-1.5 mb-3">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 font-medium">Progress</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">100%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden">
            <div className="h-full w-full rounded-full bg-emerald-500" />
          </div>
        </div>

        {/* Re-watch button */}
        <div className="pt-2 border-t border-gray-50 dark:border-slate-700">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <BookOpen size={12} />
            Review Course →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 animate-pulse">
      <div className="h-44 bg-gray-200 dark:bg-slate-700" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-slate-700" />
        <div className="h-3 w-1/2 rounded bg-gray-100 dark:bg-slate-800" />
        <div className="h-1.5 rounded-full bg-gray-100 dark:bg-slate-700" />
      </div>
    </div>
  );
}

// ── Stats Banner ──────────────────────────────────────────────────────────
function StatsBanner({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
          <Trophy size={22} className="text-emerald-500" />
        </div>
        <div>
          <p className="text-2xl font-black text-gray-800 dark:text-white">{count}</p>
          <p className="text-xs text-gray-400 font-medium">Courses Completed</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
          <Star size={22} className="text-indigo-500" />
        </div>
        <div>
          <p className="text-2xl font-black text-gray-800 dark:text-white">{count}</p>
          <p className="text-xs text-gray-400 font-medium">Certificates Earned</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
          <Clock size={22} className="text-amber-500" />
        </div>
        <div>
          <p className="text-2xl font-black text-gray-800 dark:text-white">{count * 4}h</p>
          <p className="text-xs text-gray-400 font-medium">Hours Learned</p>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function CompletedCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: courses = [], isLoading: coursesLoading, isError, refetch } = useGetMyEnrolledCoursesQuery();
  const { data: allProgress = [], isLoading: progressLoading } = useGetMyProgressQuery();

  const isLoading = coursesLoading || progressLoading;

  // Build progressMap: courseId → progressPercent
  const progressMap = new Map<number, number>(
    allProgress.map((p: any) => [Number(p.courseId), p.progressPercent ?? 0])
  );

  // ✅ Only courses with 100% progress OR marked completed
  const completedCourses = courses.filter((c) => {
    const progress = progressMap.get(Number(c.id)) ?? c.progress ?? 0;
    return c.completed || progress >= 100;
  });

  // Search filter
  const filtered = completedCourses.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.instructorName?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6 md:p-8 transition-colors duration-300">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
            <Trophy size={20} className="text-emerald-500" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">
            Completed Courses
          </h1>
        </div>
        {!isLoading && (
          <p className="text-sm text-gray-400 dark:text-gray-500 ml-13 pl-1">
            {completedCourses.length} course{completedCourses.length !== 1 ? "s" : ""} finished
          </p>
        )}
      </div>

      {/* Stats */}
      {!isLoading && !isError && completedCourses.length > 0 && (
        <StatsBanner count={completedCourses.length} />
      )}

      {/* Search */}
      {!isLoading && completedCourses.length > 0 && (
        <div className="relative mb-6 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search completed courses…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700 transition"
          />
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <AlertCircle size={48} className="text-red-300 dark:text-red-700 mb-4" />
          <p className="text-gray-600 dark:text-gray-300 font-semibold">Failed to load courses</p>
          <button onClick={() => refetch()}
            className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors">
            <Loader2 size={14} /> Retry
          </button>
        </div>
      )}

      {/* Grid */}
      {!isLoading && !isError && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <CompletedCourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {/* Empty: search no match */}
      {!isLoading && !isError && completedCourses.length > 0 && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search size={40} className="text-gray-200 dark:text-slate-700 mb-3" />
          <p className="text-gray-500 font-medium">No courses match your search</p>
          <button onClick={() => setSearchQuery("")}
            className="mt-3 text-sm text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
            Clear search
          </button>
        </div>
      )}

      {/* Empty: no completed courses yet */}
      {!isLoading && !isError && completedCourses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <div className="w-24 h-24 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-5">
            <Trophy size={40} className="text-emerald-300 dark:text-emerald-700" />
          </div>
          <h3 className="text-xl font-black text-gray-800 dark:text-white mb-2">
            No completed courses yet
          </h3>
          <p className="text-gray-400 text-sm max-w-[260px] mb-6">
            Keep learning! Your finished courses will appear here once you reach 100%.
          </p>
          <Link href="/dashboard/student/courses"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-colors">
            <BookOpen size={16} />
            Go to My Courses
          </Link>
        </div>
      )}
    </div>
  );
}