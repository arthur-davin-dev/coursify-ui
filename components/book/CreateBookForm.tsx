// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useCreateBookMutation, useUpdateBookMutation } from "@/store/services/bookApi";
// import { useGetCategoriesQuery } from "@/store/features/categories/categoriesApi";
// import { toast } from "sonner";
// import {
//   BookMarked, Paperclip, ImageIcon, ChevronDown,
//   CheckCircle2, ChevronRight, Loader2, ArrowRight, Circle, FileText, X,
// } from "lucide-react";

// const MAX_THUMBNAIL_MB = 5;
// const MAX_THUMB_BYTES  = MAX_THUMBNAIL_MB * 1024 * 1024;
// const MAX_PDF_MB       = 50;
// const MAX_PDF_BYTES    = MAX_PDF_MB * 1024 * 1024;

// const inputCls = "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";
// const inputStyle = { background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text)" };
// const labelCls = "block text-xs font-bold uppercase tracking-widest mb-2";
// const sectionStyle = { background: "var(--bg-card)", border: "1px solid var(--border)" };

// const formatBytes = (bytes: number) => {
//   if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
//   return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
// };

// const getToken = () =>
//   localStorage.getItem("user_token") ??
//   localStorage.getItem("token") ??
//   localStorage.getItem("accessToken") ??
//   "";

// const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
//   <div className="mb-5">
//     <label className={labelCls} style={{ color: "var(--text-muted)" }}>{label}</label>
//     {children}
//   </div>
// );

// // ── Category Dropdown ──────────────────────────────────────────────────────────
// const CustomDropdown = ({
//   options, placeholder, value, onChange,
// }: {
//   options: { value: number; label: string }[];
//   placeholder: string;
//   value: number | "";
//   onChange: (v: number) => void;
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);
//   const selected = options.find((o) => o.value === value) || null;

//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   return (
//     <div className="relative" ref={ref}>
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className={`${inputCls} flex items-center justify-between`}
//         style={inputStyle}
//       >
//         <span style={{ color: selected ? "var(--text)" : "var(--text-muted)" }}>
//           {selected ? selected.label : placeholder}
//         </span>
//         <ChevronDown size={15} style={{ color: "var(--text-muted)" }}
//           className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
//       </button>
//       {isOpen && (
//         <div className="absolute z-20 w-full mt-2 rounded-xl shadow-lg max-h-60 overflow-y-auto"
//           style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
//           {options.map((opt) => (
//             <div key={opt.value}
//               onClick={() => { onChange(opt.value); setIsOpen(false); }}
//               className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
//                 value === opt.value ? "bg-indigo-50 text-indigo-600 font-semibold" : "hover:bg-indigo-50/20"
//               }`}
//               style={value === opt.value ? {} : { color: "var(--text-muted)" }}
//             >
//               {opt.label}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ── Upload Area (reusable) ─────────────────────────────────────────────────────
// const UploadArea = ({
//   file, onFileSelect, onClear, accept, maxBytes, maxLabel, icon, label,
// }: {
//   file: File | null;
//   onFileSelect: (f: File) => void;
//   onClear: () => void;
//   accept: string;
//   maxBytes: number;
//   maxLabel: string;
//   icon: React.ReactNode;
//   label: string;
// }) => {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [dragging, setDragging] = useState(false);

//   const validate = (f: File) => {
//     if (accept === "application/pdf" && f.type !== "application/pdf") {
//       toast.error("Only PDF files allowed!"); return false;
//     }
//     if (accept === "image/*" && !f.type.startsWith("image/")) {
//       toast.error("Only image files allowed!"); return false;
//     }
//     if (f.size > maxBytes) {
//       toast.error(`Max size is ${maxLabel}. Your file is ${formatBytes(f.size)}.`);
//       return false;
//     }
//     return true;
//   };

//   const handleFile = (f: File) => { if (validate(f)) onFileSelect(f); };

