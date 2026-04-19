// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState } from "@/store";
// import { logout } from "@/store/slices/authSlice";
// import {
//   LayoutDashboard, BookOpen, CheckCircle,
//   Heart, UserCircle, LogOut, Loader2, PenLine,
// } from "lucide-react";
// import { useGetUserInfoQuery } from "@/store/features/users/userSlice";
// import { useEffect, useState } from "react";

// const navItems = [
//   { label: "Dashboard",   icon: LayoutDashboard, href: "/dashboard/student" },
//   { label: "My Courses",  icon: BookOpen,         href: "/dashboard/student/courses" },
//   { label: "Completed",   icon: CheckCircle,      href: "/dashboard/student/completed" },
//   { label: "My Favourite",icon: Heart,            href: "/dashboard/student/favourites" },
//   { label: "Profile",     icon: UserCircle,       href: "/dashboard/student/profile" },
// ];

// export default function StudentSidebar() {
//   const pathname = usePathname();
//   const router   = useRouter();
//   const dispatch = useDispatch();

//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);

//   const token = useSelector((s: RootState) => s.auth.token);

//   const { data: user, isLoading } = useGetUserInfoQuery(undefined, {
//     skip: !token || !mounted,
//   });

//   const handleLogout = () => {
//     dispatch(logout());
//     router.push("/login");
//   };

//   const fullName = user
//     ? `${user.firstName} ${user.lastName}`.trim()
//     : "Student";

//   const initials = user
//     ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
//     : "S";

//   // Consistent skeleton before mount (prevents SSR mismatch)
//   if (!mounted) {
//     return (
//       <aside className="w-64 min-h-screen bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 flex flex-col py-6 px-4">
//         <div className="flex flex-col items-center mb-8">
//           <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse mb-3" />
//           <div className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-700 animate-pulse mb-1" />
//           <div className="h-3 w-16 rounded bg-gray-100 dark:bg-slate-800 animate-pulse" />
//         </div>
//         <div className="flex flex-col gap-2 flex-1">
//           {navItems.map((item) => (
//             <div key={item.label} className="h-10 rounded-xl bg-gray-100 dark:bg-slate-800 animate-pulse" />
//           ))}
//         </div>
//       </aside>
//     );
//   }

//   return (
//     <aside className="w-64 min-h-screen bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 flex flex-col py-6 px-4 transition-colors duration-300">

//       {/* ── Profile ── */}
//       <div className="flex flex-col items-center mb-8">
//         <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-indigo-100 dark:border-indigo-900 shadow-md mb-3">
//           {isLoading ? (
//             <div className="w-full h-full bg-indigo-50 dark:bg-slate-700 flex items-center justify-center">
//               <Loader2 size={20} className="animate-spin text-indigo-400" />
//             </div>
//           ) : user?.imageUrl ? (
//             <img
//               src={user.imageUrl}
//               alt={fullName}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
//               <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-300">
//                 {initials}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Name & role */}
//         {isLoading ? (
//           <div className="space-y-2 flex flex-col items-center">
//             <div className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />
//             <div className="h-3 w-16 rounded bg-gray-100 dark:bg-slate-800 animate-pulse" />
//           </div>
//         ) : (
//           <>
//             <p className="font-bold text-gray-800 dark:text-gray-100 text-base">{fullName}</p>
//             <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm capitalize">
//               {user?.role?.toLowerCase() ?? "student"}
//             </p>
//             <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
//               @{user?.username}
//             </p>
//           </>
//         )}

//         <Link
//           href="/dashboard/student/profile"
//           className="mt-3 flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
//         >
//           <PenLine size={13} />
//           Edit Profile
//         </Link>
//       </div>

//       {/* ── Navigation ── */}
//       <nav className="flex flex-col gap-1 flex-1">
//         {navItems.map(({ label, icon: Icon, href }) => {
//           const isActive =
//             href === "/dashboard/student"
//               ? pathname === href
//               : pathname.startsWith(href);

