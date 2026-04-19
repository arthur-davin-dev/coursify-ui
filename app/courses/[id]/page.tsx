"use client";
import { useParams } from "next/navigation";
import { useGetCourseByIdQuery } from "@/store/services/courseApi";
import CourseDetail from "@/components/course/CourseDetail";
// Swap this import for whatever auth hook your project uses
import { useSelector } from "react-redux";
import { RootState } from "@/store";


export default function CourseDetailPage() {
const { id } = useParams();
  const { data: course, isLoading, isError } = useGetCourseByIdQuery(Number(id));
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);


  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-pulse">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl w-3/4" />
            <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded-full w-1/4" />
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-full" />
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-5/6" />
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-4/6" />
          </div>
          <div className="space-y-4">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-3xl" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-red-500 font-medium mb-3">Failed to load course.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return <CourseDetail course={course} isAuthenticated={isAuthenticated} />;
}