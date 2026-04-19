"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { BookOpen, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion"; 
import { useRouter } from "next/navigation";
// 1. Added Moul and fonts to imports
import { Kantumruy_Pro, Plus_Jakarta_Sans, Moul } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer"],
  weight: ["400", "700"],
});

const moul = Moul({
  subsets: ["khmer"],
  weight: ["400"],
});

const BOOKS = [
  {
    id: 1,
    src: "/book/Background+Shadow1.png",
    badge: "4.9 ★",
    label: "Design",
    pos: "top-[10%] left-[10%] lg:left-[15%]",
  },
  {
    id: 2,
    src: "/book/Background+Shadow2.png",
    badge: "4.8 ★",
    label: "Science",
    pos: "top-[20%] right-[5%] lg:right-[10%]",
  },
  {
    id: 3,
    src: "/book/Background+Shadow3.png",
    badge: "4.7 ★",
    label: "Tech",
    pos: "bottom-[15%] left-[5%] lg:left-[5%]",
  },
  {
    id: 4,
    src: "/book/Background+Shadow4.png",
    badge: "4.9 ★",
    label: "Business",
    pos: "bottom-[10%] right-[10%] lg:right-[15%]",
  },
];

export default function BannerBook() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const isKhmer = i18n.language === "kh";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return <div className="min-h-[60vh] bg-white dark:bg-[#0F1226]" />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const bookVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.7,
        ease: "backOut" as const,
      },
    }),
  };

  return (
    <section className={`${isKhmer ? kantumruy.className : jakarta.className} relative min-h-[500px] lg:min-h-[700px] flex items-center overflow-hidden bg-white dark:bg-[#0F1226]`}>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0 hidden lg:block"
        aria-hidden="true"
      >
        <Image
          src="/book/bannerbook.png"
          alt="banner background"
          fill
          priority
          className="object-contain object-right"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={i18n.language}
        className="relative z-10 container mx-auto px-6 lg:px-20 py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* TEXT CONTENT */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800"
            >
              <BookOpen size={14} className="text-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-300">
                {t("Digital Library")}
              </span>
            </motion.div>

            {/* 2. Applied Moul to Main Headline */}
            <motion.h1
              variants={itemVariants}
              className={`${isKhmer ? moul.className : "font-bold"} text-4xl md:text-6xl text-gray-900 dark:text-white ${isKhmer ? 'leading-[1.7]' : 'leading-tight'}`}
            >
              {t("Search & review")} <br />
              {t("your")}{" "}
              <span className="text-[#2F327D] dark:text-blue-400 relative inline-block">
                {t("favorite book")}
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                 
                  className={`absolute ${isKhmer ? '-bottom-4' : '-bottom-2'} left-0 w-full h-2 text-indigo-300`}
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <path
                    d="M1 5.5C40 2 120 2 199 5.5"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-gray-500 dark:text-gray-400 text-lg max-w-md leading-relaxed"
            >
              {t("HeroDescription")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <button
                onClick={() => {
                  const el = document.getElementById("all-books");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  else router.push("/library");
                }}
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-shadow hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
              >
                {t("Explore Books")} <ArrowRight size={18} />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("trending-books");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  else router.push("/library#trending-books");
                }}
                className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl font-bold flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Star size={18} className="fill-amber-400 text-amber-400" />{" "}
                {t("Trending")}
              </button>
            </motion.div>
          </div>

          {/* BOOK DISPLAY AREA */}
          <div className="relative h-[450px] lg:h-[600px] w-full transform-gpu dark:text-blue-400">
            {BOOKS.map((book, i) => (
              <motion.div
                key={book.id}
                custom={i}
                variants={bookVariants}
                animate={{
                  y: [0, -15, 0],
                  transition: {
                    y: {
                      duration: 4 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  },
                }}
                className={`absolute z-10 ${book.pos}`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, zIndex: 50, rotate: 2 }}
                  className="relative w-28 sm:w-36 lg:w-44 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/20"
                >
                  <Image
                    src={book.src}
                    alt={book.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 150px, 200px"
                  />

                  <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full text-[10px] font-bold text-indigo-900 shadow-md">
                    {book.badge}
                  </div>

                  {/* 4. Categorization label logic */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold shadow-lg whitespace-nowrap">
                    {t(book.label)}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}