//           return (
//             <Link
//               key={label}
//               href={href}
//               className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
//                 isActive
//                   ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold"
//                   : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-gray-100"
//               }`}
//             >
//               <Icon size={18} />
//               {label}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* ── Logout ── */}
//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors mt-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 w-full"
//       >
//         <LogOut size={18} />
//         Logout
//       </button>
//     </aside>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import {
  LayoutDashboard, BookOpen, CheckCircle, Heart, 
  UserCircle, LogOut, Loader2, ChevronLeft, ChevronRight, X
} from "lucide-react";
import { useGetUserInfoQuery } from "@/store/features/users/userSlice";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard",    icon: LayoutDashboard, href: "/dashboard/student" },
  { label: "My Courses",   icon: BookOpen,         href: "/dashboard/student/courses" },
  { label: "Completed",    icon: CheckCircle,      href: "/dashboard/student/completed" },
  { label: "My Favourite", icon: Heart,           href: "/dashboard/student/favourites" },
  { label: "Profile",      icon: UserCircle,      href: "/dashboard/student/profile" },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  closeMobile: () => void;
}

export default function StudentSidebar({ isCollapsed, setIsCollapsed, closeMobile }: SidebarProps) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const token = useSelector((s: RootState) => s.auth.token);
  const { data: user, isLoading } = useGetUserInfoQuery(undefined, {
    skip: !token || !mounted,
  });

  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "Student";

  if (!mounted) return <aside className="w-20 lg:w-64 bg-[#12192c] h-full border-r border-slate-800" />;

  return (
    <aside className={`
      relative h-full bg-[#12192c] border-r border-slate-800 
      flex flex-col py-6 transition-all duration-300 ease-in-out
      ${isCollapsed ? "w-20" : "w-72"}
    `}>
      
      {/* ── NEW: Desktop Collapse Toggle ── */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-3 top-10 w-6 h-6 bg-[#12192c] border border-slate-700 rounded-full items-center justify-center shadow-lg z-50 text-slate-400 hover:text-indigo-400 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* ── Mobile Close Button ── */}
      <button 
        onClick={closeMobile} 
        className="lg:hidden absolute right-4 top-4 text-slate-400 p-1 z-50 hover:bg-slate-800 rounded-md"
      >
        <X size={24} />
      </button>

      {/* ── Profile Section ── */}
      <div className={`flex flex-col items-center mb-8 px-4 text-center ${!isCollapsed ? "pt-10" : "pt-4"}`}>
        <div className={`
          rounded-full overflow-hidden border-2 border-indigo-500/30 shadow-lg transition-all duration-300
          ${isCollapsed ? "w-10 h-10" : "w-20 h-20 mb-3"}
        `}>
          {isLoading ? (
            <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center">
              <Loader2 size={16} className="animate-spin text-indigo-400" />
            </div>
          ) : user?.imageUrl ? (
            <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
               {fullName[0]}
            </div>
          )}
        </div>

        {!isCollapsed && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <h2 className="font-bold text-white text-lg tracking-tight truncate max-w-[200px]">{fullName}</h2>
            <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
              {user?.role ?? "Student"}
            </p>
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex flex-col gap-2 flex-1 px-4">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              onClick={() => { if(window.innerWidth < 1024) closeMobile(); }}
              className={`
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all group relative
                ${isActive 
                  ? "bg-indigo-600/20 text-indigo-400 font-semibold" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"}
              `}
            >
              <Icon size={20} className="shrink-0" />
              {!isCollapsed && <span className="text-sm">{label}</span>}
              
              {/* Tooltip for Collapsed State */}
              {isCollapsed && (
                <div className="absolute left-16 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Logout ── */}
      <div className="px-4 mt-auto pt-6 border-t border-slate-800/50">
        <button
          onClick={() => dispatch(logout())}
          className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl w-full transition-all group"
        >
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}