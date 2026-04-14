// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Menu, X, Sun, Moon } from "lucide-react";

// const navLinks = [
//   { label: "Course", href: "/courses" },
//   { label: "Library", href: "/library" },
//   { label: "About us", href: "/about-us" },
// ];

// // ✅ One reusable avatar — handles real URL or initials fallback
// function Avatar({
//   imageUrl,
//   initials,
//   size = 48,
// }: {
//   imageUrl?: string | null;
//   initials: string;
//   size?: number;
// }) {
//   const hasImage =
//     imageUrl && imageUrl !== "null" && imageUrl.startsWith("http");

//   if (hasImage) {
//     return (
//       <img
//         src={imageUrl!}
//         alt="avatar"
//         style={{ width: size, height: size }}
//         className="w-full h-full object-cover"
//       />
//     );
//   }

//   return (
//     <span className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-xs font-semibold">
//       {initials}
//     </span>
//   );
// }

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const saved = localStorage.getItem("theme");
//     if (saved === "dark") {
//       setDarkMode(true);
//       document.documentElement.classList.add("dark");
//     }
//   }, []);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return;

//       try {
//         const res = await fetch("/api/users/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.status === 401) {
//           localStorage.removeItem("user_token");
//           window.dispatchEvent(new Event("auth-change"));
//           return;
//         }

//         const text = await res.text();
//         if (!text) return;
//         setUser(JSON.parse(text));
//       } catch (err) {
//         console.error("Fetch user error:", err);
//       }
//     };

//     fetchUser();
//     window.addEventListener("auth-change", fetchUser);
//     return () => window.removeEventListener("auth-change", fetchUser);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const close = () => setProfileOpen(false);
//     window.addEventListener("click", close);
//     return () => window.removeEventListener("click", close);
//   }, []);

//   const toggleDarkMode = () => {
//     const next = !darkMode;
//     setDarkMode(next);
//     document.documentElement.classList.toggle("dark", next);
//     localStorage.setItem("theme", next ? "dark" : "light");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user_token");
//     setUser(null); // ✅ clear user state immediately
//     window.dispatchEvent(new Event("auth-change"));
//   };

//   // ✅ Derived from real API data
//   const initials = user
//     ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
//     : "?";

//   return (
//     <nav
//       className={`w-full sticky top-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md"
//           : "bg-white dark:bg-[#0F1226]"
//       }`}
//     >
//       <div className="flex items-center justify-between px-4 sm:px-8 md:px-10 lg:px-20 py-2">
//         {/* Logo */}
//         <Link href="/" className="flex items-center">
//           <Image
//             src="/logocoursifydark.jpg.png"
//             alt="Coursify Logo"
//             width={200}
//             height={52}
//             className="object-contain w-[50px] sm:w-[75px] md:w-[90px]"
//             priority
//           />
//         </Link>

//         {/* Desktop Links */}
//         <ul className="hidden md:flex gap-6 lg:gap-10">
//           {navLinks.map((item) => (
//             <li key={item.label}>
//               <Link
//                 href={item.href}
//                 className="text-[#2D368E] dark:text-gray-200 hover:text-blue-600 transition text-xl font-semibold"
//               >
//                 {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* Right */}
//         <div className="flex items-center gap-4 text-[#2D368E] dark:text-gray-200">
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//           >
//             {darkMode ? <Sun size={28} /> : <Moon size={28} />}
//           </button>

//           {/* Profile Dropdown */}
//           <div className="relative">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setProfileOpen((prev) => !prev);
//               }}
//               className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300
//              dark:border-gray-600 cursor-pointer focus:outline-none
//              hover:ring-2 hover:ring-blue-500 transition flex items-center justify-center"
//             >
//               <Avatar imageUrl={user?.imageUrl} initials={initials} size={48} />
//             </button>

//             {profileOpen && (
//               <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
//                 {/* User info header */}
//                 <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 flex-shrink-0 flex items-center justify-center">
//                     {/* ✅ Same Avatar component, different size */}
//                     <Avatar
//                       imageUrl={user?.imageUrl}
//                       initials={initials}
//                       size={48}
//                     />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
//                       {user ? `${user.firstName} ${user.lastName}` : "Guest"}
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                       {user?.email ?? ""}
//                     </p>
//                   </div>
//                 </div>

