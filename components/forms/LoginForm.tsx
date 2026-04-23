// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import * as z from "zod";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useLoginMutation } from "@/store/features/auth/authApi";
// import { toast } from "sonner";
// import { signInSocial } from "@/lib/actions/auth-action";
// import { useDispatch } from "react-redux";
// import { setToken, setUser } from "@/store/slices/authSlice";

// const formSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(4, "Password must be at least 4 characters"),
// });

// // ── Icons ─────────────────────────────────────────────────────
// const GoogleIcon = () => (
//   <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true">
//     <path
//       d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
//       fill="currentColor"
//     />
//   </svg>
// );
// const GitHubIcon = () => (
//   <svg
//     viewBox="0 0 20 20"
//     className="size-5 shrink-0"
//     fill="currentColor"
//     aria-hidden="true"
//   >
//     <path
//       fillRule="evenodd"
//       d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
//       clipRule="evenodd"
//     />
//   </svg>
// );
// const FacebookIcon = () => (
//   <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true">
//     <path
//       d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
//       fill="#1877F2"
//     />
//   </svg>
// );
// const MailIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     className="size-4 text-slate-400 dark:text-gray-500 shrink-0"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
//     />
//   </svg>
// );
// const LockIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     className="size-4 text-slate-400 dark:text-gray-500 shrink-0"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
//     />
//   </svg>
// );
// const EyeIcon = ({ show }: { show: boolean }) => (
//   <svg
//     viewBox="0 0 24 24"
//     className="size-4"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//   >
//     {show ? (
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
//       />
//     ) : (
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
//       />
//     )}
//   </svg>
// );
// const Spinner = () => (
//   <svg
//     className="size-4 animate-spin shrink-0"
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//   >
//     <circle
//       className="opacity-25"
//       cx="12"
//       cy="12"
//       r="10"
//       stroke="currentColor"
//       strokeWidth="4"
//     />
//     <path
//       className="opacity-75"
//       fill="currentColor"
//       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//     />
//   </svg>
// );

// const socialProviders = [
//   { id: "facebook" as const, label: "Facebook", icon: <FacebookIcon /> },
//   { id: "google" as const, label: "Google", icon: <GoogleIcon /> },
//   { id: "github" as const, label: "GitHub", icon: <GitHubIcon /> },
// ];

// type SocialProvider = "google" | "github" | "facebook";

// export function LoginForm({
//   onClose,
//   onForgotPassword,
//   onSignUp,
//   onSignIn,
// }: {
//   onClose?: () => void;
//   onForgotPassword?: () => void;
//   onSignUp?: () => void;
//   onSignIn?: () => void;
// }) {
//   const router = useRouter();

//   const dispatch = useDispatch();
//   const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: { email: "", password: "" },
//   });

//   const [socialLoading, setSocialLoading] = useState<false | SocialProvider>(
//     false,
//   );
//   const [error, setError] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const busy = isLoginLoading || socialLoading !== false;

//   async function onSubmit(data: z.infer<typeof formSchema>) {
//     setError("");
//     try {
//       const result = await loginMutation(data).unwrap();

//       console.log("Login result:", result); // ✅ check this in browser console

//       // ✅ Covers all common Java JWT response shapes
//       const token =
//         result?.token ??
//         result?.accessToken ??
//         result?.access_token ??
//         result?.data?.token ??
//         result?.data?.accessToken;

//       if (!token) {
//         console.error("No token in response:", result);
//         setError("Login failed: no token received");
//         return;
//       }
//       dispatch(setToken(token));
//       if (result?.user ?? result?.data?.user) {
//         dispatch(setUser(result?.user ?? result?.data?.user));
//       }

//       localStorage.setItem("user_token", token); // already done in setToken, but keep for safety
//       document.cookie = `user_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
//       router.push("/");
//       window.dispatchEvent(new Event("auth-change"));
//       toast.success("Welcome back!");

//       if (onClose) {
//         onClose();
//       } else {
//         if (window.history.length > 1) {
//           router.back();
//         } else {
//           router.push("/"); // fallback
//         }
//       }
//     } catch (err: any) {
//       const message =
//         err?.data?.message || err?.data?.error || "Invalid email or password";
//       setError(message);
//       toast.error(message);
//     }
//   }

//   async function handleSocialAuth(provider: SocialProvider) {
//     setSocialLoading(provider);
//     setError("");
//     try {
//       await signInSocial(provider);
//     } catch {
//       setError(`${provider} sign-in failed. Please try again.`);
//     } finally {
//       setSocialLoading(false);
//     }
//   }

