// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import * as z from "zod";
// import { redirect, useRouter } from "next/navigation";
// import { useState } from "react";
// import Link from "next/link";

// // Mocking actions - replace with your actual imports
// import { signInSocial } from "@/lib/actions/auth-action";
// import { loginAdmin } from "@/lib/admin-auth";

// const formSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(4, "Password must be at least 4 characters"),
// });

// // ── Icons (Condensed for space) ───────────────────────────────
// const GoogleIcon = () => (
//   <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor"/></svg>
// );
// const GitHubIcon = () => (
//   <svg viewBox="0 0 20 20" className="size-5 shrink-0" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/></svg>
// );
// const FacebookIcon = () => (
//   <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/></svg>
// );
// const MailIcon = () => (
//   <svg viewBox="0 0 24 24" className="size-4 text-slate-400 dark:text-gray-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
// );
// const LockIcon = () => (
//   <svg viewBox="0 0 24 24" className="size-4 text-slate-400 dark:text-gray-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
// );
// const EyeIcon = ({ show }: { show: boolean }) => (
//   <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">{show ? <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />}</svg>
// );
// const Spinner = () => (
//   <svg className="size-4 animate-spin shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
// );

// const socialProviders = [
//   { id: "facebook" as const, label: "Facebook", icon: <FacebookIcon /> },
//   { id: "google"   as const, label: "Google",   icon: <GoogleIcon />   },
//   { id: "github"   as const, label: "GitHub",   icon: <GitHubIcon />   },
// ];

// type SocialProvider = "google" | "github" | "facebook";

// // ── Main Component ───────────────────────────────────────────
// // Added `onClose` to the component props
// export function LoginForm({ onClose }: { onClose?: () => void }) {
//   const router = useRouter(); 
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: { email: "", password: "" },
//   });

//   const [isLoading, setIsLoading] = useState<false | "credentials" | SocialProvider>(false);
//   const [error, setError] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const busy = isLoading !== false;

//   async function onSubmit(data: z.infer<typeof formSchema>) {
//     setIsLoading("credentials");
//     setError("");
//     let isSuccess = false;
//     try {
//       await loginAdmin(data);
//       isSuccess = true;
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//     if (isSuccess) redirect("/");
//   }

//   async function handleSocialAuth(provider: SocialProvider) {
//     setIsLoading(provider);
//     setError("");
//     try {
//       await signInSocial(provider);
//     } catch (err) {
//       setError(`${provider} sign-in failed. Please try again.`);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="flex items-center justify-center p-4">
//       {/* Background Palette: White / #242B4D */}
//       <div className="w-full max-w-sm bg-white dark:bg-[#242B4D] rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">

//         {/* Back Button FIX: Use onClose if available, else use router.back */}
//         <div className="px-8 pt-6">
//           <button
//             type="button"
//             onClick={() => {
//               if (onClose) {
//                 onClose(); // This closes the modal/popup without navigating
//               } else {
//                 router.back(); // This navigates away (fallback)
//               }
//             }}
//             className="text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-white transition-colors p-2 -ml-2"
//             aria-label="Close"
//           >
//             <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
//             </svg>
//           </button>
//         </div>

//         {/* Header Section */}
//         <div className="px-8 pt-2 pb-6 text-center">
//           <h1 className="text-2xl font-extrabold tracking-widest text-slate-800 dark:text-white uppercase">Login</h1>
//           <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Welcome back! Let's get you signed in</p>
//         </div>

//         {/* Form Body */}
//         <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="px-8 space-y-4">

//           {/* Email Input: bg-[#EBF3FC] / bg-[#1A1F3A] */}
//           <Controller
//             name="email"
//             control={form.control}
//             render={({ field, fieldState }) => (
//               <div>
//                 <div className={`flex items-center gap-3 bg-[#EBF3FC] dark:bg-[#1A1F3A] rounded-full px-4 py-3 transition-all ${fieldState.invalid ? 'ring-2 ring-red-400' : 'focus-within:ring-2 focus-within:ring-blue-500'}`}>
//                   <MailIcon />
//                   <input
//                     {...field}
//                     placeholder="Email"
//                     autoComplete="email"
//                     className="flex-1 bg-transparent text-sm text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 outline-none"
//                   />
//                 </div>
//                 {fieldState.invalid && <p className="text-red-500 text-xs mt-1 pl-4">{fieldState.error?.message}</p>}
//               </div>
//             )}
//           />

