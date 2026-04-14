// "use client";

// import { useState } from "react";
// import { Search, Filter, BookOpen, Play, ChevronRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

// import Link from "next/link";
// import { EnrolledCourse, useGetMyEnrolledCoursesQuery } from "@/store/services/enrollmentApi";

// // ── Constants ──────────────────────────────────────────────────────────────
// const FILTERS = ["All", "In Progress", "Completed", "Not Started"] as const;
// type Filter = (typeof FILTERS)[number];

// const FALLBACK_THUMBNAIL =
//   "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=220&fit=crop";

// // ── Progress Bar ───────────────────────────────────────────────────────────
// function ProgressBar({ value }: { value: number }) {
//   const color =
//     value >= 100
//       ? "bg-emerald-500"
//       : value >= 60
//       ? "bg-indigo-500"
//       : value >= 30
//       ? "bg-indigo-400"
//       : "bg-indigo-300";

//   return (
//     <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
//       <div
//         className={`${color} h-full rounded-full transition-all duration-700`}
//         style={{ width: `${Math.min(value, 100)}%` }}
//       />
//     </div>
//   );
// }

// // ── Status Badge ───────────────────────────────────────────────────────────
// function StatusBadge({ completed, progress }: { completed: boolean; progress: number }) {
//   if (completed || progress >= 100) {
//     return (
//       <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
//         <CheckCircle2 size={10} />
//         Completed
//       </span>
//     );
//   }
//   if (progress > 0) {
//     return (
//       <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
//         In Progress
//       </span>
//     );
//   }
//   return (
//     <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-gray-400">
//       Not Started
//     </span>
//   );
// }

// // ── Course Card ────────────────────────────────────────────────────────────
// function CourseCard({ course }: { course: EnrolledCourse }) {
//   const [hovered, setHovered] = useState(false);
//   const isCompleted = course.completed || course.progress >= 100;
//   const thumbnail = course.thumbnail || FALLBACK_THUMBNAIL;

//   return (
//     <Link
//       href={`/dashboard/student/courses/${course.id}`}
//       className={`group block bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl dark:hover:shadow-slate-900/60 transition-all duration-300 ${
//         hovered ? "-translate-y-1" : ""
//       }`}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Thumbnail */}
//       <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-700">
//         <img
//           src={thumbnail}
//           alt={course.title}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//           onError={(e) => {
//             (e.currentTarget as HTMLImageElement).src = FALLBACK_THUMBNAIL;
//           }}
//         />

//         {/* Play overlay on hover */}
//         <div
//           className={`absolute inset-0 bg-indigo-900/60 flex items-center justify-center transition-opacity duration-300 ${
//             hovered ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
//             <Play size={20} className="text-white fill-white ml-0.5" />
//           </div>
//         </div>

//         {/* Completed ribbon */}
//         {isCompleted && (
//           <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow">
//             <CheckCircle2 size={11} />
//             Done
//           </div>
//         )}
//       </div>

//       {/* Body */}
//       <div className="p-4">
//         <div className="mb-2">
//           <StatusBadge completed={course.completed} progress={course.progress} />
//         </div>

//         <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm leading-snug mb-1 line-clamp-2">
//           {course.title}
//         </h3>

//         <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 flex items-center gap-1.5">
//           <span className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-[9px] font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
//             {course.instructorName?.[0]?.toUpperCase() ?? "I"}
//           </span>
//           {course.instructorName}
//         </p>

//         <div className="space-y-1.5">
//           <div className="flex justify-between text-xs">
//             <span className="text-gray-500 dark:text-gray-400 font-medium">Progress</span>
//             <span
//               className={`font-bold ${
//                 isCompleted
//                   ? "text-emerald-600 dark:text-emerald-400"
//                   : "text-indigo-600 dark:text-indigo-400"
//               }`}
//             >
//               {Math.min(course.progress, 100)}%
//             </span>
//           </div>
//           <ProgressBar value={course.progress} />
//         </div>
//       </div>
//     </Link>
//   );
// }

