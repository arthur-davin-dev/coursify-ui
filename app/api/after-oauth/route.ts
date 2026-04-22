// app/api/auth/after-oauth/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { auth } from "@/lib/auth"; // adjust path if needed

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const pendingRole = cookieStore.get("pending_role")?.value;

    if (pendingRole) {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (session?.user) {
        // Update role via Better Auth's updateUser
        await auth.api.updateUser({
          body: { role: pendingRole },
          headers: await headers(),
        });
      }

      cookieStore.delete("pending_role");
    }

    return NextResponse.redirect(new URL("/", process.env.BETTER_AUTH_URL!));
  } catch (err) {
    console.error("after-oauth error:", err);
    return NextResponse.redirect(
      new URL("/login", process.env.BETTER_AUTH_URL!)
    );
  }
}