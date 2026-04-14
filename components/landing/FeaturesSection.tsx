// import React from 'react';
// import { Target, Lightbulb, Video } from 'lucide-react';

// const FeaturesSection = () => {
//   return (
//     <section className="bg-white py-16 transition-colors duration-300 dark:bg-slate-950 lg:py-24">
//       <div className="container mx-auto px-6 lg:px-12">
//         {/* Header Section */}
//         <div className="mb-20 text-center">
//           <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
//             All-In-One <span className="text-blue-600">Coursify</span> Platform
//           </h2>
//           <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-slate-500 dark:text-slate-400">
//             Coursify is a powerful online learning suite that combines all the tools 
//             students need to excel in Design, Technology, and Business.
//           </p>
//         </div>

//         {/* Feature Cards Grid */}
//         <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          
//           {/* Card 1: Mentoring */}
//           <div className="relative rounded-2xl border border-slate-100 bg-slate-50 p-10 transition-colors dark:border-slate-800 dark:bg-slate-900/50">
//             {/* Top Icon - Removed Shadow */}
//             <div className="absolute left-1/2 -top-10 h-20 w-20 -translate-x-1/2 rounded-full bg-cyan-500 p-5 ring-8 ring-white dark:ring-slate-950">
//               <Target className="h-full w-full text-white" />
//             </div>
            
//             <div className="mt-10 text-center">
//               <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
//                 Personalized <br /> Mentoring
//               </h3>
//               <p className="mt-5 text-base leading-relaxed text-slate-500 dark:text-slate-400">
//                 Get one-on-one or group sessions with industry experts, 
//                 tailored to your pace and style for better learning retention.
//               </p>
//             </div>
//           </div>

//           {/* Card 2: Problem-Solving */}
//           <div className="relative rounded-2xl border border-slate-100 bg-slate-50 p-10 transition-colors dark:border-slate-800 dark:bg-slate-900/50 md:translate-y-6">
//             <div className="absolute left-1/2 -top-10 h-20 w-20 -translate-x-1/2 rounded-full bg-emerald-500 p-5 ring-8 ring-white dark:ring-slate-950">
//               <Lightbulb className="h-full w-full text-white" />
//             </div>

//             <div className="mt-10 text-center">
//               <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
//                 Step-by-Step <br /> Mastery
//               </h3>
//               <p className="mt-5 text-base leading-relaxed text-slate-500 dark:text-slate-400">
//                 Practice complex concepts with guided explanations. Break down 
//                 professional challenges into clear, actionable steps.
//               </p>
//             </div>
//           </div>

//           {/* Card 3: Exercises */}
//           <div className="relative rounded-2xl border border-slate-100 bg-slate-50 p-10 transition-colors dark:border-slate-800 dark:bg-slate-900/50">
//             <div className="absolute left-1/2 -top-10 h-20 w-20 -translate-x-1/2 rounded-full bg-blue-600 p-5 ring-8 ring-white dark:ring-slate-950">
//               <Video className="h-full w-full text-white" />
//             </div>

//             <div className="mt-10 text-center">
//               <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
//                 Interactive <br /> Exercises
//               </h3>
//               <p className="mt-5 text-base leading-relaxed text-slate-500 dark:text-slate-400">
//                 Boost learning with hands-on activities, quizzes, and virtual labs. 
//                 Our interactive tools make learning effective and fun.
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;

"use client";

import React from 'react';
import { Target, Lightbulb, Video } from 'lucide-react';
import { Kantumruy_Pro, Plus_Jakarta_Sans } from "next/font/google";
import { useTranslation } from "react-i18next";
import "@/i18n"; // Using your local i18n config

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer"],
  weight: ["400", "700"],
});

const FeaturesSection = () => {
  // Use i18nInstance to avoid collision if i18n is imported elsewhere
  const { t, i18n: i18nInstance } = useTranslation();
  const isKhmer = i18nInstance.language === "kh";

  return (
    <section className={`${isKhmer ? kantumruy.className : jakarta.className} bg-white py-16 transition-colors duration-300 dark:bg-slate-950 lg:py-24`}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {t("All-In-One")} <span className="text-blue-600">Coursify</span> {t("Platform")}
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-slate-500 dark:text-slate-400">
            {t("FeaturesDescription")}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          
          {/* Card 1: Mentoring */}
          <div className="relative rounded-2xl border border-slate-100 bg-slate-50 p-10 transition-colors dark:border-slate-800 dark:bg-slate-900/50">
            <div className="absolute left-1/2 -top-10 h-20 w-20 -translate-x-1/2 rounded-full bg-cyan-500 p-5 ring-8 ring-white dark:ring-slate-950">
              <Target className="h-full w-full text-white" />
            </div>
            
            <div className="mt-10 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t("Personalized")} <br /> {t("Mentoring")}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-slate-500 dark:text-slate-400">
                {t("MentoringDetail")}
              </p>
            </div>
          </div>

          {/* Card 2: Problem-Solving */}
          <div className="relative rounded-2xl border border-slate-100 bg-slate-50 p-10 transition-colors dark:border-slate-800 dark:bg-slate-900/50 md:translate-y-6">
            <div className="absolute left-1/2 -top-10 h-20 w-20 -translate-x-1/2 rounded-full bg-emerald-500 p-5 ring-8 ring-white dark:ring-slate-950">
              <Lightbulb className="h-full w-full text-white" />
            </div>

            <div className="mt-10 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t("Step-by-Step")} <br /> {t("Mastery")}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-slate-500 dark:text-slate-400">
                {t("MasteryDetail")}
              </p>
            </div>
          </div>

          {/* Card 3: Exercises */}
          <div className="relative rounded-2xl border border-slate-100 bg-slate-50 p-10 transition-colors dark:border-slate-800 dark:bg-slate-900/50">
            <div className="absolute left-1/2 -top-10 h-20 w-20 -translate-x-1/2 rounded-full bg-blue-600 p-5 ring-8 ring-white dark:ring-slate-950">
              <Video className="h-full w-full text-white" />
            </div>

            <div className="mt-10 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t("Interactive")} <br /> {t("Exercises")}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-slate-500 dark:text-slate-400">
                {t("ExercisesDetail")}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;