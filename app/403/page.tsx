"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function getRoleFromToken(): "TEACHER" | "STUDENT" | null {
  try {
    const token = document.cookie
      .split("; ")
      .find((r) => r.startsWith("user_token="))
      ?.split("=")[1];
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role ?? null;
  } catch {
    return null;
  }
}

export default function ForbiddenPage() {
  const [dashboardHref, setDashboardHref] = useState("/");

  useEffect(() => {
    const role = getRoleFromToken();
    if (role === "TEACHER") setDashboardHref("/dashboard/teacher");
    else if (role === "STUDENT") setDashboardHref("/dashboard/student");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0F1226] px-4">
      <div className="text-center max-w-md">

        {/* 403 graphic */}
        <div className="relative mb-8">
          <p className="text-[120px] font-black text-gray-100 dark:text-gray-800 leading-none select-none">
            403
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.955 11.955 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"/>
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Access Denied
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm leading-relaxed">
          You don't have permission to view this page.
          It may be restricted to a different role.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={dashboardHref}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition text-sm"
          >
            Go to My Dashboard
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}