// // ── Skeleton ───────────────────────────────────────────────────────────────
// function SkeletonCard() {
//   return (
//     <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 animate-pulse">
//       <div className="h-44 bg-gray-200 dark:bg-slate-700" />
//       <div className="p-4 space-y-3">
//         <div className="h-3 w-20 rounded-full bg-gray-200 dark:bg-slate-700" />
//         <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-slate-700" />
//         <div className="h-3 w-1/2 rounded bg-gray-100 dark:bg-slate-800" />
//         <div className="space-y-1.5 pt-1">
//           <div className="flex justify-between">
//             <div className="h-3 w-14 rounded bg-gray-100 dark:bg-slate-800" />
//             <div className="h-3 w-8 rounded bg-gray-100 dark:bg-slate-800" />
//           </div>
//           <div className="h-1.5 rounded-full bg-gray-100 dark:bg-slate-700" />
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Page ───────────────────────────────────────────────────────────────────
// export default function MyCoursesPage() {
//   const [activeFilter, setActiveFilter] = useState<Filter>("All");
//   const [searchQuery, setSearchQuery] = useState("");

//   const { data: courses = [], isLoading, isError, refetch } = useGetMyEnrolledCoursesQuery();

//   const filtered = courses.filter((c) => {
//     const q = searchQuery.toLowerCase();
//     const matchesSearch =
//       c.title.toLowerCase().includes(q) ||
//       c.instructorName?.toLowerCase().includes(q);

//     const isCompleted = c.completed || c.progress >= 100;
//     const matchesFilter =
//       activeFilter === "All" ||
//       (activeFilter === "Completed" && isCompleted) ||
//       (activeFilter === "In Progress" && !isCompleted && c.progress > 0) ||
//       (activeFilter === "Not Started" && c.progress === 0);

//     return matchesSearch && matchesFilter;
//   });

//   const completedCount = courses.filter((c) => c.completed || c.progress >= 100).length;
//   const inProgressCount = courses.filter(
//     (c) => !c.completed && c.progress > 0 && c.progress < 100
//   ).length;

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6 md:p-8 transition-colors duration-300">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-5">
//         <div>
//           <h1 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">
//             My Courses
//           </h1>
//           {!isLoading && !isError && (
//             <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
//               {courses.length} enrolled · {completedCount} completed · {inProgressCount} in progress
//             </p>
//           )}
//         </div>
//         {/* <button
//           onClick={() => refetch()}
//           className="flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
//         >
//           View All
//           <ChevronRight size={16} />
//         </button> */}
//       </div>

//       {/* Search & Filter */}
//       <div className="flex flex-col sm:flex-row gap-3 mb-6">
//         <div className="relative flex-1">
//           <Search
//             size={15}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
//           />
//           <input
//             type="text"
//             placeholder="Search by title or instructor…"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 transition"
//           />
//         </div>

//         <div className="flex items-center gap-2 flex-wrap">
//           <Filter size={15} className="text-gray-400 dark:text-gray-500 shrink-0" />
//           {FILTERS.map((f) => (
//             <button
//               key={f}
//               onClick={() => setActiveFilter(f)}
//               className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
//                 activeFilter === f
//                   ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/40"
//                   : "bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── Loading skeletons ── */}
//       {isLoading && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
//         </div>
//       )}

//       {/* ── Error ── */}
//       {isError && !isLoading && (
//         <div className="flex flex-col items-center justify-center py-24 text-center">
//           <AlertCircle size={48} className="text-red-300 dark:text-red-700 mb-4" />
//           <p className="text-gray-600 dark:text-gray-300 font-semibold">Failed to load courses</p>
//           <p className="text-gray-400 dark:text-gray-500 text-sm mt-1 mb-4">
//             Something went wrong. Please try again.
//           </p>
//           <button
//             onClick={() => refetch()}
//             className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
//           >
//             <Loader2 size={14} />
//             Retry
//           </button>
//         </div>
//       )}

