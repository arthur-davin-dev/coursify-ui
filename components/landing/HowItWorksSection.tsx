"use client";

import React from 'react';
import { Play } from 'lucide-react';
// 1. Added Moul to imports
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

// 2. Initialize Moul font
const moul = Moul({
  subsets: ["khmer"],
  weight: ["400"],
});

const HowItWorksSection = () => {
  const { t, i18n: i18nInstance } = useTranslation();
  const isKhmer = i18nInstance.language === "kh";

  return (
    <section className={`${isKhmer ? kantumruy.className : jakarta.className} bg-slate-50 py-16 transition-colors duration-300 dark:bg-slate-950 lg:py-24 overflow-hidden border-t border-gray-200 dark:border-gray-800`}>
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header - Navy blue background */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 rounded-[2.5rem] bg-[#223399] py-8 text-center sm:mb-20 sm:py-10 shadow-xl"
        >
          {/* 3. Apply Moul to the section title */}
          <h2 className={`${isKhmer ? moul.className : "font-bold"} text-3xl text-white sm:text-4xl ${isKhmer ? 'leading-[1.8] tracking-wide' : ''}`}>
            {t("What can we do with")} <span className="text-orange-400">Coursify?</span>
          </h2>
        </motion.div>

        {/* Content & Video Grid */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* Left Content Area */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative text-center lg:text-left"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 -top-6 h-12 w-12 rounded-full bg-emerald-400 opacity-80" 
            />
            
            <div className="relative z-10 space-y-6">
              {/* 4. Apply Moul to the main content heading */}
              <h3 className={`${isKhmer ? moul.className : "font-extrabold"} text-4xl tracking-tight text-slate-900 dark:text-white sm:text-5xl ${isKhmer ? 'leading-[1.6]' : 'leading-[1.15]'}`}>
                {t("The Best of Both Worlds")}: <br />
                {t("Classroom")} <span className="text-orange-400">{t("Engagement")}</span> <br />
                {t("Online")} <span className="text-orange-400">{t("Flexibility")}</span>
              </h3>
              
              <p className="max-w-xl text-xl leading-relaxed text-slate-600 dark:text-slate-400">
                {t("HowItWorksDescription")}
              </p>
              
              <motion.a 
                whileHover={{ x: 5 }}
                href="/about-us" 
                className={`inline-block text-base font-bold text-blue-600 hover:underline dark:text-blue-400 ${isKhmer ? 'mt-4' : ''}`}
              >
                {t("Learn more about our platform")} →
              </motion.a>
            </div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-emerald-400 opacity-80 lg:-right-4" 
            />
          </motion.div>

          {/* Right Video Thumbnail Area */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative p-6">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -left-2 -top-2 h-32 w-32 rounded-[2.5rem] border-[14px] border-orange-400 transition-colors dark:border-orange-500" 
              />
              
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-2 -right-2 h-32 w-32 rounded-[2.5rem] border-[14px] border-[#223399]" 
              />
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative z-10 aspect-video w-full overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl"
              >
                <img 
                  src="/coursify-platform-demo.png" 
                  alt="Coursify Platform Classroom Demo" 
                  className="h-full w-full object-cover"
                />

                <button 
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all group"
                  aria-label="Play demo video"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full bg-white p-6 shadow-xl shadow-blue-950/20"
                  >
                    <Play className="h-8 w-8 text-cyan-400 fill-cyan-400" />
                  </motion.div>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;