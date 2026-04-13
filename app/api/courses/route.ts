import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/courses`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch courses" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Courses API error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ Log exactly what header arrives at Next.js
    const authHeader = req.headers.get("authorization");
    console.log("=== /api/courses POST ===");
    console.log("authorization header:", authHeader);

    if (!authHeader) {
      return NextResponse.json(
        { message: "No authorization header received by Next.js route" },
        { status: 401 }
      );
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader, // ✅ forward to Spring Boot
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("POST /api/courses error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}