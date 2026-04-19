"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LiaAngleRightSolid } from "react-icons/lia";
import { ImSpinner2 } from "react-icons/im";
import BookCard from "@/components/book/BookCard";
import { useGetBookByIdQuery, useGetBooksQuery } from "@/store/services/bookApi";
import BookDetailsPdf from "@/components/book/BookDetailsPdf";

export default function BookDetails() {
  const params = useParams();
  const id = params?.id as string;

  const { data: book, isLoading: bookLoading, error: bookError } = useGetBookByIdQuery(id, { skip: !id });
  const { data: allBooksData } = useGetBooksQuery();

  const relatedBooks = useMemo(() => {
    if (!book || !allBooksData) return [];
    const booksList = Array.isArray(allBooksData) ? allBooksData : allBooksData.content || [];
    
    return booksList.filter(
      (b) => b.id !== book.id && b.categories?.some((c) => book.categories?.includes(c))
    );
  }, [book, allBooksData]);

  // Loading State with hardcoded dark blue
  if (bookLoading) return (
    <div className="h-screen flex justify-center items-center bg-white dark:bg-[#1A1F3A]">
      <ImSpinner2 className="animate-spin text-5xl text-blue-500" />
    </div>
  );

  if (bookError || !book) return <div className="p-10 text-center text-red-500 font-bold">Book not found.</div>;

  const proxiedPdfUrl = book.fileUrl?.replace("http://localhost:8080/api", "/api");

  return (
    /* MAIN BACKGROUND: Hardcoded to #1A1F3A */
    <div className="bg-gray-100 dark:bg-[#1A1F3A] min-h-screen py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-3 text-[15px] font-semibold text-gray-600 dark:text-gray-300">
          <Link href="/library" className="hover:text-blue-500 transition-colors">Library</Link>
          <LiaAngleRightSolid />
          <span className="text-blue-500 truncate max-w-[300px]">{book.title}</span>
        </nav>

        <div className="grid grid-cols-12 gap-8">
          
          {/* MAIN CONTENT CARD: Hardcoded secondary blue #242B4D */}
          <main className="col-span-12 lg:col-span-8 bg-white dark:bg-[#242B4D] rounded-2xl p-6 md:p-8 shadow-xl border border-transparent dark:border-gray-700/50">
            
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              <div className="shrink-0">
                <img 
                  src={book.thumbnail} 
                  alt="Cover" 
                  className="w-full md:w-[280px] rounded-xl shadow-2xl object-cover aspect-[3/4] border dark:border-gray-700" 
                />
              </div>
              
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                  {book.title}
                </h1>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                     {book.uploadedByName?.charAt(0) || "U"}
                   </div>
                   <p className="text-gray-500 dark:text-gray-300 font-medium">
                     Uploaded by <span className="text-blue-500 font-bold">{book.uploadedByName}</span>
                   </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b dark:border-gray-700 pb-2">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {book.description}
              </p>
            </div>
            
            {/* PDF Viewer */}
            <div className="rounded-xl overflow-hidden shadow-inner">
               <BookDetailsPdf fileUrl={proxiedPdfUrl} />
            </div>
          </main>

          {/* SIDEBAR */}
          <aside className="col-span-12 lg:col-span-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 justify-items-center lg:justify-items-start">
              {relatedBooks.length > 0 ? (
                relatedBooks.slice(0, 4).map((b) => (
                  <Link key={b.id} href={`/library/${b.id}`} className="block w-full max-w-[210px] group transition-transform hover:-translate-y-1">
                    <BookCard book={b} />
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 italic dark:text-gray-400">No related books found.</p>
              )}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}