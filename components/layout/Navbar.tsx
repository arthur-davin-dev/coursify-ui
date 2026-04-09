// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Menu, X, Sun, Moon } from "lucide-react";

// const navLinks = [
//   { label: "Course", href: "/courses" },
//   { label: "Library", href: "/books" },
//   { label: "About us", href: "/about-us" },
// ];

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [user, setUser] = useState<any>(null);

//   // Load theme
//   useEffect(() => {
//     const saved = localStorage.getItem("theme");
//     if (saved === "dark") {
//       setDarkMode(true);
//       document.documentElement.classList.add("dark");
//     }
//   }, []);

//   // Fetch user from API
//   useEffect(() => {
//   const fetchUser = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) return;

//     try {
//       const res = await fetch("https://api-coursify.onrender.com/api/users/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Guard: only parse JSON if there's actually a body
//       const text = await res.text();
//       if (!text) return;

//       const data = JSON.parse(text);

//       if (res.status === 401) {
//         localStorage.removeItem("user_token");
//         window.dispatchEvent(new Event("auth-change"));
//         return;
//       }

//       setUser(data);
//     } catch (err) {
//       console.error("Fetch user error:", err);
//     }
//   };

//   fetchUser();
// }, []);

//   // Scroll shrink
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const close = () => setProfileOpen(false);
//     window.addEventListener("click", close);
//     return () => window.removeEventListener("click", close);
//   }, []);

//   const toggleDarkMode = () => {
//     const next = !darkMode;
//     setDarkMode(next);
//     if (next) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   // Dispatch auth-change so NavbarWrapper switches back to NavbarNoAcc
//   const handleLogout = () => {
//     localStorage.removeItem("user_token");
//     window.dispatchEvent(new Event("auth-change"));
//   };

//   return (
//     <nav
//       className={`w-full sticky top-0 z-50 transition-all duration-300
//         ${
//           scrolled
//             ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md"
//             : "bg-white dark:bg-gray-900"
//         }`}
//     >
//       {/* Main bar */}
//       <div className="flex items-center justify-between px-4 sm:px-8 md:px-10 lg:px-20 py-0">
//         {/* Logo */}
//         <Link href="/" className="flex items-center">
//           <Image
//             src={darkMode ? "/coursifydark.png" : "/lightcoursify.png"}
//             alt="Coursify Logo"
//             width={200}
//             height={52}
//             className="object-contain w-[90px] sm:w-[110px] md:w-[130px]"
//             priority
//           />
//         </Link>

//         {/* Desktop Links */}
//         <ul className="hidden md:flex gap-6 lg:gap-10">
//           {navLinks.map((item) => (
//             <li key={item.label}>
//               <Link
//                 href={item.href}
//                 className="text-[#2D368E] dark:text-gray-200 hover:text-blue-600 transition text-[24px] font-[600]"
//               >
//                 {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* Right */}
//         <div className="flex items-center gap-7 text-[#2D368E] dark:text-gray-200">
//           {/* Dark Mode */}
//           <button onClick={toggleDarkMode}>
//             {darkMode ? <Sun size={36} /> : <Moon size={36} />}
//           </button>

//           {/* Profile Dropdown */}
//           <div className="relative">
//             <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setProfileOpen(!profileOpen);
//               }}
//               className="w-15 h-15 rounded-full overflow-hidden border-2 cursor-pointer"
//             >
//               <Image
//                 src={user?.imageUrl || "/avatar.png"}
//                 alt="avatar"
//                 width={60}
//                 height={60}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {profileOpen && (
//               <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 z-50">
//                 <div className="px-4 py-3 border-b dark:border-gray-700">
//                   <p className="text-sm font-semibold">
//                     {user ? `${user.firstName} ${user.lastName}` : "User"}
//                   </p>
//                   <p className="text-xs text-gray-500">{user?.email}</p>
//                 </div>

//                 <Link href="/profile">
//                   <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                     Profile
//                   </div>
//                 </Link>

//                 <Link href="/my-course">
//                   <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                     My Course
//                   </div>
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? <X size={30} /> : <Menu size={30} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden px-6 py-4 bg-white dark:bg-gray-900">
//           {navLinks.map((item) => (
//             <Link key={item.label} href={item.href}>
//               <div className="py-2 border-b">{item.label}</div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "Course", href: "/courses" },
  { label: "Library", href: "/books" },
  { label: "About us", href: "/about-us" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Load theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Fetch user — hits /api/user/me (our proxy), not the real API
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("user_token");
      if (!token) return;

      try {
        const res = await fetch("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const text = await res.text();
        if (!text) return;

        const data = JSON.parse(text);

        if (res.status === 401) {
          localStorage.removeItem("user_token");
          window.dispatchEvent(new Event("auth-change"));
          return;
        }

        setUser(data);
      } catch (err) {
        console.error("Fetch user error:", err);
      }
    };

    fetchUser();
  }, []);

  // Scroll shrink
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const close = () => setProfileOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    window.dispatchEvent(new Event("auth-change"));
  };

  const avatarSrc =
    user?.imageUrl && user.imageUrl !== "null" ? user.imageUrl : "/avatar.png";

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";

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
      <div className="flex items-center justify-between px-4 sm:px-8 md:px-10 lg:px-20 py-2">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={darkMode ? "/logocoursifydark.jpg.png" : "/logocoursifydark.jpg.png"}
            alt="Coursify Logo"
            width={200}
            height={52}
            className="object-contain w-[70px] sm:w-[85px] md:w-[100px]"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 lg:gap-10">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-[#2D368E] dark:text-gray-200 hover:text-blue-600 transition text-xl font-semibold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-4 text-[#2D368E] dark:text-gray-200">

          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setProfileOpen(!profileOpen);
              }}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-300
                         dark:border-gray-600 cursor-pointer focus:outline-none
                         hover:ring-2 hover:ring-blue-500 transition flex items-center justify-center"
            >
              {user?.imageUrl && user.imageUrl !== "null" ? (
                <Image
                  src={avatarSrc}
                  alt="avatar"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-xs font-semibold">
                  {initials}
                </span>
              )}
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">

                {/* User info */}
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 flex-shrink-0 flex items-center justify-center bg-blue-600">
                    {user?.imageUrl && user.imageUrl !== "null" ? (
                      <Image
                        src={avatarSrc}
                        alt="avatar"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-xs font-semibold">
                        {initials}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {user ? `${user.firstName} ${user.lastName}` : "User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <Link href="/profile">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition">
                    Profile
                  </div>
                </Link>

                <Link href="/my-course">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition">
                    My Course
                  </div>
                </Link>

                <div className="border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              <div className="py-2 border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:text-blue-600 transition text-sm">
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}