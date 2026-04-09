import React from 'react';
import { Lightbulb, Target, Rocket, Video, Users, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 transition-colors duration-300 dark:bg-slate-950 lg:py-24">
      {/* Decorative Background Rings - Softened for better depth */}
      <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 opacity-10 dark:opacity-20">
        <div className="h-[500px] w-[500px] rounded-full border border-blue-500/30" />
        <div className="absolute inset-16 rounded-full border border-blue-400/20" />
        <div className="absolute inset-32 rounded-full border border-blue-300/10" />
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between">
          
          {/* Left Content Column */}
          <div className="z-10 w-full text-center lg:w-1/2 lg:text-left">
            {/* Social Proof Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Join 50,000+ students learning today
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              Master the <span className="text-blue-600">Skills</span> <br />
              To Build Your <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Dream Career</span>
            </h1>
            
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              Access 5,000+ top-rated courses from industry experts. From UI/UX Design to Full-stack Development, we provide the tools to turn your curiosity into a profession.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              <button className="rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:bg-blue-700">
                Browse Courses
              </button>
              <button className="rounded-xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                View Free Demo
              </button>
            </div>

            {/* Feature Tags - Real E-Learning Benefits */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 lg:justify-start">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <div className="rounded-full bg-yellow-100 p-1 dark:bg-yellow-500/20">
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                </div>
                Expert Mentors
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <div className="rounded-full bg-emerald-100 p-1 dark:bg-emerald-500/20">
                  <Target className="h-4 w-4 text-emerald-600" />
                </div>
                Lifetime Access
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <div className="rounded-full bg-purple-100 p-1 dark:bg-purple-500/20">
                  <Rocket className="h-4 w-4 text-purple-600" />
                </div>
                Certifications
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="relative mt-20 flex justify-center lg:mt-0 lg:w-1/2">
            <div className="relative h-[350px] w-[350px] rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 sm:h-[450px] sm:w-[450px] dark:from-blue-700 dark:to-indigo-600">
              <div className="absolute inset-0 flex items-end justify-center overflow-hidden rounded-full">
                <img 
                  src="/student.png" 
                  alt="E-learning student" 
                  className="h-[92%] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Floating Stat Card 1 */}
              <div className="absolute -left-12 top-24 flex items-center gap-3 rounded-2xl bg-white/90 p-4 shadow-2xl backdrop-blur-md dark:bg-slate-900/90">
                <div className="rounded-xl bg-blue-600 p-2.5">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 dark:text-white">12k+</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Video Lessons</p>
                </div>
              </div>

              {/* Floating Stat Card 2 */}
              <div className="absolute -right-8 top-10 flex flex-col items-center rounded-2xl bg-white/90 px-5 py-4 shadow-2xl backdrop-blur-md dark:bg-slate-900/90">
                <div className="flex gap-0.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="mt-1 text-xl font-black text-slate-900 dark:text-white">4.9/5</p>
                <p className="text-[10px] font-bold text-slate-500">Course Rating</p>
              </div>

              {/* Floating Stat Card 3 */}
              <div className="absolute -right-10 bottom-20 flex items-center gap-3 rounded-2xl bg-white/90 p-4 shadow-2xl backdrop-blur-md dark:bg-slate-900/90">
                <div className="flex -space-x-3">
                   {[1,2,3].map((i) => (
                     <div key={i} className="h-9 w-9 rounded-full border-2 border-white bg-slate-200 dark:border-slate-800" />
                   ))}
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 dark:text-white">250+</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Top Instructors</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-20 border-t border-slate-100 pt-12 dark:border-slate-800">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-slate-400">Trusted by world-class companies</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0 sm:justify-between">
             <span className="text-2xl font-black text-slate-600 dark:text-white">duolingo</span>
             <span className="text-2xl font-black text-slate-600 dark:text-white">Codecov</span>
             <span className="text-2xl font-black text-slate-600 dark:text-white">User Testing</span>
             <span className="text-2xl font-black text-slate-600 dark:text-white">magic leap</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;