"use client";

import FAQSection from "@/components/landing/FAQSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PopularCourse from "@/components/landing/PopularCourse";
import StudentFeedback from "@/components/landing/StudentFeedBack";
import TrendingBooks from "@/components/landing/TrendingBooks";

export default function HomeClient() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-slate-950">
      <HeroSection />
      <FeaturesSection />
      <PopularCourse />
      <TrendingBooks />
      <HowItWorksSection />
      <StudentFeedback />
      <FAQSection />
    </div>
  );
}