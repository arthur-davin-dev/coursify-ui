"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import StudentSidebar from "@/components/student/Studentsidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
        {/* Sidebar — hidden on mobile */}
        <div className="hidden lg:flex">
          <StudentSidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile top bar */}
          <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
            <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
              Student Dashboard
            </span>
          </div>

          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}