//       {/* ── Grid ── */}
//       {!isLoading && !isError && filtered.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {filtered.map((course) => (
//             <CourseCard key={course.id} course={course} />
//           ))}
//         </div>
//       )}

//       {/* ── Empty: zero enrollments ── */}
//       {!isLoading && !isError && courses.length === 0 && (
//         <div className="flex flex-col items-center justify-center py-24 text-center">
//           <BookOpen size={48} className="text-gray-200 dark:text-slate-700 mb-4" />
//           <p className="text-gray-600 dark:text-gray-300 font-semibold">No courses yet</p>
//           <p className="text-gray-400 dark:text-gray-500 text-sm mt-1 mb-4">
//             Browse our catalog and enroll in your first course!
//           </p>
//           <Link
//             href="/courses"
//             className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
//           >
//             Browse Courses
//           </Link>
//         </div>
//       )}

//       {/* ── Empty: search/filter no match ── */}
//       {!isLoading && !isError && courses.length > 0 && filtered.length === 0 && (
//         <div className="flex flex-col items-center justify-center py-24 text-center">
//           <Search size={48} className="text-gray-200 dark:text-slate-700 mb-4" />
//           <p className="text-gray-500 dark:text-gray-400 font-medium">No courses match your filter</p>
//           <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
//             Try adjusting your search or selecting a different filter
//           </p>
//           <button
//             onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
//             className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
//           >
//             Clear filters
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Search, Filter, BookOpen, Play, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { EnrolledCourse, useGetMyEnrolledCoursesQuery } from "@/store/services/enrollmentApi";
import { useGetMyProgressQuery } from "@/store/services/progressApi";

const FILTERS = ["All", "In Progress", "Completed", "Not Started"] as const;
type Filter = (typeof FILTERS)[number];

const FALLBACK_THUMBNAIL =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=220&fit=crop";

// ── Progress Bar ───────────────────────────────────────────────────────────
function ProgressBar({ value }: { value: number }) {
  const color =
    value >= 100 ? "bg-emerald-500"
    : value >= 60 ? "bg-indigo-500"
    : value >= 30 ? "bg-indigo-400"
    : "bg-indigo-300";

  return (
    <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
      <div
        className={`${color} h-full rounded-full transition-all duration-700`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}

// ── Status Badge ───────────────────────────────────────────────────────────
function StatusBadge({ completed, progress }: { completed: boolean; progress: number }) {
  if (completed || progress >= 100) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
        <CheckCircle2 size={10} /> Completed
      </span>
    );
  }
  if (progress > 0) {
    return (
      <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
        In Progress
      </span>
    );
  }
  return (
    <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-gray-400">
      Not Started
    </span>
  );
}

