"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, LogIn } from "lucide-react";

const navLinks = [
  { label: "Course", href: "/course" },
  { label: "Library", href: "/library" },
  { label: "About us", href: "/about" },
];

export default function NavbarNoAcc() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false); // ✅ NEW

  // Load theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);

    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav
      className={`w-full sticky top-0 z-50 transition-all duration-300
    ${
      scrolled
        ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md py-1" // smaller height
        : "bg-white dark:bg-gray-900 py-4" // default taller height
    }`}
    >
      {/* Main bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 md:px-10 lg:px-20 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={darkMode ? "/coursifydark.png" : "/lightcoursify.png"}
            alt="Coursify Logo"
            width={130}
            height={52}
            className="object-contain w-[90px] sm:w-[110px] md:w-[130px]"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-10">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-gray-700 dark:text-gray-200 font-medium 
                           hover:text-blue-700 dark:hover:text-blue-400 
                           transition text-base lg:text-xl"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-700 dark:text-yellow-300 
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? <Sun size={26} /> : <Moon size={26} />}
          </button>

          {/* Login Button */}
          <Link href="/login" className="hidden sm:block">
            <button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 
                               text-white px-5 py-2 rounded-full font-semibold 
                               transition shadow-md hover:shadow-lg active:scale-95 text-sm md:text-base"
            >
              <LogIn size={18} />
              Login
            </button>
          </Link>

          {/* Mobile Menu */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full 
                        bg-white/90 dark:bg-gray-900/90 backdrop-blur-md
                        border-t border-gray-200 dark:border-gray-700 
                        shadow-lg px-6 py-6 flex flex-col gap-4"
        >
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-gray-200 font-medium 
                         text-lg hover:text-blue-700 dark:hover:text-blue-400 
                         transition py-2 border-b last:border-0"
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile Login */}
          <Link href="/login" onClick={() => setMenuOpen(false)}>
            <button
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 
                               text-white py-3 rounded-xl font-bold 
                               flex items-center justify-center gap-2 transition"
            >
              <LogIn size={20} />
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
