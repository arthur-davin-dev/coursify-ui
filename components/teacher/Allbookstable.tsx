"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "@/store/services/bookApi";
import type { Book } from "@/store/services/bookApi";
import {
  BookMarked,
  Plus,
  ArrowLeft,
  Trash2,
  Pencil,
  Eye,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

// ─── Delete Modal ─────────────────────────────────────────────────────────────
const DeleteModal = ({
  book,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  book: Book;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    onClick={onCancel}
  >
    <div
      className="bg-[var(--bg-card)] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-[var(--border)]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-1 w-full bg-red-500" />
      <div className="px-7 py-8 flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/20 flex items-center justify-center mb-4">
          <Trash2 size={24} className="text-red-500" strokeWidth={1.75} />
        </div>
        <h2 className="text-xl font-black text-[var(--text)] mb-1.5 font-inter">
          Delete Book?
        </h2>
        <p className="text-sm font-semibold text-[var(--text)] mb-1 line-clamp-2 font-inter">
          {book.title}
        </p>
        <p className="text-xs text-[var(--text-muted)] mb-7 font-inter">
          This action cannot be undone.
        </p>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm mb-3 flex items-center justify-center gap-2 transition-all disabled:opacity-60 font-inter"
        >
          {isDeleting ? "Deleting..." : "Yes, Delete Book"}
        </button>
        <button
          onClick={onCancel}
          className="w-full py-3 rounded-xl border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] font-semibold text-sm transition-all flex items-center justify-center gap-2 font-inter"
        >
          <ArrowLeft size={14} /> Cancel
        </button>
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AllBooksTable() {
  const router = useRouter();
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const { data, isLoading, isError } = useGetBooksQuery();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const books: Book[] = Array.isArray(data)
    ? data
    : (data as any)?.content ?? [];

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    try {
      await deleteBook(bookToDelete.id).unwrap();
      toast.success("Book deleted successfully");
    } catch {
      toast.error("Failed to delete book");
    } finally {
      setBookToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-soft)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-2">
              <BookMarked size={11} className="text-amber-500" />
              <span className="text-[0.62rem] text-amber-500 font-bold tracking-widest uppercase font-inter">
                Library
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight font-inter">
              Manage Books
            </h1>
          </div>
          <button
            onClick={() => router.push("/library/create-book")}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-500/90 text-white text-sm font-bold font-inter transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/20"
          >
            <Plus size={18} /> Add Book
          </button>
        </div>

        {/* Error */}
        {isError && (
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/20 rounded-xl px-5 py-4 mb-6">
            <p className="text-sm text-red-500 font-inter">
              Failed to load books. Please try again.
            </p>
          </div>
        )}

        {/* Table */}
        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-soft)]/50 border-b border-[var(--border)]">
                  <th className="px-6 py-4 text-[0.65rem] font-bold text-[var(--text-muted)] uppercase tracking-widest font-inter">
                    Book
                  </th>
                  <th className="px-6 py-4 text-[0.65rem] font-bold text-[var(--text-muted)] uppercase tracking-widest font-inter hidden lg:table-cell">
                    Categories
                  </th>
                  <th className="px-6 py-4 text-[0.65rem] font-bold text-[var(--text-muted)] uppercase tracking-widest font-inter hidden md:table-cell">
                    Uploaded by
                  </th>
                  <th className="px-6 py-4 text-[0.65rem] font-bold text-[var(--text-muted)] uppercase tracking-widest font-inter text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {isLoading ? (
                  [...Array(4)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-14 rounded-lg bg-[var(--bg-soft)]" />
                          <div className="space-y-2 flex-1">
                            <div className="h-3 bg-[var(--bg-soft)] rounded w-3/4" />
                            <div className="h-2.5 bg-[var(--bg-soft)] rounded w-1/2" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 hidden lg:table-cell">
                        <div className="h-3 bg-[var(--bg-soft)] rounded w-24" />
                      </td>
                      <td className="px-6 py-5 hidden md:table-cell">
                        <div className="h-3 bg-[var(--bg-soft)] rounded w-20" />
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[var(--bg-soft)]" />
                          <div className="w-8 h-8 rounded-lg bg-[var(--bg-soft)]" />
                          <div className="w-8 h-8 rounded-lg bg-[var(--bg-soft)]" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : books.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <BookMarked
                          size={32}
                          className="text-gray-300 dark:text-slate-600"
                        />
                        <p className="text-sm text-[var(--text-muted)] font-inter">
                          No books yet. Add your first one!
                        </p>
                        <button
                          onClick={() => router.push("/library/create")}
                          className="text-xs text-amber-500 hover:underline font-medium font-inter"
                        >
                          Add a book →
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  books.map((book) => (
                    <tr
                      key={book.id}
                      className="hover:bg-[var(--bg-soft)]/30 transition-colors"
                    >
                      {/* Book info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {book.thumbnail ? (
                            <img
                              src={book.thumbnail}
                              alt={book.title}
                              className="w-10 h-14 rounded-lg object-cover flex-shrink-0 shadow-sm"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://placehold.co/40x56?text=No+Cover";
                              }}
                            />
                          ) : (
                            <div className="w-10 h-14 rounded-lg bg-amber-50 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                              <BookMarked
                                size={16}
                                className="text-amber-300"
                              />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[var(--text)] font-inter line-clamp-1">
                              {book.title}
                            </p>
                            <p className="text-xs text-[var(--text-muted)] line-clamp-1 mt-0.5 font-inter max-w-[220px]">
                              {book.description || "No description"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Categories */}
                      <td className="px-6 py-4 hidden lg:table-cell">
                        {book.categories && book.categories.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {book.categories.slice(0, 2).map((cat, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-semibold font-inter border border-amber-200/50 dark:border-amber-700/30"
                              >
                                {cat}
                              </span>
                            ))}
                            {book.categories.length > 2 && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-soft)] text-[var(--text-muted)] font-semibold font-inter">
                                +{book.categories.length - 2}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-[var(--text-muted)] font-inter">
                            —
                          </span>
                        )}
                      </td>

                      {/* Uploader */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        {book.uploadedByName ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-slate-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-[9px] font-bold text-indigo-500 dark:text-indigo-300">
                                {book.uploadedByName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-[var(--text)] font-inter">
                              {book.uploadedByName}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-[var(--text-muted)] font-inter">
                            —
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {/* View PDF */}
                          {book.file_url && (
                            <a
                              href={book.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg hover:bg-amber-500/10 text-amber-500 transition-colors"
                              title="Open PDF"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                          {/* View detail */}
                          <button
                            onClick={() =>
                              router.push(`/dashboard/teacher/books/${book.id}`)
                            }
                            className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          {/* Edit */}
                          <button
                            onClick={() =>
                              router.push(
                                `/dashboard/teacher/edit-book/${book.id}`
                              )
                            }
                            className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-500 transition-colors"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => setBookToDelete(book)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          {!isLoading && books.length > 0 && (
            <div className="px-6 py-3 border-t border-[var(--border)] bg-[var(--bg-soft)]/30">
              <p className="text-xs text-[var(--text-muted)] font-inter">
                {books.length} {books.length === 1 ? "book" : "books"} total
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete modal */}
      {bookToDelete && (
        <DeleteModal
          book={bookToDelete}
          isDeleting={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setBookToDelete(null)}
        />
      )}
    </div>
  );
}