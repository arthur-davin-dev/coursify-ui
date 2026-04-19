// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { path: string[] } }
// ) {
//   const path = params.path.join("/");
//   const res = await fetch(`${process.env.API}/files/${path}`);

//   if (!res.ok) {
//     return NextResponse.json({ message: "Not found" }, { status: res.status });
//   }

//   // Stream the file back (PDF, image, etc.)
//   const blob = await res.blob();
//   return new NextResponse(blob, {
//     headers: {
//       "Content-Type": res.headers.get("Content-Type") ?? "application/octet-stream",
//     },
//   });
// }

// export async function POST(
//   req: NextRequest,
//   { params }: { params: { path: string[] } }
// ) {
//   const path = params.path.join("/");
//   const authHeader = req.headers.get("authorization");

//   if (!authHeader) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const formData = await req.formData();

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/files/${path}`, {
//     method: "POST",
//     headers: {
//       Authorization: authHeader,
//     },
//     body: formData,
//   });

//   const data = await res.json().catch(() => ({}));
//   if (!res.ok) return NextResponse.json(data, { status: res.status });
//   return NextResponse.json(data);
// }

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ pathSegments: string[] }> }
) {
  const { pathSegments } = await params;
  const path = pathSegments.join("/");
  const res = await fetch(`${process.env.API}/files/${path}`);

  if (!res.ok) {
    return NextResponse.json({ message: "Not found" }, { status: res.status });
  }

  const blob = await res.blob();
  return new NextResponse(blob, {
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "application/octet-stream",
    },
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ pathSegments: string[] }> }
) {
  const { pathSegments } = await params;
  const path = pathSegments.join("/");
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/files/${path}`, {
    method: "POST",
    headers: {
      Authorization: authHeader,
    },
    body: formData,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) return NextResponse.json(data, { status: res.status });
  return NextResponse.json(data);
}