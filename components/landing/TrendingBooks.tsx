"use client";
import React, { useMemo } from 'react';
import Link from "next/link";
import { useGetBooksQuery } from "@/store/services/bookApi";
import BookCard from "@/components/book/BookCard";
import { Loader2 } from "lucide-react";

export default function TrendingBooks() {
  // 1. Fetch data using your existing bookApi hook
  const { data, isLoading, isError } = useGetBooksQuery();

  // 2. Limit the display to the "Top 5" for the trending section
  const trendingBooks = useMemo(() => {
    if (!data) return [];
    const booksArray = Array.isArray(data) ? data : data.content ?? [];
    return booksArray.slice(0, 5); // Match the 5-item layout in the image
  }, [data]);

  return (
    <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section matching your trending image style */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Top Trending <span className="text-blue-600">Books</span>
          </h2>
          <Link 
            href="/library" 
            className="text-sm font-bold text-blue-600 hover:underline transition-all"
          >
            View Library
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex h-48 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-10 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-500">Could not load trending books.</p>
          </div>
        )}

        {/* Book Grid - Matches the 5-column layout */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8 justify-items-center">
            {trendingBooks.map((book) => (
              <Link 
                key={book.id} 
                href={`/library/${book.id}`}
                className="w-full group"
              >
                {/* Reusing your BookCard component for consistency */}
                <BookCard book={book} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}