//   return (
//     <FormField label={label}>
//       {file ? (
//         // ── File selected state ──────────────────────────────────────────────
//         <div className="flex items-center gap-4 p-4 rounded-xl border-2"
//           style={{ borderColor: "#34d399", background: "rgba(16,185,129,0.06)" }}>
//           <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
//             <CheckCircle2 size={20} className="text-emerald-500" />
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-semibold text-emerald-700 truncate">{file.name}</p>
//             <p className="text-xs text-emerald-500 mt-0.5">{formatBytes(file.size)}</p>
//           </div>
//           <div className="flex items-center gap-2 flex-shrink-0">
//             <button
//               type="button"
//               onClick={() => inputRef.current?.click()}
//               className="text-xs text-indigo-500 hover:text-indigo-700 font-medium underline underline-offset-2 transition-colors"
//             >
//               Change
//             </button>
//             <button
//               type="button"
//               onClick={onClear}
//               className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
//             >
//               <X size={14} />
//             </button>
//           </div>
//           <input ref={inputRef} type="file" accept={accept} className="hidden"
//             onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
//         </div>
//       ) : (
//         // ── Empty drop zone ──────────────────────────────────────────────────
//         <div
//           onClick={() => inputRef.current?.click()}
//           onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
//           onDragLeave={() => setDragging(false)}
//           onDrop={(e) => {
//             e.preventDefault(); setDragging(false);
//             const f = e.dataTransfer.files[0];
//             if (f) handleFile(f);
//           }}
//           className="h-[140px] rounded-xl flex flex-col items-center justify-center cursor-pointer border-2 border-dashed transition-all duration-300"
//           style={dragging
//             ? { borderColor: "#6366f1", background: "rgba(99,102,241,0.06)" }
//             : { borderColor: "var(--border)", background: "var(--bg-soft)" }
//           }
//         >
//           <div className="text-center space-y-2 flex flex-col items-center">
//             <div style={{ color: "var(--border)" }}>{icon}</div>
//             <p className="text-xs" style={{ color: "var(--text-muted)" }}>
//               Drag & drop or{" "}
//               <span className="text-indigo-500 underline underline-offset-2 font-medium">browse</span>
//             </p>
//             <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--border)" }}>
//               {accept === "application/pdf" ? "PDF only" : "JPG, PNG, WEBP"} · max {maxLabel}
//             </p>
//           </div>
//           <input ref={inputRef} type="file" accept={accept} className="hidden"
//             onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
//         </div>
//       )}
//     </FormField>
//   );
// };

// // ── Upload progress bar ────────────────────────────────────────────────────────
// const ProgressBar = ({ pct, label }: { pct: number; label: string }) => (
//   <div className="mt-3 space-y-1.5">
//     <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
//       <span>{label}</span>
//       <span>{pct}%</span>
//     </div>
//     <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
//       <div
//         className="h-full bg-indigo-500 transition-all duration-300 rounded-full"
//         style={{ width: `${pct}%` }}
//       />
//     </div>
//   </div>
// );

// // ── Upload file to backend ─────────────────────────────────────────────────────
// async function uploadFile(file: File, onProgress?: (pct: number) => void): Promise<string> {
//   const token = getToken();
//   const formData = new FormData();
//   formData.append("file", file);

//   // Use XHR for real progress tracking
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();

//     xhr.upload.onprogress = (e) => {
//       if (e.lengthComputable && onProgress) {
//         onProgress(Math.round((e.loaded / e.total) * 100));
//       }
//     };

//     xhr.onload = () => {
//       if (xhr.status >= 200 && xhr.status < 300) {
//         try {
//           const data = JSON.parse(xhr.responseText);
//           const url = data.url ?? data.file_url ?? data.secure_url ?? "";
//           if (!url) reject(new Error("No URL in upload response"));
//           else resolve(url);
//         } catch {
//           reject(new Error("Invalid response from upload"));
//         }
//       } else {
//         reject(new Error(`Upload failed with status ${xhr.status}`));
//       }
//     };

//     xhr.onerror = () => reject(new Error("Upload network error"));

//     xhr.open("POST", "/api/files/upload");
//     if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);
//     xhr.send(formData);
//   });
// }

