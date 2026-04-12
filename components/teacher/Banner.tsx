import { BookOpen, Users, BookMarked } from "lucide-react";

const stats = [
  {
    label: "Total Courses",
    value: 5,
    icon: BookOpen,
    bg: "bg-rose-50 dark:bg-rose-950",
    iconBg: "bg-rose-400 dark:bg-rose-500",
    text: "text-rose-500 dark:text-rose-400",
  },
  {
    label: "Total Enrollment",
    value: 1503,
    icon: Users,
    bg: "bg-amber-50 dark:bg-amber-950",
    iconBg: "bg-amber-400 dark:bg-amber-500",
    text: "text-amber-500 dark:text-amber-400",
  },
  {
    label: "Total Books",
    value: 8,
    icon: BookMarked,
    bg: "bg-violet-50 dark:bg-violet-950",
    iconBg: "bg-violet-400 dark:bg-violet-500",
    text: "text-violet-500 dark:text-violet-400",
  },
];

export default function Banner() {
  return (
    <div className="mb-8">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Welcome, <span className="text-indigo-700 dark:text-indigo-400">Teacher1</span> !
        </h1>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, bg, iconBg, text }) => (
          <div
            key={label}
            className={`${bg} rounded-2xl px-6 py-5 flex items-center gap-4 shadow-sm transition-colors duration-300`}
          >
            <div className={`${iconBg} w-11 h-11 rounded-xl flex items-center justify-center shadow`}>
              <Icon size={20} className="text-white" />
            </div>
            <div>
              <p className={`text-2xl font-extrabold ${text}`}>{value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}