//           {/* Password Input */}
//           <Controller
//             name="password"
//             control={form.control}
//             render={({ field, fieldState }) => (
//               <div>
//                 <div className={`flex items-center gap-3 bg-[#EBF3FC] dark:bg-[#1A1F3A] rounded-full px-4 py-3 transition-all ${fieldState.invalid ? 'ring-2 ring-red-400' : 'focus-within:ring-2 focus-within:ring-blue-500'}`}>
//                   <LockIcon />
//                   <input
//                     {...field}
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     autoComplete="current-password"
//                     className="flex-1 bg-transparent text-sm text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 outline-none"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-white"
//                   >
//                     <EyeIcon show={showPassword} />
//                   </button>
//                 </div>
//                 {fieldState.invalid && <p className="text-red-500 text-xs mt-1 pl-4">{fieldState.error?.message}</p>}
//               </div>
//             )}
//           />

//           {error && <p role="alert" className="text-red-500 text-sm pl-2">{error}</p>}

//           <div className="flex items-center justify-between pt-1">
//             <label className="flex items-center gap-2 cursor-pointer select-none">
//               <div
//                 onClick={() => setRememberMe(!rememberMe)}
//                 className={`size-4 rounded border-2 flex items-center justify-center transition-colors ${rememberMe ? 'bg-blue-600 border-blue-600' : 'border-slate-400 bg-white dark:bg-transparent'}`}
//               >
//                 {rememberMe && <svg viewBox="0 0 12 12" className="size-3 text-white" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" /></svg>}
//               </div>
//               <span className="text-sm text-slate-600 dark:text-gray-300">Remember Me</span>
//             </label>
//             <button type="button" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
//               Forgot Password?
//             </button>
//           </div>

//           {/* Submit Button */}
//           <div className="pt-2 pb-4">
//             <button
//               type="submit"
//               disabled={busy}
//               className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-full transition-all flex items-center justify-center gap-2 text-sm tracking-wide shadow-lg shadow-blue-900/20 active:scale-95"
//             >
//               {isLoading === "credentials" && <Spinner />}
//               {isLoading === "credentials" ? "Signing in..." : "Login Now"}
//             </button>
//           </div>
//         </form>

//         {/* Social Login Section */}
//         <div className="px-8 pb-10">
//           <div className="relative flex items-center justify-center mb-6">
//             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-gray-700"></div></div>
//             <span className="relative px-4 bg-white dark:bg-[#242B4D] text-xs text-slate-500 dark:text-gray-400 uppercase tracking-tight">Other Login with</span>
//           </div>

//           <div className="flex items-center justify-center gap-4">
//             {socialProviders.map(({ id, label, icon }) => (
//               <button
//                 key={id}
//                 type="button"
//                 disabled={busy}
//                 onClick={() => handleSocialAuth(id)}
//                 className="size-12 rounded-full bg-white dark:bg-[#1A1F3A] border border-slate-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 text-gray-800 dark:text-white shadow-sm flex items-center justify-center transition-all disabled:opacity-50"
//               >
//                 {isLoading === id ? <Spinner /> : icon}
//               </button>
//             ))}
//           </div>

//           <p className="text-center text-sm text-slate-500 dark:text-gray-400 mt-8">
//             Don't have an account?{" "}
//             <Link href="/signup" className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-800 transition-colors">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useLoginMutation } from "@/store/features/auth/authApi";
import { toast } from "sonner";
import { signInSocial } from "@/lib/actions/auth-action";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/store/slices/authSlice";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

// ── Icons ─────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true">
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 20 20" className="size-5 shrink-0" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4 text-slate-400 dark:text-gray-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4 text-slate-400 dark:text-gray-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);
const EyeIcon = ({ show }: { show: boolean }) => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    {show
      ? <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      : <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    }
  </svg>
);
const Spinner = () => (
  <svg className="size-4 animate-spin shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const socialProviders = [
  { id: "facebook" as const, label: "Facebook", icon: <FacebookIcon /> },
  { id: "google"   as const, label: "Google",   icon: <GoogleIcon />   },
  { id: "github"   as const, label: "GitHub",   icon: <GitHubIcon />   },
];

type SocialProvider = "google" | "github" | "facebook";

