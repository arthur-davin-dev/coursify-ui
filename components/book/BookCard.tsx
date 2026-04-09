"use client";
import { Book } from "@/store/services/bookApi";

export default function BookCard({ book }: { book: Book }) {
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