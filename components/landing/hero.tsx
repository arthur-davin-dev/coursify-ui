import { inter, outfit } from '@/app/fonts';
import Image from 'next/image';


export default function Hero() {
  return (
    <section 
      /* We inject the font variables here so children can use them */
      className={`${inter.variable} ${outfit.variable} font-sans relative w-full min-h-screen px-8 py-16 lg:px-24 flex flex-col lg:flex-row items-center overflow-hidden bg-white`}
    >
      
      {/* --- Left Content --- */}
      <div className="z-10 w-full lg:w-1/2 space-y-8">
        {/* Use font-outfit (via the CSS variable) for headings */}
        <h1 className="font-[family-name:var(--font-outfit)] text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
          Up Your <span className="text-blue-600">Skills</span> <br />
          To <span className="text-blue-600">Advance</span> Your <br />
          <span className="text-slate-900">Career</span> Path
        </h1>
        
        <p className="text-gray-500 max-w-md text-lg leading-relaxed font-[family-name:var(--font-inter)]">
          Learn UI-UX Design skills with weekend UX. The latest online learning system and material that help your knowledge growing.
        </p>

        <div className="flex gap-4">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            Get Started
          </button>
          <button className="px-8 py-4 bg-emerald-50 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-100 transition">
            Get free trial
          </button>
        </div>

        {/* Feature Icons */}
        <div className="flex flex-wrap gap-6 pt-4 text-gray-500 font-[family-name:var(--font-inter)]">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-orange-100 rounded-md text-orange-500">🗣️</span>
            <span className="text-sm font-semibold">Public Speaking</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-red-100 rounded-md text-red-500">💼</span>
            <span className="text-sm font-semibold">Career-Oriented</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-purple-100 rounded-md text-purple-500">💡</span>
            <span className="text-sm font-semibold">Creative Thinking</span>
          </div>
        </div>
      </div>

      {/* --- Right Visuals --- */}
      <div className="relative w-full lg:w-1/2 mt-20 lg:mt-0 flex justify-center">
        <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] bg-blue-600 rounded-full overflow-hidden shadow-2xl">
           <Image 
             src="/student-image.png" 
             alt="Student"
             fill
             priority 
             className="object-cover object-top mt-10 scale-110"
           />
        </div>

        {/* Floating Stat Cards - Numbers use the Heading font (Outfit) */}
        <div className="absolute -left-4 top-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-100">
          <div className="p-3 bg-blue-600 text-white rounded-lg">📹</div>
          <div>
            <p className="font-[family-name:var(--font-outfit)] font-bold text-lg">2K+</p>
            <p className="text-xs text-gray-500 font-medium">Video Courses</p>
          </div>
        </div>

        <div className="absolute -right-4 top-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl text-center border border-gray-100">
           <div className="relative w-12 h-12 mx-auto mb-2 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
           <p className="font-[family-name:var(--font-outfit)] font-bold text-xl text-slate-800">5K+</p>
           <p className="text-xs text-gray-500 font-medium">Online Courses</p>
        </div>

        <div className="absolute right-0 bottom-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-100">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">👥</div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Tutors</p>
            <p className="font-[family-name:var(--font-outfit)] font-bold text-lg text-slate-800">250+</p>
          </div>
        </div>
      </div>

      {/* Background Rings */}
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/4 opacity-20 pointer-events-none">
        <div className="w-[800px] h-[800px] border border-blue-200 rounded-full flex items-center justify-center">
          <div className="w-[600px] h-[600px] border border-blue-100 rounded-full" />
        </div>
      </div>
    </section>
  );
}