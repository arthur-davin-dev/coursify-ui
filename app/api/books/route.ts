import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/books`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch books" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Books API error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    console.log("POST /api/books - auth header:", authHeader);

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("POST /api/books error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}