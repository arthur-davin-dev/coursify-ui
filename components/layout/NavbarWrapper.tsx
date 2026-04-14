// "use client";

// import { useState, useEffect } from "react";
// import NavbarNoAcc from "./NavbarNoAcc";
// import Navbar from "./Navbar";

// export default function NavbarWrapper() {
//   const [hasAccount, setHasAccount] = useState(false);

//   const checkAuth = () => {
//     const user = localStorage.getItem("user_token");
//     setHasAccount(!!user);
//   };

//   useEffect(() => {
//     checkAuth();
//     window.addEventListener("auth-change", checkAuth);
//     return () => window.removeEventListener("auth-change", checkAuth);
//   }, []);

//   return <>{hasAccount ? <Navbar /> : <NavbarNoAcc />}</>;
// }

"use client";

import { useState, useEffect } from "react";
import NavbarNoAcc from "./NavbarNoAcc";
import Navbar from "./Navbar";

type UserRole = "STUDENT" | "TEACHER" | null;

export default function NavbarWrapper() {
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem("user_token");

    if (!token) {
      setRole(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        localStorage.removeItem("user_token");
        setRole(null);
        setLoading(false);
        return;
      }

      const data = await res.json();
      // role is "TEACHER" or "STUDENT" (uppercase from your API)
      setRole(data.role ?? null);
    } catch (err) {
      console.error(err);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    // Fires when your LoginForm calls window.dispatchEvent(new Event("auth-change"))
    window.addEventListener("auth-change", checkAuth);

    // Fires when localStorage changes in same tab via storage polyfill or other tabs
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("auth-change", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  if (loading) return <div className="h-20" />;

  if (role === "TEACHER") return <Navbar />;
  if (role === "STUDENT") return <Navbar />;
  return <NavbarNoAcc />;
}