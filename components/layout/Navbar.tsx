"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "Course", href: "/course" },
  { label: "Library", href: "/library" },
  { label: "About us", href: "/about" },
];

export default function Navbar() {
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

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // trigger after scroll
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
            ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md"
            : "bg-white dark:bg-gray-900"
        }`}
    >
      {/* Main bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 md:px-10 lg:px-20 py-1">
        
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

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-10">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-[#2D368E] dark:text-gray-200 font-medium 
                           hover:text-blue-700 dark:hover:text-blue-400 
                           transition text-base lg:text-xl"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          
          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-700 dark:text-yellow-300 
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? <Sun size={28} /> : <Moon size={28} />}
          </button>

          {/* Avatar */}
          <Link href="/profile">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 
                            border-blue-200 dark:border-blue-700 
                            hover:border-blue-500 transition">
              <Image
                src="/avatar.png"
                alt="User Avatar"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
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
        <div className="md:hidden absolute top-full left-0 w-full 
                        bg-white/90 dark:bg-gray-900/90 backdrop-blur-md
                        border-t border-gray-200 dark:border-gray-700 
                        shadow-lg px-6 py-4 flex flex-col gap-4">
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
        </div>
      )}
    </nav>
  );
}