// // ── Main Component ─────────────────────────────────────────────────────────────
// export default function CreateBookForm({ bookId }: { bookId?: number }) {
//   const router = useRouter();
//   const [createBook, { isLoading }]         = useCreateBookMutation();
//   const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
//   const { data: categoriesData, isLoading: catLoading } = useGetCategoriesQuery();

//   const categories = (categoriesData ?? []).map((c) => ({ value: c.id, label: c.name }));

//   const [title, setTitle]             = useState("");
//   const [description, setDescription] = useState("");
//   const [categoryId, setCategoryId]   = useState<number | "">("");
//   const [pdfFile, setPdfFile]         = useState<File | null>(null);
//   const [thumbFile, setThumbFile]     = useState<File | null>(null);

//   const [pdfPct,   setPdfPct]   = useState(0);
//   const [thumbPct, setThumbPct] = useState(0);
//   const [step, setStep]         = useState<"idle" | "uploading-pdf" | "uploading-thumb" | "saving">("idle");

//   const busy = isLoading || isUpdating || step !== "idle";

//   // ── Submit ───────────────────────────────────────────────────────────────────
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!title.trim())    return toast.error("Title is required.");
//     if (!description.trim()) return toast.error("Description is required.");
//     if (!categoryId)      return toast.error("Please select a category.");
//     if (!pdfFile)         return toast.error("Book PDF is required.");
//     if (!thumbFile)       return toast.error("Cover thumbnail is required.");

//     try {
//       // 1. Upload PDF
//       setStep("uploading-pdf");
//       setPdfPct(0);
//       const pdfUrl = await uploadFile(pdfFile, setPdfPct);

//       // 2. Upload thumbnail
//       setStep("uploading-thumb");
//       setThumbPct(0);
//       const thumbUrl = await uploadFile(thumbFile, setThumbPct);

//       // 3. Save book
//       setStep("saving");

//       const payload = {
//         title:        title.trim(),
//         description:  description.trim(),
//         file_url:     pdfUrl,
//         thumbnail:    thumbUrl,
//         category_ids: [categoryId as number],
//       };

//       if (bookId) {
//         await updateBook({ id: bookId, ...payload }).unwrap();
//         toast.success("Book updated!");
//       } else {
//         await createBook(payload).unwrap();
//         toast.success("Book published!");
//       }

//       router.push("/library");
//     } catch (err: any) {
//       const msg = err?.data?.message || err?.data?.detail || err?.message || "Failed to save book.";
//       toast.error(msg);
//     } finally {
//       setStep("idle");
//     }
//   };

//   const stepLabel = {
//     idle: "",
//     "uploading-pdf":   `Uploading PDF… ${pdfPct}%`,
//     "uploading-thumb": `Uploading thumbnail… ${thumbPct}%`,
//     saving:            "Saving book…",
//   }[step];

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: "var(--bg)" }}>
//       <div className="w-full max-w-3xl">

//         {/* Breadcrumb */}
//         <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
//           <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
//           <ChevronRight size={13} style={{ color: "var(--border)" }} />
//           <Link href="/library" className="hover:text-indigo-600 transition-colors">Library</Link>
//           <ChevronRight size={13} style={{ color: "var(--border)" }} />
//           <span className="font-semibold" style={{ color: "var(--text)" }}>
//             {bookId ? "Edit Book" : "Add Book"}
//           </span>
//         </nav>

//         {/* Heading */}
//         <div className="mb-8">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
//             <Circle size={6} className="fill-indigo-500 text-indigo-500" />
//             {bookId ? "Edit Book" : "New Book"}
//           </div>
//           <h1 className="text-2xl font-black" style={{ color: "var(--text)" }}>
//             {bookId ? "Update your " : "Publish a "}
//             <span className="text-indigo-600">Book</span>
//           </h1>
//           <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
//             Upload your PDF and cover image, fill in the details below.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} noValidate className="space-y-5">

//           {/* ── Book Details ── */}
//           <section className="rounded-2xl p-7 shadow-sm" style={sectionStyle}>
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
//                 <BookMarked size={18} className="text-indigo-500" />
//               </div>
//               <h2 className="text-base font-bold" style={{ color: "var(--text)" }}>Book Details</h2>
//             </div>

