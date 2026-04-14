// import AuthFlowWrapper from "@/components/forms/AuthFlowWrapper";

// export default function ForgotPasswordPage() {
//   return (
//     <main className="flex min-h-screen items-center justify-center">
//       <AuthFlowWrapper />
//     </main>
//   );
// }

"use client";

import AuthFlowModal from "@/components/forms/AuthFlowWrapper";
import { useState } from "react";


export default function ForgotPasswordPage() {
  const [open, setOpen] = useState(true); // ← opens immediately on page load

  return (
    <main className="flex min-h-screen items-center justify-center">
      <AuthFlowModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}