// ── Course Card ────────────────────────────────────────────────────────────
function CourseCard({ course }: { course: EnrolledCourse & { realProgress: number } }) {
  const [hovered, setHovered] = useState(false);
  const progress = course.realProgress ?? course.progress ?? 0;
  const isCompleted = course.completed || progress >= 100;
  const thumbnail = course.thumbnail || FALLBACK_THUMBNAIL;

  return (
    <Link
      href={`/dashboard/student/courses/${course.id}`}
      className={`group block bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl dark:hover:shadow-slate-900/60 transition-all duration-300 ${
        hovered ? "-translate-y-1" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img
          src={thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_THUMBNAIL; }}
        />
        <div className={`absolute inset-0 bg-indigo-900/60 flex items-center justify-center transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Play size={20} className="text-white fill-white ml-0.5" />
          </div>
        </div>
        {isCompleted && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow">
            <CheckCircle2 size={11} /> Done
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="mb-2">
          <StatusBadge completed={course.completed} progress={progress} />
        </div>
        <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm leading-snug mb-1 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-[9px] font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
            {course.instructorName?.[0]?.toUpperCase() ?? "I"}
          </span>
          {course.instructorName}
        </p>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Progress</span>
            <span className={`font-bold ${isCompleted ? "text-emerald-600 dark:text-emerald-400" : "text-indigo-600 dark:text-indigo-400"}`}>
              {Math.min(progress, 100)}%
            </span>
          </div>
          <ProgressBar value={progress} />
        </div>
      </div>
    </Link>
  );
}

// ── Skeleton ───────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 animate-pulse">
      <div className="h-44 bg-gray-200 dark:bg-slate-700" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 rounded-full bg-gray-200 dark:bg-slate-700" />
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-slate-700" />
        <div className="h-3 w-1/2 rounded bg-gray-100 dark:bg-slate-800" />
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between">
            <div className="h-3 w-14 rounded bg-gray-100 dark:bg-slate-800" />
            <div className="h-3 w-8 rounded bg-gray-100 dark:bg-slate-800" />
          </div>
          <div className="h-1.5 rounded-full bg-gray-100 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function MyCoursesPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: courses = [], isLoading, isError, refetch } = useGetMyEnrolledCoursesQuery();

  // ✅ Fetch real progress for all courses
  const { data: allProgress = [] } = useGetMyProgressQuery();

  // ✅ Build a map: courseId → progressPercent
  const progressMap = new Map<number, number>(
    allProgress.map((p: any) => [
      Number(p.courseId),
      p.progressPercent ?? 0,
    ])
  );

  // ✅ Merge real progress into each course
  const coursesWithProgress = courses.map((course) => ({
    ...course,
    realProgress: progressMap.get(Number(course.id)) ?? course.progress ?? 0,
  }));

  const filtered = coursesWithProgress.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      c.title.toLowerCase().includes(q) ||
      c.instructorName?.toLowerCase().includes(q);

    const progress = c.realProgress;
    const isCompleted = c.completed || progress >= 100;

    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Completed" && isCompleted) ||
      (activeFilter === "In Progress" && !isCompleted && progress > 0) ||
      (activeFilter === "Not Started" && progress === 0);

    return matchesSearch && matchesFilter;
  });

  const completedCount = coursesWithProgress.filter(
    (c) => c.completed || c.realProgress >= 100
  ).length;
  const inProgressCount = coursesWithProgress.filter(
    (c) => !c.completed && c.realProgress > 0 && c.realProgress < 100
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6 md:p-8 transition-colors duration-300">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">
            My Courses
          </h1>
          {!isLoading && !isError && (
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
              {courses.length} enrolled · {completedCount} completed · {inProgressCount} in progress
            </p>
          )}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search by title or instructor…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 transition"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={15} className="text-gray-400 dark:text-gray-500 shrink-0" />
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeFilter === f
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/40"
                  : "bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <AlertCircle size={48} className="text-red-300 dark:text-red-700 mb-4" />
          <p className="text-gray-600 dark:text-gray-300 font-semibold">Failed to load courses</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1 mb-4">Something went wrong. Please try again.</p>
          <button onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors">
            <Loader2 size={14} /> Retry
          </button>
        </div>
      )}

      {/* Grid */}
      {!isLoading && !isError && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {/* Empty: no enrollments */}
      {!isLoading && !isError && courses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <BookOpen size={48} className="text-gray-200 dark:text-slate-700 mb-4" />
          <p className="text-gray-600 dark:text-gray-300 font-semibold">No courses yet</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1 mb-4">Browse our catalog and enroll in your first course!</p>
          <Link href="/courses" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors">
            Browse Courses
          </Link>
        </div>
      )}

      {/* Empty: filter no match */}
      {!isLoading && !isError && courses.length > 0 && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Search size={48} className="text-gray-200 dark:text-slate-700 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">No courses match your filter</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Try adjusting your search or selecting a different filter</p>
          <button
            onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
            className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}