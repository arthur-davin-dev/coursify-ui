import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API;

export async function GET(req: NextRequest) {
  const res = await fetch(`${BACKEND_URL}/api/bookmarks/books`, {
    headers: {
      authorization: req.headers.get("authorization") ?? "",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}