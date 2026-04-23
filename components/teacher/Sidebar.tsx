"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import {
  LayoutDashboard, BookOpen, PenLine, BookMarked,
  Heart, UserCircle, LogOut, Loader2, ChevronLeft, ChevronRight, X, Eye
} from "lucide-react"; // Added Eye icon
import { useGetUserInfoQuery } from "@/store/features/users/userSlice";
import { useEffect, useState } from "react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  closeMobile: () => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed, closeMobile }: SidebarProps) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const token = useSelector((s: RootState) => s.auth.token);
  const { data: user, isLoading } = useGetUserInfoQuery(undefined, {
    skip: !token || !mounted,
  });

  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "Teacher";

  if (!mounted) return <aside className="w-20 lg:w-64 bg-white dark:bg-slate-900 h-full border-r" />;

  return (
    <aside className={`
      relative h-full bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 
      flex flex-col py-6 transition-all duration-300
      ${isCollapsed ? "w-20" : "w-72"}
    `}>
      
      {/* Collapse Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-3 top-10 w-6 h-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-full items-center justify-center shadow-sm z-50 text-gray-500 hover:text-indigo-600"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Mobile Close Button */}
      <button onClick={closeMobile} className="lg:hidden absolute right-4 top-4 text-gray-400">
        <X size={20} />
      </button>

      {/* ── Profile Section ── */}
      <div className="flex flex-col items-center mb-8 px-4 text-center">
        <div className={`
          rounded-full overflow-hidden border-2 border-indigo-100 dark:border-indigo-900 shadow-md transition-all duration-300
          ${isCollapsed ? "w-10 h-10" : "w-20 h-20 mb-3"}
        `}>
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
               {fullName[0]}
            </div>
          )}
        </div>

        {!isCollapsed && (
          <div className="animate-in fade-in zoom-in-95 duration-300 w-full">
            <p className="font-bold text-gray-800 dark:text-gray-100 text-base line-clamp-1">{fullName}</p>
            <p className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
              {user?.role ?? "Teacher"}
            </p>
            
            {/* ── Added View Profile Button ── */}
            <Link
              href="/dashboard/teacher/profile"
              onClick={() => { if(window.innerWidth < 1024) closeMobile(); }}
              className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-indigo-200 dark:shadow-none"
            >
              <Eye size={16} />
              View Profile
            </Link>
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex flex-col gap-1 flex-1 px-3">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href || (href !== "/dashboard/teacher" && pathname.startsWith(href));
          return (
            <Link
              key={label}
              href={href}
              onClick={() => { if(window.innerWidth < 1024) closeMobile(); }}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group
                ${isActive ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800"}
              `}
            >
              <Icon size={20} className="shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium truncate">{label}</span>}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Logout ── */}
      <div className="px-3 mt-4 border-t border-gray-100 dark:border-slate-800 pt-4">
        <button
          onClick={() => dispatch(logout())}
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl w-full transition-colors"
        >
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

const navItems = [
  { label: "Dashboard",     icon: LayoutDashboard, href: "/dashboard/teacher" },
  { label: "Create Course", icon: BookOpen,         href: "/dashboard/teacher/create-course" },
  { label: "Add Lesson",    icon: PenLine,          href: "/dashboard/teacher/lessons" },
  { label: "Add Book",      icon: BookMarked,       href: "/dashboard/teacher/create-book" },
  { label: "My Favourite",  icon: Heart,            href: "/dashboard/teacher/favourites" },
  { label: "Profile Settings", icon: UserCircle,    href: "/dashboard/teacher/profile" },
];