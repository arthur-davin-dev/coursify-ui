// "use client";
// import React, { useMemo } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { LiaAngleRightSolid } from "react-icons/lia";
// import { ImSpinner2 } from "react-icons/im";

// import BookDetailsPdf from "./BookDetailsPdf";
// import BookCard from "./BookCard";
// import { useGetBookByIdQuery, useGetBooksQuery } from "@/store/services/bookApi";

// export default function BookDetails() {
//   const params = useParams();
//   const id = params?.id as string;

//   const { data: book, isLoading: bookLoading, error: bookError } = useGetBookByIdQuery(id, { skip: !id });
//   const { data: allBooksData } = useGetBooksQuery();

//   const relatedBooks = useMemo(() => {
//     if (!book || !allBooksData?.content) return [];
//     // Ensure content is treated as an array
//     const booksArray = Array.isArray(allBooksData.content) ? allBooksData.content : [];
//     return booksArray.filter(
//       (b) => b.id !== book.id && b.categories?.some((cat) => book.categories?.includes(cat))
//     );
//   }, [book, allBooksData]);

//   if (bookLoading) {
//     return (
//       <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-darkbg z-50">
//         <ImSpinner2 className="animate-spin text-5xl text-blue-500" />
//       </div>
//     );
//   }

//   if (bookError || !book) return <p className="text-center mt-10 text-red-500 font-bold">Book not found.</p>;

//   const proxiedFileUrl = book.fileUrl?.replace("http://localhost:8080/api", "/backend-api");

//   return (
//     <div className="bg-gray-100 dark:bg-darkbg min-h-screen py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Breadcrumb */}
//         <div className="mb-6 flex items-center gap-3 text-[15px] font-semibold">
//           <Link href="/library" className="text-primary dark:text-white hover:underline">Library</Link>
//           <LiaAngleRightSolid className="text-primary dark:text-white" />
//           <Link href="/library/all-books" className="text-primary dark:text-white hover:underline">All Books</Link>
//           <LiaAngleRightSolid className="text-primary dark:text-white" />
//           <p className="text-blue-500 truncate">{book.title}</p>
//         </div>

//         <div className="grid grid-cols-12 gap-8">
//           {/* Main Book Content */}
//           <div className="col-span-12 lg:col-span-8 bg-white dark:bg-darksecbg rounded-2xl p-6 md:p-8 shadow-sm">
//             <div className="flex flex-col md:flex-row gap-8">
//               <div className="w-full md:w-[280px] shrink-0">
//                 <img src={book.thumbnail} alt={book.title} className="w-full rounded-xl shadow-lg object-cover aspect-[3/4]" />
//               </div>
//               <div className="flex flex-col justify-center">
//                 <h1 className="text-3xl md:text-5xl font-bold text-primary dark:text-white mb-6">
//                   {book.title}
//                 </h1>
//                 <div>
//                   <p className="text-gray-400 font-medium text-sm uppercase tracking-wider">Uploaded by</p>
//                   <div className="flex items-center gap-3 mt-2 text-gray-700 dark:text-white">
//                     <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//                        {book.uploadedByName?.charAt(0) || "A"}
//                     </div>
//                     <span className="font-semibold text-lg">{book.uploadedByName || "Unknown Author"}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-10">
//               <h2 className="text-2xl font-bold text-primary dark:text-white border-b pb-2 dark:border-gray-700">Description</h2>
//               <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
//                 {book.description}
//               </p>
//             </div>

//             <div className="mt-12">
//               <BookDetailsPdf fileUrl={proxiedFileUrl} />
//             </div>
//           </div>

//           {/* Sidebar - Related Books */}
//           <aside className="col-span-12 lg:col-span-4">
//             <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Related Books</h2>
//             <div className="flex flex-col gap-6 items-center lg:items-start">
//               {relatedBooks.length > 0 ? (
//                 relatedBooks.map((b) => (
//                   <Link 
//                     key={b.id} 
//                     href={`/library/book/${b.id}`} 
//                     className="block w-full max-w-[210px] group"
//                   >
//                     <BookCard book={b} />
//                   </Link>
//                 ))
//               ) : (
//                 <p className="text-gray-500 italic">No related books found.</p>
//               )}
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LiaAngleRightSolid } from "react-icons/lia";
import { ImSpinner2 } from "react-icons/im";

import BookDetailsPdf from "./BookDetailsPdf";
import BookCard from "./BookCard";
import { useGetBookByIdQuery, useGetBooksQuery } from "@/store/services/bookApi";

export default function BookDetails() {
  const params = useParams();
  const id = params?.id as string;

  const { data: book, isLoading: bookLoading, error: bookError } = useGetBookByIdQuery(id, { skip: !id });
  const { data: allBooksData } = useGetBooksQuery();

  const relatedBooks = useMemo(() => {
    if (!book || !allBooksData) return [];
    const booksArray = Array.isArray(allBooksData) ? allBooksData : allBooksData.content || [];
    return booksArray.filter((b) => b.id !== book.id);
  }, [book, allBooksData]);

  if (bookLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-[#1A1F3A] z-50">
        <ImSpinner2 className="animate-spin text-5xl text-blue-500" />
      </div>
    );
  }

  if (bookError || !book) return <p className="text-center mt-10 text-red-500">Book not found.</p>;

  return (
    // Hardcoded hex for the background to ensure it works even if tailwind config fails
    <div className="min-h-screen py-8 bg-gray-100 dark:bg-[#1A1F3A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-3 text-sm font-semibold">
          <Link href="/library" className="text-gray-600 dark:text-gray-300">Library</Link>
          <LiaAngleRightSolid className="text-gray-400" />
          <p className="text-blue-500 truncate">{book.title}</p>
        </nav>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Card - using hardcoded secondary dark color #242B4D */}
          <main className="col-span-12 lg:col-span-8 bg-white dark:bg-[#242B4D] rounded-2xl p-6 md:p-8 shadow-xl border border-transparent dark:border-gray-700/30">
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              <div className="w-full md:w-[280px] shrink-0">
                <img src={book.thumbnail} alt="" className="w-full rounded-xl shadow-2xl border dark:border-gray-600" />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                  {book.title}
                </h1>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {book.uploadedByName?.charAt(0)}
                  </div>
                  <span className="font-bold text-lg dark:text-gray-200">{book.uploadedByName}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-white border-b dark:border-gray-700 pb-2">Description</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{book.description}</p>
            </div>

            <div className="mt-12 pt-8 border-t dark:border-gray-700">
              {/* <BookDetailsPdf fileUrl={book.fileUrl?.replace("http://localhost:8080/api", "/api")} /> */}
              <BookDetailsPdf fileUrl={book.file_url} />
            </div>
          </main>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4">
            <h2 className="text-2xl font-bold dark:text-white mb-6">Related Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {relatedBooks.slice(0, 4).map((b) => (
                <Link key={b.id} href={`/library/${b.id}`} className="w-full max-w-[210px] group">
                  <BookCard book={b} />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}