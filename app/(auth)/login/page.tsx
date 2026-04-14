// import { LoginForm } from "@/components/forms/LoginForm";

// export default function LoginPage() {
//   return (
//     <main className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
//       <LoginForm />
//     </main>
//   )
// }

"use client";

import { useState } from "react";
import { LoginForm } from "@/components/forms/LoginForm";
import AuthFlowModal from "@/components/forms/AuthFlowWrapper";


export default function LoginPage() {
  const [forgotOpen, setForgotOpen] = useState(false);

  return (
    <>
      <LoginForm onForgotPassword={() => setForgotOpen(true)} />
      <AuthFlowModal open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </>
  );
}