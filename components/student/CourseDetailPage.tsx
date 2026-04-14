"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Clock,
  Play,
  FileText,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Tag,
  User,
  Layers,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Lesson {
  id: number;
  title: string;
  description: string;
  video_url: string;
  course_id: number;
}

interface CourseDetail {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  isPublished: boolean;
  teacherId: number;
  teacherName: string;
  categoryId: number;
  categoryName: string;
  tags: string[];
  lessons: Lesson[];
  createdAt: string;
  updatedAt: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    return u.searchParams.get("v");
  } catch {
    return null;
  }
}

function isValidVideo(url: string): boolean {
  return !!getYouTubeId(url) || url.startsWith("http");
}

// ── Video Player ───────────────────────────────────────────────────────────
function VideoPlayer({ lesson, thumbnail }: { lesson: Lesson; thumbnail: string }) {
  const [playing, setPlaying] = useState(false);
  const ytId = getYouTubeId(lesson.video_url);

  useEffect(() => {
    setPlaying(false);
  }, [lesson.id]);

  if (!isValidVideo(lesson.video_url)) {
    return (
      <div className="relative w-full aspect-video bg-slate-900 rounded-2xl flex flex-col items-center justify-center gap-3 border border-slate-800">
        <AlertCircle className="text-slate-500" size={40} />
        <p className="text-slate-400 text-sm font-medium">No valid video for this lesson</p>
      </div>
    );
  }

  if (ytId && playing) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
          title={lesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
      onClick={() => setPlaying(true)}
    >
      <img
        src={
          ytId
            ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
            : thumbnail
        }
        alt={lesson.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = thumbnail;
        }}
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Play size={28} className="text-white fill-white ml-1" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <p className="text-white text-sm font-medium truncate">{lesson.title}</p>
      </div>
    </div>
  );
}

