"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ✅ Using the hooks from your courseApi.ts
import { useGetMyCoursesQuery, useDeleteCourseMutation } from "@/store/services/courseApi";
import { Eye, Pencil, Trash2, BookOpen, Plus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// ─── Delete Modal ─────────────────────────────────────────────────────────────
const DeleteModal = ({ course, onConfirm, onCancel, isDeleting }: any) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    onClick={onCancel}
  >
    <div
      className="bg-[var(--bg-card)] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-[var(--border)]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-1 w-full bg-red-500" />
      <div className="px-7 py-8 flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/20 flex items-center justify-center mb-4">
          <Trash2 size={24} className="text-red-500" strokeWidth={1.75} />
        </div>
        <h2 className="text-xl font-black text-[var(--text)] mb-1.5 font-inter">Delete Course?</h2>
        <p className="text-sm font-semibold text-[var(--text)] mb-1 line-clamp-2 font-inter">
          {course?.title}
        </p>
        <p className="text-xs text-[var(--text-muted)] mb-7 font-inter">
          This action cannot be undone.
        </p>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm mb-3 flex items-center justify-center gap-2 transition-all disabled:opacity-60 font-inter"
        >
          {isDeleting ? "Deleting..." : "Yes, Delete Course"}
        </button>
        <button
          onClick={onCancel}
          className="w-full py-3 rounded-xl border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] font-semibold text-sm transition-all flex items-center justify-center gap-2 font-inter"
        >
          <ArrowLeft size={14} /> Cancel
        </button>
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AllCoursesTable() {
  const router = useRouter();
  const [courseToDelete, setCourseToDelete] = useState<any>(null);

  // ✅ Updated hook name to match your RTK Query file
  const { data: courses = [], isLoading, isError } = useGetMyCoursesQuery();
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

  const handleConfirmDelete = async () => {
    if (!courseToDelete) return;
    try {
      await deleteCourse(courseToDelete.id).unwrap();
      toast.success("Course deleted successfully");
    } catch {
      toast.error("Failed to delete course");
    } finally {
      setCourseToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-soft)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
              <BookOpen size={11} className="text-primary" />
              <span className="text-[0.62rem] text-primary font-bold tracking-widest uppercase font-inter">
                Instructor Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight font-inter">
              Manage Courses
            </h1>
          </div>
          <button
            onClick={() => router.push("/dashboard/teacher/create")}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-bold font-inter transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
          >
            <Plus size={18} /> New Course
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-soft)]/50 border-b border-[var(--border)]">
                  <th className="px-6 py-4 text-[0.65rem] font-bold text-[var(--text-muted)] uppercase tracking-widest font-inter">Course</th>
                  <th className="px-6 py-4 text-[0.65rem] font-bold text-[var(--text-muted)] uppercase tracking-widest font-inter hidden lg:table-cell">Details</th>
                  <th className="px-6 py-4 text-[0.65rem] font-bold text-[var(--text-muted)] uppercase tracking-widest font-inter text-center">Status</th>
                  <th className="px-6 py-4 text-[0.65rem] font-bold text-[var(--text-muted)] uppercase tracking-widest font-inter text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {isLoading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={4} className="px-6 py-8 bg-[var(--bg-soft)]/20" />
                    </tr>
                  ))
                ) : courses.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center">
                       <p className="text-[var(--text-muted)] font-inter">No courses found. Start by creating one!</p>
                    </td>
                  </tr>
                ) : (
                  courses.map((course: any) => (
                    <tr key={course.id} className="hover:bg-[var(--bg-soft)]/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-[var(--bg-soft)]">
                            {course.thumbnail ? (
                              <img 
                                src={course.thumbnail} 
                                alt={course.title} 
                                
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-primary/5">
                                <BookOpen size={16} className="text-primary/40" />
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-bold text-[var(--text)] font-inter line-clamp-1">
                            {course.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <p className="text-xs text-[var(--text-muted)] line-clamp-1 max-w-[250px] font-inter">
                          {course.description || "No description provided."}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          course.isPublished 
                            ? "bg-green-500/10 text-green-500 border border-green-500/20" 
                            : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                        }`}>
                          {course.isPublished ? "PUBLISHED" : "DRAFT"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => router.push(`/courses/${course.id}`)}
                            className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => router.push(`/dashboard/teacher/edit-course/${course.id}`)}
                            className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-500 transition-colors"
                          >
                            <Pencil size={16} />
                          </button>
                          <button 
                            onClick={() => setCourseToDelete(course)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {courseToDelete && (
        <DeleteModal
          course={courseToDelete}
          isDeleting={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setCourseToDelete(null)}
        />
      )}
    </div>
  );
}