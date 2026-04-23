"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Check,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
// 1. IMPORT FONTS
import { Kantumruy_Pro, Plus_Jakarta_Sans, Moul } from "next/font/google";

// 2. INITIALIZE FONTS
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer"],
  weight: ["400", "700"],
});

const moul = Moul({
  subsets: ["khmer"],
  weight: ["400"],
});

function Avatar({
  imageUrl,
  initials,
  size = 48,
}: {
  imageUrl?: string | null;
  initials: string;
  size?: number;
}) {
  const hasImage =
    imageUrl && imageUrl !== "null" && imageUrl.startsWith("http");
  if (hasImage) {
    return (
      <img
        src={imageUrl!}
        alt="avatar"
        style={{ width: size, height: size }}
        className="rounded-full object-cover pointer-events-none"
      />
    );
  }
  return (
    <span className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-xs font-semibold pointer-events-none">
      {initials}
    </span>
  );
}

function getDashboardRoute(role?: string) {
  if (role === "TEACHER") return "/dashboard/teacher";
  if (role === "STUDENT") return "/dashboard/student";
  return "/dashboard";
}

export default function Navbar() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const isKhmer = i18n.language === "kh";

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const fetchUser = async () => {
      const token = localStorage.getItem("user_token");
      if (!token) return;
      try {
        const res = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          localStorage.removeItem("user_token");
          document.cookie = "user_token=; path=/; max-age=0";
          return;
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const closeAll = () => {
      setProfileOpen(false);
      setLangOpen(false);
    };
    window.addEventListener("click", closeAll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", closeAll);
    };
  }, []);

  if (!mounted) return <div className="h-20" />;

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const currentLang = i18n.language || "en";

  const navLinks = [
    { label: t("Course"), href: "/courses" },
    { label: t("Library"), href: "/library" },
    { label: t("About us"), href: "/about-us" },
  ];

  const initials = user?.firstName
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
    : "?";

  return (
    // 3. APPLY CONDITIONAL FONT FAMILY TO WRAPPER
    <nav
      className={`${isKhmer ? kantumruy.className : jakarta.className} w-full sticky top-0 z-[100] transition-all duration-300 ${scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg" : "bg-white dark:bg-[#0F1226]"}`}
    >
      <div className="flex items-center justify-between px-4 sm:px-8 md:px-10 lg:px-20 py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/logocoursifydark.jpg.png"
            alt="Logo"
            width={70}
            height={52}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-[#2D368E] dark:text-gray-200 font-bold hover:text-blue-700 dark:hover:text-blue-400 transition text-base lg:text-lg uppercase"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* LANGUAGE DROPDOWN */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen(!langOpen);
                setProfileOpen(false);
              }}
              className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-transparent dark:border-gray-700"
            >
              <Globe size={18} className="text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-black uppercase">
                {currentLang.slice(0, 2)}
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform ${langOpen ? "rotate-180" : ""}`}
              />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`${jakarta.className} cursor-pointer flex items-center justify-between w-full px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-200`}
                >
                  <span
                    className={
                      currentLang.includes("en")
                        ? "text-blue-600 font-bold"
                        : ""
                    }
                  >
                    English
                  </span>
                  {currentLang.includes("en") && (
                    <Check size={16} className="text-blue-600" />
                  )}
                </button>
                <button
                  onClick={() => handleLanguageChange("kh")}
                  className={`${kantumruy.className} cursor-pointer flex items-center justify-between w-full px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-200`}
                >
                  <span
                    className={
                      currentLang.includes("kh")
                        ? "text-blue-600 font-bold"
                        : ""
                    }
                  >
                    ភាសាខ្មែរ
                  </span>
                  {currentLang.includes("kh") && (
                    <Check size={16} className="text-blue-600" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const next = !darkMode;
              setDarkMode(next);
              document.documentElement.classList.toggle("dark", next);
              localStorage.setItem("theme", next ? "dark" : "light");
            }}
            className="cursor-pointer p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <Sun size={22} className="text-orange-400" />
            ) : (
              <Moon size={22} className="text-blue-900" />
            )}
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setProfileOpen(!profileOpen);
                setLangOpen(false);
              }}
              className="cursor-pointer w-11 h-11 rounded-full overflow-hidden border-2 border-blue-500 hover:scale-105 transition-transform"
            >
              <Avatar imageUrl={user?.imageUrl} initials={initials} size={44} />
            </button>

            {/* {profileOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                  <p className="text-sm font-bold dark:text-white">{user ? `${user.firstName} ${user.lastName}` : "Guest Student"}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || "Welcome back!"}</p>
                </div>
                <Link href={getDashboardRoute(user?.role)} className="flex items-center px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition dark:text-gray-200">{t("Profile")}</Link>
                <button 
                  onClick={() => { localStorage.removeItem("user_token"); window.location.reload(); }}
                  className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold"
                >
                  {t("Sign Out")}
                </button>
              </div>
            )} */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                  <p className="text-sm font-bold dark:text-white">
                    {user
                      ? `${user.firstName} ${user.lastName}`
                      : "Guest Student"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || "Welcome back!"}
                  </p>
                </div>

                {/* Profile Link with Icon */}
                <Link
                  href={getDashboardRoute(user?.role)}
                  className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition dark:text-gray-200"
                >
                  <User size={18} className="text-gray-400" />
                  {t("Profile")}
                </Link>

                {/* Sign Out Button with Icon */}
                <button
                  onClick={() => {
                    localStorage.removeItem("user_token");
                    // Clear cookies if necessary
                    document.cookie = "user_token=; path=/; max-age=0";
                    window.location.reload();
                  }}
                  className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold transition"
                >
                  <LogOut size={18} />
                  {t("Sign Out")}
                </button>
              </div>
            )}
          </div>

          {/* Hamburger Icon */}
          <button
            className="md:hidden p-2 text-blue-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0F1226] border-t dark:border-gray-800 shadow-xl animate-in slide-in-from-top duration-300 overflow-hidden z-[90]">
          <ul className="flex flex-col p-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 px-4 text-lg font-bold text-[#2D368E] dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-xl transition uppercase"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
