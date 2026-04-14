// "use client";

// import { useState, useEffect } from "react"; // Added useEffect
// import { useParams, useRouter } from "next/navigation";
// import { useGetEnrolledCourseDetailQuery } from "@/store/services/enrollmentApi";
// import type { Lesson } from "@/store/services/courseApi";
// import {
//   Play,
//   ArrowLeft,
//   BookOpen,
//   ChevronRight,
//   Check,
//   RotateCcw,
//   Lock,
// } from "lucide-react";

// // ── Video Player ──────────────────────────────────────────────────────────────
// function VideoPlayer({ lesson }: { lesson: Lesson }) {
//   if (!lesson?.video_url) {
//     return (
//       <div
//         className="w-full flex items-center justify-center bg-[#0f0f1a]"
//         style={{ aspectRatio: "16/9", maxHeight: "calc(100vh - 56px)" }}
//       >
//         <p className="text-sm text-white/40">No video for this lesson.</p>
//       </div>
//     );
//   }

//   const toEmbedUrl = (url: string): string | null => {
//     try {
//       const parsed = new URL(url);
//       // Enhanced YouTube logic
//       if (
//         parsed.hostname.includes("youtube.com") ||
//         parsed.hostname === "youtu.be"
//       ) {
//         const videoId =
//           parsed.searchParams.get("v") || parsed.pathname.split("/").pop();
//         return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
//       }
//       if (parsed.hostname.includes("vimeo.com")) {
//         const vimeoId = parsed.pathname.split("/").pop();
//         return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
//       }
//       return null;
//     } catch {
//       return null;
//     }
//   };

//   const embedUrl = toEmbedUrl(lesson.video_url);
//   const isFileVideo = /\.(mp4|webm|ogg)(\?|$)/i.test(lesson.video_url);

//   if (embedUrl) {
//     return (
//       <iframe
//         key={embedUrl}
//         src={embedUrl}
//         className="w-full"
//         style={{
//           aspectRatio: "16/9",
//           maxHeight: "calc(100vh - 56px)",
//           display: "block",
//         }}
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//         title={lesson.title}
//       />
//     );
//   }

//   if (isFileVideo) {
//     return (
//       <video
//         key={lesson.video_url}
//         src={lesson.video_url}
//         controls
//         autoPlay
//         className="w-full"
//         style={{
//           aspectRatio: "16/9",
//           maxHeight: "calc(100vh - 56px)",
//           display: "block",
//         }}
//       />
//     );
//   }

//   return (
//     <div
//       className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#0f0f1a]"
//       style={{ aspectRatio: "16/9" }}
//     >
//       <p className="text-sm text-white/70 text-center px-4">
//         This video format is not supported for direct embedding.
//       </p>
//       <a
//         href={lesson.video_url}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
//       >
//         Open Video in New Tab
//       </a>
//     </div>
//   );
// }

// // ── Main Page ─────────────────────────────────────────────────────────────────
// export default function EnrolledCourseDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const courseId = Number(id);

//   const {
//     data: course,
//     isLoading,
//     error,
//   } = useGetEnrolledCourseDetailQuery(courseId);

//   const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
//   const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());

//   const lessons = course?.lessons ?? [];
//   const total = lessons.length;

//   // FIX: Sync active lesson when data initially loads
//   useEffect(() => {
//     if (lessons.length > 0 && !activeLesson) {
//       setActiveLesson(lessons[0]);
//     }
//   }, [lessons, activeLesson]);

//   const currentLesson = activeLesson ?? lessons[0] ?? null;
//   const currentIdx = currentLesson
//     ? lessons.findIndex((l) => l.id === currentLesson.id)
//     : 0;

//   const completedCount = completedIds.size;
//   const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
//   const isCourseComplete = total > 0 && completedCount === total;

//   const isDone = (lesson: Lesson) =>
//     lesson.id != null && completedIds.has(lesson.id);

//   const markDone = (lesson: Lesson) => {
//     if (!lesson.id || isDone(lesson)) return;
//     setCompletedIds((prev) => new Set(prev).add(lesson.id!));
//   };

//   const completeAll = () => {
//     const allIds = lessons
//       .map((l) => l.id)
//       .filter((id): id is number => id !== undefined);
//     setCompletedIds(new Set(allIds));
//   };

