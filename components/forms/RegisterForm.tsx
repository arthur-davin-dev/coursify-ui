// "use client";

// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import {
//   Mail,
//   Lock,
//   User,
//   GraduationCap,
//   School,
//   Loader2,
//   ArrowRight,
//   EyeOff,
//   Eye,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";

// const registerSchema = z.object({
//   username: z.string().min(3, "Username must be at least 3 characters"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   firstName: z.string().min(1, "First name is required"),
//   lastName: z.string().min(1, "Last name is required"),
//   gender: z.enum(["MALE", "FEMALE"]),
//   role: z.enum(["STUDENT", "TEACHER"]),
// });

// export type RegisterFormData = z.infer<typeof registerSchema>;

// interface RegisterFormProps {
//   onSubmit: (data: RegisterFormData) => void;
//   isLoading: boolean;
//   onClose?: () => void;
//   onSignIn?: () => void;
// }

// // Reusable input wrapper
// function InputField({
//   icon: Icon,
//   error,
//   children,
// }: {
//   icon: React.ElementType;
//   error?: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div>
//       <div className="relative">
//         <Icon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
//         {children}
//       </div>
//       {error && <p className="text-red-500 text-xs mt-1 pl-1">{error}</p>}
//     </div>
//   );
// }

// export function RegisterForm({
//   onSubmit,
//   isLoading,
//   onClose,
//   onSignIn,
// }: RegisterFormProps) {
//   const router = useRouter();
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormData>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//       firstName: "",
//       lastName: "",
//       gender: "MALE",
//       role: "STUDENT",
//     },
//   });

//   const inputClass =
//     "w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm";
//   const [showPassword, setShowPassword] = useState(false);
//   return (
//     <div className="w-full max-w-[440px] bg-white dark:bg-[#242B4D] rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-gray-800">
//       <div className="px-8 pt-6">
//         <button
//           type="button"
//           onClick={() => (onClose ? onClose() : router.back())}
//           className="cursor-pointer text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-white transition-colors p-2 -ml-2"
//           aria-label="Go back"
//         >
//           <svg
//             viewBox="0 0 24 24"
//             className="size-5"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
//             />
//           </svg>
//         </button>
//       </div>
//       <div className="px-8 pt-2 pb-6 text-center">
//         <h2 className="text-2xl font-extrabold tracking-widest text-slate-800 dark:text-white uppercase">
//           Create Account
//         </h2>
//         <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
//           Join us today and start learning
//         </p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Role Toggle */}
//         <Controller
//           name="role"
//           control={control}
//           render={({ field }) => (
//             <div className="grid grid-cols-2 gap-3">
//               {(["STUDENT", "TEACHER"] as const).map((r) => (
//                 <button
//                   key={r}
//                   type="button"
//                   onClick={() => field.onChange(r)}
//                   className={`cursor-pointer py-3 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all text-sm font-medium ${
//                     field.value === r
//                       ? "border-blue-600 bg-blue-50 text-blue-600"
//                       : "border-gray-100 text-gray-400"
//                   }`}
//                 >
//                   {r === "STUDENT" ? (
//                     <GraduationCap size={18} />
//                   ) : (
//                     <School size={18} />
//                   )}
//                   {r.charAt(0) + r.slice(1).toLowerCase()}
//                 </button>
//               ))}
//             </div>
//           )}
//         />

//         {/* First Name + Last Name side by side */}
//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <Controller
//               name="firstName"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   placeholder="First Name"
//                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
//                 />
//               )}
//             />
//             {errors.firstName && (
//               <p className="text-red-500 text-xs mt-1 pl-1">
//                 {errors.firstName.message}
//               </p>
//             )}
//           </div>
//           <div>
//             <Controller
//               name="lastName"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   placeholder="Last Name"
//                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
//                 />
//               )}
//             />
//             {errors.lastName && (
//               <p className="text-red-500 text-xs mt-1 pl-1">
//                 {errors.lastName.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Username */}
//         <InputField icon={User} error={errors.username?.message}>
//           <Controller
//             name="username"
//             control={control}
//             render={({ field }) => (
//               <input {...field} placeholder="Username" className={inputClass} />
//             )}
//           />
//         </InputField>

//         {/* Email */}
//         <InputField icon={Mail} error={errors.email?.message}>
//           <Controller
//             name="email"
//             control={control}
//             render={({ field }) => (
//               <input
//                 {...field}
//                 type="email"
//                 placeholder="Email Address"
//                 className={inputClass}
//               />
//             )}
//           />
//         </InputField>

//         {/* Password */}

