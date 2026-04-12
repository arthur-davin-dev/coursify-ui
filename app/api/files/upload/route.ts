import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    console.log("POST /api/files/upload - auth:", authHeader);

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get the form data from the client
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    // Forward the file to Spring Boot
    const forwardForm = new FormData();
    forwardForm.append("file", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/files/upload`, {
      method: "POST",
      headers: {
        Authorization: authHeader, // ✅ forward token
        // ⚠️ Do NOT set Content-Type here — browser sets it with boundary automatically
      },
      body: forwardForm,
    });

    const data = await res.json();

    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}