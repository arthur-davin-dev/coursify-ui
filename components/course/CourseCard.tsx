// "use client";
// import { Star, Bookmark, Clock } from "lucide-react";
// import Link from "next/link";
// import type { Course } from "@/store/services/courseApi";
// import {
//   useCheckCourseBookmarkQuery,
//   useBookmarkCourseMutation,
//   useRemoveBookmarkCourseMutation,
// } from "@/store/services/bookmarkApi";

// export default function CourseCard({ course }: { course: Course }) {
//   const { data: checkData } = useCheckCourseBookmarkQuery(String(course.id));
//   const isSaved = checkData?.bookmarked ?? false;

//   const [bookmarkCourse] = useBookmarkCourseMutation();
//   const [removeBookmarkCourse] = useRemoveBookmarkCourseMutation();

//   const handleBookmark = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     try {
//       if (isSaved) {
//         await removeBookmarkCourse(String(course.id)).unwrap();
//       } else {
//         await bookmarkCourse(String(course.id)).unwrap();
//       }
//     } catch (err) {
//       console.error("Bookmark error:", err);
//     }
//   };

//   const thumbnailSrc =
//     course.thumbnail && course.thumbnail !== ""
//       ? course.thumbnail
//       : "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=900&q=80";

//   const category = course.category?.name ?? course.tags?.[0] ?? "Course";

//   return (
//     <Link
//       href={`/courses/${course.id}`}
//       // Added flex flex-col h-full
//       className="flex flex-col h-full group w-full bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
//     >
//       <div className="relative h-[200px] p-3 pb-0 shrink-0">
//         <div className="relative h-full w-full rounded-2xl overflow-hidden">
//           <img
//             src={thumbnailSrc}
//             alt={course.title}
//             className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//           />

//           <span className="absolute top-3 left-3 z-10 bg-[#1E2A78] text-[#C7CFFF] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full font-mono">
//             {category}
//           </span>

//           <button
//             onClick={handleBookmark}
//             className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-white/30 cursor-pointer"
//           >
//             <Bookmark
//               className={`w-4 h-4 stroke-[1.8px] transition-colors ${
//                 isSaved ? "fill-white stroke-white" : "fill-none stroke-white"
//               }`}
//             />
//           </button>
//         </div>
//       </div>

//       {/* Added flex-1 and flex-col to expand this container */}
//       <div className="px-5 py-4 flex flex-1 flex-col">
//         <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-1 line-clamp-1">
//           {course.title}
//         </h3>

//         {/* flex-grow allows the description area to take up available space, pushing the footer down */}
//         <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2 flex-grow">
//           {course.description}
//         </p>

//         <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex items-center justify-between mt-auto">
//           <span className="text-2xl font-extrabold text-emerald-500">
//             {course.price === 0 ? "Free" : `$${course.price}`}
//           </span>

//           <div className="flex items-center gap-3">
//             {course.duration && (
//               <span className="flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 px-3 py-1.5 rounded-full">
//                 <Clock className="w-3 h-3" />
//                 {course.duration}
//               </span>
//             )}
//             <div className="flex items-center gap-1">
//               <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
//               <span className="text-sm font-medium text-gray-500">
//                 {course.rating?.toFixed(1) ?? "4.5"}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

"use client";
import { Bookmark, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import type { Course } from "@/store/services/courseApi";
import {
  useCheckCourseBookmarkQuery,
  useBookmarkCourseMutation,
  useRemoveBookmarkCourseMutation,
} from "@/store/services/bookmarkApi";

export default function CourseCard({ course }: { course: Course }) {
  const { data: checkData } = useCheckCourseBookmarkQuery(String(course.id));
  const isSaved = checkData?.bookmarked ?? false;

  const [bookmarkCourse] = useBookmarkCourseMutation();
  const [removeBookmarkCourse] = useRemoveBookmarkCourseMutation();

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isSaved) {
        await removeBookmarkCourse(String(course.id)).unwrap();
      } else {
        await bookmarkCourse(String(course.id)).unwrap();
      }
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  const thumbnailSrc =
    course.thumbnail && course.thumbnail !== ""
      ? course.thumbnail
      : "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=900&q=80";

  const category = course.categoryName ?? course.tags?.[0] ?? "Course";
  const lessonCount = course.lessons?.length ?? 0;
  const teacherInitial = course.teacherName?.charAt(0).toUpperCase() ?? "T";

  return (
    <Link
      href={`/courses/${course.id}`}
      className="flex flex-col h-full group w-full bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-[200px] p-3 pb-0 shrink-0">
        <div className="relative h-full w-full rounded-2xl overflow-hidden">
          <img
            src={thumbnailSrc}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span className="absolute top-3 left-3 z-10 bg-[#1E2A78] text-[#C7CFFF] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full font-mono">
            {category}
          </span>

          <button
            onClick={handleBookmark}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-white/30 cursor-pointer"
          >
            <Bookmark
              className={`w-4 h-4 stroke-[1.8px] transition-colors ${
                isSaved ? "fill-white stroke-white" : "fill-none stroke-white"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 flex flex-1 flex-col">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-1 line-clamp-1">
          {course.title}
        </h3>

        <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2 flex-grow">
          {course.description}
        </p>

        {/* Footer */}
        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex items-center justify-between mt-auto gap-3">
          {/* Teacher — links to profile */}
          <Link
            href={`/profile/${course.teacherId}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 min-w-0 hover:opacity-75 transition-opacity"
          >
            {course.teacherImageUrl ? (
              <img
                src={course.teacherImageUrl}
                alt={course.teacherName}
                className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-gray-100 dark:ring-gray-700"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#1E2A78] flex items-center justify-center shrink-0 ring-2 ring-gray-100 dark:ring-gray-700">
                <span className="text-xs font-bold text-[#C7CFFF]">
                  {teacherInitial}
                </span>
              </div>
            )}
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 truncate">
              {course.teacherName}
            </span>
          </Link>

          {/* Right: duration + lesson count */}
          <div className="flex items-center gap-2 shrink-0">
            {course.duration && (
              <span className="flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 px-3 py-1.5 rounded-full">
                <Clock className="w-3 h-3" />
                {course.duration}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 px-3 py-1.5 rounded-full">
              <BookOpen className="w-3 h-3" />
              {lessonCount} lessons
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
