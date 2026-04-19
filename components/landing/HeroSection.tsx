"use client";

import { Lightbulb, Target, Rocket, Video, Star } from 'lucide-react';
// 1. Added Moul to imports
import { Kantumruy_Pro, Plus_Jakarta_Sans, Moul } from "next/font/google";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isKhmer = i18n.language === "kh";

  return (
    <section className={`${isKhmer ? kantumruy.className : jakarta.className} relative w-full overflow-hidden bg-white py-16 transition-colors duration-300 dark:bg-slate-950 lg:py-24`}>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 opacity-10 dark:opacity-20"
      >
        <div className="h-[500px] w-[500px] rounded-full border border-blue-500/30" />
        <div className="absolute inset-16 rounded-full border border-blue-400/20" />
      </motion.div>

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-12">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="z-10 w-full text-center lg:w-1/2 lg:text-left"
          >
            <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {t("Join 50,000+ students learning today")}
            </motion.div>

            {/* 3. Apply Moul font to the H1 heading if Khmer */}
            <motion.h1 
              variants={itemVariants} 
              className={`${isKhmer ? moul.className : ""} text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl leading-[1.6] lg:leading-[1.4]`}
            >
              {t("Master the")} <span className="text-blue-600">{t("Skills")}</span> <br />
              {t("To Build Your")} <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">{t("Dream Career")}</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="mt-6 max-w-lg text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              {t("HeroDescription")}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              {/* Added Moul for buttons if preferred, or keep Kantumruy for readability */}
              <button className={`${isKhmer ? "font-bold" : "font-bold"} rounded-xl bg-blue-600 px-8 py-4 text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:bg-blue-700`}>
                {t("Browse Courses")}
              </button>
              <button className="rounded-xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                {t("View Free Demo")}
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex flex-wrap justify-center gap-6 lg:justify-start">
              {[
                { icon: Lightbulb, text: t("Expert Mentors") },
                { icon: Target, text: t("Lifetime Access") },
                { icon: Rocket, text: t("Certifications") }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  <div className={`rounded-full p-1 bg-blue-100 dark:bg-blue-500/20`}>
                    <feature.icon className={`h-4 w-4 text-blue-600`} />
                  </div>
                  {feature.text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative mt-20 flex justify-center lg:mt-0 lg:w-1/2"
          >
            <div className="relative h-[320px] w-[320px] rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 sm:h-[450px] sm:w-[450px] dark:from-blue-700 dark:to-indigo-600">
              <div className="absolute inset-0 flex items-end justify-center overflow-hidden rounded-full">
                <img 
                  src="/student.png" 
                  alt="E-learning student" 
                  className="h-[92%] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -left-6 top-24 flex items-center gap-3 rounded-2xl bg-white/90 p-4 shadow-2xl backdrop-blur-md dark:bg-slate-900/90 lg:-left-12"
              >
                <div className="rounded-xl bg-blue-600 p-2.5">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 dark:text-white">12k+</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{t("Video Lessons")}</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -right-4 top-10 flex flex-col items-center rounded-2xl bg-white/90 px-5 py-4 shadow-2xl backdrop-blur-md dark:bg-slate-900/90 lg:-right-8"
              >
                <div className="flex gap-0.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="mt-1 text-xl font-black text-slate-900 dark:text-white">4.9/5</p>
                <p className="text-[10px] font-bold text-slate-500">{t("Course Rating")}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;