//         <InputField icon={Lock} error={errors.password?.message}>
//           <Controller
//             name="password"
//             control={control}
//             render={({ field }) => (
//               <input
//                 {...field}
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className={inputClass}
//                 style={{ paddingRight: "2.75rem" }}
//               />
//             )}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword((v) => !v)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             tabIndex={-1}
//             aria-label={showPassword ? "Hide password" : "Show password"}
//           >
//             {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//           </button>
//         </InputField>

//         {/* Gender Toggle */}
//         <Controller
//           name="gender"
//           control={control}
//           render={({ field }) => (
//             <div className="grid grid-cols-2 gap-3">
//               {(["MALE", "FEMALE"] as const).map((g) => (
//                 <button
//                   key={g}
//                   type="button"
//                   onClick={() => field.onChange(g)}
//                   className={`cursor-pointer py-3 rounded-2xl border-2 text-sm font-medium transition-all ${
//                     field.value === g
//                       ? "border-blue-600 bg-blue-50 text-blue-600"
//                       : "border-gray-100 text-gray-400"
//                   }`}
//                 >
//                   {g.charAt(0) + g.slice(1).toLowerCase()}
//                 </button>
//               ))}
//             </div>
//           )}
//         />

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="cursor-pointer w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
//         >
//           {isLoading ? (
//             <Loader2 className="animate-spin" size={18} />
//           ) : (
//             <>
//               Register <ArrowRight size={18} />
//             </>
//           )}
//         </button>
//         <p className="text-center text-sm text-slate-500 dark:text-gray-400 pt-2">
//           Already have an account?{" "}
//           <button
//             type="button"
//             onClick={() => {
//               if (onSignIn) {
//                 onSignIn(); // ← opens login modal
//               } else {
//                 onClose?.();
//                 router.push("/login");
//               }
//             }}
//             className="cursor-pointer text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
//           >
//             Sign in
//           </button>
//         </p>
//       </form>
//     </div>
//   );
// }


"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Lock,
  User,
  GraduationCap,
  School,
  Loader2,
  ArrowRight,
  EyeOff,
  Eye,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "At least 3 characters")
    .max(20, "Max 20 characters")
    .regex(/^[a-zA-Z]/, "Must start with a letter")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscores (_)"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "At least 6 characters")
    .regex(/[A-Z]/, "One uppercase letter required")
    .regex(/[0-9]/, "One number required")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "One special character required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.enum(["MALE", "FEMALE"]),
  role: z.enum(["STUDENT", "TEACHER"]),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isLoading: boolean;
  onClose?: () => void;
  onSignIn?: () => void;
}

