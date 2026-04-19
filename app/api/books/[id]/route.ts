import { NextRequest, NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_API;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const res = await fetch(`${API}/api/books/${id}`, {
      next: { revalidate: 60 },
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/books/[id] error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const res = await fetch(`${API}/api/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data);
  } catch (error) {
    console.error("PATCH /api/books/[id] error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${API}/api/books/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: authHeader,
      },
    });

    if (res.status === 204 || res.status === 200) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("DELETE /api/books/[id] error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}