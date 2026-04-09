"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TbQuoteFilled } from "react-icons/tb";

const stories = [
  {
    mainStatement: "Coursify completely changed how I learn. The project-based approach helped me build a portfolio that got me hired as a Junior PM within three months!",
    name: "Chhay Davin",
    title: "Project Manager",
    profile: "/student/davin1.jpg",
  },
  {
    mainStatement: "The coding labs are incredibly smooth. I've tried many platforms, but Coursify's interactive environment is the only one that made complex backend logic click for me.",
    name: "Bean SovannRanuth",
    title: "Web Developer",
    profile: "/student/davin1.jpg",
  },
  {
    mainStatement: "As a designer, I appreciate the beauty of the platform itself. The UI/UX courses are top-notch, taught by experts who actually work in the industry.",
    name: "Arthur Davin",
    title: "UX/UI Designer",
    profile: "/student/davin2.jpg",
  },
  {
    mainStatement: "The data science track is rigorous but rewarding. The real-world datasets we worked on gave me the confidence to ace my technical interviews.",
    name: "KHDEMY",
    title: "Data Scientist",
    profile: "/student/davin3.jpg",
  },
  {
    mainStatement: "I love the community aspect! Being able to discuss marketing strategies with peers from around the world adds a whole new dimension to online learning.",
    name: "READKH",
    title: "Marketing Specialist",
    profile: "/student/team1.jpg",
  },
];

export default function StudentFeedback() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { i18n } = useTranslation();
  const [animationKey, setAnimationKey] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
    setAnimationKey((prevKey) => prevKey + 1);
  }, []);

  const handlePrev = () => {
    setCurrentStoryIndex(
      (prevIndex) => (prevIndex - 1 + stories.length) % stories.length
    );
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handleDotClick = (index: number) => {
    setCurrentStoryIndex(index);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext, isPaused]);

  const story = stories[currentStoryIndex];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      <div className="container mx-auto px-6 lg:px-22">
        
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">
            <span className="text-slate-900 dark:text-white">
              {i18n.language === "km" ? "មតិយោបល់របស់សិស្ស" : "What Our "}
            </span>
            <span className="text-blue-600">
              {i18n.language === "km" ? "" : "Students Say"}
            </span>
          </h2>
          <div className="mt-4 mx-auto w-24 h-1.5 bg-orange-400 rounded-full" />
        </div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-4xl mx-auto flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Button - Fixed "Cut" icon by adding padding and center flex */}
          <button
            onClick={handlePrev}
            className="absolute -left-10 lg:-left-20 hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-600 shadow-sm transition-all z-20 shrink-0"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          {/* Animated Card */}
          <div
            key={animationKey}
            className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-[3rem] w-full min-h-[350px] relative border border-slate-100 dark:border-slate-800 shadow-2xl shadow-blue-900/5 dark:shadow-none flex flex-col justify-center 
            animate-in fade-in slide-in-from-right-full duration-700 ease-out"
          >
            <div className="relative z-10">
              {/* Quote Icon - Changed size and position so it doesn't clip or overlap text */}
              <div className="absolute -top-4 -right-2 sm:-top-8 sm:right-0 text-blue-600/10 dark:text-blue-400/10 pointer-events-none">
                <TbQuoteFilled size={60} />
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
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {story.name}
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    {story.title}
                  </p>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-xl sm:text-2xl leading-relaxed font-medium italic text-center sm:text-left">
                "{story.mainStatement}"
              </p>
            </div>
          </div>

          {/* Right Button - Using size class instead of size prop for better consistency */}
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
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentStoryIndex
                  ? "w-12 h-2.5 bg-blue-600"
                  : "w-2.5 h-2.5 bg-slate-300 dark:bg-slate-800 hover:bg-blue-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}