export function LoginForm({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const [socialLoading, setSocialLoading] = useState<false | SocialProvider>(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const busy = isLoginLoading || socialLoading !== false;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setError("");
    try {
      const result = await loginMutation(data).unwrap();

      console.log("Login result:", result); // ✅ check this in browser console

      // ✅ Covers all common Java JWT response shapes
      const token =
        result?.token ??
        result?.accessToken ??
        result?.access_token ??
        result?.data?.token ??
        result?.data?.accessToken;

      if (!token) {
        console.error("No token in response:", result);
        setError("Login failed: no token received");
        return;
      }
      dispatch(setToken(token));
      if (result?.user ?? result?.data?.user) {
        dispatch(setUser(result?.user ?? result?.data?.user));
      }

      localStorage.setItem("user_token", token); // already done in setToken, but keep for safety
      window.dispatchEvent(new Event("auth-change"));
      toast.success("Welcome back!");

      if (onClose) {
        onClose();
      } else {
        router.push("/");
      }
    } catch (err: any) {
      const message = err?.data?.message || err?.data?.error || "Invalid email or password";
      setError(message);
      toast.error(message);
    }
  }

  async function handleSocialAuth(provider: SocialProvider) {
    setSocialLoading(provider);
    setError("");
    try {
      await signInSocial(provider);
    } catch {
      setError(`${provider} sign-in failed. Please try again.`);
    } finally {
      setSocialLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white dark:bg-[#242B4D] rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">

        {/* Back Button */}
        <div className="px-8 pt-6">
          <button
            type="button"
            onClick={() => onClose ? onClose() : router.back()}
            className="text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-white transition-colors p-2 -ml-2"
            aria-label="Go back"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
        </div>

        {/* Header */}
        <div className="px-8 pt-2 pb-6 text-center">
          <h1 className="text-2xl font-extrabold tracking-widest text-slate-800 dark:text-white uppercase">Login</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Welcome back! Let's get you signed in</p>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-8 space-y-4">

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <div>
                <div className={`flex items-center gap-3 bg-[#EBF3FC] dark:bg-[#1A1F3A] rounded-full px-4 py-3 transition-all ${fieldState.invalid ? "ring-2 ring-red-400" : "focus-within:ring-2 focus-within:ring-blue-500"}`}>
                  <MailIcon />
                  <input
                    {...field}
                    placeholder="Email"
                    autoComplete="email"
                    className="flex-1 bg-transparent text-sm text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 outline-none"
                  />
                </div>
                {fieldState.invalid && <p className="text-red-500 text-xs mt-1 pl-4">{fieldState.error?.message}</p>}
              </div>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <div>
                <div className={`flex items-center gap-3 bg-[#EBF3FC] dark:bg-[#1A1F3A] rounded-full px-4 py-3 transition-all ${fieldState.invalid ? "ring-2 ring-red-400" : "focus-within:ring-2 focus-within:ring-blue-500"}`}>
                  <LockIcon />
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    autoComplete="current-password"
                    className="flex-1 bg-transparent text-sm text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 outline-none"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-white">
                    <EyeIcon show={showPassword} />
                  </button>
                </div>
                {fieldState.invalid && <p className="text-red-500 text-xs mt-1 pl-4">{fieldState.error?.message}</p>}
              </div>
            )}
          />

          {/* Server error */}
          {error && <p role="alert" className="text-red-500 text-sm pl-2">{error}</p>}

          {/* Remember me + Forgot */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setRememberMe(!rememberMe)}
                className={`size-4 rounded border-2 flex items-center justify-center transition-colors ${rememberMe ? "bg-blue-600 border-blue-600" : "border-slate-400 bg-white dark:bg-transparent"}`}
              >
                {rememberMe && (
                  <svg viewBox="0 0 12 12" className="size-3 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-slate-600 dark:text-gray-300">Remember Me</span>
            </label>
            <button type="button" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <div className="pt-2 pb-4">
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-full transition-all flex items-center justify-center gap-2 text-sm tracking-wide shadow-lg shadow-blue-900/20 active:scale-95"
            >
              {isLoginLoading && <Spinner />}
              {isLoginLoading ? "Signing in..." : "Login Now"}
            </button>
          </div>
        </form>

        {/* Social Login */}
        <div className="px-8 pb-10">
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-gray-700" />
            </div>
            <span className="relative px-4 bg-white dark:bg-[#242B4D] text-xs text-slate-500 dark:text-gray-400 uppercase tracking-tight">
              Other Login with
            </span>
          </div>

          <div className="flex items-center justify-center gap-4">
            {socialProviders.map(({ id, label, icon }) => (
              <button
                key={id}
                type="button"
                disabled={busy}
                onClick={() => handleSocialAuth(id)}
                aria-label={`Sign in with ${label}`}
                className="size-12 rounded-full bg-white dark:bg-[#1A1F3A] border border-slate-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 text-gray-800 dark:text-white shadow-sm flex items-center justify-center transition-all disabled:opacity-50"
              >
                {socialLoading === id ? <Spinner /> : icon}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-gray-400 mt-8">
            Don't have an account?{" "}
            <Link href="/signup" className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-800 transition-colors">
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}