//   return (
//     <div className="flex items-center justify-center p-4">
//       <div className="w-full max-w-sm bg-white dark:bg-[#242B4D] rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
//         {/* Back Button */}
//         <div className="px-8 pt-6">
//           <button
//             type="button"
//             onClick={() => (onClose ? onClose() : router.back())}
//             className="cursor-pointer text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-white transition-colors p-2 -ml-2"
//             aria-label="Go back"
//           >
//             <svg
//               viewBox="0 0 24 24"
//               className="size-5"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Header */}
//         <div className="px-8 pt-2 pb-6 text-center">
//           <h1 className="text-2xl font-extrabold tracking-widest text-slate-800 dark:text-white uppercase">
//             Login
//           </h1>
//           <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
//             Welcome back! Let's get you signed in
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={form.handleSubmit(onSubmit)} className="px-8 space-y-4">
//           {/* Email */}
//           <Controller
//             name="email"
//             control={form.control}
//             render={({ field, fieldState }) => (
//               <div>
//                 <div
//                   className={`flex items-center gap-3 bg-[#EBF3FC] dark:bg-[#1A1F3A] rounded-full px-4 py-3 transition-all ${fieldState.invalid ? "ring-2 ring-red-400" : "focus-within:ring-2 focus-within:ring-blue-500"}`}
//                 >
//                   <MailIcon />
//                   <input
//                     {...field}
//                     placeholder="Email"
//                     autoComplete="email"
//                     className="flex-1 bg-transparent text-sm text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 outline-none"
//                   />
//                 </div>
//                 {fieldState.invalid && (
//                   <p className="text-red-500 text-xs mt-1 pl-4">
//                     {fieldState.error?.message}
//                   </p>
//                 )}
//               </div>
//             )}
//           />

//           {/* Password */}
//           <Controller
//             name="password"
//             control={form.control}
//             render={({ field, fieldState }) => (
//               <div>
//                 <div
//                   className={`flex items-center gap-3 bg-[#EBF3FC] dark:bg-[#1A1F3A] rounded-full px-4 py-3 transition-all ${fieldState.invalid ? "ring-2 ring-red-400" : "focus-within:ring-2 focus-within:ring-blue-500"}`}
//                 >
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
//                     className="cursor-pointer text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-white"
//                   >
//                     <EyeIcon show={showPassword} />
//                   </button>
//                 </div>
//                 {fieldState.invalid && (
//                   <p className="text-red-500 text-xs mt-1 pl-4">
//                     {fieldState.error?.message}
//                   </p>
//                 )}
//               </div>
//             )}
//           />

//           {/* Server error */}
//           {error && (
//             <p role="alert" className="text-red-500 text-sm pl-2">
//               {error}
//             </p>
//           )}

//           {/* Remember me + Forgot */}
//           <div className="flex items-center justify-between pt-1">
//             <label className="flex items-center gap-2 cursor-pointer select-none">
//               <div
//                 onClick={() => setRememberMe(!rememberMe)}
//                 className={`size-4 rounded border-2 flex items-center justify-center transition-colors ${rememberMe ? "bg-blue-600 border-blue-600" : "border-slate-400 bg-white dark:bg-transparent"}`}
//               >
//                 {rememberMe && (
//                   <svg
//                     viewBox="0 0 12 12"
//                     className="size-3 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M2 6l3 3 5-5"
//                     />
//                   </svg>
//                 )}
//               </div>
//               <span className="text-sm text-slate-600 dark:text-gray-300">
//                 Remember Me
//               </span>
//             </label>
//             <button
//               type="button"
//               onClick={
//                 onForgotPassword ?? (() => router.push("/forgot-password"))
//               }
//               className="cursor-pointer text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
//             >
//               Forgot Password?
//             </button>
//           </div>

//           {/* Submit */}
//           <div className="pt-2 pb-4">
//             <button
//               type="submit"
//               disabled={busy}
//               className="cursor-pointer w-full bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-full transition-all flex items-center justify-center gap-2 text-sm tracking-wide shadow-lg shadow-blue-900/20 active:scale-95"
//             >
//               {isLoginLoading && <Spinner />}
//               {isLoginLoading ? "Signing in..." : "Login Now"}
//             </button>
//           </div>
//         </form>

//         {/* Social Login */}
//         <div className="px-8 pb-10">
//           <div className="relative flex items-center justify-center mb-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-slate-200 dark:border-gray-700" />
//             </div>
//             <span className="relative px-4 bg-white dark:bg-[#242B4D] text-xs text-slate-500 dark:text-gray-400 uppercase tracking-tight">
//               Other Login with
//             </span>
//           </div>

//           <div className="flex items-center justify-center gap-4">
//             {socialProviders.map(({ id, label, icon }) => (
//               <button
//                 key={id}
//                 type="button"
//                 disabled={busy}
//                 onClick={() => handleSocialAuth(id)}
//                 aria-label={`Sign in with ${label}`}
//                 className="cursor-pointer size-12 rounded-full bg-white dark:bg-[#1A1F3A] border border-slate-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 text-gray-800 dark:text-white shadow-sm flex items-center justify-center transition-all disabled:opacity-50"
//               >
//                 {socialLoading === id ? <Spinner /> : icon}
//               </button>
//             ))}
//           </div>

