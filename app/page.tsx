
// // import CourseDetail from "@/components/course/CourseDetail";
// "use client";
// import FAQSection from "@/components/landing/FAQSection";
// import FeaturesSection from "@/components/landing/FeaturesSection";
// import HeroSection from "@/components/landing/HeroSection";
// import HowItWorksSection from "@/components/landing/HowItWorksSection";
// import PopularCourse from "@/components/landing/PopularCourse";
// import StudentFeedback from "@/components/landing/StudentFeedBack";
// import TrendingBooks from "@/components/landing/TrendingBooks";


// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-slate-950">

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//       </div>
//       <HeroSection/>
//       <FeaturesSection/>
//       <PopularCourse/>
//       <TrendingBooks/>
//       <HowItWorksSection/>
//       <StudentFeedback/>
//       <FAQSection/>

//     </div>
//   );
// }


import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Coursify | Learn Programming & Tech Skills Online",
  description:
    "Coursify is the best e-learning platform to learn programming, web development, and IT skills in Cambodia. Start your journey today.",

  keywords: [
    "Coursify",
    "online courses Cambodia",
    "learn programming",
    "web development course",
    "IT training Cambodia",
    "e-learning platform"
  ],

  openGraph: {
    title: "Coursify | Learn Anytime, Anywhere",
    description:
      "Join Coursify to explore top courses in programming, design, and technology.",
    url: "https://cousify.vercel.app",
    siteName: "Coursify",
    images: [
      {
        url: "/thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Coursify Platform",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Coursify",
    description: "Learn programming and tech skills online",
    images: ["/thumbnail.jpg"],
  },
};

export default function Page() {
  return <HomeClient />;
}