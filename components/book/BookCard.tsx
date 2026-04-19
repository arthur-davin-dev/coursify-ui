"use client";
import { Bookmark } from "lucide-react";
import { Book } from "@/store/services/bookApi";
import {
  useCheckBookBookmarkQuery,
  useBookmarkBookMutation,
  useRemoveBookmarkBookMutation,
} from "@/store/services/bookmarkApi";

export default function BookCard({ book }: { book: Book }) {
  const { data: checkData } = useCheckBookBookmarkQuery(String(book.id));
  const isSaved = checkData?.bookmarked ?? false;

  const [bookmarkBook] = useBookmarkBookMutation();
  const [removeBookmarkBook] = useRemoveBookmarkBookMutation();

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isSaved) {
        await removeBookmarkBook(String(book.id)).unwrap();
      } else {
        await bookmarkBook(String(book.id)).unwrap();
      }
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  const thumbnailSrc =
    book.thumbnail && book.thumbnail !== ""
      ? book.thumbnail
      : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80";

  return (
    <div className="flex flex-col w-[210px] items-center transition-all duration-300 hover:scale-105 cursor-pointer group">
      <div className="relative overflow-hidden rounded-[8px] shadow-md w-[210px] h-[313px]">
        <img
          src={thumbnailSrc}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* ✅ Bookmark button overlay */}
        <button
          onClick={handleBookmark}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-black/50 cursor-pointer" // 👈 added
        >
          <Bookmark
            className={`w-4 h-4 stroke-[1.8px] transition-colors ${
              isSaved ? "fill-white stroke-white" : "fill-none stroke-white"
            }`}
          />
        </button>
      </div>

      <div className="w-full mt-3">
        <h2 className="text-gray-700 dark:text-gray-100 text-[18px] line-clamp-1 break-all font-bold leading-snug group-hover:text-blue-500 transition-colors">
          {book.title}
        </h2>
        {book.uploadedByName && (
          <h3 className="text-[#9D9EA8] dark:text-gray-400 text-[14px] font-medium leading-none mt-1 line-clamp-1">
            {book.uploadedByName}
          </h3>
        )}
      </div>
    </div>
  );
}