//                 <Link href="/profile">
//                   <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition">
//                     Profile
//                   </div>
//                 </Link>

//                 <Link href="/my-course">
//                   <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition">
//                     My Course
//                   </div>
//                 </Link>

//                 <div className="border-t border-gray-200 dark:border-gray-700">
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden px-6 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
//           {navLinks.map((item) => (
//             <Link
//               key={item.label}
//               href={item.href}
//               onClick={() => setMenuOpen(false)}
//             >
//               <div className="py-2 border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:text-blue-600 transition text-sm">
//                 {item.label}
//               </div>
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
import { Menu, X, Sun, Moon, Globe, Check, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n"; 

function Avatar({ imageUrl, initials, size = 48 }: { imageUrl?: string | null; initials: string; size?: number; }) {
  const hasImage = imageUrl && imageUrl !== "null" && imageUrl.startsWith("http");
  if (hasImage) {
    return <img src={imageUrl!} alt="avatar" style={{ width: size, height: size }} className="rounded-full object-cover pointer-events-none" />;
  }
  return <span className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-xs font-semibold pointer-events-none">{initials}</span>;
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
        const res = await fetch("/api/users/me", { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 401) {
          localStorage.removeItem("user_token");
          return;
        }
        const data = await res.json();
        setUser(data);
      } catch (err) { console.error(err); }
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
    <nav className={`w-full sticky top-0 z-[100] transition-all duration-300 ${scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg" : "bg-white dark:bg-[#0F1226]"}`}>
      <div className="flex items-center justify-between px-4 sm:px-8 md:px-10 lg:px-20 py-3">
        
        <Link href="/" className="flex items-center">
          <Image src="/logocoursifydark.jpg.png" alt="Logo" width={70} height={52} className="object-contain" priority />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="text-[#2D368E] dark:text-gray-200 font-bold hover:text-blue-700 dark:hover:text-blue-400 transition text-base lg:text-lg uppercase">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-3 sm:gap-5">
          
          {/* ✅ LANGUAGE DROPDOWN */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setLangOpen(!langOpen); setProfileOpen(false); }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-transparent dark:border-gray-700"
            >
              <Globe size={18} className="text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-black uppercase">{currentLang.slice(0, 2)}</span>
              <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <button 
                  onClick={() => handleLanguageChange('en')}
                  className="flex items-center justify-between w-full px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-200"
                >
                  <span className={currentLang.includes('en') ? 'text-blue-600 font-bold' : ''}>English</span>
                  {currentLang.includes('en') && <Check size={16} className="text-blue-600" />}
                </button>
                <button 
                  onClick={() => handleLanguageChange('kh')}
                  className="flex items-center justify-between w-full px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-200"
                >
                  <span className={currentLang.includes('kh') ? 'text-blue-600 font-bold' : ''}>ភាសាខ្មែរ</span>
                  {currentLang.includes('kh') && <Check size={16} className="text-blue-600" />}
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
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? <Sun size={22} className="text-orange-400" /> : <Moon size={22} className="text-blue-900" />}
          </button>

          {/* Profile */}
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setProfileOpen(!profileOpen); setLangOpen(false); }} 
              className="w-11 h-11 rounded-full overflow-hidden border-2 border-blue-500 hover:scale-105 transition-transform"
            >
              <Avatar imageUrl={user?.imageUrl} initials={initials} size={44} />
            </button>
            
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                  <p className="text-sm font-bold dark:text-white">{user ? `${user.firstName} ${user.lastName}` : "Guest Student"}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || "Welcome back!"}</p>
                </div>
                <Link href="/dashboard/teacher" className="flex items-center px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition dark:text-gray-200">{t("Profile")}</Link>
                <button 
                  onClick={() => { localStorage.removeItem("user_token"); window.location.reload(); }}
                  className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold"
                >
                  {t("Sign Out")}
                </button>
              </div>
            )}
          </div>

          {/* Hamburger Icon */}
          <button 
            className="md:hidden p-2 text-blue-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition" 
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ✅ MOBILE DROPDOWN MENU (Restored) */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0F1226] border-t dark:border-gray-800 shadow-xl animate-in slide-in-from-top duration-300 overflow-hidden z-[90]">
          <ul className="flex flex-col p-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link 
                  href={link.href} 
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 px-4 text-lg font-bold text-[#2D368E] dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-xl transition"
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