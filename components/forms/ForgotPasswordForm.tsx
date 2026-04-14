"use client";
import { useState } from "react";
import { useForgotPasswordMutation } from "@/store/features/auth/authApi";
import { toast } from "sonner";

interface Props {
  onSuccess: (email: string) => void;
}

export default function ForgotPasswordForm({ onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Call RTK Mutation
      await forgotPassword({ email }).unwrap();
      toast.success("OTP sent to your email!");
      
      // 2. Trigger the wrapper to move to Step 2
      onSuccess(email); 
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-[#242B4D] rounded-3xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 bg-slate-100 dark:bg-[#1A1F3A] rounded-xl outline-none border-2 focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          disabled={isLoading}
          className="cursor-pointer w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          {isLoading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
