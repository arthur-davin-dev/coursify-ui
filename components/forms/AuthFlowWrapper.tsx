// "use client";

// import { useState } from "react";
// import ForgotPasswordForm from "./ForgotPasswordForm";
// import VerifyOtpStep from "./VerifyOtpStep";
// import ResetPasswordForm from "./ResetPasswordForm";
// import { useRouter } from "next/navigation";

// export default function AuthFlowWrapper() {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");  // ← store otp
//   const router = useRouter();

//   return (
//     <div className="w-full max-w-md mx-auto">
//       {step === 1 && (
//         <ForgotPasswordForm
//           onSuccess={(submittedEmail) => {
//             setEmail(submittedEmail);
//             setStep(2);
//           }}
//         />
//       )}
//       {step === 2 && (
//         <VerifyOtpStep
//           email={email}
//           onSuccess={(verifiedOtp) => {  // ← receive otp string
//             setOtp(verifiedOtp);
//             setStep(3);
//           }}
//         />
//       )}
//       {step === 3 && (
//         <ResetPasswordForm
//           email={email}   // ← pass email
//           otp={otp}       // ← pass otp
//           onSuccess={() => router.push("/login")}
//         />
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPasswordForm from "./ForgotPasswordForm";
import VerifyOtpStep from "./VerifyOtpStep";
import ResetPasswordForm from "./ResetPasswordForm";

interface AuthFlowModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthFlowModal({ open, onClose }: AuthFlowModalProps) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setStep(1);
      setEmail("");
      setOtp("");
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!open) return null;

  const stepTitles = ["Forgot Password", "Verify OTP", "Reset Password"];
  const stepDescriptions = [
    "Enter your email to receive a verification code",
    "Enter the code sent to your email",
    "Create your new password",
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm mx-4 bg-white dark:bg-[#242B4D] rounded-3xl shadow-2xl overflow-hidden transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Back / Close button */}
        <div className="px-8 pt-6">
          <button
            type="button"
            onClick={step === 1 ? onClose : () => setStep(step - 1)}
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
          <h1 className="text-2xl font-extrabold tracking-widest text-slate-800 dark:text-white uppercase">
            {stepTitles[step - 1]}
          </h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
            {stepDescriptions[step - 1]}
          </p>

          {/* Step dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? "w-6 bg-blue-600"
                    : s < step
                      ? "w-3 bg-blue-400"
                      : "w-3 bg-slate-200 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="px-8 pb-10">
          {step === 1 && (
            <ForgotPasswordForm
              onSuccess={(submittedEmail) => {
                setEmail(submittedEmail);
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <VerifyOtpStep
              email={email}
              onSuccess={(verifiedOtp) => {
                setOtp(verifiedOtp);
                setStep(3);
              }}
            />
          )}
          {step === 3 && (
            <ResetPasswordForm
              email={email}
              otp={otp}
              onSuccess={() => {
                onClose();
                router.push("/login");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}