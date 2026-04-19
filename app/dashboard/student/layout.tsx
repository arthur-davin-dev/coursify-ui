// "use client";

// import ProtectedRoute from "@/components/auth/ProtectedRoute";
// import StudentSidebar from "@/components/student/Studentsidebar";

// export default function StudentLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <ProtectedRoute allowedRoles={["STUDENT"]}>
//       <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
//         {/* Sidebar — hidden on mobile */}
//         <div className="hidden lg:flex">
//           <StudentSidebar />
//         </div>

//         <div className="flex-1 flex flex-col min-w-0">
//           {/* Mobile top bar */}
//           <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
//             <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
//               Student Dashboard
//             </span>
//           </div>

//           <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
//             {children}
//           </main>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

"use client";

import { useState } from "react";
import StudentSidebar from "@/components/student/Studentsidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Menu, PanelRightClose } from "lucide-react";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
        {/* Mobile Backdrop */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Sidebar Container */}
        <div
          className={`
  fixed inset-y-0 left-0 z-[100] transform transition-transform duration-300 
  ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
  lg:relative lg:translate-x-0 lg:z-0
`}
        >
          <StudentSidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            closeMobile={() => setIsMobileOpen(false)}
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          {/* Header Bar */}
          <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-500"
              >
                <PanelRightClose size={20} />
              </button>
              <span className="font-bold text-gray-700 dark:text-gray-200">
                Student Dashboard
              </span>
            </div>
          </header>

          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
