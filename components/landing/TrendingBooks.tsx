"use client";
import React, { useMemo } from 'react';
import Link from "next/link";
import { useGetBooksQuery } from "@/store/services/bookApi";
import BookCard from "@/components/book/BookCard";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion"; // 1. Import motion

// Container variants to handle the staggering of the 5 books
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Slightly slower stagger for a "premium" feel
    },
  },
};

// Individual book animation: slide up and fade in
const bookVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" as const } // Smooth ease-out
  },
};

export default function TrendingBooks() {
  const { data, isLoading, isError } = useGetBooksQuery();

  const trendingBooks = useMemo(() => {
    if (!data) return [];
    const booksArray = Array.isArray(data) ? data : data.content ?? [];
    return booksArray.slice(0, 5); 
  }, [data]);

  return (
    <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden border-t border-gray-200 dark:border-gray-800 rounded-[2.5rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section with Slide-in animation */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between mb-10"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Top Trending <span className="text-blue-600">Books</span>
          </h2>
          <Link 
            href="/library" 
            className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all"
          >
            View Library
          </Link>
        </motion.div>

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

        {/* Book Grid with Framer Motion */}
        {!isLoading && !isError && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of the grid is visible
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8 justify-items-center"
          >
            {trendingBooks.map((book) => (
              <motion.div 
                key={book.id} 
                variants={bookVariants}
                className="w-full"
                whileHover={{ y: -8 }} // Added a small lift on hover
              >
                <Link 
                  href={`/library/${book.id}`}
                  className="w-full group"
                >
                  <BookCard book={book} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}