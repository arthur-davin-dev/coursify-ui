"use client";
import React, { useMemo } from 'react';
import { useGetCoursesQuery } from "@/store/services/courseApi";
import CourseCard from "@/components/course/CourseCard";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion"; // 1. Import motion

// Animation variants for the grid container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Faster stagger for grids
    },
  },
};

// Animation variants for each course card
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const } // Smooth ease-out
  },
};

export default function PopularCourse() {
  const { data, isLoading, isError } = useGetCoursesQuery();

  const popularCourses = useMemo(() => {
    if (!data) return [];
    const coursesArray = Array.isArray(data) ? data : data.content ?? [];
    return coursesArray.slice(0, 4);
  }, [data]);

  return (
    <section className="bg-white py-20 dark:bg-slate-950 transition-colors duration-300 rounded-[2.5rem] border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header with scroll reveal */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Popular Courses
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }} // 16 * 0.25rem = 4rem
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-2 h-1.5 rounded-full bg-blue-600" 
            />
          </div>
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
            See All Courses
          </button>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex h-60 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-[2rem] border-2 border-dashed border-slate-100 py-16 text-center dark:border-slate-800"
          >
            <p className="text-slate-500">Could not load popular courses at this time.</p>
          </motion.div>
        )}

        {/* Results Grid with Staggered Animation */}
        {/* Results Grid with Staggered Animation */}
{!isLoading && !isError && (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
  >
    {popularCourses.map((course) => (
      <motion.div 
        key={course.id} 
        variants={cardVariants} 
        className="h-full" // Add this to make the motion wrapper stretch
      >
        <CourseCard course={course} />
      </motion.div>
    ))}
  </motion.div>
)}
      </div>
    </section>
  );
}