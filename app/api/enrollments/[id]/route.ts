// import { NextRequest, NextResponse } from "next/server";

// export async function POST(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader)
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API}/api/enrollments/${params.id}`,
//       { method: "POST", headers: { Authorization: authHeader } }
//     );

//     const data = await res.json();
//     if (!res.ok) return NextResponse.json(data, { status: res.status });
//     return NextResponse.json(data);
//   } catch {
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader)
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API}/api/enrollments/${params.id}`,
//       { method: "DELETE", headers: { Authorization: authHeader } }
//     );

//     if (!res.ok) {
//       const data = await res.json();
//       return NextResponse.json(data, { status: res.status });
//     }
//     return new NextResponse(null, { status: 204 });
//   } catch {
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/enrollments/${id}`,
      { method: "POST", headers: { Authorization: authHeader } }
    );

    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data);
  } catch {
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
    if (!authHeader)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/enrollments/${id}`,
      { method: "DELETE", headers: { Authorization: authHeader } }
    );

    if (!res.ok) {
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    }
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}