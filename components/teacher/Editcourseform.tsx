"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  BookOpen,
  Video,
  Tag,
  ChevronUp,
  ChevronDown,
  X,
  Plus,
  AlertCircle,
  Loader2,
  ImagePlus,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";
import {
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
} from "@/store/services/courseApi";
import { useGetCategoriesQuery } from "@/store/services/categoryApi";

const DEFAULT_TAGS = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "TypeScript",
  "CSS",
  "HTML",
  "Java",
  "C++",
  "Machine Learning",
  "Data Science",
  "UI/UX",
  "DevOps",
  "Docker",
  "SQL",
  "MongoDB",
  "REST API",
  "Git",
  "Linux",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Free",
  "Certificate",
];

const inputCls = [
  "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all",
  "bg-[var(--bg-soft)] border border-[var(--border)]",
  "dark:bg-gray-800 dark:border-gray-700 dark:text-white",
  "text-[var(--text)] placeholder:text-[var(--text-muted)]",
  "focus:border-primary focus:ring-2 focus:ring-primary/10",
].join(" ");

const labelCls =
  "block text-[0.65rem] font-bold uppercase tracking-widest mb-2 text-[var(--text-muted)]";

export default function EditCourseForm() {
  const router = useRouter();
  const params = useParams();

  // ✅ Fix 1: parse id as number — getCourseByIdQuery expects number, not string
  const courseId = Number(params?.id);

  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const { data: categoriesRaw = [] } = useGetCategoriesQuery();

  // ✅ Fix 2: skip if id is missing or NaN
  const {
    data: courseData,
    isLoading: isFetching,
    isError,
  } = useGetCourseByIdQuery(courseId, {
    skip: !courseId || isNaN(courseId),
  });

  const categories = Array.isArray(categoriesRaw)
    ? categoriesRaw
    : ((categoriesRaw as any)?.categories ??
      (categoriesRaw as any)?.data ??
      []);

  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [thumbPreview, setThumbPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category_id: "",
    thumbnail: "",
    price: "0",
    isPublished: false,
    tags: [] as string[],
    lessons: [{ title: "", description: "", video_url: "" }],
  });

  // ✅ Fix 3: courseData IS the Course directly (no .course/.data wrapper needed)
  // ✅ Fix 4: Course type uses categoryId (camelCase), not category_id (snake_case)
  useEffect(() => {
    if (!courseData || hydrated) return;

    const lessons =
      Array.isArray(courseData.lessons) && courseData.lessons.length > 0
        ? courseData.lessons.map((l) => ({
            title: l.title ?? "",
            description: l.description ?? "",
            video_url: l.video_url ?? "",
          }))
        : [{ title: "", description: "", video_url: "" }];

    setForm({
      title: courseData.title ?? "",
      description: courseData.description ?? "",
      category_id: courseData.categoryId ? String(courseData.categoryId) : "",
      thumbnail: courseData.thumbnail ?? "",
      price: courseData.price !== undefined ? String(courseData.price) : "0",
      isPublished: courseData.isPublished ?? false,
      tags: Array.isArray(courseData.tags) ? courseData.tags : [],
      lessons,
    });

    if (courseData.thumbnail) setThumbPreview(courseData.thumbnail);
    setHydrated(true);
  }, [courseData, hydrated]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setError("");
  };

  // ── Thumbnail upload ──────────────────────────────────────────────────────
  const handleThumbFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setThumbPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setThumbPreview(url);
      setForm((p) => ({ ...p, thumbnail: url }));
    } catch {
      alert("Image upload failed.");
      setThumbPreview("");
    } finally {
      setUploading(false);
    }
  };

  // ── Tags ──────────────────────────────────────────────────────────────────
  const addTag = (raw?: string) => {
    const tag = (raw ?? tagInput).trim();
    if (tag && !form.tags.includes(tag))
      setForm((p) => ({ ...p, tags: [...p.tags, tag] }));
    if (!raw) setTagInput("");
  };
  const removeTag = (tag: string) =>
    setForm((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) }));
  const toggleTag = (tag: string) =>
    form.tags.includes(tag) ? removeTag(tag) : addTag(tag);

  // ── Lessons ───────────────────────────────────────────────────────────────
  const updateLesson = (i: number, field: string, val: string) => {
    const lessons = [...form.lessons];
    lessons[i] = { ...lessons[i], [field]: val };
    setForm((p) => ({ ...p, lessons }));
  };
  const addLesson = () =>
    setForm((p) => ({
      ...p,
      lessons: [...p.lessons, { title: "", description: "", video_url: "" }],
    }));
  const removeLesson = (i: number) => {
    if (form.lessons.length === 1) return;
    setForm((p) => ({
      ...p,
      lessons: p.lessons.filter((_, idx) => idx !== i),
    }));
  };
  const moveLesson = (i: number, dir: number) => {
    const arr = [...form.lessons];
    const swap = i + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[i], arr[swap]] = [arr[swap], arr[i]];
    setForm((p) => ({ ...p, lessons: arr }));
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) return setError("Course title is required.");
    if (!form.description.trim()) return setError("Description is required.");
    if (!form.category_id) return setError("Please select a category.");

    const priceNum = parseFloat(form.price);
    if (isNaN(priceNum) || priceNum < 0)
      return setError("Price must be a valid number.");

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      categoryId: Number(form.category_id), // ← was category_id, backend wants categoryId
      imageUrl: form.thumbnail.trim() || "", // ← was thumbnail, backend wants imageUrl
      price: priceNum,
      isPublished: form.isPublished,
      tags: form.tags,
      lessons: form.lessons
        .filter((l) => l.title.trim())
        .map((l) => ({
          title: l.title.trim(),
          description: l.description.trim() || "No description",
          video_url: l.video_url.trim() || "",
        })),
    };

    try {
      // ✅ Fix 5: wrap payload in `body` — updateCourse expects { id, body }
      await updateCourse({ id: courseId, body: payload }).unwrap();
      setSaved(true);
      setTimeout(() => router.push("/dashboard/teacher"), 1200);
    } catch (err: any) {
      const detail = err?.data?.detail;
      let msg = "Failed to update course.";
      if (Array.isArray(detail)) {
        msg = detail
          .map((d: any) => {
            const field = d.loc?.slice(1).join(".") ?? "";
            return field ? `${field}: ${d.msg}` : d.msg;
          })
          .join(" • ");
      } else if (typeof detail === "string") {
        msg = detail;
      } else if (err?.data?.message) {
        msg = err.data.message;
      }
      setError(msg);
    }
  };

  const filteredSuggestions = DEFAULT_TAGS.filter((t) =>
    t.toLowerCase().includes(tagInput.toLowerCase()),
  );

  // ── Loading state ─────────────────────────────────────────────────────────
  if (isFetching) {
    return (
      <div className="min-h-screen bg-[var(--bg-soft)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-[var(--text-muted)]">
          <Loader2 size={32} className="animate-spin text-primary" />
          <p className="text-sm font-medium">Loading course data…</p>
        </div>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (isError || (!isFetching && !courseData)) {
    return (
      <div className="min-h-screen bg-[var(--bg-soft)] flex items-center justify-center px-4">
        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] p-8 max-w-sm w-full text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={22} className="text-red-500" />
          </div>
          <h2 className="text-base font-bold text-[var(--text)] mb-1">
            Course Not Found
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-5">
            We couldn't load this course. It may have been deleted.
          </p>
          <button
            onClick={() => router.back()}
            className="w-full py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-soft)] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-1.5 text-xs mb-6 text-[var(--text-muted)]">
            <Link
              href="/dashboard/teacher"
              className="hover:text-indigo-600 transition-colors"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-semibold text-[var(--text)]">
              Edit Course
            </span>
          </nav>
          <h1 className="text-3xl font-bold text-[var(--text)] tracking-tight">
            Edit Course
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Update the details below and save your changes.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* ── Course Details ── */}
          <section className="bg-[var(--bg-card)] rounded-2xl p-7 border border-[var(--border)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center">
                <BookOpen size={17} className="text-primary" />
              </div>
              <h2 className="text-base font-bold text-[var(--text)]">
                Course Details
              </h2>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className={labelCls}>
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Introduction to Spring Boot"
                  className={inputCls}
                />
              </div>

              {/* Description */}
              <div>
                <label className={labelCls}>
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="What will students learn? Who is this course for?"
                  rows={4}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Category */}
              <div>
                <label className={labelCls}>
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  className={`${inputCls} cursor-pointer`}
                >
                  <option value="">Select a category…</option>
                  {categories.map((c: any) => (
                    <option
                      key={c.id}
                      value={String(c.id)}
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className={labelCls}>Price (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-sm">
                    $
                  </span>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="29.99"
                    className={`${inputCls} pl-8`}
                  />
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Set to 0 for a free course.
                </p>
              </div>

              {/* isPublished toggle */}
              <div className="flex items-center justify-between rounded-xl px-4 py-3 bg-[var(--bg-soft)] border border-[var(--border)]">
                <div>
                  <p className="text-sm font-semibold text-[var(--text)]">
                    Published
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Students can find and enroll in this course.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={form.isPublished}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary/20
                    rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                    after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                  />
                </label>
              </div>

              {/* Thumbnail */}
              <div>
                <label className={labelCls}>Thumbnail</label>
                <div className="flex gap-4 items-start">
                  <div className="w-36 h-24 rounded-xl overflow-hidden bg-primary/5 border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                    {uploading ? (
                      <Loader2
                        size={20}
                        className="text-primary animate-spin"
                      />
                    ) : thumbPreview ? (
                      <img
                        src={thumbPreview}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImagePlus
                        size={22}
                        className="text-[var(--text-muted)]"
                      />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading}
                      className="w-full border-2 border-dashed border-[var(--border)]
                        hover:border-primary/40 hover:bg-primary/5 rounded-xl py-2.5 text-xs font-bold
                        text-[var(--text-muted)] hover:text-primary transition-all
                        flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <ImagePlus size={13} />
                      {uploading ? "Uploading…" : "Replace Image"}
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleThumbFile(f);
                      }}
                    />
                    {form.thumbnail && !uploading && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200">
                        <span className="text-xs text-emerald-600 flex-1 min-w-0 truncate">
                          {form.thumbnail}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setThumbPreview("");
                            setForm((p) => ({ ...p, thumbnail: "" }));
                            if (fileRef.current) fileRef.current.value = "";
                          }}
                          className="text-emerald-500 hover:text-red-500 transition-colors"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className={labelCls}>
                  <span className="inline-flex items-center gap-1.5">
                    <Tag size={11} /> Tags
                  </span>
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {filteredSuggestions.map((tag) => {
                    const selected = form.tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold border transition-all
                          ${
                            selected
                              ? "bg-primary text-white border-primary"
                              : "bg-[var(--bg-soft)] border-[var(--border)] text-[var(--text-muted)] hover:border-primary/40 hover:text-primary"
                          }`}
                      >
                        {selected && <Check size={10} />}
                        {tag}
                      </button>
                    );
                  })}
                </div>
                <div
                  className="flex flex-wrap gap-2 items-center min-h-[48px] px-3 py-2 rounded-xl
                    border border-[var(--border)] bg-[var(--bg-soft)] cursor-text
                    focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all"
                >
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg
                        bg-primary/8 border border-primary/20 text-primary text-xs font-semibold"
                    >
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}>
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        addTag();
                      }
                      if (
                        e.key === "Backspace" &&
                        !tagInput &&
                        form.tags.length
                      )
                        removeTag(form.tags[form.tags.length - 1]);
                    }}
                    onBlur={() => addTag()}
                    placeholder={
                      form.tags.length === 0
                        ? "Type a custom tag and press Enter…"
                        : "Add more…"
                    }
                    className="flex-1 min-w-[180px] bg-transparent text-sm outline-none text-[var(--text)] placeholder:text-[var(--text-muted)]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── Lessons ── */}
          <section className="bg-[var(--bg-card)] rounded-2xl p-7 border border-[var(--border)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center">
                  <Video size={17} className="text-primary" />
                </div>
                <h2 className="text-base font-bold text-[var(--text)]">
                  Lessons
                  <span className="ml-2 text-xs font-normal text-[var(--text-muted)]">
                    ({form.lessons.length}{" "}
                    {form.lessons.length === 1 ? "lesson" : "lessons"})
                  </span>
                </h2>
              </div>
              <button
                type="button"
                onClick={addLesson}
                className="inline-flex items-center gap-1.5 text-xs font-semibold
                  text-primary border border-primary/20 bg-primary/8
                  hover:bg-primary/15 px-3 py-1.5 rounded-lg transition-all"
              >
                <Plus size={13} /> Add Lesson
              </button>
            </div>

            <div className="space-y-4">
              {form.lessons.map((lesson, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 bg-[var(--bg-soft)] border border-[var(--border)] group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                      Lesson {i + 1}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {[
                        {
                          fn: () => moveLesson(i, -1),
                          disabled: i === 0,
                          icon: <ChevronUp size={13} />,
                        },
                        {
                          fn: () => moveLesson(i, 1),
                          disabled: i === form.lessons.length - 1,
                          icon: <ChevronDown size={13} />,
                        },
                        {
                          fn: () => removeLesson(i),
                          disabled: form.lessons.length === 1,
                          icon: <X size={13} />,
                          danger: true,
                        },
                      ].map(({ fn, disabled, icon, danger }, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={fn}
                          disabled={disabled}
                          className={`w-7 h-7 rounded-lg border border-[var(--border)] bg-[var(--bg-card)]
                            flex items-center justify-center text-[var(--text-muted)] transition-all disabled:opacity-30
                            ${danger ? "hover:text-red-500" : "hover:text-primary"}`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className={labelCls}>Lesson Title</label>
                      <input
                        value={lesson.title}
                        onChange={(e) =>
                          updateLesson(i, "title", e.target.value)
                        }
                        placeholder="e.g. Setting Up Spring Boot"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Video URL</label>
                      <input
                        value={lesson.video_url}
                        onChange={(e) =>
                          updateLesson(i, "video_url", e.target.value)
                        }
                        placeholder="https://youtu.be/..."
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Description</label>
                      <textarea
                        value={lesson.description}
                        onChange={(e) =>
                          updateLesson(i, "description", e.target.value)
                        }
                        placeholder="What does this lesson cover?"
                        rows={2}
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addLesson}
              className="w-full mt-4 border-2 border-dashed border-[var(--border)]
                hover:border-primary/40 hover:bg-primary/5 rounded-xl py-3 text-sm
                text-[var(--text-muted)] hover:text-primary transition-all
                flex items-center justify-center gap-2 font-medium"
            >
              <Plus size={15} /> Add another lesson
            </button>
          </section>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pb-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3.5 rounded-xl text-sm font-medium
                bg-[var(--bg-card)] border border-[var(--border)]
                text-[var(--text-muted)] hover:text-[var(--text)] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating || uploading || saved}
              className={`flex-1 flex items-center justify-center gap-2
                text-white font-semibold text-sm rounded-xl py-3.5 transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
                ${saved ? "bg-emerald-500" : "bg-primary hover:bg-primary/90"}`}
            >
              {isUpdating ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Saving…
                </>
              ) : saved ? (
                <>
                  <Check size={16} /> Saved!
                </>
              ) : (
                <>
                  Save Changes <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
