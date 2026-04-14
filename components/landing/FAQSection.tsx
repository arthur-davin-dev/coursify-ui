// "use client";
// import React, { useState } from 'react';
// import Image from 'next/image'; // ← Import Next.js Image component
// import { ChevronDown } from 'lucide-react';

// const faqData = [
//   {
//     question: "What is the Coursify platform?",
//     answer: "Coursify is a comprehensive online learning ecosystem designed to bridge the gap between theoretical knowledge and practical skills. We offer expert-led courses in Design, Technology, and Business, providing all the tools students need to excel in today's digital economy."
//   },
//   {
//     question: "What resources are available for students?",
//     answer: "Students get access to high-definition video lessons, interactive coding labs, downloadable project files, and a dedicated community forum. Premium members also receive one-on-one mentoring sessions and industry-recognized certifications."
//   },
//   {
//     question: "Who can use the platform?",
//     answer: "Coursify is open to all learners—from beginners looking to start a new career to professionals wanting to upskill. Our adaptive learning paths ensure that whether you're 15 or 50, you can find content tailored to your current level."
//   },
//   {
//     question: "How does the mentoring system work?",
//     answer: "Our mentoring system pairs you with industry experts who provide direct feedback on your projects. You can schedule live video calls or submit your work for asynchronous review, ensuring you're never stuck on a complex problem for long."
//   }
// ];

// export default function FAQSection() {
//   const [openIndex, setOpenIndex] = useState<number | null>(2); // Default open the 3rd item like your image

//   return (
//     <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
//       <div className="container mx-auto px-6 lg:px-12">
        
//         {/* Section Heading */}
//         <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-16 sm:text-4xl">
//           Frequently Asked Questions
//         </h2>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
//           {/* Left Side: Using the actual image file */}
//           <div className="flex justify-center lg:justify-start">
//             <div className="relative w-full max-w-sm">
//               {/* Optional: Add a subtle blue glow/blob behind the image to match previous sections */}
//               <div className="absolute inset-0 bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-3xl" />
              
//               <div className="relative z-10 flex flex-col items-center">
//                 {/* Next.js Image Component for optimization.
//                   Make sure 'faq-illustration.png' is in your /public folder.
//                 */}
//                 <Image
//                   src="/FAQs-amico 1.png" // ← Path to your image in /public
//                   alt="Frequently Asked Questions Illustration"
//                   width={400} // Set appropriate dimensions
//                   height={400}
//                   className="w-full h-auto object-contain"
//                   priority={false} // Since this is further down the page, we don't need priority
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right Side: Accordion Dropdown */}
//           <div className="space-y-4">
//             {faqData.map((item, index) => (
//               <div 
//                 key={index}
//                 className={`group border-l-4 transition-all duration-300 rounded-r-xl overflow-hidden ${
//                   openIndex === index 
//                     ? "border-blue-600 bg-blue-50/30 dark:bg-blue-900/10" 
//                     : "border-blue-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50"
//                 }`}
//               >
//                 <button
//                   onClick={() => setOpenIndex(openIndex === index ? null : index)}
//                   className="w-full flex items-center justify-between px-6 py-5 text-left"
//                 >
//                   <span className={`text-lg font-semibold transition-colors ${
//                     openIndex === index ? "text-blue-600" : "text-slate-700 dark:text-slate-300"
//                   }`}>
//                     {item.question}
//                   </span>
//                   <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
//                     openIndex === index ? "rotate-180 text-blue-600" : "text-slate-400"
//                   }`} />
//                 </button>

//                 {/* Dropdown Content */}
//                 <div 
//                   className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
//                     openIndex === index ? "max-h-48 pb-5 opacity-100" : "max-h-0 opacity-0"
//                   }`}
//                 >
//                   <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
//                     {item.answer}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { Kantumruy_Pro, Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer"],
  weight: ["400", "700"],
});

export default function FAQSection() {
  const { t, i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(2); 
  const isKhmer = i18n.language === "kh";

  const faqData = [
    {
      question: t("FAQ_Q1"),
      answer: t("FAQ_A1")
    },
    {
      question: t("FAQ_Q2"),
      answer: t("FAQ_A2")
    },
    {
      question: t("FAQ_Q3"),
      answer: t("FAQ_A3")
    },
    {
      question: t("FAQ_Q4"),
      answer: t("FAQ_A4")
    }
  ];

  return (
    <section className={`${isKhmer ? kantumruy.className : jakarta.className} py-20 bg-white dark:bg-slate-950 transition-colors duration-300`}>
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Section Heading */}
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-16 sm:text-4xl">
          {t("Frequently Asked Questions")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Illustration */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-3xl" />
              <div className="relative z-10 flex flex-col items-center">
                <Image
                  src="/FAQs-amico 1.png" 
                  alt="FAQ Illustration"
                  width={1000}
                  height={1000}
                  className="w-full h-[250px] object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div 
                key={index}
                className={`group border-l-4 transition-all duration-300 rounded-r-xl overflow-hidden ${
                  openIndex === index 
                    ? "border-blue-600 bg-blue-50/30 dark:bg-blue-900/10" 
                    : "border-blue-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className={`text-lg font-semibold transition-colors ${
                    openIndex === index ? "text-blue-600" : "text-slate-700 dark:text-slate-300"
                  }`}>
                    {item.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-blue-600" : "text-slate-400"
                  }`} />
                </button>

                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-60 pb-5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}