// ─── Reusable input wrapper ───────────────────────────────────────────────────
function InputField({
  icon: Icon,
  error,
  children,
}: {
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        {children}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-red-500 text-xs mt-1 pl-1">
          <XCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Username hint row ────────────────────────────────────────────────────────
function UsernameHints({ value }: { value: string }) {
  if (!value) return null;

  const checks = [
    { label: "At least 3 characters", ok: value.length >= 3 },
    { label: "Starts with a letter", ok: /^[a-zA-Z]/.test(value) },
    { label: "Only letters, numbers, underscores", ok: /^[a-zA-Z0-9_]+$/.test(value) },
  ];

  return (
    <div className="mt-2 space-y-1 pl-1">
      {checks.map((c) => (
        <p
          key={c.label}
          className={`flex items-center gap-1.5 text-xs transition-colors ${
            c.ok ? "text-green-600 dark:text-green-400" : "text-red-500"
          }`}
        >
          {c.ok ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
          {c.label}
        </p>
      ))}
    </div>
  );
}

// ─── Password strength meter ──────────────────────────────────────────────────
function PasswordStrength({ value }: { value: string }) {
  if (!value) return null;

  const checks = [
    { label: "At least 6 characters", ok: value.length >= 6 },
    { label: "One uppercase letter (A–Z)", ok: /[A-Z]/.test(value) },
    { label: "One number (0–9)", ok: /[0-9]/.test(value) },
    { label: "One special character (!@#$…)", ok: /[!@#$%^&*(),.?":{}|<>]/.test(value) },
  ];

  const score = checks.filter((c) => c.ok).length;

  const segColors = ["#EF4444", "#F97316", "#EAB308", "#22C55E"];
  const strengthLabels = ["Too weak", "Weak", "Good", "Strong"];
  const strengthTextColors = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-green-600 dark:text-green-400",
  ];

  return (
    <div className="mt-2 space-y-2">
      {/* Strength bar */}
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              background: i < score ? segColors[score - 1] : "#E5E7EB",
            }}
          />
        ))}
      </div>

      {/* Strength label */}
      <p className={`text-xs font-medium ${strengthTextColors[score - 1] ?? "text-gray-400"}`}>
        {score === 0 ? "Enter a password" : strengthLabels[score - 1]}
      </p>

      {/* Per-rule hints */}
      <div className="space-y-1 pl-1">
        {checks.map((c) => (
          <p
            key={c.label}
            className={`flex items-center gap-1.5 text-xs transition-colors ${
              c.ok ? "text-green-600 dark:text-green-400" : "text-red-500"
            }`}
          >
            {c.ok ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
            {c.label}
          </p>
        ))}
      </div>
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────
export function RegisterForm({
  onSubmit,
  isLoading,
  onClose,
  onSignIn,
}: RegisterFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: "MALE",
      role: "STUDENT",
    },
  });

  const usernameValue = watch("username");
  const passwordValue = watch("password");

  const inputClass =
    "w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm";

  const handleValidSubmit = (data: RegisterFormData) => {
    onSubmit(data);
    // Toast is fired from parent after API call.
    // If you want an optimistic toast here, uncomment:
    // toast.success("Account created successfully!");
  };

  const handleInvalidSubmit = () => {
    toast.error("Please fix the errors before continuing.");
  };

  return (
    <div
      className="register-scroll w-full max-w-[440px] max-h-[90vh] overflow-y-auto bg-white dark:bg-[#242B4D] rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-gray-800"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* Back button */}
      <div className="px-8 pt-6">
        <button
          type="button"
          onClick={() => (onClose ? onClose() : router.back())}
          className="cursor-pointer text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-white transition-colors p-2 -ml-2"
          aria-label="Go back"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      </div>

      {/* Header */}
      <div className="px-8 pt-2 pb-6 text-center">
        <h2 className="text-2xl font-extrabold tracking-widest text-slate-800 dark:text-white uppercase">
          Create Account
        </h2>
        <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
          Join us today and start learning
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}
        className="space-y-4"
      >
        {/* ── Role Toggle ── */}
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-3">
              {(["STUDENT", "TEACHER"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => field.onChange(r)}
                  className={`cursor-pointer py-3 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all text-sm font-medium ${
                    field.value === r
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-600"
                      : "border-gray-100 dark:border-gray-700 text-gray-400"
                  }`}
                >
                  {r === "STUDENT" ? <GraduationCap size={18} /> : <School size={18} />}
                  {r.charAt(0) + r.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          )}
        />

        {/* ── First Name + Last Name ── */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="First Name"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
              )}
            />
            {errors.firstName && (
              <p className="flex items-center gap-1 text-red-500 text-xs mt-1 pl-1">
                <XCircle size={11} />
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Last Name"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
              )}
            />
            {errors.lastName && (
              <p className="flex items-center gap-1 text-red-500 text-xs mt-1 pl-1">
                <XCircle size={11} />
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* ── Username ── */}
        <div>
          <InputField icon={User} error={errors.username?.message}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Username"
                  className={inputClass}
                />
              )}
            />
            {/* live valid checkmark */}
            {usernameValue && !errors.username && (
              <CheckCircle2
                size={15}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
              />
            )}
          </InputField>
          <UsernameHints value={usernameValue} />
        </div>

        {/* ── Email ── */}
        <InputField icon={Mail} error={errors.email?.message}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder="Email Address"
                className={inputClass}
              />
            )}
          />
        </InputField>

        {/* ── Password ── */}
        <div>
          <InputField icon={Lock} error={errors.password?.message}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={inputClass}
                  style={{ paddingRight: "2.75rem" }}
                />
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </InputField>
          <PasswordStrength value={passwordValue} />
        </div>

        {/* ── Gender Toggle ── */}
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-3">
              {(["MALE", "FEMALE"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => field.onChange(g)}
                  className={`cursor-pointer py-3 rounded-2xl border-2 text-sm font-medium transition-all ${
                    field.value === g
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-600"
                      : "border-gray-100 dark:border-gray-700 text-gray-400"
                  }`}
                >
                  {g.charAt(0) + g.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          )}
        />

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              Register <ArrowRight size={18} />
            </>
          )}
        </button>

        <p className="text-center text-sm text-slate-500 dark:text-gray-400 pt-2">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              if (onSignIn) {
                onSignIn();
              } else {
                onClose?.();
                router.push("/login");
              }
            }}
            className="cursor-pointer text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign in
          </button>
        </p>
      </form>

      {/* Hide scrollbar for all browsers */}
      <style>{`.register-scroll::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}