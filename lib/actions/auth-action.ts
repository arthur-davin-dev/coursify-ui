"use server";
import { headers, cookies } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const signInSocial = async (
  provider: "github" | "google" | "facebook",
  role: "STUDENT" | "TEACHER"
) => {
  const { url } = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: "/api/auth/after-oauth", // ← custom handler to apply role
    },
    headers: await headers(), // ← required
  });

  if (url) {
    const cookieStore = await cookies();
    cookieStore.set("pending_role", role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 10,
      path: "/",
    });

    redirect(url);
  }
};

export const signOut = async () => {
  await auth.api.signOut({ headers: await headers() });
  redirect("/login");
};

// "use server";
// import { headers } from "next/headers";
// import { auth } from "../auth";
// import { redirect } from "next/navigation";

// export const signInSocial = async (
//   provider: "github" | "google" | "facebook",
//   role: "student" | "teacher"
// ) => {
//   const { url } = await auth.api.signInSocial({
//     body: {
//       provider,
//       callbackURL: "/",
//     },
//   });

//   if (url) {
//     // Store the selected role in a cookie so it can be applied after OAuth callback
//     const cookieStore = await import("next/headers").then((m) => m.cookies());
//     cookieStore.set("pending_role", role, {
//       httpOnly: true,
//       secure: process.env.NEXT_PUBLIC_API === "production",
//       // secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 10, // 10 minutes
//       path: "/",
//     });

//     redirect(url);
//   }
// };

// export const signOut = async () => {
//   await auth.api.signOut({ headers: await headers() });
//   redirect("/login");
// };

// /**
//  * Call this in your OAuth callback route (e.g. app/api/auth/[...all]/route.ts)
//  * after the user is authenticated, to apply the pending role.
//  */
// export const applyPendingRole = async (userId: string) => {
//   const cookieStore = await import("next/headers").then((m) => m.cookies());
//   const role = cookieStore.get("pending_role")?.value;

//   if (role === "student" || role === "teacher") {
//     await auth.api.updateUser({
//       body: { role },
//       headers: await headers(),
//     });
//     cookieStore.delete("pending_role");
//   }
// };