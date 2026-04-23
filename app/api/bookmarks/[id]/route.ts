// import { NextRequest, NextResponse } from "next/server";

// const BACKEND_URL = process.env.NEXT_PUBLIC_API; // e.g. http://localhost:8080

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   const { pathname, search } = new URL(req.url);


//   const backendPath = pathname.replace("/api/bookmarks", "/api/bookmarks");

//   const res = await fetch(`${BACKEND_URL}${backendPath}${search}`, {
//     headers: {
//       authorization: req.headers.get("authorization") ?? "",
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await res.json();
//   return NextResponse.json(data, { status: res.status });
// }

// export async function POST(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { pathname } = new URL(req.url);
//   const body = await req.text();

//   const res = await fetch(`${BACKEND_URL}${pathname}`, {
//     method: "POST",
//     headers: {
//       authorization: req.headers.get("authorization") ?? "",
//       "Content-Type": "application/json",
//     },
//     body: body || undefined,
//   });

//   const data = await res.json().catch(() => null);
//   return NextResponse.json(data ?? {}, { status: res.status });
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { pathname } = new URL(req.url);

//   const res = await fetch(`${BACKEND_URL}${pathname}`, {
//     method: "DELETE",
//     headers: {
//       authorization: req.headers.get("authorization") ?? "",
//     },
//   });

//   const data = await res.json().catch(() => null);
//   return NextResponse.json(data ?? {}, { status: res.status });
// }


import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { pathname, search } = new URL(req.url);

  const backendPath = pathname.replace("/api/bookmarks", "/api/bookmarks");

  const res = await fetch(`${BACKEND_URL}${backendPath}${search}`, {
    headers: {
      authorization: req.headers.get("authorization") ?? "",
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { pathname } = new URL(req.url);
  const body = await req.text();

  const res = await fetch(`${BACKEND_URL}${pathname}`, {
    method: "POST",
    headers: {
      authorization: req.headers.get("authorization") ?? "",
      "Content-Type": "application/json",
    },
    body: body || undefined,
  });

  const data = await res.json().catch(() => null);
  return NextResponse.json(data ?? {}, { status: res.status });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { pathname } = new URL(req.url);

  const res = await fetch(`${BACKEND_URL}${pathname}`, {
    method: "DELETE",
    headers: {
      authorization: req.headers.get("authorization") ?? "",
    },
  });

  const data = await res.json().catch(() => null);
  return NextResponse.json(data ?? {}, { status: res.status });
}