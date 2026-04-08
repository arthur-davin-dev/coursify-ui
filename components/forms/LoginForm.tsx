"use client";
import { useState } from "react";
import { GraduationCap, MonitorPlay } from "lucide-react";

type Tab = "signin" | "create";
type Role = "student" | "teacher";

export default function LoginForm() {
  const [tab, setTab] = useState<Tab>("signin");
  const [role, setRole] = useState<Role>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignIn = tab === "signin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // your auth logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="w-full max-w-[460px] bg-white rounded-[28px] shadow-2xl shadow-indigo-100/50 p-2.5">

        {/* Tabs */}
        <div className="grid grid-cols-2 bg-[#f0f0f8] rounded-[20px] p-1.5 mb-7">
          {(["signin", "create"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 rounded-[15px] text-[15px] font-semibold transition-all duration-200 ${
                tab === t
                  ? "bg-white text-indigo-700 shadow-md shadow-indigo-100"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <div className="px-5 pb-5">
          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="text-[26px] font-extrabold text-gray-900 mb-1.5">
              {isSignIn ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-sm text-gray-400">
              {isSignIn
                ? "Please enter your details to continue your journey."
                : "Join thousands of learners today."}
            </p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setRole("student")}
              className={`flex flex-col items-center gap-2 py-5 rounded-2xl border-2 transition-all duration-200 ${
                role === "student"
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-100 hover:border-indigo-200"
              }`}
            >
              <GraduationCap
                className={`w-7 h-7 ${role === "student" ? "text-indigo-600" : "text-gray-400"}`}
                strokeWidth={1.8}
              />
              <span
                className={`text-sm font-bold ${role === "student" ? "text-indigo-600" : "text-gray-400"}`}
              >
                I am a Student
              </span>
            </button>

            <button
              onClick={() => setRole("teacher")}
              className={`flex flex-col items-center gap-2 py-5 rounded-2xl border-2 transition-all duration-200 ${
                role === "teacher"
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-100 hover:border-indigo-200"
              }`}
            >
              <MonitorPlay
                className={`w-7 h-7 ${role === "teacher" ? "text-indigo-600" : "text-gray-400"}`}
                strokeWidth={1.8}
              />
              <span
                className={`text-sm font-bold ${role === "teacher" ? "text-indigo-600" : "text-gray-400"}`}
              >
                I am a Teacher
              </span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.rivers@academia.edu"
                className="w-full px-4 py-3.5 rounded-[14px] border-[1.5px] border-gray-100 bg-gray-50 text-[15px] text-gray-900 placeholder-gray-300 outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  Password
                </label>
                {isSignIn && (
                  <a href="#" className="text-[13px] font-semibold text-indigo-600 hover:text-indigo-700">
                    Forgot password?
                  </a>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-[14px] border-[1.5px] border-gray-100 bg-gray-50 text-[15px] text-gray-900 placeholder-gray-300 outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white text-[16px] font-bold tracking-wide transition-all duration-200 mt-2"
            >
              {isSignIn ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-sm text-gray-300">Or continue with</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Social */}
          <div className="flex justify-center gap-4">
            {/* Google */}
            <button className="w-[52px] h-[52px] rounded-[14px] border-[1.5px] border-gray-100 hover:border-indigo-200 bg-white flex items-center justify-center transition-all hover:-translate-y-0.5">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>

            {/* Facebook */}
            <button className="w-[52px] h-[52px] rounded-[14px] border-[1.5px] border-gray-100 hover:border-indigo-200 bg-white flex items-center justify-center transition-all hover:-translate-y-0.5">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1877F2">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </button>

            {/* GitHub */}
            <button className="w-[52px] h-[52px] rounded-[14px] border-[1.5px] border-gray-100 hover:border-indigo-200 bg-white flex items-center justify-center transition-all hover:-translate-y-0.5">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#18181b">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}