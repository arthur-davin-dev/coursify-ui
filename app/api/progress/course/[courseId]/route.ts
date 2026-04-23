// import { NextRequest, NextResponse } from "next/server";

// const BACKEND = process.env.NEXT_PUBLIC_API;

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { courseId: string } }
// ) {
//   const res = await fetch(`${BACKEND}/api/progress/course/${params.courseId}`, {
//     headers: {
//       authorization: req.headers.get("authorization") ?? "",
//     },
//   });

//   const data = await res.json();
//   return NextResponse.json(data, { status: res.status });
// }

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { courseId: string } }
// ) {
//   const body = await req.text();

//   const res = await fetch(`${BACKEND}/api/progress/course/${params.courseId}`, {
//     method: "PUT",
//     headers: {
//       authorization: req.headers.get("authorization") ?? "",
//       "Content-Type": "application/json",
//     },
//     body,
//   });

//   const data = await res.json().catch(() => null);
//   return NextResponse.json(data ?? {}, { status: res.status });
// }

import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_API;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const res = await fetch(`${BACKEND}/api/progress/course/${courseId}`, {
    headers: {
      authorization: req.headers.get("authorization") ?? "",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const body = await req.text();

  const res = await fetch(`${BACKEND}/api/progress/course/${courseId}`, {
    method: "PUT",
    headers: {
      authorization: req.headers.get("authorization") ?? "",
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await res.json().catch(() => null);
  return NextResponse.json(data ?? {}, { status: res.status });
}