//             <div className="space-y-5">
//               <FormField label="Title *">
//                 <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
//                   placeholder="Enter book title" className={inputCls} style={inputStyle} />
//               </FormField>

//               <FormField label="Description *">
//                 <textarea value={description} onChange={(e) => setDescription(e.target.value)}
//                   placeholder="What is this book about?" rows={4}
//                   className={`${inputCls} resize-none`} style={inputStyle} />
//               </FormField>

//               <FormField label="Category *">
//                 <CustomDropdown
//                   options={categories}
//                   placeholder={catLoading ? "Loading…" : "Select a category"}
//                   value={categoryId}
//                   onChange={setCategoryId}
//                 />
//               </FormField>
//             </div>
//           </section>

//           {/* ── Files ── */}
//           <section className="rounded-2xl p-7 shadow-sm" style={sectionStyle}>
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
//                 <Paperclip size={18} className="text-purple-500" />
//               </div>
//               <h2 className="text-base font-bold" style={{ color: "var(--text)" }}>
//                 Files
//                 {step !== "idle" && (
//                   <span className="ml-3 inline-flex items-center gap-1.5 text-xs text-indigo-500 font-normal">
//                     <Loader2 size={12} className="animate-spin" />
//                     {stepLabel}
//                   </span>
//                 )}
//               </h2>
//             </div>

//             <div className="space-y-5">
//               {/* PDF Upload */}
//               <UploadArea
//                 label={`Book PDF * (max ${MAX_PDF_MB}MB)`}
//                 file={pdfFile}
//                 onFileSelect={setPdfFile}
//                 onClear={() => setPdfFile(null)}
//                 accept="application/pdf"
//                 maxBytes={MAX_PDF_BYTES}
//                 maxLabel={`${MAX_PDF_MB}MB`}
//                 icon={<FileText size={28} />}
//               />
//               {step === "uploading-pdf" && (
//                 <ProgressBar pct={pdfPct} label="Uploading PDF…" />
//               )}

//               {/* Thumbnail Upload */}
//               <UploadArea
//                 label={`Cover Thumbnail * (max ${MAX_THUMBNAIL_MB}MB)`}
//                 file={thumbFile}
//                 onFileSelect={setThumbFile}
//                 onClear={() => setThumbFile(null)}
//                 accept="image/*"
//                 maxBytes={MAX_THUMB_BYTES}
//                 maxLabel={`${MAX_THUMBNAIL_MB}MB`}
//                 icon={<ImageIcon size={28} />}
//               />
//               {step === "uploading-thumb" && (
//                 <ProgressBar pct={thumbPct} label="Uploading thumbnail…" />
//               )}

//               {/* Preview thumbnail if selected */}
//               {thumbFile && (
//                 <div className="rounded-xl overflow-hidden border"
//                   style={{ borderColor: "var(--border)", maxWidth: 200 }}>
//                   <img
//                     src={URL.createObjectURL(thumbFile)}
//                     alt="Thumbnail preview"
//                     className="w-full h-auto object-cover"
//                   />
//                 </div>
//               )}
//             </div>
//           </section>

//           {/* ── Actions ── */}
//           <div className="flex items-center justify-end gap-3 pb-4">
//             <button type="button" onClick={() => router.back()}
//               className="px-6 py-3.5 rounded-xl text-sm font-medium transition-all"
//               style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
//               Cancel
//             </button>
//             <button type="submit" disabled={busy}
//               className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200 active:translate-y-0">
//               {busy ? (
//                 <><Loader2 size={15} className="animate-spin" />{stepLabel || "Saving…"}</>
//               ) : (
//                 <>{bookId ? "Update Book" : "Publish Book"}<ArrowRight size={15} /></>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCreateBookMutation, useUpdateBookMutation } from "@/store/services/bookApi";
import type { Book } from "@/store/services/bookApi";
import { toast } from "sonner";
import {
  BookMarked, Paperclip, ImageIcon, ChevronDown,
  CheckCircle2, ChevronRight, Loader2, ArrowRight, Circle, FileText, X,
} from "lucide-react";
import { useGetCategoriesQuery } from "@/store/services/categoryApi";

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

