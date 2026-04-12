"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { BookOpen, Star, ArrowRight } from "lucide-react";

const BOOKS = [
  { id: 1, src: "/book/Background+Shadow1.png", badge: "4.9 ★", label: "Design", pos: "top-[10%] left-[10%] lg:left-[15%]" },
  { id: 2, src: "/book/Background+Shadow2.png", badge: "4.8 ★", label: "Science", pos: "top-[20%] right-[5%] lg:right-[10%]" },
  { id: 3, src: "/book/Background+Shadow3.png", badge: "4.7 ★", label: "Tech", pos: "bottom-[15%] left-[5%] lg:left-[5%]" },
  { id: 4, src: "/book/Background+Shadow4.png", badge: "4.9 ★", label: "Business", pos: "bottom-[10%] right-[10%] lg:right-[15%]" },
];

export default function BannerBook() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-[60vh] bg-white dark:bg-[#0F1226]" />;

  return (
    <section className="relative min-h-[500px] lg:min-h-[850px] flex items-center overflow-hidden bg-white dark:bg-[#0F1226]">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 z-0 hidden lg:block" aria-hidden="true">
        <Image 
          src="/book/bannerbook.png" 
          alt="banner background"
          fill
          priority
          className="object-contain object-right"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          
          {/* TEXT CONTENT - Using font-kh (Odor Mean Chey) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left font-kh">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
              <BookOpen size={14} className="text-indigo-600" />
              {/* English labels will use Inter via fallback, Khmer will use Odor */}
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-300">
                {t("Digital Library")}
              </span>
            </div>

            {/* Note: font-bold is kept for the English fallback, Odor Mean Chey ignores it */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              {t("Search & review")} <br />
              {t("your")}{" "}
              <span className="text-[#2F327D] dark:text-blue-400 relative">
                {t("favorite book")}
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-indigo-300" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C40 2 120 2 199 5.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-gray-500 dark:text-gray-400 text-lg max-w-md leading-relaxed">
              {t("HeroDescription")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link href="/library" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                {t("Explore Books")} <ArrowRight size={18} />
              </Link>
              <button className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl font-bold flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Star size={18} className="fill-amber-400 text-amber-400" /> {t("Trending")}
              </button>
            </div>
          </div>

          {/* BOOK DISPLAY AREA */}
          <div className="relative h-[450px] lg:h-[600px] w-full">
            {BOOKS.map((book, i) => (
              <div
                key={book.id}
                className={`absolute transition-all duration-500 hover:scale-105 hover:z-50 ${book.pos}`}
                style={{
                  animation: `floatAnim ${4 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              >
                <div className="relative w-28 sm:w-36 lg:w-44 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                  <Image 
                    src={book.src} 
                    alt={book.label} 
                    fill 
                    className="object-cover"
                    sizes="200px"
                  />
                  
                  {/* Badge (Using default UI font for numbers/stars usually looks cleaner) */}
                  <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full text-[10px] font-bold text-indigo-900 shadow-md">
                    {book.badge}
                  </div>

                  {/* Category Label - Apply font-kh here specifically */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold font-kh shadow-lg whitespace-nowrap">
                    {t(book.label)}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes floatAnim {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </section>
  );
}