//   const resumeLesson = () => {
//     const next = lessons.find((l) => !isDone(l));
//     if (next) setActiveLesson(next);
//   };

//   const goPrev = () => {
//     if (currentIdx > 0) setActiveLesson(lessons[currentIdx - 1]);
//   };
//   const goNext = () => {
//     if (currentIdx < total - 1) setActiveLesson(lessons[currentIdx + 1]);
//   };

//   if (isLoading)
//     return (
//       <div className="flex items-center justify-center min-h-[60vh] text-gray-400">
//         Loading course content...
//       </div>
//     );
//   if (error || !course)
//     return (
//       <div className="flex items-center justify-center min-h-[60vh] text-red-500 font-medium">
//         Access Denied or Course Not Found.
//       </div>
//     );

//   return (
//     <div className="min-h-screen -mx-4 lg:-mx-7 -mt-4 lg:-mt-7 bg-slate-50 dark:bg-slate-950">
//       {/* ── Video Section ── */}
//       <div className="w-full bg-black shadow-2xl">
//         {currentLesson ? (
//           <VideoPlayer lesson={currentLesson} />
//         ) : (
//           <div
//             className="w-full flex flex-col items-center justify-center bg-[#0f0f1a]"
//             style={{ aspectRatio: "16/9", maxHeight: "calc(100vh - 56px)" }}
//           >
//             <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3">
//               <Play
//                 className="text-indigo-600 fill-indigo-600 ml-1"
//                 size={24}
//               />
//             </div>
//             <span className="text-sm font-medium text-white/60">
//               Select a lesson to begin
//             </span>
//           </div>
//         )}
//       </div>

//       <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* ── Content Section ── */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Navigation Breadcrumb */}
//             <div className="flex items-center gap-2 text-xs text-gray-400">
//               <button
//                 onClick={() => router.push("/dashboard/student/courses")}
//                 className="flex items-center gap-1 font-bold hover:text-indigo-500 transition-colors"
//               >
//                 <ArrowLeft size={14} /> MY COURSES
//               </button>
//               <ChevronRight size={12} />
//               <span className="font-medium text-indigo-500 uppercase tracking-wider">
//                 {course.title}
//               </span>
//             </div>

//             <div className="space-y-2">
//               <h1 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">
//                 {course.title}
//               </h1>
//               {currentLesson && (
//                 <p className="text-indigo-600 dark:text-indigo-400 font-bold">
//                   LESSON {currentIdx + 1}: {currentLesson.title}
//                 </p>
//               )}
//             </div>

//             {/* Progress Card */}
//             <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-6">
//               <div className="flex items-center justify-between mb-3">
//                 <span className="text-xs font-black uppercase text-gray-400 tracking-widest">
//                   Progress
//                 </span>
//                 <span className="text-sm font-black text-indigo-600">
//                   {percent}% Complete
//                 </span>
//               </div>
//               <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 mb-4 overflow-hidden">
//                 <div
//                   className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-indigo-600 to-violet-500"
//                   style={{ width: `${percent}%` }}
//                 />
//               </div>

//               <div className="flex flex-wrap gap-3">
//                 <button
//                   onClick={completeAll}
//                   disabled={isCourseComplete}
//                   className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all transform active:scale-95 ${isCourseComplete ? "bg-green-500 shadow-green-200" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100"}`}
//                 >
//                   {isCourseComplete ? "COURSE COMPLETED ✓" : "MARK ALL AS DONE"}
//                 </button>
//                 <button
//                   onClick={resumeLesson}
//                   className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all"
//                 >
//                   <RotateCcw size={16} /> RESUME NEXT
//                 </button>
//               </div>
//             </div>

//             {/* Lesson Detail */}
//             {currentLesson?.description && (
//               <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-6">
//                 <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-3">
//                   Lesson Description
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
//                   {currentLesson.description}
//                 </p>
//               </div>
//             )}

//             {/* Controls */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <button
//                 onClick={() => currentLesson && markDone(currentLesson)}
//                 disabled={!currentLesson || isDone(currentLesson)}
//                 className={`flex-1 px-6 py-4 rounded-2xl text-sm font-black tracking-wide transition-all ${
//                   currentLesson && isDone(currentLesson)
//                     ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 cursor-default"
//                     : "bg-blue-800 text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:text-gray-900 dark:hover:bg-indigo-700"
//                 }`}
//               >
//                 {currentLesson && isDone(currentLesson)
//                   ? "COMPLETED ✓"
//                   : "MARK LESSON AS COMPLETE"}
//               </button>

