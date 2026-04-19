
// import CourseDetail from "@/components/course/CourseDetail";
"use client";
import FAQSection from "@/components/landing/FAQSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PopularCourse from "@/components/landing/PopularCourse";
import StudentFeedback from "@/components/landing/StudentFeedBack";
import TrendingBooks from "@/components/landing/TrendingBooks";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-slate-950">

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      </div>
      <HeroSection/>
      <FeaturesSection/>
      <PopularCourse/>
      <TrendingBooks/>
      <HowItWorksSection/>
      <StudentFeedback/>
      <FAQSection/>

    </div>
  );
}
