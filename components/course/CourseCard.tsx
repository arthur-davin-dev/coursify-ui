"use client";
import { Star, Bookmark, Clock } from "lucide-react";
import { useState } from "react";
import Link from "next/link"; // ← add this
import type { Course } from "@/store/services/courseApi";

export default function CourseCard({ course }: { course: Course }) {
  const [saved, setSaved] = useState(false);

  const thumbnailSrc =
    course.thumbnail && course.thumbnail !== ""
      ? course.thumbnail
      : "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=900&q=80";

  const category = course.category?.name ?? course.tags?.[0] ?? "Course";

  return (
    // ↓ wrap the whole card in a Link
    <Link href={`/courses/${course.id}`} className="block group w-full bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
      {/* Image */}
      <div className="relative h-[200px] p-3 pb-0">
        <div className="relative h-full w-full rounded-2xl overflow-hidden">
          <img
            src={thumbnailSrc}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category badge */}
          <span className="absolute top-3 left-3 z-10 bg-[#1E2A78] text-[#C7CFFF] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full font-mono">
            {category}
          </span>

          {/* Bookmark — stopPropagation prevents Link navigation */}
          <button
            onClick={(e) => {
              e.preventDefault(); // ← also prevent Link from firing
              e.stopPropagation();
              setSaved(!saved);
            }}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-white/30"
          >
            <Bookmark
              className={`w-4 h-4 stroke-[1.8px] transition-colors ${
                saved ? "fill-white stroke-white" : "fill-none stroke-white"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-1 line-clamp-1">
          {course.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex items-center justify-between">
          <span className="text-2xl font-extrabold text-emerald-500">
            {course.price === 0 ? "Free" : `$${course.price}`}
          </span>

          <div className="flex items-center gap-3">
            {course.duration && (
              <span className="flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 px-3 py-1.5 rounded-full">
                <Clock className="w-3 h-3" />
                {course.duration}
              </span>
            )}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-gray-500">
                {course.rating?.toFixed(1) ?? "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link> // ← close Link instead of div
  );
}