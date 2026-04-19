"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useGetBooksQuery } from "@/store/services/bookApi";
import type { Book } from "@/store/services/bookApi";
import BookCard from "@/components/book/BookCard";
import { Search, RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";
import BookHero from "@/components/book/BookHero";
import TrendingBooks from "@/components/landing/TrendingBooks";

const BOOKS_PER_PAGE = 10;

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetBooksQuery();

  const books: Book[] = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : (data.content ?? []);
  }, [data]);

  const filtered = useMemo(() => {
    if (!search.trim()) return books;
    const q = search.toLowerCase();
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.uploadedByName?.toLowerCase().includes(q),
    );
  }, [search, books]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / BOOKS_PER_PAGE));

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * BOOKS_PER_PAGE;
    return filtered.slice(start, start + BOOKS_PER_PAGE);
  }, [filtered, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <BookHero />
      <div id="trending-books">
        <TrendingBooks /> {/* whatever your trending component is called */}
      </div>

      {/* Header Section */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
            Library
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">
            Browse our full collection of educational resources.
          </p>

          <div className="relative max-w-2xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="all-books">
        {/* Error State */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-full mb-4">
              <RefreshCcw className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Unable to load books
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1 mb-6">
              Please check your internet connection.
            </p>
            <button
              onClick={() => refetch()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-500/20"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-full aspect-[3/4] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-2xl mb-4" />
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md mb-2" />
                <div className="h-3 w-1/2 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md" />
              </div>
            ))}
          </div>
        )}

        {/* Success State */}
        {!isLoading && !isError && (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Showing{" "}
                {filtered.length === 0
                  ? 0
                  : (currentPage - 1) * BOOKS_PER_PAGE + 1}
                –{Math.min(currentPage * BOOKS_PER_PAGE, filtered.length)} of{" "}
                {filtered.length} results
              </p>
            </div>

            {paginated.length > 0 ? (
              <>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 justify-items-center">
                  {paginated.map((book) => (
                    <Link
                      key={book.id}
                      href={`/library/${book.id}`}
                      className="w-full max-w-[210px]"
                    >
                      <BookCard book={book} />
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-xl font-medium">
                  No books match your search.
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = useMemo(() => {
    const items: (number | "…")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
    } else {
      items.push(1);
      if (currentPage > 3) items.push("…");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) items.push(i);
      if (currentPage < totalPages - 2) items.push("…");
      items.push(totalPages);
    }
    return items;
  }, [currentPage, totalPages]);

  return (
    <div className="flex items-center justify-center gap-1.5 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 text-gray-400 select-none"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
              currentPage === p
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
