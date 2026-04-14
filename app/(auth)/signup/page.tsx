// "use client";

// import { useRegisterMutation } from "@/store/features/auth/authApi";
// import { RegisterForm, RegisterFormData } from "@/components/forms/RegisterForm";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// export default function RegisterPage() {
//   const router = useRouter();
//   const [register, { isLoading }] = useRegisterMutation();

//   const handleRegister = async (formData: RegisterFormData) => {
//     try {
//       await register(formData).unwrap();
//       toast.success("Registration successful!");
//       router.push("/login");
//     } catch (err: any) {
//       const message = err?.data?.message || err?.data?.error || "Registration failed";
//       toast.error(message);
//     }
//   };

//   return (
//     // Clicking the dark backdrop navigates back
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//       onClick={() => router.back()}
//     >
//       {/* Clicking inside the form stops propagation */}
//       <div onClick={(e) => e.stopPropagation()}>
//         <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
//       </div>
//     </div>
//   );
// }

"use client";

import { useRegisterMutation } from "@/store/features/auth/authApi";
import { RegisterForm, RegisterFormData } from "@/components/forms/RegisterForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (formData: RegisterFormData) => {
    try {
      await register(formData).unwrap();
      toast.success("Registration successful!");
      router.push("/login");
    } catch (err: any) {
      const message = err?.data?.message || err?.data?.error || "Registration failed";
      toast.error(message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => router.back()}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} onClose={() => router.back()} />
      </div>
    </div>
  );
}


// "use client";

// import { useRegisterMutation } from "@/store/features/auth/authApi";
// import { RegisterForm, RegisterFormData } from "@/components/forms/RegisterForm";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// export default function RegisterPage() {
//   const router = useRouter();
//   const [register, { isLoading }] = useRegisterMutation();

//   const handleRegister = async (formData: RegisterFormData) => {
//     try {
//       await register(formData).unwrap(); // already matches API shape
//       toast.success("Registration successful!");
//       router.push("/login");
//     } catch (err: any) {
//       console.error("Registration error:", err);
//       const message =
//         err?.data?.message || err?.data?.error || "Registration failed";
//       toast.error(message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//       <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
//     </div>
//   );
// }