'use client';

import { Video, ThumbsUp, ThumbsDown, User, Play } from 'lucide-react';

export default function CourseDetail() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* --- LEFT COLUMN: Course Info & Feedback --- */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Course Header */}
          <section className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#2D368E] font-heading leading-tight">
              React - The Complete Guide
            </h1>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
                <User className="text-gray-400" size={20} />
              </div>
              <span className="font-semibold text-slate-700 font-sans">Dr. Fantastic</span>
            </div>

            <div className="flex gap-2">
              <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold font-sans">Beginner</span>
              <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold font-sans">Technology</span>
              <span className="px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-bold font-sans">Programming</span>
            </div>

            <button className=" bg-blue-600 text-white px-10 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 font-sans">
              Enroll now
            </button>
          </section>

          {/* About This Course */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-slate-800 font-heading">About this course</h2>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 bg-emerald-500 text-white px-2.5 py-1 rounded-md text-xs font-bold">
                  <ThumbsUp size={14} fill="currentColor" /> 80%
                </span>
                <span className="flex items-center gap-1 bg-red-500 text-white px-2.5 py-1 rounded-md text-xs font-bold">
                  <ThumbsDown size={14} fill="currentColor" /> 20%
                </span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-2xl font-sans text-lg">
              Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js, Best Practices and way more!
            </p>
          </section>

          {/* Feedback / Comments Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 font-heading">Student's feedback</h2>
            
            <div className="border border-gray-100 rounded-[2rem] p-8 space-y-10 shadow-sm">
              {/* Post Comment Input */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-orange-400 p-0.5 shrink-0">
                   <div className="relative w-full h-full rounded-full overflow-hidden">
                      <img 
                        src="https://encrypted-tbn0.gstatic.com/imgs?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s" 
                        alt="User" 
                         
                        className="object-cover"
                      />
                   </div>
                </div>
                <div className="relative w-full">
                  <input 
                    type="text" 
                    placeholder="Add a comment" 
                    className="w-full bg-gray-50 rounded-full py-4 px-6 outline-none focus:ring-2 ring-blue-100 font-sans"
                  />
                  <button className="absolute right-2 top-2 bg-[#2D368E] text-white px-8 py-2 rounded-full font-bold font-sans hover:bg-blue-900 transition">
                    Post
                  </button>
                </div>
              </div>

              {/* Nested Comments */}
              <div className="space-y-6">
                <CommentItem 
                  name="Ralph Edwards" 
                  date="Aug 19, 2021" 
                  text="In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras."
                />
                <div className="pl-14">
                  <CommentItem 
                    name="Ralph Edwards" 
                    date="Aug 19, 2021" 
                    text="In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque."
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* --- RIGHT COLUMN: Sidebar (Centered Play Button) --- */}
        <aside className="space-y-8">
          <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer">
            <img 
              src="https://img.freepik.com/free-photo/programming-background-collage_23-2149901776.jpg" 
              alt="Course Preview" 
            
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Centered Button Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4">
               <h3 className="text-white font-heading font-bold text-xl text-center px-6 leading-tight">
                {/* FRONT END DEVELOPMENT <br />  */}
                
               </h3>
               {/* Centered Play Button */}
               <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all">
                <Play size={28} fill="white" className="ml-1" />
              </div>
            </div>
          </div>

          {/* Lessons List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#2D368E] font-heading">All Lessons</h2>
            <div className="space-y-3">
              <LessonItem number={1} title="Introduce To React Js" duration="30 mn" hasQuiz />
              <LessonItem number={2} title="Lesson 2" duration="15 mn" />
              <LessonItem number={3} title="Lesson 3" duration="55 mn" />
              <LessonItem number={4} title="React Hook" duration="1 h" hasQuiz />
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

// --- Internal Components ---

function LessonItem({ number, title, duration, hasQuiz = false }: any) {
  return (
    <div className="bg-gray-50/50 p-5 rounded-2xl hover:bg-blue-50 transition-all cursor-pointer group border border-transparent hover:border-blue-100">
      <div className="flex justify-between items-start font-sans">
        <div className="flex gap-4">
          <span className="font-bold text-[#2D368E]">{number}.</span>
          <div>
            <h4 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors underline decoration-blue-200 underline-offset-4">{title}</h4>
            {hasQuiz && <p className="text-xs text-blue-500 font-bold mt-1 underline underline-offset-4">Quizzes For Lesson {number}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400 font-medium text-sm">
          <Video size={16} className="text-blue-400" />
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
}

function CommentItem({ name, date, text }: any) {
  return (
    <div className="flex gap-4 group font-sans">
      <div className="w-11 h-11 rounded-full relative overflow-hidden border border-gray-200 shrink-0">
        <img src="https://encrypted-tbn0.gstatic.com/imgs?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s"alt='logo' className="object-cover" />
      </div>
      <div className="bg-blue-50/40 p-5 rounded-[1.5rem] flex-1">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold text-slate-800">{name}</h4>
          <span className="text-xs text-gray-400 font-medium">{date}</span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}