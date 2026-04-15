import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.redirect(new URL("/", process.env.BETTER_AUTH_URL));
  } catch (err) {
    console.error("after-oauth error:", err);
    return NextResponse.redirect(new URL("/login", process.env.BETTER_AUTH_URL));
  }
}