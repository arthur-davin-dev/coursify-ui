"use client";
import { useState, useMemo } from "react";
import { useGetCoursesQuery } from "@/store/services/courseApi";
import type { Course } from "@/store/services/courseApi";

import { Search, SlidersHorizontal } from "lucide-react";
import CourseCard from "@/components/course/CourseCard";

export default function CoursePage() {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch } = useGetCoursesQuery();

  const courses: Course[] = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : data.content ?? [];
  }, [data]);

  const filtered = useMemo(() => {
    if (!search.trim()) return courses;
    const q = search.toLowerCase();
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.category?.name?.toLowerCase().includes(q) ||
        c.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [search, courses]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-8 md:px-10 lg:px-20 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          All Courses
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Explore our full library of courses
        </p>

        {/* Search */}
        <div className="flex gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200
                         dark:border-gray-700 bg-gray-50 dark:bg-gray-800
                         text-gray-900 dark:text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200
                             dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600
                             dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 sm:px-8 md:px-10 lg:px-20 py-8">

        {/* Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-full bg-white dark:bg-gray-800 rounded-3xl border
                           border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse"
              >
                <div className="h-[200px] bg-gray-200 dark:bg-gray-700 m-3 rounded-2xl" />
                <div className="px-5 py-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded-full w-full" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded-full w-2/3" />
                  <div className="h-px bg-gray-100 dark:bg-gray-700 my-2" />
                  <div className="flex justify-between">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
                    <div className="h-5 bg-gray-100 dark:bg-gray-600 rounded-full w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-red-500 font-medium mb-3">
              Failed to load courses.
            </p>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-400 text-lg font-medium">No courses found</p>
            <p className="text-gray-300 text-sm mt-1">Try a different search term</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && filtered.length > 0 && (
          <>
            <p className="text-sm text-gray-400 mb-4">
              Showing {filtered.length} course{filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


// "use client";

// import { Star, Bookmark, Clock } from "lucide-react";
// import { useState } from "react";
// import Link from "next/link";
// import type { Course } from "@/store/services/courseApi";

// export default function CourseCard({ course }: { course?: Course }) {
//   const [saved, setSaved] = useState(false);

//   // ✅ Prevent crash if course is undefined
//   if (!course) {
//     return (
//       <div className="w-full h-[320px] bg-gray-100 dark:bg-gray-700 rounded-3xl animate-pulse" />
//     );
//   }

//   // ✅ Handle thumbnail safely (API may return imageUrl instead)
//   const thumbnailSrc =
//     course.thumbnail ||
//     (course as any).imageUrl ||
//     "/avatar.png";

//   // ✅ Safe category fallback
//   const category =
//     course.categoryName ??
//     course.category?.name ??
//     course.tags?.[0] ??
//     "Course";

//   return (
//     <Link href={`/courses/${course.id}`} className="block">
//       <div className="group w-full bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer h-full">
        
//         {/* Image */}
//         <div className="relative h-[200px] p-3 pb-0">
//           <div className="relative h-full w-full rounded-2xl overflow-hidden">
//             <img
//               src={thumbnailSrc}
//               alt={course.title || "course"}
//               className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//             />

//             {/* Category */}
//             <span className="absolute top-3 left-3 z-10 bg-[#1E2A78] text-[#C7CFFF] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full font-mono">
//               {category}
//             </span>

//             {/* Bookmark */}
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 setSaved(!saved);
//               }}
//               className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-white/30"
//             >
//               <Bookmark
//                 className={`w-4 h-4 stroke-[1.8px] transition-colors ${
//                   saved ? "fill-white stroke-white" : "fill-none stroke-white"
//                 }`}
//               />
//             </button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="px-5 py-4">
//           <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-1 line-clamp-1">
//             {course.title || "Untitled Course"}
//           </h3>

//           <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
//             {course.description || "No description available"}
//           </p>

//           <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex items-center justify-between">
            
//             {/* Price */}
//             <span className="text-2xl font-extrabold text-emerald-500">
//               {course.price === 0
//                 ? "Free"
//                 : `$${course.price ?? 0}`}
//             </span>

//             {/* Right Info */}
//             <div className="flex items-center gap-3">
              
//               {/* Duration */}
//               {course.duration && (
//                 <span className="flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 px-3 py-1.5 rounded-full">
//                   <Clock className="w-3 h-3" />
//                   {course.duration}
//                 </span>
//               )}

//               {/* Rating */}
//               <div className="flex items-center gap-1">
//                 <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
//                 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                   {course.rating?.toFixed(1) ?? "N/A"}
//                 </span>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }