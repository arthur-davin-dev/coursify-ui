"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TbQuoteFilled } from "react-icons/tb";
// 1. Added Moul to imports
import { Kantumruy_Pro, Plus_Jakarta_Sans, Moul } from "next/font/google";
import { motion} from "framer-motion";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer"],
  weight: ["400", "700"],
});

// 2. Initialize Moul
const moul = Moul({
  subsets: ["khmer"],
  weight: ["400"],
});

export default function StudentFeedback() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t, i18n } = useTranslation();
  const [animationKey, setAnimationKey] = useState(0);
  
  const isKhmer = i18n.language === "kh";

  const stories = [
    {
      mainStatement: t("Feedback1"),
      name: "Chhay Davin",
      title: t("Project Manager"),
      profile: "/student/davin1.jpg",
    },
    {
      mainStatement: t("Feedback2"),
      name: "Bean SovannRanuth",
      title: t("Web Developer"),
      profile: "/student/davin1.jpg",
    },
    {
      mainStatement: t("Feedback3"),
      name: "Arthur Davin",
      title: t("UX/UI Designer"),
      profile: "/student/davin2.jpg",
    },
  ];

  const handleNext = useCallback(() => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
    setAnimationKey((prevKey) => prevKey + 1);
  }, [stories.length]);

  const handlePrev = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext, isPaused]);

  const story = stories[currentStoryIndex];

  return (
    <section className={`${isKhmer ? kantumruy.className : jakarta.className} py-20 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden border-t`}>
      <div className="container mx-auto px-6 lg:px-22">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          {/* 3. Applied Moul to Main Header */}
          <h2 className={`${isKhmer ? moul.className : "font-extrabold"} text-4xl tracking-tight ${isKhmer ? 'leading-[1.6]' : ''}`}>
            <span className="text-slate-900 dark:text-white">{t("What Our ")}</span>
            <span className="text-blue-600">{t("Students Say")}</span>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 mx-auto h-1.5 bg-orange-400 rounded-full" 
          />
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-4xl mx-auto flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            onClick={handlePrev}
            className="absolute -left-10 lg:-left-20 hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-600 shadow-sm transition-all z-20 shrink-0"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          <div
            key={animationKey}
            className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-[3rem] w-full min-h-[350px] relative border border-slate-100 dark:border-slate-800 shadow-2xl shadow-blue-900/5 dark:shadow-none flex flex-col justify-center animate-in fade-in slide-in-from-right-full duration-700 ease-out"
          >
            <div className="relative z-10">
              <div className="absolute -top-4 -right-2 sm:-top-8 sm:right-0 text-blue-600/10 dark:text-blue-400/10 pointer-events-none">
                <TbQuoteFilled size={80} />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div className="relative shrink-0">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-orange-400 rounded-full blur-md opacity-20" />
                  <img
                    src={story.profile}
                    alt={story.name}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white dark:border-slate-800"
                  />
                </div>
                <div className="text-center sm:text-left">
                  {/* 4. Applied Moul to Student Name */}
                  <h4 className={`${isKhmer ? moul.className : "font-bold"} text-2xl text-slate-900 dark:text-white ${isKhmer ? 'leading-[1.6]' : ''}`}>
                    {story.name}
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    {story.title}
                  </p>
                </div>
              </div>

              {/* Keep statement in Kantumruy for readability */}
              <p className="text-slate-600 dark:text-slate-300 text-xl sm:text-2xl leading-relaxed font-medium italic text-center sm:text-left">
                "{story.mainStatement}"
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute -right-10 lg:-right-20 hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-600 shadow-sm transition-all z-20 shrink-0"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center mt-12 space-x-3">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStoryIndex(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentStoryIndex ? "w-12 h-2.5 bg-blue-600" : "w-2.5 h-2.5 bg-slate-300 dark:bg-slate-800 hover:bg-blue-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}