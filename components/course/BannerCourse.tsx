"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
// 1. Added Moul to the imports
import { Plus_Jakarta_Sans, Kantumruy_Pro, Moul } from "next/font/google";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// ─── API Imports ───────────────────────────────────────────────────────────
import { useGetCoursesQuery } from "@/store/services/courseApi";
import { useGetTeacherStatsQuery } from "@/store/services/enrollmentApi";

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

export default function BannerCourse() {
  const { t, i18n } = useTranslation();
  const { data: coursesData } = useGetCoursesQuery();
  const { data: globalStats } = useGetTeacherStatsQuery();

  const isKhmer = i18n.language === "kh";

  const courseCount = Array.isArray(coursesData)
    ? coursesData.length
    : ((coursesData as any)?.totalElements ?? 0);

  const formatNum = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k+";
    return num.toString() + "+";
  };

  const stats = [
    { value: formatNum(courseCount), label: t("Courses") },
    {
      value: formatNum(globalStats?.totalEnrollments ?? 0),
      label: t("Readers"),
    },
    { value: "4.9★", label: t("Rating") },
  ];

  // ─── Animation Variants (Kept exactly as your old code) ──────────────────
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 1, 0.3, 1] },
    },
  };

  return (
    <section
      // Base font switches to Kantumruy for UI elements
      className={`${isKhmer ? kantumruy.className : jakarta.className} w-full overflow-hidden relative bg-background transition-colors duration-500`}
    >
      {/* Decorative Background Blobs - Kept original animations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-5%] right-[0%] w-[600px] h-[600px] rounded-full blur-[120px] bg-primary"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[-10%] left-[5%] w-[450px] h-[450px] rounded-full blur-[100px] bg-accent"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={i18n.language} 
        className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 py-20 container mx-auto px-6 lg:px-12"
      >
        {/* Left Side */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/20 bg-primary/10 text-primary-600 dark:text-primary-400 flex items-center gap-2">
              <Sparkles size={14} />
              {t("Digital Course")}
            </span>
          </motion.div>

          {/* Heading - Uses MOUL for Khmer, Jakarta Black for English */}
          <motion.h1
            variants={itemVariants}
            className={`text-4xl md:text-6xl lg:text-7xl mb-6 text-foreground tracking-tight 
              ${isKhmer ? `${moul.className} leading-[1.3]` : 'font-black leading-[1.1]'}`}
          >
            <span className="block text-primary-600 dark:text-primary-500">
              {t("Search & review")}
            </span>
            <span className="block">
              {t("your")}{" "}
              <span className="text-accent-600 dark:text-accent-400">
                {t("favorite Course")}
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground leading-relaxed mb-10 text-lg lg:text-xl max-w-[540px] mx-auto lg:mx-0"
          >
            {t("HeroDescription")}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center lg:justify-start gap-4 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById("all-courses")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-shadow hover:shadow-lg hover:shadow-primary/20 flex items-center gap-2"
            >
              {t("Explore Course")}
              <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById("popular-courses")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-xl border border-border bg-secondary/50 text-secondary-foreground font-bold text-sm transition-all hover:bg-secondary"
            >
              {t("Popular Course")}
            </motion.button>
          </motion.div>

          {/* REAL STATS BAR */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center lg:justify-start gap-10 mt-12 border-t border-border pt-8"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-2xl font-black text-foreground">
                  {value}
                </span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Side - Kept original animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative lg:w-1/2 flex justify-center items-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[85%] aspect-square rounded-full border-2 border-dashed border-primary/20"
          />

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-full max-w-[500px]"
          >
            <Image
              src="/bro.png"
              alt="Hero Illustration"
              width={600}
              height={600}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}