//               <div className="flex gap-2">
//                 <button
//                   onClick={goPrev}
//                   disabled={currentIdx === 0}
//                   className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-20 transition-all"
//                 >
//                   <ArrowLeft size={20} />
//                 </button>
//                 <button
//                   onClick={goNext}
//                   disabled={currentIdx >= total - 1}
//                   className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 disabled:opacity-20 transition-all"
//                 >
//                   NEXT
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* ── Sidebar: Playlist ── */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl overflow-hidden">
//               <div className="px-6 py-5 border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-sm font-black flex items-center gap-2 text-gray-800 dark:text-white uppercase tracking-tighter">
//                     <BookOpen size={16} className="text-indigo-600" /> Course
//                     Content
//                   </h3>
//                   <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-indigo-100 text-indigo-600 uppercase">
//                     {total} Lessons
//                   </span>
//                 </div>
//               </div>

//               <div
//                 className="overflow-y-auto custom-scrollbar"
//                 style={{ maxHeight: "calc(100vh - 300px)" }}
//               >
//                 {lessons.map((lesson, i) => {
//                   const isActive = currentLesson?.id === lesson.id;
//                   const done = isDone(lesson);
//                   // Optional: strict locking logic (uncomment if you want to force order)
//                   // const isLocked = i > 0 && !isDone(lessons[i - 1]) && !isActive;
//                   const isLocked = false;

//                   return (
//                     <button
//                       key={lesson.id ?? i}
//                       onClick={() => !isLocked && setActiveLesson(lesson)}
//                       disabled={isLocked}
//                       className={`w-full flex items-center gap-4 px-6 py-5 text-left transition-all border-b border-gray-50 dark:border-gray-800 last:border-b-0 group
//                         ${isActive ? "bg-indigo-50/50 dark:bg-indigo-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"}
//                         ${isLocked ? "opacity-50 grayscale" : "opacity-100"}`}
//                     >
//                       <div
//                         className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all
//                         ${done ? "bg-green-500 border-green-500" : isActive ? "bg-indigo-600 border-indigo-600" : "border-gray-300 dark:border-gray-600"}`}
//                       >
//                         {done ? (
//                           <Check
//                             size={12}
//                             className="text-white"
//                             strokeWidth={4}
//                           />
//                         ) : isActive ? (
//                           <Play
//                             size={10}
//                             className="text-white fill-white ml-0.5"
//                           />
//                         ) : isLocked ? (
//                           <Lock size={10} className="text-gray-400" />
//                         ) : (
//                           <span className="text-[10px] font-bold text-gray-400 group-hover:text-indigo-600">
//                             {i + 1}
//                           </span>
//                         )}
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <p
//                           className={`text-sm truncate font-bold ${isActive ? "text-indigo-600" : done ? "text-gray-400 line-through" : "text-gray-700 dark:text-gray-200"}`}
//                         >
//                           {lesson.title}
//                         </p>
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetEnrolledCourseDetailQuery } from "@/store/services/enrollmentApi";
import {
  useGetCourseProgressQuery,
  useUpdateCourseProgressMutation,
} from "@/store/services/progressApi";
import type { Lesson } from "@/store/services/courseApi";
import { Play, ArrowLeft, BookOpen, ChevronRight, Check, RotateCcw, Lock } from "lucide-react";

