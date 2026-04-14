"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, LogIn, Globe, Check, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n"; 
import { LoginForm } from "../forms/LoginForm";
import AuthFlowModal from "../forms/AuthFlowWrapper";
import { RegisterForm, RegisterFormData } from "../forms/RegisterForm";
import { useRegisterMutation } from "@/store/features/auth/authApi";
import { toast } from "sonner";

export default function NavbarNoAcc() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [register, { isLoading: isRegistering }] = useRegisterMutation(); // ← add

  const handleRegister = async (formData: RegisterFormData) => { // ← add
    try {
      await register(formData).unwrap();
      toast.success("Registration successful!");
      setShowSignup(false);
      setShowLogin(true); // bring them back to login after signup
    } catch (err: any) {
      const message = err?.data?.message || err?.data?.error || "Registration failed";
      toast.error(message);
    }
  };

  // Fix hydration and load theme
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Global click listener to close dropdowns
    const closeDropdowns = () => setLangOpen(false);
    window.addEventListener("click", closeDropdowns);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", closeDropdowns);
    };
  }, []);

  if (!mounted) return <div className="h-20" />;

  const toggleDarkMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !darkMode;
    setDarkMode(next);
    next
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", next ? "dark" : "light");
  };

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

  return (
    <>
      <nav
        className={`w-full sticky top-0 z-40 transition-all duration-300
        ${
          scrolled
            ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md"
            : "bg-white dark:bg-[#0F1226]"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-8 md:px-10 lg:px-20 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logocoursifydark.jpg.png"
              alt="Logo"
              width={200}
              height={52}
              className="object-contain w-[50px] sm:w-[70px] md:w-[85px]"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-10">
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

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* ✅ LANGUAGE SELECTOR */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setLangOpen(!langOpen); }}
                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <Globe size={18} className="text-blue-600" />
                <span className="text-xs font-black uppercase">{currentLang.slice(0, 2)}</span>
                <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <button 
                    onClick={() => handleLanguageChange('en')}
                    className="cursor-pointer flex items-center justify-between w-full px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                  >
                    <span className={currentLang.includes('en') ? 'text-blue-600 font-bold' : ''}>English</span>
                    {currentLang.includes('en') && <Check size={16} className="text-blue-600" />}
                  </button>
                  <button 
                    onClick={() => handleLanguageChange('kh')}
                    className="cursor-pointer flex items-center justify-between w-full px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                  >
                    <span className={currentLang.includes('kh') ? 'text-blue-600 font-bold' : ''}>ភាសាខ្មែរ</span>
                    {currentLang.includes('kh') && <Check size={16} className="text-blue-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="cursor-pointer p-2 rounded-lg text-gray-700 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* Desktop Login */}
            <button
              onClick={() => setShowLogin(true)}
              className="cursor-pointer hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold transition shadow-md"
            >
              <LogIn size={20} /> Login
            </button>

            {/* Mobile Menu Button */}
            <button
              className="cursor-pointer md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200"
              onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* ✅ MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-6 pt-2 bg-white dark:bg-gray-900 shadow-md animate-in slide-in-from-top duration-300 border-t dark:border-gray-800">
            <ul className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-gray-700 dark:text-gray-200 text-lg font-bold py-2 border-b dark:border-gray-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Login */}
            <button
              onClick={() => {
                setShowLogin(true);
                setMenuOpen(false);
              }}
              className="cursor-pointer mt-6 w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold transition"
            >
              <LogIn size={24} /> Login
            </button>
          </div>
        )}
      </nav>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowLogin(false)}
          />
          <div className="relative w-full max-w-sm animate-in zoom-in-95 duration-200">
            <LoginForm
              onClose={() => setShowLogin(false)}
              onForgotPassword={() => {
                setShowLogin(false);
                setForgotOpen(true);
              }}
              onSignUp={() => {          // ← add
                setShowLogin(false);
                setShowSignup(true);
              }}
            />
          </div>
        </div>
      )}
      {showSignup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowSignup(false)}
          />
          <div className="relative w-full max-w-sm animate-in zoom-in-95 duration-200">
            <RegisterForm
              onSubmit={handleRegister}
              isLoading={isRegistering}
              onClose={() => setShowSignup(false)}
              onSignIn={() => {          // ← add (optional, to go back to login)
                setShowSignup(false);
                setShowLogin(true);
              }}
            />
          </div>
        </div>
      )}
      {/* {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowLogin(false)}
          />
          <div className="relative w-full max-w-sm animate-in zoom-in-95 duration-200">
            <LoginForm
              onClose={() => setShowLogin(false)}
              onForgotPassword={() => {       // ← add this
                setShowLogin(false);
                setForgotOpen(true);
              }}
            />
          </div>
        </div>
        )} */}
        <AuthFlowModal                          // ← add this
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />
    </>
  );
}