const getToken = () =>
  localStorage.getItem("user_token") ??
  localStorage.getItem("token") ??
  localStorage.getItem("accessToken") ??
  "";

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

// ── Upload Area ────────────────────────────────────────────────────────────────
const UploadArea = ({
  file, existingUrl, onFileSelect, onClear, accept, maxBytes, maxLabel, icon, label,
}: {
  file: File | null;
  existingUrl: string;
  onFileSelect: (f: File) => void;
  onClear: () => void;
  accept: string;
  maxBytes: number;
  maxLabel: string;
  icon: React.ReactNode;
  label: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const validate = (f: File) => {
    if (accept === "application/pdf" && f.type !== "application/pdf") {
      toast.error("Only PDF files allowed!"); return false;
    }
    if (accept === "image/*" && !f.type.startsWith("image/")) {
      toast.error("Only image files allowed!"); return false;
    }
    if (f.size > maxBytes) {
      toast.error(`Max size is ${maxLabel}. Your file is ${formatBytes(f.size)}.`);
      return false;
    }
    return true;
  };

  const handleFile = (f: File) => { if (validate(f)) onFileSelect(f); };

  // New file picked
  if (file) {
    return (
      <FormField label={label}>
        <div className="flex items-center gap-4 p-4 rounded-xl border-2"
          style={{ borderColor: "#34d399", background: "rgba(16,185,129,0.06)" }}>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={20} className="text-emerald-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-emerald-700 truncate">{file.name}</p>
            <p className="text-xs text-emerald-500 mt-0.5">{formatBytes(file.size)}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button type="button" onClick={() => inputRef.current?.click()}
              className="text-xs text-indigo-500 hover:text-indigo-700 font-medium underline underline-offset-2 transition-colors">
              Change
            </button>
            <button type="button" onClick={onClear}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
              <X size={14} />
            </button>
          </div>
          <input ref={inputRef} type="file" accept={accept} className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
        </div>
      </FormField>
    );
  }

  // Existing file from backend (edit mode, no new file chosen)
  if (existingUrl) {
    return (
      <FormField label={label}>
        <div className="flex items-center gap-4 p-4 rounded-xl border"
          style={{ borderColor: "var(--border)", background: "var(--bg-soft)" }}>
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-indigo-50 flex items-center justify-center flex-shrink-0">
            {accept === "image/*"
              ? <img src={existingUrl} alt="current" className="w-full h-full object-cover" />
              : <FileText size={20} className="text-indigo-500" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--text)" }}>
              {accept === "image/*" ? "Current thumbnail" : "Current PDF"}
            </p>
            <p className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>
              {existingUrl}
            </p>
          </div>
          <button type="button" onClick={() => inputRef.current?.click()}
            className="text-xs text-indigo-500 hover:text-indigo-700 font-medium underline underline-offset-2 transition-colors flex-shrink-0">
            Replace
          </button>
          <input ref={inputRef} type="file" accept={accept} className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
        </div>
      </FormField>
    );
  }

  // Empty dropzone (create mode)
  return (
    <FormField label={label}>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault(); setDragging(false);
          const f = e.dataTransfer.files[0];
          if (f) handleFile(f);
        }}
        className="h-[140px] rounded-xl flex flex-col items-center justify-center cursor-pointer border-2 border-dashed transition-all duration-300"
        style={dragging
          ? { borderColor: "#6366f1", background: "rgba(99,102,241,0.06)" }
          : { borderColor: "var(--border)", background: "var(--bg-soft)" }}
      >
        <div className="text-center space-y-2 flex flex-col items-center">
          <div style={{ color: "var(--border)" }}>{icon}</div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Drag & drop or{" "}
            <span className="text-indigo-500 underline underline-offset-2 font-medium">browse</span>
          </p>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--border)" }}>
            {accept === "application/pdf" ? "PDF only" : "JPG, PNG, WEBP"} · max {maxLabel}
          </p>
        </div>
        <input ref={inputRef} type="file" accept={accept} className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
      </div>
    </FormField>
  );
};

