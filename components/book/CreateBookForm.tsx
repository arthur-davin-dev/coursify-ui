"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCreateBookMutation, useUpdateBookMutation } from "@/store/services/bookApi";
import { useGetCategoriesQuery } from "@/store/features/categories/categoriesApi";
import { toast } from "sonner";
import {
  BookMarked, Paperclip, ImageIcon, ChevronDown,
  CheckCircle2, ChevronRight, Loader2, ArrowRight, Circle, FileText,
} from "lucide-react";

const MAX_THUMBNAIL_MB = 5;
const MAX_THUMB_BYTES  = MAX_THUMBNAIL_MB * 1024 * 1024;
const MAX_PDF_MB       = 50;
const MAX_PDF_BYTES    = MAX_PDF_MB * 1024 * 1024;

const inputCls = "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";
const inputStyle = { background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text)" };
const labelCls = "block text-xs font-bold uppercase tracking-widest mb-2";
const sectionStyle = { background: "var(--bg-card)", border: "1px solid var(--border)" };

const formatBytes = (bytes: number) => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-5">
    <label className={labelCls} style={{ color: "var(--text-muted)" }}>{label}</label>
    {children}
  </div>
);

// ── Category Dropdown ──────────────────────────────────────────────────────────
const CustomDropdown = ({
  options, placeholder, value, onChange,
}: {
  options: { value: number; label: string }[];
  placeholder: string;
  value: number | "";
  onChange: (v: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value) || null;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${inputCls} flex items-center justify-between`}
        style={inputStyle}
      >
        <span style={{ color: selected ? "var(--text)" : "var(--text-muted)" }}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={15} style={{ color: "var(--text-muted)" }}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute z-20 w-full mt-2 rounded-xl shadow-lg max-h-60 overflow-y-auto"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          {options.map((opt) => (
            <div key={opt.value}
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                value === opt.value ? "bg-indigo-50 text-indigo-600 font-semibold" : "hover:bg-indigo-50/20"
              }`}
              style={value === opt.value ? {} : { color: "var(--text-muted)" }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Thumbnail Upload ───────────────────────────────────────────────────────────
const ThumbnailUpload = ({ file, onFileSelect }: {
  file: File | { url: string } | null;
  onFileSelect: (f: File) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const validate = (f: File) => {
    if (!f.type.startsWith("image/")) { toast.error("Only image files allowed!"); return false; }
    if (f.size > MAX_THUMB_BYTES) { toast.error(`Max ${MAX_THUMBNAIL_MB}MB`); return false; }
    return true;
  };

  const fileName = file instanceof File ? file.name : file?.url?.split("/").pop();

  return (
    <FormField label={`Cover Thumbnail * (max ${MAX_THUMBNAIL_MB}MB)`}>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault(); setDragging(false);
          const f = e.dataTransfer.files[0];
          if (f && validate(f)) onFileSelect(f);
        }}
        className="h-[140px] rounded-xl flex flex-col items-center justify-center cursor-pointer border-2 border-dashed transition-all duration-300"
        style={file ? { borderColor: "#34d399", background: "rgba(16,185,129,0.08)" }
          : dragging ? { borderColor: "#6366f1", background: "rgba(99,102,241,0.06)" }
          : { borderColor: "var(--border)", background: "var(--bg-soft)" }}
      >
        {file ? (
          <div className="text-center space-y-1.5">
            <CheckCircle2 size={28} className="text-emerald-500 mx-auto" />
            <p className="text-emerald-600 text-xs font-bold">Ready!</p>
            <p className="text-[11px] truncate max-w-[200px] mx-auto" style={{ color: "var(--text-muted)" }}>
              {fileName}
            </p>
          </div>
        ) : (
          <div className="text-center space-y-2 flex flex-col items-center">
            <ImageIcon size={28} style={{ color: "var(--border)" }} />
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Drag & drop or <span className="text-indigo-500 underline font-medium">browse</span>
            </p>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f && validate(f)) onFileSelect(f); e.target.value = ""; }} />
      </div>
    </FormField>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
export default function CreateBookForm({ bookId }: { bookId?: number }) {
  const router = useRouter();
  const [createBook, { isLoading }] = useCreateBookMutation();
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const { data: categoriesData, isLoading: catLoading } = useGetCategoriesQuery();

  const categories = (categoriesData ?? []).map((c) => ({ value: c.id, label: c.name }));

  const [title, setTitle]               = useState("");
  const [description, setDescription]   = useState("");
  const [categoryId, setCategoryId]     = useState<number | "">("");
  const [fileUrl, setFileUrl]           = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | { url: string } | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isUploading, setIsUploading]   = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  // ── Upload thumbnail to your backend files endpoint ──────────────────────────
  const uploadThumbnail = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const token =
    localStorage.getItem("user_token") ??
    localStorage.getItem("token") ??
    localStorage.getItem("accessToken");

  const res = await fetch("/api/files/upload", {
    method: "POST",
    headers: {
      // ✅ Send token — do NOT set Content-Type (FormData sets it automatically)
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
      body: formData,
    });

    if (!res.ok) throw new Error("Thumbnail upload failed");
    const data = await res.json();
    return data.url ?? data.file_url ?? data.secure_url ?? "";
  };

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim())       return toast.error("Title is required.");
    if (!description.trim()) return toast.error("Description is required.");
    if (!categoryId)         return toast.error("Please select a category.");
    if (!fileUrl.trim())     return toast.error("PDF URL is required.");
    if (!thumbnailFile)      return toast.error("Cover thumbnail is required.");

    try {
      setIsUploading(true);

      // Upload thumbnail if it's a new file
      let finalThumbnail = thumbnailUrl;
      if (thumbnailFile instanceof File) {
        setUploadProgress("Uploading cover image…");
        finalThumbnail = await uploadThumbnail(thumbnailFile);
        setThumbnailUrl(finalThumbnail);
      }

      setIsUploading(false);
      setUploadProgress("");

      const payload = {
        title: title.trim(),
        description: description.trim(),
        file_url: fileUrl.trim(),
        thumbnail: finalThumbnail,
        category_ids: [categoryId as number],
      };

      if (bookId) {
        await updateBook({ id: bookId, ...payload }).unwrap();
        toast.success("Book updated!");
      } else {
        await createBook(payload).unwrap();
        toast.success("Book published!");
      }

      router.push("/library");
    } catch (err: any) {
      setIsUploading(false);
      setUploadProgress("");
      const msg = err?.data?.message || err?.data?.detail || "Failed to save book.";
      toast.error(msg);
    }
  };

  const busy = isLoading || isUpdating || isUploading;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-3xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
          <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
          <ChevronRight size={13} style={{ color: "var(--border)" }} />
          <Link href="/library" className="hover:text-indigo-600 transition-colors">Library</Link>
          <ChevronRight size={13} style={{ color: "var(--border)" }} />
          <span className="font-semibold" style={{ color: "var(--text)" }}>
            {bookId ? "Edit Book" : "Add Book"}
          </span>
        </nav>

        {/* Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
            <Circle size={6} className="fill-indigo-500 text-indigo-500" />
            {bookId ? "Edit Book" : "New Book"}
          </div>
          <h1 className="text-2xl font-black" style={{ color: "var(--text)" }}>
            {bookId ? "Update your " : "Publish a "}
            <span className="text-indigo-600">Book</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* Book Details */}
          <section className="rounded-2xl p-7 shadow-sm" style={sectionStyle}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <BookMarked size={18} className="text-indigo-500" />
              </div>
              <h2 className="text-base font-bold" style={{ color: "var(--text)" }}>Book Details</h2>
            </div>
            <div className="space-y-5">
              <FormField label="Title *">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter book title" className={inputCls} style={inputStyle} />
              </FormField>
              <FormField label="Description *">
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is this book about?" rows={4}
                  className={`${inputCls} resize-none`} style={inputStyle} />
              </FormField>
              <FormField label="Category *">
                <CustomDropdown
                  options={categories}
                  placeholder={catLoading ? "Loading…" : "Select a category"}
                  value={categoryId}
                  onChange={setCategoryId}
                />
              </FormField>
            </div>
          </section>

          {/* Files */}
          <section className="rounded-2xl p-7 shadow-sm" style={sectionStyle}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
                <Paperclip size={18} className="text-purple-500" />
              </div>
              <h2 className="text-base font-bold" style={{ color: "var(--text)" }}>
                Files
                {isUploading && (
                  <span className="ml-3 inline-flex items-center gap-1.5 text-xs text-indigo-500 font-normal">
                    <Loader2 size={12} className="animate-spin" />
                    {uploadProgress}
                  </span>
                )}
              </h2>
            </div>
            <div className="space-y-5">
              <FormField label="Book PDF URL *">
                <input type="url" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)}
                  placeholder="http://localhost:8080/api/files/general/your-file.pdf"
                  className={inputCls} style={inputStyle} />
                <p className="text-[11px] mt-1.5" style={{ color: "var(--text-muted)" }}>
                  Paste the direct PDF URL from your file server.
                </p>
              </FormField>
              <ThumbnailUpload file={thumbnailFile} onFileSelect={setThumbnailFile} />
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pb-4">
            <button type="button" onClick={() => router.back()}
              className="px-6 py-3.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
              Cancel
            </button>
            <button type="submit" disabled={busy}
              className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all">
              {busy ? (
                <><Loader2 size={15} className="animate-spin" />{uploadProgress || "Saving…"}</>
              ) : (
                <>{bookId ? "Update Book" : "Publish Book"}<ArrowRight size={15} /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}