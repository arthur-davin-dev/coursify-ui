"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Video,
  ThumbsUp,
  ThumbsDown,
  User,
  Play,
  Tag,
  Loader2,
} from "lucide-react";
import type { Course, Lesson } from "@/store/services/courseApi";
import {
  useEnrollCourseMutation,
  useIsEnrolledQuery,
} from "@/store/services/enrollmentApi";
import { useGetTeacherInfoQuery } from "@/store/features/users/userSlice";
function UserAvatar({
  imageUrl,
  name,
  className = "w-11 h-11",
}: {
  imageUrl?: string | null;
  name: string;
  className?: string;
}) {
  return (
    <div
      className={`${className} rounded-full overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700`}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
          {name?.[0]?.toUpperCase() ?? "U"}
        </div>
      )}
    </div>
  );
}
export default function CourseDetail({
  course,
  isAuthenticated,
}: {
  course: Course;
  isAuthenticated: boolean;
}) {
  const [comment, setComment] = useState("");
  const router = useRouter();

  const [enrollCourse, { isLoading: isEnrolling }] = useEnrollCourseMutation();

  // Check if already enrolled
  const { data: enrolledData } = useIsEnrolledQuery(course.id!, {
    skip: !isAuthenticated || !course.id,
  });
  const isAlreadyEnrolled = enrolledData?.isEnrolled ?? false;

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      router.push(`/login?callbackUrl=/courses/${course.id}`);
      return;
    }

    if (isAlreadyEnrolled) {
      router.push(`/dashboard/student/courses/${course.id}`);
      return;
    }

    try {
      await enrollCourse(course.id!).unwrap();
      router.push(`/dashboard/student/courses/${course.id}`); // ← was /courses (list), now goes directly into the course
    } catch (err: any) {
      const msg = err?.data?.message ?? "Enrollment failed. Please try again.";
      alert(msg);
      console.error("Enrollment failed:", err);
    }
  };

  const buttonLabel = isEnrolling
    ? "Enrolling..."
    : isAlreadyEnrolled
      ? "Go to Course"
      : "Enroll now";

  const thumbnailSrc =
    course.thumbnail && course.thumbnail !== ""
      ? course.thumbnail
      : "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=900&q=80";
  const { data: teacher } = useGetTeacherInfoQuery(course.teacherId, {
    skip: !course.teacherId,
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12 border border-gray-100 dark:border-gray-700 rounded-[2rem] p-8 md:p-12  shadow-xl">
          <section className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#2D368E] dark:text-blue-400 leading-tight">
              {course.title}
            </h1>

            <div className="flex items-center gap-3">
              <UserAvatar
                imageUrl={course.teacherImageUrl}
                name={course.teacherName ?? "Instructor"}
                className="w-10 h-10"
              />
              <span className="font-semibold text-slate-700 dark:text-gray-200">
                {course.teacherName ?? "Instructor"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {course.categoryName && (
                <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-xs font-bold">
                  {course.categoryName}
                </span>
              )}
              {course.tags?.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 rounded-full text-xs font-bold"
                >
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-extrabold text-emerald-500">
                {course.price === 0 ? "Free" : `$${course.price}`}
              </span>
              <button
                onClick={handleEnroll}
                disabled={isEnrolling}
                className="cursor-pointer bg-blue-600 text-white px-10 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg disabled:opacity-70 flex items-center gap-2"
              >
                {isEnrolling && <Loader2 size={16} className="animate-spin" />}
                {buttonLabel}
              </button>
            </div>
          </section>

          {/* About */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                About this course
              </h2>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 bg-emerald-500 text-white px-2.5 py-1 rounded-md text-xs font-bold">
                  <ThumbsUp size={14} fill="currentColor" /> 80%
                </span>
                <span className="flex items-center gap-1 bg-red-500 text-white px-2.5 py-1 rounded-md text-xs font-bold">
                  <ThumbsDown size={14} fill="currentColor" /> 20%
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl text-lg">
              {course.description}
            </p>
          </section>

          {/* Feedback */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Student's feedback
            </h2>
            <div className="border border-gray-100 dark:border-gray-700 rounded-[2rem] p-8 space-y-10 shadow-sm">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                  U
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment"
                    className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white rounded-full py-4 px-6 outline-none focus:ring-2 ring-blue-100"
                  />
                  <button className="absolute right-2 top-2 bg-[#2D368E] text-white px-8 py-2 rounded-full font-bold hover:bg-blue-900 transition">
                    Post
                  </button>
                </div>
              </div>
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

        {/* RIGHT COLUMN */}
        <aside className="space-y-8 border-t border-gray-100 dark:border-gray-700 rounded-[2rem] p-5">
          <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer">
            <img
              src={thumbnailSrc}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all">
                <Play size={28} fill="white" className="ml-1" />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl p-5 bg-gray-50/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-[#2D368E] dark:text-blue-400">
              All Lessons
            </h2>
            {course.lessons && course.lessons.length > 0 ? (
              <div className="space-y-3">
                {course.lessons.map((lesson, index) => (
                  <LessonItem
                    key={lesson.id}
                    number={index + 1}
                    lesson={lesson}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No lessons available yet.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function LessonItem({ number, lesson }: { number: number; lesson: Lesson }) {
  return (
    <div className="bg-gray-50/50 dark:bg-gray-800 p-5 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all cursor-pointer group border border-transparent hover:border-blue-100 dark:hover:border-blue-800">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <span className="font-bold text-[#2D368E] dark:text-blue-400">
            {number}.
          </span>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors underline decoration-blue-200 underline-offset-4">
              {lesson.title}
            </h4>
            {lesson.description && (
              <p className="text-xs text-gray-400 mt-0.5">
                {lesson.description}
              </p>
            )}
          </div>
        </div>
        <a
          href={lesson.video_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-blue-400 hover:text-blue-600 transition shrink-0 ml-2"
        >
          <Video size={16} />
        </a>
      </div>
    </div>
  );
}

function CommentItem({
  name,
  date,
  text,
}: {
  name: string;
  date: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 group font-sans">
      <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0 text-sm">
        {name[0]}
      </div>
      <div className="bg-blue-50/40 dark:bg-blue-900/20 p-5 rounded-[1.5rem] flex-1">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold text-slate-800 dark:text-white">{name}</h4>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}