//           <p className="text-center text-sm text-slate-500 dark:text-gray-400 mt-8">
//             Don't have an account?{" "}
//             <button
//               type="button"
//               onClick={() => {
//                 if (onSignUp) {
//                   onSignUp(); // ← opens signup modal
//                 } else {
//                   onClose?.();
//                   router.push("/signup");
//                 }
//               }}
//               className="cursor-pointer text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
//             >
//               Sign up
//             </button>
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
import { useLoginMutation } from "@/store/features/auth/authApi";
import { toast } from "sonner";
import { signInSocial } from "@/lib/actions/auth-action";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/store/slices/authSlice";

// ── Schema ────────────────────────────────────────────────────
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

// ── Types ─────────────────────────────────────────────────────
type Role = "STUDENT" | "TEACHER";
type Provider = "google" | "github" | "facebook";

// ── Icons ─────────────────────────────────────────────────────
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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
    {show ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    )}
  </svg>
);

const Spinner = () => (
  <svg className="size-4 animate-spin shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const StudentIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

const TeacherIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 14.25l2.25 2.25 4.5-4.5" />
  </svg>
);

// ── Social providers list ─────────────────────────────────────
const socialProviders: { id: Provider; label: string; icon: React.ReactNode }[] = [
  { id: "google",   label: "Google",   icon: <GoogleIcon />   },
  { id: "github",   label: "GitHub",   icon: <GitHubIcon />   },
  { id: "facebook", label: "Facebook", icon: <FacebookIcon /> },
];