// ── Progress bar ───────────────────────────────────────────────────────────────
const ProgressBar = ({ pct, label }: { pct: number; label: string }) => (
  <div className="mt-3 space-y-1.5">
    <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
      <span>{label}</span><span>{pct}%</span>
    </div>
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
      <div className="h-full bg-indigo-500 transition-all duration-300 rounded-full" style={{ width: `${pct}%` }} />
    </div>
  </div>
);

// ── Upload helper ──────────────────────────────────────────────────────────────
async function uploadFile(file: File, onProgress?: (pct: number) => void): Promise<string> {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          const url = data.url ?? data.file_url ?? data.secure_url ?? "";
          if (!url) reject(new Error("No URL in upload response"));
          else resolve(url);
        } catch { reject(new Error("Invalid response from upload")); }
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };
    xhr.onerror = () => reject(new Error("Upload network error"));
    xhr.open("POST", "/api/files/upload");
    if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.send(formData);
  });
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function CreateBookForm({
  bookId,
  initialData,
}: {
  bookId?: number;
  initialData?: Book;
}) {
  const router = useRouter();
  const [createBook, { isLoading }]             = useCreateBookMutation();
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const { data: categoriesData, isLoading: catLoading } = useGetCategoriesQuery();

  const categories = (categoriesData ?? []).map((c: any) => ({ value: c.id, label: c.name }));

  const [title, setTitle]             = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId]   = useState<number | "">("");
  const [existingPdfUrl,   setExistingPdfUrl]   = useState("");
  const [existingThumbUrl, setExistingThumbUrl] = useState("");
  const [pdfFile,   setPdfFile]   = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [pdfPct,   setPdfPct]   = useState(0);
  const [thumbPct, setThumbPct] = useState(0);
  const [step, setStep] = useState<"idle" | "uploading-pdf" | "uploading-thumb" | "saving">("idle");

  const busy = isLoading || isUpdating || step !== "idle";

  // ── KEY FIX: depend on both initialData AND categories ─────────────────────
  // Without `categories` in the dep array, the effect runs once while
  // categories is still [], so `options.find(v === firstCatId)` returns
  // undefined and the dropdown shows the placeholder instead of the real value.
  // Adding `categories` here means the effect re-runs once categories load,
  // and setCategoryId(firstCatId) correctly matches an option in the list.
  useEffect(() => {
    if (!initialData) return;

    setTitle(initialData.title ?? "");
    setDescription(initialData.description ?? "");

    // ✅ Exact field names from your backend response
    setExistingPdfUrl(initialData.file_url ?? "");
    setExistingThumbUrl(initialData.thumbnail ?? "");

    // ✅ category_ids is number[] — take first element
    const firstCatId = initialData.category_ids?.[0];
    if (firstCatId !== undefined) {
      setCategoryId(firstCatId);
    }
  }, [initialData, categories]); // ← categories here is the fix

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim())       return toast.error("Title is required.");
    if (!description.trim()) return toast.error("Description is required.");
    if (!categoryId)         return toast.error("Please select a category.");

    const isCreate = !bookId;
    if (isCreate && !pdfFile)   return toast.error("Book PDF is required.");
    if (isCreate && !thumbFile) return toast.error("Cover thumbnail is required.");

    try {
      let pdfUrl   = existingPdfUrl;
      let thumbUrl = existingThumbUrl;

      if (pdfFile) {
        setStep("uploading-pdf");
        setPdfPct(0);
        pdfUrl = await uploadFile(pdfFile, setPdfPct);
      }

      if (thumbFile) {
        setStep("uploading-thumb");
        setThumbPct(0);
        thumbUrl = await uploadFile(thumbFile, setThumbPct);
      }

      setStep("saving");

      const payload = {
        title:        title.trim(),
        description:  description.trim(),
        file_url:     pdfUrl,
        thumbnail:    thumbUrl,
        category_ids: [categoryId as number],
      };

      if (bookId) {
        await updateBook({ id: bookId, ...payload }).unwrap();
        toast.success("Book updated!");
        router.push("/dashboard/teacher/books");
      } else {
        await createBook(payload).unwrap();
        toast.success("Book published!");
        router.push("/dashboard/teacher/books");
      }
    } catch (err: any) {
      const msg = err?.data?.message || err?.data?.detail || err?.message || "Failed to save book.";
      toast.error(msg);
    } finally {
      setStep("idle");
    }
  };

  const stepLabel = {
    idle: "",
    "uploading-pdf":   `Uploading PDF… ${pdfPct}%`,
    "uploading-thumb": `Uploading thumbnail… ${thumbPct}%`,
    saving: "Saving book…",
  }[step];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-3xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
          <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
          <ChevronRight size={13} style={{ color: "var(--border)" }} />
          <Link href="/dashboard/teacher/books" className="hover:text-indigo-600 transition-colors">Books</Link>
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
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {bookId
              ? "Update details below. Leave file fields unchanged to keep existing files."
              : "Upload your PDF and cover image, fill in the details below."}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* ── Book Details ── */}
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
                {catLoading ? (
                  <div className={`${inputCls} flex items-center gap-2`} style={inputStyle}>
                    <Loader2 size={14} className="animate-spin text-indigo-400" />
                    <span style={{ color: "var(--text-muted)" }}>Loading categories…</span>
                  </div>
                ) : (
                  <CustomDropdown
                    options={categories}
                    placeholder="Select a category"
                    value={categoryId}
                    onChange={setCategoryId}
                  />
                )}
              </FormField>
            </div>
          </section>

          {/* ── Files ── */}
          <section className="rounded-2xl p-7 shadow-sm" style={sectionStyle}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
                <Paperclip size={18} className="text-purple-500" />
              </div>
              <h2 className="text-base font-bold" style={{ color: "var(--text)" }}>
                Files
                {step !== "idle" && (
                  <span className="ml-3 inline-flex items-center gap-1.5 text-xs text-indigo-500 font-normal">
                    <Loader2 size={12} className="animate-spin" />
                    {stepLabel}
                  </span>
                )}
              </h2>
            </div>

            <div className="space-y-5">
              <UploadArea
                label={`Book PDF${bookId ? " (optional — replaces current)" : " *"} · max ${MAX_PDF_MB}MB`}
                file={pdfFile}
                existingUrl={existingPdfUrl}
                onFileSelect={setPdfFile}
                onClear={() => setPdfFile(null)}
                accept="application/pdf"
                maxBytes={MAX_PDF_BYTES}
                maxLabel={`${MAX_PDF_MB}MB`}
                icon={<FileText size={28} />}
              />
              {step === "uploading-pdf" && <ProgressBar pct={pdfPct} label="Uploading PDF…" />}

              <UploadArea
                label={`Cover Thumbnail${bookId ? " (optional — replaces current)" : " *"} · max ${MAX_THUMBNAIL_MB}MB`}
                file={thumbFile}
                existingUrl={existingThumbUrl}
                onFileSelect={setThumbFile}
                onClear={() => setThumbFile(null)}
                accept="image/*"
                maxBytes={MAX_THUMB_BYTES}
                maxLabel={`${MAX_THUMBNAIL_MB}MB`}
                icon={<ImageIcon size={28} />}
              />
              {step === "uploading-thumb" && <ProgressBar pct={thumbPct} label="Uploading thumbnail…" />}

              {(thumbFile || existingThumbUrl) && (
                <div className="rounded-xl overflow-hidden border"
                  style={{ borderColor: "var(--border)", maxWidth: 180 }}>
                  <img
                    src={thumbFile ? URL.createObjectURL(thumbFile) : existingThumbUrl}
                    alt="Thumbnail preview"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>
          </section>

          {/* ── Actions ── */}
          <div className="flex items-center justify-end gap-3 pb-4">
            <button type="button" onClick={() => router.back()}
              className="px-6 py-3.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
              Cancel
            </button>
            <button type="submit" disabled={busy}
              className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200 active:translate-y-0">
              {busy ? (
                <><Loader2 size={15} className="animate-spin" />{stepLabel || "Saving…"}</>
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