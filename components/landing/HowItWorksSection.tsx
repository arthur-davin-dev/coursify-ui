import React from 'react';
import { Play } from 'lucide-react';

const HowItWorksSection = () => {
  return (
    <section className="bg-slate-50 py-16 transition-colors duration-300 dark:bg-slate-900 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header - Navy blue background matching original design */}
        <div className="mb-16 rounded-[2.5rem] bg-[#223399] py-8 text-center sm:mb-20 sm:py-10">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            What can we do with <span className="text-orange-400">Coursify?</span>
          </h2>
        </div>

        {/* Content & Video Grid */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* Left Content Area - Position: Relative for floating dots */}
          <div className="relative text-center lg:text-left">
            {/* LARGE TOP-LEFT GREEN DOT */}
            <div className="absolute -left-6 -top-6 h-12 w-12 rounded-full bg-emerald-400 opacity-80" />
            
            <div className="relative z-10 space-y-6">
              <h3 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                The Best of Both Worlds: <br />
                Classroom <span className="text-orange-400">Engagement</span> <br />
                Online <span className="text-orange-400">Flexibility</span>
              </h3>
              
              <p className="max-w-xl text-xl leading-relaxed text-slate-600 dark:text-slate-400">
                Experience the connection of a physical classroom with the 
                personalized pacing of advanced e-learning. Coursify combines 
                expert mentors, dynamic content, and interactive practical 
                labs—all within one secure, scalable cloud ecosystem.
              </p>
              
              <a 
                href="/about" 
                className="inline-block text-base font-bold text-blue-600 hover:underline dark:text-blue-400"
              >
                Learn more about our platform
              </a>
            </div>

            {/* SMALL MID-RIGHT GREEN DOT */}
            <div className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-emerald-400 opacity-80 lg:-right-4" />
          </div>

          {/* Right Video Thumbnail Area */}
          <div className="flex justify-center lg:justify-end">
            {/* The Outer Decorative Container - implements the dual borders */}
            <div className="relative p-6">
              
              {/* ORANGE DECORATIVE BORDER (Top-Left Accent) */}
              <div className="absolute -left-2 -top-2 h-32 w-32 rounded-[2.5rem] border-[14px] border-orange-400 transition-colors dark:border-orange-500" />
              
              {/* BLUE DECORATIVE BORDER (Bottom-Right Accent) */}
              <div className="absolute -bottom-2 -right-2 h-32 w-32 rounded-[2.5rem] border-[14px] border-[#223399]" />
              
              {/* Main Video/Image Container - Shadowless Flat Aesthetic */}
              <div className="relative z-10 aspect-video w-full overflow-hidden rounded-[2rem] bg-slate-900 shadow-none">
                {/* REPLACE WITH YOUR ACTUAL THUMBNAIL 
                  Using placeholder: h-[280] w-[500] 
                */}
                <img 
                  src="/coursify-platform-demo.png" 
                  alt="Coursify Platform Classroom Demo" 
                  className="h-full w-full object-cover"
                />

                {/* The Video Play Button Overlay */}
                <button 
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40"
                  aria-label="Play demo video"
                >
                  <div className="rounded-full bg-white p-6 shadow-xl shadow-blue-950/20">
                    <Play className="h-8 w-8 text-cyan-400 fill-cyan-400" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;