// ── Role Picker Modal ─────────────────────────────────────────
function RolePickerModal({
  provider,
  onSelect,
  onCancel,
  isLoading,
}: {
  provider: Provider;
  onSelect: (role: Role) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const providerLabel = provider.charAt(0).toUpperCase() + provider.slice(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-white dark:bg-[#242B4D] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-8 pt-8 pb-4 text-center">
          <div className="size-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
            {provider === "google" && <GoogleIcon />}
            {provider === "github" && <GitHubIcon />}
            {provider === "facebook" && <FacebookIcon />}
          </div>
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white tracking-wide">
            Continue with {providerLabel}
          </h2>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
            Select your role to get started
          </p>
        </div>

        {/* Role Cards */}
        <div className="px-8 pb-6 space-y-3">
          {(["STUDENT", "TEACHER"] as Role[]).map((role) => (
            <button
              key={role}
              type="button"
              disabled={isLoading}
              onClick={() => setSelectedRole(role)}
              className={`
                cursor-pointer w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left
                ${selectedRole === role
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500"
                  : "border-slate-200 dark:border-gray-700 bg-white dark:bg-[#1A1F3A] hover:border-blue-300 dark:hover:border-blue-700"
                }
                disabled:opacity-50
              `}
            >
              {/* Radio circle */}
              <div
                className={`
                  size-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                  ${selectedRole === role
                    ? "border-blue-600 bg-blue-600 dark:border-blue-500 dark:bg-blue-500"
                    : "border-slate-300 dark:border-gray-600"
                  }
                `}
              >
                {selectedRole === role && (
                  <div className="size-2 rounded-full bg-white" />
                )}
              </div>

              {/* Icon */}
              <div
                className={`
                  size-10 rounded-xl flex items-center justify-center shrink-0 transition-colors
                  ${selectedRole === role
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400"
                  }
                `}
              >
                {role === "STUDENT" ? <StudentIcon /> : <TeacherIcon />}
              </div>

              {/* Text */}
              <div>
                <p
                  className={`font-bold text-sm capitalize ${selectedRole === role ? "text-blue-700 dark:text-blue-300" : "text-slate-700 dark:text-white"}`}
                >
                  {role.charAt(0) + role.slice(1).toLowerCase()} {/* → "Student" / "Teacher" */}
</p>
                <p className="text-xs text-slate-400 dark:text-gray-500 mt-0.5">
                  {role === "STUDENT"
                    ? "Access courses & learning materials"
                    : "Create & manage your courses"}
                </p>
              </div>
            </button>
          ))}

          {/* Confirm button */}
          <button
            type="button"
            disabled={!selectedRole || isLoading}
            onClick={() => selectedRole && onSelect(selectedRole)}
            className="
              cursor-pointer w-full mt-2 bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-blue-600 dark:hover:bg-blue-700
              disabled:opacity-40 disabled:cursor-not-allowed
              text-white font-bold py-3.5 rounded-full transition-all flex items-center justify-center gap-2
              text-sm tracking-wide shadow-lg shadow-blue-900/20 active:scale-95
            "
          >
            {isLoading && <Spinner />}
            {isLoading ? "Connecting..." : `Continue as ${selectedRole ?? "..."}`}
          </button>

          {/* Cancel */}
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="cursor-pointer w-full py-2 text-sm text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main LoginForm ────────────────────────────────────────────
export function LoginForm({
  onClose,
  onForgotPassword,
  onSignUp,
}: {
  onClose?: () => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  // Email/password state
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Social auth state
  const [pendingProvider, setPendingProvider] = useState<Provider | null>(null); // which provider triggered role picker
  const [socialLoading, setSocialLoading] = useState<Provider | null>(null);     // provider currently in-flight

  const busy = isLoginLoading || socialLoading !== null;

  // ── Email/password submit ──────────────────────────────────
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setError("");
    try {
      const result = await loginMutation(data).unwrap();

      const token =
        result?.token ??
        result?.accessToken ??
        result?.access_token ??
        result?.data?.token ??
        result?.data?.accessToken;

      if (!token) {
        setError("Login failed: no token received");
        return;
      }

      dispatch(setToken(token));
      if (result?.user ?? result?.data?.user) {
        dispatch(setUser(result?.user ?? result?.data?.user));
      }

      localStorage.setItem("user_token", token);
      document.cookie = `user_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
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

  // ── Social: step 1 — open role picker ─────────────────────
  function handleSocialClick(provider: Provider) {
    if (busy) return;
    setPendingProvider(provider); // opens the modal
  }

  // ── Social: step 2 — role chosen, call signInSocial ───────
  async function handleRoleSelected(role: Role) {
    if (!pendingProvider) return;
    const provider = pendingProvider;
    setSocialLoading(provider);
    setError("");
    try {
      await signInSocial(provider, role);
      // signInSocial typically redirects; if it resolves, close modal
      setPendingProvider(null);
    } catch {
      setError(`${provider} sign-in failed. Please try again.`);
      toast.error(`${provider} sign-in failed. Please try again.`);
      setPendingProvider(null);
    } finally {
      setSocialLoading(null);
    }
  }

  function handleRoleCancel() {
    if (socialLoading) return; // don't cancel mid-flight
    setPendingProvider(null);
  }

  return (
    <>
      {/* ── Role Picker Modal (portal-like overlay) ── */}
      {pendingProvider && (
        <RolePickerModal
          provider={pendingProvider}
          onSelect={handleRoleSelected}
          onCancel={handleRoleCancel}
          isLoading={socialLoading !== null}
        />
      )}

      {/* ── Login Card ── */}
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white dark:bg-[#242B4D] rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">

          {/* Back Button */}
          <div className="px-8 pt-6">
            <button
              type="button"
              onClick={() => (onClose ? onClose() : router.back())}
              className="cursor-pointer text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-white transition-colors p-2 -ml-2"
              aria-label="Go back"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
          </div>

          {/* Header */}
          <div className="px-8 pt-2 pb-6 text-center">
            <h1 className="text-2xl font-extrabold tracking-widest text-slate-800 dark:text-white uppercase">
              Login
            </h1>
            <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
              Welcome back! Let's get you signed in
            </p>
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
                  {fieldState.invalid && (
                    <p className="text-red-500 text-xs mt-1 pl-4">{fieldState.error?.message}</p>
                  )}
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
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-white"
                    >
                      <EyeIcon show={showPassword} />
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <p className="text-red-500 text-xs mt-1 pl-4">{fieldState.error?.message}</p>
                  )}
                </div>
              )}
            />

            {/* Server error */}
            {error && (
              <p role="alert" className="text-red-500 text-sm pl-2">{error}</p>
            )}

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
              <button
                type="button"
                onClick={onForgotPassword ?? (() => router.push("/forgot-password"))}
                className="cursor-pointer text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <div className="pt-2 pb-4">
              <button
                type="submit"
                disabled={busy}
                className="cursor-pointer w-full bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-full transition-all flex items-center justify-center gap-2 text-sm tracking-wide shadow-lg shadow-blue-900/20 active:scale-95"
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
                  onClick={() => handleSocialClick(id)}
                  aria-label={`Sign in with ${label}`}
                  className="cursor-pointer size-12 rounded-full bg-white dark:bg-[#1A1F3A] border border-slate-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 text-gray-800 dark:text-white shadow-sm flex items-center justify-center transition-all disabled:opacity-50"
                >
                  {socialLoading === id ? <Spinner /> : icon}
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-slate-500 dark:text-gray-400 mt-8">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  if (onSignUp) {
                    onSignUp();
                  } else {
                    onClose?.();
                    router.push("/signup");
                  }
                }}
                className="cursor-pointer text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}