// "use client";
// import { useState } from "react";
// import { z } from "zod";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useResetPasswordMutation } from "@/store/features/auth/authApi";
// import { toast } from "sonner";

// const resetSchema = z.object({
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   confirmPassword: z.string()
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

// export default function ResetPasswordForm() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token"); // Extracts token from URL

//   const [form, setForm] = useState({ password: "", confirmPassword: "" });
//   const [errors, setErrors] = useState({});
//   const [resetPassword, { isLoading }] = useResetPasswordMutation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) {
//       toast.error("Invalid or missing reset token.");
//       return;
//     }

//     const result = resetSchema.safeParse(form);
//     if (!result.success) {
//       const fieldErrors = {};
//       result.error.issues.forEach(i => fieldErrors[i.path[0]] = i.message);
//       setErrors(fieldErrors);
//       return;
//     }

//     try {
//       await resetPassword({ token, password: form.password }).unwrap();
//       toast.success("Password reset successfully! Redirecting to login...");
//       setTimeout(() => router.push("/login"), 2000);
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to reset password.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#1a2a50] p-4">
//       <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
//         <h1 className="text-2xl font-bold text-[#1a2a50] text-center mb-2">Create New Password</h1>
//         <p className="text-gray-500 text-sm text-center mb-8">Enter your new secure password below.</p>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* New Password */}
//           <div>
//             <input
//               type="password"
//               placeholder="New Password"
//               className="w-full bg-gray-100 border-2 border-transparent focus:border-blue-500 rounded-xl px-4 py-3 outline-none transition-all"
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//             />
//             {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <input
//               type="password"
//               placeholder="Confirm New Password"
//               className="w-full bg-gray-100 border-2 border-transparent focus:border-blue-500 rounded-xl px-4 py-3 outline-none transition-all"
//               onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
//             />
//             {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
//           >
//             {isLoading ? "Updating..." : "Reset Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { useResetPasswordMutation } from "@/store/features/auth/authApi";
import { toast } from "sonner";

interface Props {
  email: string;   // ← add
  otp: string;     // ← replace token
  onSuccess: () => void;
}

export default function ResetPasswordForm({ email, otp, onSuccess }: Props) {
  const [password, setPassword] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword({
        email,
        otp,
        newPassword: password,  // ← matches backend field name
      }).unwrap();
      toast.success("Password updated successfully!");
      onSuccess();
    } catch (err: any) {
      toast.error(err?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-[#242B4D] rounded-3xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">New Password</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-3 bg-slate-100 dark:bg-[#1A1F3A] rounded-xl outline-none border-2 focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          disabled={isLoading}
          className="cursor-pointer w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}