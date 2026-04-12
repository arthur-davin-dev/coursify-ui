import Link from "next/link";
import { ArrowRight } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Abstract 3D",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    students: 20,
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=80&h=60&fit=crop",
  },
  {
    id: 2,
    title: "Sarphens Illustration",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    students: 20,
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=80&h=60&fit=crop",
  },
  {
    id: 3,
    title: "Landing Page 3D max",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    students: 20,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&h=60&fit=crop",
  },
  {
    id: 4,
    title: "Collab Illustration",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    students: 20,
    image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=80&h=60&fit=crop",
  },
];

export default function MyCourse() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 mb-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">
          My <span className="text-amber-500">Courses</span>
        </h2>
        <Link
          href="/dashboard/teacher/courses"
          className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
        >
          See All Courses <ArrowRight size={15} />
        </Link>
      </div>

      {/* Table header */}
      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wide px-2 mb-2 border-b border-gray-100 dark:border-slate-800 pb-2">
        <span>Course Name</span>
        <span>Total Student</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-50 dark:divide-slate-800">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/dashboard/teacher/courses/${course.id}`}
            className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <img
                src={course.image}
                alt={course.title}
                className="w-14 h-10 rounded-lg object-cover shadow-sm flex-shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{course.title}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-xs">{course.description}</p>
              </div>
            </div>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{course.students}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}