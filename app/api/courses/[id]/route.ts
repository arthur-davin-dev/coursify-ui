// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/courses/${params.id}`, {
//       next: { revalidate: 60 },
//     });

//     if (!res.ok) {
//       return NextResponse.json(
//         { message: "Course not found" },
//         { status: res.status }
//       );
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Course detail error:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }


// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await req.json();
//     const authHeader = req.headers.get("authorization");

//     console.log("=== /api/courses/[id] PATCH ===");
//     console.log("id:", params.id);
//     console.log("authorization:", authHeader);

//     if (!authHeader) {
//       return NextResponse.json(
//         { message: "No authorization header" },
//         { status: 401 }
//       );
//     }

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API}/api/courses/${params.id}`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: authHeader,
//         },
//         body: JSON.stringify(body),
//       }
//     );

//     const data = await res.json();
//     if (!res.ok) return NextResponse.json(data, { status: res.status });
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("PATCH /api/courses/[id] error:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const authHeader = req.headers.get("authorization");

//     if (!authHeader) {
//       return NextResponse.json({ message: "No authorization header" }, { status: 401 });
//     }

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API}/api/courses/${params.id}`,
//       {
//         method: "DELETE",
//         headers: { Authorization: authHeader },
//       }
//     );

//     if (!res.ok) {
//       const data = await res.json().catch(() => ({}));
//       return NextResponse.json(data, { status: res.status });
//     }

//     return new NextResponse(null, { status: 204 });
//   } catch (error) {
//     console.error("DELETE /api/courses/[id] error:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/courses/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Course detail error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const authHeader = req.headers.get("authorization");

    console.log("=== /api/courses/[id] PATCH ===");
    console.log("id:", id);
    console.log("authorization:", authHeader);

    if (!authHeader) {
      return NextResponse.json(
        { message: "No authorization header" },
        { status: 401 }
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/courses/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data);
  } catch (error) {
    console.error("PATCH /api/courses/[id] error:", error);
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
      return NextResponse.json({ message: "No authorization header" }, { status: 401 });
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/courses/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: authHeader },
      }
    );

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return NextResponse.json(data, { status: res.status });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/courses/[id] error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}