"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF, FaTelegramPlane, FaYoutube, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }

    // Stay in sync if navbar toggles theme after mount
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-white dark:bg-[#0F1226] border-t border-gray-200 dark:border-gray-700 py-14 px-4 sm:px-6 lg:px-8 mt-auto font-[Inter,sans-serif]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ISTAD */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-[24px] font-semibold text-[#2D368E] dark:text-gray-500 mb-5 uppercase tracking-widest">
              Organized by
            </h4>
            <img
              src="/logoISTAD.png"
              className="h-34 mb-8 object-contain"
              alt="ISTAD Logo"
            />
            <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed">
              Institute of Science and Technology
              <br />
              Advanced Development
            </p>
          </div>

          {/* Brand */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-[24px] font-semibold text-[#2D368E] dark:text-gray-500 mb-5 uppercase tracking-widest">
              Coursify
            </h4>

            <Image
              src={darkMode ? "/coursifydark.png" : "/lightcoursify.png"}
              alt="Coursify Logo"
              width={200}
              height={150}
              className="h-40 mb-2 object-contain"
            />

            <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed">
              Learn from industry experts.
              <br />
              Build skills that matter.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="text-[24px] font-semibold text-[#2D368E] dark:text-gray-500 mb-5 uppercase tracking-widest">
              Explore
            </h3>
            <ul className="flex flex-col gap-4 text-[18px] text-gray-500 dark:text-gray-400">
              <li>
                <Link
                  href="/courses"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/library"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Library
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="text-[24px] font-semibold text-[#2D368E] dark:text-gray-500 mb-5 uppercase tracking-widest">
              Contact Us
            </h3>

            <div className="flex items-center gap-3 mb-3 text-gray-500 dark:text-gray-400 text-[18px]">
              <MdEmail size={20} className="shrink-0" />
              <a
                href="mailto:support@coursify.istad.co"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                support@coursify.istad.co
              </a>
            </div>

            <div className="flex items-center gap-3 mb-6 text-gray-500 dark:text-gray-400 text-[18px]">
              <MdPhone size={20} className="shrink-0" />
              <a
                href="tel:+85512345678"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                +855 12 345 678
              </a>
            </div>

            <div className="flex gap-3">
              <a
                href="https://web.facebook.com/istad.co"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
              >
                <FaFacebookF size={15} />
              </a>
              <a
                href="https://t.me/ISTADKH"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition"
              >
                <FaTelegramPlane size={15} />
              </a>
              <a
                href="https://www.youtube.com/@istad7665"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition"
              >
                <FaYoutube size={15} />
              </a>
              <a
                href="https://www.instagram.com/istad.co"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition"
              >
                <FaInstagram size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto mt-12 border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col sm:flex-row justify-between text-[14px] text-gray-400 dark:text-gray-500">
        <span>© {new Date().getFullYear()} Coursify · All Rights Reserved</span>
        <div className="flex gap-5">
          <Link
            href="/privacy"
            className="hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;