import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/users/me`, {
      headers: {
        Authorization: token,
      },
    });

    const text = await res.text();
    if (!text) return NextResponse.json({}, { status: res.status });

    const data = JSON.parse(text);

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("User me error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}