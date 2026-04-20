// import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/books`, {
//       next: { revalidate: 60 },
//     });

//     if (!res.ok) {
//       return NextResponse.json(
//         { message: "Failed to fetch books" },
//         { status: res.status }
//       );
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Books API error:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const authHeader = req.headers.get("authorization");

//     console.log("POST /api/books - auth header:", authHeader);

//     if (!authHeader) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/books`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: authHeader,
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await res.json();
//     if (!res.ok) return NextResponse.json(data, { status: res.status });
//     return NextResponse.json(data, { status: 201 });
//   } catch (error) {
//     console.error("POST /api/books error:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API;

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/books`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json({ message: "Failed to fetch books" }, { status: res.status });
    }

    const data = await res.json();

    // ✅ Backend returns paginated response — pass it as-is
    // RTK Query will get the full { content, totalPages, ... } object
    return NextResponse.json(data);
  } catch (error) {
    console.error("Books GET error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    console.log("→ POST body:", JSON.stringify(body));

    const res = await fetch(`${API_URL}/api/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });

    const responseText = await res.text();
    console.log("← Backend status:", res.status);
    console.log("← Backend response:", responseText);

    let data: any;
    try {
      data = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        { message: `Backend error: ${responseText.slice(0, 200)}` },
        { status: res.status || 500 }
      );
    }

    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error("POST /api/books error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}