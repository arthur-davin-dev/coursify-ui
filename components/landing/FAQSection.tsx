"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from "react-i18next";
// 1. Added Moul to imports
import { Kantumruy_Pro, Plus_Jakarta_Sans, Moul } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

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

export default function FAQSection() {
  const { t, i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isKhmer = i18n.language === "kh";

  const faqData = [
    { question: t("FAQ_Q1"), answer: t("FAQ_A1") },
    { question: t("FAQ_Q2"), answer: t("FAQ_A2") },
    { question: t("FAQ_Q3"), answer: t("FAQ_A3") },
    { question: t("FAQ_Q4"), answer: t("FAQ_A4") }
  ];

  return (
    <section className={`${isKhmer ? kantumruy.className : jakarta.className} py-20 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden`}>
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Section Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`${isKhmer ? moul.className : "font-bold"} text-3xl text-center text-slate-900 dark:text-white mb-16 sm:text-4xl ${isKhmer ? 'leading-[1.6]' : ''}`}
        >
          {t("Frequently Asked Questions")}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-sm">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-3xl" 
              />
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex flex-col items-center"
              >
                <Image
                  src="/FAQs-amico 1.png" 
                  alt="FAQ Illustration"
                  width={1000}
                  height={1000}
                  className="w-full h-[300px] object-contain"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="space-y-4"
          >
            {faqData.map((item, index) => (
              <motion.div 
                key={index}
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0 }
                }}
                className={`group border-l-4 transition-all duration-300 rounded-r-xl overflow-hidden ${
                  openIndex === index 
                    ? "border-blue-600 bg-blue-50/30 dark:bg-blue-900/10 shadow-md" 
                    : "border-blue-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  {/* 4. Kept Questions in Kantumruy (Bold) for better legibility */}
                  <span className={`text-lg font-semibold transition-colors ${
                    openIndex === index ? "text-blue-600" : "text-slate-700 dark:text-slate-300"
                  } ${isKhmer ? 'leading-relaxed' : ''}`}>
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`w-5 h-5 ${
                      openIndex === index ? "text-blue-600" : "text-slate-400"
                    }`} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5">
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}