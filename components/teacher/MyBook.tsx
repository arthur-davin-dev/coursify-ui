import Link from "next/link";
import { ArrowRight } from "lucide-react";

const books = [
  {
    id: 1,
    title: "Portrait Photography Masterclass",
    description: "Portrait Photography Masterclass Portrait ...",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&h=100&fit=crop",
    author: null,
  },
  {
    id: 2,
    title: "Portrait Photography Masterclass",
    description: "Portrait Photography Masterclass Portrait ...",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&h=100&fit=crop",
    author: { name: "Taing Sengkim", avatar: "https://i.pravatar.cc/32?img=5" },
  },
  {
    id: 3,
    title: "Portrait Photography Masterclass",
    description: "Portrait Photography Masterclass Portrait ...",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=80&h=100&fit=crop",
    author: { name: "Taing Sengkim", avatar: "https://i.pravatar.cc/32?img=8" },
  },
];

export default function MyBook() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">
          My <span className="text-amber-500">Book</span>
        </h2>
        <Link
          href="/dashboard/teacher/books"
          className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
        >
          See All Books <ArrowRight size={15} />
        </Link>
      </div>

      {/* Books */}
      <div className="divide-y divide-gray-100 dark:divide-slate-800">
        {books.map((book) => (
          <Link
            key={book.id}
            href={`/dashboard/teacher/books/${book.id}`}
            className="flex items-center gap-4 py-4 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors px-2"
          >
            <img
              src={book.cover}
              alt={book.title}
              className="w-16 h-20 rounded-lg object-cover shadow-sm flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-0.5">{book.title}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">{book.description}</p>
              {book.author && (
                <div className="flex items-center gap-2">
                  <img
                    src={book.author.avatar}
                    alt={book.author.name}
                    className="w-7 h-7 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow"
                  />
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    {book.author.name}
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}