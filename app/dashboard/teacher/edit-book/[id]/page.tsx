// import EditBookPage from '@/components/book/EditBookPage'

// export default function page() {
//   return <EditBookPage/>;
// }



"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetBookByIdQuery } from "@/store/services/bookApi";
import { Loader2, AlertCircle } from "lucide-react";
import CreateBookForm from "@/components/book/CreateBookForm";
export default function EditBookPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = Number(params?.id);

  const {
    data: book,
    isLoading,
    isError,
  } = useGetBookByIdQuery(bookId, {
    skip: !bookId || isNaN(bookId),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="flex flex-col items-center gap-3 text-[var(--text-muted)]">
          <Loader2 size={32} className="animate-spin text-indigo-500" />
          <p className="text-sm font-medium">Loading book…</p>
        </div>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg)]">
        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] p-8 max-w-sm w-full text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={22} className="text-red-500" />
          </div>
          <h2 className="text-base font-bold text-[var(--text)] mb-1">Book Not Found</h2>
          <p className="text-sm text-[var(--text-muted)] mb-5">
            We couldn't load this book. It may have been deleted.
          </p>
          <button
            onClick={() => router.back()}
            className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <CreateBookForm bookId={bookId} initialData={book} />;
}