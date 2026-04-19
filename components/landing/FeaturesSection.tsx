"use client";

import React from 'react';
import { Target, Lightbulb, Video } from 'lucide-react';
// 1. Added Moul to the imports
import { Kantumruy_Pro, Plus_Jakarta_Sans, Moul } from "next/font/google";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import "@/i18n";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" as const } 
  },
};

const FeaturesSection = () => {
  const { t, i18n: i18nInstance } = useTranslation();
  const isKhmer = i18nInstance.language === "kh";

  const features = [
    {
      id: 1,
      icon: Target,
      color: "bg-cyan-500",
      title: "PersonalizedMentoring",
      detail: "MentoringDetail",
      translateY: false,
    },
    {
      id: 2,
      icon: Lightbulb,
      color: "bg-emerald-500",
      title: "Step-by-StepMastery",
      detail: "MasteryDetail",
      translateY: true,
    },
    {
      id: 3,
      icon: Video,
      color: "bg-blue-600",
      title: "InteractiveExercises",
      detail: "ExercisesDetail",
      translateY: false,
    },
  ];

  return (
    <section className={`${isKhmer ? kantumruy.className : jakarta.className} bg-white py-16 transition-colors duration-300 dark:bg-slate-950 lg:py-24`}>
      <div className="container mx-auto px-6 lg:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          {/* 3. Applied Moul to Main Header with extra leading for Khmer */}
          <h2 className={`${isKhmer ? moul.className : ""} text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl ${isKhmer ? 'leading-[1.6]' : 'leading-tight'}`}>
            {t("All-In-One")} <span className="text-blue-600">Coursify</span> {t("Platform")}
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-slate-500 dark:text-slate-400">
            {t("FeaturesDescription")}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-12 md:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`relative rounded-2xl border border-slate-100 bg-slate-50 p-10 transition-shadow hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/50 ${
                feature.translateY ? "md:translate-y-6" : ""
              }`}
            >
              <div className={`absolute left-1/2 -top-10 h-20 w-20 -translate-x-1/2 rounded-full ${feature.color} p-5 ring-8 ring-white dark:ring-slate-950`}>
                <feature.icon className="h-full w-full text-white" />
              </div>
              
              <div className="mt-10 text-center">
                {/* 4. Applied Moul to Card Titles */}
                <h3 className={`${isKhmer ? moul.className : "font-bold"} text-2xl tracking-tight text-slate-900 dark:text-white whitespace-pre-line ${isKhmer ? 'leading-[1.6]' : ''}`}>
                  {t(feature.title)}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-slate-500 dark:text-slate-400">
                  {t(feature.detail)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;