// ── Lesson Item ────────────────────────────────────────────────────────────
function LessonItem({
  lesson,
  index,
  isActive,
  isCompleted,
  onClick,
}: {
  lesson: Lesson;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-start gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-800 last:border-b-0 transition-all duration-200 group
        ${isActive
          ? "bg-indigo-50 dark:bg-indigo-950/40"
          : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
        }`}
    >
      {/* Index / Completed indicator */}
      <div
        className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-colors
          ${isCompleted
            ? "bg-emerald-500 text-white"
            : isActive
            ? "bg-indigo-600 text-white"
            : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
          }`}
      >
        {isCompleted ? <CheckCircle2 size={13} /> : index + 1}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-semibold leading-snug truncate transition-colors
            ${isActive
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
            }`}
        >
          {lesson.title}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate">
          {lesson.description}
        </p>
      </div>

      {/* Play icon */}
      <Play
        size={14}
        className={`mt-1 flex-shrink-0 transition-colors ${
          isActive ? "text-indigo-500" : "text-slate-300 dark:text-slate-600 group-hover:text-indigo-400"
        }`}
      />
    </button>
  );
}

// ── Comments ───────────────────────────────────────────────────────────────
function CommentsSection() {
  const [comment, setComment] = useState("");

  return (
    <div className="space-y-5">
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <MessageSquare size={16} className="text-indigo-500" />
        Lesson Comments
      </h3>

      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold flex-shrink-0">
          S
        </div>
        <div className="flex-1 space-y-2">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this lesson..."
            rows={3}
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 resize-none transition"
          />
          <div className="flex justify-end">
            <button
              onClick={() => setComment("")}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>

      {/* Sample comments */}
      {[
        { name: "Alice Chen", avatar: "A", color: "emerald", time: "2 hours ago", text: "Great intro! The concepts are explained very clearly." },
        { name: "Bob Kim", avatar: "B", color: "amber", time: "5 hours ago", text: "Could you add more examples? Otherwise very helpful!" },
      ].map((c) => (
        <div key={c.name} className="flex gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
              ${c.color === "emerald"
                ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400"
              }`}
          >
            {c.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{c.name}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">{c.time}</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{c.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Overview ───────────────────────────────────────────────────────────────
function OverviewTab({ course, lesson }: { course: CourseDetail; lesson: Lesson }) {
  const ytId = getYouTubeId(lesson.video_url);
  const resourceUrl = ytId
    ? `https://www.youtube.com/watch?v=${ytId}`
    : isValidVideo(lesson.video_url)
    ? lesson.video_url
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-1">
          {lesson.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {lesson.description}
        </p>
      </div>

      {resourceUrl && (
        <div>
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
            <FileText size={14} className="text-indigo-500" />
            Resources
          </h4>
          <a
            href={resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <FileText size={13} />
            {resourceUrl}
          </a>
        </div>
      )}

      {/* Course meta */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <User size={14} className="text-indigo-400" />
          <span>{course.teacherName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Layers size={14} className="text-indigo-400" />
          <span>{course.categoryName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <BookOpen size={14} className="text-indigo-400" />
          <span>{course.lessons.length} lessons</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Tag size={14} className="text-indigo-400" />
          <span>{course.tags.join(", ")}</span>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
// Replace the mock data fetch with your real API call, e.g.:
// const { data: course } = useGetCourseByIdQuery(params.courseId);

const MOCK_COURSE: CourseDetail = {
  id: 4,
  title: "Tailwind CSS",
  description: "Tailwind CSS",
  thumbnail:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo9S8fWpeNbB7pmx41vExmLuHt3a35erstzg&s",
  price: 5,
  isPublished: true,
  teacherId: 3,
  teacherName: "Arthur Davin",
  categoryId: 2,
  categoryName: "Database",
  tags: ["HTML"],
  lessons: [
    {
      id: 4,
      title: "Introduction to HTML",
      description: "Introduction to HTML",
      video_url: "https://youtu.be/Dn3B3shzK8s",
      course_id: 4,
    },
    {
      id: 5,
      title: "Javascript",
      description: "Asynchronous vs Synchronous",
      video_url: "https://youtu.be/Coyy79wRz_s",
      course_id: 4,
    },
    {
      id: 10,
      title: "test",
      description: "test",
      video_url: "test",
      course_id: 4,
    },
  ],
  createdAt: "2026-03-31T12:34:16.758+00:00",
  updatedAt: "2026-03-31T12:36:51.046+00:00",
};

type Tab = "overview" | "comments";

export default function CourseDetailPage() {
  const course = MOCK_COURSE; // swap with API data
  const [activeLesson, setActiveLesson] = useState<Lesson>(course.lessons[0]);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const markCompleted = (id: number) => {
    setCompletedIds((prev) => new Set(prev).add(id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Back */}
        <Link
          href="/dashboard/student/courses"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium mb-4 transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </Link>

        {/* Title */}
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mb-6">
          {course.title}
        </h1>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

          {/* LEFT */}
          <div className="space-y-5">
            {/* Video */}
            <VideoPlayer lesson={activeLesson} thumbnail={course.thumbnail} />

            {/* Mark complete */}
            {!completedIds.has(activeLesson.id) && (
              <div className="flex justify-end">
                <button
                  onClick={() => markCompleted(activeLesson.id)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                >
                  <CheckCircle2 size={13} />
                  Mark as Complete
                </button>
              </div>
            )}
            {completedIds.has(activeLesson.id) && (
              <div className="flex justify-end">
                <span className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-500 text-white">
                  <CheckCircle2 size={13} />
                  Completed
                </span>
              </div>
            )}

            {/* Tabs */}
            <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/60 overflow-hidden">
              <div className="flex border-b border-slate-100 dark:border-slate-700/60">
                {(["overview", "comments"] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-semibold capitalize transition-all border-b-2 -mb-px ${
                      activeTab === tab
                        ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                        : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                  >
                    {tab === "overview" ? "Overview" : "Comments"}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {activeTab === "overview" ? (
                  <OverviewTab course={course} lesson={activeLesson} />
                ) : (
                  <CommentsSection />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT — Lesson list */}
          <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/60 overflow-hidden sticky top-6">
            <div className="px-4 py-3.5 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                All Lessons
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {completedIds.size}/{course.lessons.length} done
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-slate-100 dark:bg-slate-700">
              <div
                className="h-full bg-indigo-500 transition-all duration-500"
                style={{
                  width: `${Math.round((completedIds.size / course.lessons.length) * 100)}%`,
                }}
              />
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {course.lessons.map((lesson, i) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  index={i}
                  isActive={activeLesson.id === lesson.id}
                  isCompleted={completedIds.has(lesson.id)}
                  onClick={() => {
                    setActiveLesson(lesson);
                    setActiveTab("overview");
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}