"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAddLessonsMutation } from "@/store/services/lessonsApi";
import { useGetMyCoursesQuery } from "@/store/services/courseApi";
import { toast } from "sonner";
import {
  Video,
  Plus,
  X,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  Loader2,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const inputStyle = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  color: "var(--text)",
};

const inputCls =
  "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#2F327D]/10 focus:border-[#2F327D]/50 placeholder:opacity-40";

const labelCls = "block text-xs font-bold uppercase tracking-widest mb-2";

const sectionStyle = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
};

export default function CreateLessonForm() {
  const router = useRouter();
  const { data: courses = [] } = useGetMyCoursesQuery();
  const [addLessons, { isLoading }] = useAddLessonsMutation();

  const [error, setError] = useState("");
  const [courseId, setCourseId] = useState("");
  const [lessons, setLessons] = useState([
    { title: "", description: "", video_url: "" },
  ]);

  // ── Lesson helpers ────────────────────────────────────────────────────────
  const updateLesson = (i: number, field: string, value: string) => {
    const next = [...lessons];
    next[i] = { ...next[i], [field]: value };
    setLessons(next);
    setError("");
  };

  const addLesson = () =>
    setLessons([...lessons, { title: "", description: "", video_url: "" }]);

  const removeLesson = (i: number) => {
    if (lessons.length === 1) return;
    setLessons(lessons.filter((_, idx) => idx !== i));
  };

  const moveLesson = (i: number, dir: number) => {
    const next = [...lessons];
    const swap = i + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[i], next[swap]] = [next[swap], next[i]];
    setLessons(next);
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!courseId) return setError("Please select a course.");

    for (let i = 0; i < lessons.length; i++) {
      if (!lessons[i].title.trim())
        return setError(`Lesson ${i + 1}: title is required.`);
      if (!lessons[i].video_url.trim())
        return setError(`Lesson ${i + 1}: video URL is required.`);
    }

    const cleanLessons = lessons.map((l) => ({
      title: l.title.trim(),
      video_url: l.video_url.trim(),
      ...(l.description.trim()
        ? { description: l.description.trim().slice(0, 500) }
        : {}),
    }));

    try {
      await addLessons({
        courseId: Number(courseId),
        lessons: cleanLessons,
      }).unwrap();

      toast.success("Lessons saved successfully!");
      setTimeout(() => router.push("/teacher/dashboard"), 1200);
    } catch (err: any) {
      console.error("API error:", err);
      const detail = err?.data?.detail;
      if (Array.isArray(detail)) {
        setError(
          detail.map((d: any) => `[${d.loc?.join(".")}] ${d.msg}`).join(" · "),
        );
      } else {
        setError(detail || err?.data?.message || "Failed to save lessons.");
      }
    }
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300 p-6"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-1.5 text-xs mb-6 text-[var(--text-muted)]">
            <Link href="/teacher/dashboard" className="hover:text-indigo-600">
              Dashboard
            </Link>
            <ChevronRight size={13} />
            <Link href="/teacher/courses" className="hover:text-indigo-600">
              My Courses
            </Link>
            <ChevronRight size={14} />
            <span className="font-semibold text-[var(--text)]">Add Lesson</span>
          </nav>

          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
              style={{ background: "#2F327D" }}
            >
              <Video size={20} color="#fff" />
            </div>
            <div>
              <h1
                className="text-2xl font-black leading-tight"
                style={{ color: "var(--text)" }}
              >
                Add Lessons
              </h1>
              <p
                className="text-sm mt-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                Add one or more lessons to an existing course
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Course selector */}
          <section className="rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-700">
            <label className={`${labelCls} text-gray-500 dark:text-gray-400`}>
              Course <span className="text-blue-600 dark:text-blue-400">*</span>
            </label>

            <select
              value={courseId}
              onChange={(e) => {
                setCourseId(e.target.value);
                setError("");
              }}
              className={`${inputCls} appearance-none cursor-pointer bg-transparent text-gray-700 dark:text-white border-gray-300 dark:border-gray-600`}
            >
              <option value="" className="dark:bg-gray-800">
                Select a course…
              </option>
              {(courses as any[]).map((c) => (
                <option key={c.id} value={c.id} className="dark:bg-gray-900">
                  {c.title}
                </option>
              ))}
            </select>
          </section>

          {/* Lessons */}
          <section className="rounded-2xl p-6 shadow-sm" style={sectionStyle}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: "#2F327D15",
                    border: "1px solid #2F327D30",
                  }}
                >
                  <Video size={17} color="#2F327D" />
                </div>
                <h2
                  className="text-base font-bold"
                  style={{ color: "var(--text)" }}
                >
                  Lessons
                  <span
                    className="ml-2 text-xs font-normal"
                    style={{ color: "var(--text-muted)" }}
                  >
                    ({lessons.length}{" "}
                    {lessons.length === 1 ? "lesson" : "lessons"})
                  </span>
                </h2>
              </div>
              <button
                type="button"
                onClick={addLesson}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all"
                style={{
                  color: "#2F327D",
                  borderColor: "#2F327D40",
                  background: "#2F327D0D",
                }}
              >
                <Plus size={13} /> Add Lesson
              </button>
            </div>

            <div className="space-y-4">
              {lessons.map((lesson, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 group transition-colors"
                  style={{
                    background: "var(--bg-soft)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black"
                        style={{
                          background: "#2F327D15",
                          border: "1px solid #2F327D30",
                          color: "#2F327D",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Lesson {i + 1}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {[
                        {
                          action: () => moveLesson(i, -1),
                          disabled: i === 0,
                          icon: <ChevronUp size={13} />,
                        },
                        {
                          action: () => moveLesson(i, 1),
                          disabled: i === lessons.length - 1,
                          icon: <ChevronDown size={13} />,
                        },
                        {
                          action: () => removeLesson(i),
                          disabled: lessons.length === 1,
                          danger: true,
                          icon: <X size={13} />,
                        },
                      ].map(({ action, disabled, icon, danger }, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={action}
                          disabled={disabled}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed ${danger ? "hover:text-red-500 hover:border-red-200" : "hover:text-[#2F327D] hover:border-[#2F327D40]"}`}
                          style={{
                            background: "var(--bg-card)",
                            borderColor: "var(--border)",
                            color: "var(--text-muted)",
                          }}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label
                        className={labelCls}
                        style={{ color: "var(--text-muted)" }}
                      >
                        Lesson Title <span style={{ color: "#2F327D" }}>*</span>
                      </label>
                      <input
                        placeholder="e.g. Variables and Data Types"
                        value={lesson.title}
                        onChange={(e) =>
                          updateLesson(i, "title", e.target.value)
                        }
                        className={inputCls}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label
                        className={labelCls}
                        style={{ color: "var(--text-muted)" }}
                      >
                        Video URL <span style={{ color: "#2F327D" }}>*</span>
                      </label>
                      <input
                        placeholder="https://youtu.be/... or direct video link"
                        value={lesson.video_url}
                        onChange={(e) =>
                          updateLesson(i, "video_url", e.target.value)
                        }
                        className={inputCls}
                        style={inputStyle}
                      />
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        YouTube, Vimeo, or direct video link
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          className={labelCls}
                          style={{
                            color: "var(--text-muted)",
                            marginBottom: 0,
                          }}
                        >
                          Description
                        </label>
                        <span
                          className="text-xs tabular-nums"
                          style={{
                            color:
                              lesson.description.length > 480
                                ? "#dc2626"
                                : "var(--text-muted)",
                          }}
                        >
                          {lesson.description.length}/500
                        </span>
                      </div>
                      <textarea
                        placeholder="What does this lesson cover?"
                        value={lesson.description}
                        onChange={(e) =>
                          updateLesson(
                            i,
                            "description",
                            e.target.value.slice(0, 500),
                          )
                        }
                        rows={2}
                        maxLength={500}
                        className={`${inputCls} resize-none`}
                        style={{
                          ...inputStyle,
                          ...(lesson.description.length > 480
                            ? {
                                borderColor: "#fca5a5",
                                boxShadow: "0 0 0 2px rgba(220,38,38,0.08)",
                              }
                            : {}),
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addLesson}
              className="w-full mt-4 border-2 border-dashed rounded-xl py-3 text-sm transition-all flex items-center justify-center gap-2 font-medium hover:text-[#2F327D] hover:border-[#2F327D60] hover:bg-[#2F327D08]"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}
            >
              <Plus size={15} /> Add another lesson
            </button>
          </section>

          {/* Hint */}
          <div
            className="px-4 py-3 rounded-xl border text-xs flex items-center gap-2"
            style={{
              background: "var(--bg-soft)",
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
          >
            <span>📎</span>
            You can add attachments (PDF, slides) to each lesson after saving.
          </div>

          {/* Error */}
          {error && (
            <div
              className="flex items-center gap-2.5 text-sm rounded-xl px-4 py-3 border"
              style={{
                background: "rgba(220,38,38,0.06)",
                borderColor: "rgba(220,38,38,0.2)",
                color: "#dc2626",
              }}
            >
              <AlertCircle size={15} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pb-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 text-white font-semibold text-sm rounded-xl py-3.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background: "linear-gradient(135deg, #2F327D 0%, #4e52b5 100%)",
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Saving…
                </>
              ) : (
                <>
                  Save Lessons <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
