import { NextRequest, NextResponse } from "next/server";

// ✅ Correct base: /api/v1/enrollments
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/v1/enrollments/my`, {
      headers: { Authorization: authHeader },
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}