// ── Video Player ──────────────────────────────────────────────────────────
function VideoPlayer({
  lesson,
  onWatchPercent,
}: {
  lesson: Lesson;
  onWatchPercent: (percent: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastReportedRef = useRef(0);

  useEffect(() => {
    lastReportedRef.current = 0;
  }, [lesson.id]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const watched = Math.round((video.currentTime / video.duration) * 100);
    if (watched >= lastReportedRef.current + 5) {
      lastReportedRef.current = watched;
      onWatchPercent(watched);
    }
  }, [onWatchPercent]);

  if (!lesson?.video_url) {
    return (
      <div className="w-full flex items-center justify-center bg-[#0f0f1a]"
        style={{ aspectRatio: "16/9", maxHeight: "calc(100vh - 56px)" }}>
        <p className="text-sm text-white/40">No video for this lesson.</p>
      </div>
    );
  }

  const toEmbedUrl = (url: string): string | null => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtube.com") || parsed.hostname === "youtu.be") {
        const videoId = parsed.searchParams.get("v") || parsed.pathname.split("/").pop();
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      }
      if (parsed.hostname.includes("vimeo.com")) {
        const vimeoId = parsed.pathname.split("/").pop();
        return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
      }
      return null;
    } catch { return null; }
  };

  const embedUrl = toEmbedUrl(lesson.video_url);
  const isFileVideo = /\.(mp4|webm|ogg)(\?|$)/i.test(lesson.video_url);

  if (isFileVideo) {
    return (
      <video
        ref={videoRef}
        key={lesson.video_url}
        src={lesson.video_url}
        controls autoPlay
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => onWatchPercent(100)}
        className="w-full"
        style={{ aspectRatio: "16/9", maxHeight: "calc(100vh - 56px)", display: "block" }}
      />
    );
  }

  if (embedUrl) {
    return (
      <iframe
        key={embedUrl}
        src={embedUrl}
        className="w-full"
        style={{ aspectRatio: "16/9", maxHeight: "calc(100vh - 56px)", display: "block" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={lesson.title}
      />
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 bg-[#0f0f1a]"
      style={{ aspectRatio: "16/9" }}>
      <p className="text-sm text-white/70 text-center px-4">
        This video format is not supported for direct embedding.
      </p>
      <a href={lesson.video_url} target="_blank" rel="noopener noreferrer"
        className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition">
        Open Video in New Tab
      </a>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function EnrolledCourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const courseId = Number(id);

  const { data: course, isLoading, error } = useGetEnrolledCourseDetailQuery(courseId);
  const { data: progressData } = useGetCourseProgressQuery(String(courseId));
  const [updateProgress] = useUpdateCourseProgressMutation();

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // ✅ completedIds stored locally (backend only has overall %)
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());

  // ✅ Per-lesson watch % — local only, used to calculate overall %
  const [lessonWatchMap, setLessonWatchMap] = useState<Record<number, number>>({});

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const lessons = course?.lessons ?? [];
  const total = lessons.length;

  // Restore progress from backend on load
  useEffect(() => {
    if (!progressData || total === 0) return;

    // Backend stores overall progressPercent (0-100)
    // Estimate how many lessons are done from that %
    const backendPercent = progressData?.progressPercent ?? 0;
    const estimatedDone = Math.round((backendPercent / 100) * total);

    // Mark first N lessons as complete to match backend %
    if (estimatedDone > 0 && completedIds.size === 0) {
      const ids = lessons
        .slice(0, estimatedDone)
        .map((l) => l.id)
        .filter((id): id is number => id !== undefined);
      setCompletedIds(new Set(ids));
    }
  }, [progressData, lessons, total]);

  useEffect(() => {
    if (lessons.length > 0 && !activeLesson) {
      setActiveLesson(lessons[0]);
    }
  }, [lessons, activeLesson]);

  const currentLesson = activeLesson ?? lessons[0] ?? null;
  const currentIdx = currentLesson
    ? lessons.findIndex((l) => l.id === currentLesson.id)
    : 0;

  const completedCount = completedIds.size;

  // ✅ Overall course % = average of all lesson watch %
  // Falls back to completed lessons ratio
  const overallPercent = total > 0
    ? Math.round(
        lessons.reduce((sum, l) => {
          const w = l.id ? (lessonWatchMap[l.id] ?? (completedIds.has(l.id!) ? 100 : 0)) : 0;
          return sum + w;
        }, 0) / total
      )
    : 0;

  const isCourseComplete = overallPercent >= 100;
  const isDone = (lesson: Lesson) => lesson.id != null && completedIds.has(lesson.id);

  // ✅ Debounced save — sends only progressPercent to backend
  const saveToBackend = useCallback((percent: number) => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await updateProgress({
          courseId: String(courseId),
          progressPercent: Math.min(percent, 100),
        }).unwrap();
      } catch (err) {
        console.error("Failed to save progress:", err);
      }
    }, 1500); // debounce 1.5s — avoids spamming on every 5%
  }, [courseId, updateProgress]);

  // ✅ Called by VideoPlayer every 5% watched
  const handleWatchPercent = useCallback((watchedPercent: number) => {
    if (!currentLesson?.id) return;
    const lessonId = currentLesson.id;

    setLessonWatchMap((prev) => {
      const existing = prev[lessonId] ?? 0;
      if (watchedPercent <= existing) return prev;

      const updated = { ...prev, [lessonId]: watchedPercent };

      // Recalculate overall %
      const newOverall = Math.round(
        lessons.reduce((sum, l) => {
          const w = l.id ? (updated[l.id] ?? (completedIds.has(l.id!) ? 100 : 0)) : 0;
          return sum + w;
        }, 0) / total
      );

      saveToBackend(newOverall);
      return updated;
    });

    // Auto-mark lesson complete at 80%
    if (watchedPercent >= 80) {
      setCompletedIds((prev) => {
        if (prev.has(lessonId)) return prev;
        return new Set(prev).add(lessonId);
      });
    }
  }, [currentLesson, lessons, total, completedIds, saveToBackend]);

  // Manual mark done
  const markDone = async (lesson: Lesson) => {
    if (!lesson.id || isDone(lesson)) return;
    const newCompleted = new Set(completedIds).add(lesson.id);
    setCompletedIds(newCompleted);

    // Also set watch map to 100 for this lesson
    setLessonWatchMap((prev) => ({ ...prev, [lesson.id!]: 100 }));

    const newPercent = Math.round((newCompleted.size / total) * 100);
    try {
      await updateProgress({
        courseId: String(courseId),
        progressPercent: newPercent,
      }).unwrap();
    } catch (err) {
      console.error("Failed to save:", err);
      setCompletedIds(completedIds);
    }
  };

  const completeAll = async () => {
    const allIds = lessons
      .map((l) => l.id)
      .filter((id): id is number => id !== undefined);
    setCompletedIds(new Set(allIds));
    const allWatched = Object.fromEntries(allIds.map((id) => [id, 100]));
    setLessonWatchMap(allWatched);
    try {
      await updateProgress({ courseId: String(courseId), progressPercent: 100 }).unwrap();
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };

  const resumeLesson = () => {
    const next = lessons.find((l) => !isDone(l));
    if (next) setActiveLesson(next);
  };

  const goPrev = () => { if (currentIdx > 0) setActiveLesson(lessons[currentIdx - 1]); };
  const goNext = () => { if (currentIdx < total - 1) setActiveLesson(lessons[currentIdx + 1]); };

  if (isLoading)
    return <div className="flex items-center justify-center min-h-[60vh] text-gray-400">Loading course content...</div>;
  if (error || !course)
    return <div className="flex items-center justify-center min-h-[60vh] text-red-500 font-medium">Access Denied or Course Not Found.</div>;

  return (
    <div className="min-h-screen -mx-4 lg:-mx-7 -mt-4 lg:-mt-7 bg-slate-50 dark:bg-slate-950">
      {/* Video */}
      <div className="w-full bg-black shadow-2xl">
        {currentLesson ? (
          <VideoPlayer lesson={currentLesson} onWatchPercent={handleWatchPercent} />
        ) : (
          <div className="w-full flex flex-col items-center justify-center bg-[#0f0f1a]"
            style={{ aspectRatio: "16/9", maxHeight: "calc(100vh - 56px)" }}>
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3">
              <Play className="text-indigo-600 fill-indigo-600 ml-1" size={24} />
            </div>
            <span className="text-sm font-medium text-white/60">Select a lesson to begin</span>
          </div>
        )}
      </div>

      <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <button onClick={() => router.push("/dashboard/student/courses")}
                className="flex items-center gap-1 font-bold hover:text-indigo-500 transition-colors">
                <ArrowLeft size={14} /> MY COURSES
              </button>
              <ChevronRight size={12} />
              <span className="font-medium text-indigo-500 uppercase tracking-wider">{course.title}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">{course.title}</h1>
              {currentLesson && (
                <p className="text-indigo-600 dark:text-indigo-400 font-bold">
                  LESSON {currentIdx + 1}: {currentLesson.title}
                </p>
              )}
            </div>

            {/* Progress Card */}
            <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase text-gray-400 tracking-widest">Progress</span>
                <span className="text-sm font-black text-indigo-600">{overallPercent}% Complete</span>
              </div>
              <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 mb-4 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-indigo-600 to-violet-500"
                  style={{ width: `${overallPercent}%` }}
                />
              </div>

              {/* Current lesson watch % indicator */}
              {currentLesson?.id && (
                <div className="flex items-center gap-3 mb-4 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800">
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-1">
                      Watching: <span className="font-bold text-gray-600 dark:text-gray-200">{currentLesson.title}</span>
                    </p>
                    <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${lessonWatchMap[currentLesson.id] ?? 0}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-black text-indigo-500 shrink-0">
                    {lessonWatchMap[currentLesson.id] ?? 0}%
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button onClick={completeAll} disabled={isCourseComplete}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95 ${isCourseComplete ? "bg-green-500" : "bg-indigo-600 hover:bg-indigo-700"}`}>
                  {isCourseComplete ? "COURSE COMPLETED ✓" : "MARK ALL AS DONE"}
                </button>
                <button onClick={resumeLesson}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all">
                  <RotateCcw size={16} /> RESUME NEXT
                </button>
              </div>
            </div>

            {/* Lesson description */}
            {currentLesson?.description && (
              <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-3">Lesson Description</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{currentLesson.description}</p>
              </div>
            )}

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={() => currentLesson && markDone(currentLesson)}
                disabled={!currentLesson || isDone(currentLesson)}
                className={`flex-1 px-6 py-4 rounded-2xl text-sm font-black tracking-wide transition-all ${
                  currentLesson && isDone(currentLesson)
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 cursor-default"
                    : "bg-blue-800 text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                }`}>
                {currentLesson && isDone(currentLesson) ? "COMPLETED ✓" : "MARK LESSON AS COMPLETE"}
              </button>
              <div className="flex gap-2">
                <button onClick={goPrev} disabled={currentIdx === 0}
                  className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-20 transition-all">
                  <ArrowLeft size={20} />
                </button>
                <button onClick={goNext} disabled={currentIdx >= total - 1}
                  className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 disabled:opacity-20 transition-all">
                  NEXT
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black flex items-center gap-2 text-gray-800 dark:text-white uppercase tracking-tighter">
                    <BookOpen size={16} className="text-indigo-600" /> Course Content
                  </h3>
                  <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-indigo-100 text-indigo-600 uppercase">
                    {total} Lessons
                  </span>
                </div>
              </div>

              <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: "calc(100vh - 300px)" }}>
                {lessons.map((lesson, i) => {
                  const isActive = currentLesson?.id === lesson.id;
                  const done = isDone(lesson);
                  const watchPct = lesson.id ? (lessonWatchMap[lesson.id] ?? 0) : 0;

                  return (
                    <button key={lesson.id ?? i} onClick={() => setActiveLesson(lesson)}
                      className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-all border-b border-gray-50 dark:border-gray-800 last:border-b-0 group
                        ${isActive ? "bg-indigo-50/50 dark:bg-indigo-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all
                        ${done ? "bg-green-500 border-green-500" : isActive ? "bg-indigo-600 border-indigo-600" : "border-gray-300 dark:border-gray-600"}`}>
                        {done ? (
                          <Check size={12} className="text-white" strokeWidth={4} />
                        ) : isActive ? (
                          <Play size={10} className="text-white fill-white ml-0.5" />
                        ) : (
                          <span className="text-[10px] font-bold text-gray-400 group-hover:text-indigo-600">{i + 1}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate font-bold ${isActive ? "text-indigo-600" : done ? "text-gray-400 line-through" : "text-gray-700 dark:text-gray-200"}`}>
                          {lesson.title}
                        </p>
                        {/* Mini watch progress bar */}
                        {watchPct > 0 && !done && (
                          <div className="mt-1.5 w-full h-1 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                            <div className="h-full bg-indigo-400 rounded-full transition-all duration-500"
                              style={{ width: `${watchPct}%` }} />
                          </div>
                        )}
                      </div>

                      {/* Watch % or done badge */}
                      {done ? (
                        <span className="text-[10px] font-black text-green-500 shrink-0">DONE</span>
                      ) : watchPct > 0 ? (
                        <span className="text-[10px] font-bold text-indigo-400 shrink-0">{watchPct}%</span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}