"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  PenLine,
  BookMarked,
  FileText,
  Heart,
  UserCircle,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard",     icon: LayoutDashboard, href: "/dashboard/teacher" },
  { label: "Create Course", icon: BookOpen,         href: "/dashboard/teacher/create-course" },
  { label: "Add Lesson",    icon: PenLine,          href: "/dashboard/teacher/lessons" },
  { label: "Add Book",      icon: BookMarked,       href: "/dashboard/teacher/create-book" },
  { label: "My Favorite",   icon: Heart,            href: "/dashboard/teacher/courses" },
  { label: "Profile",       icon: UserCircle,       href: "/dashboard/teacher/courses" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 flex flex-col py-6 px-4 transition-colors duration-300">
      {/* Profile */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-indigo-100 dark:border-indigo-900 shadow-md mb-3">
          <img
            src="https://i.pravatar.cc/80?img=12"
            alt="Teacher avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="font-bold text-gray-800 dark:text-gray-100 text-base">TeacherIT</p>
        <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">Teacher</p>
        <Link
          href="/dashboard/teacher/profile"
          className="mt-3 flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
        >
          <PenLine size={13} />
          Edit Profile
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive =
            href === "/dashboard/teacher"
              ? pathname === href
              : pathname.startsWith(href);

          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-gray-100"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors mt-4">
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}