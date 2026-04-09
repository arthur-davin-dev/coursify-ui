// "use client";

// import { useRegisterMutation } from "@/store/features/auth/authApi";
// import { RegisterForm } from "@/components/forms/RegisterForm";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// export default function RegisterPage() {
//   const router = useRouter();
//   const [register, { isLoading }] = useRegisterMutation();

//   const handleRegister = async (formData: any) => {
//     // --- DATA TRANSFORMATION LOGIC ---
//     // 1. Split fullName into firstName and lastName
//     const nameParts = formData.fullName.trim().split(" ");
//     const firstName = nameParts[0];
//     const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "User";

//     // 2. Generate a username (since your API requires it)
//     const username = formData.email.split("@")[0] + Math.floor(Math.random() * 1000);

//     // 3. Construct the Payload for the Java Backend
//     const apiPayload = {
//       username: username,
//       email: formData.email,
//       password: formData.password,
//       firstName: firstName,
//       lastName: lastName,
//       gender: "MALE", // Default or add to form
//       role: formData.role.toUpperCase(), // Convert 'teacher' -> 'TEACHER'
//     };

//     try {
//       await register(apiPayload).unwrap();
//       toast.success("Account created! Please login.");
//       router.push("/login");
//     } catch (err: any) {
//       const errorMsg = err?.data?.message || "Registration failed";
//       toast.error(errorMsg);
//       console.error("API Error:", err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
//       <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
//     </div>
//   );
// }

// app/(auth)/register/page.tsx
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
      await register(formData).unwrap(); // already matches API shape
      toast.success("Registration successful!");
      router.push("/login");
    } catch (err: any) {
      console.error("Registration error:", err);
      const message =
        err?.data?.message || err?.data?.error || "Registration failed";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
    </div>
  );
}