"use client";
import { Star, Bookmark } from "lucide-react";
import { useState } from "react";

export default function CourseCard() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="group w-full max-w-[480px] bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
      {/* Image */}
      <div className="relative h-[240px] p-3 pb-0">
        <div className="relative h-full w-full rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=900&q=80"
            alt="Coding from Scratch"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category badge */}
          <span className="absolute top-4 left-4 z-10 bg-[#1E2A78] text-[#C7CFFF] text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full font-mono">
            Programming
          </span>

          {/* Bookmark */}
          <button
            onClick={() => setSaved(!saved)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-white/30"
          >
            <Bookmark
              className={`w-5 h-5 stroke-[1.8px] transition-colors ${
                saved ? "fill-white stroke-white" : "fill-none stroke-white"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-2">
          Coding from Scratch
        </h3>
        <p className="text-base text-gray-400 leading-relaxed mb-5">
          Start programming with zero experience needed.
        </p>

        <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
          <span className="text-3xl font-extrabold text-emerald-500">$29</span>

          <div className="flex items-center gap-4">
            {/* Duration pill */}
            <span className="text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
              12h 40m
            </span>

            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-base font-medium text-gray-500">4.6</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}