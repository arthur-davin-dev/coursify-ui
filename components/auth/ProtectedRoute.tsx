"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { RootState } from "@/store";

export default function ProtectedRoute({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode; 
  allowedRoles: string[]; 
}) {
  const { user, isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!token) {
        router.push("/login");
      } else if (user && !allowedRoles.includes(user.role)) {
        // If wrong role, send them to their rightful dashboard
        const target = user.role === "TEACHER" ? "/dashboard/teacher" : "/dashboard/student";
        router.push(target);
      }
    }
  }, [isMounted, token, user, router, allowedRoles]);

  // Prevent flicker during hydration
  if (!isMounted || !token || (user && !allowedRoles.includes(user.role))) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-pulse font-medium text-gray-500">Verifying access...</div>
      </div>
    );
  }

  return <>{children}</>;
}