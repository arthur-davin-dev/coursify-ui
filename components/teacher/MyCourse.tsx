// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// const courses = [
//   {
//     id: 1,
//     title: "Abstract 3D",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     students: 20,
//     image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=80&h=60&fit=crop",
//   },
//   {
//     id: 2,
//     title: "Sarphens Illustration",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     students: 20,
//     image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=80&h=60&fit=crop",
//   },
//   {
//     id: 3,
//     title: "Landing Page 3D max",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     students: 20,
//     image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&h=60&fit=crop",
//   },
//   {
//     id: 4,
//     title: "Collab Illustration",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     students: 20,
//     image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=80&h=60&fit=crop",
//   },
// ];

// export default function MyCourse() {
//   return (
//     <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 mb-6 transition-colors duration-300">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">
//           My <span className="text-amber-500">Courses</span>
//         </h2>
//         <Link
//           href="/dashboard/teacher/courses"
//           className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
//         >
//           See All Courses <ArrowRight size={15} />
//         </Link>
//       </div>

//       {/* Table header */}
//       <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wide px-2 mb-2 border-b border-gray-100 dark:border-slate-800 pb-2">
//         <span>Course Name</span>
//         <span>Total Student</span>
//       </div>

//       {/* Rows */}
//       <div className="divide-y divide-gray-50 dark:divide-slate-800">
//         {courses.map((course) => (
//           <Link
//             key={course.id}
//             href={`/dashboard/teacher/courses/${course.id}`}
//             className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
//           >
//             <div className="flex items-center gap-3">
//               <img
//                 src={course.image}
//                 alt={course.title}
//                 className="w-14 h-10 rounded-lg object-cover shadow-sm flex-shrink-0"
//               />
//               <div>
//                 <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{course.title}</p>
//                 <p className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-xs">{course.description}</p>
//               </div>
//             </div>
//             <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{course.students}</span>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { ArrowRight, Loader2, BookOpen } from "lucide-react";
import { useGetMyCoursesQuery } from "@/store/services/courseApi";
import type { Course } from "@/store/services/courseApi";

export default function MyCourse() {
  const { data, isLoading, isError } = useGetMyCoursesQuery();

  const courses: Course[] = Array.isArray(data)
    ? data.slice(0, 4)
    : (data as any)?.content?.slice(0, 4) ?? [];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 mb-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">
          My <span className="text-amber-500">Courses</span>
        </h2>
        <Link
          href="/dashboard/teacher/courses"
          className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
        >
          See All Courses <ArrowRight size={15} />
        </Link>
      </div>

      {/* Table header */}
      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wide px-2 mb-2 border-b border-gray-100 dark:border-slate-800 pb-2">
        <span>Course Name</span>
        <span>Students</span>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <Loader2 size={22} className="animate-spin text-indigo-400" />
        </div>
      )}

      {/* Error */}
      {isError && (
        <p className="text-center text-sm text-red-400 py-6">
          Failed to load courses.
        </p>
      )}

      {/* Empty */}
      {!isLoading && !isError && courses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 gap-2">
          <BookOpen size={32} className="text-gray-300 dark:text-slate-600" />
          <p className="text-sm text-gray-400 dark:text-gray-500">No courses yet.</p>
          <Link
            href="/teacher/courses/create"
            className="text-xs text-indigo-500 hover:underline font-medium mt-1"
          >
            Create your first course →
          </Link>
        </div>
      )}

      {/* Rows */}
      {!isLoading && !isError && courses.length > 0 && (
        <div className="divide-y divide-gray-50 dark:divide-slate-800">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/teacher/courses/${course.id}`}
              className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                {/* Thumbnail */}
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-14 h-10 rounded-lg object-cover shadow-sm flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/56x40?text=No+Image";
                    }}
                  />
                ) : (
                  <div className="w-14 h-10 rounded-lg bg-indigo-50 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={16} className="text-indigo-300" />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate max-w-[200px]">
                    {course.title}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[200px]">
                    {course.description}
                  </p>
                  {/* Category + Published badge */}
                  <div className="flex items-center gap-2 mt-0.5">
                    {course.categoryName && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 font-medium">
                        {course.categoryName}
                      </span>
                    )}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      course.isPublished
                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500"
                        : "bg-gray-100 dark:bg-slate-700 text-gray-400"
                    }`}>
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Student count — adjust field name once you share API response */}
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 flex-shrink-0">
                {(course as any)?.enrollmentCount
                  ?? (course as any)?.studentCount
                  ?? (course as any)?.totalStudents
                  ?? "—"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}