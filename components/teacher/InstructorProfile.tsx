"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { baseApi } from "@/store/services/baseApi";
import { useGetUserInfoQuery, UserInfo } from "@/store/features/users/userSlice";
import { useGetMyCoursesQuery } from "@/store/services/courseApi";
import { useGetTeacherStatsQuery } from "@/store/services/enrollmentApi";

// ─── constants ────────────────────────────────────────────────────────────────
const CLOUDINARY_CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const CLOUDINARY_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

// ─── payload types ────────────────────────────────────────────────────────────
export type UpdateProfilePayload = {
  firstName: string;
  lastName: string;
  gender: string;
  bio: string;
  imageUrl?: string;
  bgImageUrl?: string;
};

// ─── extend API ───────────────────────────────────────────────────────────────
const extendedApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    updateProfile: builder.mutation<UserInfo, UpdateProfilePayload>({
      query: (body) => ({ url: "/users/me", method: "PATCH", body }),
      invalidatesTags: ["User"],
    }),
  }),
});

const { useUpdateProfileMutation } = extendedApi;

// ─── types ────────────────────────────────────────────────────────────────────
type ProfileForm = {
  firstName: string;
  lastName: string;
  gender: string;
};

const EMPTY_FORM: ProfileForm = {
  firstName: "",
  lastName: "",
  gender: "male",
};

const BIO_MAX = 400;

// ─── cloudinary helper ────────────────────────────────────────────────────────
const uploadToCloudinary = async (file: File, folder: string): Promise<string> => {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", CLOUDINARY_PRESET);
  fd.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
    { method: "POST", body: fd }
  );
  if (!res.ok) throw new Error("Cloudinary upload failed");
  const data = await res.json();
  return data.secure_url as string;
};

// ─── icons ────────────────────────────────────────────────────────────────────
const CameraIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z" />
    <path d="M9 3L7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ImageIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" />
  </svg>
);

// ─── sub-components ───────────────────────────────────────────────────────────
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 mb-4">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
        {title}
      </p>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full text-sm px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-gray-950 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all";

