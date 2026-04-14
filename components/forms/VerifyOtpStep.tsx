"use client";

import { useState } from "react";
import { useVerifyOtpMutation } from "@/store/features/auth/authApi";
import { toast } from "sonner";

export default function VerifyOtpStep({ email, onSuccess }: { email: string; onSuccess: (token: string) => void }) {
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleVerify = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await verifyOtp({ email, otp }).unwrap();
    toast.success("OTP Verified successfully!");
    onSuccess(otp);  // ← pass the otp the user typed, not result.token
  } catch (err: any) {
    toast.error(err?.data?.message || "Invalid OTP code");
  }
};

  return (
    <div className="p-8 bg-white dark:bg-[#242B4D] rounded-3xl shadow-xl text-center">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Verify OTP</h2>
      <p className="text-sm text-slate-500 mb-6">Code sent to: {email}</p>
      
      <form onSubmit={handleVerify} className="space-y-6">
        <input
          type="text"
          placeholder="000000"
          maxLength={6}
          className="w-full text-center text-3xl tracking-[1rem] py-3 bg-slate-100 dark:bg-[#1A1F3A] rounded-xl outline-none border-2 focus:border-blue-500 text-slate-800 dark:text-white"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          disabled={isLoading}
          className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </button>
      </form>
    </div>
  );
}