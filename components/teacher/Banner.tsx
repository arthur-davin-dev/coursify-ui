// "use client";

// import { BookOpen, Users, BookMarked, Loader2 } from "lucide-react";
// import { useGetMyCoursesQuery } from "@/store/services/courseApi";
// import { useGetMyBooksQuery } from "@/store/services/bookApi"; // ← changed
// import { useGetUserInfoQuery } from "@/store/features/users/userSlice";
// import { useSelector } from "react-redux";
// import type { RootState } from "@/store";
// import type { Course } from "@/store/services/courseApi";
// import { useGetTeacherStatsQuery } from "@/store/services/enrollmentApi";

// export default function Banner() {
//   const token = useSelector((s: RootState) => s.auth.token);
//   const { data: user } = useGetUserInfoQuery(undefined, { skip: !token });

//   const { data: courses, isLoading: loadingCourses } = useGetMyCoursesQuery();
//   const { data: books, isLoading: loadingBooks } = useGetMyBooksQuery(); // ← changed

//   // ── Counts ────────────────────────────────────────────────────────────────
//   const courseList: Course[] = Array.isArray(courses)
//     ? courses
//     : ((courses as any)?.content ?? []);

//   const totalCourses = courseList.length;

//   const totalBooks = Array.isArray(books)
//     ? books.length
//     : ((books as any)?.totalElements ?? (books as any)?.content?.length ?? 0);

//   // ── Total students = sum of enrollmentCount across all teacher's courses ──
//   // const totalStudents = courseList.reduce((sum, c) => {
//   //   return (
//   //     sum +
//   //     ((c as any).enrollmentCount ??
//   //       (c as any).studentCount ??
//   //       (c as any).totalStudents ??
//   //       (c as any).enrolledStudents ??
//   //       (c as any).totalEnrollments ??
//   //       0)
//   //   );
//   // }, 0);

//   const displayName = user
//     ? `${user.firstName} ${user.lastName}`.trim()
//     : "Teacher";

//   const { data: teacherStats, isLoading: loadingStats } =
//     useGetTeacherStatsQuery();
//   const totalStudents = teacherStats?.totalEnrollments ?? 0;
//   const stats = [
//     {
//       label: "Total Courses",
//       value: totalCourses,
//       loading: loadingCourses,
//       icon: BookOpen,
//       bg: "bg-rose-50 dark:bg-rose-950",
//       iconBg: "bg-rose-400 dark:bg-rose-500",
//       text: "text-rose-500 dark:text-rose-400",
//     },
//     {
//       label: "Total Students",
//       value: totalStudents,
//       loading: loadingStats,
//       icon: Users,
//       bg: "bg-amber-50 dark:bg-amber-950",
//       iconBg: "bg-amber-400 dark:bg-amber-500",
//       text: "text-amber-500 dark:text-amber-400",
//     },
//     {
//       label: "Total Books",
//       value: totalBooks,
//       loading: loadingBooks,
//       icon: BookMarked,
//       bg: "bg-violet-50 dark:bg-violet-950",
//       iconBg: "bg-violet-400 dark:bg-violet-500",
//       text: "text-violet-500 dark:text-violet-400",
//     },
//   ];

//   return (
//     <div className="mb-8">
//       <div className="mb-6">
//         <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
//           Welcome,{" "}
//           <span className="text-indigo-700 dark:text-indigo-400">
//             {displayName}
//           </span>{" "}
//           !
//         </h1>
//         <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
//           Dashboard
//         </p>
//       </div>

//       <div className="grid grid-cols-3 gap-4">
//         {stats.map(
//           ({ label, value, loading, icon: Icon, bg, iconBg, text }) => (
//             <div
//               key={label}
//               className={`${bg} rounded-2xl px-6 py-5 flex items-center gap-4 shadow-sm transition-colors duration-300`}
//             >
//               <div
//                 className={`${iconBg} w-11 h-11 rounded-xl flex items-center justify-center shadow`}
//               >
//                 <Icon size={20} className="text-white" />
//               </div>
//               <div>
//                 {loading ? (
//                   <Loader2
//                     size={20}
//                     className={`animate-spin ${text} mb-0.5`}
//                   />
//                 ) : (
//                   <p className={`text-2xl font-extrabold ${text}`}>
//                     {Number(value).toLocaleString()}
//                   </p>
//                 )}
//                 <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
//                   {label}
//                 </p>
//               </div>
//             </div>
//           ),
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { BookOpen, Users, BookMarked, Loader2 } from "lucide-react";
import { useGetMyCoursesQuery } from "@/store/services/courseApi";
import { useGetMyBooksQuery } from "@/store/services/bookApi";
import { useGetUserInfoQuery } from "@/store/features/users/userSlice";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { Course } from "@/store/services/courseApi";
import { useGetTeacherStatsQuery } from "@/store/services/enrollmentApi";

export default function Banner() {
  const token = useSelector((s: RootState) => s.auth.token);
  const { data: user } = useGetUserInfoQuery(undefined, { skip: !token });

  const { data: courses, isLoading: loadingCourses } = useGetMyCoursesQuery();
  const { data: books, isLoading: loadingBooks } = useGetMyBooksQuery();
  const { data: teacherStats, isLoading: loadingStats } = useGetTeacherStatsQuery();

  // ── Data Processing ────────────────────────────────────────────────────────
  const courseList: Course[] = Array.isArray(courses)
    ? courses
    : ((courses as any)?.content ?? []);

  const totalCourses = courseList.length;
  const totalStudents = teacherStats?.totalEnrollments ?? 0;
  const totalBooks = Array.isArray(books)
    ? books.length
    : ((books as any)?.totalElements ?? (books as any)?.content?.length ?? 0);

  const displayName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : "Teacher";

  const stats = [
    {
      label: "Total Courses",
      value: totalCourses,
      loading: loadingCourses,
      icon: BookOpen,
      bg: "bg-rose-50 dark:bg-rose-950/30",
      iconBg: "bg-rose-400 dark:bg-rose-500",
      text: "text-rose-600 dark:text-rose-400",
    },
    {
      label: "Total Students",
      value: totalStudents,
      loading: loadingStats,
      icon: Users,
      bg: "bg-amber-50 dark:bg-amber-950/30",
      iconBg: "bg-amber-400 dark:bg-amber-500",
      text: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Total Books",
      value: totalBooks,
      loading: loadingBooks,
      icon: BookMarked,
      bg: "bg-violet-50 dark:bg-violet-950/30",
      iconBg: "bg-violet-400 dark:bg-violet-500",
      text: "text-violet-600 dark:text-violet-400",
    },
  ];

  return (
    <div className="mb-8">
      {/* ── Header Section ── */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100 transition-all">
          Welcome,{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            {displayName}
          </span>{" "}
          !
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">
          Here&apos;s what&apos;s happening with your academy today.
        </p>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {stats.map(({ label, value, loading, icon: Icon, bg, iconBg, text }) => (
          <div
            key={label}
            className={`${bg} border border-transparent dark:border-gray-800/50 rounded-3xl p-5 lg:p-6 flex items-center gap-5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group`}
          >
            {/* Icon Wrapper */}
            <div
              className={`${iconBg} w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 group-hover:rotate-6 transition-transform`}
            >
              <Icon size={24} className="text-white" />
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
              {loading ? (
                <Loader2
                  size={24}
                  className={`animate-spin ${text} mb-1`}
                />
              ) : (
                <span className={`text-2xl lg:text-3xl font-black ${text} leading-none tracking-tight`}>
                  {Number(value).toLocaleString()}
                </span>
              )}
              <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider mt-1">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}