// ─── skeleton ─────────────────────────────────────────────────────────────────
function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-lg ${className}`} />;
}

function ProfileSkeleton() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
      <Skeleton className="w-full h-36 rounded-xl" />
      <div className="flex items-end gap-4 px-2 mt-[-40px] relative z-10">
        <Skeleton className="w-24 h-24 !rounded-full" />
        <div className="flex-1 space-y-2 pb-1">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
      </div>
      <Skeleton className="h-48 rounded-xl" />
      <Skeleton className="h-40 rounded-xl" />
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────
export default function InstructorProfile() {

  // 1. Fetch real courses created by the instructor
  const { data: coursesData, isLoading: coursesLoading } = useGetMyCoursesQuery();
  
  // 2. Fetch real enrollment count (Teacher Stats)
  const { data: teacherStats, isLoading: statsLoading } = useGetTeacherStatsQuery();

  // ── Logic ────────────────────────────────────────────────────────────────
  
  // Handle if your API returns a raw array or a { content: [] } object
  const coursesList = Array.isArray(coursesData) 
    ? coursesData 
    : (coursesData as any)?.content ?? [];

  const totalCourses = coursesList.length;
  const totalStudents = teacherStats?.totalEnrollments ?? 0;

  const stats = [
    { 
      val: totalCourses.toString(), 
      lbl: "Courses" 
    },
    { 
      val: totalStudents >= 1000 
        ? `${(totalStudents / 1000).toFixed(1)}k` 
        : totalStudents.toString(), 
      lbl: "Students" 
    },
    
  ];

  // ── queries & mutations ──────────────────────────────────────────────────
  const { data: user, isLoading, isError } = useGetUserInfoQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();

  // ── upload loading states ─────────────────────────────────────────────────
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingBg, setIsUploadingBg] = useState(false);

  // ── local state ──────────────────────────────────────────────────────────
  const [form, setForm] = useState<ProfileForm>(EMPTY_FORM);
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [bgPreview, setBgPreview] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");

  const fileRef = useRef<HTMLInputElement>(null);
  const bgRef = useRef<HTMLInputElement>(null);

  // ── seed form once user data arrives ────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
    });
    setBio(user.bio ?? "");
  }, [user]);

  // ── derived ──────────────────────────────────────────────────────────────
  const initials = ((form.firstName[0] || "") + (form.lastName[0] || "")).toUpperCase() || "IN";
  const fullName = `${form.firstName} ${form.lastName}`.trim() || "Instructor";
  const avatarSrc = avatarPreview ?? user?.imageUrl ?? null;
  const bgSrc = bgPreview ?? user?.bgImageUrl ?? null;

  // ── helpers ──────────────────────────────────────────────────────────────
  const set = <K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) =>
    setForm((p) => ({ ...p, [key]: value }));

  // ── tag helpers ──────────────────────────────────────────────────────────
  const addTag = () => {
    const val = tagInput.trim().replace(",", "");
    if (val && !tags.includes(val)) setTags((p) => [...p, val]);
    setTagInput("");
  };
  const removeTag = (tag: string) => setTags((p) => p.filter((t) => t !== tag));
  const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); }
    if (e.key === "Backspace" && !tagInput && tags.length) setTags((p) => p.slice(0, -1));
  };

  // ── avatar upload ─────────────────────────────────────────────────────────
  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    setIsUploadingAvatar(true);
    try {
      const url = await uploadToCloudinary(file, "coursify/avatars");
      await updateProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        gender: form.gender,
        bio,
        imageUrl: url,
      }).unwrap();
    } catch {
      setAvatarPreview(null);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // ── bg upload ─────────────────────────────────────────────────────────────
  const handleBgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBgPreview(URL.createObjectURL(file));
    setIsUploadingBg(true);
    try {
      const url = await uploadToCloudinary(file, "coursify/backgrounds");
      await updateProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        gender: form.gender,
        bio,
        bgImageUrl: url,
      }).unwrap();
    } catch {
      setBgPreview(null);
    } finally {
      setIsUploadingBg(false);
    }
  };

  // ── save profile ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    try {
      await updateProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        gender: form.gender,
        bio,
      }).unwrap();
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    } finally {
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  // ── discard ───────────────────────────────────────────────────────────────
  const handleDiscard = () => {
    if (!user) return;
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
    });
    setBio(user.bio ?? "");
    setAvatarPreview(null);
    setBgPreview(null);
    setTags([]);
    setTagInput("");
  };

  const isBusy = isSaving || isUploadingAvatar || isUploadingBg;

  // ── loading / error ───────────────────────────────────────────────────────
  if (isLoading) return <ProfileSkeleton />;

  if (isError || !user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          Failed to load profile. Please refresh the page.
        </p>
      </div>
    );
  }

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 font-sans">
      
      {/* ── bg banner ── */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 border border-neutral-200 dark:border-neutral-800 group/banner">
        {bgSrc && (
          <>
            <img src={bgSrc} alt="Profile background" className="w-full h-full object-cover" />
            <button
                type="button"
                onClick={async () => {
                    setBgPreview(null);
                    await updateProfile({
                        firstName: form.firstName,
                        lastName: form.lastName,
                        gender: form.gender,
                        bio,
                        bgImageUrl: "", // your "remove" logic
                    });
                }}
                className="cursor-pointer absolute top-2.5 right-2.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-500/80 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover/banner:opacity-100 transition-opacity z-20"
            >
                Remove
            </button>
          </>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        
        <button
          type="button"
          onClick={() => bgRef.current?.click()}
          disabled={isUploadingBg}
          className="cursor-pointer absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white/50 z-20"
          aria-label="Change background photo"
        >
          <ImageIcon />
          {isUploadingBg ? "Uploading…" : "Edit cover"}
        </button>
      </div>

      {/* ── bg file input ── */}
      <input
        ref={bgRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBgChange}
      />

      {/* ── avatar + name ── */}
      <div className="flex items-end gap-4 px-2 mt-[-30px] mb-6 relative z-10">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={isUploadingAvatar}
          className="cursor-pointer relative w-35 h-35 rounded-full border-4 border-white dark:border-gray-950 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl font-semibold shrink-0 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 shadow-md"
          aria-label="Change profile photo"
        >
          {avatarSrc ? (
            <img src={avatarSrc} alt={fullName} className="w-full h-full object-cover" />
          ) : (
            <span>{initials}</span>
          )}
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white rounded-full">
            {isUploadingAvatar
              ? <span className="text-xs font-medium">Uploading…</span>
              : <CameraIcon />}
          </div>
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />

        <div className="flex-1 min-w-0 pb-1">
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 truncate">
            {fullName}
          </h1>
          <p className="text-sm text-neutral-400 dark:text-neutral-500 truncate mb-1.5">
            @{user.username}
          </p>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
            <CheckIcon />
            {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {stats.map(({ val, lbl }) => (
          <div
            key={lbl}
            className="bg-neutral-50 dark:bg-gray-950 rounded-xl p-3 text-center border border-neutral-100 dark:border-neutral-800 transition-all hover:border-blue-200 dark:hover:border-blue-900"
          >
            <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              {val}
            </p>
            <p className="text-[11px] text-neutral-400 mt-0.5">{lbl}</p>
          </div>
        ))}
      </div>

      {/* ── stats row ── */}
      {/* <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { val: "12", lbl: "Courses" },
          { val: "1.4k", lbl: "Students" },
          { val: "4.8", lbl: "Rating" },
        ].map(({ val, lbl }) => (
          <div
            key={lbl}
            className="bg-neutral-50 dark:bg-gray-950 rounded-xl p-3 text-center border border-neutral-100 dark:border-neutral-800"
          >
            <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{val}</p>
            <p className="text-[11px] text-neutral-400 mt-0.5">{lbl}</p>
          </div>
        ))}
      </div> */}

      {/* ── basic information ── */}
      <SectionCard title="Basic information">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-50 dark:bg-gray-950 border border-neutral-200 dark:border-neutral-700 mb-4">
          <span className="text-xs text-neutral-400">Member since</span>
          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300 ml-auto">
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <Field label="First name">
            <input
              type="text"
              className={inputCls}
              value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)}
            />
          </Field>
          <Field label="Last name">
            <input
              type="text"
              className={inputCls}
              value={form.lastName}
              onChange={(e) => set("lastName", e.target.value)}
            />
          </Field>
        </div>

        <div className="mb-3">
          <Field label="Email">
            <input
              type="email"
              className={`${inputCls} opacity-60 cursor-not-allowed`}
              value={user.email}
              readOnly
              title="Contact support to change your email"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Gender">
            <select
              className={inputCls}
              value={form.gender}
              onChange={(e) => set("gender", e.target.value)}
            >
              {["male", "female", "other"].map((g) => (
                <option key={g} value={g}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Username">
            <input
              type="text"
              className={`${inputCls} opacity-60 cursor-not-allowed`}
              value={user.username}
              readOnly
              title="Username cannot be changed"
            />
          </Field>
        </div>
      </SectionCard>

      {/* ── about ── */}
      <SectionCard title="About">
        <Field label="Bio">
          <textarea
            className={`${inputCls} resize-y min-h-[90px] leading-relaxed`}
            maxLength={BIO_MAX}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell students about yourself…"
          />
          <p className="text-[11px] text-neutral-400 text-right -mt-1">
            {bio.length} / {BIO_MAX}
          </p>
        </Field>

        <div className="mt-3">
          <Field label="Expertise tags">
            <div
              className="flex flex-wrap gap-2 px-3 py-2 min-h-[42px] rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-gray-950 cursor-text focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-400 transition-all"
              onClick={() => document.getElementById("tagInput")?.focus()}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
                    className="text-blue-400 hover:text-blue-700 dark:hover:text-blue-200 leading-none focus:outline-none"
                    aria-label={`Remove ${tag}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                id="tagInput"
                className="flex-1 min-w-[80px] bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none"
                placeholder="Add tag…"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKey}
                onBlur={addTag}
              />
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">Press Enter or comma to add</p>
          </Field>
        </div>
      </SectionCard>

      {/* ── save status ── */}
      {saveStatus === "saved" && (
        <div className="mb-4 px-4 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm">
          Profile saved successfully.
        </div>
      )}
      {saveStatus === "error" && (
        <div className="mb-4 px-4 py-2.5 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
          Failed to save. Please try again.
        </div>
      )}

      {/* ── actions ── */}
      <div className="flex justify-end gap-3 mt-2">
        <button
          type="button"
          onClick={handleDiscard}
          disabled={isBusy}
          className="px-5 py-2 text-sm font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 transition-colors"
        >
          Discard
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isBusy}
          className="px-5 py-2 text-sm font-medium rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors min-w-[120px]"
        >
          {isSaving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}