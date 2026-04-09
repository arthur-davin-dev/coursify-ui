// app/api/users/me/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  // ✅ Guard: no token = return 401 immediately
  if (!authHeader) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader, // ✅ Forward the Bearer token to Java
      },
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("Proxy /api/users/me error:", err);
    return NextResponse.json({ message: "Internal proxy error" }, { status: 500 });
  }
}