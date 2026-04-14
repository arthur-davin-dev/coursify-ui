// "use client";

// import { useState } from "react";
// import { Book, GraduationCap, Heart, Search } from "lucide-react";

// type TabType = "courses" | "books";

// export default function FavouritesPage() {
//   const [activeTab, setActiveTab] = useState<TabType>("courses");

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Header Section */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
//           <Heart className="text-red-500 fill-red-500" size={24} />
//           My Favorites
//         </h1>
//         <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
//           Everything you've saved for later.
//         </p>
//       </div>

//       {/* Tabs Navigation */}
//       <div className="flex gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-2xl w-fit mb-8">
//         <button
//           onClick={() => setActiveTab("courses")}
//           className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
//             activeTab === "courses"
//               ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
//               : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//           }`}
//         >
//           <GraduationCap size={18} />
//           Courses
//         </button>
//         <button
//           onClick={() => setActiveTab("books")}
//           className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
//             activeTab === "books"
//               ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
//               : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//           }`}
//         >
//           <Book size={18} />
//           Books
//         </button>
//       </div>

//       {/* Content Area */}
//       <div className="min-h-[400px]">
//         {activeTab === "courses" ? (
//           <FavoriteCoursesList />
//         ) : (
//           <FavoriteBooksList />
//         )}
//       </div>
//     </div>
//   );
// }

// // ── Sub-components ──

// function FavoriteCoursesList() {
//   // const { data: courses, isLoading } = useGetFavoriteCoursesQuery();
//   const courses = []; // Placeholder

//   if (courses.length === 0) return <EmptyState type="courses" />;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {/* Map your course cards here */}
//     </div>
//   );
// }

// function FavoriteBooksList() {
//   // const { data: books, isLoading } = useGetFavoriteBooksQuery();
//   const books = []; // Placeholder

//   if (books.length === 0) return <EmptyState type="books" />;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {/* Map your book cards here */}
//     </div>
//   );
// }

// function EmptyState({ type }: { type: TabType }) {
//   return (
//     <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-3xl">
//       <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-gray-300">
//         <Search size={32} />
//       </div>
//       <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//         No favorite {type} yet
//       </h3>
//       <p className="text-gray-500 max-w-xs mx-auto text-sm mt-2">
//         Start exploring and click the heart icon to save {type} you love!
//       </p>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Book as BookIcon, GraduationCap, Heart, Loader2 } from "lucide-react";
import { useGetMyBookmarkedBooksQuery, useGetMyBookmarkedCoursesQuery } from "@/store/services/bookmarkApi";
import BookCard from "@/components/book/BookCard";
import CourseCard from "@/components/course/CourseCard";

type TabType = "courses" | "books";

export default function FavouritesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("courses");

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
          <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <Heart className="text-red-500 fill-red-500" size={28} />
          </div>
          My Library
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">
          Manage your saved courses and personal book collection.
        </p>
      </div>

      <div className="inline-flex p-1.5 bg-gray-100 dark:bg-slate-800 rounded-2xl mb-8">
        <TabButton
          active={activeTab === "courses"}
          onClick={() => setActiveTab("courses")}
          icon={<GraduationCap size={20} />}
          label="My Courses"
        />
        <TabButton
          active={activeTab === "books"}
          onClick={() => setActiveTab("books")}
          icon={<BookIcon size={20} />}
          label="My Books"
        />
      </div>

      <div className="transition-all duration-300">
        {activeTab === "courses" ? <FavoriteCourses /> : <FavoriteBooks />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 px-8 py-3 rounded-xl text-sm font-black transition-all ${
        active
          ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm scale-100"
          : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 scale-95"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function FavoriteCourses() {
  const { data, isLoading, error } = useGetMyBookmarkedCoursesQuery();

  // Unwrap nested response — handles { content: [] }, { data: [] }, or plain []
  const courses = Array.isArray(data)
    ? data
    : (data as any)?.content ?? (data as any)?.data ?? [];

  console.log("bookmark courses raw:", data);

  if (isLoading) return <LoadingState />;
  if (error) return (
    <div className="text-red-400 text-sm p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl">
      Failed to load courses: {JSON.stringify(error)}
    </div>
  );
  if (!courses.length) return <EmptyState type="courses" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
      {courses.map((course: any) => (
        <CourseCard key={course.id} course={course} /> // ✅ reuses your existing card
      ))}
    </div>
  );
}

function FavoriteBooks() {
  const { data, isLoading, error } = useGetMyBookmarkedBooksQuery();

  // Unwrap nested response
  const books = Array.isArray(data)
    ? data
    : (data as any)?.content ?? (data as any)?.data ?? [];

  console.log("bookmark books raw:", data);

  if (isLoading) return <LoadingState />;
  if (error) return (
    <div className="text-red-400 text-sm p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl">
      Failed to load books: {JSON.stringify(error)}
    </div>
  );
  if (!books.length) return <EmptyState type="books" />;

  return (
    <div className="flex flex-wrap gap-6 animate-in fade-in slide-in-from-bottom-4">
      {books.map((book: any) => (
        <BookCard key={book.id} book={book} /> // ✅ reuses your existing card
      ))}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
      <p className="text-gray-400 text-sm font-medium">Fetching your items...</p>
    </div>
  );
}

function EmptyState({ type }: { type: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 rounded-[40px] border-2 border-dashed border-gray-100 dark:border-slate-800">
      <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-full mb-4">
        <Heart className="text-gray-200 dark:text-slate-700" size={48} />
      </div>
      <h3 className="text-xl font-black text-gray-800 dark:text-white">
        Your {type} list is empty
      </h3>
      <p className="text-gray-400 text-sm mt-2 max-w-[250px] text-center">
        Explore our library and save your first {type === "courses" ? "course" : "book"}!
      </p>
    </div>
  );
}